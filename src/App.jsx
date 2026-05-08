import React from 'react'
import { Layout } from 'antd'
import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import RightPanel from './components/RightPanel'
import Scene3D from './components/Scene3D'
import Login from './components/Login'
import { CornerDecoration, DataPanel } from './components/TechDecorations'
import { useStore } from './store/useStore'
import './styles/global.css'

const { Content } = Layout

// 公共配置
const configProviderProps = {
  locale: zhCN,
  theme: {
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: '#00d4ff',
      colorPrimaryBg: 'rgba(0, 212, 255, 0.1)',
      colorPrimaryBgHover: 'rgba(0, 212, 255, 0.2)',
      colorPrimaryBorder: 'rgba(0, 212, 255, 0.3)',
      colorPrimaryBorderHover: 'rgba(0, 212, 255, 0.5)',
      colorPrimaryHover: '#38bdf8',
      colorPrimaryActive: '#00d4ff',
      colorPrimaryTextHover: '#38bdf8',
      colorPrimaryText: '#00d4ff',
      colorSuccess: '#10b981',
      colorWarning: '#f59e0b',
      colorError: '#ef4444',
      colorInfo: '#3b82f6',
      borderRadius: 6,
      borderRadiusSM: 4,
      borderRadiusLG: 8,
      colorBgContainer: 'rgba(1, 21, 60, 0.95)',
      colorBgElevated: 'rgba(1, 25, 58, 0.92)',
      colorBgLayout: 'rgba(1, 18, 45, 0.88)',
      colorBgSpotlight: 'rgba(0, 212, 255, 0.1)',
      colorBorder: 'rgba(0, 212, 255, 0.3)',
      colorBorderSecondary: 'rgba(0, 212, 255, 0.2)',
      colorText: '#e2e8f0',
      colorTextSecondary: '#94a3b8',
      colorTextTertiary: '#64748b',
      colorTextQuaternary: '#475569',
      colorTextPlaceholder: '#64748b',
      colorTextHeading: '#ffffff',
      colorTextDescription: '#94a3b8',
      colorTextDisabled: '#475569',
      colorBgTextHover: 'rgba(0, 212, 255, 0.08)',
      colorBgTextActive: 'rgba(0, 212, 255, 0.12)',
      controlItemBgActive: 'rgba(0, 212, 255, 0.2)',
      controlItemBgHover: 'rgba(0, 212, 255, 0.1)',
      controlOutline: 'rgba(0, 212, 255, 0.4)',
      controlOutlineWidth: 2,
      fontFamily: "'Microsoft YaHei', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif",
      fontSize: 14,
      lineHeight: 1.6,
      fontWeightStrong: 600
    }
  }
}

// 粒子装饰组件
const ParticleDecoration = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${8 + Math.random() * 12}s`
  }))

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration
          }}
        />
      ))}
    </div>
  )
}

function App() {
  const { isLoggedIn, login } = useStore()

  if (!isLoggedIn) {
    return (
      <ConfigProvider {...configProviderProps}>
        <Login onLogin={login} />
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider {...configProviderProps}>
      <div className="tech-bg" style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-pattern" />
        
        {/* 粒子装饰 */}
        <ParticleDecoration />
        
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

        {/* 底部数据面板 */}
        <div style={{ position: 'absolute', bottom: '25px', left: '50%', transform: 'translateX(-50%)', zIndex: 15 }}>
          <DataPanel />
        </div>
      </div>
    </ConfigProvider>
  )
}

export default App
