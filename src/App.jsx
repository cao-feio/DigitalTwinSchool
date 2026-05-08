import React from 'react'
import { Layout } from 'antd'
import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import RightPanel from './components/RightPanel'
import Scene3D from './components/Scene3D'
import Login from './components/Login'
import { CornerDecoration } from './components/TechDecorations'
import { useStore } from './store/useStore'
import './styles/global.css'

const { Content } = Layout

function App() {
  const { isLoggedIn, login } = useStore()

  if (!isLoggedIn) {
    return (
      <ConfigProvider
        locale={zhCN}
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#00d4ff',
            borderRadius: 4,
            colorBgContainer: 'rgba(1, 21, 60, 0.95)',
            colorBorder: 'rgba(0, 212, 255, 0.3)',
            colorText: '#e2e8f0',
            colorTextSecondary: '#94a3b8'
          }
        }}
      >
        <Login onLogin={login} />
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#00d4ff',
          borderRadius: 4,
          colorBgContainer: 'rgba(1, 21, 60, 0.95)',
          colorBorder: 'rgba(0, 212, 255, 0.3)',
          colorText: '#e2e8f0',
          colorTextSecondary: '#94a3b8'
        }
      }}
    >
      <div className="tech-bg" style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-pattern" />
        
        {/* 3D场景铺满全屏 */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
          <Scene3D />
        </div>

        {/* 装饰元素 */}
        <CornerDecoration />

        {/* 顶部导航栏 */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}>
          <Header />
        </div>

        {/* 左侧工具栏 */}
        <div style={{ position: 'absolute', top: '95px', left: '20px', zIndex: 20 }}>
          <Sidebar />
        </div>

        {/* 右侧面板 */}
        <div style={{ position: 'absolute', top: '95px', right: '20px', zIndex: 20 }}>
          <RightPanel />
        </div>
      </div>
    </ConfigProvider>
  )
}

export default App
