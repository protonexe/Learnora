const DirectMessages = ({ onClose }) => {
  const chats = [
    { name: 'Alex Chen', last: 'See you later!', time: '2m' },
    { name: 'Sarah Kim', last: 'Thanks!', time: '1h' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>💬 Messages</h2>
      </div>
      <div style={{ padding: 20 }}>
        {chats.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg-secondary)', borderRadius: 12, marginBottom: 8, border: '1px solid var(--border-color)' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>{c.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c.last}</div>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{c.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
