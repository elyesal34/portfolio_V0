@echo off
echo === Test Batch Basic ===
echo Date: %date% %time%
echo Current directory: %cd%

echo.
echo Checking Node.js installation...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not in PATH
    exit /b 1
)

node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not working
    exit /b 1
)

echo Node.js is installed and working
echo.

echo Creating a test file...
echo console.log('Test successful'); > test-basic.js

node test-basic.js
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to run test script
    exit /b 1
)

del test-basic.js

echo.
echo === Test completed successfully ===
pause
