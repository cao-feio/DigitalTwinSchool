import React, { useState, useEffect } from 'react'

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()]
    return `${year}年${month}月${day}日 ${weekday}`
  }

  return (
    <header style={{
      width: '100%',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: 'linear-gradient(180deg, rgba(1, 35, 75, 0.96) 0%, rgba(1, 22, 55, 0.92) 50%, rgba(1, 18, 45, 0.88) 100%)',
      borderBottom: '2px solid rgba(0, 212, 255, 0.35)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5), 0 0 60px rgba(0, 212, 255, 0.1)'
    }}>
      {/* 顶部装饰线 */}
      <div className="header-border" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3
      }} />

      {/* 两侧装饰元素 */}
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        width: '100px',
        height: '50px',
        borderTop: '2px solid rgba(0, 212, 255, 0.6)',
        borderLeft: '2px solid rgba(0, 212, 255, 0.6)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        width: '100px',
        height: '50px',
        borderTop: '2px solid rgba(0, 212, 255, 0.6)',
        borderRight: '2px solid rgba(0, 212, 255, 0.6)',
        pointerEvents: 'none'
      }} />

      {/* 左侧Logo区域 */}
      <div style={{
        position: 'absolute',
        left: '40px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
        zIndex: 5
      }}>
        {/* Logo图标 */}
        <div style={{
          width: '54px',
          height: '54px',
          background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.18) 0%, rgba(96, 165, 250, 0.12) 50%, rgba(139, 92, 246, 0.08) 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid rgba(0, 212, 255, 0.5)',
          boxShadow: '0 0 30px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1)'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.6">
            <rect x="3" y="11" width="7" height="10" rx="1.2" />
            <rect x="14" y="7" width="7" height="14" rx="1.2" />
            <path d="M10 12h3" />
            <path d="M12 7v5" />
          </svg>
        </div>
        
        {/* 标题小字 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
        }}>
          <div style={{ 
            fontSize: '12px', 
            color: 'rgba(226, 232, 240, 0.75)', 
            letterSpacing: '3px',
            fontWeight: 500
          }}>数字孪生</div>
          <div style={{ 
            fontSize: '15px', 
            color: '#00d4ff', 
            fontWeight: '600', 
            letterSpacing: '1.5px',
            textShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
          }}>校园可视化平台</div>
        </div>
      </div>

      {/* 中间主标题 */}
      <div style={{
        position: 'relative',
        zIndex: 5
      }}>
        {/* 标题光晕背景 */}
        <div style={{
          position: 'absolute',
          top: '-25px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '520px',
          height: '100px',
          background: 'radial-gradient(ellipse, rgba(0, 212, 255, 0.25) 0%, rgba(96, 165, 250, 0.12) 40%, transparent 70%)',
          clipPath: 'polygon(6% 0%, 94% 0%, 100% 100%, 0% 100%)',
          zIndex: 1
        }} />
        
        <h1 className="tech-title" style={{
          position: 'relative',
          zIndex: 2,
          fontSize: '38px',
          fontWeight: 'bold',
          letterSpacing: '12px',
          margin: 0,
          lineHeight: '1.15',
          textAlign: 'center'
        }}>
          数字孪生校园平台
        </h1>
        
        {/* 底部装饰线 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '14px',
          marginTop: '10px'
        }}>
          <div style={{ 
            width: '140px', 
            height: '3px', 
            background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.9), rgba(96, 165, 250, 0.7), transparent)',
            borderRadius: '2px'
          }} />
          <div style={{ 
            width: '8px', 
            height: '8px', 
            background: '#00d4ff', 
            borderRadius: '50%', 
            boxShadow: '0 0 15px rgba(0, 212, 255, 0.9), 0 0 30px rgba(0, 212, 255, 0.5)',
            animation: 'pulse-glow 2s ease-in-out infinite'
          }} />
          <div style={{ 
            width: '140px', 
            height: '3px', 
            background: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.7), rgba(0, 212, 255, 0.9), transparent)',
            borderRadius: '2px'
          }} />
        </div>
      </div>

      {/* 右侧时间和状态区域 */}
      <div style={{
        position: 'absolute',
        right: '40px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        zIndex: 5
      }}>
        {/* 时间显示 */}
        <div style={{
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px'
        }}>
          <div style={{ 
            fontSize: '12px', 
            color: 'rgba(226, 232, 240, 0.7)',
            letterSpacing: '1px'
          }}>
            {formatDate(currentTime)}
          </div>
          <div style={{ 
            fontSize: '22px', 
            color: '#00d4ff', 
            fontWeight: 'bold', 
            fontFamily: 'monospace', 
            letterSpacing: '4px',
            textShadow: '0 0 20px rgba(0, 212, 255, 0.6)'
          }}>
            {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
          </div>
        </div>

        {/* 状态指示器 */}
        <div style={{ display: 'flex', gap: '14px' }}>
          <StatusBadge label="CIMRTS" status="online" />
          <StatusBadge label="PipeSer" status="online" />
        </div>
      </div>
    </header>
  )
}

const StatusBadge = ({ label, status }) => (
  <div className="data-card" style={{
    padding: '10px 18px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  }}>
    <div className="pulse-animation" style={{
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: status === 'online' ? '#00d4ff' : '#ef4444'
    }} />
    <span style={{ fontSize: '13px', color: '#e2e8f0', letterSpacing: '1px', fontWeight: 500 }}>{label}</span>
    <span style={{ 
      fontSize: '13px', 
      color: status === 'online' ? '#00d4ff' : '#ef4444', 
      fontWeight: '600',
      textShadow: status === 'online' ? '0 0 10px rgba(0, 212, 255, 0.5)' : '0 0 10px rgba(239, 68, 68, 0.5)'
    }}>
      {status === 'online' ? '在线' : '离线'}
    </span>
  </div>
)

export default Header
