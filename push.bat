@echo off
cd /d "c:\Users\hp\Desktop\AI_ASSISTANT DEMO"
del /f "finalcleanup.bat" 2>nul
del /f "gitconfig.bat" 2>nul
del /f "status.bat" 2>nul
del /f "cleanup.bat" 2>nul
git add -A > "C:\temp\pushlog.txt" 2>&1
echo === STATUS === >> "C:\temp\pushlog.txt"
git status --short >> "C:\temp\pushlog.txt" 2>&1
echo === COMMIT === >> "C:\temp\pushlog.txt"
git commit -m "Update navigation, contact CTA, enable live AI via OpenRouter, and clean up junk files" >> "C:\temp\pushlog.txt" 2>&1
echo === PUSH === >> "C:\temp\pushlog.txt"
git push origin main >> "C:\temp\pushlog.txt" 2>&1
echo DONE >> "C:\temp\pushlog.txt"
