# Script de test de sortie PowerShell
Write-Output "=== Test de sortie PowerShell ==="
Write-Output "Date: $(Get-Date)"
Write-Output "Répertoire courant: $(Get-Location)"
Write-Output ""
Write-Output "Contenu du répertoire (max 5 fichiers):"
Get-ChildItem -Path . | Select-Object -First 5 | Format-Table -Property Name, Length, LastWriteTime

# Tester l'accès à Node.js
$nodeVersion = node --version 2>&1
$npmVersion = npm --version 2>&1

Write-Output ""
Write-Output "=== Versions installées ==="
Write-Output "Node.js: $nodeVersion"
Write-Output "npm: $npmVersion"

# Tester l'écriture dans un fichier
$testFile = "$pwd\test-output.txt"
try {
    "Ceci est un test" | Out-File -FilePath $testFile -Force
    if (Test-Path $testFile) {
        Write-Output ""
        Write-Output "Fichier créé avec succès: $testFile"
        Remove-Item -Path $testFile -Force
        Write-Output "Fichier de test supprimé"
    }
} catch {
    Write-Output ""
    Write-Output "Erreur lors de l'écriture du fichier: $_"
}

Write-Output ""
Write-Output "=== Fin du test ==="
