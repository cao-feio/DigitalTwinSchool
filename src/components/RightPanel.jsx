import React, { useState, useEffect } from 'react'
import { Switch, Slider, Input, Button, Space, Divider, InputNumber, Select } from 'antd'
import { useStore } from '../store/useStore'
import { defaultBuildingData } from './Buildings'
import { defaultPipeData } from './Pipes'
import { ChevronDown, ChevronUp, Eye, EyeOff, Locate, Edit3, PlayCircle, Trash2, Tag, Layers, Ruler } from 'lucide-react'
import SimpleTexturePanel from './SimpleTexture'

const CollapsiblePanel = ({ title, children, defaultOpen = true, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div style={{
      marginBottom: '16px',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid rgba(100, 150, 200, 0.2)',
      background: 'rgba(20, 30, 48, 0.9)',
      flex: 1
    }}>
      <div style={{
        padding: '12px 14px',
        background: 'rgba(100, 150, 200, 0.1)',
        borderBottom: isOpen ? '1px solid rgba(100, 150, 200, 0.2)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }} onClick={() => setIsOpen(!isOpen)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {Icon && <Icon size={18} color="#1890ff" />}
          <span style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#e6f2ff'
          }}>{title}</span>
        </div>
        {isOpen ? 
          <ChevronUp size={16} color="#1890ff" /> : 
          <ChevronDown size={16} color="#a0b8cc" />
        }
      </div>
      {isOpen && (
        <div style={{ padding: '14px', minHeight: '100px' }}>
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
        padding: '10px 12px',
        marginBottom: '8px',
        background: isSelected ? 
          'rgba(24, 144, 255, 0.2)' : 
          'rgba(40, 55, 75, 0.6)',
        border: `1px solid ${isSelected ? '#1890ff' : 'rgba(100, 150, 200, 0.15)'}`,
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onClick={() => onSelect(model)}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isSelected ? 
          'rgba(24, 144, 255, 0.25)' : 
          'rgba(24, 144, 255, 0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isSelected ? 
          'rgba(24, 144, 255, 0.2)' : 
          'rgba(40, 55, 75, 0.6)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          <span style={{ fontSize: '22px' }}>
            {getTypeIcon(model.type)}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: isSelected ? '#1890ff' : '#e6f2ff',
              marginBottom: '2px'
            }}>
              {model.name}
            </div>
            <div style={{ fontSize: '11px', color: '#a0b8cc' }}>
              {model.floors}层 | {model.area}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '4px',
              border: 'none',
              background: 'rgba(24, 144, 255, 0.15)',
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
              e.currentTarget.style.background = 'rgba(24, 144, 255, 0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(24, 144, 255, 0.15)'
            }}
          >
            <Locate size={14} color="#1890ff" />
          </button>
          <button
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '4px',
              border: 'none',
              background: isVisible ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
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
          >
            {isVisible ? 
              <Eye size={14} color="#22c55e" /> : 
              <EyeOff size={14} color="#ef4444" />
            }
          </button>
        </div>
      </div>
    </div>
  )
}

const ModelListPanel = () => {
  const { selectedModel, setSelectedModel, modelVisibility, toggleModelVisibility, models } = useStore()
  const [openGroups, setOpenGroups] = React.useState({
    default: true,
    custom: true
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

  const defaultModels = models.filter(m => !m.isCustom)
  const customModels = models.filter(m => m.isCustom)

  return (
    <>
      <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '4px' }}>
        {/* 预设建筑分组 */}
        <div style={{ marginBottom: '12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              background: 'rgba(100, 150, 200, 0.1)',
              borderRadius: '6px',
              border: '1px solid rgba(100, 150, 200, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginBottom: '6px'
            }}
            onClick={() => toggleGroup('default')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>🏛️</span>
              <span style={{ color: '#e6f2ff', fontWeight: '600', fontSize: '13px' }}>
                预设建筑
              </span>
              <span style={{ 
                color: '#1890ff', 
                fontSize: '11px', 
                fontWeight: '600',
                background: 'rgba(24, 144, 255, 0.15)',
                padding: '2px 6px',
                borderRadius: '8px'
              }}>
                {defaultModels.length}
              </span>
            </div>
            <span style={{ color: '#1890ff' }}>
              {openGroups.default ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </span>
          </div>
          
          {openGroups.default && (
            <div style={{ paddingLeft: '8px' }}>
              {defaultModels.map((model) => (
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

        {/* 自定义建筑分组 */}
        {customModels.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '6px',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '6px'
              }}
              onClick={() => toggleGroup('custom')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🏗️</span>
                <span style={{ color: '#e6f2ff', fontWeight: '600', fontSize: '13px' }}>
                  自定义建筑
                </span>
                <span style={{ 
                  color: '#a855f7', 
                  fontSize: '11px', 
                  fontWeight: '600',
                  background: 'rgba(139, 92, 246, 0.15)',
                  padding: '2px 6px',
                  borderRadius: '8px'
                }}>
                  {customModels.length}
                </span>
              </div>
              <span style={{ color: '#a855f7' }}>
                {openGroups.custom ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </span>
            </div>
            
            {openGroups.custom && (
              <div style={{ paddingLeft: '8px' }}>
                {customModels.map((model) => (
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
        )}
      </div>
    </>
  )
}

const PropertyEditPanel = () => {
  const { selectedModel, updateModel, transformMode, setTransformMode } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [localModel, setLocalModel] = useState(null)

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
        color: '#a0b8cc'
      }}>
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>🏗️</div>
        <p style={{ fontSize: '13px' }}>点击场景中的模型查看和编辑属性</p>
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
        background: 'rgba(40, 55, 75, 0.6)',
        borderRadius: '6px',
        padding: '12px',
        border: '1px solid rgba(100, 150, 200, 0.15)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Edit3 size={14} color="#1890ff" />
            <span style={{ color: '#e6f2ff', fontSize: '13px', fontWeight: '600' }}>基本信息</span>
          </div>
          <Button
            size="small"
            type={isEditing ? "primary" : "default"}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? '保存' : '编辑'}
          </Button>
        </div>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <div>
            <label style={{ color: '#a0b8cc', fontSize: '12px', display: 'block', marginBottom: '4px' }}>建筑名称</label>
            {isEditing ? (
              <Input
                value={localModel.name}
                onChange={(e) => setLocalModel({ ...localModel, name: e.target.value })}
              />
            ) : <div style={{ color: '#e6f2ff', fontSize: '13px' }}>{localModel.name}</div>}
          </div>
          <div>
            <label style={{ color: '#a0b8cc', fontSize: '12px', display: 'block', marginBottom: '4px' }}>描述</label>
            {isEditing ? (
              <Input.TextArea
                value={localModel.description || ''}
                onChange={(e) => setLocalModel({ ...localModel, description: e.target.value })}
                rows={3}
              />
            ) : <div style={{ color: '#a0b8cc', fontSize: '12px' }}>{localModel.description}</div>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
            <div>
              <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>建筑类型</label>
              {isEditing ? (
                <Select
                  value={localModel.type}
                  onChange={(value) => setLocalModel({ ...localModel, type: value })}
                  style={{ width: '100%' }}
                  options={buildingTypeOptions}
                />
              ) : (
                <div style={{ color: '#1890ff', fontSize: '13px', fontWeight: '600', marginTop: '2px' }}>
                  {getBuildingTypeName(localModel.type)}
                </div>
              )}
            </div>
            <div>
              <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>楼层数</label>
              {isEditing ? (
                <InputNumber
                  value={localModel.floors}
                  onChange={(value) => setLocalModel({ ...localModel, floors: value })}
                  min={1}
                  style={{ width: '100%' }}
                  suffix="层"
                />
              ) : (
                <div style={{ color: '#52c41a', fontSize: '13px', fontWeight: '600', marginTop: '2px' }}>
                  {localModel.floors} 层
                </div>
              )}
            </div>
            <div>
              <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>建筑面积</label>
              {isEditing ? (
                <Input
                  value={localModel.area}
                  onChange={(e) => setLocalModel({ ...localModel, area: e.target.value })}
                />
              ) : (
                <div style={{ color: '#faad14', fontSize: '13px', fontWeight: '600', marginTop: '2px' }}>
                  {localModel.area}
                </div>
              )}
            </div>
            <div>
              <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>建成年份</label>
              {isEditing ? (
                <InputNumber
                  value={localModel.builtYear}
                  onChange={(value) => setLocalModel({ ...localModel, builtYear: value })}
                  min={1900}
                  max={2100}
                  style={{ width: '100%' }}
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
        background: 'rgba(40, 55, 75, 0.6)',
        borderRadius: '6px',
        padding: '12px',
        border: '1px solid rgba(100, 150, 200, 0.15)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#e6f2ff', fontSize: '13px', fontWeight: '600' }}>变换控制</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <Button 
              size="small"
              type={transformMode === 'translate' ? 'primary' : 'default'}
              onClick={() => setTransformMode(transformMode === 'translate' ? null : 'translate')}
            >
              移动
            </Button>
            <Button 
              size="small"
              type={transformMode === 'rotate' ? 'primary' : 'default'}
              onClick={() => setTransformMode(transformMode === 'rotate' ? null : 'rotate')}
            >
              旋转
            </Button>
          </div>
        </div>
        
        {transformMode && (
          <div style={{ 
            color: '#1890ff', 
            fontSize: '11px', 
            marginTop: '10px',
            padding: '8px', 
            background: 'rgba(24, 144, 255, 0.1)', 
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
    { id: 'length', label: '距离测量', icon: '📏', color: '#52c41a' },
    { id: 'area', label: '面积测量', icon: '📐', color: '#faad14' },
    { id: 'height', label: '高度测量', icon: '📊', color: '#1890ff' },
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
        color: '#52c41a' 
      }
    }
    switch (m.type) {
      case 'length': return { label: '距离', value: m.distance ? `${m.distance.toFixed(2)}m` : '0m', color: '#52c41a' }
      case 'area': return { label: '面积', value: m.area ? `${m.area.toFixed(2)}㎡` : '0㎡', color: '#faad14' }
      case 'height': return { label: '高度', value: m.height ? `${m.height.toFixed(2)}m` : '0m', color: '#1890ff' }
      case 'angle': return { label: '角度', value: m.angle ? `${m.angle.toFixed(1)}°` : '0°', color: '#a855f7' }
      default: return { label: m.type, value: '', color: '#a0b8cc' }
    }
  }

  const requiredPoints = {
        length: '∞',
        height: 1,
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
              border: measurementMode === id ? `1px solid ${color}` : '1px solid rgba(100, 150, 200, 0.2)',
              borderRadius: '6px',
              height: '40px',
              color: measurementMode === id ? color : '#1890ff'
            }}
          >
            <span style={{ marginRight: '6px' }}>{icon}</span>
            {label}
          </Button>
        ))}
      </div>

      {measurementMode && (
        <div style={{
          background: 'rgba(24, 144, 255, 0.1)',
          padding: '12px',
          borderRadius: '6px',
          border: '1px solid rgba(24, 144, 255, 0.2)'
        }}>
          <div style={{ color: '#e6f2ff', fontSize: '13px', marginBottom: '8px' }}>
            已选点: {measurementPoints.length} / {requiredPoints[measurementMode]}
            {measurementMode === 'length' && measurementPoints.length >= 2 && (
              <span style={{ color: '#52c41a', marginLeft: '8px' }}>
                (当前总长: {calculateTotalDistance(measurementPoints).toFixed(2)}m)
              </span>
            )}
          </div>
          <div style={{ color: '#a0b8cc', fontSize: '11px', marginBottom: '10px' }}>
          {measurementMode === 'length' && '点击地面选择任意多个点测量距离，双击结束测量'}
          {measurementMode === 'height' && '点击任意一点（地面或模型表面）测量到地面的垂直高度'}
          {measurementMode === 'area' && '点击3个或更多点测量多边形面积'}
          {measurementMode === 'angle' && '点击三个点（顶点在中间）测量角度'}
        </div>
          {measurementMode === 'length' && measurementPoints.length >= 2 && (
            <Button
              type="primary"
              block
              onClick={finishCurrentMeasurement}
            >
              完成测量
            </Button>
          )}
        </div>
      )}

      {measurements.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: '#e6f2ff', fontSize: '13px', fontWeight: '600' }}>
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
                  background: 'rgba(40, 55, 75, 0.5)',
                  padding: '10px',
                  borderRadius: '4px',
                  marginBottom: '6px',
                  border: '1px solid rgba(100, 150, 200, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ color: '#a0b8cc', fontSize: '12px' }}>
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

  const colorOptions = [
    '#e8e8e8', '#a0b0c0', '#8090a0', '#d0a080', 
    '#60a0c0', '#80c0a0', '#a080c0', '#c08080',
    '#5070a0', '#609070', '#906070', '#a09060'
  ]

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div style={{
        background: 'rgba(24, 144, 255, 0.1)',
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid rgba(24, 144, 255, 0.2)'
      }}>
        <div style={{ color: '#e6f2ff', fontSize: '13px', marginBottom: '8px', fontWeight: '600' }}>
          地面范围框选绘制
        </div>
        <div style={{ color: '#a0b8cc', fontSize: '11px', marginBottom: '6px' }}>
          点击地面添加多边形顶点，支持任意封闭形状
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#1890ff', fontSize: '12px', fontWeight: '600' }}>
            已选顶点: {buildingPoints.length}
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {buildingPoints.length > 0 && (
              <Button
                size="small"
                onClick={undoBuildingPoint}
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
          <label style={{ color: '#e6f2ff', fontSize: '13px', fontWeight: '600' }}>
            模型高度
          </label>
          <Input
            type="number"
            value={buildingHeight}
            onChange={(e) => setBuildingHeight(parseFloat(e.target.value) || 1)}
            min={1}
            max={200}
            style={{ width: '70px' }}
          />
        </div>
        <Slider
          min={1}
          max={200}
          value={buildingHeight}
          onChange={setBuildingHeight}
        />
      </div>

      <SimpleTexturePanel />

      <div>
        <label style={{ color: '#e6f2ff', fontSize: '13px', display: 'block', marginBottom: '8px', fontWeight: '600' }}>
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
                border: buildingColor === c ? '3px solid #1890ff' : '2px solid transparent',
                background: c,
                cursor: 'pointer',
                transition: 'all 0.2s'
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
        >
          生成三维模型
        </Button>
      )}

      {models.filter(m => m.isCustom).length > 0 && (
        <div style={{
          background: 'rgba(40, 55, 75, 0.6)',
          padding: '12px',
          borderRadius: '4px',
          border: '1px solid rgba(100, 150, 200, 0.2)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ color: '#e6f2ff', fontSize: '13px', fontWeight: '600' }}>
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
                ? 'rgba(24, 144, 255, 0.2)' 
                : 'rgba(24, 144, 255, 0.05)',
              borderRadius: '4px',
              border: selectedModel?.id === model.id 
                ? '1px solid rgba(24, 144, 255, 0.5)' 
                : '1px solid rgba(100, 150, 200, 0.1)'
            }}>
              <div>
                <div style={{ color: '#e6f2ff', fontSize: '12px' }}>{model.name}</div>
                <div style={{ color: '#a0b8cc', fontSize: '10px' }}>
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

const PipeListItem = ({ pipe, isSelected, isVisible, onSelect, onToggleVisibility, onLocate }) => {
  const getPipeTypeIcon = (type) => {
    const icons = {
      water: '💧',
      drain: '🚰',
      power: '⚡',
      gas: '🔥',
      heat: '🌡️',
      communication: '📡'
    }
    return icons[type] || '🔧'
  }

  const getPipeTypeName = (type) => {
    const names = {
      water: '给水管道',
      drain: '排水管道',
      power: '电力管线',
      gas: '燃气管线',
      heat: '热力管线',
      communication: '通信管线'
    }
    return names[type] || '管线'
  }

  return (
    <div
      style={{
        padding: '10px 12px',
        marginBottom: '8px',
        background: isSelected ? 
          'rgba(24, 144, 255, 0.2)' : 
          'rgba(40, 55, 75, 0.6)',
        border: `1px solid ${isSelected ? '#1890ff' : 'rgba(100, 150, 200, 0.15)'}`,
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onClick={() => onSelect(pipe)}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isSelected ? 
          'rgba(24, 144, 255, 0.25)' : 
          'rgba(24, 144, 255, 0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isSelected ? 
          'rgba(24, 144, 255, 0.2)' : 
          'rgba(40, 55, 75, 0.6)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          <span style={{ fontSize: '22px' }}>
            {getPipeTypeIcon(pipe.pipeType)}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: isSelected ? '#1890ff' : '#e6f2ff',
              marginBottom: '2px'
            }}>
              {pipe.name}
            </div>
            <div style={{ fontSize: '11px', color: '#a0b8cc' }}>
              {getPipeTypeName(pipe.pipeType)} | {pipe.diameterMm}mm
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '4px',
              border: 'none',
              background: 'rgba(24, 144, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={(e) => {
              e.stopPropagation()
              onLocate(pipe)
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(24, 144, 255, 0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(24, 144, 255, 0.15)'
            }}
          >
            <Locate size={14} color="#1890ff" />
          </button>
          <button
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '4px',
              border: 'none',
              background: isVisible ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={(e) => {
              e.stopPropagation()
              onToggleVisibility(pipe.id)
            }}
          >
            {isVisible ? 
              <Eye size={14} color="#22c55e" /> : 
              <EyeOff size={14} color="#ef4444" />
            }
          </button>
        </div>
      </div>
    </div>
  )
}

const PipeListPanel = () => {
  const { selectedPipe, setSelectedPipe, modelVisibility, toggleModelVisibility, setHasSelectedPipe, setCurrentTool, layers, toggleLayer } = useStore()
  const [openGroups, setOpenGroups] = React.useState({
    water: true,
    drain: true,
    power: true,
    gas: true,
    heat: true,
    communication: true
  })
  const listContainerRef = React.useRef(null)
  const selectedItemRef = React.useRef(null)

  const handleSelectPipe = (pipe) => {
    // 确保管线图层开启
    if (!layers.pipes) {
      toggleLayer('pipes')
    }
    setCurrentTool('pipes')
    setHasSelectedPipe(true)
    
    if (selectedPipe?.id === pipe.id) {
      setSelectedPipe(null)
      setHasSelectedPipe(false)
    } else {
      setSelectedPipe(pipe)
    }
  }

  const handleLocate = (pipe) => {
    handleSelectPipe(pipe)
  }

  const toggleGroup = (groupType) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupType]: !prev[groupType]
    }))
  }

  const groupPipesByType = () => {
    const groups = {}
    defaultPipeData.forEach(pipe => {
      if (!groups[pipe.pipeType]) {
        groups[pipe.pipeType] = []
      }
      groups[pipe.pipeType].push(pipe)
    })
    return groups
  }

  const pipeGroups = groupPipesByType()

  const getPipeTypeLabel = (type) => {
    const labels = {
      water: '给水管网',
      drain: '排水管网',
      power: '电力管网',
      gas: '燃气管网',
      heat: '热力管网',
      communication: '通信管网'
    }
    return labels[type] || type
  }

  const getPipeTypeIcon = (type) => {
    const icons = {
      water: '💧',
      drain: '🚰',
      power: '⚡',
      gas: '🔥',
      heat: '🌡️',
      communication: '📡'
    }
    return icons[type] || '🔧'
  }

  // 当选中管线变化时，自动滚动到对应项
  React.useEffect(() => {
    if (selectedPipe && selectedItemRef.current && listContainerRef.current) {
      // 确保该管线的分组是展开的
      setOpenGroups(prev => ({
        ...prev,
        [selectedPipe.pipeType]: true
      }))
      
      // 等待 DOM 更新后滚动
      setTimeout(() => {
        if (selectedItemRef.current && listContainerRef.current) {
          selectedItemRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          })
        }
      }, 100)
    }
  }, [selectedPipe])

  return (
    <>
      <div 
        ref={listContainerRef} 
        style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '4px' }}
      >
        {Object.keys(pipeGroups).map(type => (
          <div key={type} style={{ marginBottom: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                background: 'rgba(100, 150, 200, 0.1)',
                borderRadius: '6px',
                border: '1px solid rgba(100, 150, 200, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '6px'
              }}
              onClick={() => toggleGroup(type)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>{getPipeTypeIcon(type)}</span>
                <span style={{ color: '#e6f2ff', fontWeight: '600', fontSize: '13px' }}>
                  {getPipeTypeLabel(type)}
                </span>
                <span style={{ 
                  color: '#1890ff', 
                  fontSize: '11px', 
                  fontWeight: '600',
                  background: 'rgba(24, 144, 255, 0.15)',
                  padding: '2px 6px',
                  borderRadius: '8px'
                }}>
                  {pipeGroups[type].length}
                </span>
              </div>
              <span style={{ color: '#1890ff' }}>
                {openGroups[type] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </span>
            </div>
            
            {openGroups[type] && (
              <div style={{ paddingLeft: '8px' }}>
          {pipeGroups[type].map((pipe) => (
            <div 
              key={pipe.id}
              ref={selectedPipe?.id === pipe.id ? selectedItemRef : null}
            >
              <PipeListItem
                pipe={pipe}
                isSelected={selectedPipe?.id === pipe.id}
                isVisible={modelVisibility[pipe.id] !== false}
                onSelect={handleSelectPipe}
                onToggleVisibility={toggleModelVisibility}
                onLocate={handleLocate}
              />
            </div>
          ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

const PipePropertyPanel = () => {
  const { selectedPipe, setSelectedPipe } = useStore()

  // 计算管线长度
  const calculatePipeLength = (path) => {
    if (!path || path.length < 2) return 0
    let totalLength = 0
    for (let i = 1; i < path.length; i++) {
      const [x1, y1, z1] = path[i - 1]
      const [x2, y2, z2] = path[i]
      const dx = x2 - x1
      const dy = y2 - y1
      const dz = z2 - z1
      totalLength += Math.sqrt(dx * dx + dy * dy + dz * dz)
    }
    return totalLength
  }

  if (!selectedPipe) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '30px 20px',
        color: '#a0b8cc'
      }}>
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>🔧</div>
        <p style={{ fontSize: '13px' }}>点击场景中的管线或列表查看详细信息</p>
      </div>
    )
  }

  const getPipeTypeName = (type) => {
    const names = {
      water: '给水管道',
      drain: '排水管道',
      power: '电力管线',
      gas: '燃气管线',
      heat: '热力管线',
      communication: '通信管线'
    }
    return names[type] || '管线'
  }

  const getPipeTypeIcon = (type) => {
    const icons = {
      water: '💧',
      drain: '🚰',
      power: '⚡',
      gas: '🔥',
      heat: '🌡️',
      communication: '📡'
    }
    return icons[type] || '🔧'
  }

  const pipeLength = selectedPipe.length || calculatePipeLength(selectedPipe.path)

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div style={{
        background: 'rgba(40, 55, 75, 0.6)',
        borderRadius: '6px',
        padding: '12px',
        border: '1px solid rgba(100, 150, 200, 0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span style={{ fontSize: '32px' }}>{getPipeTypeIcon(selectedPipe.pipeType)}</span>
          <div>
            <div style={{ color: '#e6f2ff', fontSize: '14px', fontWeight: '600' }}>
              {selectedPipe.name}
            </div>
            <div style={{ color: '#a0b8cc', fontSize: '11px' }}>
              {getPipeTypeName(selectedPipe.pipeType)}
            </div>
          </div>
        </div>
        
        <div style={{ fontSize: '12px', color: '#a0b8cc', lineHeight: '1.6' }}>
          {selectedPipe.description}
        </div>
      </div>

      <div style={{
        background: 'rgba(40, 55, 75, 0.6)',
        borderRadius: '6px',
        padding: '12px',
        border: '1px solid rgba(100, 150, 200, 0.15)'
      }}>
        <div style={{ color: '#e6f2ff', fontSize: '13px', fontWeight: '600', marginBottom: '12px' }}>
          基本参数
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>管道材质</label>
            <div style={{ color: '#1890ff', fontSize: '13px', fontWeight: '600' }}>
              {selectedPipe.material}
            </div>
          </div>
          <div>
            <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>管道直径</label>
            <div style={{ color: '#52c41a', fontSize: '13px', fontWeight: '600' }}>
              {selectedPipe.diameterMm} mm
            </div>
          </div>
          <div>
            <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>埋设深度</label>
            <div style={{ color: '#faad14', fontSize: '13px', fontWeight: '600' }}>
              {selectedPipe.depth} m
            </div>
          </div>
          <div>
            <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>管道长度</label>
            <div style={{ color: '#a855f7', fontSize: '13px', fontWeight: '600' }}>
              {pipeLength.toFixed(2)} 米
            </div>
          </div>
        </div>
      </div>
    </Space>
  )
}

// Annotation panel with location support
const AnalysisPanel = () => {
  const {
    analysisMode,
    setAnalysisMode,
    analysisViewpoint,
    setAnalysisViewpoint,
    sunPosition,
    setSunPosition,
    clearAnalysisResults
  } = useStore()

  const analysisOptions = [
    { id: 'viewshed', label: '可视化范围分析', icon: '👁️' },
    { id: 'sunlight', label: '日照分析', icon: '☀️' }
  ]

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      {/* 分析模式选择 */}
      <div style={{
        background: 'rgba(20, 30, 48, 0.95)',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid rgba(100, 150, 200, 0.2)'
      }}>
        <div style={{ color: '#e6f2ff', fontSize: '13px', fontWeight: '600', marginBottom: '12px' }}>
          分析工具
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {analysisOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setAnalysisMode(analysisMode === option.id ? null : option.id)}
              style={{
                padding: '10px 12px',
                background: analysisMode === option.id 
                  ? 'rgba(24, 144, 255, 0.2)' 
                  : 'rgba(40, 55, 75, 0.6)',
                border: analysisMode === option.id 
                  ? '1px solid #1890ff' 
                  : '1px solid rgba(100, 150, 200, 0.3)',
                borderRadius: '6px',
                color: analysisMode === option.id ? '#1890ff' : '#a0b8cc',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ fontSize: '18px' }}>{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 可视化范围分析设置 */}
      {analysisMode === 'viewshed' && (
        <div style={{
          background: 'rgba(20, 30, 48, 0.95)',
          borderRadius: '8px',
          padding: '12px',
          border: '1px solid rgba(100, 150, 200, 0.2)'
        }}>
          <div style={{ color: '#e6f2ff', fontSize: '13px', fontWeight: '600', marginBottom: '12px' }}>
            可视化范围分析设置
          </div>
          <div style={{ color: '#a0b8cc', fontSize: '11px', marginBottom: '12px' }}>
            点击地面选择观察点，系统将显示从该点的可见范围
          </div>
          {analysisViewpoint && (
            <div style={{
              padding: '8px',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '4px',
              marginBottom: '12px',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              <div style={{ color: '#3b82f6', fontSize: '12px' }}>
                ✓ 已设置观察点
              </div>
              <div style={{ color: '#a0b8cc', fontSize: '10px', marginTop: '4px' }}>
                位置: [{analysisViewpoint[0].toFixed(1)}, {analysisViewpoint[1].toFixed(1)}, {analysisViewpoint[2].toFixed(1)}]
              </div>
            </div>
          )}
        </div>
      )}

      {/* 日照分析设置 */}
      {analysisMode === 'sunlight' && (
        <div style={{
          background: 'rgba(20, 30, 48, 0.95)',
          borderRadius: '8px',
          padding: '12px',
          border: '1px solid rgba(100, 150, 200, 0.2)'
        }}>
          <div style={{ color: '#e6f2ff', fontSize: '13px', fontWeight: '600', marginBottom: '12px' }}>
            日照分析设置
          </div>
          
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <div>
              <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>
                方位角: {sunPosition.azimuth}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                step="5"
                value={sunPosition.azimuth}
                onChange={(e) => setSunPosition({ ...sunPosition, azimuth: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#666', marginTop: '2px' }}>
                <span>0°</span>
                <span>180°</span>
                <span>360°</span>
              </div>
            </div>

            <div>
              <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>
                高度角: {sunPosition.altitude}°
              </label>
              <input
                type="range"
                min="0"
                max="90"
                step="5"
                value={sunPosition.altitude}
                onChange={(e) => setSunPosition({ ...sunPosition, altitude: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#666', marginTop: '2px' }}>
                <span>0°</span>
                <span>45°</span>
                <span>90°</span>
              </div>
            </div>

            <div style={{ color: '#a0b8cc', fontSize: '11px', marginTop: '8px' }}>
              点击地面选择分析点，查看该点的日照情况
            </div>
          </Space>
        </div>
      )}

      {/* 清除按钮 */}
      {analysisMode && (
        <button
          onClick={clearAnalysisResults}
          style={{
            width: '100%',
            padding: '10px',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '6px',
            color: '#ef4444',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          清除分析
        </button>
      )}
    </Space>
  )
}

const AnnotationPanel = () => {
  const {
    annotations,
    selectedAnnotationId,
    setSelectedAnnotationId,
    addAnnotation,
    removeAnnotation,
    updateAnnotation,
    toggleAnnotationVisibility,
    isSelectingAnnotationPosition,
    tempAnnotationPosition,
    newAnnotation,
    updateNewAnnotation,
    startSelectingAnnotationPosition,
    cancelSelectingAnnotationPosition,
    transformMode,
    setTransformMode
  } = useStore()

  const handleCreateAnnotation = () => {
    if (tempAnnotationPosition && newAnnotation.text) {
      const annotation = {
        id: `anno-${Date.now()}`,
        text: newAnnotation.text,
        position: tempAnnotationPosition,
        style: newAnnotation.style,
        color: newAnnotation.color,
        visible: true,
        size: newAnnotation.size,
        rotation: [0, 0, 0]
      }
      addAnnotation(annotation)
      cancelSelectingAnnotationPosition()
      setSelectedAnnotationId(annotation.id)
      updateNewAnnotation({ text: '', position: [0, 5, 0], style: 'box', color: '#00d4ff', size: 1 })
    }
  }

  const selectedAnnotation = annotations.find(a => a.id === selectedAnnotationId)

  const styleOptions = ['box', 'sphere', 'cylinder', 'cone']
  const styleLabels = { box: '方形', sphere: '球形', cylinder: '圆柱', cone: '锥形' }
  const colorOptions = ['#00d4ff', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#ec4899']

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      {/* 新建标注 */}
      <div style={{
        background: 'rgba(40, 55, 75, 0.6)',
        borderRadius: '6px',
        padding: '12px',
        border: '1px solid rgba(100, 150, 200, 0.15)'
      }}>
        <div style={{ color: '#e6f2ff', fontSize: '13px', fontWeight: '600', marginBottom: '12px' }}>
          新建标注
        </div>
        
        {!isSelectingAnnotationPosition ? (
          <button
            onClick={startSelectingAnnotationPosition}
            style={{
              width: '100%',
              padding: '10px',
              background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
          >
            选择标注位置
          </button>
        ) : (
          <Space direction="vertical" style={{ width: '100%' }} size="small">
            <div style={{ color: '#00d4ff', fontSize: '12px', textAlign: 'center', padding: '8px', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '4px' }}>
              点击地面选择位置
            </div>
            
            {tempAnnotationPosition && (
              <>
                <div>
                  <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>标注文字</label>
                  <input
                    type="text"
                    value={newAnnotation.text}
                    onChange={(e) => updateNewAnnotation({ text: e.target.value })}
                    placeholder="输入标注内容"
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: 'rgba(40, 55, 75, 0.8)',
                      border: '1px solid rgba(100, 150, 200, 0.3)',
                      borderRadius: '4px',
                      color: '#e6f2ff',
                      fontSize: '12px'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>标注形状</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {styleOptions.map(style => (
                      <button
                        key={style}
                        onClick={() => updateNewAnnotation({ style })}
                        style={{
                          padding: '6px 12px',
                          background: newAnnotation.style === style ? 'rgba(0, 212, 255, 0.2)' : 'rgba(40, 55, 75, 0.6)',
                          border: `1px solid ${newAnnotation.style === style ? '#00d4ff' : 'rgba(100, 150, 200, 0.3)'}`,
                          borderRadius: '4px',
                          color: newAnnotation.style === style ? '#00d4ff' : '#a0b8cc',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        {styleLabels[style]}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>标注颜色</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {colorOptions.map(color => (
                      <button
                        key={color}
                        onClick={() => updateNewAnnotation({ color })}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: color,
                          border: newAnnotation.color === color ? '2px solid #ffffff' : '2px solid transparent',
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={cancelSelectingAnnotationPosition}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'rgba(100, 150, 200, 0.2)',
                      color: '#a0b8cc',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}
                  >
                    取消
                  </button>
                  <button
                    onClick={handleCreateAnnotation}
                    disabled={!newAnnotation.text}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: newAnnotation.text ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'rgba(100, 150, 200, 0.2)',
                      color: newAnnotation.text ? '#ffffff' : '#666666',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: newAnnotation.text ? 'pointer' : 'not-allowed',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}
                  >
                    创建标注
                  </button>
                </div>
              </>
            )}
          </Space>
        )}
      </div>

      {/* 标注列表 */}
      <div style={{
        background: 'rgba(40, 55, 75, 0.6)',
        borderRadius: '6px',
        padding: '12px',
        border: '1px solid rgba(100, 150, 200, 0.15)'
      }}>
        <div style={{ color: '#e6f2ff', fontSize: '13px', fontWeight: '600', marginBottom: '12px' }}>
          标注列表 ({annotations.length})
        </div>
        
        <div style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '4px' }}>
          {annotations.map(annotation => (
            <div
              key={annotation.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                background: selectedAnnotationId === annotation.id ? 'rgba(0, 212, 255, 0.15)' : 'rgba(40, 55, 75, 0.4)',
                border: selectedAnnotationId === annotation.id ? '1px solid #00d4ff' : '1px solid transparent',
                borderRadius: '6px',
                marginBottom: '8px',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedAnnotationId(selectedAnnotationId === annotation.id ? null : annotation.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  background: annotation.color,
                  opacity: annotation.visible ? 1 : 0.3
                }} />
                <span style={{ color: '#e6f2ff', fontSize: '13px' }}>
                  {annotation.text}
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedAnnotationId(annotation.id)
                  }}
                  style={{
                    padding: '4px 8px',
                    background: 'transparent',
                    border: 'none',
                    color: '#00d4ff',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  📍
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleAnnotationVisibility(annotation.id)
                  }}
                  style={{
                    padding: '4px 8px',
                    background: 'transparent',
                    border: 'none',
                    color: '#a0b8cc',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  {annotation.visible ? '👁️' : '👁️‍🗨️'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeAnnotation(annotation.id)
                    if (selectedAnnotationId === annotation.id) {
                      setSelectedAnnotationId(null)
                    }
                  }}
                  style={{
                    padding: '4px 8px',
                    background: 'transparent',
                    border: 'none',
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
          
          {annotations.length === 0 && (
            <div style={{ textAlign: 'center', color: '#a0b8cc', fontSize: '12px', padding: '20px' }}>
              暂无标注
            </div>
          )}
        </div>
      </div>

      {/* 选中标注的编辑 */}
      {selectedAnnotation && (
        <div style={{
          background: 'rgba(40, 55, 75, 0.6)',
          borderRadius: '6px',
          padding: '12px',
          border: '1px solid rgba(100, 150, 200, 0.15)'
        }}>
          <div style={{ color: '#e6f2ff', fontSize: '13px', fontWeight: '600', marginBottom: '12px' }}>
            编辑标注
          </div>
          
          <Space direction="vertical" style={{ width: '100%' }} size="small">
            <div>
              <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>标注文字</label>
              <input
                type="text"
                value={selectedAnnotation.text}
                onChange={(e) => updateAnnotation(selectedAnnotation.id, { text: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  background: 'rgba(40, 55, 75, 0.8)',
                  border: '1px solid rgba(100, 150, 200, 0.3)',
                  borderRadius: '4px',
                  color: '#e6f2ff',
                  fontSize: '12px'
                }}
              />
            </div>
            
            <div>
              <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>变换控制</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { id: 'translate', label: '移动', icon: '↔️' },
                  { id: 'rotate', label: '旋转', icon: '🔄' },
                  { id: 'scale', label: '缩放', icon: '📏' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setTransformMode(transformMode === mode.id ? null : mode.id)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: transformMode === mode.id ? 'rgba(0, 212, 255, 0.2)' : 'rgba(40, 55, 75, 0.6)',
                      border: `1px solid ${transformMode === mode.id ? '#00d4ff' : 'rgba(100, 150, 200, 0.3)'}`,
                      borderRadius: '4px',
                      color: transformMode === mode.id ? '#00d4ff' : '#a0b8cc',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px'
                    }}
                  >
                    <span>{mode.icon}</span>
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>
              {transformMode && (
                <button
                  onClick={() => setTransformMode(null)}
                  style={{
                    width: '100%',
                    marginTop: '8px',
                    padding: '8px',
                    background: 'rgba(100, 150, 200, 0.2)',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#a0b8cc',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  退出变换模式
                </button>
              )}
            </div>
            
            <div>
              <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>标注形状</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {styleOptions.map(style => (
                  <button
                    key={style}
                    onClick={() => updateAnnotation(selectedAnnotation.id, { style })}
                    style={{
                      padding: '6px 12px',
                      background: selectedAnnotation.style === style ? 'rgba(0, 212, 255, 0.2)' : 'rgba(40, 55, 75, 0.6)',
                      border: `1px solid ${selectedAnnotation.style === style ? '#00d4ff' : 'rgba(100, 150, 200, 0.3)'}`,
                      borderRadius: '4px',
                      color: selectedAnnotation.style === style ? '#00d4ff' : '#a0b8cc',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {styleLabels[style]}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label style={{ color: '#a0b8cc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>标注颜色</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {colorOptions.map(color => (
                  <button
                    key={color}
                    onClick={() => updateAnnotation(selectedAnnotation.id, { color })}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: color,
                      border: selectedAnnotation.color === color ? '2px solid #ffffff' : '2px solid transparent',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </div>
            

          </Space>
        </div>
      )}
    </Space>
  )
}

const RightPanel = () => {
  const { currentTool, selectedModel, selectedPipe } = useStore()

  const renderPanel = () => {
    switch (currentTool) {
      case 'select':
      case null:
        return (
          <>
            <CollapsiblePanel title="模型列表" icon={Layers} defaultOpen={true}>
              <ModelListPanel />
            </CollapsiblePanel>
            {selectedModel && (
              <CollapsiblePanel title="属性编辑" icon={Edit3} defaultOpen={true}>
                <PropertyEditPanel />
              </CollapsiblePanel>
            )}
          </>
        )
      case 'measure':
        return (
          <CollapsiblePanel title="测量工具" icon={Ruler} defaultOpen={true}>
            <MeasurePanel />
          </CollapsiblePanel>
        )
      case 'modeling':
        return (
          <CollapsiblePanel title="建模工具" icon={Tag} defaultOpen={true}>
            <ModelingPanel />
          </CollapsiblePanel>
        )
      case 'layers':
        return (
          <CollapsiblePanel title="模型列表" icon={Layers} defaultOpen={true}>
            <ModelListPanel />
          </CollapsiblePanel>
        )
      case 'pipes':
        return (
          <>
            <CollapsiblePanel title="管线列表" icon={Layers} defaultOpen={true}>
              <PipeListPanel />
            </CollapsiblePanel>
            {selectedPipe && (
              <CollapsiblePanel title="管线详情" icon={Edit3} defaultOpen={true}>
                <PipePropertyPanel />
              </CollapsiblePanel>
            )}
          </>
        )
      case 'annotation':
        return (
          <CollapsiblePanel title="标注工具" icon={Tag} defaultOpen={true}>
            <AnnotationPanel />
          </CollapsiblePanel>
        )
      case 'analysis':
        return (
          <AnalysisPanel />
        )
      default:
        return (
          <CollapsiblePanel title="模型列表" icon={Layers} defaultOpen={true}>
            <ModelListPanel />
          </CollapsiblePanel>
        )
    }
  }

  return (
    <div style={{
      width: '320px',
      maxHeight: 'calc(100vh - 90px)',
      overflowY: 'auto',
      padding: '12px'
    }}>
      {renderPanel()}
    </div>
  )
}

export default RightPanel
