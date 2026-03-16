const SessionTimer = ({ onBack }) => {
  const [time, setTime] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const format = (t) => `${Math.floor(t / 60).toString().padStart(2, '0')}:${(t % 60).toString().padStart(2, '0')}`;

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Session Timer</h1>
      </header>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '72px', fontWeight: 'bold', color: '#6366f1', marginBottom: '30px' }}>{format(time)}</div>
        <button onClick={() => setRunning(!running)} style={{ padding: '18px 50px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontSize: '20px', marginRight: '10px' }}>
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => { setRunning(false); setTime(0); }} style={{ padding: '18px 30px', background: '#f3f4f6', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>
          Reset
        </button>
      </div>
    </div>
  );
};

window.SessionTimer = SessionTimer;
