const DailyReflection = ({ onBack, showToast }) => {
  const [entries, setEntries] = React.useState(() => JSON.parse(localStorage.getItem('daily-reflection')) || []);
  const [todayEntry, setTodayEntry] = React.useState({ win: '', learn: '', improve: '' });

  const saveEntry = () => {
    if (!todayEntry.win && !todayEntry.learn && !todayEntry.improve) {
      showToast?.('Fill in at least one field', 'error');
      return;
    }
    const entry = { ...todayEntry, id: Date.now(), date: new Date().toISOString().split('T')[0] };
    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem('daily-reflection', JSON.stringify(updated));
    setTodayEntry({ win: '', learn: '', improve: '' });
    showToast?.('Reflection saved!', 'success');
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Daily Reflection</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '15px', marginBottom: '25px' }}>
          <h3 style={{ marginBottom: '15px', color: '#1f2937' }}>Today's Reflection</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#10b981' }}>🏆 What did you win today?</label>
            <textarea value={todayEntry.win} onChange={(e) => setTodayEntry({ ...todayEntry, win: e.target.value })} placeholder="Your achievement..." style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #e5e7eb', minHeight: '60px', resize: 'none' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#6366f1' }}>📚 What did you learn?</label>
            <textarea value={todayEntry.learn} onChange={(e) => setTodayEntry({ ...todayEntry, learn: e.target.value })} placeholder="New knowledge..." style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #e5e7eb', minHeight: '60px', resize: 'none' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#f59e0b' }}>💪 What can you improve?</label>
            <textarea value={todayEntry.improve} onChange={(e) => setTodayEntry({ ...todayEntry, improve: e.target.value })} placeholder="Areas for growth..." style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #e5e7eb', minHeight: '60px', resize: 'none' }} />
          </div>

          <button onClick={saveEntry} style={{ width: '100%', padding: '12px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>Save Reflection</button>
        </div>

        <h3 style={{ marginBottom: '15px', color: '#374151' }}>Past Reflections</h3>
        <div style={{ display: 'grid', gap: '15px' }}>
          {entries.slice(0, 5).map(entry => (
            <div key={entry.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '10px' }}>{entry.date}</div>
              {entry.win && <div style={{ color: '#10b981', marginBottom: '5px' }}>🏆 {entry.win}</div>}
              {entry.learn && <div style={{ color: '#6366f1', marginBottom: '5px' }}>📚 {entry.learn}</div>}
              {entry.improve && <div style={{ color: '#f59e0b' }}>💪 {entry.improve}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.DailyReflection = DailyReflection;
