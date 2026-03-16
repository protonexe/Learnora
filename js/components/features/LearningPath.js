const LearningPath = ({ onBack }) => {
  const steps = [
    { title: 'Basics', desc: 'Learn fundamentals', done: true },
    { title: 'Practice', desc: 'Apply knowledge', done: true },
    { title: 'Advanced', desc: 'Master concepts', done: false },
    { title: 'Expert', desc: 'Teach others', done: false }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Learning Path</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ position: 'relative', paddingLeft: '30px' }}>
          <div style={{ position: 'absolute', left: '15px', top: '0', bottom: '0', width: '4px', background: '#e5e7eb' }} />
          {steps.map((s, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: '30px' }}>
              <div style={{ position: 'absolute', left: '-26px', width: '20px', height: '20px', borderRadius: '50%', background: s.done ? '#10b981' : '#e5e7eb', border: '3px solid white', boxShadow: '0 0 0 2px #e5e7eb' }} />
              <div style={{ background: s.done ? '#ecfdf5' : 'white', padding: '20px', borderRadius: '15px' }}>
                <div style={{ fontWeight: '600', color: '#1f2937' }}>{s.title}</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.LearningPath = LearningPath;
