import React, { useState, useEffect } from 'react'
import { Switch, Slider, Input, Button, Space, Divider, InputNumber, Select } from 'antd'
import { useStore } from '@/store/useStore'
import { defaultBuildingData } from './Buildings'
import { defaultPipeData } from './Pipes'
import { ChevronDown, ChevronUp, Eye, EyeOff, Locate, Edit3, PlayCircle, Trash2, Tag, Layers, Ruler } from 'lucide-react'
import SimpleTexturePanel from './SimpleTexture'

const CollapsiblePanel = ({ title, children, defaultOpen = true, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="tech-panel" style={{
      marginBottom: '20px',
      borderRadius: '10px',
      overflow: 'hidden',
      border: '1px solid rgba(0, 212, 255, 0.15)',
      background: 'rgba(0, 20, 45, 0.6)',
      flex: 1
    }}>
      <div style={{
        padding: '16px 18px',
        background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.2) 0%, rgba(0, 212, 255, 0.05) 100%)',
        borderBottom: isOpen ? '1px solid rgba(0, 212, 255, 0.25)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }} onClick={() => setIsOpen(!isOpen)}
         onMouseEnter={(e) => {
           e.currentTarget.style.background = 'linear-gradient(90deg, rgba(0, 212, 255, 0.25) 0%, rgba(0, 212, 255, 0.08) 100%)'
         }}
         onMouseLeave={(e) => {
           e.currentTarget.style.background = 'linear-gradient(90deg, rgba(0, 212, 255, 0.2) 0%, rgba(0, 212, 255, 0.05) 100%)'
         }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {Icon && <Icon size={20} color="#00d4ff" style={{ filter: 'drop-shadow(0 0 6px rgba(0, 212, 255, 0.5))' }} />}
          <span style={{
            fontSize: '15px',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '1.2px',
            textShadow: '0 0 10px rgba(0, 212, 255, 0.3)'
          }}>{title}</span>
        </div>
        {isOpen ? 
          <ChevronUp size={18} color="#00d4ff" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 212, 255, 0.5))' }} /> : 
          <ChevronDown size={18} color="#64748b" />
        }
      </div>
      {isOpen && (
        <div style={{ padding: '18px', minHeight: '100px' }}>
          {children}
        </div>
      )}
    </div>
  )
}

const ModelListItem = ({ model, isSelected, isVisible, onSelect, onToggleVisibility, onLocate }) => {
  const getTypeIcon = (type) => {
    const icons = {
      teaching: '🏫',
      lab: '🔬',
      library: '📚',
      gym: '🏟️',
      dorm: '🏠',
      canteen: '🍽️',
      admin: '🏢'
    }
    return icons[type] || '🏗️'
  }

  return (
    <div
      style={{
        padding: '14px 16px',
        marginBottom: '12px',
        background: isSelected ? 
          'linear-gradient(135deg, rgba(0, 212, 255, 0.25) 0%, rgba(0, 212, 255, 0.1) 100%)' : 
          'rgba(1, 30, 68, 0.6)',
        border: `2px solid ${isSelected ? '#00d4ff' : 'rgba(0, 212, 255, 0.2)'}`,
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: isSelected ? '0 0 20px rgba(0, 212, 255, 0.3)' : 'none'
      }}
      onClick={() => onSelect(model)}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isSelected ? 
          'linear-gradient(135deg, rgba(0, 212, 255, 0.3) 0%, rgba(0, 212, 255, 0.15) 100%)' : 
          'rgba(0, 212, 255, 0.12)'
        e.currentTarget.style.transform = 'translateX(4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isSelected ? 
          'linear-gradient(135deg, rgba(0, 212, 255, 0.25) 0%, rgba(0, 212, 255, 0.1) 100%)' : 
          'rgba(1, 30, 68, 0.6)'
        e.currentTarget.style.transform = 'translateX(0)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
          <span style={{ fontSize: '28px', filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.4))' }}>
            {getTypeIcon(model.type)}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '15px',
              fontWeight: '700',
              color: isSelected ? '#00d4ff' : '#ffffff',
              marginBottom: '4px',
              textShadow: isSelected ? '0 0 10px rgba(0, 212, 255, 0.5)' : 'none'
            }}>
              {model.name}
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>
              {model.floors}层 | {model.area}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '6px',
              border: 'none',
              background: 'rgba(0, 212, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={(e) => {
              e.stopPropagation()
              onLocate(model)
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 212, 255, 0.25)'
              e.currentTarget.style.transform = 'scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 212, 255, 0.15)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <Locate size={16} color="#00d4ff" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 212, 255, 0.6))' }} />
          </button>
          <button
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '6px',
              border: 'none',
              background: isVisible ? 'rgba(34, 197, 94, 0.25)' : 'rgba(239, 68, 68, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={(e) => {
              e.stopPropagation()
              onToggleVisibility(model.id)
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {isVisible ? 
              <Eye size={16} color="#22c55e" style={{ filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.6))' }} /> : 
              <EyeOff size={16} color="#ef4444" style={{ filter: 'drop-shadow(0 0 4px rgba(239, 68, 68, 0.6))' }} />
            }
          </button>
        </div>
      </div>
    </div>
  )
}

const ModelListPanel = () => {
  const { selectedModel, setSelectedModel, modelVisibility, toggleModelVisibility } = useStore()
  const [openGroups, setOpenGroups] = React.useState({
    teaching: true,
    lab: true,
    library: true,
    gym: true,
    dorm: true,
    canteen: true,
    admin: true
  })

  const handleLocate = (model) => {
    setSelectedModel(model)
  }

  const toggleGroup = (groupType) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupType]: !prev[groupType]
    }))
  }

  // 定义分类和对应的名称
  const groupConfig = {
    teaching: { name: '教学楼', icon: '🏫' },
    lab: { name: '实验楼', icon: '🔬' },
    library: { name: '图书馆', icon: '📚' },
    gym: { name: '体育馆', icon: '🏟️' },
    dorm: { name: '宿舍楼', icon: '🏠' },
    canteen: { name: '食堂', icon: '🍽️' },
    admin: { name: '行政楼', icon: '🏢' }
  }

  // 按类型分组模型
  const groupedModels = defaultBuildingData.reduce((acc, model) => {
    if (!acc[model.type]) {
      acc[model.type] = []
    }
    acc[model.type].push(model)
    return acc
  }, {})

  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Input.Search
          placeholder="搜索模型..."
          allowClear
          style={{
            background: 'rgba(1, 30, 68, 0.8)',
            borderRadius: '10px',
            border: '1px solid rgba(0, 212, 255, 0.25)'
          }}
        />
      </div>
      <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '6px' }}>
        {Object.entries(groupConfig).map(([type, config]) => {
          const models = groupedModels[type] || []
          if (models.length === 0) return null
          
          return (
            <div key={type} style={{ marginBottom: '12px' }}>
              {/* 分组标题 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.15) 0%, rgba(0, 212, 255, 0.05) 100%)',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 212, 255, 0.25)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginBottom: '8px'
                }}
                onClick={() => toggleGroup(type)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(90deg, rgba(0, 212, 255, 0.2) 0%, rgba(0, 212, 255, 0.08) 100%)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(90deg, rgba(0, 212, 255, 0.15) 0%, rgba(0, 212, 255, 0.05) 100%)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '22px', filter: 'drop-shadow(0 0 6px rgba(0, 212, 255, 0.4))' }}>{config.icon}</span>
                  <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '14px', letterSpacing: '0.5px' }}>
                    {config.name}
                  </span>
                  <span style={{ 
                    color: '#00d4ff', 
                    fontSize: '12px', 
                    fontWeight: '600',
                    background: 'rgba(0, 212, 255, 0.15)',
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>
                    {models.length}
                  </span>
                </div>
                <span style={{ color: '#00d4ff' }}>
                  {openGroups[type] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </div>
              
              {/* 展开的模型列表 */}
              {openGroups[type] && (
                <div style={{ paddingLeft: '10px' }}>
                  {models.map((model) => (
                    <ModelListItem
                      key={model.id}
                      model={model}
                      isSelected={selectedModel?.id === model.id}
                      isVisible={modelVisibility[model.id] !== false}
                      onSelect={setSelectedModel}
                      onToggleVisibility={toggleModelVisibility}
                      onLocate={handleLocate}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

const PropertyEditPanel = () => {
  const { selectedModel, updateModel, transformMode, setTransformMode } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [localModel, setLocalModel] = useState(null)

  // 当选择模型变化时，更新本地状态
  React.useEffect(() => {
    if (selectedModel) {
      setLocalModel({ ...selectedModel })
    }
  }, [selectedModel?.id])

  const handleSave = () => {
    if (localModel && selectedModel) {
      updateModel(selectedModel.id, localModel)
      setIsEditing(false)
    }
  }

  if (!selectedModel || !localModel) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '30px 20px',
        color: '#64748b'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🏗️</div>
        <p>点击场景中的模型查看和编辑属性</p>
      </div>
    )
  }

  const buildingTypeOptions = [
    { value: 'teaching', label: '教学楼' },
    { value: 'lab', label: '实验楼' },
    { value: 'library', label: '图书馆' },
    { value: 'gym', label: '体育馆' },
    { value: 'dorm', label: '宿舍楼' },
    { value: 'canteen', label: '食堂' },
    { value: 'admin', label: '行政楼' },
    { value: 'other', label: '其他' }
  ]

  const getBuildingTypeName = (type) => {
    const found = buildingTypeOptions.find(option => option.value === type)
    return found ? found.label : '其他'
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div style={{
        background: 'rgba(1, 30, 68, 0.6)',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid rgba(0, 212, 255, 0.15)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Edit3 size={14} color="#00d4ff" />
            <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '600' }}>基本信息</span>
          </div>
          <Button
            size="small"
            type={isEditing ? "primary" : "default"}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            style={{
              background: isEditing ? 'linear-gradient(135deg, #00d4ff 0%, #10b981 100%)' : 'transparent',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '6px'
            }}
          >
            {isEditing ? '保存' : '编辑'}
          </Button>
        </div>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <div>
            <label style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>建筑名称</label>
            {isEditing ? (
              <Input
                value={localModel.name}
                onChange={(e) => setLocalModel({ ...localModel, name: e.target.value })}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '6px',
                  color: '#e2e8f0'
                }}
              />
            ) : <div style={{ color: '#e2e8f0', fontSize: '14px' }}>{localModel.name}</div>}
          </div>
          <div>
            <label style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>描述</label>
            {isEditing ? (
              <Input.TextArea
                value={localModel.description || ''}
                onChange={(e) => setLocalModel({ ...localModel, description: e.target.value })}
                rows={3}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '6px',
                  color: '#e2e8f0'
                }}
              />
            ) : <div style={{ color: '#94a3b8', fontSize: '13px' }}>{localModel.description}</div>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '4px' }}>
            <div>
              <label style={{ color: '#64748b', fontSize: '11px', display: 'block', marginBottom: '4px' }}>建筑类型</label>
              {isEditing ? (
                <Select
                  value={localModel.type}
                  onChange={(value) => setLocalModel({ ...localModel, type: value })}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '6px',
                    color: '#e2e8f0'
                  }}
                  options={buildingTypeOptions}
                />
              ) : (
                <div style={{ color: '#00d4ff', fontSize: '13px', fontWeight: '600', marginTop: '2px' }}>
                  {getBuildingTypeName(localModel.type)}
                </div>
              )}
            </div>
            <div>
              <label style={{ color: '#64748b', fontSize: '11px', display: 'block', marginBottom: '4px' }}>楼层数</label>
              {isEditing ? (
                <InputNumber
                  value={localModel.floors}
                  onChange={(value) => setLocalModel({ ...localModel, floors: value })}
                  min={1}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '6px',
                    color: '#e2e8f0'
                  }}
                  suffix="层"
                />
              ) : (
                <div style={{ color: '#22c55e', fontSize: '13px', fontWeight: '600', marginTop: '2px' }}>
                  {localModel.floors} 层
                </div>
              )}
            </div>
            <div>
              <label style={{ color: '#64748b', fontSize: '11px', display: 'block', marginBottom: '4px' }}>建筑面积</label>
              {isEditing ? (
                <Input
                  value={localModel.area}
                  onChange={(e) => setLocalModel({ ...localModel, area: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '6px',
                    color: '#e2e8f0'
                  }}
                />
              ) : (
                <div style={{ color: '#f59e0b', fontSize: '13px', fontWeight: '600', marginTop: '2px' }}>
                  {localModel.area}
                </div>
              )}
            </div>
            <div>
              <label style={{ color: '#64748b', fontSize: '11px', display: 'block', marginBottom: '4px' }}>建成年份</label>
              {isEditing ? (
                <InputNumber
                  value={localModel.builtYear}
                  onChange={(value) => setLocalModel({ ...localModel, builtYear: value })}
                  min={1900}
                  max={2100}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '6px',
                    color: '#e2e8f0'
                  }}
                  suffix="年"
                />
              ) : (
                <div style={{ color: '#a855f7', fontSize: '13px', fontWeight: '600', marginTop: '2px' }}>
                  {localModel.builtYear} 年
                </div>
              )}
            </div>
          </div>
        </Space>
      </div>

      <div style={{
        background: 'rgba(1, 30, 68, 0.6)',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid rgba(0, 212, 255, 0.15)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '600' }}>变换控制</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <Button 
              size="small"
              style={{ height: '26px', fontSize: '10px', padding: '0 8px' }}
              type={transformMode === 'translate' ? 'primary' : 'default'}
              onClick={() => setTransformMode(transformMode === 'translate' ? null : 'translate')}
            >
              ↔️ 移动
            </Button>
            <Button 
              size="small"
              style={{ height: '26px', fontSize: '10px', padding: '0 8px' }}
              type={transformMode === 'rotate' ? 'primary' : 'default'}
              onClick={() => setTransformMode(transformMode === 'rotate' ? null : 'rotate')}
            >
              🔄 旋转
            </Button>
          </div>
        </div>
        
        {transformMode && (
          <div style={{ 
            color: '#00d4ff', 
            fontSize: '10px', 
            marginTop: '10px',
            padding: '6px 8px', 
            background: 'rgba(0, 212, 255, 0.1)', 
            borderRadius: '4px' 
          }}>
            {transformMode === 'translate' ? '提示：在3D视图中拖动彩色箭头移动模型' : '提示：在3D视图中拖动彩色圆环旋转模型'}
          </div>
        )}
      </div>
    </Space>
  )
}

const MeasurePanel = () => {
  const { setMeasurementMode, measurements, clearMeasurements, measurementPoints, measurementMode, finishCurrentMeasurement } = useStore()

  const measureButtons = [
    { id: 'length', label: '距离测量', icon: '📏', color: '#22c55e' },
    { id: 'area', label: '面积测量', icon: '📐', color: '#f59e0b' },
    { id: 'height', label: '高度测量', icon: '📊', color: '#00d4ff' },
    { id: 'angle', label: '角度测量', icon: '📐', color: '#a855f7' }
  ]

  const calculateTotalDistance = (points) => {
    let total = 0
    for (let i = 1; i < points.length; i++) {
      const dx = points[i][0] - points[i-1][0]
      const dy = points[i][1] - points[i-1][1]
      const dz = points[i][2] - points[i-1][2]
      total += Math.sqrt(dx * dx + dy * dy + dz * dz)
    }
    return total
  }

  const getMeasurementDisplay = (m) => {
    if (m.type === 'length' && m.points) {
      const total = calculateTotalDistance(m.points)
      return { 
        label: `距离 (${m.points.length}个点)`, 
        value: `${total.toFixed(2)}m`, 
        color: '#22c55e' 
      }
    }
    switch (m.type) {
      case 'length': return { label: '距离', value: m.distance ? `${m.distance.toFixed(2)}m` : '0m', color: '#22c55e' }
      case 'area': return { label: '面积', value: m.area ? `${m.area.toFixed(2)}㎡` : '0㎡', color: '#f59e0b' }
      case 'height': return { label: '高度', value: m.height ? `${m.height.toFixed(2)}m` : '0m', color: '#00d4ff' }
      case 'angle': return { label: '角度', value: m.angle ? `${m.angle.toFixed(1)}°` : '0°', color: '#a855f7' }
      default: return { label: m.type, value: '', color: '#64748b' }
    }
  }

  const requiredPoints = {
    length: '∞',
    height: 2,
    area: 3,
    angle: 3
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px'
      }}>
        {measureButtons.map(({ id, label, icon, color }) => (
          <Button
            key={id}
            block
            onClick={() => setMeasurementMode(id)}
            style={{
              background: measurementMode === id ? `${color}20` : 'transparent',
              border: measurementMode === id ? `1px solid ${color}` : '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '8px',
              height: '44px',
              color: measurementMode === id ? color : '#00d4ff'
            }}
          >
            <span style={{ marginRight: '6px' }}>{icon}</span>
            {label}
          </Button>
        ))}
      </div>

      {measurementMode && (
        <div style={{
          background: 'rgba(0, 212, 255, 0.1)',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <div style={{ color: '#e2e8f0', fontSize: '13px', marginBottom: '8px' }}>
            已选点: {measurementPoints.length} / {requiredPoints[measurementMode]}
            {measurementMode === 'length' && measurementPoints.length >= 2 && (
              <span style={{ color: '#22c55e', marginLeft: '8px' }}>
                (当前总长: {calculateTotalDistance(measurementPoints).toFixed(2)}m)
              </span>
            )}
          </div>
          <div style={{ color: '#64748b', fontSize: '11px', marginBottom: '10px' }}>
            {measurementMode === 'length' && '点击地面选择任意多个点测量距离，双击结束测量'}
            {measurementMode === 'height' && '点击两个点测量垂直高度差'}
            {measurementMode === 'area' && '点击3个或更多点测量多边形面积'}
            {measurementMode === 'angle' && '点击三个点（顶点在中间）测量角度'}
          </div>
          {measurementMode === 'length' && measurementPoints.length >= 2 && (
            <Button
              type="primary"
              block
              onClick={finishCurrentMeasurement}
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #10b981 100%)',
                border: 'none',
                borderRadius: '8px'
              }}
            >
              完成测量
            </Button>
          )}
        </div>
      )}

      {measurements.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '600' }}>
              测量结果 ({measurements.length})
            </span>
            <Button
              size="small"
              danger
              onClick={clearMeasurements}
              icon={<Trash2 size={14} />}
            >
              清除
            </Button>
          </div>
          {measurements.map((m, i) => {
            const display = getMeasurementDisplay(m)
            return (
              <div
                key={i}
                style={{
                  background: 'rgba(1, 30, 68, 0.5)',
                  padding: '10px',
                  borderRadius: '6px',
                  marginBottom: '8px',
                  border: '1px solid rgba(0, 212, 255, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ color: '#64748b', fontSize: '12px' }}>
                  {display.label}
                </div>
                <div style={{ color: display.color, fontSize: '14px', fontWeight: '600' }}>
                  {display.value}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Space>
  )
}

const ModelingPanel = () => {
  const { 
    buildingPoints, 
    setBuildingHeight, 
    buildingHeight, 
    clearBuildingPoints,
    undoBuildingPoint,
    addModel,
    setBuildingColor,
    buildingColor,
    buildingImage,
    setBuildingImage,
    resetModelingParams,
    selectedModel,
    setSelectedModel,
    updateModel,
    removeModel,
    models,
    transformMode,
    setTransformMode
  } = useStore()

  const createBuilding = () => {
    const newBuilding = {
      id: `building-${Date.now()}`,
      name: '新建建筑',
      type: 'teaching',
      style: 'modern',
      position: [0, 0, 0],
      scale: 1,
      color: buildingColor,
      image: buildingImage,
      description: '用户创建的建筑',
      floors: Math.ceil(buildingHeight / 3),
      area: `${Math.floor(buildingHeight * 100)}㎡`,
      builtYear: 2024,
      points: [...buildingPoints],
      height: buildingHeight,
      isCustom: true,
      offset: [0, 0, 0],
      rotation: 0
    }
    addModel(newBuilding)
    resetModelingParams()
    setTimeout(() => setSelectedModel(newBuilding), 100)
  }

  const textureOptions = [
    { id: 'brick', name: '砖墙', color: '#a08060' },
    { id: 'glass', name: '玻璃', color: '#80c0d0' },
    { id: 'concrete', name: '混凝土', color: '#808080' },
    { id: 'metal', name: '金属', color: '#608090' },
    { id: 'stone', name: '石材', color: '#b0a080' },
    { id: 'tiles', name: '墙砖', color: '#c0b0a0' },
    { id: 'wood', name: '木质', color: '#a07040' },
    { id: 'paint', name: '涂料', color: '#e0e0e0' }
  ]

  const colorOptions = [
    '#e8e8e8', '#a0b0c0', '#8090a0', '#d0a080', 
    '#60a0c0', '#80c0a0', '#a080c0', '#c08080',
    '#5070a0', '#609070', '#906070', '#a09060'
  ]

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div style={{
        background: 'rgba(0, 212, 255, 0.1)',
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid rgba(0, 212, 255, 0.2)'
      }}>
        <div style={{ color: '#e2e8f0', fontSize: '13px', marginBottom: '8px', fontWeight: '600' }}>
          地面范围框选绘制
        </div>
        <div style={{ color: '#64748b', fontSize: '11px', marginBottom: '6px' }}>
          点击地面添加多边形顶点，支持任意封闭形状
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#00d4ff', fontSize: '12px', fontWeight: '600' }}>
            已选顶点: {buildingPoints.length}
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {buildingPoints.length > 0 && (
              <Button
                size="small"
                onClick={undoBuildingPoint}
                style={{ borderColor: 'rgba(0, 212, 255, 0.5)', color: '#00d4ff' }}
              >
                撤销
              </Button>
            )}
            {buildingPoints.length > 0 && (
              <Button
                size="small"
                danger
                onClick={clearBuildingPoints}
              >
                清空
              </Button>
            )}
          </div>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <label style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '600' }}>
            模型高度
          </label>
          <Input
            type="number"
            value={buildingHeight}
            onChange={(e) => setBuildingHeight(parseFloat(e.target.value) || 1)}
            min={1}
            max={200}
            style={{ width: '70px', background: 'rgba(1, 30, 68, 0.5)', borderColor: 'rgba(0, 212, 255, 0.3)' }}
          />
        </div>
        <Slider
          min={1}
          max={200}
          value={buildingHeight}
          onChange={setBuildingHeight}
          trackStyle={{ background: '#00d4ff' }}
          handleStyle={{ borderColor: '#00d4ff' }}
        />
      </div>

      <SimpleTexturePanel />

      <div>
        <label style={{ color: '#e2e8f0', fontSize: '13px', display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          自定义颜色
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
          {colorOptions.map(c => (
            <button
              key={c}
              onClick={() => setBuildingColor(c)}
              style={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: '4px',
                border: buildingColor === c ? '3px solid #00d4ff' : '2px solid transparent',
                background: c,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: buildingColor === c ? '0 0 10px rgba(0, 212, 255, 0.4)' : 'none'
              }}
            />
          ))}
        </div>
      </div>

      {buildingPoints.length >= 3 && (
        <Button
          type="primary"
          block
          size="large"
          onClick={createBuilding}
          icon={<PlayCircle size={18} />}
          style={{
            background: 'linear-gradient(135deg, #00d4ff 0%, #60a5fa 100%)',
            border: 'none',
            borderRadius: '4px',
            height: '44px',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          生成三维模型
        </Button>
      )}

      {/* 已创建的模型列表 */}
      {models.filter(m => m.isCustom).length > 0 && (
        <div style={{
          background: 'rgba(1, 30, 68, 0.6)',
          padding: '12px',
          borderRadius: '4px',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '600' }}>
              已创建的模型 ({models.filter(m => m.isCustom).length})
            </div>
            {transformMode && (
              <Button size="small" danger onClick={() => {
                setTransformMode(null);
              }}>
                结束变换
              </Button>
            )}
          </div>
          
          {models.filter(m => m.isCustom).map(model => (
            <div key={model.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px',
              marginBottom: '6px',
              background: selectedModel?.id === model.id 
                ? 'rgba(0, 212, 255, 0.2)' 
                : 'rgba(0, 212, 255, 0.05)',
              borderRadius: '4px',
              border: selectedModel?.id === model.id 
                ? '2px solid rgba(0, 212, 255, 0.5)' 
                : '1px solid rgba(0, 212, 255, 0.1)'
            }}>
              <div>
                <div style={{ color: '#e2e8f0', fontSize: '12px' }}>{model.name}</div>
                <div style={{ color: '#64748b', fontSize: '10px' }}>
                  高度: {model.height}m | 顶点: {model.points?.length || 0}
                </div>
              </div>
            </div>
          ))}
          

          

        </div>
      )}
    </Space>
  )
}

const PipePanel = () => {
  const { selectedPipe, setSelectedPipe, setHasSelectedPipe, setCameraTarget, layers, toggleLayer, setCurrentTool } = useStore()
  
  // 为管线数据添加图标字段
  const pipesData = defaultPipeData.map(pipe => {
    let icon;
    switch (pipe.pipeType) {
      case 'water':
        icon = '💧';
        break;
      case 'drain':
        icon = '🚿';
        break;
      case 'power':
        icon = '⚡';
        break;
      case 'gas':
        icon = '🔥';
        break;
      case 'heat':
        icon = '🌡️';
        break;
      case 'communication':
        icon = '📡';
        break;
      default:
        icon = '�';
    }
    return {
      ...pipe,
      icon
    };
  });
  
  const pipeTypeNames = {
    water: '给水管道',
    drain: '排水管道',
    power: '电力管线',
    gas: '燃气管线',
    heat: '热力管线',
    communication: '通信管线'
  };
  
  const handleSelectPipe = (pipe) => {
    console.log('右侧面板选择管线:', pipe.id);
    // 确保管线图层开启
    if (!layers.pipes) {
      toggleLayer('pipes');
    }
    // 设置当前工具为管线工具
    setCurrentTool('pipes');
    setSelectedPipe(pipe);
    setHasSelectedPipe(true);
    // 计算管线中点位置并设置相机目标
    if (pipe.path && pipe.path.length >= 2) {
      const midX = (pipe.path[0][0] + pipe.path[pipe.path.length - 1][0]) / 2;
      const midY = Math.abs(pipe.path[0][1]) + 30; // 在地面上方30米处定位相机，视角更好
      const midZ = (pipe.path[0][2] + pipe.path[pipe.path.length - 1][2]) / 2;
      setCameraTarget([midX, midY, midZ]);
    }
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div style={{
        background: 'rgba(1, 30, 68, 0.6)',
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid rgba(0, 212, 255, 0.15)'
      }}>
        <span style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '16px' }}>
          管线列表
        </span>
        <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
          {pipesData.map(pipe => (
            <div
              key={pipe.id}
              onClick={() => handleSelectPipe(pipe)}
              style={{
                padding: '16px 14px',
                marginBottom: '12px',
                borderRadius: '8px',
                background: selectedPipe?.id === pipe.id 
                  ? 'rgba(0, 212, 255, 0.2)' 
                  : 'rgba(0, 212, 255, 0.05)',
                border: selectedPipe?.id === pipe.id 
                  ? '1px solid #00d4ff' 
                  : '1px solid rgba(0, 212, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: selectedPipe?.id === pipe.id 
                  ? '0 0 15px rgba(0, 212, 255, 0.2)' 
                  : 'none'
              }}
            >
              <span style={{ fontSize: '24px' }}>{pipe.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                  {pipe.name}
                </div>
                <div style={{ color: '#64748b', fontSize: '12px' }}>
                  {pipeTypeNames[pipe.pipeType]} · 总长: {pipe.length}
                </div>
              </div>
              <div 
                style={{ 
                  width: '16px', 
                  height: '16px', 
                  borderRadius: '50%', 
                  background: pipe.color,
                  boxShadow: `0 0 10px ${pipe.color}`,
                  flexShrink: 0
                }} 
              />
            </div>
          ))}
        </div>
      </div>

      {selectedPipe && (
        <div style={{
          background: 'rgba(1, 30, 68, 0.6)',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid rgba(0, 212, 255, 0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '28px' }}>
              {(() => {
                // 为选中的管线添加图标
                let selectedIcon;
                switch (selectedPipe.pipeType) {
                  case 'water':
                    selectedIcon = '💧';
                    break;
                  case 'drain':
                    selectedIcon = '🚿';
                    break;
                  case 'power':
                    selectedIcon = '⚡';
                    break;
                  case 'gas':
                    selectedIcon = '🔥';
                    break;
                  case 'heat':
                    selectedIcon = '🌡️';
                    break;
                  case 'communication':
                    selectedIcon = '📡';
                    break;
                  default:
                    selectedIcon = '📦';
                }
                return selectedIcon;
              })()}
            </span>
            <div>
              <div style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: '600', marginBottom: '2px' }}>
                {selectedPipe.name}
              </div>
              <div style={{ color: '#64748b', fontSize: '13px' }}>
                {selectedPipe.description}
              </div>
            </div>
          </div>
          
          <Divider style={{ margin: '16px 0', borderColor: 'rgba(0, 212, 255, 0.2)' }} />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{
              background: 'rgba(0, 212, 255, 0.1)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '6px' }}>管径</div>
              <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>{selectedPipe.diameterMm}mm</div>
            </div>
            <div style={{
              background: 'rgba(0, 212, 255, 0.1)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '6px' }}>材质</div>
              <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>{selectedPipe.material}</div>
            </div>
            <div style={{
              background: 'rgba(0, 212, 255, 0.1)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '6px' }}>埋深</div>
              <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>{selectedPipe.depth}m</div>
            </div>
            <div style={{
              background: 'rgba(0, 212, 255, 0.1)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '6px' }}>总长度</div>
              <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>{selectedPipe.length}</div>
            </div>
          </div>
          
          {/* 附加信息 */}
          <div style={{ marginTop: '12px' }}>
            {selectedPipe.pressure && (
              <div style={{
                background: 'rgba(0, 212, 255, 0.1)',
                padding: '12px',
                borderRadius: '8px',
                marginTop: '10px'
              }}>
                <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '6px' }}>压力</div>
                <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>{selectedPipe.pressure}</div>
              </div>
            )}
            {selectedPipe.voltage && (
              <div style={{
                background: 'rgba(0, 212, 255, 0.1)',
                padding: '12px',
                borderRadius: '8px',
                marginTop: '10px'
              }}>
                <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '6px' }}>电压</div>
                <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>{selectedPipe.voltage}</div>
              </div>
            )}
            {selectedPipe.flow && (
              <div style={{
                background: 'rgba(0, 212, 255, 0.1)',
                padding: '12px',
                borderRadius: '8px',
                marginTop: '10px'
              }}>
                <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '6px' }}>流量</div>
                <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>{selectedPipe.flow}</div>
              </div>
            )}
            {selectedPipe.temp && (
              <div style={{
                background: 'rgba(0, 212, 255, 0.1)',
                padding: '12px',
                borderRadius: '8px',
                marginTop: '10px'
              }}>
                <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '6px' }}>温度</div>
                <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>{selectedPipe.temp}</div>
              </div>
            )}
            {selectedPipe.fiberType && (
              <div style={{
                background: 'rgba(0, 212, 255, 0.1)',
                padding: '12px',
                borderRadius: '8px',
                marginTop: '10px'
              }}>
                <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '6px' }}>光纤类型</div>
                <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>{selectedPipe.fiberType}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </Space>
  )
}

const AnalysisPanel = () => {
  const { 
    setAnalysisMode, 
    analysisMode, 
    sunPosition, 
    setSunPosition, 
    analysisViewpoint,
    clearAnalysisResults
  } = useStore()

  const analysisButtons = [
    { id: 'viewshed', label: '可视范围分析', icon: '👁️', color: '#00d4ff' },
    { id: 'sunlight', label: '日照分析', icon: '☀️', color: '#f59e0b' }
  ]

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
        {analysisButtons.map(({ id, label, icon, color }) => (
          <Button
            key={id}
            block
            onClick={() => setAnalysisMode(id)}
            style={{
              background: analysisMode === id ? `${color}20` : 'transparent',
              border: analysisMode === id ? `1px solid ${color}` : '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '8px',
              height: '44px',
              color: analysisMode === id ? color : '#00d4ff'
            }}
          >
            <span style={{ marginRight: '6px' }}>{icon}</span>
            {label}
          </Button>
        ))}
      </div>

      {analysisMode && (
        <div style={{
          background: 'rgba(0, 212, 255, 0.1)',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <div style={{ color: '#e2e8f0', fontSize: '13px', marginBottom: '10px' }}>
            {analysisViewpoint ? '已选择分析点' : '点击地面选择分析点'}
          </div>
          
          {analysisMode === 'sunlight' && (
            <div style={{ marginTop: '12px' }}>
              <div style={{ color: '#64748b', fontSize: '11px', marginBottom: '6px' }}>
                太阳方位角: {sunPosition.azimuth}°
              </div>
              <Slider
                min={0}
                max={360}
                value={sunPosition.azimuth}
                onChange={(val) => setSunPosition({ ...sunPosition, azimuth: val })}
                trackStyle={{ background: '#f59e0b' }}
                handleStyle={{ borderColor: '#f59e0b' }}
              />
              <div style={{ color: '#64748b', fontSize: '11px', marginBottom: '6px', marginTop: '12px' }}>
                太阳高度角: {sunPosition.altitude}°
              </div>
              <Slider
                min={5}
                max={85}
                value={sunPosition.altitude}
                onChange={(val) => setSunPosition({ ...sunPosition, altitude: val })}
                trackStyle={{ background: '#f59e0b' }}
                handleStyle={{ borderColor: '#f59e0b' }}
              />
            </div>
          )}

          {analysisMode === 'viewshed' && analysisViewpoint && (
            <div style={{ marginTop: '12px' }}>
              <div style={{ color: '#64748b', fontSize: '11px' }}>
                视点位置: ({analysisViewpoint[0].toFixed(1)}, {analysisViewpoint[1].toFixed(1)}, {analysisViewpoint[2].toFixed(1)})
              </div>
            </div>
          )}
        </div>
      )}

      {(analysisMode || analysisViewpoint) && (
        <Button
          danger
          block
          onClick={clearAnalysisResults}
          icon={<Trash2 size={14} />}
        >
          清除分析
        </Button>
      )}

      <div style={{
        background: 'rgba(1, 30, 68, 0.6)',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid rgba(0, 212, 255, 0.15)'
      }}>
        <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '12px' }}>
          使用说明
        </span>
        <div style={{ color: '#64748b', fontSize: '11px', lineHeight: '1.6' }}>
          • 可视范围分析: 点击地面设置视点，显示100米范围内的可视区域<br/>
          • 日照分析: 调整太阳位置，观察场景的阴影变化
        </div>
      </div>
    </Space>
  )
}

// 资源管理弹窗组件
const ResourceModal = () => {
  const {
    resources,
    resourceModalOpen,
    setResourceModalOpen,
    addResource,
    removeResource,
    toggleResourceVisibility,
    updateResource
  } = useStore()
  
  const [formVisible, setFormVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'pipe',
    pipeType: 'water',
    url: '',
    description: ''
  })
  const [uploadingFile, setUploadingFile] = useState(null)

  const pipeTypes = [
    { value: 'water', label: '给水管道' },
    { value: 'power', label: '电力管线' },
    { value: 'communication', label: '通信管线' },
    { value: 'sewer', label: '污水管道' },
    { value: 'gas', label: '天然气管' }
  ]

  const resourceTypes = [
    { value: 'pipe', label: '管线资源' },
    { value: 'building', label: '建筑资源' },
    { value: 'terrain', label: '地形资源' },
    { value: 'other', label: '其他资源' }
  ]

  const handleAddResource = () => {
    if (!formData.name.trim()) return
    
    const newResource = {
      id: `resource-${Date.now()}`,
      ...formData,
      visible: true,
      data: null,
      createdAt: new Date().toISOString()
    }
    
    addResource(newResource)
    setFormData({
      name: '',
      type: 'pipe',
      pipeType: 'water',
      url: '',
      description: ''
    })
    setFormVisible(false)
  }

  const getResourceTypeLabel = (type) => {
    switch(type) {
      case 'pipe': return '管线资源'
      case 'building': return '建筑资源'
      case 'terrain': return '地形资源'
      default: return '其他资源'
    }
  }

  const getPipeTypeLabel = (type) => {
    const found = pipeTypes.find(t => t.value === type)
    return found?.label || ''
  }

  const handleFileUpload = (e, resourceId) => {
    const file = e.target.files[0]
    if (file) {
      setUploadingFile(resourceId)
      setTimeout(() => {
        updateResource(resourceId, { data: { fileName: file.name, uploaded: true } })
        setUploadingFile(null)
      }, 1000)
    }
  }

  return (
    resourceModalOpen ? (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          width: '1000px',
          maxHeight: '85vh',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* 标题栏 */}
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#f8fafc'
          }}>
            <h2 style={{ color: '#1e293b', margin: 0, fontSize: '20px', fontWeight: 600 }}>
              资源管理中心
            </h2>
            <button
              onClick={() => setResourceModalOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                fontSize: '28px',
                cursor: 'pointer',
                padding: '0 8px',
                lineHeight: '1'
              }}
            >
              ×
            </button>
          </div>

          {/* 内容区域 */}
          <div style={{
            padding: '24px',
            flex: 1,
            overflowY: 'auto'
          }}>
            {/* 工具栏 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '14px', color: '#64748b' }}>
                共 <span style={{ color: '#3b82f6', fontWeight: 600 }}>{resources.length}</span> 条资源
              </div>
              <Button
                type="primary"
                onClick={() => setFormVisible(!formVisible)}
                style={{
                  background: '#3b82f6',
                  border: 'none'
                }}
              >
                + 新增资源
              </Button>
            </div>

            {/* 新增资源表单 */}
            {formVisible && (
              <div style={{
                background: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <h3 style={{ color: '#1e293b', margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600 }}>
                  新增资源
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#475569', marginBottom: '6px', fontSize: '13px' }}>
                      资源名称 <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <Input
                      placeholder="请输入资源名称"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      style={{ background: '#fff', borderColor: '#d1d5db' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#475569', marginBottom: '6px', fontSize: '13px' }}>
                      资源类型 <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <Select
                      value={formData.type}
                      onChange={(v) => setFormData({...formData, type: v})}
                      style={{ width: '100%' }}
                    >
                      {resourceTypes.map(t => (
                        <Select.Option key={t.value} value={t.value}>{t.label}</Select.Option>
                      ))}
                    </Select>
                  </div>
                  {formData.type === 'pipe' && (
                    <div>
                      <label style={{ display: 'block', color: '#475569', marginBottom: '6px', fontSize: '13px' }}>
                        管线类型
                      </label>
                      <Select
                        value={formData.pipeType}
                        onChange={(v) => setFormData({...formData, pipeType: v})}
                        style={{ width: '100%' }}
                      >
                        {pipeTypes.map(t => (
                          <Select.Option key={t.value} value={t.value}>{t.label}</Select.Option>
                        ))}
                      </Select>
                    </div>
                  )}
                  <div>
                    <label style={{ display: 'block', color: '#475569', marginBottom: '6px', fontSize: '13px' }}>
                      服务地址
                    </label>
                    <Input
                      placeholder="请输入服务地址URL"
                      value={formData.url}
                      onChange={(e) => setFormData({...formData, url: e.target.value})}
                      style={{ background: '#fff', borderColor: '#d1d5db' }}
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', color: '#475569', marginBottom: '6px', fontSize: '13px' }}>
                      描述说明
                    </label>
                    <Input.TextArea
                      placeholder="请输入资源描述"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      style={{ background: '#fff', borderColor: '#d1d5db' }}
                      rows={2}
                    />
                  </div>
                </div>
                <div style={{ marginTop: '16px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <Button onClick={() => setFormVisible(false)}>
                    取消
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleAddResource}
                    disabled={!formData.name.trim()}
                    style={{
                      background: '#3b82f6',
                      border: 'none'
                    }}
                  >
                    确定添加
                  </Button>
                </div>
              </div>
            )}

            {/* 资源表格 */}
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f1f5f9' }}>
                  <tr>
                    <th style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      borderBottom: '1px solid #e5e7eb',
                      color: '#475569',
                      fontSize: '13px',
                      fontWeight: 600
                    }}>序号</th>
                    <th style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      borderBottom: '1px solid #e5e7eb',
                      color: '#475569',
                      fontSize: '13px',
                      fontWeight: 600
                    }}>资源名称</th>
                    <th style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      borderBottom: '1px solid #e5e7eb',
                      color: '#475569',
                      fontSize: '13px',
                      fontWeight: 600
                    }}>资源类型</th>
                    <th style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      borderBottom: '1px solid #e5e7eb',
                      color: '#475569',
                      fontSize: '13px',
                      fontWeight: 600
                    }}>服务地址</th>
                    <th style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      borderBottom: '1px solid #e5e7eb',
                      color: '#475569',
                      fontSize: '13px',
                      fontWeight: 600
                    }}>状态</th>
                    <th style={{
                      padding: '12px 16px',
                      textAlign: 'center',
                      borderBottom: '1px solid #e5e7eb',
                      color: '#475569',
                      fontSize: '13px',
                      fontWeight: 600
                    }}>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{
                        padding: '60px 20px',
                        textAlign: 'center',
                        color: '#94a3b8',
                        fontSize: '14px'
                      }}>
                        暂无资源数据，点击上方「新增资源」添加
                      </td>
                    </tr>
                  ) : (
                    resources.map((resource, index) => (
                      <tr key={resource.id} style={{ 
                        background: index % 2 === 0 ? '#fff' : '#fafafa',
                        opacity: resource.visible ? 1 : 0.6
                      }}>
                        <td style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #e5e7eb',
                          color: '#64748b',
                          fontSize: '14px'
                        }}>{index + 1}</td>
                        <td style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #e5e7eb',
                          color: '#1e293b',
                          fontSize: '14px',
                          fontWeight: 500
                        }}>{resource.name}</td>
                        <td style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #e5e7eb',
                          color: '#64748b',
                          fontSize: '14px'
                        }}>
                          {getResourceTypeLabel(resource.type)}
                          {resource.type === 'pipe' && resource.pipeType && (
                            <span style={{ color: '#3b82f6', marginLeft: '8px' }}>
                              ({getPipeTypeLabel(resource.pipeType)})
                            </span>
                          )}
                        </td>
                        <td style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #e5e7eb',
                          color: '#3b82f6',
                          fontSize: '14px',
                          maxWidth: '200px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>{resource.url || '-'}</td>
                        <td style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #e5e7eb'
                        }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            background: resource.visible ? '#dcfce7' : '#fee2e2',
                            color: resource.visible ? '#166534' : '#991b1b'
                          }}>
                            <span style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: resource.visible ? '#22c55e' : '#ef4444'
                            }} />
                            {resource.visible ? '显示' : '隐藏'}
                          </span>
                        </td>
                        <td style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #e5e7eb',
                          textAlign: 'center'
                        }}>
                          <Space size="small">
                            <Button
                              size="small"
                              onClick={() => toggleResourceVisibility(resource.id)}
                              style={{
                                color: resource.visible ? '#f59e0b' : '#22c55e',
                                borderColor: resource.visible ? '#f59e0b' : '#22c55e'
                              }}
                            >
                              {resource.visible ? '隐藏' : '显示'}
                            </Button>
                            {resource.type === 'pipe' && (
                              <>
                                <input
                                  type="file"
                                  accept=".json,.geojson,.shp"
                                  style={{ display: 'none' }}
                                  id={`upload-${resource.id}`}
                                  onChange={(e) => handleFileUpload(e, resource.id)}
                                />
                                <Button
                                  size="small"
                                  onClick={() => document.getElementById(`upload-${resource.id}`)?.click()}
                                  loading={uploadingFile === resource.id}
                                  style={{
                                    color: '#3b82f6',
                                    borderColor: '#3b82f6'
                                  }}
                                >
                                  {uploadingFile === resource.id ? '生成中' : '上传数据'}
                                </Button>
                              </>
                            )}
                            <Button
                              size="small"
                              danger
                              onClick={() => removeResource(resource.id)}
                            >
                              删除
                            </Button>
                          </Space>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    ) : null
  )
}

const AnnotationPanel = () => {
  const {
    annotations,
    addAnnotation,
    updateAnnotation,
    removeAnnotation,
    toggleAnnotationVisibility,
    layers,
    isSelectingAnnotationPosition,
    tempAnnotationPosition,
    startSelectingAnnotationPosition,
    cancelSelectingAnnotationPosition,
    newAnnotation,
    updateNewAnnotation,
    selectedAnnotationId,
    setSelectedAnnotationId,
    transformMode,
    setTransformMode,
    setCameraTarget
  } = useStore()

  const [editingId, setEditingId] = useState(null)

  // 监听临时位置变化
  useEffect(() => {
    if (tempAnnotationPosition) {
      updateNewAnnotation({ position: tempAnnotationPosition })
    }
  }, [tempAnnotationPosition, updateNewAnnotation])

  const handleSelectPosition = () => {
    startSelectingAnnotationPosition()
  }

  const handleConfirmPosition = () => {
    if (tempAnnotationPosition) {
      updateNewAnnotation({ position: tempAnnotationPosition })
    }
    cancelSelectingAnnotationPosition()
  }

  const styleOptions = [
    { value: 'box', label: '立方体' },
    { value: 'sphere', label: '球体' },
    { value: 'cylinder', label: '圆柱' },
    { value: 'cone', label: '圆锥' }
  ]

  const colorOptions = [
    '#00d4ff', '#22c55e', '#f59e0b', '#ec4899', 
    '#3b82f6', '#a855f7', '#10b981', '#ef4444'
  ]

  const handleAddAnnotation = () => {
    if (!newAnnotation.text.trim()) return
    
    addAnnotation({
      id: `anno-${Date.now()}`,
      rotation: [0, 0, 0],
      ...newAnnotation
    })
    
    updateNewAnnotation({
      text: '',
      position: [0, 5, 0],
      style: 'box',
      color: '#00d4ff',
      visible: true,
      size: 1,
      rotation: [0, 0, 0]
    })
    
    cancelSelectingAnnotationPosition()
  }

  const handleUpdateAnnotation = (id, field, value) => {
    updateAnnotation(id, { [field]: value })
  }

  const adjustPosition = (axis, direction) => {
    // axis: 0 = X (左右), 1 = Y (上下), 2 = Z (前后)
    // direction: -1 or 1
    const step = 1
    const newPosition = [...newAnnotation.position]
    newPosition[axis] += (direction * step)
    updateNewAnnotation({ position: newPosition })
  }

  const adjustExistingPosition = (id, axis, direction) => {
    const annotation = annotations.find(a => a.id === id)
    if (annotation) {
      const step = 1
      const newPosition = [...annotation.position]
      newPosition[axis] += (direction * step)
      updateAnnotation(id, { position: newPosition })
    }
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      {!layers.annotations ? (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>📍</div>
          <p style={{ color: '#ef4444', margin: 0, fontSize: '13px' }}>
            标注图层已关闭，请在图层管理中打开
          </p>
        </div>
      ) : (
        <>
          {/* 新建标注 */}
          <div style={{
            background: 'rgba(0, 212, 255, 0.08)',
            borderRadius: '8px',
            padding: '14px',
            border: '1px solid rgba(0, 212, 255, 0.2)'
          }}>
            <h4 style={{ color: '#e2e8f0', margin: '0 0 12px 0', fontSize: '13px', fontWeight: '600' }}>
              ✏️ 新建标注
            </h4>
            <Space direction="vertical" style={{ width: '100%' }} size="small">
              <div>
                <label style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px', display: 'block' }}>
                  标注文字
                </label>
                <Input
                  placeholder="输入标注文字"
                  value={newAnnotation.text}
                  onChange={(e) => updateNewAnnotation({ text: e.target.value })}
                  style={{ background: 'rgba(1, 30, 68, 0.8)', borderColor: 'rgba(0, 212, 255, 0.3)' }}
                />
              </div>

              <div>
                <label style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '8px', display: 'block' }}>
                  三维样式
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {styleOptions.map(style => {
                    const iconMap = {
                      box: '📦',
                      sphere: '🔵',
                      cylinder: '🟡',
                      cone: '🔺'
                    };
                    return (
                      <button
                        key={style.value}
                        onClick={() => updateNewAnnotation({ style: style.value })}
                        style={{
                          width: '100%',
                          aspectRatio: '1',
                          borderRadius: '8px',
                          background: newAnnotation.style === style.value 
                            ? 'rgba(0, 212, 255, 0.2)' 
                            : 'rgba(1, 30, 68, 0.8)',
                          border: newAnnotation.style === style.value 
                            ? '2px solid #00d4ff' 
                            : '2px solid rgba(0, 212, 255, 0.2)',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          transition: 'all 0.2s'
                        }}
                      >
                        <span style={{ fontSize: '20px' }}>{iconMap[style.value]}</span>
                        <span style={{ color: '#94a3b8', fontSize: '10px' }}>{style.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px', display: 'block' }}>
                  颜色
                </label>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(4, 1fr)', 
                  gap: '8px' 
                }}>
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      onClick={() => updateNewAnnotation({ color })}
                      style={{
                        width: '100%',
                        aspectRatio: '1',
                        borderRadius: '4px',
                        background: color,
                        border: newAnnotation.color === color 
                          ? '2px solid #fff' 
                          : '2px solid transparent',
                        cursor: 'pointer',
                        boxShadow: newAnnotation.color === color 
                          ? '0 0 10px ' + color 
                          : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px', display: 'block' }}>
                  位置 X: {newAnnotation.position[0].toFixed(1)}, Y: {newAnnotation.position[1].toFixed(1)}, Z: {newAnnotation.position[2].toFixed(1)}
                </label>
                {isSelectingAnnotationPosition ? (
                  <Space style={{ width: '100%' }}>
                    <Button
                      type="primary"
                      onClick={handleConfirmPosition}
                      style={{
                        flex: 1,
                        background: '#22c55e',
                        border: 'none'
                      }}
                    >
                      ✓ 确认位置
                    </Button>
                    <Button
                      onClick={cancelSelectingAnnotationPosition}
                      danger
                    >
                      取消
                    </Button>
                  </Space>
                ) : (
                  <Button
                    type="primary"
                    onClick={handleSelectPosition}
                    block
                    style={{
                      background: '#00d4ff',
                      border: 'none'
                    }}
                    icon={<Tag size={14} />}
                  >
                    🖱️ 在3D场景中点击选择位置
                  </Button>
                )}
              </div>

              <Button
                type="primary"
                block
                onClick={handleAddAnnotation}
                disabled={!newAnnotation.text.trim()}
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #3b82f6 100%)',
                  border: 'none'
                }}
              >
                + 生成标注
              </Button>
            </Space>
          </div>

          {/* 标注列表 */}
          <div style={{
            background: 'rgba(1, 30, 68, 0.6)',
            borderRadius: '8px',
            padding: '12px',
            border: '1px solid rgba(0, 212, 255, 0.15)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '600' }}>
                标注列表 ({annotations.length})
              </span>
            </div>
            
            {annotations.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                color: '#64748b',
                fontSize: '12px'
              }}>
                暂无标注，请创建新标注
              </div>
            ) : (
              <Space direction="vertical" style={{ width: '100%' }} size="small">
                {annotations.map(anno => (
                  <div
                    key={anno.id}
                    style={{
                      background: anno.id === selectedAnnotationId ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0, 212, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '12px',
                      border: anno.id === selectedAnnotationId ? '2px solid #00d4ff' : '1px solid rgba(0, 212, 255, 0.15)',
                      opacity: anno.visible ? 1 : 0.5,
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setSelectedAnnotationId(anno.id === selectedAnnotationId ? null : anno.id)
                    }}
                  >
                    {editingId === anno.id ? (
                      <Space direction="vertical" style={{ width: '100%' }} size="small">
                        <Input
                          value={anno.text}
                          onChange={(e) => handleUpdateAnnotation(anno.id, 'text', e.target.value)}
                          size="small"
                          style={{ background: 'rgba(1, 30, 68, 0.8)' }}
                        />
                        
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                          <Button
                            size="small"
                            type="primary"
                            onClick={() => setEditingId(null)}
                          >
                            完成
                          </Button>
                        </div>
                      </Space>
                    ) : (
                      <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                          {/* 左侧：图标 + 名称 */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: anno.style === 'sphere' ? '50%' : '6px',
                              background: anno.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              {anno.style === 'box' && '📦'}
                              {anno.style === 'sphere' && '🔵'}
                              {anno.style === 'cylinder' && '🟡'}
                              {anno.style === 'cone' && '🔺'}
                            </div>
                            <div style={{ 
                              color: '#e2e8f0', 
                              fontSize: '14px', 
                              fontWeight: '600',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              flex: 1,
                              minWidth: 0
                            }}>
                              {anno.text}
                            </div>
                          </div>
                          {/* 右侧：按钮组 */}
                          <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCameraTarget(anno.position);
                              }}
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '4px',
                                border: 'none',
                                background: 'rgba(0, 212, 255, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                            >
                              <span style={{ fontSize: '14px' }}>📍</span>
                            </button>
                            {/* 移动按钮 - 只在选中标注时显示 */}
                            {anno.id === selectedAnnotationId && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (transformMode === 'translate') {
                                    setTransformMode(null);
                                  } else {
                                    setTransformMode('translate');
                                  }
                                }}
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '4px',
                                  border: transformMode === 'translate' ? '2px solid #00d4ff' : 'none',
                                  background: transformMode === 'translate' ? 'rgba(0, 212, 255, 0.3)' : 'rgba(0, 212, 255, 0.15)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer'
                                }}
                              >
                                <span style={{ fontSize: '14px' }}>↔️</span>
                              </button>
                            )}
                            {/* 旋转按钮 - 只在选中标注时显示 */}
                            {anno.id === selectedAnnotationId && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (transformMode === 'rotate') {
                                    setTransformMode(null);
                                  } else {
                                    setTransformMode('rotate');
                                  }
                                }}
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '4px',
                                  border: transformMode === 'rotate' ? '2px solid #00d4ff' : 'none',
                                  background: transformMode === 'rotate' ? 'rgba(0, 212, 255, 0.3)' : 'rgba(0, 212, 255, 0.15)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer'
                                }}
                              >
                                <span style={{ fontSize: '14px' }}>🔄</span>
                              </button>
                            )}
                            <Button
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleAnnotationVisibility(anno.id);
                              }}
                              style={{
                                borderColor: anno.visible ? '#22c55e' : '#94a3b8',
                                color: anno.visible ? '#22c55e' : '#94a3b8',
                                fontSize: '10px',
                                padding: '2px 6px'
                              }}
                            >
                              {anno.visible ? '显' : '隐'}
                            </Button>
                            <Button
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingId(anno.id);
                              }}
                              style={{
                                fontSize: '10px',
                                padding: '2px 6px'
                              }}
                            >
                              编
                            </Button>
                            <Button
                              size="small"
                              danger
                              onClick={(e) => {
                                e.stopPropagation();
                                removeAnnotation(anno.id);
                              }}
                              style={{
                                fontSize: '10px',
                                padding: '2px 6px'
                              }}
                            >
                              删
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </Space>
            )}
          </div>
        </>
      )}
    </Space>
  )
}

const ServicePanel = () => {
  const { setResourceModalOpen } = useStore()

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div style={{
        background: 'rgba(0, 212, 255, 0.1)',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid rgba(0, 212, 255, 0.2)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>📦</div>
        <h3 style={{ color: '#e2e8f0', margin: '0 0 8px 0', fontSize: '16px' }}>
          资源管理中心
        </h3>
        <p style={{ color: '#64748b', margin: 0, fontSize: '12px' }}>
          管理各类管线、建筑等资源数据
        </p>
        <Button
          type="primary"
          size="large"
          onClick={() => setResourceModalOpen(true)}
          style={{
            marginTop: '16px',
            width: '100%',
            background: 'linear-gradient(135deg, #00d4ff 0%, #3b82f6 100%)',
            border: 'none'
          }}
        >
          打开资源管理
        </Button>
      </div>

      <div style={{
        background: 'rgba(1, 30, 68, 0.6)',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid rgba(0, 212, 255, 0.15)'
      }}>
        <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
          功能说明
        </span>
        <ul style={{
          color: '#64748b',
          fontSize: '11px',
          margin: 0,
          paddingLeft: '16px',
          lineHeight: '1.8'
        }}>
          <li>支持新增各类资源服务</li>
          <li>可上传矢量数据生成管道模型</li>
          <li>资源可显示/隐藏和删除</li>
          <li>管线类型包括水、电、通信、污水等</li>
        </ul>
      </div>
    </Space>
  )
}

const LayerControlPanel = () => {
  const { layers, toggleLayer } = useStore()

  const layerConfig = [
    { key: 'terrain', name: '地形', icon: '🏔️', color: '#22c55e' },
    { key: 'buildings', name: '建筑', icon: '🏢', color: '#00d4ff' },
    { key: 'pipes', name: '管线', icon: '🔌', color: '#f59e0b' },
    { key: 'annotations', name: '标注', icon: '📍', color: '#ec4899' },
    { key: 'plants', name: '绿植', icon: '🌳', color: '#10b981' }
  ]

  return (
    <>
      {layerConfig.map((layer) => (
        <div
          key={layer.key}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>{layer.icon}</span>
            <span style={{
              color: layers[layer.key] ? '#e2e8f0' : '#64748b',
              fontSize: '14px'
            }}>
              {layer.name}
            </span>
          </div>
          <Switch
            checked={layers[layer.key]}
            onChange={() => toggleLayer(layer.key)}
            size="small"
            style={{
              background: layers[layer.key] ? '#00d4ff' : 'rgba(100, 116, 139, 0.3)'
            }}
          />
        </div>
      ))}
    </>
  )
}

const WelcomePanel = () => (
  <div style={{ textAlign: 'center', padding: '30px 20px' }}>
    <div style={{
      width: '80px',
      height: '80px',
      margin: '0 auto 20px',
      background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(0, 212, 255, 0.05) 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid rgba(0, 212, 255, 0.3)'
    }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5">
        <rect x="3" y="11" width="7" height="10" rx="1" />
        <rect x="14" y="7" width="7" height="14" rx="1" />
        <path d="M10 12h3" />
        <path d="M12 7v5" />
      </svg>
    </div>
    <h3 style={{ color: '#e2e8f0', fontSize: '16px', marginBottom: '8px' }}>数字孪生校园平台</h3>
    <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6' }}>
      请从左侧工具栏选择工具开始使用
    </p>
  </div>
)

const RightPanel = () => {
  const { currentTool, selectedModel } = useStore()

  return (
    <>
      <ResourceModal />
      <div style={{
        width: '340px',
        height: 'calc(100vh - 80px)',
        overflowY: 'auto',
        paddingRight: '8px',
        paddingTop: '8px',
        paddingBottom: '8px'
      }}>
        <div className="tech-panel" style={{
          borderRadius: '12px',
          position: 'relative',
          height: '100%',
          overflowY: 'auto',
          background: 'rgba(0, 10, 25, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '20px',
            height: '20px',
            borderTop: '3px solid #00d4ff',
            borderRight: '3px solid #00d4ff',
            borderRadius: '0 8px 0 0',
            zIndex: 10
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '20px',
            height: '20px',
            borderBottom: '3px solid #00d4ff',
            borderLeft: '3px solid #00d4ff',
            borderRadius: '0 0 0 8px',
            zIndex: 10
          }} />

          <div style={{ padding: '20px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedModel && (
              <CollapsiblePanel
                title="属性编辑"
                defaultOpen={true}
                icon={Edit3}
              >
                <PropertyEditPanel />
              </CollapsiblePanel>
            )}

            {currentTool === 'layers' && (
              <CollapsiblePanel
                title="图层管理"
                defaultOpen={true}
                icon={Layers}
              >
                <ModelListPanel />
              </CollapsiblePanel>
            )}

            {currentTool === 'modeling' && (
              <CollapsiblePanel
                title="建模工具"
                defaultOpen={true}
              >
                <ModelingPanel />
              </CollapsiblePanel>
            )}

            {currentTool === 'measure' && (
              <CollapsiblePanel
                title="测量工具"
                defaultOpen={true}
                icon={Ruler}
              >
                <MeasurePanel />
              </CollapsiblePanel>
            )}

            {currentTool === 'pipes' && (
              <CollapsiblePanel
                title="管线管理"
                defaultOpen={true}
              >
                <PipePanel />
              </CollapsiblePanel>
            )}

            {currentTool === 'annotation' && (
              <CollapsiblePanel
                title="标注管理"
                defaultOpen={true}
                icon={Tag}
              >
                <AnnotationPanel />
              </CollapsiblePanel>
            )}

            {currentTool === 'analysis' && (
              <CollapsiblePanel
                title="分析工具"
                defaultOpen={true}
              >
                <AnalysisPanel />
              </CollapsiblePanel>
            )}

            {currentTool === 'services' && (
              <CollapsiblePanel
                title="资源管理"
                defaultOpen={true}
              >
                <ServicePanel />
              </CollapsiblePanel>
            )}

            {currentTool === 'select' && (
              <CollapsiblePanel
                title="模型列表"
                defaultOpen={true}
              >
                <ModelListPanel />
              </CollapsiblePanel>
            )}

            {!currentTool && !selectedModel && (
              <WelcomePanel />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default RightPanel
