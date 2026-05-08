import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import LoginScene3D from './LoginScene3D'

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    // 临时修改body和root的背景
    const originalBodyBg = document.body.style.background
    const originalRootBg = document.getElementById('root').style.background
    document.body.style.background = 'transparent'
    document.getElementById('root').style.background = 'transparent'

    return () => {
      // 组件卸载时恢复
      document.body.style.background = originalBodyBg
      document.getElementById('root').style.background = originalRootBg
    }
  }, [])

  // 硬编码的账号密码
  const VALID_USERNAME = 'admin'
  const VALID_PASSWORD = '123456'

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 验证账号密码
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
      background: 'transparent'
    }}>
      {/* 3D 校园场景背景 */}
      <LoginScene3D />
      
      {/* 装饰光晕 */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 2
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 2
      }} />

      <Card className="tech-panel" style={{
        width: '480px',
        padding: '20px 50px 50px',
        borderRadius: '8px',
        zIndex: 10,
        backdropFilter: 'blur(20px)',
        background: 'linear-gradient(135deg, rgba(1, 30, 68, 0.85) 0%, rgba(1, 21, 60, 0.75) 100%)'
      }}>
        {/* Logo区域 */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 20px',
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(0, 212, 255, 0.4)',
            boxShadow: '0 0 40px rgba(0, 212, 255, 0.25)'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5">
              <rect x="3" y="11" width="7" height="10" rx="1" />
              <rect x="14" y="7" width="7" height="14" rx="1" />
              <path d="M10 12h3" />
              <path d="M12 7v5" />
            </svg>
          </div>
          
          <h1 className="tech-title" style={{
            fontSize: '28px',
            fontWeight: 'bold',
            letterSpacing: '6px',
            marginBottom: '8px'
          }}>
            数字孪生校园平台
          </h1>
          
          <div style={{
            color: 'rgba(148, 163, 184, 0.8)',
            fontSize: '14px',
            letterSpacing: '2px'
          }}>
            Digital Twin Campus Platform
          </div>
          
          {/* 装饰线 */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '20px'
          }}>
            <div style={{ width: '100px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.6), transparent)' }} />
            <div style={{ width: '6px', height: '6px', background: '#00d4ff', borderRadius: '50%', boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)' }} />
            <div style={{ width: '100px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.6), transparent)' }} />
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
              prefix={<UserOutlined style={{ color: 'rgba(0, 212, 255, 0.6)' }} />}
              placeholder="请输入用户名"
              style={{
                background: 'rgba(1, 21, 60, 0.6)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                color: '#e2e8f0',
                borderRadius: '6px'
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0, 212, 255, 0.6)' }} />}
              placeholder="请输入密码"
              iconRender={(visible) => (
                visible ? <EyeTwoTone twoToneColor="#00d4ff" /> : <EyeInvisibleOutlined style={{ color: 'rgba(0, 212, 255, 0.6)' }} />
              )}
              style={{
                background: 'rgba(1, 21, 60, 0.6)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                color: '#e2e8f0',
                borderRadius: '6px'
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: '30px' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="tech-btn"
              style={{
                height: '50px',
                fontSize: '16px',
                fontWeight: '500',
                letterSpacing: '4px',
                borderRadius: '6px'
              }}
            >
              登 录
            </Button>
          </Form.Item>
        </Form>

        {/* 底部提示 */}
      <div style={{
        textAlign: 'center',
        marginTop: '20px',
        color: 'rgba(148, 163, 184, 0.6)',
        fontSize: '12px'
      }}>
        <p>提示：用户名 admin / 密码 123456</p>
      </div>
      </Card>
    </div>
  )
}

export default Login
