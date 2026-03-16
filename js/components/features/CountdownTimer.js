const CountdownTimer = ({ onBack }) => {
  const [target, setTarget] = React.useState('');
  const [timeLeft, setTimeLeft] = React.useState(null);

  const start = () => {
    if (!target) return;
    const end = new Date(target).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = end - now;
      if (diff <= 0) { setTimeLeft(null); return; }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, mins, secs });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  };

  React.useEffect(() => { if (target) start(); }, [target]);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Countdown Timer</h1>
      </header>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <input type="datetime-local" onChange={(e) => setTarget(e.target.value)} style={{ padding: '15px', borderRadius: '12px', border: '2px solid #e5e7eb', marginBottom: '20px', fontSize: '16px' }} />
        {timeLeft && (
          <div style={{ background: '#6366f1', padding: '30px', borderRadius: '20px', color: 'white' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold' }}>{timeLeft.days}d {timeLeft.hours}h {timeLeft.mins}m {timeLeft.secs}s</div>
          </div>
        )}
      </div>
    </div>
  );
};

window.CountdownTimer = CountdownTimer;
