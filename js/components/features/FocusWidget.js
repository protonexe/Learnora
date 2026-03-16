import React from 'react';
import { Focus } from './Icon';

const FocusWidget = ({ onClose }) => {
  const [sessionActive, setSessionActive] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(25 * 60);
  const [mode, setMode] = React.useState('pomodoro');
  const [completed, setCompleted] = React.useState(0);
  
  const modes = {
    pomodoro: { work: 25, break: 5, label: 'Pomodoro' },
    deep: { work: 50, break: 10, label: 'Deep Work' },
    quick: { work: 15, break: 3, label: 'Quick Sprint' }
  };
  
  React.useEffect(() => {
    let interval;
    if (sessionActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && sessionActive) {
      setSessionActive(false);
      setCompleted(c => c + 1);
      new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onp6agHFkYXKEk5ySeW1nZX2LkJV3bmllf4yTl3dtZ2V+i5KVd21nZX+Mk5Z2bWhlf4yTl3ZsaGV/jJSWd2xnZX+MlJZ2bGhlf4yUlndrZ2V/ipSWd2tmZX+Kk5Z3amYlf4qTlnZpZiV/ipOWdWhlJH+Kk5Z0Z2Qjf4qTlnNnYyN/ipKWc2ZiIn+KkpZxZWIif4qSlXFlYSF/ipKVcGRgIX+KkpVvZGAhf4qSlW9jYSF/ipKVbmNgIX+KkpVuYmAhf4qTlW1iYCF/ipOVbWJgIX+Kk5VsYmAhf4qTlWxiYCF/ipOVbGJgIX+Kk5VsYmAhf4qTlWxiYCF/ipOVbGJgIX+Kk5VsYmAh').play();
    }
    return () => clearInterval(interval);
  }, [sessionActive, timeLeft]);
  
  const startSession = (modeKey) => {
    setMode(modeKey);
    setTimeLeft(modes[modeKey].work * 60);
    setSessionActive(true);
  };
  
  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const progress = ((modes[mode].work * 60 - timeLeft) / (modes[mode].work * 60)) * 100;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
        maxWidth: 400,
        padding: 40
      }}>
        <Focus size={48} style={{ marginBottom: 24, color: '#8b5cf6' }} />
        
        <div style={{ fontSize: 48, fontWeight: 200, marginBottom: 8, fontFamily: 'monospace' }}>
          {formatTime(timeLeft)}
        </div>
        
        <div style={{
          fontSize: 18,
          color: '#a1a1aa',
          marginBottom: 32,
          textTransform: 'uppercase',
          letterSpacing: 2
        }}>
          {modes[mode].label} Mode
        </div>
        
        {!sessionActive ? (
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {Object.entries(modes).map(([key, m]) => (
              <button
                key={key}
                onClick={() => startSession(key)}
                style={{
                  padding: '12px 24px',
                  borderRadius: 8,
                  border: '2px solid #8b5cf6',
                  background: 'transparent',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 14,
                  transition: 'all 0.2s'
                }}
              >
                {m.label} ({m.work}m)
              </button>
            ))}
          </div>
        ) : (
          <>
            <div style={{
              height: 4,
              background: '#3f3f46',
              borderRadius: 2,
              marginBottom: 32,
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: '#8b5cf6',
                transition: 'width 1s linear'
              }} />
            </div>
            
            <button
              onClick={() => setSessionActive(false)}
              style={{
                padding: '12px 32px',
                borderRadius: 8,
                border: 'none',
                background: '#ef4444',
                color: 'white',
                cursor: 'pointer',
                fontSize: 14
              }}
            >
              End Session
            </button>
          </>
        )}
        
        {completed > 0 && (
          <div style={{ marginTop: 32, color: '#10b981' }}>
            🎉 {completed} session{completed > 1 ? 's' : ''} completed today!
          </div>
        )}
        
        <button
          onClick={onClose}
          style={{
            marginTop: 40,
            padding: '8px 16px',
            borderRadius: 6,
            border: '1px solid #3f3f46',
            background: 'transparent',
            color: '#a1a1aa',
            cursor: 'pointer',
            fontSize: 13
          }}
        >
          Exit Focus Mode
        </button>
      </div>
    </div>
  );
};

export default FocusWidget;
