const SessionReview = ({ onBack, showToast }) => {
  const [sessions, setSessions] = React.useState(() => JSON.parse(localStorage.getItem('session-review')) || [
    { id: 1, date: '2026-03-15', subject: 'Mathematics', duration: 90, productivity: 85, notes: 'Completed chapter 5' },
    { id: 2, date: '2026-03-15', subject: 'Physics', duration: 60, productivity: 70, notes: 'Lab prep' },
    { id: 3, date: '2026-03-14', subject: 'Chemistry', duration: 45, productivity: 90, notes: 'Great session' }
  ]);

  const deleteSession = (id) => {
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    localStorage.setItem('session-review', JSON.stringify(updated));
  };

  const totalHours = (sessions.reduce((a, s) => a + s.duration, 0) / 60).toFixed(1);
  const avgProductivity = Math.round(sessions.reduce((a, s) => a + s.productivity, 0) / sessions.length);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Session Review</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="summary" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '25px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{totalHours}h</div>
          <div style={{ opacity: 0.9 }}>Total Study Time</div>
          <div style={{ marginTop: '15px', fontSize: '24px', fontWeight: 'bold' }}>{avgProductivity}%</div>
          <div style={{ opacity: 0.9, fontSize: '14px' }}>Avg Productivity</div>
        </div>

        <h3 style={{ marginBottom: '15px', color: '#374151' }}>Recent Sessions</h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          {sessions.map(session => (
            <div key={session.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>{session.subject}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>{session.date} • {session.duration} min</div>
                </div>
                <div style={{ background: session.productivity >= 80 ? '#ecfdf5' : session.productivity >= 60 ? '#fef3c7' : '#fef2f2', padding: '5px 12px', borderRadius: '20px', fontWeight: '600', color: session.productivity >= 80 ? '#10b981' : session.productivity >= 60 ? '#f59e0b' : '#ef4444' }}>
                  {session.productivity}%
                </div>
              </div>
              {session.notes && <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '8px' }}>{session.notes}</p>}
              <button onClick={() => deleteSession(session.id)} style={{ marginTop: '10px', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.SessionReview = SessionReview;
