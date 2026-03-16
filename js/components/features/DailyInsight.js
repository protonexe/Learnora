const DailyInsight = ({ onBack }) => {
  const insights = [
    { icon: '📚', text: 'You learn best in the evening' },
    { icon: '🎯', text: 'Math is your strongest subject' },
    { icon: '⏰', text: 'Your focus peaks at 2PM' },
    { icon: '📈', text: 'You study 30% more than last week' }
  ];
  const [idx, setIdx] = React.useState(0);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Daily Insight</h1>
      </header>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '50px', borderRadius: '25px', color: 'white', marginBottom: '25px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>{insights[idx].icon}</div>
          <div style={{ fontSize: '24px', fontWeight: '600' }}>{insights[idx].text}</div>
        </div>
        <button onClick={() => setIdx((idx + 1) % insights.length)} style={{ padding: '15px 30px', background: '#1f2937', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>
          Next Insight
        </button>
      </div>
    </div>
  );
};

window.DailyInsight = DailyInsight;
