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
      height: '75px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: 'linear-gradient(180deg, rgba(1, 30, 68, 0.95) 0%, rgba(1, 21, 60, 0.85) 100%)',
      borderBottom: '1px solid rgba(0, 212, 255, 0.3)'
    }}>
      {/* 顶部装饰线 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '20%',
        right: '20%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.8), rgba(59, 130, 246, 0.5), rgba(0, 212, 255, 0.8), transparent)'
      }} />

      {/* 左侧Logo区域 */}
      <div style={{
        position: 'absolute',
        left: '30px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        {/* Logo图标 */}
        <div style={{
          width: '48px',
          height: '48px',
          background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(0, 212, 255, 0.4)',
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)'
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5">
            <rect x="3" y="11" width="7" height="10" rx="1" />
            <rect x="14" y="7" width="7" height="14" rx="1" />
            <path d="M10 12h3" />
            <path d="M12 7v5" />
          </svg>
        </div>
        
        {/* 标题小字 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <div style={{ fontSize: '12px', color: 'rgba(226, 232, 240, 0.7)', letterSpacing: '2px' }}>数字孪生</div>
          <div style={{ fontSize: '14px', color: '#00d4ff', fontWeight: '500', letterSpacing: '1px' }}>校园可视化平台</div>
        </div>
      </div>

      {/* 中间主标题 */}
      <div style={{
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '450px',
          height: '90px',
          background: 'linear-gradient(180deg, rgba(0, 212, 255, 0.2) 0%, transparent 100%)',
          clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)',
          zIndex: 1
        }} />
        
        <h1 className="tech-title" style={{
          position: 'relative',
          zIndex: 2,
          fontSize: '34px',
          fontWeight: 'bold',
          letterSpacing: '10px',
          margin: 0,
          lineHeight: '1.2'
        }}>
          数字孪生校园平台
        </h1>
        
        {/* 底部装饰线 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '8px'
        }}>
          <div style={{ width: '120px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.8), transparent)' }} />
          <div style={{ width: '6px', height: '6px', background: '#00d4ff', borderRadius: '50%', boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)' }} />
          <div style={{ width: '120px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.8), transparent)' }} />
        </div>
      </div>

      {/* 右侧时间和状态区域 */}
      <div style={{
        position: 'absolute',
        right: '30px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        {/* 时间显示 */}
        <div style={{
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px'
        }}>
          <div style={{ fontSize: '12px', color: 'rgba(226, 232, 240, 0.6)' }}>
            {formatDate(currentTime)}
          </div>
          <div style={{ fontSize: '20px', color: '#00d4ff', fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: '3px' }}>
            {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
          </div>
        </div>

        {/* 状态指示器 */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <StatusBadge label="CIMRTS" status="online" />
          <StatusBadge label="PipeSer" status="online" />
        </div>
      </div>
    </header>
  )
}

const StatusBadge = ({ label, status }) => (
  <div className="data-card" style={{
    padding: '8px 16px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }}>
    <div className="pulse-animation" style={{
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: status === 'online' ? '#00d4ff' : '#ef4444'
    }} />
    <span style={{ fontSize: '13px', color: '#e2e8f0', letterSpacing: '1px' }}>{label}</span>
    <span style={{ fontSize: '13px', color: status === 'online' ? '#00d4ff' : '#ef4444', fontWeight: '500' }}>
      {status === 'online' ? '在线' : '离线'}
    </span>
  </div>
)

export default Header
