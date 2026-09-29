@echo off
chcp 65001 > nul
title Subir Órbita Streaming a GitHub
color 0A

echo ================================================================
echo    🪐 ÓRBITA STREAMING - SUBIDA AUTOMÁTICA A GITHUB
echo ================================================================
echo.

set "GIT_CMD=C:\Users\yoyo1\.gemini\antigravity\scratch\mingit\cmd\git.exe"
if not exist "%GIT_CMD%" set "GIT_CMD=C:\Users\yoyo1\AppData\Local\GitHubDesktop\app-3.6.6\resources\app\git\cmd\git.exe"
if not exist "%GIT_CMD%" set "GIT_CMD=git"

echo Repositorio vinculado:
echo https://github.com/carlosdaniel12b-debug/orbita-streaming.git
echo.
echo Rama activa: main
echo.
echo Subiendo tus archivos a GitHub...
echo (Si es la primera vez, se abrirá una ventana para confirmar tu inicio de sesión de GitHub)
echo.

"%GIT_CMD%" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo    ✅ ¡SUBIDO CON ÉXITO A GITHUB!
    echo ================================================================
    echo Ahora en tu repositorio de GitHub:
    echo 1. Ve a https://github.com/carlosdaniel12b-debug/orbita-streaming
    echo 2. Entra a Settings ➔ Pages
    echo 3. En Branch selecciona "main" y haz clic en "Save"
    echo ¡Y tu página web estará en vivo para todo el mundo!
) else (
    echo.
    echo ================================================================
    echo Si te apareció una ventana en el navegador, autoriza el inicio de sesión.
    echo O abre la aplicación GitHub Desktop y presiona "Push origin".
    echo ================================================================
)

echo.
pause
