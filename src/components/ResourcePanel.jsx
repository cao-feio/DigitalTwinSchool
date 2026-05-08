import React, { useState, useRef } from 'react'
import { useStore } from '../store/useStore'

const ResourcePanel = () => {
  const { 
    resources, 
    removeResource, 
    toggleResourceVisibility, 
    importModels,
    importPipes,
    customPipes,
    models
  } = useStore()

  const [importingType, setImportingType] = useState(null)
  const fileInputRef = useRef(null)

  const handleImport = (type) => {
    setImportingType(type)
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result)
          if (importingType === 'model') {
            importModels(Array.isArray(data) ? data : [data])
            alert('模型数据导入成功！')
          } else if (importingType === 'pipe') {
            importPipes(Array.isArray(data) ? data : [data])
            alert('管线数据导入成功！')
          }
        } catch (error) {
          alert('导入失败：无效的JSON格式')
        }
      }
      reader.readAsText(file)
    }
  }

  const getTypeIcon = (type) => {
    const icons = {
      model: '🏗️',
      pipe: '🔧',
      default: '📦'
    }
    return icons[type] || icons.default
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{
        background: 'rgba(20, 30, 48, 0.95)',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid rgba(100, 150, 200, 0.2)'
      }}>
        <div style={{ color: '#e6f2ff', fontSize: '13px', fontWeight: '600', marginBottom: '12px' }}>
          模型数据管理
        </div>
        <button
          onClick={() => handleImport('model')}
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span>📥</span>
          导入模型
        </button>
        <div style={{ marginTop: '8px', color: '#a0b8cc', fontSize: '11px' }}>
          当前模型数量：{models.length}
        </div>
      </div>

      <div style={{
        background: 'rgba(20, 30, 48, 0.95)',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid rgba(100, 150, 200, 0.2)'
      }}>
        <div style={{ color: '#e6f2ff', fontSize: '13px', fontWeight: '600', marginBottom: '12px' }}>
          管线数据管理
        </div>
        <button
          onClick={() => handleImport('pipe')}
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span>📥</span>
          导入管线
        </button>
        <div style={{ marginTop: '8px', color: '#a0b8cc', fontSize: '11px' }}>
          当前管线数量：{customPipes.length}
        </div>
      </div>

      <div style={{
        background: 'rgba(20, 30, 48, 0.95)',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid rgba(100, 150, 200, 0.2)'
      }}>
        <div style={{ color: '#e6f2ff', fontSize: '13px', fontWeight: '600', marginBottom: '12px' }}>
          资源列表 ({resources.length})
        </div>
        {resources.map(resource => (
          <div key={resource.id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
            background: 'rgba(40, 55, 75, 0.5)',
            borderRadius: '6px',
            marginBottom: '8px',
            border: '1px solid rgba(100, 150, 200, 0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
              <span style={{ fontSize: '20px' }}>
                {getTypeIcon(resource.type)}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '12px',
                  color: '#e6f2ff',
                  fontWeight: '600'
                }}>
                  {resource.name}
                </div>
                <div style={{ fontSize: '10px', color: '#a0b8cc' }}>
                  {resource.type}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button
                onClick={() => toggleResourceVisibility(resource.id)}
                style={{
                  padding: '6px',
                  background: 'rgba(40, 55, 75, 0.6)',
                  border: 'none',
                  borderRadius: '4px',
                  color: resource.visible ? '#22c55e' : '#ef4444',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                {resource.visible ? '👁️' : '👁️‍🗨️'}
              </button>
              <button
                onClick={() => removeResource(resource.id)}
                style={{
                  padding: '6px',
                  background: 'rgba(40, 55, 75, 0.6)',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
        {resources.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#a0b8cc',
            fontSize: '12px',
            padding: '20px'
          }}>
            暂无资源
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  )
}

export default ResourcePanel
