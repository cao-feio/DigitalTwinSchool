import React, { useState, useRef } from 'react'
import { useStore } from '../store/useStore'

const ResourcePanel = () => {
  const { 
    resources, 
    addResource, 
    removeResource, 
    toggleResourceVisibility, 
    importModels,
    importPipes,
    exportModels,
    exportPipes,
    customPipes,
    models,
    addPipe,
    pipeGenPoints,
    pipeGenParams,
    setPipeGenParams,
    pipeGenMode,
    setPipeGenMode,
    clearPipeGenPoints: clearGenPoints
  } = useStore()

  const [importingType, setImportingType] = useState(null)
  const fileInputRef = useRef(null)

  const pipeTypes = [
    { id: 'water', name: '给水管道', color: '#3498db', icon: '💧' },
    { id: 'drain', name: '排水管道', color: '#5d6d7e', icon: '🚰' },
    { id: 'power', name: '电力管线', color: '#f1c40f', icon: '⚡' },
    { id: 'gas', name: '燃气管线', color: '#e74c3c', icon: '🔥' },
    { id: 'heat', name: '热力管线', color: '#e67e22', icon: '🌡️' },
    { id: 'communication', name: '通信管线', color: '#9b59b6', icon: '📡' }
  ]

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

  const handleExport = (type) => {
    let data, filename
    if (type === 'model') {
      data = exportModels()
      filename = 'models_export.json'
    } else {
      data = exportPipes()
      filename = 'pipes_export.json'
    }
    
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleGeneratePipe = () => {
    if (pipeGenPoints.length >= 2) {
      const pipeType = pipeTypes.find(t => t.id === pipeGenParams.pipeType) || pipeTypes[0]
      const newPipe = {
        id: `pipe-${Date.now()}`,
        name: `${pipeType.name} ${Date.now()}`,
        pipeType: pipeGenParams.pipeType,
        path: pipeGenPoints.map(p => [...p]),
        color: pipeType.color,
        diameter: pipeGenParams.diameter,
        diameterMm: pipeGenParams.diameter * 1000,
        depth: pipeGenParams.depth,
        material: pipeGenParams.material,
        pressure: pipeGenParams.pressure,
        installDate: new Date().toISOString().split('T')[0],
        description: '用户生成的管线',
        manholes: []
      }
      
      pipeGenPoints.forEach((p, i) => {
        if (i === 0 || i === pipeGenPoints.length - 1 || i % 3 === 0) {
          newPipe.manholes.push({
            index: i,
            type: i === 0 || i === pipeGenPoints.length - 1 ? 'regular' : 'tee',
            name: `${pipeGenParams.pipeType.charAt(0).toUpperCase()}-${i + 1}`
          })
        }
      })
      
      addPipe(newPipe)
      clearGenPoints()
      setPipeGenMode(null)
      alert('管线生成成功！')
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button
            onClick={() => handleImport('model')}
            style={{
              padding: '10px',
              background: 'rgba(40, 55, 75, 0.6)',
              border: '1px solid rgba(100, 150, 200, 0.2)',
              borderRadius: '6px',
              color: '#a0b8cc',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>📥</span>
            导入模型
          </button>
          <button
            onClick={() => handleExport('model')}
            style={{
              padding: '10px',
              background: 'rgba(40, 55, 75, 0.6)',
              border: '1px solid rgba(100, 150, 200, 0.2)',
              borderRadius: '6px',
              color: '#a0b8cc',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>📤</span>
            导出模型
          </button>
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
          <button
            onClick={() => handleImport('pipe')}
            style={{
              padding: '10px',
              background: 'rgba(40, 55, 75, 0.6)',
              border: '1px solid rgba(100, 150, 200, 0.2)',
              borderRadius: '6px',
              color: '#a0b8cc',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>📥</span>
            导入管线
          </button>
          <button
            onClick={() => handleExport('pipe')}
            style={{
              padding: '10px',
              background: 'rgba(40, 55, 75, 0.6)',
              border: '1px solid rgba(100, 150, 200, 0.2)',
              borderRadius: '6px',
              color: '#a0b8cc',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>📤</span>
            导出管线
          </button>
        </div>

        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <div style={{ color: '#3b82f6', fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
            📐 管线生成工具
          </div>
          {pipeGenMode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ color: '#e6f2ff', fontSize: '11px' }}>
                点击地面添加路径点: {pipeGenPoints.length}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ color: '#a0b8cc', fontSize: '10px' }}>管线类型</label>
                  <select
                    value={pipeGenParams.pipeType}
                    onChange={(e) => setPipeGenParams({ pipeType: e.target.value })}
                    style={{
                      padding: '6px',
                      background: 'rgba(40, 55, 75, 0.8)',
                      border: '1px solid rgba(100, 150, 200, 0.3)',
                      borderRadius: '4px',
                      color: '#e6f2ff',
                      fontSize: '11px'
                    }}
                  >
                    {pipeTypes.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ color: '#a0b8cc', fontSize: '10px' }}>直径 (m)</label>
                  <input
                    type="number"
                    value={pipeGenParams.diameter}
                    onChange={(e) => setPipeGenParams({ diameter: parseFloat(e.target.value) })}
                    step="0.1"
                    min="0.1"
                    max="5"
                    style={{
                      padding: '6px',
                      background: 'rgba(40, 55, 75, 0.8)',
                      border: '1px solid rgba(100, 150, 200, 0.3)',
                      borderRadius: '4px',
                      color: '#e6f2ff',
                      fontSize: '11px'
                    }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ color: '#a0b8cc', fontSize: '10px' }}>埋深 (m)</label>
                <input
                  type="number"
                  value={pipeGenParams.depth}
                  onChange={(e) => setPipeGenParams({ depth: parseFloat(e.target.value) })}
                  step="0.1"
                  min="0.1"
                  max="10"
                  style={{
                    padding: '6px',
                    background: 'rgba(40, 55, 75, 0.8)',
                    border: '1px solid rgba(100, 150, 200, 0.3)',
                    borderRadius: '4px',
                    color: '#e6f2ff',
                    fontSize: '11px'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => { clearGenPoints(); setPipeGenMode(null); }}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: 'rgba(100, 150, 200, 0.2)',
                    border: '1px solid rgba(100, 150, 200, 0.3)',
                    borderRadius: '4px',
                    color: '#a0b8cc',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  取消
                </button>
                <button
                  onClick={handleGeneratePipe}
                  disabled={pipeGenPoints.length < 2}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: pipeGenPoints.length >= 2 ? 'linear-gradient(135deg, #3b82f6, #1e40af)' : 'rgba(100, 150, 200, 0.2)',
                    border: pipeGenPoints.length >= 2 ? 'none' : '1px solid rgba(100, 150, 200, 0.3)',
                    borderRadius: '4px',
                    color: pipeGenPoints.length >= 2 ? '#fff' : '#666',
                    fontSize: '12px',
                    cursor: pipeGenPoints.length >= 2 ? 'pointer' : 'not-allowed'
                  }}
                >
                  生成管线
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setPipeGenMode('drawing')}
              style={{
                width: '100%',
                padding: '10px',
                background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                border: 'none',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <span>➕</span>
              开始绘制管线
            </button>
          )}
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
