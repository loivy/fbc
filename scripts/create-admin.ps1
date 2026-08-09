# Provisions an ADMIN user: creates the Firebase Auth account (with no password),
# writes the matching Firestore profile with role=ADMIN, and prints a password-reset
# link so the person sets their own password. Admins are not self-service via the app.
#
# Usage: ./scripts/create-admin.ps1 -Email you@example.com -Name "Your Name"
param(
  [Parameter(Mandatory = $true)][string]$Email,
  [string]$Name = "Admin",
  [string]$ProjectId = "fbc-founder-platform"
)

$ErrorActionPreference = "Stop"
$env:PATH += ";$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin"

$SaEmail = "fbc-deployer@$ProjectId.iam.gserviceaccount.com"

$ErrorActionPreference = "Continue"
$AccessToken = (& cmd /c "gcloud auth print-access-token --impersonate-service-account=$SaEmail 2>nul") | Select-Object -Last 1
$ErrorActionPreference = "Stop"
if (-not $AccessToken) { throw "Failed to acquire impersonated access token" }

$HdrJson = @{
  "Authorization"       = "Bearer $AccessToken"
  "x-goog-user-project" = $ProjectId
  "Content-Type"        = "application/json"
}

function Invoke-Api($Method, $Uri, $Body) {
  try {
    if ($Body) { return Invoke-RestMethod -Method $Method -Uri $Uri -Headers $HdrJson -Body $Body }
    return Invoke-RestMethod -Method $Method -Uri $Uri -Headers $HdrJson
  } catch {
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    throw "$Method $Uri failed: $($reader.ReadToEnd())"
  }
}

# 1. Find or create the Auth user. No password is set here on purpose.
Write-Output "=== Looking up $Email ==="
$lookup = Invoke-Api Post "https://identitytoolkit.googleapis.com/v1/projects/$ProjectId/accounts:lookup" (@{ email = @($Email) } | ConvertTo-Json)

if ($lookup.users) {
  $uid = $lookup.users[0].localId
  Write-Output "existing auth user: $uid"
} else {
  Write-Output "=== Creating auth user (no password) ==="
  $created = Invoke-Api Post "https://identitytoolkit.googleapis.com/v1/projects/$ProjectId/accounts" (@{ email = $Email; emailVerified = $true } | ConvertTo-Json)
  $uid = $created.localId
  Write-Output "created auth user: $uid"
}

# 2. Write the Firestore profile with role ADMIN
Write-Output "=== Writing Firestore profile (role=ADMIN) ==="
$now = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
$docFields = @{
  fields = @{
    email     = @{ stringValue    = $Email }
    name      = @{ stringValue    = $Name }
    role      = @{ stringValue    = "ADMIN" }
    createdAt = @{ timestampValue = $now }
    updatedAt = @{ timestampValue = $now }
  }
} | ConvertTo-Json -Depth 6

$docUri = "https://firestore.googleapis.com/v1/projects/$ProjectId/databases/(default)/documents/users?documentId=$uid"
try {
  Invoke-Api Post $docUri $docFields | Out-Null
  Write-Output "created users/$uid"
} catch {
  # Document already exists - patch the role instead of failing.
  Write-Output "profile exists, updating role/name..."
  $patchUri = "https://firestore.googleapis.com/v1/projects/$ProjectId/databases/(default)/documents/users/$uid" +
              "?updateMask.fieldPaths=role&updateMask.fieldPaths=name&updateMask.fieldPaths=email&updateMask.fieldPaths=updatedAt"
  Invoke-Api Patch $patchUri $docFields | Out-Null
  Write-Output "updated users/$uid"
}

# 3. Generate (do NOT send) a password-reset link so the admin sets their own password.
Write-Output "=== Generating password-set link ==="
$oob = Invoke-Api Post "https://identitytoolkit.googleapis.com/v1/projects/$ProjectId/accounts:sendOobCode" (@{
  requestType   = "PASSWORD_RESET"
  email         = $Email
  returnOobLink = $true
} | ConvertTo-Json)

# The admin-authenticated call returns the link with an empty apiKey= parameter,
# which makes the reset page fail. Fill it in from the registered web app config.
$link = $oob.oobLink
if ($link -match "apiKey=(&|$)") {
  $webApps = Invoke-Api Get "https://firebase.googleapis.com/v1beta1/projects/$ProjectId/webApps"
  $webCfg  = Invoke-Api Get "https://firebase.googleapis.com/v1beta1/projects/$ProjectId/webApps/$($webApps.apps[0].appId)/config"
  $link = $link -replace "apiKey=(?=&|$)", "apiKey=$($webCfg.apiKey)"
}

Write-Output ""
Write-Output "ADMIN READY: $Email (uid $uid)"
Write-Output "Set your password with this single-use link:"
Write-Output $link
