@echo off
chcp 65001 > nul
title Actualizar Órbita Streaming en GitHub
color 0B

echo ================================================================
echo    🪐 ÓRBITA STREAMING - ACTUALIZADOR AUTOMÁTICO DE GITHUB
echo ================================================================
echo.

set "GIT_CMD=C:\Users\yoyo1\.gemini\antigravity\scratch\mingit\cmd\git.exe"
if not exist "%GIT_CMD%" set "GIT_CMD=C:\Users\yoyo1\AppData\Local\GitHubDesktop\app-3.6.6\resources\app\git\cmd\git.exe"
if not exist "%GIT_CMD%" set "GIT_CMD=git"

echo [1/3] Detectando archivos modificados o agregados...
"%GIT_CMD%" add .

set "MSG=%~1"
if "%MSG%"=="" (
    set /p MSG="Escribe una breve descripción de lo que cambiaste (o presiona ENTER para usar la fecha actual): "
)
if "%MSG%"=="" (
    set "MSG=Actualización de Órbita Streaming %date% %time%"
)

echo.
echo [2/3] Guardando cambios locales...
"%GIT_CMD%" commit -m "%MSG%"

echo.
echo [3/3] Subiendo cambios a GitHub...
"%GIT_CMD%" push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo    ✅ ¡CAMBIOS SUBIDOS CON ÉXITO A GITHUB!
    echo ================================================================
    echo Si tienes GitHub Pages activo, tu web en vivo se actualizará
    echo automáticamente en aproximadamente 1 minuto.
) else (
    echo.
    echo [ERROR] Hubo un problema al subir los cambios a GitHub.
    echo Puedes abrir GitHub Desktop y presionar "Push origin".
)

echo.
pause
