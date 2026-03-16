const TimeTracker = ({ onBack }) => {
  const [logs, setLogs] = React.useState(() => JSON.parse(localStorage.getItem('time-logs')) || []);

  const subjects = ['Math', 'Physics', 'Chemistry', 'Biology', 'History', 'English'];
  const [selected, setSelected] = React.useState(subjects[0]);
  const [running, setRunning] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const save = () => {
    if (seconds === 0) return;
    const newLog = { id: Date.now(), subject: selected, seconds, date: new Date().toISOString().split('T')[0] };
    const updated = [newLog, ...logs];
    setLogs(updated);
    localStorage.setItem('time-logs', JSON.stringify(updated));
    setSeconds(0);
  };

  const fmt = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Time Tracker</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <select value={selected} onChange={(e) => setSelected(e.target.value)} style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '2px solid #e5e7eb', marginBottom: '20px', fontSize: '16px' }}>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#6366f1', marginBottom: '15px' }}>{fmt(seconds)}</div>
          <button onClick={() => setRunning(!running)} style={{ padding: '15px 40px', background: running ? '#ef4444' : '#6366f1', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontSize: '18px', marginRight: '10px' }}>
            {running ? 'Stop' : 'Start'}
          </button>
          <button onClick={save} disabled={seconds === 0} style={{ padding: '15px 30px', background: '#10b981', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', opacity: seconds === 0 ? 0.5 : 1 }}>
            Save
          </button>
        </div>
        <h3>Recent Sessions</h3>
        {logs.slice(0, 5).map(l => (
          <div key={l.id} style={{ background: 'white', padding: '12px', borderRadius: '10px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <span>{l.subject}</span>
            <span style={{ fontWeight: '600' }}>{fmt(l.seconds)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

window.TimeTracker = TimeTracker;
