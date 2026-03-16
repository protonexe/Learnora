const WeeklyOverview = ({ onBack }) => {
  const weekData = [
    { day: 'Mon', hours: 2.5, color: '#6366f1' },
    { day: 'Tue', hours: 3.2, color: '#8b5cf6' },
    { day: 'Wed', hours: 1.8, color: '#6366f1' },
    { day: 'Thu', hours: 4.1, color: '#10b981' },
    { day: 'Fri', hours: 2.9, color: '#14b8a6' },
    { day: 'Sat', hours: 5.2, color: '#f59e0b' },
    { day: 'Sun', hours: 3.7, color: '#ef4444' }
  ];

  const maxHours = Math.max(...weekData.map(d => d.hours));
  const totalHours = weekData.reduce((a, d) => a + d.hours, 0);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Weekly Overview</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="summary" style={{ background: 'linear-gradient(135deg, #10b981, #14b8a6)', padding: '25px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{totalHours.toFixed(1)}h</div>
          <div style={{ opacity: 0.9 }}>This Week</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '200px', marginBottom: '20px' }}>
          {weekData.map((day, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', background: '#f3f4f6', borderRadius: '8px 8px 0 0', height: '180px', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, width: '100%', background: day.color, borderRadius: '8px 8px 0 0', height: `${(day.hours / maxHours) * 170}px`, transition: 'height 0.3s' }} />
              </div>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280', fontWeight: '600' }}>{day.day}</div>
              <div style={{ fontSize: '10px', color: '#9ca3af' }}>{day.hours}h</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '15px' }}>
          <h3 style={{ marginBottom: '15px' }}>Daily Goal: 3h</h3>
          {weekData.map((day, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ width: '40px', fontSize: '14px', color: '#6b7280' }}>{day.day}</span>
              <div style={{ flex: 1, background: '#f3f4f6', borderRadius: '8px', height: '8px' }}>
                <div style={{ width: `${Math.min((day.hours / 3) * 100, 100)}%`, height: '100%', background: day.hours >= 3 ? '#10b981' : '#f59e0b', borderRadius: '8px' }} />
              </div>
              <span style={{ fontSize: '12px', color: day.hours >= 3 ? '#10b981' : '#f59e0b', fontWeight: '600' }}>{day.hours >= 3 ? '✓' : `${day.hours}h`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.WeeklyOverview = WeeklyOverview;
