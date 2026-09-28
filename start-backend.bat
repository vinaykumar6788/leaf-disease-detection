@echo off
setlocal
set "ROOT=%~dp0"

echo ===================================================
echo Starting RiceGuard FastAPI Backend on Port 8000...
echo ===================================================

where py >nul 2>nul
if not errorlevel 1 (
    set "PYTHON_CMD=py -3"
) else (
    set "PYTHON_CMD=python"
)

cd /d "%ROOT%backend"
if not exist ".\venv\Scripts\python.exe" (
    echo Creating backend virtual environment...
    %PYTHON_CMD% -m venv venv
)

call ".\venv\Scripts\activate.bat"
python -m pip install --upgrade pip >nul 2>&1
python -m pip install -r requirements.txt >nul 2>&1
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
if errorlevel 1 pause
