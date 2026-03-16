const CalendarView = ({ onClose }) => {
  const events = [
    { day: 15, title: 'Math Exam', type: 'exam' },
    { day: 18, title: 'Physics Quiz', type: 'quiz' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📅 Calendar</h2>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center', marginBottom: 20 }}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i} style={{ padding: 8, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{d}</div>)}
          {Array(31).fill(null).map((_, i) => {
            const event = events.find(e => e.day === i + 1);
            return (
              <div key={i} style={{ padding: 12, borderRadius: 8, background: event ? '#f43f5e15' : 'var(--bg-secondary)', border: event ? '1px solid #f43f5e' : '1px solid var(--border-color)', position: 'relative' }}>
                <div style={{ fontSize: 14, color: 'var(--text-primary)' }}>{i + 1}</div>
                {event && <div style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: '50%', background: '#f43f5e' }} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
