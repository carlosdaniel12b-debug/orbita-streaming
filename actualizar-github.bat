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
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$code = @\"`nusing System;`nusing System.Runtime.InteropServices;`nusing System.Text;`npublic class Cred {`n    [DllImport(\"advapi32.dll\", EntryPoint = \"CredReadW\", CharSet = CharSet.Unicode, SetLastError = true)]`n    public static extern bool CredRead(string target, int type, int reservedFlag, out IntPtr credentialPtr);`n    [DllImport(\"advapi32.dll\", EntryPoint = \"CredFree\")]`n    public static extern void CredFree(IntPtr buffer);`n    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]`n    public struct CREDENTIAL { public int Flags; public int Type; public string TargetName; public string Comment; public System.Runtime.InteropServices.ComTypes.FILETIME LastWritten; public int CredentialBlobSize; public IntPtr CredentialBlob; }`n    public static string Get(string target) { IntPtr ptr; if (CredRead(target, 1, 0, out ptr)) { CREDENTIAL cred = (CREDENTIAL)Marshal.PtrToStructure(ptr, typeof(CREDENTIAL)); byte[] bytes = new byte[cred.CredentialBlobSize]; Marshal.Copy(cred.CredentialBlob, bytes, 0, cred.CredentialBlobSize); CredFree(ptr); return Encoding.UTF8.GetString(bytes); } return null; }`n}`n\"@; Add-Type -TypeDefinition $code; $tok = [Cred]::Get(\"GitHub - https://api.github.com/carlosdaniel12b-debug\"); $git = '%GIT_CMD%'; if ($tok) { & $git push \"https://x-access-token:$tok@github.com/carlosdaniel12b-debug/orbita-streaming.git\" main:main --quiet } else { & $git push origin main }"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo    ✅ ¡CAMBIOS SUBIDOS CON ÉXITO A GITHUB!
    echo ================================================================
    echo Tu web en vivo se actualizara en aproximadamente 1 minuto en:
    echo 👉 https://carlosdaniel12b-debug.github.io/orbita-streaming/
) else (
    echo.
    echo [ERROR] Hubo un problema al subir los cambios a GitHub.
    echo Puedes abrir GitHub Desktop y presionar "Push origin".
)

echo.
pause
