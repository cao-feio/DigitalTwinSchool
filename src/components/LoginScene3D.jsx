import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Grid, Float, Text } from '@react-three/drei'
import * as THREE from 'three'

// 动态粒子系统
const ParticleSystem = () => {
  const mesh = useRef()
  const count = 400
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 100
      p[i * 3 + 1] = Math.random() * 40
      p[i * 3 + 2] = (Math.random() - 0.5) * 80
    }
    return p
  }, [])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.015
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        color="#00d4ff"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// 主教学楼
const MainBuilding = ({ position }) => {
  const mesh = useRef()
  const { mouse } = useThree()
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = mouse.x * 0.05
    }
  })
  
  return (
    <group position={position} ref={mesh}>
      {/* 主楼体 */}
      <mesh position={[0, 10, 0]}>
        <boxGeometry args={[30, 20, 18]} />
        <meshStandardMaterial
          color="#2a4060"
          metalness={0.4}
          roughness={0.6}
          emissive="#00d4ff"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* 窗户 */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group key={`row-${i}`}>
          {Array.from({ length: 9 }).map((_, j) => (
            <mesh
              key={`win-${i}-${j}`}
              position={[-12 + j * 3, 3 + i * 2.2, 9.1]}
            >
              <boxGeometry args={[2.2, 1.8, 0.2]} />
              <meshStandardMaterial
                color="#87ceeb"
                emissive="#00d4ff"
                emissiveIntensity={0.3}
                transparent
                opacity={0.7}
              />
            </mesh>
          ))}
        </group>
      ))}
      {/* 标识 */}
      <Text
        position={[0, 20, 9.2]}
        color="#00d4ff"
        fontSize={1.5}
        anchorX="center"
      >
        教学楼
      </Text>
    </group>
  )
}

// 图书馆
const Library = ({ position }) => {
  const mesh = useRef()
  const { mouse } = useThree()
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = mouse.x * 0.04
    }
  })
  
  return (
    <group position={position} ref={mesh}>
      {/* 楼体 */}
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[24, 16, 16]} />
        <meshStandardMaterial
          color="#254555"
          metalness={0.4}
          roughness={0.6}
          emissive="#06b6d4"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* 圆顶 */}
      <mesh position={[0, 18, 0]}>
        <sphereGeometry args={[6, 16, 10]} scale={[1, 0.7, 1]} />
        <meshStandardMaterial
          color="#355565"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
      {/* 窗户 */}
      {Array.from({ length: 6 }).map((_, i) => (
        <group key={`row-${i}`}>
          {Array.from({ length: 7 }).map((_, j) => (
            <mesh
              key={`win-${i}-${j}`}
              position={[-9 + j * 3, 3 + i * 2.3, 8.1]}
            >
              <boxGeometry args={[2.2, 1.8, 0.2]} />
              <meshStandardMaterial
                color="#a0d8ef"
                emissive="#06b6d4"
                emissiveIntensity={0.25}
                transparent
                opacity={0.7}
              />
            </mesh>
          ))}
        </group>
      ))}
      <Text
        position={[0, 16, 8.2]}
        color="#06b6d4"
        fontSize={1.3}
        anchorX="center"
      >
        图书馆
      </Text>
    </group>
  )
}

// 实验楼
const LabBuilding = ({ position }) => {
  const mesh = useRef()
  const { mouse } = useThree()
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = mouse.x * 0.035
    }
  })
  
  return (
    <group position={position} ref={mesh}>
      {/* 楼体 */}
      <mesh position={[0, 7.5, 0]}>
        <boxGeometry args={[20, 15, 14]} />
        <meshStandardMaterial
          color="#234a5a"
          metalness={0.4}
          roughness={0.6}
          emissive="#10b981"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* 窗户 */}
      {Array.from({ length: 6 }).map((_, i) => (
        <group key={`row-${i}`}>
          {Array.from({ length: 6 }).map((_, j) => (
            <mesh
              key={`win-${i}-${j}`}
              position={[-7.5 + j * 3, 2.5 + i * 2.2, 7.1]}
            >
              <boxGeometry args={[2.2, 1.8, 0.2]} />
              <meshStandardMaterial
                color="#90e0ef"
                emissive="#10b981"
                emissiveIntensity={0.25}
                transparent
                opacity={0.7}
              />
            </mesh>
          ))}
        </group>
      ))}
      <Text
        position={[0, 15, 7.2]}
        color="#10b981"
        fontSize={1.2}
        anchorX="center"
      >
        实验楼
      </Text>
    </group>
  )
}

// 校门
const SchoolGate = ({ position }) => {
  const mesh = useRef()
  const { mouse } = useThree()
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = mouse.x * 0.03
    }
  })
  
  return (
    <group position={position} ref={mesh}>
      {/* 门柱 */}
      {[-12, 12].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 6, 0]}>
            <cylinderGeometry args={[1.2, 1.2, 12, 16]} />
            <meshStandardMaterial
              color="#3b82f6"
              metalness={0.6}
              roughness={0.4}
              emissive="#3b82f6"
              emissiveIntensity={0.2}
            />
          </mesh>
          <mesh position={[x, 13, 0]}>
            <sphereGeometry args={[1.8, 16, 16]} />
            <meshStandardMaterial
              color="#60a5fa"
              metalness={0.6}
              roughness={0.4}
              emissive="#60a5fa"
              emissiveIntensity={0.25}
            />
          </mesh>
        </group>
      ))}
      {/* 横梁 */}
      <mesh position={[0, 12, 0]}>
        <boxGeometry args={[28, 2.5, 2.5]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.6}
          roughness={0.4}
          emissive="#3b82f6"
          emissiveIntensity={0.15}
        />
      </mesh>
      <Text
        position={[0, 15, 0]}
        color="#ffffff"
        fontSize={1.8}
        anchorX="center"
      >
        智慧校园
      </Text>
    </group>
  )
}

// 场景内容
const SceneContent = () => {
  return (
    <>
      <color attach="background" args={['#01153c']} />
      <fog attach="fog" args={['#01153c', 35, 130]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[35, 45, 35]} intensity={1.2} color="#fffef0" />
      <pointLight position={[0, 35, 35]} intensity={1.2} color="#00d4ff" decay={1} />

      <Stars radius={110} depth={55} count={3000} factor={4} saturation={0} fade speed={0.3} />

      <Grid
        args={[120, 120]}
        cellSize={15}
        cellThickness={0.2}
        cellColor="rgba(0, 212, 255, 0.08)"
        sectionSize={30}
        sectionThickness={0.4}
        sectionColor="rgba(59, 130, 246, 0.15)"
        fadeDistance={70}
        fadeStrength={0.25}
        position={[0, -0.1, 0]}
      />

      <ParticleSystem />

      {/* 校园建筑 */}
      <SchoolGate position={[0, 0, 40]} />
      <MainBuilding position={[0, 0, 10]} />
    </>
  )
}

// 相机控制
const CameraController = () => {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.012
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.06) * 0.04
    }
  })
  
  return (
    <group ref={groupRef}>
      <perspectiveCamera
        makeDefault
        position={[0, 16, 55]}
        fov={50}
        near={0.1}
        far={200}
      />
    </group>
  )
}

const LoginScene3D = () => {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'absolute', 
      top: 0, 
      left: 0,
      zIndex: 0
    }}>
      <Canvas shadows dpr={[1, 2]}>
        <CameraController />
        <SceneContent />
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}

export default LoginScene3D
