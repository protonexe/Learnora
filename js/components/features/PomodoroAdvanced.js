const PomodoroAdvanced = ({ onBack, showToast }) => {
  const [mode, setMode] = React.useState('focus');
  const [timeLeft, setTimeLeft] = React.useState(25 * 60);
  const [isActive, setIsActive] = React.useState(false);
  const [sessions, setSessions] = React.useState(() => JSON.parse(localStorage.getItem('pomodoro-sessions')) || []);
  const [currentTask, setCurrentTask] = React.useState('');
  const [stats, setStats] = React.useState(() => JSON.parse(localStorage.getItem('pomodoro-stats')) || { focus: 0, shortBreak: 0, longBreak: 0 });

  const modes = {
    focus: { time: 25 * 60, label: 'Focus', color: '#f43f5e' },
    shortBreak: { time: 5 * 60, label: 'Short Break', color: '#10b981' },
    longBreak: { time: 15 * 60, label: 'Long Break', color: '#0ea5e9' }
  };

  React.useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      const newSession = { mode, completedAt: new Date().toISOString(), task: currentTask };
      const newSessions = [...sessions, newSession];
      setSessions(newSessions);
      localStorage.setItem('pomodoro-sessions', JSON.stringify(newSessions));
      setStats(s => ({ ...s, [mode]: s[mode] + 1 }));
      localStorage.setItem('pomodoro-stats', JSON.stringify({ ...stats, [mode]: stats[mode] + 1 }));
      showToast?.(`${modes[mode].label} completed!`, 'success');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  const progress = ((modes[mode].time - timeLeft) / modes[mode].time) * 100;

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Advanced Pomodoro</h1>
      </header>

      <div className="pomodoro-container" style={{ padding: '20px' }}>
        <div className="mode-selector" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
          {Object.entries(modes).map(([key, m]) => (
            <button
              key={key}
              onClick={() => { setMode(key); setTimeLeft(m.time); setIsActive(false); }}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '20px',
                background: mode === key ? m.color : '#e5e7eb',
                color: mode === key ? 'white' : '#374151',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="timer-display" style={{ textAlign: 'center', marginBottom: '30px' }}>
          <svg width="250" height="250" viewBox="0 0 250 250">
            <circle cx="125" cy="125" r="110" fill="none" stroke="#e5e7eb" strokeWidth="10" />
            <circle
              cx="125" cy="125" r="110" fill="none"
              stroke={modes[mode].color} strokeWidth="10"
              strokeDasharray={`${progress * 6.9} 690`}
              strokeLinecap="round"
              transform="rotate(-90 125 125)"
              style={{ transition: 'stroke-dasharray 0.5s ease' }}
            />
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '48px', fontWeight: 'bold', color: modes[mode].color }}>
            {formatTime(timeLeft)}
          </div>
        </div>

        <input
          type="text"
          placeholder="What are you working on?"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '2px solid #e5e7eb', marginBottom: '20px', fontSize: '16px' }}
        />

        <div className="timer-controls" style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button
            onClick={() => setIsActive(!isActive)}
            style={{
              padding: '15px 50px',
              fontSize: '18px',
              border: 'none',
              borderRadius: '25px',
              background: modes[mode].color,
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={() => { setTimeLeft(modes[mode].time); setIsActive(false); }}
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              border: '2px solid #e5e7eb',
              borderRadius: '25px',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>

        <div className="stats-section" style={{ marginTop: '40px' }}>
          <h3 style={{ marginBottom: '15px' }}>Today's Sessions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
            <div className="stat-card" style={{ padding: '20px', background: '#fef2f2', borderRadius: '15px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f43f5e' }}>{stats.focus}</div>
              <div style={{ color: '#6b7280' }}>Focus</div>
            </div>
            <div className="stat-card" style={{ padding: '20px', background: '#ecfdf5', borderRadius: '15px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>{stats.shortBreak}</div>
              <div style={{ color: '#6b7280' }}>Short Break</div>
            </div>
            <div className="stat-card" style={{ padding: '20px', background: '#f0f9ff', borderRadius: '15px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0ea5e9' }}>{stats.longBreak}</div>
              <div style={{ color: '#6b7280' }}>Long Break</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.PomodoroAdvanced = PomodoroAdvanced;
