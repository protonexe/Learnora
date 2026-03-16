const FocusMode = ({ onClose, isActive, onToggle }) => {
  const [timer, setTimer] = React.useState(25 * 60);
  const [isRunning, setIsRunning] = React.useState(false);
  const [sessionType, setSessionType] = React.useState('focus');
  const [blocklist, setBlocklist] = React.useState(() => {
    const saved = localStorage.getItem('learnora-focus-blocklist');
    return saved ? JSON.parse(saved) : ['social', 'entertainment', 'games'];
  });
  const [showBlocklist, setShowBlocklist] = React.useState(false);
  const [newSite, setNewSite] = React.useState('');

  const sessionTypes = [
    { id: 'focus', label: 'Focus', minutes: 25, color: '#f43f5e' },
    { id: 'short', label: 'Short Break', minutes: 5, color: '#10b981' },
    { id: 'long', label: 'Long Break', minutes: 15, color: '#0ea5e9' },
  ];

  React.useEffect(() => {
    let interval = null;
    if (isRunning && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const changeSession = (type) => {
    setSessionType(type);
    setTimer(sessionTypes.find(t => t.id === type).minutes * 60);
    setIsRunning(false);
  };

  const addToBlocklist = () => {
    if (!newSite.trim()) return;
    const updated = [...blocklist, newSite.toLowerCase()];
    setBlocklist(updated);
    localStorage.setItem('learnora-focus-blocklist', JSON.stringify(updated));
    setNewSite('');
  };

  const removeFromBlocklist = (site) => {
    const updated = blocklist.filter(s => s !== site);
    setBlocklist(updated);
    localStorage.setItem('learnora-focus-blocklist', JSON.stringify(updated));
  };

  const currentSession = sessionTypes.find(t => t.id === sessionType);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.3s ease'
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        display: 'flex',
        gap: 12
      }}>
        <button
          onClick={onClose}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          ← Exit Focus
        </button>
        <button
          onClick={() => setShowBlocklist(!showBlocklist)}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          🚫 Blocklist
        </button>
      </div>

      {/* Blocklist Panel */}
      {showBlocklist && (
        <div style={{
          position: 'absolute',
          top: 80,
          right: 20,
          background: 'rgba(0,0,0,0.8)',
          borderRadius: 12,
          padding: 16,
          width: 280,
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h3 style={{ margin: '0 0 12px 0', color: 'white', fontSize: 14 }}>Blocked Sites</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
            {blocklist.map(site => (
              <span
                key={site}
                style={{
                  padding: '4px 8px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  color: 'white',
                  fontSize: 11,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                {site}
                <button
                  onClick={() => removeFromBlocklist(site)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: 12
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={newSite}
              onChange={(e) => setNewSite(e.target.value)}
              placeholder="Add site..."
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: 12
              }}
            />
            <button
              onClick={addToBlocklist}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                border: 'none',
                background: currentSession.color,
                color: 'white',
                cursor: 'pointer',
                fontSize: 12
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Session Type Selector */}
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 40,
        background: 'rgba(255,255,255,0.1)',
        padding: 6,
        borderRadius: 12
      }}>
        {sessionTypes.map(type => (
          <button
            key={type.id}
            onClick={() => changeSession(type.id)}
            style={{
              padding: '12px 24px',
              borderRadius: 8,
              border: 'none',
              background: sessionType === type.id ? type.color : 'transparent',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 14
            }}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Timer Circle */}
      <div style={{
        position: 'relative',
        width: 320,
        height: 320,
        marginBottom: 40
      }}>
        <svg style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'rotate(-90deg)'
        }}>
          <circle
            cx="160"
            cy="160"
            r="150"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <circle
            cx="160"
            cy="160"
            r="150"
            fill="none"
            stroke={currentSession.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 150}
            strokeDashoffset={2 * Math.PI * 150 * (1 - timer / (currentSession.minutes * 60))}
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
            fontSize: 72,
            fontWeight: 700,
            fontFamily: 'monospace',
            color: 'white'
          }}>
            {formatTime(timer)}
          </div>
          <div style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.7)',
            marginTop: 8
          }}>
            {currentSession.label}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 16 }}>
        <button
          onClick={() => setIsRunning(!isRunning)}
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: 'none',
            background: currentSession.color,
            color: 'white',
            cursor: 'pointer',
            fontSize: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 8px 30px ${currentSession.color}60`
          }}
        >
          {isRunning ? '⏸' : '▶'}
        </button>
        <button
          onClick={() => { setTimer(currentSession.minutes * 60); setIsRunning(false); }}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.3)',
            background: 'transparent',
            color: 'white',
            cursor: 'pointer',
            fontSize: 18
          }}
        >
          ↺
        </button>
      </div>

      {/* Status */}
      <div style={{
        marginTop: 40,
        color: 'rgba(255,255,255,0.5)',
        fontSize: 14
      }}>
        🎯 Focus mode active • {blocklist.length} sites blocked
      </div>
    </div>
  );
};
