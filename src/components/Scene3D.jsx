import React, { Suspense, useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky, Grid, Text, TransformControls } from '@react-three/drei'
import { useStore } from '@/store/useStore'
import Terrain from './Terrain'
import Buildings from './Buildings'
import Pipes from './Pipes'
import Annotations from './Annotations'
import Measurements from './Measurements'
import ModelLibrary from './ModelLibrary'
import * as THREE from 'three'

const isWebGLSupported = () => {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

const StaticFallbackBackground = () => (
  <div style={{
    width: '100%',
    height: '100%',
    background: `
      radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.12) 0%, transparent 35%),
      linear-gradient(135deg, #010a1f 0%, #01153c 50%, #000c2a 100%)
    `,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#e2e8f0'
  }}>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        linear-gradient(rgba(0, 212, 255, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 212, 255, 0.08) 1px, transparent 1px)
      `,
      backgroundSize: '30px 30px',
      animation: 'gridMove 20s linear infinite'
    }} />
    <div style={{
      position: 'absolute',
      top: '10%',
      left: '10%',
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'pulse-glow 8s ease-in-out infinite'
    }} />
    <div style={{
      position: 'absolute',
      bottom: '15%',
      right: '15%',
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'pulse-glow 10s ease-in-out infinite 2s'
    }} />
    <div style={{ textAlign: 'center', zIndex: 10, padding: '40px' }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏫</div>
      <h1 style={{
        fontSize: '28px',
        color: '#00d4ff',
        marginBottom: '16px',
        textShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
      }}>
        数字孪生校园平台
      </h1>
      <p style={{
        fontSize: '14px',
        color: '#94a3b8',
        maxWidth: '400px',
        lineHeight: '1.8'
      }}>
        WebGL 渲染环境不可用
        <br />
        但您可以继续使用其他功能
      </p>
    </div>
    <style>{`
      @keyframes gridMove {
        0% { background-position: 0 0; }
        100% { background-position: 30px 30px; }
      }
      @keyframes pulse-glow {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
      }
    `}</style>
  </div>
)

class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    console.error('3D 场景错误:', error)
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Scene3D 错误详情:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <StaticFallbackBackground />
    }
    return this.props.children
  }
}

const CameraController = () => {
  const { selectedModel, transformMode, cameraTarget } = useStore()
  const { camera } = useThree()
  const controls = useRef()
  const [isMoving, setIsMoving] = useState(false)
  const targetPosition = useRef(null)
  const targetLookAt = useRef(null)
  const lastSelectedModelId = useRef(null)
  const lastCameraTarget = useRef(null)

  useEffect(() => {
    if (selectedModel && selectedModel.position && selectedModel.id !== lastSelectedModelId.current) {
      lastSelectedModelId.current = selectedModel.id
      const [x, y, z] = selectedModel.position
      targetPosition.current = new THREE.Vector3(x, y + 30, z + 40)
      targetLookAt.current = new THREE.Vector3(x, y + 10, z)
      setIsMoving(true)
    }
  }, [selectedModel?.id])

  useEffect(() => {
    if (cameraTarget && cameraTarget !== lastCameraTarget.current) {
      lastCameraTarget.current = cameraTarget
      const [x, y, z] = cameraTarget
      targetPosition.current = new THREE.Vector3(x, y + 30, z + 40)
      targetLookAt.current = new THREE.Vector3(x, y, z)
      setIsMoving(true)
    }
  }, [cameraTarget])

  useFrame(() => {
    if (isMoving && targetPosition.current && targetLookAt.current) {
      const distance = camera.position.distanceTo(targetPosition.current)
      
      if (distance > 0.5) {
        camera.position.lerp(targetPosition.current, 0.05)
        if (controls.current && controls.current.target) {
          controls.current.target.lerp(targetLookAt.current, 0.05)
        }
      } else {
        setIsMoving(false)
      }
    }
  })

  const orbitEnabled = !transformMode;

  return (
    <OrbitControls 
      ref={controls}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2 - 0.08}
      maxDistance={500}
      minDistance={5}
      enableDamping
      dampingFactor={0.05}
      makeDefault
      enablePan={orbitEnabled}
      enableRotate={orbitEnabled}
      enableZoom={orbitEnabled}
      mouseButtons={{
        LEFT: 0,
        MIDDLE: 2,
        RIGHT: 1
      }}
      onStart={() => {
        setIsMoving(false)
      }}
    />
  )
}

const Clouds = () => {
  const cloudData = React.useMemo(() => {
    return [...Array(10)].map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 300
      ],
      spheres: [...Array(6)].map(() => ({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 20
        ],
        scale: 8 + Math.random() * 6,
        opacity: 0.6 + Math.random() * 0.3
      }))
    }))
  }, [])

  return (
    <group position={[0, 80, 0]}>
      {cloudData.map((cloud, i) => (
        <group key={i} position={cloud.position}>
          {cloud.spheres.map((sphere, j) => (
            <mesh key={j} position={sphere.position}>
              <sphereGeometry args={[sphere.scale, 16, 12]} />
              <meshStandardMaterial 
                color="#ffffff"
                transparent
                opacity={sphere.opacity}
                roughness={1}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

const Sun = () => {
  return (
    <group position={[100, 100, 80]}>
      <mesh>
        <sphereGeometry args={[15, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffcc"
          emissive="#ffdd66"
          emissiveIntensity={2}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      <mesh scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffaa"
          transparent
          opacity={0.3}
          emissive="#ffcc44"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}

const SimpleTextureMaterial = ({ imageUrl, color, transparent = false, opacity = 1, depthWrite = true }) => {
  const texture = useMemo(() => {
    if (!imageUrl) return null;
    
    const tex = new THREE.TextureLoader().load(imageUrl);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    return tex;
  }, [imageUrl]);

  if (imageUrl) {
    return <meshStandardMaterial map={texture} side={THREE.DoubleSide} transparent={transparent} opacity={opacity} depthWrite={depthWrite} />;
  }

  return <meshStandardMaterial 
    color={color} 
    side={THREE.DoubleSide} 
    transparent={transparent} 
    opacity={opacity} 
    depthWrite={depthWrite}
  />;
}

const BuildingPreview = () => {
  const { buildingPoints, buildingHeight, buildingColor, buildingImage } = useStore()
  
  if (buildingPoints.length < 1) return null

  let previewMesh = null
  
  if (buildingPoints.length >= 3) {
    try {
      const shape = new THREE.Shape()
      buildingPoints.forEach((p, i) => {
        if (i === 0) shape.moveTo(p[0], p[2])
        else shape.lineTo(p[0], p[2])
      })
      shape.closePath()

      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: buildingHeight,
        bevelEnabled: false
      })
      geometry.rotateX(Math.PI / 2)

      previewMesh = (
        <mesh geometry={geometry} position={[0, buildingHeight / 2, 0]}>
          <SimpleTextureMaterial imageUrl={buildingImage} color={buildingColor} />
        </mesh>
      )
    } catch (e) {
      console.error('预览几何体创建失败', e)
    }
  }

  return (
    <group>
      {buildingPoints.map((p, i) => (
        <mesh key={`point-${i}`} position={[p[0], 0.1, p[2]]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} />
        </mesh>
      ))}
      
      {previewMesh}
    </group>
  )
}

const GroundInteractor = () => {
  const { 
    currentTool, 
    addBuildingPoint, 
    addMeasurementPoint, 
    measurementMode, 
    isBuilding, 
    analysisMode, 
    setAnalysisViewpoint,
    isMovingModel,
    isRotatingModel,
    selectedModel,
    updateModel,
    moveStartPosition,
    setMoveStartPosition,
    finishCurrentMeasurement,
    isSelectingAnnotationPosition,
    setTempAnnotationPosition,
    cancelSelectingAnnotationPosition
  } = useStore()
  
  const [isDragging, setIsDragging] = useState(false);
  const groundRef = useRef()
  const clickTimeout = useRef(null)

  const calculateModelCenter = (model) => {
    if (!model.points || model.points.length < 1) return [0, 0, 0];
    const centerX = model.points.reduce((sum, p) => sum + p[0], 0) / model.points.length;
    const centerZ = model.points.reduce((sum, p) => sum + p[2], 0) / model.points.length;
    return [centerX, 0, centerZ];
  };
  
  const moveModelToPosition = (targetWorldX, targetWorldZ) => {
    if (!selectedModel) return;
    const originalCenter = calculateModelCenter(selectedModel);
    const currentOffset = selectedModel.offset || [0, 0, 0];
    const newOffsetX = targetWorldX - originalCenter[0];
    const newOffsetZ = targetWorldZ - originalCenter[2];
    
    updateModel(selectedModel.id, {
      offset: [newOffsetX, currentOffset[1], newOffsetZ]
    });
  };
  
  const handleClick = (e) => {
    e.stopPropagation()
    if (!e.point) return
    
    const point = e.point
    const x = point.x || 0
    const y = point.y || 0
    const z = point.z || 0
    
    if (isSelectingAnnotationPosition) {
      setTempAnnotationPosition([x, y + 1, z])
    } else if (isMovingModel && selectedModel) {
      moveModelToPosition(x, z);
    } else if (isRotatingModel) {
      return;
    } else if (currentTool === 'modeling') {
      addBuildingPoint([x, y, z])
    } else if (currentTool === 'measure' && measurementMode) {
      if (clickTimeout.current) return;
      addMeasurementPoint([x, y, z])
    } else if (currentTool === 'analysis' && analysisMode) {
      setAnalysisViewpoint([x, y + 2, z])
    }
  }

  const handleDoubleClick = (e) => {
    e.stopPropagation()
    if (currentTool === 'measure' && measurementMode) {
      finishCurrentMeasurement()
    }
  }

  const handlePointerDown = (e) => {
    if (isMovingModel && selectedModel && e.point) {
      setIsDragging(true);
      setMoveStartPosition([e.point.x, e.point.y, e.point.z]);
    }
  };

  const handlePointerMove = (e) => {
    if (isDragging && isMovingModel && selectedModel && e.point) {
      moveModelToPosition(e.point.x, e.point.z);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <mesh 
      ref={groundRef}
      position={[0, -0.01, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <planeGeometry args={[400, 400]} />
      <meshStandardMaterial 
        color="transparent" 
        transparent 
        opacity={0} 
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

const SingleUserBuilding = ({ building, isFaded: externalIsFaded }) => {
  const { 
    selectedModel, 
    setSelectedModel, 
    transformMode,
    updateModel,
    hasSelectedPipe
  } = useStore();
  const isFaded = hasSelectedPipe || externalIsFaded

  const meshRef = useRef(null);
  const offset = building.offset || [0, 0, 0];
  const rotation = building.rotation || 0;
  const isSelected = selectedModel?.id === building.id;

  const { centerX, centerZ, geometry } = useMemo(() => {
    if (!building.points || building.points.length < 3) return { centerX: 0, centerZ: 0, geometry: null }
    try {
      const centerX = building.points.reduce((sum, p) => sum + p[0], 0) / building.points.length;
      const centerZ = building.points.reduce((sum, p) => sum + p[2], 0) / building.points.length;

      const shape = new THREE.Shape()
      building.points.forEach((p, i) => {
        const [x, y, z] = p
        const finalX = x - centerX;
        const finalZ = z - centerZ;
        if (i === 0) shape.moveTo(finalX, finalZ)
        else shape.lineTo(finalX, finalZ)
      })
      shape.closePath()

      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: building.height || 10,
        bevelEnabled: false
      })

      geo.rotateX(Math.PI / 2)
      return { centerX, centerZ, geometry: geo }
    } catch (e) {
      console.error('创建用户建筑几何体失败', e)
      return { centerX: 0, centerZ: 0, geometry: null };
    }
  }, [building.points, building.height])

  if (!geometry) return null

  const worldX = centerX + offset[0];
  const worldY = (building.height || 10) / 2 + offset[1];
  const worldZ = centerZ + offset[2];
  const radRotation = (rotation || 0) * Math.PI / 180;

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.set(worldX, worldY, worldZ);
      meshRef.current.rotation.set(0, radRotation, 0);
    }
  }, [building.id]);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setSelectedModel(selectedModel?.id === building.id ? null : building);
  }

  const handleTransformChange = () => {
    if (meshRef.current && isSelected && transformMode) {
      setTimeout(() => {
        const pos = meshRef.current.position;
        const rot = meshRef.current.rotation;
        
        const newOffsetX = pos.x - centerX;
        const newOffsetZ = pos.z - centerZ;
        const newOffsetY = pos.y - (building.height || 10) / 2;
        
        const newRotation = THREE.MathUtils.radToDeg(rot.y);

        updateModel(building.id, {
          offset: [newOffsetX, newOffsetY, newOffsetZ],
          rotation: newRotation
        });
      }, 0);
    }
  }

  return (
    <group>
      <mesh 
        ref={meshRef}
        geometry={geometry} 
        onPointerDown={handlePointerDown}
      >
        <SimpleTextureMaterial 
          imageUrl={building.image} 
          color={isSelected ? '#00ffff' : (building.color || '#ff6b00')} 
          transparent={isFaded && !isSelected}
          opacity={isFaded && !isSelected ? 0.15 : 1}
          depthWrite={!(isFaded && !isSelected)}
          depthTest={false}
        />
      </mesh>

      {isSelected && transformMode && meshRef.current && (
        <TransformControls
          object={meshRef.current}
          mode={transformMode}
          onObjectChange={handleTransformChange}
        />
      )}
    </group>
  )
}

const UserBuildings = ({ isFaded: externalIsFaded }) => {
  const { models, hasSelectedPipe, modelVisibility } = useStore()
  const isFaded = hasSelectedPipe || externalIsFaded
  
  const userBuildings = models.filter(m => m.points && m.points.length >= 3)
  
  return (
    <group>
      {userBuildings.map((building) => {
        if (modelVisibility[building.id] === false) return null
        return <SingleUserBuilding key={building.id} building={building} isFaded={isFaded} />
      })}
    </group>
  )
}

const AnnotationPositionPreview = () => {
  const { tempAnnotationPosition, isSelectingAnnotationPosition, newAnnotation } = useStore()
  
  if (!isSelectingAnnotationPosition || !tempAnnotationPosition) return null

  const size = newAnnotation?.size || 1

  return (
    <group position={tempAnnotationPosition}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5 * size, 0.8 * size, 32]} />
        <meshBasicMaterial 
          color="#00d4ff" 
          transparent 
          opacity={0.6} 
          side={THREE.DoubleSide} 
        />
      </mesh>
      
      <mesh position={[0, -tempAnnotationPosition[1] / 2, 0]}>
        <cylinderGeometry args={[0.03 * size, 0.03 * size, tempAnnotationPosition[1], 8]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} />
      </mesh>
      
      <mesh>
        <boxGeometry args={[1.2 * size, 1.2 * size, 1.2 * size]} />
        <meshStandardMaterial 
          color="#00d4ff" 
          transparent 
          opacity={0.3} 
          emissive="#00d4ff"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      <Text
        position={[0, 2.5 * size, 0]}
        color="#00d4ff"
        fontSize={1 * size}
        anchorX="center"
        anchorY="middle"
      >
        点击放置
      </Text>
    </group>
  )
}

const ViewShedAnalysis = () => {
  const { analysisViewpoint } = useStore()
  
  if (!analysisViewpoint) return null

  const range = 100
  const segments = 32

  return (
    <group>
      <group position={analysisViewpoint}>
        <mesh>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[0, 3, 0]} color="#3b82f6" fontSize={1.2} anchorX="center">视点</Text>
      </group>

      <mesh position={analysisViewpoint}>
        <coneGeometry args={[range, range * 0.5, segments, 1, true]} />
        <meshBasicMaterial color="rgba(59, 130, 246, 0.1)" side={THREE.DoubleSide} transparent />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[analysisViewpoint[0], 0.01, analysisViewpoint[2]]}>
        <ringGeometry args={[0, range, segments]} />
        <meshBasicMaterial color="rgba(59, 130, 246, 0.2)" side={THREE.DoubleSide} transparent />
      </mesh>
    </group>
  )
}

const SunlightAnalysis = () => {
  const { sunPosition, analysisViewpoint } = useStore()
  
  const azimuthRad = THREE.MathUtils.degToRad(sunPosition.azimuth)
  const altitudeRad = THREE.MathUtils.degToRad(sunPosition.altitude)
  const distance = 200
  const sunX = Math.sin(azimuthRad) * Math.cos(altitudeRad) * distance
  const sunY = Math.sin(altitudeRad) * distance
  const sunZ = Math.cos(azimuthRad) * Math.cos(altitudeRad) * distance

  return (
    <group>
      <group position={[sunX, sunY, sunZ]}>
        <mesh>
          <sphereGeometry args={[8, 32, 32]} />
          <meshBasicMaterial color="#ffdd44" />
        </mesh>
        <pointLight color="#fff" intensity={3} distance={500} decay={2} />
      </group>

      {analysisViewpoint && (
        <>
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([sunX, sunY, sunZ, analysisViewpoint[0], analysisViewpoint[1], analysisViewpoint[2]])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#ffdd44" transparent opacity={0.5} />
          </line>
          
          <group position={analysisViewpoint}>
            <mesh>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color="#f59e0b" />
            </mesh>
            <Text position={[0, 3, 0]} color="#f59e0b" fontSize={1.2} anchorX="center">分析点</Text>
          </group>
        </>
      )}

      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[400, 400]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </group>
  )
}

const Scene3DContent = () => {
  const { layers, analysisMode, hasSelectedPipe, setSelectedPipe, setHasSelectedPipe, selectedPipe } = useStore()

  const handleSceneClick = (e) => {
    // 暂时禁用点击空白处取消管线选中的功能，避免误触发
  }

  return (
    <Canvas
      shadows
      camera={{ 
        position: [70, 50, 70], 
        fov: 50,
        near: 0.1,
        far: 2000
      }}
      gl={{ 
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        shadowMapType: THREE.PCFSoftShadowMap,
        logarithmicDepthBuffer: true
      }}
      onClick={handleSceneClick}
    >
      <Sky sunPosition={[100, 100, 80]} turbidity={0.3} rayleigh={0.5} mieCoefficient={0.007} />
      
      <ambientLight intensity={1.5} color="#e0f0ff" />
      
      <directionalLight
        position={[100, 100, 80]}
        intensity={2.5}
        color="#fffef0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      >
        <orthographicCamera attach="shadow-camera" args={[-200, 200, 200, -200, 0.1, 1000]} />
      </directionalLight>
      
      <hemisphereLight intensity={1.0} groundColor="#3a5a3a" skyColor="#87ceeb" />

      <Sun />
      <Clouds />
      
      <Grid
        args={[400, 400]}
        cellSize={20}
        cellThickness={0.4}
        cellColor="rgba(59, 130, 246, 0.1)"
        sectionSize={100}
        sectionThickness={0.6}
        sectionColor="rgba(59, 130, 246, 0.2)"
        fadeDistance={400}
        fadeStrength={0}
      />

      <Suspense fallback={null}>
        {layers.terrain && <Terrain isFaded={hasSelectedPipe} />}
        {layers.buildings && <Buildings isFaded={hasSelectedPipe} />}
        {layers.buildings && <UserBuildings isFaded={hasSelectedPipe} />}
        {layers.plants && <ModelLibrary type="plants" isFaded={hasSelectedPipe} />}
        {layers.pipes && <Pipes />}
        {layers.annotations && <Annotations />}
        
        <GroundInteractor />
        <Measurements />
        <BuildingPreview />
        <AnnotationPositionPreview />
        
        {analysisMode === 'viewshed' && <ViewShedAnalysis />}
        {analysisMode === 'sunlight' && <SunlightAnalysis />}
      </Suspense>
      
      <CameraController />
    </Canvas>
  )
}

const Scene3D = () => {
  const [webglSupported, setWebglSupported] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 默认假设WebGL是支持的，先尝试渲染3D场景
    const supported = isWebGLSupported()
    console.log('WebGL支持检测:', supported)
    setWebglSupported(true) // 强制开启，让我们先尝试渲染
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #010a1f 0%, #01153c 50%, #000c2a 100%)',
        color: '#00d4ff',
        fontSize: '20px'
      }}>
        正在加载3D场景...
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: '100%' }} id="canvas-container">
      <SceneErrorBoundary fallback={<StaticFallbackBackground />}>
        <Suspense fallback={
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #010a1f 0%, #01153c 50%, #000c2a 100%)',
            color: '#00d4ff',
            fontSize: '20px'
          }}>
            正在加载3D资源...
          </div>
        }>
          <Scene3DContent />
        </Suspense>
      </SceneErrorBoundary>
    </div>
  )
}

export default Scene3D
