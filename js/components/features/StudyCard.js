const StudyCard = ({ onBack }) => {
  const subjects = [
    { name: 'Mathematics', icon: '📐', color: '#f43f5e' },
    { name: 'Physics', icon: '⚛️', color: '#14b8a6' },
    { name: 'Chemistry', icon: '🧪', color: '#0ea5e9' },
    { name: 'Biology', icon: '🧬', color: '#10b981' },
    { name: 'History', icon: '📚', color: '#8b5cf6' }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Subject Cards</h1>
      </header>
      <div style={{ padding: '20px', display: 'grid', gap: '15px' }}>
        {subjects.map((s, i) => (
          <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '15px', borderLeft: `5px solid ${s.color}` }}>
            <span style={{ fontSize: '32px' }}>{s.icon}</span>
            <span style={{ fontWeight: '600', fontSize: '18px' }}>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

window.StudyCard = StudyCard;
