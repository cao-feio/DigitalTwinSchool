import React, { useRef, useEffect } from 'react'
import { Box, Cylinder, Sphere, TransformControls } from '@react-three/drei'
import { useStore } from '@/store/useStore'

// 透明材质辅助组件
const FadedMaterial = ({ children, isFaded }) => {
  if (isFaded) {
    return React.cloneElement(children, {
      transparent: true,
      opacity: 0.15,
      depthWrite: false
    })
  }
  return children
}

// 快速创建带透明功能的材质
const createMaterialProps = (baseProps, isFaded) => {
  if (isFaded) {
    return {
      ...baseProps,
      transparent: true,
      opacity: 0.15,
      depthWrite: false
    }
  }
  return baseProps
}

export const defaultBuildingData = [
  {
    id: 'library',
    name: '图书馆',
    type: 'library',
    style: 'classical',
    position: [0, 0, 0],
    rotation: 0,
    scale: 1,
    color: '#c0a080',
    description: '古典主义风格的大学图书馆，藏书300万册',
    floors: 8,
    area: '25000㎡',
    builtYear: 2005
  },
  {
    id: 'teaching-a',
    name: '教学楼A',
    type: 'teaching',
    style: 'modern',
    position: [-45, 0, -25],
    rotation: 0,
    scale: 1,
    color: '#a0b0c0',
    description: '现代风格教学楼，配备多媒体教室',
    floors: 6,
    area: '18000㎡',
    builtYear: 2012
  },
  {
    id: 'teaching-b',
    name: '教学楼B',
    type: 'teaching',
    style: 'modern2',
    position: [45, 0, -25],
    rotation: 0,
    scale: 1,
    color: '#d0d0e0',
    description: '教学楼B，主要用于公共基础课',
    floors: 5,
    area: '15000㎡',
    builtYear: 2010
  },
  {
    id: 'lab-building',
    name: '实验楼',
    type: 'lab',
    style: 'industrial',
    position: [-60, 0, -70],
    rotation: 0,
    scale: 1,
    color: '#8090a0',
    description: '理工科实验楼，配有大型设备',
    floors: 7,
    area: '22000㎡',
    builtYear: 2008
  },
  {
    id: 'gym',
    name: '体育馆',
    type: 'gym',
    style: 'arena',
    position: [60, 0, -70],
    rotation: 0,
    scale: 1,
    color: '#6080a0',
    description: '多功能体育馆，可容纳5000人',
    floors: 3,
    area: '12000㎡',
    builtYear: 2015
  },
  {
    id: 'student-center',
    name: '学生活动中心',
    type: 'teaching',
    style: 'flow',
    position: [0, 0, -55],
    rotation: 0,
    scale: 1,
    color: '#90a0b0',
    description: '学生社团活动中心，设有剧场',
    floors: 4,
    area: '8000㎡',
    builtYear: 2018
  },
  {
    id: 'dorm-1',
    name: '宿舍楼1',
    type: 'dorm',
    style: 'dorm',
    position: [-60, 0, 50],
    rotation: 0,
    scale: 1,
    color: '#b0c0d0',
    description: '本科生宿舍，4人间',
    floors: 8,
    area: '16000㎡',
    builtYear: 2003
  },
  {
    id: 'dorm-2',
    name: '宿舍楼2',
    type: 'dorm',
    style: 'dorm2',
    position: [60, 0, 50],
    rotation: 0,
    scale: 1,
    color: '#c0d0e0',
    description: '研究生宿舍',
    floors: 10,
    area: '18000㎡',
    builtYear: 2006
  },
  {
    id: 'canteen',
    name: '食堂',
    type: 'canteen',
    style: 'canteen',
    position: [0, 0, 45],
    rotation: 0,
    scale: 1,
    color: '#e0d0b0',
    description: '学生餐厅，提供各地美食',
    floors: 3,
    area: '9000㎡',
    builtYear: 2014
  },
  {
    id: 'admin',
    name: '行政楼',
    type: 'admin',
    style: 'admin',
    position: [-85, 0, 0],
    rotation: 0,
    scale: 1,
    color: '#a09080',
    description: '学校行政管理中心',
    floors: 6,
    area: '10000㎡',
    builtYear: 2000
  },
  {
    id: 'auditorium',
    name: '大礼堂',
    type: 'admin',
    style: 'classic',
    position: [85, 0, 0],
    rotation: 0,
    scale: 1,
    color: '#c0b0a0',
    description: '学校大礼堂，用于重要活动',
    floors: 3,
    area: '8000㎡',
    builtYear: 1998
  },
  {
    id: 'art-center',
    name: '艺术中心',
    type: 'teaching',
    style: 'art',
    position: [45, 0, 70],
    rotation: 0,
    scale: 1,
    color: '#d0b0c0',
    description: '音乐、美术、表演艺术中心',
    floors: 5,
    area: '7000㎡',
    builtYear: 2019
  },
  {
    id: 'history-museum',
    name: '校史馆',
    type: 'library',
    style: 'museum',
    position: [-45, 0, 70],
    rotation: 0,
    scale: 1,
    color: '#b0a090',
    description: '展示学校百年发展历史',
    floors: 2,
    area: '3000㎡',
    builtYear: 2016
  }
]

// 1. 古典风格 - 图书馆
const ClassicalLibrary = ({ data, isSelected, isFaded, onClick }) => {
  return (
  <group position={data.position} scale={data.scale} onClick={onClick} renderOrder={isFaded ? 10 : 0}>
    {/* 基座 */}
    <Box position={[0, 2, 0]} args={[28, 4, 22]}>
      <meshStandardMaterial 
        color="#a08060" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} 
        depthWrite={!isFaded}
        depthTest={!isFaded}
      />
    </Box>
    {/* 主体 */}
    <Box position={[0, 10, 0]} args={[24, 12, 18]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : data.color} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} 
        depthWrite={!isFaded}
        depthTest={!isFaded}
      />
    </Box>
    {/* 窗户排 */}
    {Array.from({ length: 4 }).map((_, i) => (
      <group key={`lib-win-row-${i}`}>
        {Array.from({ length: 5 }).map((_, j) => (
          <Box key={`lib-win-${i}-${j}`} position={[-10 + j * 5, 5 + i * 3, 9.1]} args={[3, 2, 0.2]}>
            <meshStandardMaterial 
              color="#87CEEB" 
              emissive="#aaddff" 
              emissiveIntensity={0.2} 
              transparent={isFaded} 
              opacity={isFaded ? 0.35 : 0.8}
              depthWrite={!isFaded}
              depthTest={!isFaded}
            />
          </Box>
        ))}
      </group>
    ))}
    {/* 柱子 */}
    {[-10, -5, 0, 5, 10].map(x => (
      <Cylinder key={x} position={[x, 14, -9.5]} args={[0.8, 0.8, 10, 16]}>
        <meshStandardMaterial 
          color="#e0d0c0" 
          transparent={isFaded} 
          opacity={isFaded ? 0.35 : 1} 
          depthWrite={!isFaded}
          depthTest={!isFaded}
        />
      </Cylinder>
    ))}
    {/* 三角楣 */}
    <group position={[0, 20, -5]}>
      <Box position={[0, 3, 0]} args={[26, 0.5, 2]}>
        <meshStandardMaterial 
          color="#d0c0b0" 
          transparent={isFaded} 
          opacity={isFaded ? 0.35 : 1} 
          depthWrite={!isFaded}
          depthTest={!isFaded}
        />
      </Box>
      {[-13, 13].map(x => (
        <Box key={x} position={[x, 1.5, 0]} args={[0.5, 3, 2]} rotation={[0, 0, x > 0 ? 0.8 : -0.8]}>
          <meshStandardMaterial 
            color="#d0c0b0" 
            transparent={isFaded} 
            opacity={isFaded ? 0.35 : 1} 
            depthWrite={!isFaded}
            depthTest={!isFaded}
          />
        </Box>
      ))}
    </group>
    {/* 穹顶 */}
    <Sphere position={[0, 24, 0]} args={[6, 16, 8]} scale={[1, 0.6, 1]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : '#c0a070'} 
        transparent={isFaded} 
        opacity={isFaded ? 0.35 : 1} 
        depthWrite={!isFaded}
        depthTest={!isFaded}
      />
    </Sphere>
  </group>
)}

// 2. 现代风格 - 教学楼A
const ModernBuilding = ({ data, isSelected, isFaded, onClick }) => {
  return (
  <group position={data.position} scale={data.scale} onClick={onClick} renderOrder={isFaded ? 10 : 0}>
    {/* 主楼体 */}
    <Box position={[0, 10, 0]} args={[20, 20, 14]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : data.color} 
        transparent={isFaded} 
        opacity={isFaded ? 0.2 : 1} 
        depthWrite={!isFaded}
      />
    </Box>
    {/* 玻璃幕墙 */}
    {Array.from({ length: 8 }).map((_, i) => (
      <group key={`mod1-win-row-${i}`}>
        {Array.from({ length: 6 }).map((_, j) => (
          <Box key={`mod1-win-${i}-${j}`} position={[-9 + j * 3.5, 3 + i * 2.5, 7.1]} args={[2.8, 2.2, 0.3]}>
            <meshStandardMaterial color="#88ccff" transparent={isFaded} opacity={isFaded ? 0.3 : 0.7} emissive="#99ddff" emissiveIntensity={0.15} depthWrite={!isFaded} />
          </Box>
        ))}
      </group>
    ))}
    {/* 垂直遮阳板 */}
    {Array.from({ length: 12 }).map((_, i) => (
      <Box key={i} position={[-11 + i * 2, 10, -7.1]} args={[0.3, 18, 0.2]}>
        <meshStandardMaterial color="#405060" metalness={0.7} roughness={0.3} transparent={isFaded} opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} />
      </Box>
    ))}
    {/* 入口雨棚 */}
    <Box position={[0, 3, -8]} args={[12, 0.5, 4]}>
      <meshStandardMaterial color="#607080" metalness={0.5} roughness={0.4} transparent={isFaded} opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} />
    </Box>
  </group>
)}

// 3. 现代风格2 - 教学楼B
const ModernBuilding2 = ({ data, isSelected, isFaded, onClick }) => (
  <group position={data.position} scale={data.scale} onClick={onClick}>
    {/* 阶梯状主楼体 */}
    <Box position={[0, 7, 0]} args={[24, 14, 16]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : data.color} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    <Box position={[0, 15, 0]} args={[18, 6, 12]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : '#c0c0d0'} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    <Box position={[0, 20, 0]} args={[12, 4, 8]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : '#b0b0c0'} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    {/* 横向装饰条 */}
    {Array.from({ length: 5 }).map((_, i) => (
      <Box key={i} position={[0, 3 + i * 3.5, -8.1]} args={[24, 0.4, 0.2]}>
        <meshStandardMaterial 
          color="#506070" 
          transparent={isFaded} 
          opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
        />
      </Box>
    ))}
    {/* 窗户阵列 */}
    {Array.from({ length: 4 }).map((_, i) => (
      <group key={`mod2-win-row-${i}`}>
        {Array.from({ length: 6 }).map((_, j) => (
          <Box key={`mod2-win-${i}-${j}`} position={[-10 + j * 4, 4 + i * 3.5, 8.1]} args={[3, 2.5, 0.25]}>
            <meshStandardMaterial 
              color="#aaddff" 
              transparent={isFaded} 
              opacity={isFaded ? 0.3 : 0.6} depthWrite={!isFaded} 
            />
          </Box>
        ))}
      </group>
    ))}
  </group>
)

// 4. 工业风格 - 实验楼
const IndustrialLab = ({ data, isSelected, isFaded, onClick }) => (
  <group position={data.position} scale={data.scale} onClick={onClick}>
    {/* 工业风主体 */}
    <Box position={[0, 9, 0]} args={[26, 18, 18]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : data.color} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    {/* 外露管道装饰 */}
    {[-11, 11].map(x => (
      <Cylinder key={x} position={[x, 9, -9.5]} args={[0.4, 0.4, 18, 8]}>
        <meshStandardMaterial 
          color="#708090" 
          metalness={0.8} 
          roughness={0.3} 
          transparent={isFaded} 
          opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
        />
      </Cylinder>
    ))}
    {/* 大型落地窗 */}
    {Array.from({ length: 6 }).map((_, i) => (
      <Box key={i} position={[-10 + i * 4, 9, 9.1]} args={[3.4, 16, 0.3]}>
        <meshStandardMaterial 
          color="#99bbdd" 
          transparent={isFaded} 
          opacity={isFaded ? 0.2 : 0.5} 
          depthWrite={!isFaded}
        />
      </Box>
    ))}
    {/* 顶部通风塔 */}
    <Box position={[-6, 18.5, 0]} args={[4, 3, 4]}>
      <meshStandardMaterial 
        color="#607080" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    <Box position={[6, 18.5, 0]} args={[4, 3, 4]}>
      <meshStandardMaterial 
        color="#607080" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
  </group>
)

// 5. 体育馆
const GymArena = ({ data, isSelected, isFaded, onClick }) => (
  <group position={data.position} scale={data.scale} onClick={onClick}>
    {/* 大跨度主体 */}
    <Box position={[0, 8, 0]} args={[32, 16, 28]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : data.color} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    {/* 弧形屋顶 */}
    {Array.from({ length: 9 }).map((_, i) => (
      <Box key={i} position={[-12 + i * 3, 17, 0]} args={[2.5, 2 + i * 0.2, 26]} rotation={[0, 0, i > 4 ? -0.1 * (i - 4) : 0.1 * (4 - i)]}>
        <meshStandardMaterial 
          color={isSelected ? '#ffcc00' : '#507090'} 
          transparent={isFaded} 
          opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
        />
      </Box>
    ))}
  </group>
)

// 6. 学生活动中心
const StudentCenter = ({ data, isSelected, isFaded, onClick }) => (
  <group position={data.position} scale={data.scale} onClick={onClick}>
    {/* 流动感的主楼体 */}
    <Box position={[0, 8, 0]} args={[22, 16, 18]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : data.color} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    {/* 圆形装饰 */}
    <Sphere position={[-8, 12, 9]} args={[3, 16, 16]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : '#a0b0c0'} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Sphere>
    <Sphere position={[8, 12, 9]} args={[3, 16, 16]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : '#a0b0c0'} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Sphere>
  </group>
)

// 7. 宿舍楼1
const DormBuilding = ({ data, isSelected, isFaded, onClick }) => (
  <group position={data.position} scale={data.scale} onClick={onClick}>
    {/* 宿舍主体 */}
    <Box position={[0, 9, 0]} args={[20, 18, 14]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : data.color} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    {/* 阳台 */}
    {Array.from({ length: 8 }).map((_, i) => (
      <group key={`dorm-floor-${i}`}>
        {Array.from({ length: 4 }).map((_, j) => (
          <Box key={`dorm-balcony-${i}-${j}`} position={[-6 + j * 4, 2 + i * 2.25, 7.1]} args={[3, 1.8, 1.5]}>
            <meshStandardMaterial 
              color="#99aabb" 
              transparent={isFaded} 
              opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
            />
          </Box>
        ))}
      </group>
    ))}
  </group>
)

// 8. 宿舍楼2
const DormBuilding2 = ({ data, isSelected, isFaded, onClick }) => (
  <group position={data.position} scale={data.scale} onClick={onClick}>
    {/* L型宿舍 */}
    <Box position={[-4, 9, 0]} args={[16, 18, 12]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : data.color} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    <Box position={[8, 9, -4]} args={[12, 18, 10]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : '#d0d0e0'} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    {/* 窗户 */}
    {Array.from({ length: 6 }).map((_, i) => (
      <group key={`dorm2-windows-${i}`}>
        <Box position={[-4, 3 + i * 3, 6.1]} args={[14, 2, 0.2]}>
          <meshStandardMaterial 
            color="#99bbdd" 
            transparent={isFaded} 
            opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
          />
        </Box>
        <Box position={[8, 3 + i * 3, -1.1]} args={[10, 2, 0.2]}>
          <meshStandardMaterial 
            color="#99bbdd" 
            transparent={isFaded} 
            opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
          />
        </Box>
      </group>
    ))}
  </group>
)

// 9. 食堂
const Canteen = ({ data, isSelected, isFaded, onClick }) => (
  <group position={data.position} scale={data.scale} onClick={onClick}>
    {/* 大跨度单层食堂 */}
    <Box position={[0, 5, 0]} args={[30, 10, 24]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : data.color} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    {/* 高侧窗 */}
    {Array.from({ length: 8 }).map((_, i) => (
      <Box key={i} position={[-12 + i * 3.5, 8, -12.2]} args={[3, 3, 0.3]}>
        <meshStandardMaterial 
          color="#aaccff" 
          transparent={isFaded} 
          opacity={isFaded ? 0.3 : 0.7} depthWrite={!isFaded} 
        />
      </Box>
    ))}
    {/* 入口门廊 */}
    {[-6, 0, 6].map(x => (
      <Cylinder key={x} position={[x, 3, -13]} args={[0.5, 0.5, 6, 12]}>
        <meshStandardMaterial 
          color="#d0c0a0" 
          transparent={isFaded} 
          opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
        />
      </Cylinder>
    ))}
    <Box position={[0, 6.5, -13]} args={[20, 1, 3]}>
      <meshStandardMaterial 
        color="#c0b090" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
  </group>
)

// 10. 行政楼
const AdminBuilding = ({ data, isSelected, isFaded, onClick }) => (
  <group position={data.position} scale={data.scale} onClick={onClick}>
    {/* 庄重的行政楼 */}
    <Box position={[0, 9, 0]} args={[20, 18, 14]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : data.color} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    {/* 顶部钟楼 */}
    <Box position={[0, 19, 0]} args={[8, 8, 8]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : '#908070'} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    <Sphere position={[0, 24.5, 0]} args={[2.5, 16, 16]}>
      <meshStandardMaterial 
        color="#d0c0a0" 
        metalness={0.6} 
        roughness={0.4} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Sphere>
    {/* 主入口 */}
    <Box position={[0, 4, -7.2]} args={[10, 8, 0.6]}>
      <meshStandardMaterial 
        color="#706050" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    <Box position={[0, 8, -7.5]} args={[14, 0.5, 1]}>
      <meshStandardMaterial 
        color="#807060" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
  </group>
)

// 11. 大礼堂
const Auditorium = ({ data, isSelected, isFaded, onClick }) => (
  <group position={data.position} scale={data.scale} onClick={onClick}>
    {/* 古典风格礼堂 */}
    <Box position={[0, 8, 0]} args={[28, 16, 22]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : data.color} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    {/* 门廊 */}
    {[-8, -4, 0, 4, 8].map(x => (
      <Cylinder key={x} position={[x, 8, -11.5]} args={[0.7, 0.7, 10, 12]}>
        <meshStandardMaterial 
          color="#e0d0c0" 
          transparent={isFaded} 
          opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
        />
      </Cylinder>
    ))}
    <Box position={[0, 13.5, -11]} args={[20, 1, 3]}>
      <meshStandardMaterial 
        color="#d0c0b0" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    {/* 三角楣装饰 */}
    <Box position={[0, 17.5, -6]} args={[24, 0.6, 4]}>
      <meshStandardMaterial 
        color="#c0b0a0" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
  </group>
)

// 12. 艺术中心
const ArtCenter = ({ data, isSelected, isFaded, onClick }) => (
  <group position={data.position} scale={data.scale} onClick={onClick}>
    {/* 艺术中心主楼 */}
    <Box position={[0, 7, 0]} args={[20, 14, 16]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : data.color} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    <Sphere position={[0, 10, 5]} args={[3, 16, 16]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : '#d0c0d0'} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Sphere>
  </group>
)

// 13. 校史馆
const HistoryMuseum = ({ data, isSelected, isFaded, onClick }) => (
  <group position={data.position} scale={data.scale} onClick={onClick}>
    {/* 小而精致的博物馆 */}
    <Box position={[0, 6, 0]} args={[18, 12, 14]}>
      <meshStandardMaterial 
        color={isSelected ? '#ffcc00' : data.color} 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
    {/* 石材贴面感 */}
    {Array.from({ length: 4 }).map((_, i) => (
      <group key={`museum-row-${i}`}>
        {Array.from({ length: 4 }).map((_, j) => (
          <Box key={`museum-${i}-${j}`} position={[-6 + j * 4, 2.5 + i * 3, 7.1]} args={[3.5, 2.5, 0.2]}>
            <meshStandardMaterial 
              color={[ '#a09080', '#908070', '#a09080', '#908070' ][(i + j) % 2]} 
              transparent={isFaded} 
              opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
            />
          </Box>
        ))}
      </group>
    ))}
    {/* 入口门廊 */}
    <Cylinder position={[-4, 4, -7.5]} args={[0.5, 0.5, 8, 12]}>
      <meshStandardMaterial 
        color="#c0b0a0" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Cylinder>
    <Cylinder position={[4, 4, -7.5]} args={[0.5, 0.5, 8, 12]}>
      <meshStandardMaterial 
        color="#c0b0a0" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Cylinder>
    <Box position={[0, 8.5, -7]} args={[10, 1, 2]}>
      <meshStandardMaterial 
        color="#b0a090" 
        transparent={isFaded} 
        opacity={isFaded ? 0.15 : 1} depthWrite={!isFaded} depthTest={false} 
      />
    </Box>
  </group>
)

const Building = ({ data, isSelected, isFaded, onClick }) => {
  switch (data.style) {
    case 'classical': return <ClassicalLibrary data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
    case 'modern': return <ModernBuilding data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
    case 'modern2': return <ModernBuilding2 data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
    case 'industrial': return <IndustrialLab data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
    case 'arena': return <GymArena data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
    case 'flow': return <StudentCenter data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
    case 'dorm': return <DormBuilding data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
    case 'dorm2': return <DormBuilding2 data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
    case 'canteen': return <Canteen data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
    case 'admin': return <AdminBuilding data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
    case 'classic': return <Auditorium data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
    case 'art': return <ArtCenter data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
    case 'museum': return <HistoryMuseum data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
    default: return <ModernBuilding data={data} isSelected={isSelected} isFaded={isFaded} onClick={onClick} />
  }
}

// 带TransformControls的单个建筑
const BuildingWithTransform = ({ building, isSelected, isFaded, onClick }) => {
  const { transformMode, setTransformMode, updateModel } = useStore();
  const groupRef = useRef(null);
  
  // 初始同步位置
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(
        building.position[0], 
        building.position[1], 
        building.position[2]
      );
      groupRef.current.rotation.set(0, (building.rotation || 0) * Math.PI / 180, 0);
    }
  }, [building.id]); // 只在id变化时初始化
  
  // 处理拖拽变化 - 使用防抖
  const handleObjectChange = () => {
    if (groupRef.current && isSelected && transformMode) {
      // 使用 setTimeout 避免在渲染期间更新
      setTimeout(() => {
        const pos = groupRef.current.position;
        const rot = groupRef.current.rotation;
        updateModel(building.id, {
          position: [pos.x, pos.y, pos.z],
          rotation: (rot.y * 180 / Math.PI)
        });
      }, 0);
    }
  };
  
  return (
    <group>
      <group
        ref={groupRef}
        onClick={onClick}
      >
        <Building 
          data={{...building, position: [0,0,0], rotation: 0}} 
          isSelected={isSelected}
          isFaded={isFaded}
          onClick={(e) => {
            e.stopPropagation();
            onClick(e);
          }}
        />
      </group>
      
      {isSelected && transformMode && (
        <TransformControls
          object={groupRef.current}
          mode={transformMode}
          onObjectChange={handleObjectChange}
        />
      )}
    </group>
  );
};

const Buildings = ({ isFaded: externalIsFaded }) => {
  const { selectedModel, setSelectedModel, modelVisibility, hasSelectedPipe, models, currentTool, measurementMode, addMeasurementPoint } = useStore()

  // 只渲染默认建筑（用户建筑在UserBuildings组件中渲染）
  const defaultBuildings = models.filter(m => !m.isCustom)

  return (
    <group>
      {defaultBuildings.map(building => {
        if (modelVisibility[building.id] === false) return null
        const isSelected = selectedModel?.id === building.id
        const isFaded = (hasSelectedPipe || externalIsFaded) && !isSelected
        
        return (
          <group key={building.id}>
            <BuildingWithTransform
              building={building}
              isSelected={isSelected}
              isFaded={isFaded}
              onClick={(e) => {
                e.stopPropagation();
                // 如果是在测量模式下，添加测量点
                if (currentTool === 'measure' && measurementMode) {
                  // 获取点击点的世界坐标
                  const point = e.point;
                  if (point) {
                    addMeasurementPoint([point.x, point.y, point.z]);
                  }
                } else {
                  // 否则选择模型
                  setSelectedModel(building);
                }
              }}
            />
          </group>
        )
      })}
    </group>
  )
}

export default Buildings
