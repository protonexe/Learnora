const StudyAnalytics = ({ onBack }) => {
  const subjects = [
    { name: 'Math', hours: 35, color: '#f43f5e' },
    { name: 'Physics', hours: 28, color: '#14b8a6' },
    { name: 'Chemistry', hours: 22, color: '#0ea5e9' },
    { name: 'Biology', hours: 25, color: '#10b981' }
  ];
  const total = subjects.reduce((a, s) => a + s.hours, 0);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Analytics</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ background: '#f3f4f6', height: '200px', borderRadius: '20px', marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {subjects.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                  {Math.round((s.hours / total) * 100)}%
                </div>
                <div style={{ marginTop: '8px', fontSize: '13px' }}>{s.name}</div>
              </div>
            ))}
          </div>
        </div>
        {subjects.map((s, i) => (
          <div key={i} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>{s.name}</span>
              <span>{s.hours}h</span>
            </div>
            <div style={{ background: '#f3f4f6', borderRadius: '8px', height: '8px' }}>
              <div style={{ width: `${(s.hours / total) * 100}%`, height: '100%', background: s.color, borderRadius: '8px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.StudyAnalytics = StudyAnalytics;
