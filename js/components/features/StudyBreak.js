const StudyBreak = ({ onClose, onStartBreak }) => {
  const [breakType, setBreakType] = React.useState('short');
  const [timer, setTimer] = React.useState(5 * 60);
  const [isActive, setIsActive] = React.useState(false);

  const breakTypes = [
    { id: 'short', label: 'Quick Break', minutes: 5, icon: '☕', color: '#10b981' },
    { id: 'medium', label: 'Medium Break', minutes: 15, icon: '🌿', color: '#0ea5e9' },
    { id: 'long', label: 'Long Break', minutes: 30, icon: '🧘', color: '#8b5cf6' },
  ];

  const currentBreak = breakTypes.find(b => b.id === breakType);

  React.useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startBreak = (type) => {
    setBreakType(type);
    setTimer(breakTypes.find(b => b.id === type).minutes * 60);
    setIsActive(true);
  };

  const suggestions = [
    'Take a short walk',
    'Stretch your muscles',
    'Get some water',
    'Rest your eyes',
    'Deep breathing exercise',
    'Quick snack',
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
        right: 20
      }}>
        <button
          onClick={onClose}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          Skip Break →
        </button>
      </div>

      <div style={{ textAlign: 'center', color: 'white' }}>
        {/* Break Type Selector */}
        {!isActive && (
          <>
            <div style={{ fontSize: 64, marginBottom: 16 }}>☕</div>
            <h2 style={{ margin: '0 0 8px 0', fontSize: 28 }}>Time for a Break!</h2>
            <p style={{ margin: '0 0 32px 0', opacity: 0.8 }}>Take a moment to recharge</p>

            <div style={{ display: 'flex', gap: 12, marginBottom: 40, justifyContent: 'center' }}>
              {breakTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => startBreak(type.id)}
                  style={{
                    padding: '16px 24px',
                    borderRadius: 12,
                    border: 'none',
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <span style={{ fontSize: 24 }}>{type.icon}</span>
                  <span style={{ fontSize: 12 }}>{type.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Timer Display */}
        {isActive && (
          <>
            <div style={{ fontSize: 80, marginBottom: 16 }}>{currentBreak.icon}</div>
            <div style={{ fontSize: 64, fontWeight: 700, fontFamily: 'monospace', marginBottom: 8 }}>
              {formatTime(timer)}
            </div>
            <div style={{ fontSize: 18, marginBottom: 32, opacity: 0.8 }}>
              {currentBreak.label}
            </div>

            <div style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              marginBottom: 40
            }}>
              <button
                onClick={() => setIsActive(!isActive)}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'white',
                  color: currentBreak.color,
                  cursor: 'pointer',
                  fontSize: 20
                }}
              >
                {isActive ? '⏸' : '▶'}
              </button>
              <button
                onClick={() => { setTimer(currentBreak.minutes * 60); setIsActive(false); }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.5)',
                  background: 'transparent',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 20
                }}
              >
                ↺
              </button>
            </div>
          </>
        )}

        {/* Suggestions */}
        {!isActive && (
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 16,
            padding: 20,
            maxWidth: 300,
            margin: '0 auto'
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: 14, opacity: 0.8 }}>During your break:</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {suggestions.map((s, i) => (
                <span key={i} style={{
                  padding: '6px 12px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: 20,
                  fontSize: 12
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
