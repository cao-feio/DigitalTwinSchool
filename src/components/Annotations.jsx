import React, { useRef, useState } from 'react'
import { Text, TransformControls } from '@react-three/drei'
import { useStore } from '@/store/useStore'
import * as THREE from 'three'

const getGeometry = (style, size) => {
  switch (style) {
    case 'sphere':
      return <sphereGeometry args={[1 * size, 16, 16]} />
    case 'cylinder':
      return <cylinderGeometry args={[0.6 * size, 0.6 * size, 1.5 * size, 16]} />
    case 'cone':
      return <coneGeometry args={[0.8 * size, 2 * size, 16]} />
    case 'box':
    default:
      return <boxGeometry args={[1.2 * size, 1.2 * size, 1.2 * size]} />
  }
}

const SingleAnnotation = ({ annotation }) => {
  const { 
    selectedAnnotationId, 
    setSelectedAnnotationId, 
    transformMode,
    updateAnnotation
  } = useStore();

  const groupRef = useRef(null);
  const position = annotation.position || [0, 0, 0];
  const rotation = annotation.rotation || [0, 0, 0];
  const isSelected = selectedAnnotationId === annotation.id;

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setSelectedAnnotationId(isSelected ? null : annotation.id);
  }

  const handleTransformChange = () => {
    if (groupRef.current && isSelected && transformMode) {
      setTimeout(() => {
        if (transformMode === 'translate') {
          const pos = groupRef.current.position;
          updateAnnotation(annotation.id, { position: [pos.x, pos.y, pos.z] });
        } else if (transformMode === 'scale') {
          const scale = groupRef.current.scale;
          const avgScale = (scale.x + scale.y + scale.z) / 3;
          const newSize = Math.max(0.5, Math.min(3, (annotation.size || 1) * avgScale));
          updateAnnotation(annotation.id, { size: newSize });
          groupRef.current.scale.set(1, 1, 1);
        } else if (transformMode === 'rotate') {
          const rot = groupRef.current.rotation;
          updateAnnotation(annotation.id, { rotation: [rot.x, rot.y, rot.z] });
        }
      }, 0);
    }
  }

  return (
    <group>
      <group 
        ref={groupRef} 
        position={position}
        rotation={rotation}
      >
        {/* Main annotation geometry */}
        <mesh onPointerDown={handlePointerDown}>
          {getGeometry(annotation.style || 'box', annotation.size || 1)}
          <meshStandardMaterial
            color={annotation.color || '#00ffff'}
            emissive={annotation.color || '#00ffff'}
            emissiveIntensity={isSelected ? 0.6 : 0.3}
            metalness={0.1}
            roughness={0.4}
          />
        </mesh>

        {/* Text label */}
        <Text
          position={[0, 2.5 * (annotation.size || 1), 0]}
          color="#ffffff"
          fontSize={1 * (annotation.size || 1)}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02 * (annotation.size || 1)}
          outlineColor="#000000"
        >
          {annotation.text || '标注'}
        </Text>

        {/* Indicator cone */}
        <mesh position={[0, 1 * (annotation.size || 1), 0]}>
          <coneGeometry args={[0.15 * (annotation.size || 1), 0.8 * (annotation.size || 1), 16]} />
          <meshStandardMaterial
            color={annotation.color || '#00ffff'}
            emissive={annotation.color || '#00ffff'}
            emissiveIntensity={isSelected ? 0.6 : 0.3}
          />
        </mesh>
      </group>

      {/* Transform Controls */}
      {isSelected && transformMode && groupRef.current && (
        <TransformControls
          object={groupRef.current}
          mode={transformMode}
          onObjectChange={handleTransformChange}
        />
      )}
    </group>
  )
}

const Annotations = () => {
  const { annotations } = useStore()

  return (
    <group>
      {annotations.map((annotation) => {
        if (!annotation.visible) return null
        return <SingleAnnotation key={annotation.id} annotation={annotation} />
      })}
    </group>
  )
}

export default Annotations
