Write-Host "=== Test Environment ==="
Write-Host "1. PowerShell Version: $($PSVersionTable.PSVersion)"
Write-Host "2. Current Directory: $(Get-Location)"
Write-Host "3. Files in current directory:"
Get-ChildItem -Path . -Force | Select-Object -First 5 | Format-Table -Property Name, Length, LastWriteTime
Write-Host "4. Node.js Version:"
node --version
Write-Host "5. npm Version:"
npm --version
Write-Host "======================"
