import React from 'react'

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
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#e2e8f0'
  }}>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        linear-gradient(rgba(0, 212, 255, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 212, 255, 0.08) 1px, transparent 1px)
      `,
      backgroundSize: '30px 30px',
      animation: 'gridMove 20s linear infinite'
    }} />
    <div style={{
      position: 'absolute',
      top: '10%',
      left: '10%',
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'pulse-glow 8s ease-in-out infinite'
    }} />
    <div style={{
      position: 'absolute',
      bottom: '15%',
      right: '15%',
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'pulse-glow 10s ease-in-out infinite 2s'
    }} />
    <div style={{ textAlign: 'center', zIndex: 10, padding: '40px' }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏫</div>
      <h1 style={{
        fontSize: '28px',
        color: '#00d4ff',
        marginBottom: '16px',
        textShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
      }}>
        数字孪生校园平台
      </h1>
      <p style={{
        fontSize: '14px',
        color: '#94a3b8',
        maxWidth: '400px',
        lineHeight: '1.8'
      }}>
        WebGL 渲染环境不可用
        <br />
        但您可以继续使用其他功能
      </p>
    </div>
    <style>{`
      @keyframes gridMove {
        0% { background-position: 0 0; }
        100% { background-position: 30px 30px; }
      }
      @keyframes pulse-glow {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
      }
    `}</style>
  </div>
)

export class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    console.error('3D 场景错误:', error)
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Scene3D 错误详情:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <StaticFallbackBackground />
    }
    return this.props.children
  }
}
