const FocusMode2 = ({ onBack }) => {
  const [active, setActive] = React.useState(false);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Focus Mode</h1>
      </header>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>{active ? '🎯' : '👀'}</div>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: active ? '#6366f1' : '#9ca3af', marginBottom: '30px' }}>
          {active ? 'Focusing...' : 'Ready'}
        </div>
        <button onClick={() => setActive(!active)} style={{ padding: '20px 60px', fontSize: '20px', border: 'none', borderRadius: '30px', background: active ? '#ef4444' : '#6366f1', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
          {active ? 'Stop Focus' : 'Start Focus'}
        </button>
      </div>
    </div>
  );
};

window.FocusMode2 = FocusMode2;
