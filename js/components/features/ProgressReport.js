const ProgressReport = ({ onBack }) => {
  const stats = [
    { label: 'Study Hours', value: '127h', change: '+23%', good: true },
    { label: 'Quizzes Taken', value: '47', change: '+8', good: true },
    { label: 'Avg Score', value: '87%', change: '+5%', good: true },
    { label: 'Streak', value: '12 days', change: '🔥', good: true }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Progress Report</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '30px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px' }}>📊</div>
          <div style={{ fontSize: '24px', fontWeight: '600', marginTop: '10px' }}>Great Progress!</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.ProgressReport = ProgressReport;
