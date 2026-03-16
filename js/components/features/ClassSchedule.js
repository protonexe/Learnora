const ClassSchedule = ({ onClose }) => {
  const schedule = [
    { time: '9:00 AM', subject: 'Mathematics', room: 'Room 101' },
    { time: '11:00 AM', subject: 'Physics', room: 'Lab 3' },
    { time: '2:00 PM', subject: 'Chemistry', room: 'Room 205' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📅 Class Schedule</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {schedule.map((s, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', width: 80 }}>{s.time}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{s.subject}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{s.room}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
