@echo off
echo === Vérification de l'environnement ===
echo.

echo [1/5] Vérification de Node.js...
node --version
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Node.js n'est pas correctement installé
    exit /b 1
)

echo.
echo [2/5] Vérification de npm...
npm --version
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: npm n'est pas correctement installé
    exit /b 1
)

echo.
echo [3/5] Test d'écriture de fichier...
echo Test d'écriture > test-file.txt
if exist test-file.txt (
    echo Fichier créé avec succès
    del test-file.txt
) else (
    echo ERREUR: Impossible d'écrire dans le répertoire
)

echo.
echo [4/5] Exécution d'un script Node.js...
echo console.log('Test réussi'); > test-script.js
node test-script.js > test-output.txt 2>&1
if exist test-output.txt (
    echo Sortie du script:
    type test-output.txt
    del test-script.js test-output.txt
) else (
    echo ERREUR: Impossible d'exécuter le script Node.js
)

echo.
echo [5/5] Vérification terminée
timeout /t 5
