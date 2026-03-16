const StudyReminder = ({ onBack }) => {
  const [reminders, setReminders] = React.useState(() => JSON.parse(localStorage.getItem('study-reminders')) || [
    { id: 1, time: '09:00', label: 'Morning Review', active: true },
    { id: 2, time: '14:00', label: 'Afternoon Study', active: true },
    { id: 3, time: '19:00', label: 'Evening Practice', active: false }
  ]);

  const toggle = (id) => {
    const updated = reminders.map(r => r.id === id ? { ...r, active: !r.active } : r);
    setReminders(updated);
    localStorage.setItem('study-reminders', JSON.stringify(updated));
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Reminders</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', padding: '25px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔔</div>
          <div style={{ fontSize: '20px', fontWeight: '600' }}>Stay on Track</div>
        </div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {reminders.map(r => (
            <div key={r.id} onClick={() => toggle(r.id)} style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', opacity: r.active ? 1 : 0.6 }}>
              <div style={{ width: '50px', fontSize: '20px', fontWeight: 'bold', color: '#6366f1' }}>{r.time}</div>
              <div style={{ flex: 1, fontWeight: '500', color: '#1f2937' }}>{r.label}</div>
              <div style={{ width: '50px', height: '26px', borderRadius: '13px', background: r.active ? '#10b981' : '#e5e7eb', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: r.active ? '26px' : '2px', transition: 'left 0.2s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.StudyReminder = StudyReminder;
