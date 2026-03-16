const FocusWidget = ({ onBack, showToast }) => {
  const [minutes, setMinutes] = React.useState(25);
  const [seconds, setSeconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    let interval;
    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            showToast?.('Time\'s up!', 'success');
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, showToast]);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Focus Timer</h1>
      </header>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '72px', fontWeight: 'bold', color: '#6366f1', marginBottom: '30px' }}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <button onClick={() => setIsActive(!isActive)} style={{ padding: '18px 60px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontSize: '20px', marginRight: '10px' }}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => { setMinutes(25); setSeconds(0); setIsActive(false); }} style={{ padding: '18px 30px', background: '#f3f4f6', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>
          Reset
        </button>
      </div>
    </div>
  );
};

window.FocusWidget = FocusWidget;
