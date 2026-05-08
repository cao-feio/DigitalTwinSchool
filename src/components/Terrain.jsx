import React from 'react'
import { Box, Cylinder, Cone } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '@/store/useStore'

const Terrain = ({ isFaded: externalIsFaded }) => {
  const { hasSelectedPipe, currentTool } = useStore()
  const isFaded = hasSelectedPipe || externalIsFaded || currentTool === 'pipes'
  return (
    <group>
      {/* 基础地面 - 单一地面，无重叠 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[400, 400, 64, 64]} />
        <meshStandardMaterial
          color="#2a5a3e"
          roughness={0.85}
          metalness={0.05}
          transparent={isFaded}
          opacity={isFaded ? 0.08 : 1} 
          depthWrite={!isFaded} 
          depthTest={true}
        />
      </mesh>

      {/* 道路 - 使用足够高的Y值，避免z-fighting */}
      <RoadNetwork isFaded={isFaded} />

      {/* 操场 - 移到不与建筑重叠的位置 */}
      <Playground position={[100, 0.3, -50]} isFaded={isFaded} />
      <Playground position={[-100, 0.3, -50]} isFaded={isFaded} />
      
      {/* 篮球场 - 调整位置 */}
      <BasketballCourt position={[-90, 0.3, 20]} isFaded={isFaded} />
      <BasketballCourt position={[-90, 0.3, 50]} isFaded={isFaded} />
      
      {/* 网球场 - 调整位置 */}
      <TennisCourt position={[90, 0.3, 20]} isFaded={isFaded} />
      <TennisCourt position={[90, 0.3, 50]} isFaded={isFaded} />

      {/* 广场 - 移到建筑附近 */}
      <Plaza position={[0, 0.3, 25]} isFaded={isFaded} />
      <Plaza position={[95, 0.3, 0]} isFaded={isFaded} />

      {/* 停车场 - 调整到边缘 */}
      <ParkingLot position={[-85, 0.3, -10]} isFaded={isFaded} />
      <ParkingLot position={[85, 0.3, -10]} isFaded={isFaded} />

      {/* 湖泊 - 移到不与建筑重叠的位置 */}
      <Pond position={[0, 0.3, -90]} isFaded={isFaded} />
      <Pond position={[0, 0.3, 90]} isFaded={isFaded} />
      
      {/* 山丘 - 移到更远的角落 */}
      <LandscapeHill position={[-120, 0, 60]} isFaded={isFaded} />
      <LandscapeHill position={[120, 0, 60]} isFaded={isFaded} />
    </group>
  )
}

const Playground = ({ position, isFaded }) => (
  <group position={position}>
    {/* 草坪 */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[25, 64]} />
      <meshStandardMaterial 
        color="#3a7a4a" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
    {/* 跑道 */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]} receiveShadow>
      <ringGeometry args={[20, 25, 64]} />
      <meshStandardMaterial 
        color="#e07020" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
    {/* 足球场 */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.4, 0]} receiveShadow>
      <planeGeometry args={[30, 20]} />
      <meshStandardMaterial 
        color="#5a9a5a" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
  </group>
)

const BasketballCourt = ({ position, isFaded }) => (
  <group position={position}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[28, 15]} />
      <meshStandardMaterial 
        color="#e89a3a" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
    {/* 篮筐 */}
    {[-12, 12].map(x => (
      <group key={x} position={[x, 0, 0]}>
        <Cylinder position={[0, 1.5, 0]} args={[0.1, 0.1, 3, 8]} castShadow receiveShadow>
          <meshStandardMaterial 
            color="#d4af37" 
            transparent={isFaded} 
            opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
          />
        </Cylinder>
        <Box position={[0, 3, 0]} args={[1.2, 0.05, 0.8]} castShadow receiveShadow>
          <meshStandardMaterial 
            color="#ffffff" 
            transparent={isFaded} 
            opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
          />
        </Box>
      </group>
    ))}
  </group>
)

const TennisCourt = ({ position, isFaded }) => (
  <group position={position}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[36, 18]} />
      <meshStandardMaterial 
        color="#4a7a5a" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
    {/* 网球网 */}
    <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.1, 0.9, 10.97]} />
      <meshStandardMaterial 
        color="#2a2a2a" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
  </group>
)

const RoadNetwork = ({ isFaded }) => (
  <group>
    {/* 主路 */}
    <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[12, 300]} />
      <meshStandardMaterial 
        color="#4a4a4a" 
        roughness={0.9} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
    <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[300, 12]} />
      <meshStandardMaterial 
        color="#4a4a4a" 
        roughness={0.9} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
    
    {/* 次路 - 避开建筑位置 */}
    <mesh position={[-25, 0.2, -30]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[8, 80]} />
      <meshStandardMaterial 
        color="#5a5a5a" 
        roughness={0.9} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
    <mesh position={[25, 0.2, -30]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[8, 80]} />
      <meshStandardMaterial 
        color="#5a5a5a" 
        roughness={0.9} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
    <mesh position={[-25, 0.2, 30]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[8, 60]} />
      <meshStandardMaterial 
        color="#5a5a5a" 
        roughness={0.9} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
    <mesh position={[25, 0.2, 30]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[8, 60]} />
      <meshStandardMaterial 
        color="#5a5a5a" 
        roughness={0.9} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
    {/* 外围环路 */}
    <mesh position={[-70, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[8, 180]} />
      <meshStandardMaterial 
        color="#5a5a5a" 
        roughness={0.9} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
    <mesh position={[70, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[8, 180]} />
      <meshStandardMaterial 
        color="#5a5a5a" 
        roughness={0.9} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
    <mesh position={[0, 0.2, -80]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[180, 8]} />
      <meshStandardMaterial 
        color="#5a5a5a" 
        roughness={0.9} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
    <mesh position={[0, 0.2, 80]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[180, 8]} />
      <meshStandardMaterial 
        color="#5a5a5a" 
        roughness={0.9} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
  </group>
)

const Plaza = ({ position, isFaded }) => (
  <group position={position}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[40, 30]} />
      <meshStandardMaterial 
        color="#6a6a6a" 
        roughness={0.7} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
    {/* 旗杆 */}
    <group position={[0, 0, 0]}>
      <Cylinder position={[0, 7, 0]} args={[0.15, 0.15, 14, 8]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={0.8} 
          roughness={0.2} 
          transparent={isFaded} 
          opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
        />
      </Cylinder>
      <Box position={[0, 14, 0]} args={[0.8, 0.05, 1.5]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#e74c3c" 
          transparent={isFaded} 
          opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
        />
      </Box>
    </group>
  </group>
)

const ParkingLot = ({ position, isFaded }) => (
  <group position={position}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[40, 30]} />
      <meshStandardMaterial 
        color="#5a5a5a" 
        roughness={0.85} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </mesh>
  </group>
)

const Pond = ({ position, isFaded }) => (
  <group position={position}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[15, 64]} />
      <meshStandardMaterial 
        color="#2196F3" 
        transparent 
        opacity={isFaded ? 0.03 : 0.85} 
        roughness={0.1} 
        metalness={0.3} 
      />
    </mesh>
    {/* 喷泉 */}
    <group position={[0, 0, 0]}>
      <Cylinder position={[0, 0.5, 0]} args={[1.8, 2.5, 1, 32]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#708090" 
          transparent={isFaded} 
          opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
        />
      </Cylinder>
      <Cylinder position={[0, 2, 0]} args={[0.3, 0.3, 2.5, 8]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#708090" 
          transparent={isFaded} 
          opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
        />
      </Cylinder>
    </group>
  </group>
)

const LandscapeHill = ({ position, isFaded }) => (
  <group position={position}>
    <Cone position={[0, 3, 0]} args={[20, 6, 32]} castShadow receiveShadow>
      <meshStandardMaterial 
        color="#2a4a2a" 
        roughness={0.95} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={false} depthTest={false} 
      />
    </Cone>
  </group>
)

export default Terrain
