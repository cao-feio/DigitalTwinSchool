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

const RightPanel = () => {
  const { currentTool, selectedModel } = useStore()

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
