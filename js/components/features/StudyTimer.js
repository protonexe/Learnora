const StudyTimer = ({ onBack, showToast }) => {
  const [mode, setMode] = React.useState('study');
  const [timeLeft, setTimeLeft] = React.useState(25 * 60);
  const [isActive, setIsActive] = React.useState(false);
  const [sessions, setSessions] = React.useState(() => JSON.parse(localStorage.getItem('timer-sessions')) || []);

  const modes = {
    study: { label: 'Study', time: 25 * 60, color: '#6366f1', emoji: '📚' },
    shortBreak: { label: 'Short Break', time: 5 * 60, color: '#10b981', emoji: '☕' },
    longBreak: { label: 'Long Break', time: 15 * 60, color: '#0ea5e9', emoji: '🌴' }
  };

  React.useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      const session = { mode, completedAt: new Date().toISOString() };
      const newSessions = [...sessions, session];
      setSessions(newSessions);
      localStorage.setItem('timer-sessions', JSON.stringify(newSessions));
      showToast?.(`${modes[mode].label} complete!`, 'success');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  const percentage = ((modes[mode].time - timeLeft) / modes[mode].time) * 100;

  const startTimer = (m) => {
    setMode(m);
    setTimeLeft(modes[m].time);
    setIsActive(false);
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Timer</h1>
      </header>

      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>{modes[mode].emoji}</div>
        
        <div className="timer-circle" style={{ width: '250px', height: '250px', borderRadius: '50%', margin: '0 auto 30px', position: 'relative', background: '#f3f4f6' }}>
          <svg width="250" height="250" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="125" cy="125" r="110" fill="none" stroke="#e5e7eb" strokeWidth="12" />
            <circle cx="125" cy="125" r="110" fill="none" stroke={modes[mode].color} strokeWidth="12" strokeDasharray={`${percentage * 6.9} 690`} strokeLinecap="round" />
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '48px', fontWeight: 'bold', color: modes[mode].color }}>
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="mode-buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
          {Object.entries(modes).map(([key, m]) => (
            <button key={key} onClick={() => startTimer(key)} style={{ padding: '12px 20px', border: 'none', borderRadius: '25px', background: mode === key ? m.color : '#e5e7eb', color: mode === key ? 'white' : '#6b7280', cursor: 'pointer', fontWeight: '600' }}>
              {m.label}
            </button>
          ))}
        </div>

        <div className="controls" style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button onClick={() => setIsActive(!isActive)} style={{ padding: '15px 50px', fontSize: '18px', border: 'none', borderRadius: '30px', background: modes[mode].color, color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={() => { setTimeLeft(modes[mode].time); setIsActive(false); }} style={{ padding: '15px 30px', fontSize: '18px', border: '2px solid #e5e7eb', borderRadius: '30px', background: 'white', cursor: 'pointer' }}>
            Reset
          </button>
        </div>

        <div className="stats" style={{ marginTop: '40px', background: 'white', padding: '20px', borderRadius: '15px' }}>
          <h3 style={{ marginBottom: '15px', color: '#374151' }}>Today's Sessions: {sessions.filter(s => new Date(s.completedAt).toDateString() === new Date().toDateString()).length}</h3>
        </div>
      </div>
    </div>
  );
};

window.StudyTimer = StudyTimer;
