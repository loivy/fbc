# Publishes firestore.rules via the Firebase Rules REST API, authenticating by
# impersonating the deployer service account (no interactive `firebase login`).
param(
  [string]$ProjectId = "fbc-founder-platform"
)

$ErrorActionPreference = "Stop"
$env:PATH += ";$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin"

$SaEmail   = "fbc-deployer@$ProjectId.iam.gserviceaccount.com"
$RepoRoot  = Split-Path -Parent $PSScriptRoot
$RulesFile = Join-Path $RepoRoot "firestore.rules"

$ErrorActionPreference = "Continue"
& cmd /c "gcloud services enable firebaserules.googleapis.com --project=$ProjectId 2>nul" | Out-Null
$AccessToken = (& cmd /c "gcloud auth print-access-token --impersonate-service-account=$SaEmail 2>nul") | Select-Object -Last 1
$ErrorActionPreference = "Stop"
if (-not $AccessToken) { throw "Failed to acquire impersonated access token" }

$HdrJson = @{
  "Authorization"       = "Bearer $AccessToken"
  "x-goog-user-project" = $ProjectId
  "Content-Type"        = "application/json"
}

# Must be a plain [string]; Get-Content -Raw returns a PSObject carrying PS* note
# properties, which ConvertTo-Json would serialize as a nested object.
$rulesContent = [System.IO.File]::ReadAllText($RulesFile)

# 1. Create ruleset
Write-Output "=== Creating ruleset ==="
$rulesetBody = @{
  source = @{
    files = @(@{ name = "firestore.rules"; content = $rulesContent })
  }
} | ConvertTo-Json -Depth 6

try {
  $ruleset = Invoke-RestMethod -Method Post -Uri "https://firebaserules.googleapis.com/v1/projects/$ProjectId/rulesets" -Headers $HdrJson -Body $rulesetBody
} catch {
  $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
  Write-Output "--- ERROR BODY ---"
  Write-Output $reader.ReadToEnd()
  Write-Output "--- REQUEST BODY ---"
  Write-Output $rulesetBody
  throw
}
Write-Output "ruleset: $($ruleset.name)"

# 2. Point the cloud.firestore release at it (create, or update if it already exists)
$releaseId = "projects/$ProjectId/releases/cloud.firestore"
$releaseBody = @{ name = $releaseId; rulesetName = $ruleset.name } | ConvertTo-Json -Depth 4

Write-Output "=== Releasing ruleset ==="
try {
  $release = Invoke-RestMethod -Method Post -Uri "https://firebaserules.googleapis.com/v1/projects/$ProjectId/releases" -Headers $HdrJson -Body $releaseBody
  Write-Output "created release: $($release.name)"
} catch {
  # Already exists - releases.patch takes the Release wrapped under a "release" key.
  Write-Output "release exists, updating..."
  $patchBody = @{ release = @{ name = $releaseId; rulesetName = $ruleset.name } } | ConvertTo-Json -Depth 4
  $release = Invoke-RestMethod -Method Patch -Uri "https://firebaserules.googleapis.com/v1/$releaseId" -Headers $HdrJson -Body $patchBody
  Write-Output "updated release: $($release.name)"
}
Write-Output "DONE"
