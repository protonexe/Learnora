const NotificationCenter = ({ onClose }) => {
  const notifications = [
    { id: 1, title: 'Quiz Reminder', message: 'Math quiz due tomorrow', time: '2h ago', read: false },
    { id: 2, title: 'Achievement Unlocked', message: '7-day streak!', time: '1d ago', read: true },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>🔔 Notifications</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {notifications.map(n => (
          <div key={n.id} style={{ background: n.read ? 'var(--bg-secondary)' : 'var(--primary)' + '10', borderRadius: 12, padding: 16, border: n.read ? '1px solid var(--border-color)' : '1px solid var(--primary)', display: 'flex', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary)' + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🔔</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{n.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{n.message}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
