import React from 'react'
import { Cylinder, Sphere, Box, Cone } from '@react-three/drei'
import { useStore } from '@/store/useStore'

export const defaultPlantData = [
  {
    id: 'tree-1',
    name: '雪松1',
    type: 'tree',
    subtype: 'cedar',
    position: [-70, 0, 20],
    height: 8,
    color: '#2ecc71',
    description: '校园景观雪松'
  },
  {
    id: 'tree-2',
    name: '雪松2',
    type: 'tree',
    subtype: 'cedar',
    position: [70, 0, 20],
    height: 9,
    color: '#27ae60',
    description: '校园景观雪松'
  },
  {
    id: 'tree-3',
    name: '梧桐1',
    type: 'tree',
    subtype: 'plane',
    position: [-30, 0, 30],
    height: 12,
    color: '#1abc9c',
    description: '法国梧桐'
  },
  {
    id: 'tree-4',
    name: '梧桐2',
    type: 'tree',
    subtype: 'plane',
    position: [30, 0, 30],
    height: 11,
    color: '#16a085',
    description: '法国梧桐'
  },
  {
    id: 'tree-5',
    name: '银杏1',
    type: 'tree',
    subtype: 'ginkgo',
    position: [-50, 0, -30],
    height: 10,
    color: '#f1c40f',
    description: '秋季金黄银杏'
  },
  {
    id: 'tree-6',
    name: '银杏2',
    type: 'tree',
    subtype: 'ginkgo',
    position: [50, 0, -30],
    height: 10,
    color: '#f39c12',
    description: '秋季金黄银杏'
  },
  {
    id: 'shrub-1',
    name: '灌木丛1',
    type: 'shrub',
    position: [-20, 0, 80],
    height: 1.5,
    color: '#27ae60',
    description: '装饰灌木'
  },
  {
    id: 'shrub-2',
    name: '灌木丛2',
    type: 'shrub',
    position: [20, 0, 80],
    height: 1.8,
    color: '#2ecc71',
    description: '装饰灌木'
  },
  {
    id: 'shrub-3',
    name: '灌木丛3',
    type: 'shrub',
    position: [-20, 0, -80],
    height: 1.6,
    color: '#1abc9c',
    description: '装饰灌木'
  },
  {
    id: 'shrub-4',
    name: '灌木丛4',
    type: 'shrub',
    position: [20, 0, -80],
    height: 1.7,
    color: '#16a085',
    description: '装饰灌木'
  },
  {
    id: 'grass-1',
    name: '草坪1',
    type: 'grass',
    position: [0, 0, 0],
    color: '#27ae60',
    description: '中心草坪'
  }
]

const Tree = ({ data, isSelected, isFaded, onClick }) => {
  const { subtype = 'cedar', height, color } = data
  
  return (
    <group position={data.position} onClick={onClick}>
      {/* 树干 */}
      <Cylinder position={[0, height * 0.2, 0]} args={[height * 0.1, height * 0.15, height * 0.4, 12]}>
        <meshStandardMaterial 
          color="#8b4513" 
          transparent={isFaded} 
          opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
        />
      </Cylinder>
      
      {/* 树冠 */}
      {subtype === 'cedar' ? (
        <group>
          {[0, 1, 2, 3].map(i => (
            <Cone
              key={i}
              position={[0, height * 0.4 + i * height * 0.15, 0]}
              args={[height * (0.4 - i * 0.08), height * 0.2, 12]}
            >
              <meshStandardMaterial 
                color={isSelected ? '#ffcc00' : color} 
                emissive={isSelected ? '#ffcc00' : color}
                emissiveIntensity={isSelected ? 0.2 : 0}
                transparent={isFaded}
                opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false}
              />
            </Cone>
          ))}
        </group>
      ) : subtype === 'plane' ? (
        <Sphere position={[0, height * 0.65, 0]} args={[height * 0.35, 16, 16]}>
          <meshStandardMaterial 
            color={isSelected ? '#ffcc00' : color} 
            emissive={isSelected ? '#ffcc00' : color}
            emissiveIntensity={isSelected ? 0.2 : 0}
            transparent={isFaded}
            opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false}
          />
        </Sphere>
      ) : (
        <group>
          {[0, 1, 2].map(i => (
            <Sphere
              key={i}
              position={[0, height * 0.45 + i * height * 0.2, 0]}
              args={[height * (0.35 - i * 0.05), 16, 16]}
            >
              <meshStandardMaterial 
                color={isSelected ? '#ffcc00' : color} 
                emissive={isSelected ? '#ffcc00' : color}
                emissiveIntensity={isSelected ? 0.2 : 0}
                transparent={isFaded}
                opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false}
              />
            </Sphere>
          ))}
        </group>
      )}
    </group>
  )
}

const Shrub = ({ data, isSelected, isFaded, onClick }) => {
  return (
    <group position={data.position} onClick={onClick}>
      {[-0.5, 0, 0.5].map((x, i) => 
        [-0.5, 0, 0.5].map((z, j) => (
          <Sphere
            key={`${i}-${j}`}
            position={[x, data.height * 0.4 + (i + j) * 0.1, z]}
            args={[data.height * 0.4, 12, 12]}
          >
            <meshStandardMaterial 
              color={isSelected ? '#ffcc00' : data.color} 
              emissive={isSelected ? '#ffcc00' : data.color}
              emissiveIntensity={isSelected ? 0.2 : 0}
              transparent={isFaded}
              opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false}
            />
          </Sphere>
        ))
      )}
    </group>
  )
}

const Grass = ({ data, isSelected, isFaded, onClick }) => {
  return (
    <group position={data.position} onClick={onClick}>
      {Array.from({ length: 100 }).map((_, i) => (
        <Box
          key={i}
          position={[
            (Math.random() - 0.5) * 200,
            0.1,
            (Math.random() - 0.5) * 200
          ]}
          args={[0.05, 0.2 + Math.random() * 0.2, 0.05]}
        >
          <meshStandardMaterial 
            color={isSelected ? '#ffcc00' : (Math.random() > 0.5 ? '#27ae60' : '#2ecc71')} 
            transparent={isFaded}
            opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false}
          />
        </Box>
      ))}
    </group>
  )
}

const Plant = ({ data, isSelected, isFaded, onClick }) => {
  switch (data.type) {
    case 'tree': return <Tree data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
    case 'shrub': return <Shrub data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
    case 'grass': return <Grass data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
    default: return <Tree data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
  }
}

const ModelLibrary = ({ type = 'plants', isFaded: externalIsFaded }) => {
  const { selectedModel, setSelectedModel, modelVisibility, hasSelectedPipe, currentTool } = useStore()
  const isFaded = hasSelectedPipe || externalIsFaded || currentTool === 'pipes'

  const plantsData = defaultPlantData

  return (
    <group>
      {plantsData.map(plant => {
        if (modelVisibility[plant.id] === false) return null
        const isSelected = selectedModel?.id === plant.id
        
        return (
          <Plant
            key={plant.id}
            data={plant}
            isSelected={isSelected}
            isFaded={isFaded && !isSelected}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedModel(plant)
            }}
          />
        )
      })}
    </group>
  )
}

export default ModelLibrary
