import React from 'react'
import { useStore } from '@/store/useStore'
import { 
  Layers, 
  Ruler, 
  Box, 
  Eye, 
  MapPin, 
  Zap, 
  Settings,
  Tag
} from 'lucide-react'

const toolButtons = [
  { id: 'select', icon: MapPin, label: '选择' },
  { id: 'modeling', icon: Box, label: '建模' },
  { id: 'measure', icon: Ruler, label: '测量' },
  { id: 'layers', icon: Layers, label: '图层' },
  { id: 'pipes', icon: Zap, label: '管线' },
  { id: 'annotation', icon: Tag, label: '标注' },
  { id: 'analysis', icon: Eye, label: '分析' },
  { id: 'services', icon: Settings, label: '资源' }
]

const Sidebar = () => {
  const { currentTool, setCurrentTool, setResourceModalOpen, layers, toggleLayer, setHasSelectedPipe, setSelectedPipe, hasSelectedPipe } = useStore()

  const handleToolClick = (id) => {
    console.log('点击工具:', id, '当前工具:', currentTool, 'hasSelectedPipe:', hasSelectedPipe, 'layers.pipes:', layers.pipes)
    if (id === 'services') {
      // 点击资源工具时直接打开弹窗
      setCurrentTool(id)
      setResourceModalOpen(true)
    } else if (id === 'pipes') {
      // 点击管线按钮时自动开启管线图层
      if (!layers.pipes) {
        console.log('开启管线图层')
        toggleLayer('pipes')
      }
      // 如果已经是管线模式，则关闭管线图层并取消透明化
      if (currentTool === id) {
        console.log('关闭管线模式')
        // 关闭管线图层
        if (layers.pipes) {
          toggleLayer('pipes')
        }
        setHasSelectedPipe(false)
        setSelectedPipe(null)
        setCurrentTool(null)
      } else {
        // 设置管线模式，让建筑等半透明
        console.log('开启管线模式')
        setHasSelectedPipe(true)
        setCurrentTool(id)
      }
    } else {
      // 点击其他工具时关闭管线半透明模式和管线图层
      console.log('切换到其他工具，关闭管线模式')
      setHasSelectedPipe(false)
      setSelectedPipe(null)
      if (layers.pipes) {
        toggleLayer('pipes')
      }
      setCurrentTool(currentTool === id ? null : id)
    }
  }

  return (
    <div className="tech-panel" style={{
      width: '80px',
      padding: '12px 10px',
      borderRadius: '4px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <div style={{
        fontSize: '14px',
        color: '#00d4ff',
        textAlign: 'center',
        paddingBottom: '10px',
        borderBottom: '1px solid rgba(0, 212, 255, 0.3)',
        letterSpacing: '2px',
        marginBottom: '6px',
        fontWeight: '600'
      }}>
        工具箱
      </div>
      
      {toolButtons.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => handleToolClick(id)}
          title={label}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            border: currentTool === id ? '1px solid #00d4ff' : '1px solid transparent',
            background: currentTool === id 
              ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.25) 0%, rgba(0, 212, 255, 0.15) 100%)'
              : 'rgba(1, 30, 68, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: currentTool === id ? '0 0 25px rgba(0, 212, 255, 0.4)' : 'none'
          }}
        >
          <Icon 
            size={26} 
            color={currentTool === id ? '#00d4ff' : '#94a3b8'} 
          />
          <span style={{
            fontSize: '12px',
            color: currentTool === id ? '#00d4ff' : '#94a3b8',
            letterSpacing: '1px',
            fontWeight: '500'
          }}>
            {label}
          </span>
        </button>
      ))}
    </div>
  )
}

export default Sidebar
