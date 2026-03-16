const SessionCard = ({ onClose }) => {
  const sessions = [
    { type: 'Study', duration: '45 min', subject: 'Mathematics', icon: '📖', color: '#f43f5e' },
    { type: 'Quiz', duration: '30 min', subject: 'Physics', icon: '✍️', color: '#14b8a6' },
    { type: 'Review', duration: '20 min', subject: 'Chemistry', icon: '🔄', color: '#0ea5e9' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📋 Today's Sessions</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {sessions.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: s.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{s.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{s.type}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{s.subject} • {s.duration}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
