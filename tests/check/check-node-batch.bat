@echo off
echo === Vérification de Node.js ===
echo.

where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [SUCCÈS] Node.js est installé
    node --version
) else (
    echo [ERREUR] Node.js n'est pas installé ou n'est pas dans le PATH
)

echo.
pause
