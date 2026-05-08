@echo off
echo ==========================================
echo   数字孪生校园平台 - 启动脚本
echo ==========================================
echo.

REM 检查 node 是否安装
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 未检测到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)

echo [信息] 正在检查 node_modules...
if not exist "node_modules" (
    echo [信息] 正在安装依赖...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
)

echo [信息] 正在启动开发服务器...
echo.
call npm run dev

pause
