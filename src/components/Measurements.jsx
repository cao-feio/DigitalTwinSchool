import React from 'react'
import { Line, Text, Sphere } from '@react-three/drei'
import { useStore } from '@/store/useStore'
import * as THREE from 'three'

// 单个测量点标记
const MeasurementPoint = ({ point, index }) => {
  return (
    <group position={point}>
      {/* 外发光圆环 */}
      <Sphere args={[0.35, 16, 16]}>
        <meshStandardMaterial 
          color="#00d4ff" 
          emissive="#00d4ff" 
          emissiveIntensity={0.8}
          transparent
          opacity={0.3}
        />
      </Sphere>
      {/* 内点 */}
      <Sphere args={[0.2, 16, 16]}>
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1} />
      </Sphere>
      {/* 序号背景 */}
      <mesh position={[0, 0.6, 0]}>
        <circleGeometry args={[0.3, 16]} />
        <meshStandardMaterial color="#0f2540" transparent opacity={0.9} />
      </mesh>
      {/* 序号文字 */}
      <Text
        position={[0, 0.6, 0.01]}
        color="#fff"
        fontSize={0.35}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {index + 1}
      </Text>
    </group>
  )
}

// 分段距离测量
const DistanceSegment = ({ start, end, index }) => {
  const distance = new THREE.Vector3().subVectors(end, start).length()
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)

  return (
    <group>
      {/* 辅助线 */}
      <Line
        points={[start, end]}
        color="#00d4ff"
        lineWidth={5}
      />
      {/* 距离标注背景框 */}
      <mesh position={[mid.x, mid.y + 1, mid.z]}>
        <boxGeometry args={[1.8, 0.6, 0.1]} />
        <meshStandardMaterial color="#0f2540" transparent opacity={0.95} />
      </mesh>
      {/* 边框发光 */}
      <mesh position={[mid.x, mid.y + 1, mid.z - 0.06]}>
        <boxGeometry args={[1.9, 0.7, 0.01]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} />
      </mesh>
      {/* 距离标注文字 */}
      <Text
        position={[mid.x, mid.y + 1, mid.z + 0.06]}
        color="#00d4ff"
        fontSize={0.45}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {distance.toFixed(2)}m
      </Text>
    </group>
  )
}

// 面积测量多边形
const AreaPolygon = ({ points, area }) => {
  if (!points || points.length < 3) return null
  
  // 计算多边形中心
  const centerX = points.reduce((sum, p) => sum + p[0], 0) / points.length
  const centerY = points.reduce((sum, p) => sum + p[1], 0) / points.length
  const centerZ = points.reduce((sum, p) => sum + p[2], 0) / points.length
  
  // 创建多边形形状
  const shape = new THREE.Shape()
  points.forEach((p, i) => {
    if (i === 0) shape.moveTo(p[0], p[2])
    else shape.lineTo(p[0], p[2])
  })
  shape.closePath()
  
  const geometry = new THREE.ShapeGeometry(shape)
  
  return (
    <group>
      {/* 多边形面 */}
      <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <meshStandardMaterial 
          color="#f59e0b" 
          transparent 
          opacity={0.3} 
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* 多边形轮廓 */}
      <line rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
        <shapeGeometry args={[shape]} />
        <lineBasicMaterial color="#f59e0b" linewidth={3} />
      </line>
      
      {/* 面积标注 */}
      <group position={[centerX, centerY + 2, centerZ]}>
        <mesh>
          <boxGeometry args={[2.5, 0.8, 0.1]} />
          <meshStandardMaterial color="#0f2540" transparent opacity={0.95} />
        </mesh>
        <mesh position={[0, 0, -0.06]}>
          <boxGeometry args={[2.6, 0.9, 0.01]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
        </mesh>
        <Text
          position={[0, 0, 0.06]}
          color="#f59e0b"
          fontSize={0.45}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {area ? `${area.toFixed(2)}㎡` : '计算中...'}
        </Text>
      </group>
    </group>
  )
}

// 高度测量可视化
const HeightMeasurement = ({ points, height }) => {
  if (!points || points.length < 2) return null
  
  const p1 = points[0]
  const p2 = points[1]
  const yMin = Math.min(p1[1], p2[1])
  const yMax = Math.max(p1[1], p2[1])
  const midX = (p1[0] + p2[0]) / 2
  const midZ = (p1[2] + p2[2]) / 2
  
  return (
    <group>
      {/* 垂直高度线 */}
      <Line
        points={[
          [midX, yMin, midZ],
          [midX, yMax, midZ]
        ]}
        color="#00d4ff"
        lineWidth={5}
      />
      
      {/* 水平参考线 */}
      <Line
        points={[
          [p1[0], yMin, p1[2]],
          [midX, yMin, midZ]
        ]}
        color="#64748b"
        lineWidth={2}
        dashed
      />
      <Line
        points={[
          [p2[0], yMax, p2[2]],
          [midX, yMax, midZ]
        ]}
        color="#64748b"
        lineWidth={2}
        dashed
      />
      
      {/* 高度标注 */}
      <group position={[midX, (yMin + yMax) / 2, midZ]}>
        <mesh position={[1.5, 0, 0]}>
          <boxGeometry args={[2, 0.8, 0.1]} />
          <meshStandardMaterial color="#0f2540" transparent opacity={0.95} />
        </mesh>
        <mesh position={[1.5, 0, -0.06]}>
          <boxGeometry args={[2.1, 0.9, 0.01]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} />
        </mesh>
        <Text
          position={[1.5, 0, 0.06]}
          color="#00d4ff"
          fontSize={0.45}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {height ? `${height.toFixed(2)}m` : '计算中...'}
        </Text>
      </group>
    </group>
  )
}

// 角度测量可视化
const AngleMeasurement = ({ points, angle }) => {
  if (!points || points.length < 3) return null
  
  const vertex = points[1]
  const p1 = points[0]
  const p2 = points[2]
  
  // 计算方向向量
  const vec1 = new THREE.Vector3(p1[0] - vertex[0], p1[1] - vertex[1], p1[2] - vertex[2])
  const vec2 = new THREE.Vector3(p2[0] - vertex[0], p2[1] - vertex[1], p2[2] - vertex[2])
  
  // 归一化向量
  vec1.normalize()
  vec2.normalize()
  
  // 角度弧半径
  const radius = 3
  
  return (
    <group position={vertex}>
      {/* 两条边 */}
      <Line
        points={[
          [0, 0, 0],
          [vec1.x * radius * 2, vec1.y * radius * 2, vec1.z * radius * 2]
        ]}
        color="#a855f7"
        lineWidth={5}
      />
      <Line
        points={[
          [0, 0, 0],
          [vec2.x * radius * 2, vec2.y * radius * 2, vec2.z * radius * 2]
        ]}
        color="#a855f7"
        lineWidth={5}
      />
      
      {/* 角度弧线 */}
      <mesh>
        <ringGeometry args={[radius * 0.9, radius, 32, 1, 0, (angle || 90) * Math.PI / 180]} />
        <meshStandardMaterial color="#a855f7" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      
      {/* 角度标注 */}
      <group position={[
        (vec1.x + vec2.x) * radius * 1.5,
        (vec1.y + vec2.y) * radius * 1.5 + 1,
        (vec1.z + vec2.z) * radius * 1.5
      ]}>
        <mesh>
          <boxGeometry args={[2, 0.8, 0.1]} />
          <meshStandardMaterial color="#0f2540" transparent opacity={0.95} />
        </mesh>
        <mesh position={[0, 0, -0.06]}>
          <boxGeometry args={[2.1, 0.9, 0.01]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} />
        </mesh>
        <Text
          position={[0, 0, 0.06]}
          color="#a855f7"
          fontSize={0.45}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {angle ? `${angle.toFixed(1)}°` : '计算中...'}
        </Text>
      </group>
    </group>
  )
}

// 总距离汇总
const TotalDistance = ({ points, showTotal }) => {
  if (!showTotal || points.length < 2) return null

  let total = 0
  for (let i = 1; i < points.length; i++) {
    const dist = new THREE.Vector3().subVectors(points[i], points[i - 1]).length()
    total += dist
  }

  // 计算标注位置（路径中间偏上）
  let centerX = 0, centerY = 0, centerZ = 0
  points.forEach(p => {
    centerX += p[0]
    centerY += p[1]
    centerZ += p[2]
  })
  centerX /= points.length
  centerY /= points.length
  centerZ /= points.length

  return (
    <group position={[centerX, centerY + 2.5, centerZ]}>
      {/* 外发光背景 */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[3.2, 1.2, 0.1]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.6} transparent opacity={0.3} />
      </mesh>
      {/* 主背景框 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 1, 0.1]} />
        <meshStandardMaterial color="#0f2540" transparent opacity={0.95} />
      </mesh>
      {/* 边框 */}
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[3.1, 1.1, 0.01]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.8} />
      </mesh>
      {/* 总距离标注 */}
      <Text
        position={[0, 0, 0.06]}
        color="#fff"
        fontSize={0.55}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        总长: {total.toFixed(2)}m
      </Text>
    </group>
  )
}

const Measurements = () => {
  const { measurements, measurementPoints, measurementMode, calculatePolygonArea, calculateHeight, calculateAngle } = useStore()

  // 计算当前测量的预览数据
  let currentArea = null
  let currentHeight = null
  let currentAngle = null
  
  if (measurementMode === 'area' && measurementPoints.length >= 3) {
    currentArea = calculatePolygonArea(measurementPoints)
  } else if (measurementMode === 'height' && measurementPoints.length >= 2) {
    currentHeight = calculateHeight(measurementPoints)
  } else if (measurementMode === 'angle' && measurementPoints.length >= 3) {
    currentAngle = calculateAngle(measurementPoints)
  }

  return (
    <group>
      {/* 显示当前正在测量的点 */}
      {measurementPoints.map((point, index) => (
        <MeasurementPoint key={index} point={point} index={index} />
      ))}
      
      {/* 根据当前测量模式显示相应的可视化 */}
      {measurementMode === 'area' && measurementPoints.length >= 3 && (
        <AreaPolygon points={measurementPoints} area={currentArea} />
      )}
      
      {measurementMode === 'height' && measurementPoints.length >= 2 && (
        <HeightMeasurement points={measurementPoints} height={currentHeight} />
      )}
      
      {measurementMode === 'angle' && measurementPoints.length >= 3 && (
        <AngleMeasurement points={measurementPoints} angle={currentAngle} />
      )}
      
      {measurementMode === 'length' && measurementPoints.map((point, index) => {
        if (index === 0) return null
        return (
          <DistanceSegment 
            key={`current-${index}`}
            start={measurementPoints[index - 1]} 
            end={point} 
            index={index} 
          />
        )
      })}
      
      {/* 长度测量显示总距离 */}
      {measurementMode === 'length' && (
        <TotalDistance points={measurementPoints} showTotal={true} />
      )}

      {/* 显示已保存的测量 */}
      {measurements.map((m, i) => {
        return (
          <React.Fragment key={`saved-${i}`}>
            {/* 显示所有测量的点 */}
            {m.points.map((point, index) => (
              <MeasurementPoint key={`saved-point-${i}-${index}`} point={point} index={index} />
            ))}
            
            {/* 根据测量类型显示相应的可视化 */}
            {m.type === 'length' && m.points.map((point, index) => {
              if (index === 0) return null
              return (
                <DistanceSegment 
                  key={`saved-seg-${i}-${index}`}
                  start={m.points[index - 1]} 
                  end={point} 
                  index={index} 
                />
              )
            })}
            
            {m.type === 'area' && <AreaPolygon points={m.points} area={m.area} />}
            {m.type === 'height' && <HeightMeasurement points={m.points} height={m.height} />}
            {m.type === 'angle' && <AngleMeasurement points={m.points} angle={m.angle} />}
            
            {/* 长度测量显示总距离 */}
            {m.type === 'length' && <TotalDistance points={m.points} showTotal={true} />}
          </React.Fragment>
        )
      })}
    </group>
  )
}

export default Measurements
