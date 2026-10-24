$body = @{ messages = @(@{ role = 'user'; content = 'Hello' }) } | ConvertTo-Json
$response = Invoke-WebRequest -Uri http://localhost:3001/api/chat -Method POST -Body $body -ContentType 'application/json' -UseBasicParsing
Write-Output $response.Content