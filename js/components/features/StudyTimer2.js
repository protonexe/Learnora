const StudyTimer2 = ({ onBack }) => {
  const [seconds, setSeconds] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    let interval;
    if (running) interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  const fmt = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Timer</h1>
      </header>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '72px', fontWeight: 'bold', color: '#10b981', marginBottom: '30px' }}>{fmt(seconds)}</div>
        <button onClick={() => setRunning(!running)} style={{ padding: '18px 50px', background: '#10b981', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontSize: '20px', marginRight: '10px' }}>
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => { setRunning(false); setSeconds(0); }} style={{ padding: '18px 30px', background: '#f3f4f6', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>
          Reset
        </button>
      </div>
    </div>
  );
};

window.StudyTimer2 = StudyTimer2;
