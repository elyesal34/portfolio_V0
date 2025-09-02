Write-Host "=== Vérification de l'environnement de développement ===" -ForegroundColor Cyan

# Vérifier la version de Node.js
$nodeVersion = node --version
Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green

# Vérifier npm
$npmVersion = npm --version
Write-Host "npm version: $npmVersion" -ForegroundColor Green

# Vérifier les dépendances
Write-Host "`n=== Dépendances installées ===" -ForegroundColor Cyan
npm list --depth=0

# Vérifier les variables d'environnement
Write-Host "`n=== Variables d'environnement ===" -ForegroundColor Cyan
$env:Path -split ';' | Where-Object { $_ -ne '' } | Select-Object -First 10

# Vérifier les permissions
Write-Host "`n=== Permissions du dossier courant ===" -ForegroundColor Cyan
Get-Acl . | Format-List

# Tester un simple script Node.js
Write-Host "`n=== Test d'exécution Node.js ===" -ForegroundColor Cyan
node -e "console.log('Test réussi: Node.js fonctionne correctement')"
