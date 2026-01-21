#!/usr/bin/env powershell

# ENEBA Backend + Frontend Startup Script

Write-Host "🚀 ENEBA Store - Backend Integration" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📋 Instructions:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Option 1: Run Both Servers (Recommended)" -ForegroundColor Green
Write-Host "  Open 2 terminals:" -ForegroundColor Gray
Write-Host "  Terminal 1: npm run server" -ForegroundColor White
Write-Host "  Terminal 2: npm start" -ForegroundColor White
Write-Host ""

Write-Host "Option 2: Run Together" -ForegroundColor Green
Write-Host "  npm run go" -ForegroundColor White
Write-Host "  (Requires concurrently package)" -ForegroundColor Gray
Write-Host ""

Write-Host "✅ Available Endpoints:" -ForegroundColor Yellow
Write-Host ""
Write-Host "List all games:" -ForegroundColor Gray
Write-Host "  GET /list" -ForegroundColor Cyan
Write-Host ""
Write-Host "Search games (fuzzy):" -ForegroundColor Gray
Write-Host "  GET /list?search=fifa" -ForegroundColor Cyan
Write-Host "  GET /list?search=red" -ForegroundColor Cyan
Write-Host "  GET /list?search=rpg" -ForegroundColor Cyan
Write-Host ""

Write-Host "Alternative (same functionality):" -ForegroundColor Gray
Write-Host "  GET /api/products?search=zelda" -ForegroundColor Cyan
Write-Host ""

Write-Host "📊 Frontend Access:" -ForegroundColor Yellow
Write-Host "  http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

Write-Host "🗄️  Backend Access:" -ForegroundColor Yellow
Write-Host "  http://localhost:5000/list" -ForegroundColor Cyan
Write-Host ""

Write-Host "🧪 Test Database:" -ForegroundColor Yellow
Write-Host "  node verify_db.js" -ForegroundColor White
Write-Host ""

Write-Host "✨ All features integrated and ready to use!" -ForegroundColor Green
