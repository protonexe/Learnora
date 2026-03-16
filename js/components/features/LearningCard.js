const LearningCard = ({ onBack }) => {
  const cards = [
    { title: 'Mathematics', icon: '📐', progress: 75 },
    { title: 'Physics', icon: '⚛️', progress: 60 },
    { title: 'Chemistry', icon: '🧪', progress: 45 },
    { title: 'Biology', icon: '🧬', progress: 80 }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Learning Cards</h1>
      </header>
      <div style={{ padding: '20px' }}>
        {cards.map((c, i) => (
          <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '15px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '32px' }}>{c.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600' }}>{c.title}</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>{c.progress}% complete</div>
              </div>
            </div>
            <div style={{ background: '#f3f4f6', borderRadius: '8px', height: '8px' }}>
              <div style={{ width: `${c.progress}%`, height: '100%', background: '#6366f1', borderRadius: '8px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.LearningCard = LearningCard;
