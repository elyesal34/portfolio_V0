# Script pour vérifier les variables d'environnement système

Write-Host "=== Variables d'environnement système ===" -ForegroundColor Cyan

# Vérifier le PATH
$path = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
$userPath = [System.Environment]::GetEnvironmentVariable("Path", "User")

Write-Host "`n[1/3] Vérification du PATH système..." -ForegroundColor Yellow
if ($path -match "node") {
    Write-Host "✅ Node.js est dans le PATH système" -ForegroundColor Green
    $nodePath = $path -split ';' | Where-Object { $_ -like "*node*" }
    Write-Host "   Emplacements trouvés :"
    $nodePath | ForEach-Object { Write-Host "   - $_" }
} else {
    Write-Host "❌ Node.js n'est pas dans le PATH système" -ForegroundColor Red
}

Write-Host "`n[2/3] Vérification du PATH utilisateur..." -ForegroundColor Yellow
if ($userPath -match "node") {
    Write-Host "✅ Node.js est dans le PATH utilisateur" -ForegroundColor Green
    $nodePath = $userPath -split ';' | Where-Object { $_ -like "*node*" }
    Write-Host "   Emplacements trouvés :"
    $nodePath | ForEach-Object { Write-Host "   - $_" }
} else {
    Write-Host "ℹ️ Node.js n'est pas dans le PATH utilisateur (peut être normal)" -ForegroundColor Yellow
}

# Vérifier l'installation de Node.js
Write-Host "`n[3/3] Vérification de l'installation de Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Node.js est installé : $nodeVersion" -ForegroundColor Green
        
        # Vérifier npm
        $npmVersion = npm --version 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ npm est installé : v$npmVersion" -ForegroundColor Green
        } else {
            Write-Host "❌ npm n'est pas correctement installé" -ForegroundColor Red
        }
        
        # Vérifier l'emplacement de Node.js
        $nodePath = (Get-Command node).Source
        Write-Host "   Emplacement de Node.js : $nodePath" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ Node.js n'est pas correctement installé ou n'est pas dans le PATH" -ForegroundColor Red
}

Write-Host "`n=== Recommandations ===" -ForegroundColor Cyan
if (-not (Test-Path $nodePath)) {
    Write-Host "1. Il semble que Node.js ne soit pas correctement installé ou configuré."
    Write-Host "   Téléchargez et installez Node.js depuis : https://nodejs.org/"
    Write-Host "   Assurez-vous de cocher l'option 'Add to PATH' lors de l'installation."
} else {
    Write-Host "1. Node.js semble correctement installé, mais il pourrait y avoir un problème avec le PATH."
    Write-Host "   Vérifiez que le chemin suivant est bien dans votre variable d'environnement PATH :"
    Write-Host "   $([System.IO.Path]::GetDirectoryName($nodePath))"
}

Write-Host "`n2. Pour mettre à jour votre PATH dans VS Code :"
Write-Host "   - Appuyez sur Ctrl+Maj+P"
Write-Host "   - Tapez 'Reload Window' et sélectionnez 'Developer: Reload Window'"

Write-Host "`nAppuyez sur une touche pour continuer..." -NoNewline
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
