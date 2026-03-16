const StudyStreak = ({ onBack }) => {
  const [streak, setStreak] = React.useState(() => JSON.parse(localStorage.getItem('study-streak')) || {
    current: 12,
    longest: 21,
    lastDate: '2026-03-15'
  });

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      day: days[d.getDay()],
      date: d.toISOString().split('T')[0],
      studied: i < streak.current
    };
  });

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Streak</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', padding: '40px', borderRadius: '25px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '64px', marginBottom: '10px' }}>🔥</div>
          <div style={{ fontSize: '48px', fontWeight: 'bold' }}>{streak.current}</div>
          <div style={{ opacity: 0.9, fontSize: '18px' }}>Day Streak</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>{streak.longest}</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Longest Streak</div>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#6366f1' }}>{streak.current * 2}</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>XP Earned</div>
          </div>
        </div>

        <h3 style={{ marginBottom: '15px', color: '#374151' }}>Last 7 Days</h3>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
          {last7Days.map((d, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: d.studied ? '#10b981' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                {d.studied ? '✓' : '×'}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{d.day}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.StudyStreak = StudyStreak;
