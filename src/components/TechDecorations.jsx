import React from 'react'

export const CornerDecoration = () => (
  <>
    {/* 左上角装饰 */}
    <div style={{
      position: 'absolute',
      top: '90px',
      left: '120px',
      width: '140px',
      height: '140px',
      pointerEvents: 'none',
      zIndex: '5'
    }}>
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '85px',
        height: '3px',
        background: 'linear-gradient(90deg, #00d4ff, rgba(0, 212, 255, 0.3), transparent)',
        boxShadow: '0 0 10px rgba(0, 212, 255, 0.4)'
      }} />
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '3px',
        height: '85px',
        background: 'linear-gradient(180deg, #00d4ff, rgba(0, 212, 255, 0.3), transparent)',
        boxShadow: '0 0 10px rgba(0, 212, 255, 0.4)'
      }} />
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        width: '45px',
        height: '45px',
        borderTop: '2px solid rgba(0, 212, 255, 0.6)',
        borderLeft: '2px solid rgba(0, 212, 255, 0.6)',
        boxShadow: 'inset 10px 10px 20px rgba(0, 212, 255, 0.08)'
      }} />
      <div style={{
        position: 'absolute',
        top: '5px',
        left: '5px',
        width: '8px',
        height: '8px',
        background: '#00d4ff',
        borderRadius: '50%',
        boxShadow: '0 0 15px rgba(0, 212, 255, 0.8)'
      }} />
    </div>

    {/* 右上角装饰 */}
    <div style={{
      position: 'absolute',
      top: '90px',
      right: '400px',
      width: '140px',
      height: '140px',
      pointerEvents: 'none',
      zIndex: '5'
    }}>
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '85px',
        height: '3px',
        background: 'linear-gradient(270deg, #00d4ff, rgba(0, 212, 255, 0.3), transparent)',
        boxShadow: '0 0 10px rgba(0, 212, 255, 0.4)'
      }} />
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '3px',
        height: '85px',
        background: 'linear-gradient(180deg, #00d4ff, rgba(0, 212, 255, 0.3), transparent)',
        boxShadow: '0 0 10px rgba(0, 212, 255, 0.4)'
      }} />
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        width: '45px',
        height: '45px',
        borderTop: '2px solid rgba(0, 212, 255, 0.6)',
        borderRight: '2px solid rgba(0, 212, 255, 0.6)',
        boxShadow: 'inset -10px 10px 20px rgba(0, 212, 255, 0.08)'
      }} />
      <div style={{
        position: 'absolute',
        top: '5px',
        right: '5px',
        width: '8px',
        height: '8px',
        background: '#00d4ff',
        borderRadius: '50%',
        boxShadow: '0 0 15px rgba(0, 212, 255, 0.8)'
      }} />
    </div>
  </>
)

export const DataPanel = () => (
  <div style={{
    display: 'flex',
    gap: '35px',
    zIndex: '5',
    pointerEvents: 'none'
  }}>
    <DataCard label="总建筑面积" value="85,600" unit="㎡" color="#00d4ff" />
    <DataCard label="建筑数量" value="12" unit="栋" color="#60a5fa" />
    <DataCard label="管线总长" value="3.2" unit="km" color="#8b5cf6" />
    <DataCard label="在线设备" value="426" unit="台" color="#f59e0b" />
  </div>
)

const DataCard = ({ label, value, unit, color }) => (
  <div className="data-card" style={{
    padding: '16px 32px',
    borderRadius: '8px',
    textAlign: 'center',
    minWidth: '150px',
    background: `linear-gradient(135deg, rgba(1, 30, 68, 0.95) 0%, rgba(1, 21, 60, 0.90) 100%)`,
    border: `1px solid ${color}40`,
    boxShadow: `0 0 25px ${color}15, inset 0 0 30px ${color}10`
  }}>
    <div style={{
      position: 'absolute',
      top: '-1px',
      left: '20px',
      width: '40px',
      height: '2px',
      background: `linear-gradient(90deg, transparent, ${color}, transparent)`
    }} />
    <div style={{
      position: 'absolute',
      bottom: '-1px',
      right: '20px',
      width: '40px',
      height: '2px',
      background: `linear-gradient(90deg, transparent, ${color}, transparent)`
    }} />
    <div className="data-value" style={{
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '8px',
      letterSpacing: '1.5px',
      background: `linear-gradient(135deg, ${color}, ${color}dd, ${color}aa)`,
      backgroundSize: '200% auto',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: `0 0 30px ${color}50`
    }}>
      {value}
      <span style={{ fontSize: '18px', marginLeft: '6px', fontWeight: 500 }}>{unit}</span>
    </div>
    <div style={{
      fontSize: '13px',
      color: '#94a3b8',
      letterSpacing: '3.5px',
      fontWeight: 500,
      textTransform: 'uppercase'
    }}>
      {label}
    </div>
  </div>
)

export default { CornerDecoration, DataPanel }
