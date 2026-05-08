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
  const { measurements, measurementPoints, measurementMode } = useStore()

  return (
    <group>
      {/* 显示当前正在测量的点和分段距离 */}
      {measurementPoints.map((point, index) => (
        <MeasurementPoint key={index} point={point} index={index} />
      ))}
      
      {/* 显示当前测量的分段距离 */}
      {measurementPoints.map((point, index) => {
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

      {/* 显示已保存的测量 */}
      {measurements.map((m, i) => {
        if (m.type !== 'length') return null
        return (
          <React.Fragment key={`saved-${i}`}>
            {m.points.map((point, index) => (
              <MeasurementPoint key={`saved-point-${i}-${index}`} point={point} index={index} />
            ))}
            {m.points.map((point, index) => {
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
            <TotalDistance points={m.points} showTotal={true} />
          </React.Fragment>
        )
      })}
      
      {/* 当前测量的总距离提示（未结束测量时不显示总距离） */}
    </group>
  )
}

export default Measurements
