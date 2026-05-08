# 数字孪生校园平台

基于 React + Three.js + @react-three/fiber 构建的校园数字孪生可视化平台。

## 功能特性

### 1. 第三方服务集成
- **CIMRTS 城市信息模型实时切片服务**：支持超大模型流式加载
- **PipeSer 管线管网云服务平台**：地下管线全功能托管

### 2. 基础建模工具
- **形状拉伸建模**：支持框选区域、自定义高度、纹理贴图
- **模型库拖拽搭建**：内置校园专属模型库，支持快速搭建

### 3. 管线管理
- 支持给水、排水、电力、通信等多类型管线
- 管线属性管理、可视化、检测评估

### 4. 用户交互
- 场景漫游、视角切换
- 标注工具、量测分析（距离、面积、高度、埋深）
- 图层管理

### 5. 性能指标
- 单个模型加载能力：≥450GB
- 模型切片加载：实时响应
- 交互操作：延时≤1s

## 技术栈

- **前端框架**：React 18
- **3D 渲染**：Three.js + @react-three/fiber + @react-three/drei
- **UI 组件**：Ant Design
- **状态管理**：Zustand
- **构建工具**：Vite

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 生产构建

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 项目结构

```
DigitalTwinSchool/
├── src/
│   ├── components/         # 组件目录
│   │   ├── Scene3D.jsx     # 3D 场景主组件
│   │   ├── Header.jsx      # 顶部导航栏
│   │   ├── Sidebar.jsx     # 左侧工具栏
│   │   ├── RightPanel.jsx  # 右侧面板
│   │   ├── Terrain.jsx     # 地形组件
│   │   ├── Buildings.jsx   # 建筑组件
│   │   ├── Pipes.jsx       # 管线组件
│   │   ├── Annotations.jsx # 标注组件
│   │   ├── Measurements.jsx # 测量组件
│   │   └── ModelLibrary.jsx # 模型库组件
│   ├── store/
│   │   └── useStore.js     # Zustand 状态管理
│   ├── services/           # 服务接口
│   │   ├── cimrtsService.js
│   │   ├── pipeserService.js
│   │   └── modelService.js
│   ├── App.jsx             # 主应用组件
│   ├── main.jsx            # 入口文件
│   └── index.css           # 全局样式
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 使用说明

### 左侧工具栏

1. **选择工具**：选择场景中的物体
2. **建模工具**：创建自定义建筑模型
3. **管线管理**：加载和管理地下管线
4. **量测分析**：测量距离、面积、高度等
5. **标注**：添加场景标注
6. **图层**：管理不同图层的显示/隐藏
7. **保存**：保存当前场景数据
8. **设置**：平台设置

### 右侧面板

根据选择的工具显示对应的控制面板。

## 开发计划

- [ ] 完善形状拉伸建模（支持多边形绘制）
- [ ] 实现纹理贴图功能
- [ ] 添加拖拽摆放功能
- [ ] 完善第三方服务集成
- [ ] 添加数据持久化
- [ ] 实现更多测量功能
- [ ] 添加更多模型到模型库
- [ ] 性能优化
- [ ] 国产化适配

## 许可证

MIT
