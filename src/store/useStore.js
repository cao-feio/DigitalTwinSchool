import { create } from 'zustand'
import { defaultBuildingData } from '../components/Buildings'
import { defaultPipeData } from '../components/Pipes'
import * as THREE from 'three'

export const useStore = create((set, get) => ({
  // 登录状态 - 先默认false，在App组件中初始化
  isLoggedIn: false,
  username: null,
  
  // 初始化登录状态（在客户端安全调用）
  initializeAuth: () => {
    try {
      const savedState = localStorage.getItem('digital-twin-auth')
      if (savedState) {
        const parsed = JSON.parse(savedState)
        if (parsed.isLoggedIn) {
          console.log('恢复登录状态:', parsed)
          set({ 
            isLoggedIn: parsed.isLoggedIn, 
            username: parsed.username 
          })
        }
      }
    } catch (e) {
      console.error('读取登录状态失败:', e)
    }
  },
  
  login: (username) => {
    const newState = { isLoggedIn: true, username }
    set(newState)
    try {
      localStorage.setItem('digital-twin-auth', JSON.stringify(newState))
      console.log('保存登录状态:', newState)
    } catch (e) {
      console.error('保存登录状态失败:', e)
    }
  },
  logout: () => {
    console.log('执行退出登录...')
    try {
      localStorage.removeItem('digital-twin-auth')
      console.log('已清除 localStorage 中的登录状态')
    } catch (e) {
      console.error('清除登录状态失败:', e)
    }
    set({ isLoggedIn: false, username: null })
    console.log('已更新 store 状态: isLoggedIn = false')
  },

  // 场景状态
  currentTool: null,
  setCurrentTool: (tool) => set({ currentTool: tool }),

  // 选中的模型
  selectedModel: null,
  setSelectedModel: (model) => set({ selectedModel: model }),

  // 选中的管线
  selectedPipe: null,
  setSelectedPipe: (pipe) => set({ selectedPipe: pipe }),

  // 是否有选中的管线
  hasSelectedPipe: false,
  setHasSelectedPipe: (value) => set({ hasSelectedPipe: value }),
  
  // 选中的标注
  selectedAnnotationId: null,
  setSelectedAnnotationId: (id) => set({ selectedAnnotationId: id }),

  // 相机目标位置（用于定位）
  cameraTarget: null,
  setCameraTarget: (target) => set({ cameraTarget: target }),

  // 图层管理
  layers: {
    terrain: true,
    buildings: true,
    pipes: false,
    annotations: true,
    plants: true
  },

  // 标注数据
  annotations: [
    { id: 'anno-1', text: '教学楼A', position: [-50, 5, -30], style: 'box', color: '#00d4ff', visible: true, size: 1, rotation: [0, 0, 0] },
    { id: 'anno-2', text: '实验楼', position: [40, 5, 10], style: 'sphere', color: '#22c55e', visible: true, size: 1, rotation: [0, 0, 0] },
    { id: 'anno-3', text: '图书馆', position: [0, 8, 60], style: 'cylinder', color: '#f59e0b', visible: true, size: 1, rotation: [0, 0, 0] }
  ],
  addAnnotation: (annotation) =>
    set((state) => ({ annotations: [...state.annotations, annotation] })),
  isSelectingAnnotationPosition: false,
  tempAnnotationPosition: null,
  newAnnotation: { text: '', position: [0, 5, 0], style: 'box', color: '#00d4ff', visible: true, size: 1, rotation: [0, 0, 0] },
  startSelectingAnnotationPosition: () => set({ isSelectingAnnotationPosition: true, tempAnnotationPosition: null }),
  cancelSelectingAnnotationPosition: () => set({ isSelectingAnnotationPosition: false, tempAnnotationPosition: null }),
  setTempAnnotationPosition: (pos) => set({ tempAnnotationPosition: pos }),
  updateNewAnnotation: (updates) => set((state) => ({ newAnnotation: { ...state.newAnnotation, ...updates } })),
  removeAnnotation: (id) =>
    set((state) => ({
      annotations: state.annotations.filter((a) => a.id !== id)
    })),
  updateAnnotation: (id, updates) =>
    set((state) => ({
      annotations: state.annotations.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      )
    })),
  toggleAnnotationVisibility: (id) =>
    set((state) => ({
      annotations: state.annotations.map((a) =>
        a.id === id ? { ...a, visible: !a.visible } : a
      )
    })),
  toggleLayer: (layer) =>
    set((state) => ({
      layers: {
        ...state.layers,
        [layer]: !state.layers[layer]
      }
    })),

  // 模型显示控制
  modelVisibility: {},
  toggleModelVisibility: (id) =>
    set((state) => ({
      modelVisibility: {
        ...state.modelVisibility,
        [id]: !state.modelVisibility[id]
      }
    })),

  // 模型数据 - 包含默认建筑和用户创建的建筑
  models: [...defaultBuildingData],
  addModel: (model) => set((state) => ({ models: [...state.models, model] })),
  removeModel: (id) =>
    set((state) => ({
      models: state.models.filter((m) => m.id !== id)
    })),
  updateModel: (id, updates) =>
    set((state) => ({
      models: state.models.map((m) => m.id === id ? { ...m, ...updates } : m)
    })),
  // 批量导入模型
  importModels: (newModels) => set((state) => ({ 
    models: [...state.models, ...newModels] 
  })),
  // 导出模型数据
  exportModels: () => {
    const customModels = get().models.filter(m => m.isCustom)
    return JSON.stringify(customModels, null, 2)
  },

  // 建模工具
  isBuilding: false,
  buildingPoints: [],
  buildingHeight: 10,
  buildingTexture: 'brick',
  buildingColor: '#a0b0c0',
  buildingImage: null,
  textureScale: 1,
  textureRotation: 0,
  textureOffset: [0, 0],
  editingModelId: null,
  isMovingModel: false,
  moveStartPosition: null,
  isRotatingModel: false,
  transformMode: null,
  
  setIsBuilding: (building) => set({ isBuilding: building }),
  addBuildingPoint: (point) => 
    set((state) => ({ 
      buildingPoints: [...state.buildingPoints, point] 
    })),
  undoBuildingPoint: () =>
    set((state) => ({
      buildingPoints: state.buildingPoints.slice(0, -1)
    })),
  clearBuildingPoints: () => set({ buildingPoints: [] }),
  setBuildingHeight: (height) => set({ buildingHeight: height }),
  setBuildingTexture: (texture) => set({ buildingTexture: texture }),
  setBuildingColor: (color) => set({ buildingColor: color }),
  setBuildingImage: (image) => set({ buildingImage: image }),
  setTextureScale: (scale) => set({ textureScale: scale }),
  setTextureRotation: (rotation) => set({ textureRotation: rotation }),
  setTextureOffset: (offset) => set({ textureOffset: offset }),
  setEditingModelId: (id) => set({ editingModelId: id }),
  setIsMovingModel: (isMoving) => set({ isMovingModel: isMoving }),
  setMoveStartPosition: (pos) => set({ moveStartPosition: pos }),
  setIsRotatingModel: (isRotating) => set({ isRotatingModel: isRotating }),
  setTransformMode: (mode) => set({ transformMode: mode }),
  resetModelingParams: () => set({ 
    buildingPoints: [], 
    buildingHeight: 10, 
    buildingTexture: 'brick', 
    buildingColor: '#a0b0c0',
    buildingImage: null,
    textureScale: 1,
    textureRotation: 0,
    textureOffset: [0, 0]
  }),

  // 管线数据
  pipes: [],
  customPipes: [...defaultPipeData],
  selectedPipe: null,
  setPipes: (pipes) => set({ pipes }),
  setCustomPipes: (pipes) => set({ customPipes: pipes }),
  setSelectedPipe: (pipe) => set({ selectedPipe: pipe }),
  hasSelectedPipe: false,
  setHasSelectedPipe: (has) => set({ hasSelectedPipe: has }),
  // 导入管线数据
  importPipes: (newPipes) => set((state) => ({ 
    customPipes: [...state.customPipes, ...newPipes] 
  })),
  // 导出管线数据
  exportPipes: () => {
    return JSON.stringify(get().customPipes, null, 2)
  },
  // 添加单条管线
  addPipe: (pipe) => set((state) => ({ 
    customPipes: [...state.customPipes, pipe] 
  })),
  // 移除管线
  removePipe: (id) => set((state) => ({ 
    customPipes: state.customPipes.filter(p => p.id !== id) 
  })),

  // 测量工具
  measurements: [],
  measurementMode: null,
  measurementPoints: [],
  isDoubleClickPending: false,
  setMeasurementMode: (mode) => set({ measurementMode: mode, measurementPoints: [] }),
  addMeasurementPoint: (point) => 
    set((state) => ({ 
      measurementPoints: [...state.measurementPoints, point] 
    })),
  addMeasurement: (measurement) =>
    set((state) => ({ measurements: [...state.measurements, measurement] })),
  clearMeasurements: () => set({ measurements: [] }),
  calculatePolygonArea: (points) => {
    if (points.length < 3) return 0
    let area = 0
    const n = points.length
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n
      area += points[i][0] * points[j][2]
      area -= points[j][0] * points[i][2]
    }
    return Math.abs(area / 2)
  },
  calculateHeight: (points) => {
    if (points.length < 1) return 0
    return Math.abs(points[0][1])
  },
  calculateAngle: (points) => {
    if (points.length < 3) return 0
    const p1 = new THREE.Vector3(...points[0])
    const vertex = new THREE.Vector3(...points[1])
    const p2 = new THREE.Vector3(...points[2])
    
    const v1 = p1.sub(vertex)
    const v2 = p2.sub(vertex)
    
    const dot = v1.dot(v2)
    const cross = v1.clone().cross(v2)
    const angle = Math.atan2(cross.length(), dot)
    return angle * (180 / Math.PI)
  },
  finishCurrentMeasurement: () => 
    set((state) => {
      const { measurementPoints, measurementMode } = state
      
      if (measurementMode === 'height' && measurementPoints.length < 1) return {}
      if (measurementMode !== 'height' && measurementPoints.length < 2) return {}
      
      let calculatedData = {
        id: Date.now(),
        type: measurementMode || 'length',
        points: [...measurementPoints],
        timestamp: Date.now()
      }
      
      if (measurementMode === 'area' && measurementPoints.length >= 3) {
        const area = get().calculatePolygonArea(measurementPoints)
        calculatedData.area = area
      } else if (measurementMode === 'height') {
        const height = get().calculateHeight(measurementPoints)
        calculatedData.height = height
      } else if (measurementMode === 'angle' && measurementPoints.length >= 3) {
        const angle = get().calculateAngle(measurementPoints)
        calculatedData.angle = angle
      } else {
        let totalDistance = 0
        for (let i = 1; i < measurementPoints.length; i++) {
          const dx = measurementPoints[i][0] - measurementPoints[i-1][0]
          const dy = measurementPoints[i][1] - measurementPoints[i-1][1]
          const dz = measurementPoints[i][2] - measurementPoints[i-1][2]
          totalDistance += Math.sqrt(dx * dx + dy * dy + dz * dz)
        }
        calculatedData.distance = totalDistance
      }
      
      return {
        measurements: [...state.measurements, calculatedData],
        measurementPoints: []
      }
    }),

  // 分析工具
  analysisMode: null,
  analysisViewpoint: null,
  sunPosition: { 
    azimuth: 180, 
    altitude: 45,
    hour: 12,
    minute: 0,
    month: 6,
    day: 21,
    latitude: 39.9,
    longitude: 116.4,
    useTimeMode: false
  },
  viewshedSettings: {
    range: 100,
    horizontalFOV: 90,
    verticalFOV: 60,
    viewHeight: 1.7
  },
  analysisResults: [],
  setAnalysisMode: (mode) => set({ analysisMode: mode }),
  setAnalysisViewpoint: (point) => set({ analysisViewpoint: point }),
  setSunPosition: (pos) => set((state) => ({ 
    sunPosition: { ...state.sunPosition, ...pos } 
  })),
  setViewshedSettings: (settings) => set((state) => ({
    viewshedSettings: { ...state.viewshedSettings, ...settings }
  })),
  addAnalysisResult: (result) => 
    set((state) => ({ analysisResults: [...state.analysisResults, result] })),
  clearAnalysisResults: () => set({ analysisResults: [], analysisMode: null, analysisViewpoint: null }),

  // 服务管理
  services: {
    cimrts: { connected: false },
    pipeser: { connected: false }
  },
  setServiceStatus: (service, status) =>
    set((state) => ({
      services: {
        ...state.services,
        [service]: status
      }
    })),

  // 资源管理
  resources: [
    { id: 'water-service', name: '给水管道服务', type: 'pipe', pipeType: 'water', visible: true, data: null },
    { id: 'power-service', name: '电力管线服务', type: 'pipe', pipeType: 'power', visible: true, data: null },
    { id: 'communication-service', name: '通信管线服务', type: 'pipe', pipeType: 'communication', visible: true, data: null },
    { id: 'sewer-service', name: '污水管道服务', type: 'pipe', pipeType: 'sewer', visible: true, data: null }
  ],
  resourceModalOpen: false,
  setResourceModalOpen: (open) => set({ resourceModalOpen: open }),
  addResource: (resource) => 
    set((state) => ({ resources: [...state.resources, resource] })),
  removeResource: (id) => 
    set((state) => ({ resources: state.resources.filter(r => r.id !== id) })),
  toggleResourceVisibility: (id) =>
    set((state) => ({
      resources: state.resources.map(r => 
        r.id === id ? { ...r, visible: !r.visible } : r
      )
    })),
  updateResource: (id, updates) =>
    set((state) => ({
      resources: state.resources.map(r => r.id === id ? { ...r, ...updates } : r)
    })),

  // 管线生成工具状态
  pipeGenMode: null,
  setPipeGenMode: (mode) => set({ pipeGenMode: mode }),
  pipeGenPoints: [],
  addPipeGenPoint: (point) => 
    set((state) => ({ pipeGenPoints: [...state.pipeGenPoints, point] })),
  clearPipeGenPoints: () => set({ pipeGenPoints: [] }),
  pipeGenParams: {
    pipeType: 'water',
    diameter: 0.5,
    depth: 1.5,
    material: 'PE管',
    pressure: '1.0MPa'
  },
  setPipeGenParams: (params) => 
    set((state) => ({ pipeGenParams: { ...state.pipeGenParams, ...params } }))
}))
