const StudyStreak2 = ({ onBack }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return { day: days[d.getDay()], date: d.toISOString().split('T')[0], active: Math.random() > 0.3 };
  });

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Streak</h1>
      </header>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', padding: '40px', borderRadius: '25px', color: 'white', marginBottom: '25px' }}>
          <div style={{ fontSize: '64px' }}>🔥</div>
          <div style={{ fontSize: '48px', fontWeight: 'bold' }}>12</div>
          <div style={{ opacity: 0.9 }}>Day Streak</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          {week.map((d, i) => (
            <div key={i} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: d.active ? '#10b981' : '#f3f4f6', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: d.active ? 'white' : '#9ca3af' }}>
                {d.active ? '✓' : '×'}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{d.day}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.StudyStreak2 = StudyStreak2;
