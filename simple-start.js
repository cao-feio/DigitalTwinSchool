
const path = require('path')
const fs = require('fs')

console.log('==========================================')
console.log('  数字孪生校园平台')
console.log('==========================================\n')

const nodeModulesPath = path.join(__dirname, 'node_modules')
const viteBinPath = path.join(nodeModulesPath, '.bin', 'vite.cmd')

if (!fs.existsSync(nodeModulesPath)) {
  console.log('❌ 依赖未安装，请先运行 npm install')
  console.log('💡 提示：请在 CMD 或 PowerShell 中运行 install.js')
  process.exit(1)
}

console.log('✅ 已找到依赖，正在启动开发服务器...\n')
console.log('🚀 服务器将启动在 http://localhost:3000\n')

try {
  const { spawn } = require('child_process')
  
  const viteProcess = spawn('node', [
    path.join(nodeModulesPath, 'vite', 'bin', 'vite.js')
  ], {
    cwd: __dirname,
    shell: true,
    stdio: 'inherit'
  })
  
  viteProcess.on('close', (code) => {
    console.log(`\n服务器已退出，代码: ${code}`)
  })
  
} catch (error) {
  console.error('\n❌ 启动失败:', error.message)
}

