import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import RightPanel from './components/RightPanel'
import Scene3D from './components/Scene3D'
import Login from './components/Login'
import { useStore } from './store/useStore'
import './styles/global.css'

const { Content } = Layout

// 简洁配置
const configProviderProps = {
  locale: zhCN,
  theme: {
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#ff4d4f',
      colorInfo: '#1890ff',
      borderRadius: 6,
      colorBgContainer: 'rgba(20, 30, 48, 0.95)',
      colorBgElevated: 'rgba(20, 30, 48, 0.92)',
      colorBgLayout: 'rgba(10, 15, 25, 0.9)',
      colorBorder: 'rgba(100, 150, 200, 0.3)',
      colorText: '#e6f2ff',
      colorTextSecondary: '#a0b8cc',
      colorTextPlaceholder: '#6c8ba8',
      fontFamily: '"Microsoft YaHei", "PingFang SC", "Helvetica Neue", Arial, sans-serif',
      fontSize: 14,
      lineHeight: 1.5
    }
  }
}

function App() {
  const { isLoggedIn, login, initializeAuth } = useStore()
  const [authInitialized, setAuthInitialized] = useState(false)

  useEffect(() => {
    console.log('App 初始化，开始恢复登录状态...')
    initializeAuth()
    setAuthInitialized(true)
  }, [initializeAuth])

  if (!authInitialized) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0f19',
        color: '#1890ff',
        fontSize: '18px'
      }}>
        正在加载...
      </div>
    )
  }

  console.log('当前登录状态:', isLoggedIn)

  if (!isLoggedIn) {
    return (
      <ConfigProvider {...configProviderProps}>
        <Login onLogin={login} />
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider {...configProviderProps}>
      <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden', background: '#0a0f19' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
          <Scene3D />
        </div>

        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
          <Header />
        </div>

        <div style={{ position: 'absolute', top: '70px', left: '15px', zIndex: 10 }}>
          <Sidebar />
        </div>

        <div style={{ position: 'absolute', top: '70px', right: '15px', zIndex: 10 }}>
          <RightPanel />
        </div>
      </div>
    </ConfigProvider>
  )
}

export default App
