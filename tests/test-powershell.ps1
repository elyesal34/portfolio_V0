Write-Host "=== Test PowerShell ===" -ForegroundColor Green
Write-Host "Répertoire courant: $(Get-Location)"
Write-Host "Utilisateur: $env:USERNAME"
Write-Host "Système: $([System.Environment]::OSVersion.VersionString)"

# Tester l'écriture dans un fichier
"Ceci est un test" | Out-File -FilePath ".\test-powershell-output.txt" -Encoding utf8
Write-Host "Fichier de test créé avec succès" -ForegroundColor Green
