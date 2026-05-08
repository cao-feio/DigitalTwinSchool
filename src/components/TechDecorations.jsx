import React from 'react'

export const CornerDecoration = () => (
  <>
    {/* 左上角装饰 */}
    <div style={{
      position: 'absolute',
      top: '85px',
      left: '100px',
      width: '120px',
      height: '120px',
      pointerEvents: 'none',
      zIndex: '5'
    }}>
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '70px',
        height: '2px',
        background: 'linear-gradient(90deg, #00d4ff, transparent)'
      }} />
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '2px',
        height: '70px',
        background: 'linear-gradient(180deg, #00d4ff, transparent)'
      }} />
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '35px',
        height: '35px',
        borderTop: '1px solid rgba(0, 212, 255, 0.45)',
        borderLeft: '1px solid rgba(0, 212, 255, 0.45)'
      }} />
    </div>

    {/* 右上角装饰 */}
    <div style={{
      position: 'absolute',
      top: '85px',
      right: '370px',
      width: '120px',
      height: '120px',
      pointerEvents: 'none',
      zIndex: '5'
    }}>
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '70px',
        height: '2px',
        background: 'linear-gradient(270deg, #00d4ff, transparent)'
      }} />
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '2px',
        height: '70px',
        background: 'linear-gradient(180deg, #00d4ff, transparent)'
      }} />
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '35px',
        height: '35px',
        borderTop: '1px solid rgba(0, 212, 255, 0.45)',
        borderRight: '1px solid rgba(0, 212, 255, 0.45)'
      }} />
    </div>
  </>
)

export const DataPanel = () => (
  <div style={{
    display: 'flex',
    gap: '30px',
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
    padding: '12px 25px',
    borderRadius: '4px',
    textAlign: 'center',
    minWidth: '120px'
  }}>
    <div className="data-value" style={{
      fontSize: '30px',
      fontWeight: 'bold',
      marginBottom: '6px',
      letterSpacing: '1px'
    }}>
      {value}
      <span style={{ fontSize: '16px', marginLeft: '4px' }}>{unit}</span>
    </div>
    <div style={{
      fontSize: '12px',
      color: '#94a3b8',
      letterSpacing: '3px'
    }}>
      {label}
    </div>
  </div>
)

export default { CornerDecoration, DataPanel }
