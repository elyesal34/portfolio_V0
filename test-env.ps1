Write-Host "=== Vérification de l'environnement ===" -ForegroundColor Cyan

# Vérifier Node.js
$nodeVersion = node --version
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
    exit 1
}

# Vérifier npm
$npmVersion = npm --version
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
    exit 1
}

# Vérifier Vitest
Write-Host "`n=== Vérification de Vitest ===" -ForegroundColor Cyan
$vitestVersion = npx vitest --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Vitest version: $vitestVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Vitest n'est pas correctement installé" -ForegroundColor Red
    Write-Host "Tentative d'installation de Vitest..." -ForegroundColor Yellow
    npm install -D vitest
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Échec de l'installation de Vitest" -ForegroundColor Red
        exit 1
    }
}

# Créer un fichier de test simple
$testContent = @'
import { test, expect } from 'vitest';

test('addition', () => {
  expect(1 + 1).toBe(2);
});
'@

Set-Content -Path "./simple-test.js" -Value $testContent
Write-Host "`n=== Fichier de test créé: simple-test.js ===" -ForegroundColor Cyan

# Exécuter le test
Write-Host "`n=== Exécution du test ===" -ForegroundColor Cyan
$testOutput = npx vitest run simple-test.js 2>&1 | Out-String

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Test exécuté avec succès" -ForegroundColor Green
    Write-Host $testOutput
} else {
    Write-Host "❌ Erreur lors de l'exécution du test" -ForegroundColor Red
    Write-Host $testOutput
}
