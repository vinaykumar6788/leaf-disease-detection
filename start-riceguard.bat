@echo off
setlocal enabledelayedexpansion
set "ROOT=%~dp0"

where py >nul 2>nul
if errorlevel 1 (
    echo Python is required but was not found on PATH.
    echo Install Python 3.10+ and reopen this terminal.
    pause
    exit /b 1
)

if not exist "%ROOT%backend\venv\Scripts\python.exe" (
    echo Creating backend virtual environment...
    py -3 -m venv "%ROOT%backend\venv"
)

call "%ROOT%backend\venv\Scripts\activate.bat"
python -m pip install --upgrade pip >nul
python -m pip install -r "%ROOT%backend\requirements.txt"

echo Starting RiceGuard backend...
start "RiceGuard Backend" cmd /k "cd /d ^"%ROOT%backend^" && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

for /L %%I in (1,1,30) do (
    powershell -NoProfile -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:8000/health' -UseBasicParsing -TimeoutSec 2; if ($r.StatusCode -eq 200) { exit 0 } } catch {}; exit 1" >nul 2>&1
    if not errorlevel 1 goto backend_ready
    timeout /t 1 >nul
)
:backend_ready

if not exist "%ROOT%frontend\node_modules" (
    echo Installing frontend dependencies...
    cd /d "%ROOT%frontend"
    call npm install
    cd /d "%ROOT%"
)

echo Starting RiceGuard frontend...
start "RiceGuard Frontend" cmd /k "cd /d ^"%ROOT%frontend^" && npm run dev -- --host 0.0.0.0"

echo.
echo RiceGuard is starting in separate terminal windows.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
pause
