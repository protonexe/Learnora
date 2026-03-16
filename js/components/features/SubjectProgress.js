const SubjectProgress = ({ onBack }) => {
  const subjects = [
    { name: 'Mathematics', icon: '📐', progress: 75, hours: 12, color: '#f43f5e' },
    { name: 'Physics', icon: '⚛️', progress: 60, hours: 8, color: '#14b8a6' },
    { name: 'Chemistry', icon: '🧪', progress: 45, hours: 6, color: '#0ea5e9' },
    { name: 'Biology', icon: '🧬', progress: 80, hours: 10, color: '#10b981' }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Subject Progress</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '25px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📊</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{Math.round(subjects.reduce((a, s) => a + s.progress, 0) / subjects.length)}%</div>
          <div style={{ opacity: 0.9 }}>Overall Progress</div>
        </div>
        <div style={{ display: 'grid', gap: '15px' }}>
          {subjects.map((s, i) => (
            <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '28px' }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>{s.name}</div>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>{s.hours}h studied</div>
                </div>
                <div style={{ fontWeight: 'bold', color: s.color }}>{s.progress}%</div>
              </div>
              <div style={{ background: '#f3f4f6', borderRadius: '8px', height: '8px' }}>
                <div style={{ width: `${s.progress}%`, height: '100%', background: s.color, borderRadius: '8px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.SubjectProgress = SubjectProgress;
