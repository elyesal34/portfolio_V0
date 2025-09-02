@echo off
echo === Test de commandes de base ===
echo.

echo [1/4] Vérification de la commande ECHO
echo Ceci est un test de la commande ECHO

if "%ERRORLEVEL%"=="0" (
    echo [SUCCÈS] Commande ECHO fonctionnelle
) else (
    echo [ERREUR] Problème avec la commande ECHO
)

echo.
echo [2/4] Vérification de l'accès au disque
echo Test de fichier > test-file.txt

if exist test-file.txt (
    echo [SUCCÈS] Création de fichier réussie
    echo Contenu du fichier:
    type test-file.txt
    del test-file.txt
) else (
    echo [ERREUR] Impossible de créer un fichier
)

echo.
echo [3/4] Vérification de Node.js
where node >nul 2>&1
if "%ERRORLEVEL%"=="0" (
    echo [SUCCÈS] Node.js est dans le PATH
    for /f "tokens=*" %%a in ('node -v') do set NODE_VERSION=%%a
    echo Version de Node.js: %NODE_VERSION%
) else (
    echo [ERREUR] Node.js n'est pas dans le PATH
)

echo.
echo [4/4] Exécution d'un script Node.js simple
echo console.log('Test de Node.js réussi'); > test-node.js
node test-node.js
if "%ERRORLEVEL%"=="0" (
    echo [SUCCÈS] Script Node.js exécuté avec succès
) else (
    echo [ERREUR] Échec de l'exécution du script Node.js
)
del test-node.js

echo.
echo === Test terminé ===
pause
