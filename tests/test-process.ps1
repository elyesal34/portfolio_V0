# Script pour tester l'exécution de processus Node.js

Write-Host "=== Test d'exécution de processus Node.js ===" -ForegroundColor Cyan

# 1. Vérifier si Node.js est dans le PATH
$nodePath = (Get-Command node -ErrorAction SilentlyContinue).Source
if ($nodePath) {
    Write-Host "[SUCCÈS] Node.js trouvé: $nodePath" -ForegroundColor Green
    Write-Host "Version: $(node -v)" -ForegroundColor Green
} else {
    Write-Host "[ERREUR] Node.js n'est pas dans le PATH" -ForegroundColor Red
    exit 1
}

# 2. Créer un script de test simple
$testScript = @"
console.log('Ceci est un test de sortie standard');
console.error('Ceci est un test de sortie d\'erreur');
"@

$testFile = "$PWD\test-node-script.js"
$testScript | Out-File -FilePath $testFile -Encoding utf8

# 3. Exécuter le script avec différentes méthodes
Write-Host "`n=== Méthode 1: Commande directe ===" -ForegroundColor Yellow
node $testFile

Write-Host "`n=== Méthode 2: Processus avec redirection ===" -ForegroundColor Yellow
$process = Start-Process -FilePath "node" -ArgumentList $testFile -NoNewWindow -PassThru -Wait -RedirectStandardOutput "$PWD\stdout.txt" -RedirectStandardError "$PWD\stderr.txt"
Write-Host "Code de sortie: $($process.ExitCode)"

if (Test-Path "$PWD\stdout.txt") {
    Write-Host "Sortie standard:" -ForegroundColor Green
    Get-Content "$PWD\stdout.txt"
    Remove-Item "$PWD\stdout.txt"
}

if (Test-Path "$PWD\stderr.txt") {
    Write-Host "Sortie d'erreur:" -ForegroundColor Red
    Get-Content "$PWD\stderr.txt"
    Remove-Item "$PWD\stderr.txt"
}

# 4. Nettoyer
Remove-Item $testFile -Force -ErrorAction SilentlyContinue

Write-Host "`n=== Test terminé ===" -ForegroundColor Cyan

# Attendre la saisie de l'utilisateur
Write-Host "Appuyez sur une touche pour continuer..." -NoNewline
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
