const ProductivityTracker = ({ onBack }) => {
  const [logs] = React.useState([
    { date: '2026-03-15', score: 85, studyHours: 3.5, tasks: 5 },
    { date: '2026-03-14', score: 72, studyHours: 2.8, tasks: 4 },
    { date: '2026-03-13', score: 90, studyHours: 4.2, tasks: 6 },
    { date: '2026-03-12', score: 68, studyHours: 2.1, tasks: 3 },
    { date: '2026-03-11', score: 78, studyHours: 3.0, tasks: 4 },
    { date: '2026-03-10', score: 92, studyHours: 4.5, tasks: 7 },
    { date: '2026-03-09', score: 75, studyHours: 2.5, tasks: 4 }
  ]);

  const avgScore = Math.round(logs.reduce((a, l) => a + l.score, 0) / logs.length);
  const totalHours = logs.reduce((a, l) => a + l.studyHours, 0).toFixed(1);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Productivity</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="summary" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
          <div style={{ background: '#ecfdf5', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>{avgScore}%</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Avg Score</div>
          </div>
          <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0ea5e9' }}>{totalHours}h</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Total Hours</div>
          </div>
        </div>

        <h3 style={{ marginBottom: '15px', color: '#374151' }}>7-Day Trend</h3>
        <div style={{ background: 'white', padding: '20px', borderRadius: '15px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', paddingBottom: i < 6 ? '12px' : 0, borderBottom: i < 6 ? '1px solid #f3f4f6' : 'none' }}>
              <span style={{ width: '80px', fontSize: '13px', color: '#6b7280' }}>{log.date.slice(5)}</span>
              <div style={{ flex: 1, background: '#f3f4f6', borderRadius: '6px', height: '8px' }}>
                <div style={{ width: `${log.score}%`, height: '100%', background: log.score >= 80 ? '#10b981' : log.score >= 60 ? '#f59e0b' : '#ef4444', borderRadius: '6px' }} />
              </div>
              <span style={{ fontWeight: '600', color: log.score >= 80 ? '#10b981' : log.score >= 60 ? '#f59e0b' : '#ef4444', width: '35px', textAlign: 'right' }}>{log.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.ProductivityTracker = ProductivityTracker;
