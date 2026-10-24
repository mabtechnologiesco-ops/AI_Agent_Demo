param($ApiKey = $env:AI_API_KEY)
$env:AI_API_KEY = $ApiKey
Write-Host "AI_API_KEY set to: $env:AI_API_KEY"
Write-Host "Starting server..."
Set-Location "c:\Users\hp\Desktop\AI_ASSISTANT DEMO\server"
& "node" "index.js"