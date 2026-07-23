$ErrorActionPreference = 'Stop'

$project = Split-Path -Parent $PSScriptRoot
$node = 'C:\Program Files\nodejs\node.exe'
$vite = Join-Path $project 'node_modules\vite\bin\vite.js'
$url = 'http://127.0.0.1:5173/'

function Test-Preview {
  try {
    $response = Invoke-WebRequest -UseBasicParsing $url -TimeoutSec 2
    return $response.StatusCode -eq 200
  } catch {
    return $false
  }
}

if (-not (Test-Preview)) {
  $info = New-Object System.Diagnostics.ProcessStartInfo
  $info.FileName = $node
  $info.Arguments = "`"$vite`" --host 127.0.0.1 --port 5173"
  $info.WorkingDirectory = $project
  $info.UseShellExecute = $true
  $info.WindowStyle = [System.Diagnostics.ProcessWindowStyle]::Hidden
  [void][System.Diagnostics.Process]::Start($info)

  foreach ($attempt in 1..10) {
    Start-Sleep -Milliseconds 500
    if (Test-Preview) { break }
  }
}

Start-Process $url
