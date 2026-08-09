# Deploys client/dist to Firebase Hosting via the Hosting REST API, authenticating
# by impersonating the deployer service account. Avoids needing an interactive
# `firebase login` on the machine running it.
#
# Prereqs: gcloud installed and logged in, with roles/iam.serviceAccountTokenCreator
# on $SaEmail. Build the client first: npm run build --workspace client
param(
  [string]$ProjectId = "fbc-founder-platform",
  [string]$SiteId    = "fbc-founder-platform"
)

$ErrorActionPreference = "Stop"
$env:PATH += ";$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin"

$SaEmail = "fbc-deployer@$ProjectId.iam.gserviceaccount.com"
$RepoRoot = Split-Path -Parent $PSScriptRoot
$DistDir  = Join-Path $RepoRoot "client\dist"
if (-not (Test-Path $DistDir)) { throw "$DistDir not found - run: npm run build --workspace client" }

# gcloud writes an impersonation warning to stderr, which PowerShell 5.1 turns into
# a terminating ErrorRecord under ErrorActionPreference=Stop. Relax it just for this call.
$ErrorActionPreference = "Continue"
$AccessToken = (& cmd /c "gcloud auth print-access-token --impersonate-service-account=$SaEmail 2>nul") | Select-Object -Last 1
$ErrorActionPreference = "Stop"
if (-not $AccessToken) { throw "Failed to acquire impersonated access token" }

# NOTE: PowerShell variable names are case-insensitive and ForEach-Object shares the
# caller's scope, so loop variables here must never collide with these header names.
$HdrAuth = @{ "Authorization" = "Bearer $AccessToken"; "x-goog-user-project" = $ProjectId }
$HdrJson = $HdrAuth + @{ "Content-Type" = "application/json" }

function Get-GzipBytes([byte[]]$InputBytes) {
  $ms = New-Object System.IO.MemoryStream
  $gz = New-Object System.IO.Compression.GZipStream($ms, [System.IO.Compression.CompressionMode]::Compress, $true)
  $gz.Write($InputBytes, 0, $InputBytes.Length)
  $gz.Close()
  $result = $ms.ToArray()
  $ms.Dispose()
  return ,$result
}

function Get-Sha256Hex([byte[]]$InputBytes) {
  $sha = [System.Security.Cryptography.SHA256]::Create()
  ($sha.ComputeHash($InputBytes) | ForEach-Object { $_.ToString("x2") }) -join ""
}

# 1. Collect + gzip files
Write-Output "=== Collecting files from $DistDir ==="
$GzipByPath = @{}
$HashByPath = @{}
foreach ($item in (Get-ChildItem -Path $DistDir -Recurse -File)) {
  $relPath = $item.FullName.Substring($DistDir.Length).Replace("\", "/")
  if (-not $relPath.StartsWith("/")) { $relPath = "/$relPath" }
  $rawBytes  = [System.IO.File]::ReadAllBytes($item.FullName)
  $gzipBytes = Get-GzipBytes $rawBytes
  $digest    = Get-Sha256Hex $gzipBytes
  $GzipByPath[$relPath] = $gzipBytes
  $HashByPath[$relPath] = $digest
  Write-Output "  $relPath  ($($rawBytes.Length) -> $($gzipBytes.Length) bytes)"
}

# 2. Create version.
# The SPA rewrite must be declared here — firebase.json is only read by the CLI,
# so deploying via the REST API without this makes every deep link 404.
Write-Output "=== Creating version ==="
$versionConfig = @{
  config = @{
    rewrites = @(@{ glob = "**"; path = "/index.html" })
  }
} | ConvertTo-Json -Depth 6
$version = Invoke-RestMethod -Method Post -Uri "https://firebasehosting.googleapis.com/v1beta1/sites/$SiteId/versions" -Headers $HdrJson -Body $versionConfig
$versionName = $version.name
Write-Output "version: $versionName"

# 3. Populate files
Write-Output "=== populateFiles ==="
$populateBody = @{ files = $HashByPath } | ConvertTo-Json -Depth 4
$populated = Invoke-RestMethod -Method Post -Uri "https://firebasehosting.googleapis.com/v1beta1/$versionName`:populateFiles" -Headers $HdrJson -Body $populateBody
# Absent when every file is already stored from a previous version. @($null) would
# otherwise yield a 1-element array holding $null, so filter empties out.
$requiredHashes = @($populated.uploadRequiredHashes | Where-Object { $_ })
$uploadUrl = $populated.uploadUrl
Write-Output "required uploads: $($requiredHashes.Count)"

# 4. Upload each required file.
# Iterate our own file list and upload the ones Hosting asked for, rather than
# reverse-looking-up each hash (which yields a null path if anything mismatches).
$requiredSet = @{}
foreach ($needed in $requiredHashes) { $requiredSet[$needed] = $true }

$uploadCount = 0
foreach ($entry in $HashByPath.GetEnumerator()) {
  if (-not $requiredSet.ContainsKey($entry.Value)) {
    Write-Output "  skipping (already stored) $($entry.Key)"
    continue
  }
  Write-Output "  uploading $($entry.Key)"
  Invoke-RestMethod -Method Post -Uri "$uploadUrl/$($entry.Value)" -Headers $HdrAuth -ContentType "application/octet-stream" -Body $GzipByPath[$entry.Key] | Out-Null
  $uploadCount++
}
if ($uploadCount -ne $requiredHashes.Count) {
  throw "Uploaded $uploadCount file(s) but Hosting required $($requiredHashes.Count)"
}

# 5. Finalize
Write-Output "=== Finalizing ==="
Invoke-RestMethod -Method Patch -Uri "https://firebasehosting.googleapis.com/v1beta1/$versionName`?updateMask=status" -Headers $HdrJson -Body '{"status":"FINALIZED"}' | Out-Null

# 6. Release
Write-Output "=== Releasing ==="
$release = Invoke-RestMethod -Method Post -Uri "https://firebasehosting.googleapis.com/v1beta1/sites/$SiteId/releases?versionName=$versionName" -Headers $HdrJson -Body "{}"
Write-Output "release: $($release.name)"
Write-Output "LIVE AT: https://$SiteId.web.app"
