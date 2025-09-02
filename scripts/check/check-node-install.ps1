# Script pour vérifier l'installation de Node.js et npm

function Test-CommandExists {
    param($command)
    $exists = $null -ne (Get-Command $command -ErrorAction SilentlyContinue)
    return $exists
}

Write-Output "=== Vérification de l'installation de Node.js et npm ==="
Write-Output ""

# Vérifier Node.js
$nodeExists = Test-CommandExists "node"
if ($nodeExists) {
    $nodeVersion = node --version
    $nodePath = (Get-Command node).Source
    Write-Output "✅ Node.js est installé"
    Write-Output "   Version: $nodeVersion"
    Write-Output "   Emplacement: $nodePath"
} else {
    Write-Output "❌ Node.js n'est pas installé ou n'est pas dans le PATH"
}

Write-Output ""

# Vérifier npm
$npmExists = Test-CommandExists "npm"
if ($npmExists) {
    $npmVersion = npm --version
    $npmPath = (Get-Command npm).Source
    Write-Output "✅ npm est installé"
    Write-Output "   Version: $npmVersion"
    Write-Output "   Emplacement: $npmPath"
} else {
    Write-Output "❌ npm n'est pas installé ou n'est pas dans le PATH"
}

Write-Output ""

# Vérifier les variables d'environnement
Write-Output "=== Variables d'environnement ==="
Write-Output "NODE_PATH: $($env:NODE_PATH)"
Write-Output "NPM_CONFIG_PREFIX: $($env:NPM_CONFIG_PREFIX)"
Write-Output ""

# Vérifier les droits d'administration
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
Write-Output "=== Droits d'administration ==="
if ($isAdmin) {
    Write-Output "⚠️  Le terminal est exécuté en tant qu'administrateur"
} else {
    Write-Output "ℹ️  Le terminal n'est pas exécuté en tant qu'administrateur"
}

Write-Output ""
Write-Output "=== Test d'exécution de script ==="
try {
    $testFile = "$pwd\test-script.txt"
    "Test d'écriture" | Out-File -FilePath $testFile -Force
    if (Test-Path $testFile) {
        Remove-Item -Path $testFile -Force -ErrorAction SilentlyContinue
        Write-Output "✅ Test d'écriture réussi"
    } else {
        Write-Output "❌ Échec du test d'écriture"
    }
} catch {
    Write-Output "❌ Erreur lors du test d'écriture: $_"
}

Write-Output ""
Write-Output "=== Fin de la vérification ==="
