const LiveSession = ({ onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#000', zIndex: 2000, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'rgba(0,0,0,0.8)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>← Leave</button>
        <span style={{ color: 'white', fontWeight: 600 }}>🔴 Live Session</span>
        <div style={{ width: 60 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📹</div>
          <div style={{ fontSize: 24 }}>Live Classroom</div>
          <div style={{ fontSize: 14, opacity: 0.7, marginTop: 8 }}>Waiting for host to start...</div>
        </div>
      </div>
    </div>
  );
};
