import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { LogoutOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useStore } from '../store/useStore'

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const logout = useStore(state => state.logout)
  const username = useStore(state => state.username)

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
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      background: 'rgba(15, 23, 42, 0.98)',
      borderBottom: '1px solid rgba(100, 150, 200, 0.2)',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'linear-gradient(135deg, #1890ff, #36cfc9)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#fff'
        }}>
          校
        </div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>
            数字孪生校园平台
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#a0b8cc',
          fontSize: '14px'
        }}>
          <ClockCircleOutlined />
          <span>{formatDate(currentTime)}</span>
          <span style={{ marginLeft: '8px', fontFamily: 'monospace', fontSize: '16px', color: '#1890ff' }}>
            {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
          </span>
        </div>

        {username && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '6px 12px',
            background: 'rgba(100, 150, 200, 0.1)',
            borderRadius: '6px',
            border: '1px solid rgba(100, 150, 200, 0.2)'
          }}>
            <span style={{ fontSize: '14px', color: '#e6f2ff' }}>
              欢迎，{username}
            </span>
            <Button
              type="primary"
              ghost
              size="small"
              icon={<LogoutOutlined />}
              onClick={logout}
            >
              退出登录
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
