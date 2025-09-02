@echo off
echo === Test de base de Node.js ===
echo.

echo [1/4] Vérification de la version de Node.js...
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [SUCCÈS] Node.js est installé
    for /f "tokens=*" %%a in ('node -v') do set NODE_VERSION=%%a
    echo Version de Node.js: %NODE_VERSION%
) else (
    echo [ERREUR] Node.js n'est pas installé ou n'est pas dans le PATH
    goto :end
)

echo.
echo [2/4] Test d'exécution d'un script simple...
echo console.log('Test réussi depuis le script') > test-script.js
node test-script.js
if %ERRORLEVEL% EQU 0 (
    echo [SUCCÈS] Le script s'est exécuté avec succès
    del test-script.js
) else (
    echo [ERREUR] Échec de l'exécution du script
)

echo.
echo [3/4] Vérification de l'accès au système de fichiers...
echo Test d'écriture > test-file.txt
if exist test-file.txt (
    echo [SUCCÈS] Écriture réussie
    type test-file.txt
    del test-file.txt
) else (
    echo [ERREUR] Impossible d'écrire sur le disque
)

echo.
echo [4/4] Vérification des variables d'environnement...
echo PATH: %PATH%

:end
echo.
pause
