const PomodoroWidget = ({ onClose, isEmbedded }) => {
  const [timeLeft, setTimeLeft] = React.useState(25 * 60);
  const [isActive, setIsActive] = React.useState(false);
  const [mode, setMode] = React.useState('focus');
  const [sessions, setSessions] = React.useState(() => {
    const saved = localStorage.getItem('learnora-pomodoro-sessions');
    return saved ? JSON.parse(saved) : [];
  });
  const [dailyGoal, setDailyGoal] = React.useState(4);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  const modes = {
    focus: { label: 'Focus', minutes: 25, color: '#f43f5e', icon: '🎯' },
    shortBreak: { label: 'Short Break', minutes: 5, color: '#10b981', icon: '☕' },
    longBreak: { label: 'Long Break', minutes: 15, color: '#0ea5e9', icon: '🌴' },
  };

  const saveSessions = (newSessions) => {
    setSessions(newSessions);
    localStorage.setItem('learnora-pomodoro-sessions', JSON.stringify(newSessions));
  };

  React.useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleComplete = () => {
    setIsActive(false);
    
    if (mode === 'focus') {
      const newSession = {
        id: Date.now(),
        date: new Date().toISOString(),
        duration: modes.focus.minutes,
        completedAt: new Date().toISOString()
      };
      saveSessions([...sessions, newSession]);
    }

    if (soundEnabled && window.Audio) {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleScHV6Hg5b17IglUqeHjuHMiB0qs4N+2gigKVKrg3bOBIApUq+DdtYEfClOr4Ny0gR8KVKvh3LSBHQlTq+DatIEdCVSr4dq0gR0JVKvh2bOBGwlUq+HYsoEaCVSr4diygRkJVKvh2LGBGAdVq+HWsoAXB1Sr4dWxgBcHVKvh1bGAFwdUq+HUsoAVBlSr4dOygBUGVKvh07KAFQZUq+HTsoAVBlSr4dOygBUGVKvh07KAFQZUq+HTsoASBdSr4dOygBIF1Kvh07KAEgXUq+HTsoASBdSr4dOygBIF1Kvh07KAEgXUq+HTsoASBtSr4dOygBIG1Kvh07KAEgbUq+HTsoASBtSr4dOygBIG1Kvh07KA');
      audio.play().catch(() => {});
    }

    const nextMode = mode === 'focus' ? 'shortBreak' : 'focus';
    setMode(nextMode);
    setTimeLeft(modes[nextMode].minutes * 60);
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(modes[mode].minutes * 60);
  };

  const changeMode = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(modes[newMode].minutes * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const todaySessions = sessions.filter(s => {
    const sessionDate = new Date(s.completedAt).toDateString();
    return sessionDate === new Date().toDateString();
  });

  const totalFocusTime = todaySessions.reduce((acc, s) => acc + s.duration, 0);

  const getProgress = () => {
    return Math.min((todaySessions.length / dailyGoal) * 100, 100);
  };

  if (isEmbedded) {
    return (
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: 12,
        padding: 16,
        border: '1px solid var(--border-color)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12
        }}>
          <h3 style={{ margin: 0, fontSize: 14, color: 'var(--text-primary)' }}>🍅 Pomodoro</h3>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            {todaySessions.length}/{dailyGoal} sessions
          </span>
        </div>
        
        <div style={{
          textAlign: 'center',
          padding: '12px 0'
        }}>
          <div style={{
            fontSize: 32,
            fontWeight: 700,
            fontFamily: 'monospace',
            color: modes[mode].color
          }}>
            {formatTime(timeLeft)}
          </div>
          <div style={{
            fontSize: 12,
            color: 'var(--text-secondary)',
            marginTop: 4
          }}>
            {modes[mode].icon} {modes[mode].label}
          </div>
        </div>

        <div style={{
          height: 4,
          background: 'var(--bg)',
          borderRadius: 2,
          marginBottom: 12,
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${getProgress()}%`,
            background: modes[mode].color,
            transition: 'width 0.3s ease'
          }} />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={toggleTimer}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: 6,
              border: 'none',
              background: isActive ? 'var(--border-color)' : modes[mode].color,
              color: isActive ? 'var(--text-primary)' : 'white',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600
            }}
          >
            {isActive ? '⏸ Pause' : '▶ Start'}
          </button>
          <button
            onClick={resetTimer}
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              border: 'none',
              background: 'var(--bg)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 12
            }}
          >
            ↺
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-primary)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--bg)',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}>
            ← Back
          </button>
          <h2 style={{ margin: 0, fontSize: 20 }}>🍅 Pomodoro Timer</h2>
        </div>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          style={{
            padding: '8px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--bg)',
            color: soundEnabled ? 'var(--primary)' : 'var(--text-tertiary)',
            cursor: 'pointer',
            fontSize: 18
          }}
        >
          {soundEnabled ? '🔔' : '🔕'}
        </button>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      }}>
        {/* Mode Selector */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 40,
          background: 'var(--bg-secondary)',
          padding: 6,
          borderRadius: 12
        }}>
          {Object.entries(modes).map(([key, m]) => (
            <button
              key={key}
              onClick={() => changeMode(key)}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: 'none',
                background: mode === key ? m.color : 'transparent',
                color: mode === key ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        {/* Timer Circle */}
        <div style={{
          position: 'relative',
          width: 280,
          height: 280,
          marginBottom: 40
        }}>
          <svg style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'rotate(-90deg)'
          }}>
            <circle
              cx="140"
              cy="140"
              r="130"
              fill="none"
              stroke="var(--border-color)"
              strokeWidth="8"
            />
            <circle
              cx="140"
              cy="140"
              r="130"
              fill="none"
              stroke={modes[mode].color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 130}
              strokeDashoffset={2 * Math.PI * 130 * (1 - timeLeft / (modes[mode].minutes * 60))}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: 56,
              fontWeight: 700,
              fontFamily: 'monospace',
              color: modes[mode].color
            }}>
              {formatTime(timeLeft)}
            </div>
            <div style={{
              fontSize: 16,
              color: 'var(--text-secondary)',
              marginTop: 8
            }}>
              {modes[mode].icon} {modes[mode].label}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 16 }}>
          <button
            onClick={toggleTimer}
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: 'none',
              background: modes[mode].color,
              color: 'white',
              cursor: 'pointer',
              fontSize: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 20px ${modes[mode].color}40`
            }}
          >
            {isActive ? '⏸' : '▶'}
          </button>
          <button
            onClick={resetTimer}
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              border: 'none',
              background: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 18
            }}
          >
            ↺
          </button>
        </div>

        {/* Today's Stats */}
        <div style={{
          marginTop: 40,
          background: 'var(--bg-secondary)',
          borderRadius: 12,
          padding: 20,
          width: '100%',
          maxWidth: 400,
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 14, color: 'var(--text-secondary)' }}>Today's Progress</h3>
          <div style={{
            height: 8,
            background: 'var(--bg)',
            borderRadius: 4,
            marginBottom: 12,
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${getProgress()}%`,
              background: modes[mode].color,
              transition: 'width 0.3s ease'
            }} />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 13
          }}>
            <span style={{ color: 'var(--text-secondary)' }}>
              {todaySessions.length} of {dailyGoal} sessions
            </span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              {Math.round(totalFocusTime / 60)}h {totalFocusTime % 60}m focus time
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
