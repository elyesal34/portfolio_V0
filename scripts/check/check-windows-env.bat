@echo off
echo === Vérification de l'environnement Windows ===
echo.

echo 1. Version de Windows:
ver
echo.

echo 2. Répertoire courant:
cd
echo.

echo 3. Variables d'environnement:
echo   - USERNAME: %USERNAME%
echo   - USERPROFILE: %USERPROFILE%
echo   - APPDATA: %APPDATA%
echo   - LOCALAPPDATA: %LOCALAPPDATA%
echo   - TEMP: %TEMP%
echo   - PATH: %PATH:~0,200%...
echo.

echo 4. Vérification de Node.js:
where node
echo.
"C:\Program Files\nodejs\node.exe" --version
echo.

echo 5. Test d'écriture:
echo Test d'écriture > test-write.txt
if exist test-write.txt (
    echo   Fichier créé avec succès
    del test-write.txt
) else (
    echo   Échec de la création du fichier
)
echo.

echo === Fin de la vérification ===
pause
