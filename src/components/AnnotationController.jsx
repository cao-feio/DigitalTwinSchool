import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const ArrowAxis = ({ axis, color, onClick, onDrag, isDragging }) => {
  const groupRef = useRef()
  const arrowLength = 2
  const arrowRadius = 0.15
  const headLength = 0.3
  const headRadius = 0.25

  const direction = new THREE.Vector3(
    axis === 'x' ? 1 : 0,
    axis === 'y' ? 1 : 0,
    axis === 'z' ? 1 : 0
  )

  return (
    <group ref={groupRef}>
      {/* Arrow shaft */}
      <mesh
        position={[
          direction.x * arrowLength / 2,
          direction.y * arrowLength / 2,
          direction.z * arrowLength / 2
        ]}
        rotation={[
          axis === 'y' ? 0 : axis === 'z' ? Math.PI / 2 : 0,
          axis === 'x' ? Math.PI / 2 : 0,
          0
        ]}
      >
        <cylinderGeometry args={[arrowRadius, arrowRadius, arrowLength, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isDragging ? 1 : 0.3}
          transparent
          opacity={isDragging ? 1 : 0.8}
        />
      </mesh>

      {/* Arrow head */}
      <mesh
        position={[
          direction.x * arrowLength,
          direction.y * arrowLength,
          direction.z * arrowLength
        ]}
        rotation={[
          axis === 'y' ? 0 : axis === 'z' ? Math.PI / 2 : 0,
          axis === 'x' ? Math.PI / 2 : 0,
          0
        ]}
      >
        <coneGeometry args={[headRadius, headLength, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isDragging ? 1 : 0.3}
          transparent
          opacity={isDragging ? 1 : 0.8}
        />
      </mesh>
    </group>
  )
}

const ScaleGizmo = ({ onScale, isDragging }) => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']
  const size = 0.3

  return (
    <group>
      {/* Scale box corners */}
      {[
        [1, 1, 1], [-1, 1, 1], [1, -1, 1], [1, 1, -1],
        [-1, -1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, -1]
      ].map((pos, i) => (
        <mesh key={i} position={pos.map(v => v * 1.5)}>
          <boxGeometry args={[size, size, size]} />
          <meshStandardMaterial
            color={colors[i % colors.length]}
            emissive={colors[i % colors.length]}
            emissiveIntensity={isDragging ? 1 : 0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

const AnnotationController = ({
  position,
  size,
  isSelected,
  onSelect,
  onMove,
  onScale,
  onDelete
}) => {
  const [activeAxis, setActiveAxis] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartPos, setDragStartPos] = useState(null)
  const [dragStartAnnotPos, setDragStartAnnotPos] = useState(null)
  const [showMenu, setShowMenu] = useState(false)

  if (!isSelected) return null

  return (
    <group position={position}>
      {/* Arrow axes */}
      <ArrowAxis axis="x" color="#ff0000" />
      <ArrowAxis axis="y" color="#00ff00" />
      <ArrowAxis axis="z" color="#0000ff" />

      {/* Scale gizmo */}
      <ScaleGizmo />

      {/* Floating menu */}
      <group position={[0, size * 3, 0]}>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} />
        </mesh>
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.3}
          color="#fff"
          anchorX="center"
          anchorY="middle"
        >
          {showMenu ? '▼' : '▲'}
        </Text>

        {showMenu && (
          <group position={[0, -0.8, 0]}>
            {/* Delete button */}
            <mesh position={[0, 0, 0]} onPointerOver={(e) => { e.stopPropagation() }}>
              <boxGeometry args={[1.2, 0.4, 0.2]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
            <Text position={[0, 0.05, 0.15]} fontSize={0.2} color="#fff" anchorX="center">
              删除
            </Text>
          </group>
        )}
      </group>
    </group>
  )
}

export default AnnotationController
