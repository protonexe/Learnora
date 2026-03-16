const StudySpotlight = ({ onBack }) => {
  const tips = [
    { icon: '🎯', title: 'Set Clear Goals', text: 'Define what you want to achieve before each study session' },
    { icon: '⏰', title: 'Time Management', text: 'Use the Pomodoro technique: 25 min study, 5 min break' },
    { icon: '📝', title: 'Active Recall', text: 'Test yourself instead of just re-reading notes' },
    { icon: '💤', title: 'Sleep Well', text: 'Aim for 7-9 hours of sleep for better retention' },
    { icon: '🏃', title: 'Stay Active', text: 'Regular exercise improves brain function' },
    { icon: '💧', title: 'Stay Hydrated', text: 'Drink water to maintain focus and energy' }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Spotlight</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', padding: '30px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>💡</div>
          <div style={{ fontSize: '20px', fontWeight: '600' }}>Study Tips</div>
        </div>

        <div style={{ display: 'grid', gap: '15px' }}>
          {tips.map((tip, i) => (
            <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '32px' }}>{tip.icon}</div>
              <div>
                <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '5px' }}>{tip.title}</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>{tip.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.StudySpotlight = StudySpotlight;
