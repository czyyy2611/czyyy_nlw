@echo off
cd /d "%~dp0"
title czyyy blog preview

echo.
echo   ============================================
echo     czyyy 的博客 - 本地预览
echo   ============================================
echo.
echo   地址: http://localhost:4000/czyyy_nlw/
echo.
echo   写作时保持本窗口开着，保存文件后浏览器会自动刷新。
echo   关闭本窗口 = 停止预览。
echo.

call npm run s -- --open

echo.
echo   预览已停止。
pause
