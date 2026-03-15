const StudyTimer = ({ isOpen, onClose, onComplete }) => {
  const [mode, setMode] = React.useState('focus');
  const [timeLeft, setTimeLeft] = React.useState(25 * 60);
  const [isRunning, setIsRunning] = React.useState(false);
  const [sessions, setSessions] = React.useState(0);

  const modes = {
    focus: { label: 'Focus', minutes: 25, color: 'var(--primary-500)' },
    shortBreak: { label: 'Short Break', minutes: 5, color: 'var(--success)' },
    longBreak: { label: 'Long Break', minutes: 15, color: 'var(--accent-blue)' }
  };

  React.useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === 'focus') {
        setSessions(s => s + 1);
        if (onComplete) onComplete();
      }
      const notification = new Notification('Learnora', {
        body: `${modes[mode].label} session completed!`,
        icon: '📚'
      });
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, onComplete]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setTimeLeft(modes[newMode].minutes * 60);
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeLeft(modes[mode].minutes * 60);
    setIsRunning(false);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: '24px',
        padding: '32px',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '24px' }}>✕</button>
        
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}>
          {Object.entries(modes).map(([key, m]) => (
            <button key={key} onClick={() => handleModeChange(key)} style={{ padding: '8px 16px', background: mode === key ? m.color : 'var(--bg-tertiary)', color: mode === key ? '#fff' : 'var(--text-secondary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}>
              {m.label}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '72px', fontWeight: '700', color: modes[mode].color, marginBottom: '24px', fontFamily: 'monospace' }}>
          {formatTime(timeLeft)}
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '24px' }}>
          <button onClick={() => setIsRunning(!isRunning)} style={{ width: '64px', height: '64px', borderRadius: '50%', background: modes[mode].color, border: 'none', color: '#fff', cursor: 'pointer', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isRunning ? '⏸️' : '▶️'}
          </button>
          <button onClick={resetTimer} style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-tertiary)', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            🔄
          </button>
        </div>

        <div style={{ background: 'var(--bg-tertiary)', borderRadius: '12px', padding: '12px' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Sessions completed today: <strong style={{ color: 'var(--primary-500)' }}>{sessions}</strong></p>
        </div>
      </div>
    </div>
  );
};

window.StudyTimer = StudyTimer;
