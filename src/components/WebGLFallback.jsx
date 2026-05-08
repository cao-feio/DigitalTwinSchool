import React, { useEffect, useState } from 'react'

// 检测 WebGL 支持
export const isWebGLSupported = () => {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

// 静态回退背景
export const StaticFallbackBackground = () => (
  <div style={{
    width: '100%',
    height: '100%',
    background: `
      radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.12) 0%, transparent 35%),
      linear-gradient(135deg, #010a1f 0%, #01153c 50%, #000c2a 100%)
    `,
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px',
      animation: 'gridMove 20s linear infinite'
    }} />
    <style>{`
      @keyframes gridMove {
        0% { background-position: 0 0; }
        100% { background-position: 60px 60px; }
      }
    `}</style>
  </div>
)

// 错误提示组件
export const WebGLNotSupported = () => (
  <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #010a1f 0%, #01153c 50%, #000c2a 100%)',
    color: '#e0f0ff',
    padding: '40px',
    textAlign: 'center'
  }}>
    <div style={{ fontSize: '48px', marginBottom: '20px' }}>🖥️</div>
    <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#00d4ff' }}>WebGL 暂不可用</h2>
    <p style={{ fontSize: '14px', color: '#94a3b8', maxWidth: '400px' }}>
      当前浏览器环境不支持 WebGL，无法渲染 3D 场景。
      <br />
      请尝试使用现代浏览器（Chrome、Firefox 或 Edge）。
    </p>
  </div>
)

// WebGL 包装组件
export const WebGLWrapper = ({ children, fallback = <StaticFallbackBackground /> }) => {
  const [supported, setSupported] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setSupported(isWebGLSupported())
  }, [])

  const handleError = () => {
    setError(true)
  }

  if (!supported || error) {
    return fallback
  }

  return (
    <ErrorBoundary onError={handleError} fallback={fallback}>
      {children}
    </ErrorBoundary>
  )
}

// 错误边界组件
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('WebGL Error:', error, errorInfo)
    if (this.props.onError) {
      this.props.onError()
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}
