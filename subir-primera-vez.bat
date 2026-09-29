@echo off
chcp 65001 > nul
title Vincular y Subir a GitHub - Órbita Streaming
color 0A

echo ================================================================
echo    🪐 ÓRBITA STREAMING - VINCULAR CON TU CUENTA DE GITHUB
echo ================================================================
echo.

set "GIT_CMD=C:\Users\yoyo1\.gemini\antigravity\scratch\mingit\cmd\git.exe"
if not exist "%GIT_CMD%" set "GIT_CMD=git"

echo Ya tenemos listo y empaquetado todo el código en la rama 'main'.
echo.
echo Para subirlo por primera vez:
echo 1. Ve a https://github.com/new y crea un repositorio vacio
echo    (ejemplo: orbita-streaming) sin agregar README ni .gitignore.
echo 2. Copia la URL de tu repositorio (termina en .git).
echo.
set /p REPO_URL="Pega aquí la URL de tu repositorio de GitHub y presiona ENTER: "

if "%REPO_URL%"=="" (
    echo.
    echo [ERROR] No escribiste ninguna URL. Intentalo de nuevo.
    pause
    exit /b
)

echo.
echo [1/3] Conectando con tu repositorio remoto...
"%GIT_CMD%" remote remove origin 2>nul
"%GIT_CMD%" remote add origin %REPO_URL%

echo [2/3] Preparando rama principal 'main'...
"%GIT_CMD%" branch -M main

echo [3/3] Subiendo archivos a GitHub...
echo (Si es la primera vez, el navegador te pedirá confirmar tu inicio de sesión de GitHub)
"%GIT_CMD%" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo    ✅ ¡SUBIDO CON ÉXITO A GITHUB!
    echo ================================================================
    echo Ahora en tu repositorio de GitHub ve a:
    echo Settings ➔ Pages ➔ Branch: main ➔ Save
    echo ¡Y tu página web estará en vivo para todo el mundo!
) else (
    echo.
    echo [AVISO] Si te solicitó credenciales o token, asegúrate de autorizarlo en tu navegador.
)

echo.
pause
