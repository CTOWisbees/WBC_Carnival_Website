# One-time setup for the WBC content admin (Django).
# Run from anywhere:  npm run setup   (or)   powershell -ExecutionPolicy Bypass -File backend/setup.ps1
$ErrorActionPreference = "Stop"
# Make Python emit UTF-8 to the console regardless of the system code page.
$env:PYTHONIOENCODING = "utf-8"

$backend = $PSScriptRoot
$venv = Join-Path $backend ".venv"
$python = Join-Path $venv "Scripts\python.exe"

Write-Host "==> Setting up the WBC content admin in $backend" -ForegroundColor Cyan

if (-not (Test-Path $python)) {
    Write-Host "==> Creating Python virtual environment (.venv)..." -ForegroundColor Cyan
    py -3 -m venv $venv
}

Write-Host "==> Installing dependencies..." -ForegroundColor Cyan
& $python -m pip install --upgrade pip --quiet
& $python -m pip install -r (Join-Path $backend "requirements.txt")

Push-Location $backend
try {
    Write-Host "==> Creating & applying database migrations..." -ForegroundColor Cyan
    & $python manage.py makemigrations content
    if ($LASTEXITCODE -ne 0) { throw "makemigrations failed" }
    & $python manage.py migrate
    if ($LASTEXITCODE -ne 0) { throw "migrate failed" }
    Write-Host "==> Seeding the database with the site's current content..." -ForegroundColor Cyan
    & $python manage.py seed
    if ($LASTEXITCODE -ne 0) { throw "seed failed" }
}
finally {
    Pop-Location
}

Write-Host ""
Write-Host "==> Setup complete!" -ForegroundColor Green
Write-Host "    Start the site + admin together with:  npm run dev"
Write-Host "    Admin panel:  http://127.0.0.1:8000/admin"
