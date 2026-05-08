import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Card, message } from 'antd'
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
        message.success('登录成功')
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
      background: 'linear-gradient(135deg, #010a1f 0%, #01153c 50%, #000c2a 100%)'
    }}>
      {/* 装饰性网格背景 */}
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
        animation: 'gridMove 20s linear infinite',
        zIndex: 1
      }} />
      
      {/* 装饰光晕 */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '3%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 2,
        animation: 'pulse-glow 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '5%',
        right: '3%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(59, 130, 246, 0.12) 40%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 2,
        animation: 'pulse-glow 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(96, 165, 250, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 2
      }} />
      
      {/* 添加关键帧动画样式 */}
      <style>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>

      <Card className="tech-panel" style={{
        width: '520px',
        padding: '25px 60px 60px',
        borderRadius: '16px',
        zIndex: 10,
        backdropFilter: 'blur(25px)',
        background: 'linear-gradient(145deg, rgba(1, 35, 70, 0.92) 0%, rgba(1, 22, 55, 0.88) 50%, rgba(1, 18, 45, 0.85) 100%)',
        border: '2px solid rgba(0, 212, 255, 0.35)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 80px rgba(0, 212, 255, 0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div style={{
            width: '96px',
            height: '96px',
            margin: '0 auto 24px',
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.25) 0%, rgba(96, 165, 250, 0.18) 50%, rgba(139, 92, 246, 0.12) 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid rgba(0, 212, 255, 0.5)',
            boxShadow: '0 0 60px rgba(0, 212, 255, 0.35), inset 0 0 30px rgba(0, 212, 255, 0.15)'
          }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.7">
              <rect x="3" y="11" width="7" height="10" rx="1.2" />
              <rect x="14" y="7" width="7" height="14" rx="1.2" />
              <path d="M10 12h3" />
              <path d="M12 7v5" />
            </svg>
          </div>
          
          <h1 className="tech-title" style={{
            fontSize: '32px',
            fontWeight: 'bold',
            letterSpacing: '8px',
            marginBottom: '10px'
          }}>
            数字孪生校园平台
          </h1>
          
          <div style={{
            color: 'rgba(226, 232, 240, 0.9)',
            fontSize: '15px',
            letterSpacing: '3px',
            fontWeight: 500
          }}>
            Digital Twin Campus Platform
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '14px',
            marginTop: '24px'
          }}>
            <div style={{ width: '120px', height: '3px', background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.7), rgba(96, 165, 250, 0.5), transparent)', borderRadius: '2px' }} />
            <div style={{ 
              width: '10px', 
              height: '10px', 
              background: '#00d4ff', 
              borderRadius: '50%', 
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.9), 0 0 40px rgba(0, 212, 255, 0.4)',
              animation: 'pulse-glow 2s ease-in-out infinite'
            }} />
            <div style={{ width: '120px', height: '3px', background: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.5), rgba(0, 212, 255, 0.7), transparent)', borderRadius: '2px' }} />
          </div>
        </div>

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0, 212, 255, 0.8)', fontSize: '18px' }} />}
              placeholder="请输入用户名"
              style={{
                background: 'rgba(1, 21, 60, 0.75)',
                border: '2px solid rgba(0, 212, 255, 0.35)',
                color: '#e2e8f0',
                borderRadius: '10px',
                height: '52px',
                fontSize: '15px',
                letterSpacing: '0.5px'
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0, 212, 255, 0.8)', fontSize: '18px' }} />}
              placeholder="请输入密码"
              iconRender={(visible) => (
                visible ? <EyeTwoTone twoToneColor="#00d4ff" style={{ fontSize: '18px' }} /> : <EyeInvisibleOutlined style={{ color: 'rgba(0, 212, 255, 0.7)', fontSize: '18px' }} />
              )}
              style={{
                background: 'rgba(1, 21, 60, 0.75)',
                border: '2px solid rgba(0, 212, 255, 0.35)',
                color: '#e2e8f0',
                borderRadius: '10px',
                height: '52px',
                fontSize: '15px',
                letterSpacing: '0.5px'
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: '40px' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="tech-btn"
              style={{
                height: '56px',
                fontSize: '17px',
                fontWeight: '600',
                letterSpacing: '5px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.3) 0%, rgba(96, 165, 250, 0.2) 50%, rgba(139, 92, 246, 0.15) 100%)',
                border: '2px solid rgba(0, 212, 255, 0.5)',
                boxShadow: '0 0 40px rgba(0, 212, 255, 0.3)'
              }}
            >
              登 录
            </Button>
          </Form.Item>
        </Form>

        <div style={{
          textAlign: 'center',
          marginTop: '25px',
          color: 'rgba(148, 163, 184, 0.75)',
          fontSize: '13px',
          letterSpacing: '1px'
        }}>
          <p>提示：用户名 <span style={{ color: '#00d4ff', fontWeight: 600 }}>admin</span> / 密码 <span style={{ color: '#00d4ff', fontWeight: 600 }}>123456</span></p>
        </div>
      </Card>
    </div>
  )
}

export default Login
