import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message, Card } from 'antd'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    const originalBodyBg = document.body.style.background
    const originalRootBg = document.getElementById('root').style.background
    document.body.style.background = 'transparent'
    document.getElementById('root').style.background = 'transparent'

    return () => {
      document.body.style.background = originalBodyBg
      document.getElementById('root').style.background = originalRootBg
    }
  }, [])

  const VALID_USERNAME = 'admin'
  const VALID_PASSWORD = '123456'

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (values.username === VALID_USERNAME && values.password === VALID_PASSWORD) {
        onLogin(values.username)
        message.success('登录成功 - 欢迎进入数字孪生校园平台')
      } else {
        message.error('用户名或密码错误')
      }
    } catch (error) {
      message.error('登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 
        'radial-gradient(ellipse at 20% 20%, rgba(0, 212, 255, 0.18) 0%, transparent 50%),' +
        'radial-gradient(ellipse at 80% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 45%),' +
        'radial-gradient(ellipse at 40% 80%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),' +
        'linear-gradient(135deg, #010a1f 0%, #01153c 35%, #000c2a 70%, #010a1f 100%)'
    }}>
      {/* 动态网格线背景 - 数字孪生风格 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 212, 255, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 255, 0.08) 1px, transparent 1px),
          linear-gradient(rgba(139, 92, 246, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 92, 246, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px, 60px 60px, 240px 240px, 240px 240px',
        animation: 'gridMove 25s linear infinite',
        zIndex: 1
      }} />
      
      {/* 装饰性光晕 - 数字孪生主题 */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.25) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 2,
        animation: 'pulse-glow 7s ease-in-out infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, rgba(59, 130, 246, 0.15) 40%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 2,
        animation: 'pulse-glow 9s ease-in-out infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(circle, rgba(96, 165, 250, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 2
      }} />
      
      {/* 装饰性粒子 */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${4 + Math.random() * 4}px`,
          height: `${4 + Math.random() * 4}px`,
          background: 'radial-gradient(circle, #00d4ff, #60a5fa, transparent)',
          borderRadius: '50%',
          left: `${Math.random() * 100}%`,
          animation: `float-up ${10 + Math.random() * 8}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`,
          boxShadow: '0 0 15px rgba(0, 212, 255, 0.8)',
          zIndex: 2
        }} />
      ))}
      
      {/* 添加关键帧动画样式 */}
      <style>{`
        @keyframes gridMove {
          0% { background-position: 0 0, 0 0, 0 0, 0 0; }
          100% { background-position: 60px 60px, 60px 60px, 240px 240px, 240px 240px; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes float-up {
          0% { 
            transform: translateY(100vh) rotate(0deg); 
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100vh) rotate(1080deg); 
            opacity: 0;
          }
        }
      `}</style>

      <Card className="tech-panel" style={{
        width: '580px',
        padding: '30px 70px 70px',
        borderRadius: '20px',
        zIndex: 10,
        backdropFilter: 'blur(35px)',
        background: 
          'linear-gradient(145deg, rgba(1, 40, 80, 0.96) 0%, rgba(1, 25, 60, 0.93) 30%, rgba(1, 20, 50, 0.9) 70%, rgba(1, 15, 40, 0.88) 100%)',
        border: '3px solid rgba(0, 212, 255, 0.5)',
        boxShadow: 
          '0 20px 80px rgba(0, 0, 0, 0.7), ' +
          '0 0 100px rgba(0, 212, 255, 0.25), ' +
          '0 0 200px rgba(96, 165, 250, 0.15), ' +
          'inset 0 0 120px rgba(0, 212, 255, 0.12), ' +
          'inset 0 1px 0 rgba(255, 255, 255, 0.15)'
      }}>
        {/* HUD风格角落装饰 */}
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />
        
        <div style={{ textAlign: 'center', marginBottom: '50px', position: 'relative' }}>
          {/* Logo区域 - 数字孪生校园主题 */}
          <div className="logo-spin" style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 28px',
            background: 
              'radial-gradient(circle at 30% 30%, rgba(0, 212, 255, 0.4) 0%, transparent 50%), ' +
              'linear-gradient(135deg, rgba(0, 212, 255, 0.3) 0%, rgba(96, 165, 250, 0.2) 50%, rgba(139, 92, 246, 0.15) 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid rgba(0, 212, 255, 0.7)',
            boxShadow: 
              '0 0 80px rgba(0, 212, 255, 0.4), ' +
              '0 0 120px rgba(96, 165, 250, 0.25), ' +
              'inset 0 0 40px rgba(0, 212, 255, 0.2)',
            position: 'relative'
          }}>
            {/* 数字孪生校园图标 - 建筑与数据结合 */}
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5">
              {/* 主建筑 */}
              <rect x="3" y="10" width="7" height="11" rx="1.2" />
              <rect x="14" y="6" width="7" height="15" rx="1.2" />
              {/* 连接桥梁 - 数字孪生连接 */}
              <path d="M10 13h3" strokeWidth="2" />
              <path d="M11.5 10v6" strokeWidth="2" />
              {/* 窗户 - 数据节点 */}
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
              <circle cx="11.5" cy="5" r="2" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
              <path d="M11.5 3v1" stroke="#60a5fa" strokeWidth="1.5" />
              <path d="M10.5 5h2" stroke="#60a5fa" strokeWidth="1.5" />
            </svg>
          </div>
          
          {/* 主标题 - 数字孪生校园 */}
          <h1 className="tech-title" style={{
            fontSize: '36px',
            fontWeight: 'bold',
            letterSpacing: '10px',
            marginBottom: '12px',
            lineHeight: '1.2'
          }}>
            数字孪生校园平台
          </h1>
          
          {/* 副标题 */}
          <div style={{
            color: 'rgba(226, 232, 240, 0.95)',
            fontSize: '16px',
            letterSpacing: '4px',
            fontWeight: 500,
            marginBottom: '8px'
          }}>
            Digital Twin Campus Platform
          </div>
          
          {/* 数据主题装饰 */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            marginTop: '30px'
          }}>
            <div style={{ 
              width: '150px', 
              height: '4px', 
              background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.8), rgba(96, 165, 250, 0.6), transparent)',
              borderRadius: '3px',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
            }} />
            <div className="pulse-animation" style={{ 
              width: '12px', 
              height: '12px', 
              background: '#00d4ff', 
              borderRadius: '50%', 
              boxShadow: '0 0 25px rgba(0, 212, 255, 1), 0 0 50px rgba(0, 212, 255, 0.6)'
            }} />
            <div style={{ 
              width: '150px', 
              height: '4px', 
              background: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.6), rgba(0, 212, 255, 0.8), transparent)',
              borderRadius: '3px',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
            }} />
          </div>
        </div>

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
        >
          {/* 用户名输入 - 数字孪生风格 */}
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0, 212, 255, 0.9)', fontSize: '20px' }} />}
              placeholder="请输入用户名"
              style={{
                background: 'rgba(1, 25, 65, 0.85)',
                border: '3px solid rgba(0, 212, 255, 0.5)',
                color: '#e2e8f0',
                borderRadius: '12px',
                height: '58px',
                fontSize: '16px',
                letterSpacing: '0.5px',
                backdropFilter: 'blur(10px)'
              }}
            />
          </Form.Item>

          {/* 密码输入 - 数字孪生风格 */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0, 212, 255, 0.9)', fontSize: '20px' }} />}
              placeholder="请输入密码"
              iconRender={(visible) => (
                visible ? <EyeTwoTone twoToneColor="#00d4ff" style={{ fontSize: '20px' }} /> : <EyeInvisibleOutlined style={{ color: 'rgba(0, 212, 255, 0.8)', fontSize: '20px' }} />
              )}
              style={{
                background: 'rgba(1, 25, 65, 0.85)',
                border: '3px solid rgba(0, 212, 255, 0.5)',
                color: '#e2e8f0',
                borderRadius: '12px',
                height: '58px',
                fontSize: '16px',
                letterSpacing: '0.5px',
                backdropFilter: 'blur(10px)'
              }}
            />
          </Form.Item>

          {/* 登录按钮 - 数字孪生科技感 */}
          <Form.Item style={{ marginTop: '50px' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="tech-btn"
              style={{
                height: '62px',
                fontSize: '18px',
                fontWeight: '600',
                letterSpacing: '6px',
                borderRadius: '12px',
                background: 
                  'linear-gradient(135deg, rgba(0, 212, 255, 0.35) 0%, rgba(96, 165, 250, 0.25) 50%, rgba(139, 92, 246, 0.2) 100%)',
                border: '3px solid rgba(0, 212, 255, 0.7)',
                boxShadow: 
                  '0 0 60px rgba(0, 212, 255, 0.4), ' +
                  '0 0 120px rgba(96, 165, 250, 0.25), ' +
                  'inset 0 0 40px rgba(0, 212, 255, 0.2)'
              }}
            >
              {loading ? '正在验证...' : '进 入 平 台'}
            </Button>
          </Form.Item>
        </Form>

        {/* 底部提示信息 - 数字孪生风格 */}
        <div style={{
          textAlign: 'center',
          marginTop: '35px',
          color: 'rgba(148, 163, 184, 0.9)',
          fontSize: '14px',
          letterSpacing: '1.5px'
        }}>
          <p style={{ margin: 0 }}>
            系统提示：用户名 <span style={{ color: '#00d4ff', fontWeight: 700, textShadow: '0 0 15px rgba(0, 212, 255, 0.7)' }}>admin</span> / 密码 <span style={{ color: '#00d4ff', fontWeight: 700, textShadow: '0 0 15px rgba(0, 212, 255, 0.7)' }}>123456</span>
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: 'rgba(148, 163, 184, 0.7)' }}>
            Digital Twin Campus System v2.0
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Login
