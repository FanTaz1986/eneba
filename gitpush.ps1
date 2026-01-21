# Git Push Script for ENEBA App
# This script pushes the app to git and creates a .gitignore that allows .env

param(
    [string]$message = "Update ENEBA app"
)

Write-Host "[START] Starting Git Push for ENEBA App..." -ForegroundColor Green

# Check if git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Git is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Check if we're in a git repository
if (-not (Test-Path .git)) {
    Write-Host "[INIT] No git repository found. Initializing git..." -ForegroundColor Yellow
    git init
    Write-Host "[OK] Git repository initialized" -ForegroundColor Green
}

# Add all files
Write-Host "[ADD] Adding files..." -ForegroundColor Cyan
git add .
Write-Host "[OK] Files added" -ForegroundColor Green

# Check if there are changes to commit
$status = git status --porcelain
if (-not $status) {
    Write-Host "[WARN] No changes to commit" -ForegroundColor Yellow
    exit 0
}

# Commit changes
Write-Host "[COMMIT] Committing changes with message: '$message'" -ForegroundColor Cyan
git commit -m $message
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Commit failed" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Changes committed" -ForegroundColor Green

# Push to remote
Write-Host "[PUSH] Pushing to remote repository..." -ForegroundColor Cyan
git push -u origin main 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Successfully pushed to git!" -ForegroundColor Green
    Write-Host "[INFO] Your .env file is included in the push (allowed by .gitignore)" -ForegroundColor Green
} else {
    Write-Host "[WARN] Push encountered an issue. Check your git remote and branch setup." -ForegroundColor Yellow
    Write-Host "[HINT] Try: git push origin main" -ForegroundColor Yellow
}

Write-Host "[DONE] Complete!" -ForegroundColor Green
