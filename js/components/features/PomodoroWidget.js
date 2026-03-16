const PomodoroWidget = ({ onBack }) => {
  const [timeLeft, setTimeLeft] = React.useState(25 * 60);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Pomodoro Timer</h1>
      </header>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ width: '200px', height: '200px', borderRadius: '50%', background: '#f3f4f6', margin: '30px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '8px solid #ef4444' }}>
          <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#ef4444' }}>{formatTime(timeLeft)}</span>
        </div>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button onClick={() => setIsActive(!isActive)} style={{ padding: '15px 40px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontSize: '18px', fontWeight: '600' }}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={() => { setTimeLeft(25 * 60); setIsActive(false); }} style={{ padding: '15px 30px', background: '#f3f4f6', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

window.PomodoroWidget = PomodoroWidget;
