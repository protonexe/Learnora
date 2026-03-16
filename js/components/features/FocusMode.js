const FocusMode = ({ onBack, showToast }) => {
  const [enabled, setEnabled] = React.useState(false);
  const [distractions, setDistractions] = React.useState(0);
  const [sessionStart, setSessionStart] = React.useState(null);
  const [elapsed, setElapsed] = React.useState(0);

  React.useEffect(() => {
    let interval;
    if (enabled && sessionStart) {
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - sessionStart) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [enabled, sessionStart]);

  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const toggleFocus = () => {
    if (!enabled) {
      setSessionStart(Date.now());
      setElapsed(0);
      setDistractions(0);
      showToast?.('Focus mode activated - Stay focused!', 'info');
    } else {
      showToast?.(`Focus session: ${formatTime(elapsed)}`, 'success');
    }
    setEnabled(!enabled);
  };

  const addDistraction = () => {
    if (enabled) {
      setDistractions(d => d + 1);
      showToast?.('Distraction logged - Stay focused!', 'error');
    }
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Focus Mode</h1>
      </header>

      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>{enabled ? '🎯' : '👀'}</div>
        
        <div style={{ fontSize: '56px', fontWeight: 'bold', color: enabled ? '#6366f1' : '#9ca3af', marginBottom: '10px' }}>
          {formatTime(elapsed)}
        </div>
        
        <p style={{ color: '#6b7280', marginBottom: '30px' }}>
          {enabled ? 'Stay focused! You can do this.' : 'Ready to focus?'}
        </p>

        <button
          onClick={toggleFocus}
          style={{
            padding: '20px 60px',
            fontSize: '20px',
            border: 'none',
            borderRadius: '30px',
            background: enabled ? '#ef4444' : '#6366f1',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginBottom: '30px'
          }}
        >
          {enabled ? 'End Session' : 'Start Focus'}
        </button>

        {enabled && (
          <div style={{ background: '#fef2f2', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
            <button
              onClick={addDistraction}
              style={{ background: '#fee2e2', border: 'none', padding: '10px 20px', borderRadius: '10px', color: '#ef4444', cursor: 'pointer' }}
            >
              + Log Distraction
            </button>
            <div style={{ marginTop: '10px', fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>
              {distractions} distractions
            </div>
          </div>
        )}

        <div className="tips" style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'left' }}>
          <h3 style={{ marginBottom: '15px' }}>Focus Tips</h3>
          <ul style={{ color: '#6b7280', paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>Put your phone on silent</li>
            <li>Clear your workspace</li>
            <li>Set a clear goal</li>
            <li>Take breaks every 25 minutes</li>
            <li>Stay hydrated</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

window.FocusMode = FocusMode;
