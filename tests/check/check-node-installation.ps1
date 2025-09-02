# Vérifier l'installation de Node.js et npm
$nodePath = (Get-Command node -ErrorAction SilentlyContinue).Source
$npmPath = (Get-Command npm -ErrorAction SilentlyContinue).Source

Write-Host "=== Vérification de l'installation de Node.js et npm ===" -ForegroundColor Cyan

# Vérifier Node.js
if ($nodePath) {
    $nodeVersion = node --version
    Write-Host "Node.js est installé : $nodeVersion" -ForegroundColor Green
    Write-Host "Emplacement : $nodePath" -ForegroundColor Green
} else {
    Write-Host "Node.js n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
}

# Vérifier npm
if ($npmPath) {
    $npmVersion = npm --version
    Write-Host "npm est installé : v$npmVersion" -ForegroundColor Green
    Write-Host "Emplacement : $npmPath" -ForegroundColor Green
} else {
    Write-Host "npm n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
}

# Vérifier les variables d'environnement
Write-Host "`n=== Variables d'environnement ===" -ForegroundColor Cyan
$env:Path -split ';' | Where-Object { $_ -like '*node*' -or $_ -like '*npm*' } | ForEach-Object {
    Write-Host $_ -ForegroundColor Yellow
}

# Essayer d'exécuter un script Node.js simple
Write-Host "`n=== Test d'exécution Node.js ===" -ForegroundColor Cyan
$testScript = @"
console.log('Test de sortie standard');
console.error('Test d\'erreur standard');
require('fs').writeFileSync('node-test-output.txt', 'Ceci est un test');
"@

$testScript | Out-File -FilePath "test-script.js" -Encoding utf8

Write-Host "Exécution du script de test..." -ForegroundColor Yellow
$output = node test-script.js 2>&1

Write-Host "`n=== Sortie du script ===" -ForegroundColor Green
$output

if (Test-Path 'node-test-output.txt') {
    Write-Host "`nLe fichier de test a été créé avec succès" -ForegroundColor Green
    Remove-Item 'node-test-output.txt' -Force
} else {
    Write-Host "`nLe fichier de test n'a pas été créé" -ForegroundColor Red
}

# Nettoyer
Remove-Item 'test-script.js' -Force -ErrorAction SilentlyContinue
