const FocusSession = ({ onBack, showToast }) => {
  const [duration, setDuration] = React.useState(25);
  const [timeLeft, setTimeLeft] = React.useState(25 * 60);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      showToast?.('Focus session complete!', 'success');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, showToast]);

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Focus Session</h1>
      </header>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <svg width="250" height="250" viewBox="0 0 250 250" style={{ marginBottom: '30px' }}>
          <circle cx="125" cy="125" r="110" fill="none" stroke="#e5e7eb" strokeWidth="15" />
          <circle cx="125" cy="125" r="110" fill="none" stroke="#6366f1" strokeWidth="15" strokeDasharray={`${progress * 6.9} 690`} strokeLinecap="round" transform="rotate(-90 125 125)" />
        </svg>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#6366f1', marginBottom: '10px' }}>{formatTime(timeLeft)}</div>
        <div style={{ marginBottom: '30px' }}>
          {[15, 25, 45, 60].map(m => (
            <button key={m} onClick={() => { setDuration(m); setTimeLeft(m * 60); setIsActive(false); }} style={{ padding: '10px 20px', margin: '5px', border: 'none', borderRadius: '20px', background: duration === m ? '#6366f1' : '#e5e7eb', color: duration === m ? 'white' : '#6b7280', cursor: 'pointer' }}>{m}m</button>
          ))}
        </div>
        <button onClick={() => setIsActive(!isActive)} style={{ padding: '18px 60px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontSize: '20px', fontWeight: 'bold' }}>{isActive ? 'Pause' : 'Start'}</button>
      </div>
    </div>
  );
};

window.FocusSession = FocusSession;
