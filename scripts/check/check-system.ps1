Write-Host "=== Vérification du système ==="
Write-Host "1. Informations système:"
Get-ComputerInfo | Select-Object -Property CsName, OsName, OsVersion, OsArchitecture | Format-List

Write-Host "`n2. Version de Node.js installée:"
try {
    $nodeVersion = node --version
    Write-Host "   Node.js: $nodeVersion"
    $npmVersion = npm --version
    Write-Host "   npm: $npmVersion"
} catch {
    Write-Host "   Node.js n'est pas installé ou n'est pas dans le PATH"
}

Write-Host "`n3. Répertoire courant:"
Get-Location

Write-Host "`n4. Fichiers dans le répertoire courant:"
Get-ChildItem -Path . -Force | Select-Object -First 10 | Format-Table -Property Name, Length, LastWriteTime

Write-Host "`n5. Variables d'environnement:"
$env:Path -split ';' | Where-Object { $_ -ne '' } | Select-Object -First 5 | ForEach-Object { Write-Host "   $_" }

Write-Host "`n=== Fin de la vérification ==="
