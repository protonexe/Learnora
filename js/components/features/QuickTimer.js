const QuickTimer = ({ onBack }) => {
  const [time, setTime] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    let interval;
    if (running) interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  const fmt = (t) => `${Math.floor(t / 60).toString().padStart(2, '0')}:${(t % 60).toString().padStart(2, '0')}`;

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Quick Timer</h1>
      </header>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', fontWeight: 'bold', color: '#6366f1', marginBottom: '30px' }}>{fmt(time)}</div>
        <button onClick={() => setRunning(!running)} style={{ padding: '15px 40px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontSize: '18px', marginRight: '10px' }}>
          {running ? 'Stop' : 'Start'}
        </button>
        <button onClick={() => { setRunning(false); setTime(0); }} style={{ padding: '15px 30px', background: '#f3f4f6', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>
          Reset
        </button>
      </div>
    </div>
  );
};

window.QuickTimer = QuickTimer;
