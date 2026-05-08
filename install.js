const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('==========================================')
console.log('  数字孪生校园平台 - 依赖安装')
console.log('==========================================\n')

try {
  console.log('[1/3] 正在安装依赖...\n')
  execSync('npm install', {
    cwd: __dirname,
    stdio: 'inherit'
  })

  console.log('\n✅ 依赖安装成功！')
  
  console.log('\n==========================================')
  console.log('  启动开发服务器')
  console.log('==========================================\n')
  console.log('[3/3] 正在启动...')
  
  execSync('npm run dev', {
    cwd: __dirname,
    stdio: 'inherit'
  })
} catch (error) {
  console.error('\n❌ 发生错误:', error.message)
  process.exit(1)
}
