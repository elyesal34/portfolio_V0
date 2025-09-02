# Script de diagnostic pour Node.js

# Définir l'encodage de sortie en UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

function Write-Header($message) {
    Write-Host "`n=== $message ===" -ForegroundColor Cyan
}

function Test-CommandExists($command) {
    $exists = $null -ne (Get-Command $command -ErrorAction SilentlyContinue)
    if ($exists) {
        Write-Host "[SUCCÈS] $command est disponible" -ForegroundColor Green
        return $true
    } else {
        Write-Host "[ERREUR] $command n'est pas disponible" -ForegroundColor Red
        return $false
    }
}

function Test-NodeInstallation {
    Write-Header "1. Vérification de l'installation de Node.js"
    
    $nodeExists = Test-CommandExists "node"
    $npmExists = Test-CommandExists "npm"
    
    if ($nodeExists) {
        $nodeVersion = node -v
        Write-Host "Version de Node.js: $nodeVersion" -ForegroundColor Green
    }
    
    if ($npmExists) {
        $npmVersion = npm -v
        Write-Host "Version de npm: $npmVersion" -ForegroundColor Green
    }
    
    # Vérifier l'emplacement de Node.js
    try {
        $nodePath = (Get-Command node).Source
        Write-Host "Emplacement de Node.js: $nodePath" -ForegroundColor Green
    } catch {
        Write-Host "Impossible de déterminer l'emplacement de Node.js" -ForegroundColor Red
    }
}

function Test-NodeExecution {
    Write-Header "2. Test d'exécution de Node.js"
    
    $testScript = @"
    console.log('Ceci est un test de Node.js');
    console.log('Version de Node.js:', process.version);
    console.log('Plateforme:', process.platform, process.arch);
    console.log('Répertoire courant:', process.cwd());
    console.log('Encodage par défaut:', process.env.PYTHONIOENCODING || 'utf8');
"@
    
    $tempFile = [System.IO.Path]::GetTempFileName() + ".js"
    $testScript | Out-File -FilePath $tempFile -Encoding utf8
    
    try {
        Write-Host "Exécution du script de test..." -ForegroundColor Yellow
        $output = node $tempFile 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[SUCCÈS] Le script s'est exécuté avec succès" -ForegroundColor Green
            $output | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
        } else {
            Write-Host "[ERREUR] Échec de l'exécution du script" -ForegroundColor Red
            $output | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
        }
    } catch {
        Write-Host "[ERREUR] Exception lors de l'exécution du script: $_" -ForegroundColor Red
    } finally {
        if (Test-Path $tempFile) {
            Remove-Item $tempFile -Force
        }
    }
}

function Test-FileSystemAccess {
    Write-Header "3. Test d'accès au système de fichiers"
    
    $testFile = "$PWD\test-file-$(Get-Date -Format 'yyyyMMddHHmmss').txt"
    $testContent = "Ceci est un test d'écriture de fichier avec des caractères accentués: éèàç"
    
    try {
        # Test d'écriture
        $testContent | Out-File -FilePath $testFile -Encoding utf8
        
        if (Test-Path $testFile) {
            Write-Host "[SUCCÈS] Fichier créé avec succès" -ForegroundColor Green
            
            # Test de lecture
            $content = Get-Content $testFile -Raw
            Write-Host "Contenu du fichier: $content" -ForegroundColor Gray
            
            # Nettoyage
            Remove-Item $testFile -Force
            Write-Host "Fichier de test supprimé" -ForegroundColor Green
        } else {
            Write-Host "[ERREUR] Impossible de créer le fichier de test" -ForegroundColor Red
        }
    } catch {
        Write-Host "[ERREUR] Erreur lors du test du système de fichiers: $_" -ForegroundColor Red
    }
}

function Check-EnvironmentVariables {
    Write-Header "4. Vérification des variables d'environnement"
    
    $envVars = @(
        "PATH",
        "NODE_PATH",
        "NVM_HOME",
        "NVM_SYMLINK",
        "PYTHONIOENCODING",
        "NODE_OPTIONS"
    )
    
    foreach ($var in $envVars) {
        $value = [Environment]::GetEnvironmentVariable($var, "Machine")
        if ([string]::IsNullOrEmpty($value)) {
            $value = [Environment]::GetEnvironmentVariable($var, "User")
        }
        
        if (-not [string]::IsNullOrEmpty($value)) {
            Write-Host "$($var):" -ForegroundColor Yellow
            $value -split ';' | Where-Object { -not [string]::IsNullOrEmpty($_) } | ForEach-Object {
                Write-Host "  $_" -ForegroundColor Gray
            }
        } else {
            Write-Host "$($var): Non défini" -ForegroundColor DarkGray
        }
    }
}

# Exécution des tests
Write-Host "`n=== Diagnostic de l'environnement Node.js ===" -ForegroundColor Cyan
Write-Host "Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray

Test-NodeInstallation
Test-NodeExecution
Test-FileSystemAccess
Check-EnvironmentVariables

Write-Host "`n=== Fin du diagnostic ===`n" -ForegroundColor Cyan

# Attendre la saisie de l'utilisateur avant de fermer
Write-Host "Appuyez sur une touche pour continuer..." -NoNewline
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
