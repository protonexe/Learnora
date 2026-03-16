const FocusTimer = ({ onBack, showToast, registerStudyActivity }) => {
  const isMobile = window.innerWidth <= 768;
  const [timeLeft, setTimeLeft] = React.useState(25 * 60);
  const [isRunning, setIsRunning] = React.useState(false);
  const [sessions, setSessions] = React.useState(() => {
    return JSON.parse(localStorage.getItem('study-sessions') || '[]');
  });
  const [customTime, setCustomTime] = React.useState(25);

  React.useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      const newSession = {
        id: Date.now(),
        date: new Date().toISOString(),
        duration: customTime,
        subject: 'Focus Session'
      };
      const updated = [newSession, ...sessions];
      setSessions(updated);
      localStorage.setItem('study-sessions', JSON.stringify(updated));
      registerStudyActivity?.();
      showToast?.('Great job! Session completed!', 'success');
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, customTime, sessions, registerStudyActivity, showToast]);

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  const setTimer = (minutes) => {
    setCustomTime(minutes);
    setTimeLeft(minutes * 60);
    setIsRunning(false);
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', justifyContent: 'center' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>🎯 Focus Timer</h1>
      </div>

      {/* Timer Circle */}
      <div style={styles.timerCircle}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="var(--bg-primary)" strokeWidth="8" />
          <circle cx="100" cy="100" r="90" fill="none" stroke="var(--primary-500)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 90}`} strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`} transform="rotate(-90 100 100)" style={{ transition: 'stroke-dashoffset 1s' }} />
        </svg>
        <div style={styles.timerText}>
          <span style={styles.timerValue}>{formatTime(timeLeft)}</span>
          <span style={styles.timerLabel}>{isRunning ? 'Focusing...' : 'Ready'}</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '32px' }}>
        {!isRunning ? (
          <button onClick={() => setIsRunning(true)} style={styles.startButton}>▶ Start</button>
        ) : (
          <button onClick={() => setIsRunning(false)} style={styles.pauseButton}>⏸ Pause</button>
        )}
        <button onClick={() => { setIsRunning(false); setTimeLeft(customTime * 60); }} style={styles.resetButton}>↺ Reset</button>
      </div>

      {/* Presets */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={styles.sectionTitle}>Quick Set</h3>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[15, 25, 45, 60].map(m => (
            <button key={m} onClick={() => setTimer(m)} style={{ ...styles.presetButton, background: customTime === m ? 'var(--primary-500)' : 'var(--bg-secondary)', color: customTime === m ? '#fff' : 'var(--text-secondary)' }}>{m}m</button>
          ))}
        </div>
      </div>

      {/* Today's Progress */}
      <div style={styles.progressCard}>
        <h3 style={styles.progressTitle}>Today's Progress</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={styles.progressValue}>{sessions.filter(s => new Date(s.date).toDateString() === new Date().toDateString()).length}</span>
            <span style={styles.progressLabel}>Sessions</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={styles.progressValue}>{Math.round(sessions.filter(s => new Date(s.date).toDateString() === new Date().toDateString()).reduce((sum, s) => sum + (s.duration || 0), 0))}m</span>
            <span style={styles.progressLabel}>Minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  timerCircle: { position: 'relative', width: '200px', height: '200px', margin: '0 auto' },
  timerText: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' },
  timerValue: { display: 'block', fontSize: '40px', fontWeight: '700', color: 'var(--primary-500)', fontFamily: 'monospace' },
  timerLabel: { fontSize: '14px', color: 'var(--text-tertiary)' },
  startButton: { background: '#10b981', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '14px 32px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  pauseButton: { background: '#f59e0b', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '14px 32px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  resetButton: { background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '14px 24px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  sectionTitle: { fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-secondary)' },
  presetButton: { padding: '10px 20px', borderRadius: 'var(--radius-md)', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  progressCard: { marginTop: '32px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px' },
  progressTitle: { fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' },
  progressValue: { display: 'block', fontSize: '28px', fontWeight: '700', color: 'var(--primary-500)' },
  progressLabel: { fontSize: '12px', color: 'var(--text-tertiary)' }
};

window.FocusTimer = FocusTimer;
