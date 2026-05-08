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
      height: '90px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: 
        'linear-gradient(180deg, rgba(1, 45, 95, 0.98) 0%, rgba(1, 30, 70, 0.96) 30%, rgba(1, 22, 55, 0.94) 70%, rgba(1, 18, 45, 0.92) 100%)',
      borderBottom: '3px solid rgba(0, 212, 255, 0.5)',
      boxShadow: 
        '0 5px 40px rgba(0, 0, 0, 0.6), ' +
        '0 0 80px rgba(0, 212, 255, 0.15), ' +
        'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    }}>
      {/* 顶部装饰线 - 扫描效果 */}
      <div className="header-border" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3
      }} />

      {/* 两侧装饰元素 - HUD风格 */}
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        width: '120px',
        height: '60px',
        borderTop: '3px solid rgba(0, 212, 255, 0.7)',
        borderLeft: '3px solid rgba(0, 212, 255, 0.7)',
        pointerEvents: 'none',
        boxShadow: 'inset 5px 5px 15px rgba(0, 212, 255, 0.1)'
      }} />
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        width: '120px',
        height: '60px',
        borderTop: '3px solid rgba(0, 212, 255, 0.7)',
        borderRight: '3px solid rgba(0, 212, 255, 0.7)',
        pointerEvents: 'none',
        boxShadow: 'inset -5px 5px 15px rgba(0, 212, 255, 0.1)'
      }} />

      {/* 左侧Logo区域 */}
      <div style={{
        position: 'absolute',
        left: '45px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        zIndex: 5
      }}>
        {/* Logo图标 - 数字孪生校园主题 */}
        <div className="logo-spin" style={{
          width: '64px',
          height: '64px',
          background: 
            'radial-gradient(circle at 30% 30%, rgba(0, 212, 255, 0.35) 0%, transparent 50%), ' +
            'linear-gradient(135deg, rgba(0, 212, 255, 0.25) 0%, rgba(96, 165, 250, 0.18) 50%, rgba(139, 92, 246, 0.12) 100%)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2.5px solid rgba(0, 212, 255, 0.7)',
          boxShadow: 
            '0 0 40px rgba(0, 212, 255, 0.35), ' +
            '0 0 70px rgba(96, 165, 250, 0.2), ' +
            'inset 0 0 25px rgba(0, 212, 255, 0.18)'
        }}>
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.4">
            {/* 建筑图标 */}
            <rect x="3" y="10" width="7" height="11" rx="1.2" />
            <rect x="14" y="6" width="7" height="15" rx="1.2" />
            {/* 连接桥梁 */}
            <path d="M10 13h3" strokeWidth="2" />
            <path d="M11.5 10v6" strokeWidth="2" />
            {/* 数据节点窗户 */}
            <rect x="4.5" y="12" width="1.5" height="1.5" rx="0.3" />
            <rect x="7" y="12" width="1.5" height="1.5" rx="0.3" />
            <rect x="4.5" y="15" width="1.5" height="1.5" rx="0.3" />
            <rect x="7" y="15" width="1.5" height="1.5" rx="0.3" />
            <rect x="15.5" y="8" width="1.5" height="1.5" rx="0.3" />
            <rect x="18" y="8" width="1.5" height="1.5" rx="0.3" />
            <rect x="15.5" y="11" width="1.5" height="1.5" rx="0.3" />
            <rect x="18" y="11" width="1.5" height="1.5" rx="0.3" />
            <rect x="15.5" y="14" width="1.5" height="1.5" rx="0.3" />
            <rect x="18" y="14" width="1.5" height="1.5" rx="0.3" />
            {/* 数据流动装饰 */}
            <circle cx="11.5" cy="5" r="1.8" fill="none" stroke="#60a5fa" strokeWidth="1.4" />
            <path d="M11.5 3.2v1" stroke="#60a5fa" strokeWidth="1.4" />
            <path d="M10.7 5h1.6" stroke="#60a5fa" strokeWidth="1.4" />
          </svg>
        </div>
        
        {/* 标题文字 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{ 
            fontSize: '13px', 
            color: 'rgba(226, 232, 240, 0.85)', 
            letterSpacing: '3.5px',
            fontWeight: 500,
            textTransform: 'uppercase'
          }}>
            Digital Twin
          </div>
          <div style={{ 
            fontSize: '16px', 
            color: '#00d4ff', 
            fontWeight: '700', 
            letterSpacing: '2px',
            textShadow: '0 0 20px rgba(0, 212, 255, 0.6)'
          }}>
            校园可视化平台
          </div>
        </div>
      </div>

      {/* 中间主标题区域 */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        textAlign: 'center'
      }}>
        {/* 标题光晕背景 */}
        <div style={{
          position: 'absolute',
          top: '-35px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '580px',
          height: '130px',
          background: 
            'radial-gradient(ellipse, rgba(0, 212, 255, 0.3) 0%, rgba(96, 165, 250, 0.18) 35%, transparent 70%)',
          clipPath: 'polygon(6% 0%, 94% 0%, 100% 100%, 0% 100%)',
          zIndex: 1,
          animation: 'header-glow 3.5s ease-in-out infinite'
        }} />
        
        {/* 主标题 */}
        <h1 className="tech-title" style={{
          position: 'relative',
          zIndex: 2,
          fontSize: '40px',
          fontWeight: 'bold',
          letterSpacing: '14px',
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
          gap: '18px',
          marginTop: '14px'
        }}>
          <div style={{ 
            width: '160px', 
            height: '4px', 
            background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.9), rgba(96, 165, 250, 0.7), transparent)',
            borderRadius: '3px',
            boxShadow: '0 0 25px rgba(0, 212, 255, 0.5)'
          }} />
          <div className="pulse-animation" style={{ 
            width: '10px', 
            height: '10px', 
            background: '#00d4ff', 
            borderRadius: '50%', 
            boxShadow: '0 0 20px rgba(0, 212, 255, 1), 0 0 40px rgba(0, 212, 255, 0.6)'
          }} />
          <div style={{ 
            width: '160px', 
            height: '4px', 
            background: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.7), rgba(0, 212, 255, 0.9), transparent)',
            borderRadius: '3px',
            boxShadow: '0 0 25px rgba(0, 212, 255, 0.5)'
          }} />
        </div>
      </div>

      {/* 右侧时间显示区域 */}
      <div style={{
        position: 'absolute',
        right: '45px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '28px',
        zIndex: 5
      }}>
        {/* 时间显示 - 数字孪生风格 */}
        <div style={{
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          padding: '12px 24px',
          background: 'rgba(1, 30, 70, 0.6)',
          borderRadius: '12px',
          border: '2px solid rgba(0, 212, 255, 0.4)',
          boxShadow: 
            '0 0 30px rgba(0, 212, 255, 0.2), ' +
            'inset 0 0 20px rgba(0, 212, 255, 0.08)',
          backdropFilter: 'blur(15px)'
        }}>
          <div style={{ 
            fontSize: '13px', 
            color: 'rgba(226, 232, 240, 0.85)',
            letterSpacing: '1.5px',
            fontWeight: 500
          }}>
            {formatDate(currentTime)}
          </div>
          <div style={{ 
            fontSize: '24px', 
            color: '#00d4ff', 
            fontWeight: 'bold', 
            fontFamily: '"Consolas", "Monaco", "Courier New", monospace', 
            letterSpacing: '5px',
            textShadow: '0 0 25px rgba(0, 212, 255, 0.7)'
          }}>
            {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
          </div>
        </div>

        {/* 系统状态指示器 */}
        <div className="data-card" style={{
          padding: '14px 24px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(1, 30, 70, 0.6)',
          border: '2px solid rgba(0, 212, 255, 0.4)',
          boxShadow: 
            '0 0 25px rgba(0, 212, 255, 0.18), ' +
            'inset 0 0 15px rgba(0, 212, 255, 0.08)'
        }}>
          <div className="pulse-animation" style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00d4ff, #60a5fa)',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)'
          }} />
          <span style={{ 
            fontSize: '14px', 
            color: '#e2e8f0', 
            letterSpacing: '1.5px', 
            fontWeight: 600 
          }}>
            系统正常
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
