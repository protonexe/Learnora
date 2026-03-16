const LearningStats = ({ onBack }) => {
  const stats = [
    { label: 'Study Hours', value: '127', change: '+23%', icon: '⏱️', color: '#6366f1' },
    { label: 'Quizzes', value: '47', change: '+8', icon: '📝', color: '#10b981' },
    { label: 'Flashcards', value: '342', change: '+56', icon: '🃏', color: '#f59e0b' },
    { label: 'Streak', value: '12', change: 'days', icon: '🔥', color: '#ef4444' }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Learning Stats</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #10b981, #14b8a6)', padding: '30px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📈</div>
          <div style={{ fontSize: '20px', fontWeight: '600' }}>Keep Growing!</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.LearningStats = LearningStats;
