const Pomodoro2 = ({ onBack }) => {
  const [time, setTime] = React.useState(25 * 60);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    let interval;
    if (running && time > 0) interval = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [running, time]);

  const fmt = (t) => `${Math.floor(t / 60).toString().padStart(2, '0')}:${(t % 60).toString().padStart(2, '0')}`;

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Pomodoro Timer</h1>
      </header>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ width: '200px', height: '200px', borderRadius: '50%', background: '#f3f4f6', margin: '30px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '10px solid #ef4444' }}>
          <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#ef4444' }}>{fmt(time)}</span>
        </div>
        <button onClick={() => setRunning(!running)} style={{ padding: '18px 50px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontSize: '20px', marginRight: '10px' }}>
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => { setTime(25 * 60); setRunning(false); }} style={{ padding: '18px 30px', background: '#f3f4f6', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>
          Reset
        </button>
      </div>
    </div>
  );
};

window.Pomodoro2 = Pomodoro2;
