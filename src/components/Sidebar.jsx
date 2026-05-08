import React from 'react'
import { useStore } from '../store/useStore'
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
    console.log('点击工具:', id)
    if (id === 'services') {
      setCurrentTool(id)
      setResourceModalOpen(true)
    } else if (id === 'pipes') {
      if (!layers.pipes) {
        toggleLayer('pipes')
      }
      if (currentTool === id) {
        if (layers.pipes) {
          toggleLayer('pipes')
        }
        setHasSelectedPipe(false)
        setSelectedPipe(null)
        setCurrentTool(null)
      } else {
        setHasSelectedPipe(true)
        setCurrentTool(id)
      }
    } else {
      setHasSelectedPipe(false)
      setSelectedPipe(null)
      if (layers.pipes) {
        toggleLayer('pipes')
      }
      setCurrentTool(currentTool === id ? null : id)
    }
  }

  return (
    <div style={{
      width: '70px',
      padding: '12px 8px',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      background: 'rgba(20, 30, 48, 0.95)',
      border: '1px solid rgba(100, 150, 200, 0.2)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{
        fontSize: '13px',
        color: '#1890ff',
        textAlign: 'center',
        paddingBottom: '10px',
        borderBottom: '1px solid rgba(100, 150, 200, 0.2)',
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
            width: '100%',
            height: '60px',
            borderRadius: '6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            border: currentTool === id ? '1px solid #1890ff' : '1px solid transparent',
            background: currentTool === id 
              ? 'rgba(24, 144, 255, 0.15)'
              : 'rgba(40, 55, 75, 0.6)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <Icon 
            size={22} 
            color={currentTool === id ? '#1890ff' : '#a0b8cc'} 
            strokeWidth={currentTool === id ? 2.2 : 1.8}
          />
          <span style={{
            fontSize: '11px',
            color: currentTool === id ? '#1890ff' : '#a0b8cc'
          }}>
            {label}
          </span>
        </button>
      ))}
    </div>
  )
}

export default Sidebar
