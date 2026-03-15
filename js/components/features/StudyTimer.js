const StudyTimer = ({ onComplete, onClose }) => {
  const isMobile = window.innerWidth <= 768;
  const [mode, setMode] = React.useState('pomodoro');
  const [timeLeft, setTimeLeft] = React.useState(25 * 60);
  const [isRunning, setIsRunning] = React.useState(false);
  const [sessions, setSessions] = React.useState(0);
  const [totalMinutes, setTotalMinutes] = React.useState(0);

  const modes = {
    pomodoro: { label: 'Focus', minutes: 25, color: '#6366f1', icon: '🎯' },
    shortBreak: { label: 'Short Break', minutes: 5, color: '#10b981', icon: '☕' },
    longBreak: { label: 'Long Break', minutes: 15, color: '#8b5cf6', icon: '🛏️' }
  };

  React.useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleComplete = () => {
    setIsRunning(false);
    setTotalMinutes(prev => prev + modes[mode].minutes);
    
    if (mode === 'pomodoro') {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      
      if (newSessions % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(modes.longBreak.minutes * 60);
      } else {
        setMode('shortBreak');
        setTimeLeft(modes.shortBreak.minutes * 60);
      }
    } else {
      setMode('pomodoro');
      setTimeLeft(modes.pomodoro.minutes * 60);
    }
    
    onComplete?.(mode);
    
    if (window.showToast) {
      window.showToast(
        mode === 'pomodoro' ? 'Focus session complete! Time for a break.' : 'Break over! Ready to focus?',
        'success'
      );
    }
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modes[mode].minutes * 60);
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(modes[newMode].minutes * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((modes[mode].minutes * 60 - timeLeft) / (modes[mode].minutes * 60)) * 100;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: isMobile ? '20px' : '24px',
        padding: isMobile ? '24px' : '32px',
        width: isMobile ? '90vw' : '400px',
        maxWidth: '400px',
        textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Mode Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '24px',
          background: 'var(--bg-tertiary)',
          padding: '4px',
          borderRadius: '12px'
        }}>
          {Object.entries(modes).map(([key, value]) => (
            <button
              key={key}
              onClick={() => changeMode(key)}
              style={{
                flex: 1,
                padding: '10px 8px',
                background: mode === key ? value.color : 'transparent',
                color: mode === key ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
            >
              {value.label}
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div style={{ marginBottom: '24px', position: 'relative' }}>
          <svg width="200" height="200" viewBox="0 0 200 200" style={{ margin: '0 auto' }}>
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="var(--bg-tertiary)"
              strokeWidth="8"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={modes[mode].color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
              transform="rotate(-90 100 100)"
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
            <div style={{ 
              fontSize: isMobile ? '42px' : '48px', 
              fontWeight: '800', 
              color: 'var(--text-primary)',
              fontFamily: 'monospace',
              letterSpacing: '-2px'
            }}>
              {formatTime(timeLeft)}
            </div>
            <div style={{ 
              fontSize: '14px', 
              color: modes[mode].color,
              fontWeight: '600',
              marginTop: '4px'
            }}>
              {modes[mode].icon} {modes[mode].label}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
          <button
            onClick={toggleTimer}
            style={{
              padding: '14px 36px',
              background: modes[mode].color,
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: `0 4px 14px ${modes[mode].color}40`
            }}
          >
            <Icon name={isRunning ? 'pause' : 'play'} size={20} />
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            style={{
              padding: '14px 20px',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            <Icon name="rotate-ccw" size={18} />
          </button>
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '24px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-color)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--primary-500)' }}>{sessions}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Sessions</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent-green)' }}>{totalMinutes}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Minutes</div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'var(--bg-tertiary)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            color: 'var(--text-secondary)'
          }}
        >
          <Icon name="x" size={18} />
        </button>
      </div>
    </div>
  );
};

window.StudyTimer = StudyTimer;
