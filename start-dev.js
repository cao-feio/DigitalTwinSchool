const { execSync } = require('child_process')

console.log('==========================================')
console.log('  数字孪生校园平台')
console.log('==========================================\n')
console.log('正在启动开发服务器...\n')

try {
  execSync('npm run dev', {
    cwd: __dirname,
    stdio: 'inherit'
  })
} catch (error) {
  console.error('\n❌ 发生错误:', error.message)
}
