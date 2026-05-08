import React from 'react'
import { Cylinder, Box, Sphere, Text } from '@react-three/drei'
import { useStore } from '@/store/useStore'
import * as THREE from 'three'

// 管线类型配置
const pipeTypes = {
  water: { name: '给水', color: '#3498db', icon: '💧' },
  drain: { name: '排水', color: '#5d6d7e', icon: '🗑️' },
  power: { name: '电力', color: '#f1c40f', icon: '⚡' },
  gas: { name: '燃气', color: '#e74c3c', icon: '🔥' },
  heat: { name: '热力', color: '#e67e22', icon: '🌡️' },
  communication: { name: '通信', color: '#9b59b6', icon: '📡' }
}

// 检查井类型
const manholeTypes = {
  regular: { name: '普通检查井', size: 1.2, height: 1.5 },
  valve: { name: '阀门井', size: 1.5, height: 1.8 },
  tee: { name: '三通井', size: 1.8, height: 2.0 },
  cross: { name: '四通井', size: 2.0, height: 2.2 }
}

// 真实的校园管线数据
export const defaultPipeData = [
  // ============ 给水管网 ============
  {
    id: 'water-main-1',
    name: '市政供水主管',
    pipeType: 'water',
    path: [[-130, -1.8, -100], [130, -1.8, -100]],
    color: '#3498db',
    diameter: 1.0,
    material: '球墨铸铁管',
    diameterMm: 600,
    depth: 1.8,
    pressure: '1.2MPa',
    flowRate: '800m³/h',
    installDate: '2018-05',
    description: '连接市政管网的主供水管道',
    manholes: [
      { index: 0, type: 'regular', name: 'W-1' },
      { index: 1, type: 'valve', name: 'W-2' }
    ]
  },
  {
    id: 'water-main-2',
    name: '校园环线主管',
    pipeType: 'water',
    path: [[-100, -1.5, -70], [-50, -1.5, -70], [0, -1.5, -50], [50, -1.5, -70], [100, -1.5, -70]],
    color: '#3498db',
    diameter: 0.8,
    material: 'PE管',
    diameterMm: 400,
    depth: 1.5,
    pressure: '0.8MPa',
    flowRate: '500m³/h',
    installDate: '2019-08',
    description: '教学区环形供水主管',
    manholes: [
      { index: 0, type: 'regular', name: 'W-3' },
      { index: 2, type: 'tee', name: 'W-4' },
      { index: 4, type: 'regular', name: 'W-5' }
    ]
  },
  {
    id: 'water-branch-1',
    name: '图书馆供水管',
    pipeType: 'water',
    path: [[0, -1.5, -50], [0, -1.2, 0]],
    color: '#5dade2',
    diameter: 0.5,
    material: 'PE管',
    diameterMm: 250,
    depth: 1.2,
    pressure: '0.6MPa',
    flowRate: '150m³/h',
    installDate: '2020-03',
    description: '图书馆专用供水支管',
    manholes: [
      { index: 0, type: 'tee', name: 'W-4' },
      { index: 1, type: 'valve', name: 'W-6' }
    ]
  },
  {
    id: 'water-branch-2',
    name: '教学楼A供水管',
    pipeType: 'water',
    path: [[-50, -1.5, -70], [-50, -1.0, -25]],
    color: '#5dade2',
    diameter: 0.4,
    material: 'PE管',
    diameterMm: 200,
    depth: 1.0,
    pressure: '0.5MPa',
    flowRate: '100m³/h',
    installDate: '2020-03',
    description: '教学楼A供水支管',
    manholes: [
      { index: 0, type: 'regular', name: 'W-3' },
      { index: 1, type: 'valve', name: 'W-7' }
    ]
  },
  {
    id: 'water-branch-3',
    name: '宿舍区供水管',
    pipeType: 'water',
    path: [[50, -1.5, -70], [50, -1.0, 50]],
    color: '#5dade2',
    diameter: 0.6,
    material: 'PE管',
    diameterMm: 300,
    depth: 1.0,
    pressure: '0.7MPa',
    flowRate: '200m³/h',
    installDate: '2019-11',
    description: '宿舍区供水主管',
    manholes: [
      { index: 0, type: 'regular', name: 'W-5' },
      { index: 1, type: 'tee', name: 'W-8' }
    ]
  },
  {
    id: 'water-branch-4',
    name: '学生活动中心供水管',
    pipeType: 'water',
    path: [[0, -1.5, -50], [0, -0.8, -55]],
    color: '#85c1e9',
    diameter: 0.3,
    material: 'PE管',
    diameterMm: 150,
    depth: 0.8,
    pressure: '0.4MPa',
    flowRate: '60m³/h',
    installDate: '2021-06',
    description: '学生活动中心供水',
    manholes: [
      { index: 0, type: 'regular', name: 'W-4' },
      { index: 1, type: 'regular', name: 'W-9' }
    ]
  },

  // ============ 排水管网 ============
  {
    id: 'drain-main-1',
    name: '污水主管',
    pipeType: 'drain',
    path: [[-130, -2.5, -60], [130, -2.5, -60]],
    color: '#5d6d7e',
    diameter: 1.4,
    material: '钢筋混凝土管',
    diameterMm: 700,
    depth: 2.5,
    flowRate: '1000m³/h',
    slope: '0.3%',
    installDate: '2017-09',
    description: '校区污水排放主管',
    manholes: [
      { index: 0, type: 'regular', name: 'D-1' },
      { index: 1, type: 'regular', name: 'D-2' }
    ]
  },
  {
    id: 'drain-main-2',
    name: '雨水主管',
    pipeType: 'drain',
    path: [[-100, -2.0, -30], [0, -2.0, -30], [0, -2.0, 60], [130, -2.0, 60]],
    color: '#7f8c8d',
    diameter: 1.2,
    material: 'HDPE双壁波纹管',
    diameterMm: 600,
    depth: 2.0,
    flowRate: '800m³/h',
    slope: '0.25%',
    installDate: '2018-11',
    description: '雨水排放系统',
    manholes: [
      { index: 0, type: 'regular', name: 'D-3' },
      { index: 1, type: 'tee', name: 'D-4' },
      { index: 2, type: 'regular', name: 'D-5' },
      { index: 3, type: 'regular', name: 'D-6' }
    ]
  },
  {
    id: 'drain-branch-1',
    name: '教学区污水管',
    pipeType: 'drain',
    path: [[0, -2.0, -30], [-50, -1.8, -30], [-50, -1.8, -25]],
    color: '#95a5a6',
    diameter: 0.8,
    material: 'HDPE管',
    diameterMm: 400,
    depth: 1.8,
    flowRate: '300m³/h',
    installDate: '2019-04',
    description: '教学区污水支管',
    manholes: [
      { index: 0, type: 'tee', name: 'D-4' },
      { index: 2, type: 'regular', name: 'D-7' }
    ]
  },
  {
    id: 'drain-branch-2',
    name: '宿舍区污水管',
    pipeType: 'drain',
    path: [[0, -2.0, -30], [0, -1.8, 50]],
    color: '#95a5a6',
    diameter: 1.0,
    material: 'HDPE管',
    diameterMm: 500,
    depth: 1.8,
    flowRate: '450m³/h',
    installDate: '2018-06',
    description: '宿舍区生活污水管',
    manholes: [
      { index: 0, type: 'regular', name: 'D-4' },
      { index: 1, type: 'valve', name: 'D-8' }
    ]
  },

  // ============ 电力管网 ============
  {
    id: 'power-main-1',
    name: '10kV主电缆',
    pipeType: 'power',
    path: [[-130, -1.0, 20], [130, -1.0, 20]],
    color: '#f1c40f',
    diameter: 0.7,
    material: 'C-PVC电力管',
    diameterMm: 300,
    depth: 1.0,
    voltage: '10kV',
    current: '400A',
    cableCount: 3,
    installDate: '2017-12',
    description: '校园主电力输送电缆',
    manholes: [
      { index: 0, type: 'regular', name: 'P-1' },
      { index: 1, type: 'valve', name: 'P-2' }
    ]
  },
  {
    id: 'power-main-2',
    name: '教学区电缆环',
    pipeType: 'power',
    path: [[-70, -0.8, 40], [-70, -0.8, 80], [70, -0.8, 80], [70, -0.8, 40]],
    color: '#f39c12',
    diameter: 0.6,
    material: 'C-PVC电力管',
    diameterMm: 250,
    depth: 0.8,
    voltage: '10kV',
    current: '250A',
    cableCount: 2,
    installDate: '2018-08',
    description: '教学区环形供电网络',
    manholes: [
      { index: 0, type: 'regular', name: 'P-3' },
      { index: 1, type: 'tee', name: 'P-4' },
      { index: 2, type: 'regular', name: 'P-5' },
      { index: 3, type: 'tee', name: 'P-6' }
    ]
  },
  {
    id: 'power-branch-1',
    name: '图书馆电缆',
    pipeType: 'power',
    path: [[-70, -0.8, 40], [0, -0.6, 0]],
    color: '#f7dc6f',
    diameter: 0.4,
    material: 'PVC穿线管',
    diameterMm: 180,
    depth: 0.6,
    voltage: '0.4kV',
    current: '200A',
    installDate: '2019-05',
    description: '图书馆供电电缆',
    manholes: [
      { index: 0, type: 'regular', name: 'P-3' },
      { index: 1, type: 'regular', name: 'P-7' }
    ]
  },
  {
    id: 'power-branch-2',
    name: '行政楼电缆',
    pipeType: 'power',
    path: [[-70, -0.8, 80], [-85, -0.6, 0]],
    color: '#f9e79f',
    diameter: 0.35,
    material: 'PVC穿线管',
    diameterMm: 160,
    depth: 0.6,
    voltage: '0.4kV',
    current: '150A',
    installDate: '2019-05',
    description: '行政楼供电',
    manholes: [
      { index: 0, type: 'regular', name: 'P-4' },
      { index: 1, type: 'regular', name: 'P-8' }
    ]
  },

  // ============ 燃气管网 ============
  {
    id: 'gas-main-1',
    name: '天然气主管',
    pipeType: 'gas',
    path: [[-130, -1.5, 70], [130, -1.5, 70]],
    color: '#e74c3c',
    diameter: 0.8,
    material: '无缝钢管',
    diameterMm: 400,
    depth: 1.5,
    pressure: '0.4MPa',
    flowRate: '500m³/h',
    installDate: '2016-10',
    description: '市政天然气接入管',
    manholes: [
      { index: 0, type: 'regular', name: 'G-1' },
      { index: 1, type: 'valve', name: 'G-2' }
    ]
  },
  {
    id: 'gas-branch-1',
    name: '食堂燃气管',
    pipeType: 'gas',
    path: [[0, -1.5, 70], [0, -1.2, 45]],
    color: '#ec7063',
    diameter: 0.5,
    material: '无缝钢管',
    diameterMm: 250,
    depth: 1.2,
    pressure: '0.2MPa',
    flowRate: '150m³/h',
    installDate: '2017-03',
    description: '食堂天然气供应',
    manholes: [
      { index: 0, type: 'tee', name: 'G-3' },
      { index: 1, type: 'valve', name: 'G-4' }
    ]
  },
  {
    id: 'gas-branch-2',
    name: '宿舍区燃气管',
    pipeType: 'gas',
    path: [[0, -1.5, 70], [-60, -1.2, 50], [60, -1.2, 50]],
    color: '#f1948a',
    diameter: 0.4,
    material: '镀锌钢管',
    diameterMm: 200,
    depth: 1.2,
    pressure: '0.15MPa',
    flowRate: '100m³/h',
    installDate: '2017-06',
    description: '学生宿舍区燃气供应',
    manholes: [
      { index: 0, type: 'regular', name: 'G-3' },
      { index: 1, type: 'tee', name: 'G-5' },
      { index: 2, type: 'regular', name: 'G-6' }
    ]
  },

  // ============ 热力管网 ============
  {
    id: 'heat-main-1',
    name: '供暖主管-供水',
    pipeType: 'heat',
    path: [[-130, -1.8, 100], [130, -1.8, 100]],
    color: '#e67e22',
    diameter: 0.9,
    material: '聚氨酯保温钢管',
    diameterMm: 500,
    depth: 1.8,
    tempSupply: '95°C',
    tempReturn: '70°C',
    pressure: '1.6MPa',
    installDate: '2015-11',
    description: '冬季供暖供水主管',
    manholes: [
      { index: 0, type: 'regular', name: 'H-1' },
      { index: 1, type: 'valve', name: 'H-2' }
    ]
  },
  {
    id: 'heat-main-2',
    name: '供暖主管-回水',
    pipeType: 'heat',
    path: [[-130, -1.8, 105], [130, -1.8, 105]],
    color: '#d35400',
    diameter: 0.9,
    material: '聚氨酯保温钢管',
    diameterMm: 500,
    depth: 1.8,
    tempSupply: '70°C',
    pressure: '1.2MPa',
    installDate: '2015-11',
    description: '冬季供暖回水主管',
    manholes: [
      { index: 0, type: 'regular', name: 'H-3' },
      { index: 1, type: 'regular', name: 'H-4' }
    ]
  },
  {
    id: 'heat-branch-1',
    name: '教学区供暖管',
    pipeType: 'heat',
    path: [[0, -1.8, 100], [-50, -1.5, 70], [50, -1.5, 70]],
    color: '#eb984e',
    diameter: 0.6,
    material: '聚氨酯保温钢管',
    diameterMm: 300,
    depth: 1.5,
    temp: '85°C',
    installDate: '2016-09',
    description: '教学楼区供暖',
    manholes: [
      { index: 0, type: 'tee', name: 'H-5' },
      { index: 1, type: 'regular', name: 'H-6' },
      { index: 2, type: 'regular', name: 'H-7' }
    ]
  },
  {
    id: 'heat-branch-2',
    name: '宿舍区供暖管',
    pipeType: 'heat',
    path: [[0, -1.8, 100], [0, -1.5, 50]],
    color: '#f0b27a',
    diameter: 0.5,
    material: '聚氨酯保温钢管',
    diameterMm: 250,
    depth: 1.5,
    temp: '80°C',
    installDate: '2016-09',
    description: '学生宿舍供暖',
    manholes: [
      { index: 0, type: 'regular', name: 'H-5' },
      { index: 1, type: 'valve', name: 'H-8' }
    ]
  },

  // ============ 通信管网 ============
  {
    id: 'comm-main-1',
    name: '光纤主干线',
    pipeType: 'communication',
    path: [[-130, -1.0, 130], [130, -1.0, 130]],
    color: '#9b59b6',
    diameter: 0.6,
    material: 'HDPE硅芯管',
    diameterMm: 280,
    depth: 1.0,
    fiberType: 'G.652单模光纤',
    coreCount: 144,
    bandwidth: '100Gbps',
    installDate: '2020-01',
    description: '校园骨干光纤网络',
    manholes: [
      { index: 0, type: 'regular', name: 'C-1' },
      { index: 1, type: 'regular', name: 'C-2' }
    ]
  },
  {
    id: 'comm-branch-1',
    name: '教学区通信管',
    pipeType: 'communication',
    path: [[0, -1.0, 130], [-50, -0.8, 70], [50, -0.8, 70], [0, -0.8, 0]],
    color: '#af7ac5',
    diameter: 0.4,
    material: 'HDPE管',
    diameterMm: 180,
    depth: 0.8,
    fiberType: 'G.652单模光纤',
    coreCount: 48,
    bandwidth: '10Gbps',
    installDate: '2020-05',
    description: '教学区通信网络',
    manholes: [
      { index: 0, type: 'tee', name: 'C-3' },
      { index: 1, type: 'regular', name: 'C-4' },
      { index: 2, type: 'regular', name: 'C-5' },
      { index: 3, type: 'regular', name: 'C-6' }
    ]
  },
  {
    id: 'comm-branch-2',
    name: '宿舍区通信管',
    pipeType: 'communication',
    path: [[0, -1.0, 130], [0, -0.8, 50], [-60, -0.6, 50], [60, -0.6, 50]],
    color: '#d2b4de',
    diameter: 0.35,
    material: 'HDPE管',
    diameterMm: 160,
    depth: 0.6,
    fiberType: 'G.652单模光纤',
    coreCount: 24,
    bandwidth: '10Gbps',
    installDate: '2020-08',
    description: '学生宿舍宽带接入',
    manholes: [
      { index: 0, type: 'regular', name: 'C-3' },
      { index: 1, type: 'tee', name: 'C-7' },
      { index: 2, type: 'regular', name: 'C-8' },
      { index: 3, type: 'regular', name: 'C-9' }
    ]
  }
]

// 检查井组件
const Manhole = ({ position, type, name, color, isSelected }) => {
  const config = manholeTypes[type] || manholeTypes.regular
  
  return (
    <group position={position}>
      {/* 井体 - 地面以上部分 */}
      <Cylinder 
        args={[config.size / 2, config.size / 2 + 0.1, config.height, 20]} 
        position={[0, config.height / 2, 0]}
      >
        <meshStandardMaterial 
          color="#34495e" 
          metalness={0.3} 
          roughness={0.7} 
        />
      </Cylinder>
      
      {/* 井盖 */}
      <Cylinder 
        args={[config.size / 2 + 0.1, config.size / 2 + 0.1, 0.15, 24]} 
        position={[0, config.height + 0.075, 0]}
      >
        <meshStandardMaterial 
          color={isSelected ? '#f39c12' : '#2c3e50'} 
          metalness={0.8} 
          roughness={0.3} 
          emissive={isSelected ? color : '#000000'}
          emissiveIntensity={isSelected ? 0.5 : 0}
        />
      </Cylinder>
      
      {/* 井盖上的标识文字 */}
      <Text
        position={[0, config.height + 0.3, 0]}
        color={isSelected ? '#ffffff' : color}
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {name}
      </Text>
    </group>
  )
}

// 管线组件
const Pipe = ({ data, isSelected, onClick }) => {
  const segments = []
  
  for (let i = 0; i < data.path.length - 1; i++) {
    const start = data.path[i]
    const end = data.path[i + 1]
    
    const dx = end[0] - start[0]
    const dy = end[1] - start[1]
    const dz = end[2] - start[2]
    const length = Math.sqrt(dx * dx + dy * dy + dz * dz)
    
    // 将管线显示在地面上方便于查看
    const displayY = Math.abs(start[1]) + 0.3
    const midX = (start[0] + end[0]) / 2
    const midZ = (start[2] + end[2]) / 2
    
    // 计算旋转角度
    const angleY = Math.atan2(dx, dz)
    const distXZ = Math.sqrt(dx * dx + dz * dz)
    const angleX = Math.atan2(dy, distXZ)
    
    segments.push({
      start: [start[0], displayY, start[2]],
      end: [end[0], displayY, end[2]],
      position: [midX, displayY, midZ],
      rotation: [-Math.PI / 2 + angleX, angleY, 0],
      length
    })
  }

  return (
    <group onClick={onClick} renderOrder={100}>
      {/* 绘制管线段 */}
      {segments.map((seg, i) => (
        <React.Fragment key={i}>
          {/* 大的点击检测区域 */}
          <Cylinder
            position={seg.position}
            rotation={seg.rotation}
            args={[data.diameter * 5, data.diameter * 5, seg.length, 8]}
          >
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0} 
              depthTest={true}
              depthWrite={false}
            />
          </Cylinder>
          
          {/* 主管线 */}
          <Cylinder
            position={seg.position}
            rotation={seg.rotation}
            args={[data.diameter / 2, data.diameter / 2, seg.length, 16]}
          >
            <meshStandardMaterial 
              color={isSelected ? '#ffffff' : data.color} 
              emissive={isSelected ? data.color : data.color}
              emissiveIntensity={isSelected ? 1.5 : 0.5}
              metalness={isSelected ? 0.9 : 0.4}
              roughness={isSelected ? 0.1 : 0.5}
            />
          </Cylinder>
          
          {/* 管线发光效果 */}
          {isSelected && (
            <Cylinder
              position={seg.position}
              rotation={seg.rotation}
              args={[data.diameter * 1.5, data.diameter * 1.5, seg.length, 16]}
            >
              <meshBasicMaterial 
                color={data.color} 
                transparent 
                opacity={0.5} 
                side={THREE.DoubleSide}
              />
            </Cylinder>
          )}
        </React.Fragment>
      ))}
      
      {/* 绘制检查井 */}
      {data.manholes && data.manholes.map((manhole, i) => {
        const point = data.path[manhole.index]
        const displayY = Math.abs(point[1]) + 0.3
        
        return (
          <Manhole
            key={`manhole-${i}`}
            position={[point[0], displayY, point[2]]}
            type={manhole.type}
            name={manhole.name}
            color={data.color}
            isSelected={isSelected}
          />
        )
      })}
      
      {/* 普通连接点（非检查井） */}
      {data.path.map((point, i) => {
        // 检查是否是检查井
        const isManhole = data.manholes && data.manholes.some(m => m.index === i)
        if (isManhole) return null
        
        const displayY = Math.abs(point[1]) + 0.3
        
        return (
          <Sphere 
            key={`point-${i}`}
            position={[point[0], displayY, point[2]]} 
            args={[data.diameter * 0.8, 16, 16]}
          >
            <meshStandardMaterial 
              color={isSelected ? '#ffffff' : data.color}
              emissive={isSelected ? data.color : data.color}
              emissiveIntensity={isSelected ? 1.5 : 0.4}
            />
          </Sphere>
        )
      })}
    </group>
  )
}

const Pipes = () => {
  const { 
    selectedPipe, 
    setSelectedPipe, 
    setHasSelectedPipe, 
    modelVisibility, 
    hasSelectedPipe, 
    setCameraTarget, 
    setCurrentTool, 
    layers, 
    toggleLayer 
  } = useStore()

  const handlePipeClick = (e, pipe) => {
    e.stopPropagation()
    
    // 确保管线图层开启
    if (!layers.pipes) {
      toggleLayer('pipes')
    }
    
    setCurrentTool('pipes')
    
    if (selectedPipe?.id === pipe.id) {
      setSelectedPipe(null)
    } else {
      setSelectedPipe(pipe)
      setHasSelectedPipe(true)
      
      // 定位到管线
      if (pipe.path && pipe.path.length >= 1) {
        const midIndex = Math.floor(pipe.path.length / 2)
        const targetPoint = pipe.path[midIndex]
        setCameraTarget([targetPoint[0], Math.abs(targetPoint[1]) + 40, targetPoint[2]])
      }
    }
  }

  return (
    <group>
      {defaultPipeData.map(pipe => {
        if (modelVisibility[pipe.id] === false) return null
        const isSelected = selectedPipe?.id === pipe.id
        
        return (
          <Pipe
            key={pipe.id}
            data={pipe}
            isSelected={isSelected}
            onClick={(e) => handlePipeClick(e, pipe)}
          />
        )
      })}
    </group>
  )
}

export default Pipes
