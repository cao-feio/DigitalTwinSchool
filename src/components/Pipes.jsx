import React from 'react'
import { Cylinder, Box, Sphere } from '@react-three/drei'
import { useStore } from '@/store/useStore'

export const defaultPipeData = [
  // 给水管线 - 蓝色
  {
    id: 'water-main-1',
    name: '主供水管1',
    pipeType: 'water',
    path: [[-120, -1.8, -90], [120, -1.8, -90]],
    color: '#3498db',
    diameter: 0.9,
    material: 'PE管',
    diameterMm: 400,
    depth: 1.8,
    pressure: '1.0MPa',
    length: '240m',
    description: '校区主供水管道'
  },
  {
    id: 'water-main-2',
    name: '主供水管2',
    pipeType: 'water',
    path: [[-120, -1.5, -70], [0, -1.5, -70], [80, -1.5, -40]],
    color: '#3498db',
    diameter: 0.7,
    material: 'PE管',
    diameterMm: 300,
    depth: 1.5,
    pressure: '0.8MPa',
    length: '200m',
    description: '教学楼区供水管道'
  },
  // 排水管线 - 灰色
  {
    id: 'drain-main-1',
    name: '主排水管1',
    pipeType: 'drain',
    path: [[-120, -2.5, -50], [120, -2.5, -50]],
    color: '#5d6d7e',
    diameter: 1.2,
    material: '混凝土管',
    diameterMm: 500,
    depth: 2.5,
    flow: '600m³/h',
    length: '240m',
    description: '主污水排放管道'
  },
  {
    id: 'drain-main-2',
    name: '主排水管2',
    pipeType: 'drain',
    path: [[-80, -2.0, -20], [0, -2.0, -20], [0, -2.0, 50], [100, -2.0, 50]],
    color: '#5d6d7e',
    diameter: 0.9,
    material: '混凝土管',
    diameterMm: 350,
    depth: 2.0,
    flow: '350m³/h',
    length: '260m',
    description: '生活排水管道'
  },
  // 电力管线 - 黄色
  {
    id: 'power-main-1',
    name: '主电缆1',
    pipeType: 'power',
    path: [[-120, -1.0, 10], [120, -1.0, 10]],
    color: '#f1c40f',
    diameter: 0.6,
    material: 'PVC穿线管',
    diameterMm: 250,
    depth: 1.0,
    voltage: '10kV',
    length: '240m',
    description: '主电力传输电缆'
  },
  {
    id: 'power-main-2',
    name: '主电缆2',
    pipeType: 'power',
    path: [[-60, -0.8, 30], [-60, -0.8, 70], [60, -0.8, 70], [60, -0.8, 30]],
    color: '#f1c40f',
    diameter: 0.5,
    material: 'PVC穿线管',
    diameterMm: 200,
    depth: 0.8,
    voltage: '10kV',
    length: '220m',
    description: '教学楼区电力电缆'
  },
  // 燃气管线 - 红色
  {
    id: 'gas-main-1',
    name: '天然气管1',
    pipeType: 'gas',
    path: [[-120, -1.2, 60], [120, -1.2, 60]],
    color: '#e74c3c',
    diameter: 0.7,
    material: '钢管',
    diameterMm: 300,
    depth: 1.2,
    pressure: '0.4MPa',
    length: '240m',
    description: '天然气输送管道'
  },
  {
    id: 'gas-main-2',
    name: '天然气管2',
    pipeType: 'gas',
    path: [[-40, -1.0, 80], [-40, -1.0, -30], [80, -1.0, -30]],
    color: '#e74c3c',
    diameter: 0.6,
    material: '钢管',
    diameterMm: 250,
    depth: 1.0,
    pressure: '0.3MPa',
    length: '230m',
    description: '宿舍区天然气管道'
  },
  // 热力管线 - 橙色
  {
    id: 'heat-main-1',
    name: '热力管1',
    pipeType: 'heat',
    path: [[-120, -1.6, 90], [120, -1.6, 90]],
    color: '#e67e22',
    diameter: 0.8,
    material: '保温钢管',
    diameterMm: 350,
    depth: 1.6,
    temp: '95°C',
    length: '240m',
    description: '冬季供暖管道'
  },
  {
    id: 'heat-main-2',
    name: '热力管2',
    pipeType: 'heat',
    path: [[-100, -1.3, 110], [0, -1.3, 110], [0, -1.3, 60], [100, -1.3, 60]],
    color: '#e67e22',
    diameter: 0.6,
    material: '保温钢管',
    diameterMm: 250,
    depth: 1.3,
    temp: '80°C',
    length: '250m',
    description: '宿舍区供暖管道'
  },
  // 通信管线 - 紫色
  {
    id: 'comm-main-1',
    name: '通信管1',
    pipeType: 'communication',
    path: [[-120, -0.8, 130], [120, -0.8, 130]],
    color: '#9b59b6',
    diameter: 0.5,
    material: 'HDPE管',
    diameterMm: 200,
    depth: 0.8,
    fiberType: '单模光纤',
    length: '240m',
    description: '光纤通信网络'
  },
  {
    id: 'comm-main-2',
    name: '通信管2',
    pipeType: 'communication',
    path: [[-20, -0.6, 150], [-20, -0.6, 0], [100, -0.6, 0]],
    color: '#9b59b6',
    diameter: 0.4,
    material: 'HDPE管',
    diameterMm: 150,
    depth: 0.6,
    fiberType: '单模光纤',
    length: '270m',
    description: '校园通信管线'
  }
]

const Pipe = ({ data, isSelected, onClick }) => {
  // 计算管线段，并将Y坐标略微抬高到地面上方，便于点击
  const segments = []
  for (let i = 0; i < data.path.length - 1; i++) {
    const start = data.path[i]
    const end = data.path[i + 1]
    
    const dx = end[0] - start[0]
    const dy = end[1] - start[1]
    const dz = end[2] - start[2]
    const length = Math.sqrt(dx * dx + dy * dy + dz * dz)
    const midX = (start[0] + end[0]) / 2
    // 抬高Y坐标，让管线在地面上方便于点击
    const midY = Math.max(start[1], end[1]) + 0.5
    const midZ = (start[2] + end[2]) / 2
    
    // 计算旋转角度 - Cylinder需要先绕X轴旋转-90度来让它水平
    const angleY = Math.atan2(dx, dz)
    const distXZ = Math.sqrt(dx * dx + dz * dz)
    const angleX = Math.atan2(dy, distXZ)
    
    segments.push({
      position: [midX, midY, midZ],
      rotation: [-Math.PI / 2 + angleX, angleY, 0],
      length
    })
  }

  // 增强管线的颜色对比度
  const getEnhancedColor = (baseColor) => {
    return baseColor
  }

  return (
    <group onClick={onClick} renderOrder={1000}>
      {segments.map((seg, i) => (
        <React.Fragment key={i}>
          {/* 超大点击检测区域 - 透明不可见 - 绝对最前面 */}
          <Cylinder
            position={[seg.position[0], Math.abs(seg.position[1]) + 2.0, seg.position[2]]}
            rotation={seg.rotation}
            args={[data.diameter * 5.0, data.diameter * 5.0, seg.length, 6]}
            renderOrder={-100}
          >
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.0} 
              depthWrite={false}
              depthTest={false}
            />
          </Cylinder>
          
          {/* 大点击检测区域 - 透明不可见 */}
          <Cylinder
            position={[seg.position[0], Math.abs(seg.position[1]) + 1.0, seg.position[2]]}
            rotation={seg.rotation}
            args={[data.diameter * 3.5, data.diameter * 3.5, seg.length, 8]}
            renderOrder={-99}
          >
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.0} 
              depthWrite={false}
              depthTest={false}
            />
          </Cylinder>
          
          {/* 主要管线 - 可点击 - 最前层 */}
          <Cylinder
            position={seg.position}
            rotation={seg.rotation}
            args={[data.diameter / 2, data.diameter / 2, seg.length, 16]}
            renderOrder={1000}
          >
            <meshStandardMaterial 
              color={isSelected ? '#ffffff' : getEnhancedColor(data.color)} 
              emissive={isSelected ? '#ffff00' : getEnhancedColor(data.color)}
              emissiveIntensity={isSelected ? 4.0 : 0.8}
              metalness={isSelected ? 0.9 : 0.5}
              roughness={isSelected ? 0.05 : 0.3}
              depthWrite={false}
              depthTest={false}
            />
          </Cylinder>
          
          {/* 管线描边效果 - 始终有轻微发光 */}
          <Cylinder
            position={seg.position}
            rotation={seg.rotation}
            args={[data.diameter * 1.4, data.diameter * 1.4, seg.length, 16]}
            renderOrder={1001}
          >
            <meshBasicMaterial 
              color={isSelected ? '#ffff00' : getEnhancedColor(data.color)} 
              transparent 
              opacity={isSelected ? 0.8 : 0.3} 
              side={2}
              depthWrite={false}
              depthTest={false}
            />
          </Cylinder>
          
          {/* 高亮内发光效果 */}
          {isSelected && (
            <Cylinder
              position={seg.position}
              rotation={seg.rotation}
              args={[data.diameter * 1.7, data.diameter * 1.7, seg.length, 16]}
              renderOrder={1002}
            >
              <meshBasicMaterial 
                color="#ffdd00" 
                transparent 
                opacity={0.65} 
                side={2}
                depthWrite={false}
                depthTest={false}
              />
            </Cylinder>
          )}
          
          {/* 高亮中发光效果 */}
          {isSelected && (
            <Cylinder
              position={seg.position}
              rotation={seg.rotation}
              args={[data.diameter * 2.2, data.diameter * 2.2, seg.length, 16]}
              renderOrder={1003}
            >
              <meshBasicMaterial 
                color="#ffff00" 
                transparent 
                opacity={0.5} 
                side={2}
                depthWrite={false}
                depthTest={false}
              />
            </Cylinder>
          )}
          
          {/* 高亮强发光效果 - 外层 */}
          {isSelected && (
            <Cylinder
              position={seg.position}
              rotation={seg.rotation}
              args={[data.diameter * 2.8, data.diameter * 2.8, seg.length, 16]}
              renderOrder={1004}
            >
              <meshBasicMaterial 
                color="#ffff88" 
                transparent 
                opacity={0.35} 
                side={2}
                depthWrite={false}
                depthTest={false}
              />
            </Cylinder>
          )}
          
          {/* 超亮外层发光 - 最外层 */}
          {isSelected && (
            <Cylinder
              position={seg.position}
              rotation={seg.rotation}
              args={[data.diameter * 3.5, data.diameter * 3.5, seg.length, 16]}
              renderOrder={1005}
            >
              <meshBasicMaterial 
                color="#ffffff" 
                transparent 
                opacity={0.2} 
                side={2}
                depthWrite={false}
                depthTest={false}
              />
            </Cylinder>
          )}
        </React.Fragment>
      ))}
      
      {/* 连接点/检查井 */}
      {data.path.map((point, i) => (
        <React.Fragment key={i}>
          {/* 超大点击检测区域 - 透明不可见 - 绝对最前面 */}
          <Sphere 
            position={[point[0], Math.abs(point[1]) + 2.0, point[2]]} 
            args={[data.diameter * 6.0, 8, 8]} 
            renderOrder={-100}
          >
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.0} 
              depthWrite={false}
              depthTest={false}
            />
          </Sphere>
          
          {/* 大点击检测区域 - 透明不可见 */}
          <Sphere 
            position={[point[0], Math.abs(point[1]) + 1.0, point[2]]} 
            args={[data.diameter * 4.5, 10, 10]} 
            renderOrder={-99}
          >
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.0} 
              depthWrite={false}
              depthTest={false}
            />
          </Sphere>
          
          {/* 主要连接球 - 可点击 - 最前层 */}
          <Sphere position={point} args={[data.diameter * 1.1, 20, 20]} renderOrder={1000}>
            <meshStandardMaterial 
              color={isSelected ? '#ffffff' : getEnhancedColor(data.color)} 
              emissive={isSelected ? '#ffff00' : getEnhancedColor(data.color)}
              emissiveIntensity={isSelected ? 4.0 : 0.8}
              metalness={isSelected ? 0.9 : 0.5}
              roughness={isSelected ? 0.05 : 0.3}
              depthWrite={false}
              depthTest={false}
            />
          </Sphere>
          
          {/* 连接点描边 */}
          <Sphere position={point} args={[data.diameter * 1.5, 20, 20]} renderOrder={1001}>
            <meshBasicMaterial 
              color={isSelected ? '#ffff00' : getEnhancedColor(data.color)} 
              transparent 
              opacity={isSelected ? 0.85 : 0.35} 
              side={2}
              depthWrite={false}
              depthTest={false}
            />
          </Sphere>
          
          {/* 连接点内发光效果 */}
          {isSelected && (
            <Sphere position={point} args={[data.diameter * 1.9, 20, 20]} renderOrder={1002}>
              <meshBasicMaterial 
                color="#ffdd00" 
                transparent 
                opacity={0.7} 
                side={2}
                depthWrite={false}
                depthTest={false}
              />
            </Sphere>
          )}
          
          {/* 连接点中发光效果 */}
          {isSelected && (
            <Sphere position={point} args={[data.diameter * 2.4, 20, 20]} renderOrder={1003}>
              <meshBasicMaterial 
                color="#ffff00" 
                transparent 
                opacity={0.55} 
                side={2}
                depthWrite={false}
                depthTest={false}
              />
            </Sphere>
          )}
          
          {/* 连接点强发光效果 - 外层 */}
          {isSelected && (
            <Sphere position={point} args={[data.diameter * 3.0, 20, 20]} renderOrder={1004}>
              <meshBasicMaterial 
                color="#ffff88" 
                transparent 
                opacity={0.38} 
                side={2}
                depthWrite={false}
                depthTest={false}
              />
            </Sphere>
          )}
          
          {/* 连接点超亮外层发光 - 最外层 */}
          {isSelected && (
            <Sphere position={point} args={[data.diameter * 3.8, 20, 20]} renderOrder={1005}>
              <meshBasicMaterial 
                color="#ffffff" 
                transparent 
                opacity={0.22} 
                side={2}
                depthWrite={false}
                depthTest={false}
              />
            </Sphere>
          )}
        </React.Fragment>
      ))}
    </group>
  )
}

const Pipes = () => {
  const { selectedPipe, setSelectedPipe, setHasSelectedPipe, modelVisibility, hasSelectedPipe, setCameraTarget, setCurrentTool, layers, toggleLayer } = useStore()

  const handlePipeClick = (e, pipe) => {
    e.stopPropagation()
    console.log('点击管线:', pipe.id, '当前选中:', selectedPipe?.id, 'hasSelectedPipe:', hasSelectedPipe)
    // 确保管线图层开启
    if (!layers.pipes) {
      toggleLayer('pipes')
    }
    // 设置当前工具为管线工具，确保右侧面板显示管线管理
    setCurrentTool('pipes')
    // 如果点击的是同一个管线，则取消选中，但保持透明模式
    if (selectedPipe?.id === pipe.id) {
      console.log('取消选中管线，但保持透明模式')
      setSelectedPipe(null)
      // 注意：不设置 setHasSelectedPipe(false)，保持透明模式
    } else {
      console.log('选中管线')
      setSelectedPipe(pipe)
      setHasSelectedPipe(true)
      // 设置相机目标，定位到管线
      if (pipe.path && pipe.path.length >= 2) {
        const midX = (pipe.path[0][0] + pipe.path[pipe.path.length - 1][0]) / 2
        const midY = Math.abs(pipe.path[0][1]) + 30
        const midZ = (pipe.path[0][2] + pipe.path[pipe.path.length - 1][2]) / 2
        setCameraTarget([midX, midY, midZ])
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
