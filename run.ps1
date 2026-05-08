
# 临时设置执行策略
$policy = Get-ExecutionPolicy -Scope Process
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

Write-Host "=========================================="
Write-Host "  数字孪生校园平台"
Write-Host "=========================================="
Write-Host ""

if (!(Test-Path "node_modules")) {
  Write-Host "正在安装依赖..."
  npm install
  if ($LASTEXITCODE -ne 0) {
    Write-Host "依赖安装失败"
    exit $LASTEXITCODE
  }
}

Write-Host "正在启动开发服务器..."
Write-Host ""

npm run dev

