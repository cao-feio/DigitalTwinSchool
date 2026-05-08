// 简化的贴图组件
import React from 'react'
import { useStore } from '@/store/useStore'

const SimpleTexturePanel = () => {
  const { 
    buildingImage,
    setBuildingImage
  } = useStore()

  // 内置的示例贴图
  const sampleTextures = [
    {
      id: 'brick',
      name: '砖墙',
      url: 'data:image/svg+xml,' + encodeURIComponent(`
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="#a08060"/>
          <rect x="0" y="0" width="100" height="50" fill="#907050" stroke="#706050" stroke-width="2"/>
          <rect x="100" y="0" width="100" height="50" fill="#907050" stroke="#706050" stroke-width="2"/>
          <rect x="50" y="50" width="100" height="50" fill="#907050" stroke="#706050" stroke-width="2"/>
          <rect x="0" y="100" width="100" height="50" fill="#907050" stroke="#706050" stroke-width="2"/>
          <rect x="100" y="100" width="100" height="50" fill="#907050" stroke="#706050" stroke-width="2"/>
          <rect x="50" y="150" width="100" height="50" fill="#907050" stroke="#706050" stroke-width="2"/>
        </svg>
      `)
    },
    {
      id: 'wood',
      name: '木纹',
      url: 'data:image/svg+xml,' + encodeURIComponent(`
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="#a07040"/>
          <line x1="0" y1="20" x2="200" y2="20" stroke="#805020" stroke-width="3" opacity="0.6"/>
          <line x1="0" y1="50" x2="200" y2="50" stroke="#805020" stroke-width="3" opacity="0.6"/>
          <line x1="0" y1="80" x2="200" y2="80" stroke="#805020" stroke-width="3" opacity="0.6"/>
          <line x1="0" y1="110" x2="200" y2="110" stroke="#805020" stroke-width="3" opacity="0.6"/>
          <line x1="0" y1="140" x2="200" y2="140" stroke="#805020" stroke-width="3" opacity="0.6"/>
          <line x1="0" y1="170" x2="200" y2="170" stroke="#805020" stroke-width="3" opacity="0.6"/>
        </svg>
      `)
    },
    {
      id: 'tiles',
      name: '瓷砖',
      url: 'data:image/svg+xml,' + encodeURIComponent(`
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="#c0b0a0"/>
          <rect x="0" y="0" width="100" height="100" fill="#d0c0b0" stroke="#a09080" stroke-width="2"/>
          <rect x="100" y="0" width="100" height="100" fill="#c0b0a0" stroke="#a09080" stroke-width="2"/>
          <rect x="0" y="100" width="100" height="100" fill="#c0b0a0" stroke="#a09080" stroke-width="2"/>
          <rect x="100" y="100" width="100" height="100" fill="#d0c0b0" stroke="#a09080" stroke-width="2"/>
        </svg>
      `)
    },
    {
      id: 'stone',
      name: '石材',
      url: 'data:image/svg+xml,' + encodeURIComponent(`
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="#b0a080"/>
          <rect x="10" y="10" width="80" height="80" fill="#c0b090" stroke="#908070" stroke-width="2"/>
          <rect x="100" y="10" width="90" height="50" fill="#a09070" stroke="#908070" stroke-width="2"/>
          <rect x="100" y="70" width="90" height="60" fill="#c0b090" stroke="#908070" stroke-width="2"/>
          <rect x="10" y="100" width="70" height="90" fill="#a09070" stroke="#908070" stroke-width="2"/>
          <rect x="90" y="140" width="100" height="50" fill="#c0b090" stroke="#908070" stroke-width="2"/>
        </svg>
      `)
    },
    {
      id: 'glass',
      name: '玻璃',
      url: 'data:image/svg+xml,' + encodeURIComponent(`
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#a0d0e0;stop-opacity:0.8" />
              <stop offset="50%" style="stop-color:#c0e0f0;stop-opacity:0.9" />
              <stop offset="100%" style="stop-color:#80b0c0;stop-opacity:0.8" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="url(#glassGrad)"/>
          <line x1="0" y1="0" x2="200" y2="200" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
          <line x1="200" y1="0" x2="0" y2="200" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
          <line x1="100" y1="0" x2="100" y2="200" stroke="#7090a0" stroke-width="2"/>
          <line x1="0" y1="100" x2="200" y2="100" stroke="#7090a0" stroke-width="2"/>
        </svg>
      `)
    },
    {
      id: 'metal',
      name: '金属',
      url: 'data:image/svg+xml,' + encodeURIComponent(`
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#608090;stop-opacity:1" />
              <stop offset="25%" style="stop-color:#80a0b0;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#a0c0d0;stop-opacity:1" />
              <stop offset="75%" style="stop-color:#7090a0;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#507080;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="url(#metalGrad)"/>
          <rect x="0" y="0" width="200" height="200" fill="none" stroke="#406070" stroke-width="1" opacity="0.3"/>
        </svg>
      `)
    }
  ]

  return (
    <div>
      <label style={{ 
        color: '#e2e8f0', 
        fontSize: '13px', 
        display: 'block', 
        marginBottom: '12px', 
        fontWeight: '600' 
      }}>
        选择贴图
      </label>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '8px',
        marginBottom: '16px'
      }}>
        {sampleTextures.map(texture => (
          <div
            key={texture.id}
            onClick={() => setBuildingImage(texture.url)}
            style={{
              cursor: 'pointer',
              border: buildingImage === texture.url ? '2px solid #00d4ff' : '2px solid transparent',
              borderRadius: '6px',
              overflow: 'hidden',
              transition: 'all 0.2s',
              padding: '4px',
              background: 'rgba(1, 30, 68, 0.5)'
            }}
          >
            <img 
              src={texture.url} 
              alt={texture.name}
              style={{
                width: '100%',
                height: '60px',
                objectFit: 'cover',
                borderRadius: '4px'
              }}
            />
            <div style={{
              fontSize: '10px',
              color: '#94a3b8',
              textAlign: 'center',
              marginTop: '4px'
            }}>
              {texture.name}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setBuildingImage(null)}
        style={{
          width: '100%',
          padding: '8px',
          background: 'rgba(239, 68, 68, 0.2)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#ef4444',
          borderRadius: '6px',
          fontSize: '12px',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        清除贴图
      </button>
    </div>
  )
}

export default SimpleTexturePanel
