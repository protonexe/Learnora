const FocusTimer = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = React.useState(25 * 60);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, padding: '10px 16px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer' }}>Exit</button>
      <div style={{ fontSize: 72, fontWeight: 700, fontFamily: 'monospace', marginBottom: 32 }}>{formatTime(timeLeft)}</div>
      <div style={{ display: 'flex', gap: 16 }}>
        <button onClick={() => setIsRunning(!isRunning)} style={{ width: 64, height: 64, borderRadius: '50%', border: 'none', background: '#f43f5e', color: 'white', cursor: 'pointer', fontSize: 20 }}>{isRunning ? '⏸' : '▶'}</button>
        <button onClick={() => { setTimeLeft(25 * 60); setIsRunning(false); }} style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', background: 'transparent', color: 'white', cursor: 'pointer', fontSize: 16 }}>↺</button>
      </div>
    </div>
  );
};
