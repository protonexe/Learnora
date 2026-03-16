const StudyInsights = ({ onBack }) => {
  const insights = [
    { metric: 'Peak Study Time', value: 'Evening (6-9 PM)', icon: '🌅', color: '#f59e0b' },
    { metric: 'Most Productive Day', value: 'Saturday', icon: '📅', color: '#10b981' },
    { metric: 'Avg Session', value: '45 minutes', icon: '⏱️', color: '#6366f1' },
    { metric: 'Best Subject', value: 'Mathematics', icon: '📐', color: '#f43f5e' }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Insights</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '30px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📊</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Your Learning Profile</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          {insights.map((insight, i) => (
            <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>{insight.icon}</div>
              <div style={{ color: '#6b7280', fontSize: '13px', marginBottom: '5px' }}>{insight.metric}</div>
              <div style={{ fontWeight: 'bold', color: insight.color, fontSize: '16px' }}>{insight.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.StudyInsights = StudyInsights;
