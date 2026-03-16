const WeeklyProgress = ({ onBack }) => {
  const days = [
    { day: 'Mon', hours: 2.5, goal: 3 },
    { day: 'Tue', hours: 3.2, goal: 3 },
    { day: 'Wed', hours: 1.8, goal: 3 },
    { day: 'Thu', hours: 4.1, goal: 3 },
    { day: 'Fri', hours: 2.9, goal: 3 },
    { day: 'Sat', hours: 5.2, goal: 3 },
    { day: 'Sun', hours: 3.7, goal: 3 }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Weekly Progress</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ background: '#10b981', padding: '20px', borderRadius: '15px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{days.reduce((a, d) => a + d.hours, 0).toFixed(1)}h</div>
          <div style={{ opacity: 0.9 }}>of 21h weekly goal</div>
        </div>
        {days.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ width: '40px', color: '#6b7280' }}>{d.day}</span>
            <div style={{ flex: 1, background: '#f3f4f6', borderRadius: '8px', height: '10px' }}>
              <div style={{ width: `${(d.hours / d.goal) * 100}%`, height: '100%', background: d.hours >= d.goal ? '#10b981' : '#f59e0b', borderRadius: '8px' }} />
            </div>
            <span style={{ width: '40px', textAlign: 'right', fontWeight: '600' }}>{d.hours}h</span>
          </div>
        ))}
      </div>
    </div>
  );
};

window.WeeklyProgress = WeeklyProgress;
