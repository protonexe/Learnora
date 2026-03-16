const ProgressCard = ({ onBack }) => {
  const [stats] = React.useState({
    hoursThisWeek: 23.5,
    hoursLastWeek: 18.2,
    quizzesThisWeek: 12,
    avgScore: 87,
    streak: 7,
    totalHours: 156
  });

  const cards = [
    { label: 'This Week', value: stats.hoursThisWeek + 'h', change: '+29%', icon: '📈', color: '#10b981' },
    { label: 'Quizzes', value: stats.quizzesThisWeek, change: '+3', icon: '📝', color: '#6366f1' },
    { label: 'Avg Score', value: stats.avgScore + '%', change: '+5%', icon: '🎯', color: '#f59e0b' },
    { label: 'Streak', value: stats.streak + ' days', change: '🔥', icon: '🔥', color: '#ef4444' }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Progress Card</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '30px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📊</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.totalHours}h</div>
          <div style={{ opacity: 0.9 }}>Total Study Time</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          {cards.map((c, i) => (
            <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{c.icon}</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: c.color }}>{c.value}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.ProgressCard = ProgressCard;
