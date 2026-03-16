const StudyLog = ({ onBack, showToast }) => {
  const [logs, setLogs] = React.useState(() => JSON.parse(localStorage.getItem('study-log')) || [
    { id: 1, date: '2026-03-15', subject: 'Mathematics', duration: 90, notes: 'Completed chapter 5 exercises', rating: 5 },
    { id: 2, date: '2026-03-15', subject: 'Physics', duration: 60, notes: 'Lab preparation', rating: 4 },
    { id: 3, date: '2026-03-14', subject: 'Chemistry', duration: 45, notes: 'Review notes', rating: 3 }
  ]);
  const [newLog, setNewLog] = React.useState({ subject: '', duration: 30, notes: '', rating: 3 });

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'English'];

  const addLog = () => {
    if (!newLog.subject) {
      showToast?.('Select a subject', 'error');
      return;
    }
    const log = { ...newLog, id: Date.now(), date: new Date().toISOString().split('T')[0] };
    const updated = [log, ...logs];
    setLogs(updated);
    localStorage.setItem('study-log', JSON.stringify(updated));
    setNewLog({ subject: '', duration: 30, notes: '', rating: 3 });
    showToast?.('Study session logged!', 'success');
  };

  const deleteLog = (id) => {
    const updated = logs.filter(l => l.id !== id);
    setLogs(updated);
    localStorage.setItem('study-log', JSON.stringify(updated));
  };

  const totalHours = (logs.reduce((a, l) => a + l.duration, 0) / 60).toFixed(1);
  const avgRating = (logs.reduce((a, l) => a + l.rating, 0) / logs.length).toFixed(1);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Log</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="summary" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#6366f1' }}>{totalHours}h</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Total Time</div>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>⭐ {avgRating}</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Avg Rating</div>
          </div>
        </div>

        <div className="add-log" style={{ background: 'white', padding: '20px', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '15px' }}>Log Study Session</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <select value={newLog.subject} onChange={(e) => setNewLog({ ...newLog, subject: e.target.value })} style={{ padding: '12px', borderRadius: '10px', border: '2px solid #e5e7eb' }}>
              <option value="">Select Subject</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input type="number" value={newLog.duration} onChange={(e) => setNewLog({ ...newLog, duration: parseInt(e.target.value) })} placeholder="Minutes" style={{ padding: '12px', borderRadius: '10px', border: '2px solid #e5e7eb' }} />
          </div>
          <input type="text" value={newLog.notes} onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })} placeholder="Notes (optional)" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #e5e7eb', marginBottom: '10px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <span style={{ color: '#6b7280' }}>Rating:</span>
            {[1,2,3,4,5].map(n => (
              <span key={n} onClick={() => setNewLog({ ...newLog, rating: n })} style={{ fontSize: '24px', cursor: 'pointer', color: n <= newLog.rating ? '#f59e0b' : '#e5e7eb' }}>⭐</span>
            ))}
          </div>
          <button onClick={addLog} style={{ width: '100%', padding: '12px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>Log Session</button>
        </div>

        <h3 style={{ marginBottom: '15px', color: '#374151' }}>Recent Sessions</h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          {logs.map(log => (
            <div key={log.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ fontWeight: '600', color: '#1f2937' }}>{log.subject}</div>
                <button onClick={() => deleteLog(log.id)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>×</button>
              </div>
              <div style={{ fontSize: '13px', color: '#6b7280', display: 'flex', gap: '15px' }}>
                <span>⏱️ {log.duration} min</span>
                <span>📅 {log.date}</span>
                <span>⭐ {log.rating}</span>
              </div>
              {log.notes && <p style={{ marginTop: '8px', color: '#9ca3af', fontSize: '14px' }}>{log.notes}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.StudyLog = StudyLog;
