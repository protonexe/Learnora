const ExamTips = ({ onBack }) => {
  const tips = [
    { title: 'Start Early', text: 'Begin studying at least a week before the exam', icon: '📅' },
    { title: 'Practice Past Exams', text: 'Get familiar with the format and question types', icon: '📝' },
    { title: 'Teach Others', text: 'Explain concepts to someone else to reinforce learning', icon: '👥' },
    { title: 'Take Breaks', text: 'Short breaks improve focus and retention', icon: '☕' },
    { title: 'Stay Healthy', text: 'Get enough sleep and eat well before exams', icon: '💪' },
    { title: 'Review Mistakes', text: 'Learn from errors in practice tests', icon: '✅' },
    { title: 'Stay Calm', text: 'Deep breathing helps manage exam anxiety', icon: '🧘' },
    { title: 'Read Carefully', text: 'Understand the question before answering', icon: '👀' }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Exam Tips</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', padding: '30px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📋</div>
          <div style={{ fontSize: '20px', fontWeight: '600' }}>Ace Your Exams!</div>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {tips.map((tip, i) => (
            <div key={i} style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'flex', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '28px' }}>{tip.icon}</div>
              <div>
                <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>{tip.title}</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>{tip.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.ExamTips = ExamTips;
