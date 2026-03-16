const SessionTimer = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = React.useState(25 * 60);
  const [isRunning, setIsRunning] = React.useState(false);
  const [mode, setMode] = React.useState('focus');

  const modes = [
    { id: 'focus', label: 'Focus', minutes: 25, color: '#f43f5e' },
    { id: 'short', label: 'Short Break', minutes: 5, color: '#10b981' },
    { id: 'long', label: 'Long Break', minutes: 15, color: '#0ea5e9' },
  ];

  React.useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const changeMode = (modeId) => {
    const m = modes.find(x => x.id === modeId);
    setMode(modeId);
    setTimeLeft(m.minutes * 60);
    setIsRunning(false);
  };

  const currentMode = modes.find(m => m.id === mode);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>⏱️ Session Timer</h2>
        <div style={{ width: 60 }} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 40, background: 'var(--bg-secondary)', padding: 6, borderRadius: 12 }}>
          {modes.map(m => (
            <button key={m.id} onClick={() => changeMode(m.id)} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: mode === m.id ? m.color : 'transparent', color: mode === m.id ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600 }}>{m.label}</button>
          ))}
        </div>

        <div style={{ position: 'relative', width: 240, height: 240, marginBottom: 40 }}>
          <svg style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
            <circle cx="120" cy="120" r="110" fill="none" stroke="var(--border-color)" strokeWidth="8" />
            <circle cx="120" cy="120" r="110" fill="none" stroke={currentMode.color} strokeWidth="8" strokeLinecap="round" strokeDasharray={2 * Math.PI * 110} strokeDashoffset={2 * Math.PI * 110 * (1 - timeLeft / (currentMode.minutes * 60))} style={{ transition: 'stroke-dashoffset 1s linear' }} />
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 700, fontFamily: 'monospace', color: currentMode.color }}>{formatTime(timeLeft)}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <button onClick={() => setIsRunning(!isRunning)} style={{ width: 64, height: 64, borderRadius: '50%', border: 'none', background: currentMode.color, color: 'white', cursor: 'pointer', fontSize: 20 }}>{isRunning ? '⏸' : '▶'}</button>
          <button onClick={() => { setTimeLeft(currentMode.minutes * 60); setIsRunning(false); }} style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid var(--border-color)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 16 }}>↺</button>
        </div>
      </div>
    </div>
  );
};
