# Vérification des autorisations et chemins
Write-Output "=== Vérification des autorisations ==="

# 1. Vérifier le répertoire courant
$currentDir = Get-Location
Write-Output "1. Répertoire courant: $currentDir"

# 2. Vérifier les autorisations sur le répertoire
$acl = Get-Acl -Path .
Write-Output "2. Propriétaire du répertoire: $($acl.Owner)"

# 3. Vérifier l'accès en écriture
$testFile = "$pwd\test-write.txt"
try {
    "Test d'écriture" | Out-File -FilePath $testFile -Force
    Remove-Item -Path $testFile -Force -ErrorAction SilentlyContinue
    Write-Output "3. Test d'écriture: SUCCÈS"
} catch {
    Write-Output "3. Test d'écriture: ÉCHEC - $_"
}

# 4. Vérifier l'accès à Node.js
Write-Output "4. Vérification de Node.js:"
try {
    $nodePath = (Get-Command node).Source
    Write-Output "   Node.js trouvé à: $nodePath"
    Write-Output "   Version: $(node --version)"
} catch {
    Write-Output "   Node.js n'est pas accessible: $_"
}

# 5. Vérifier les variables d'environnement
Write-Output "5. Variables d'environnement:"
Write-Output "   NODE_ENV: $($env:NODE_ENV)"
Write-Output "   PATH (premiers chemins):"
$env:Path -split ';' | Select-Object -First 5 | ForEach-Object { Write-Output "     $_" }

Write-Output "=== Fin de la vérification ==="
