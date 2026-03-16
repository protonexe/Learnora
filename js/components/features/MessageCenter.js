const MessageCenter = ({ onClose }) => {
  const messages = [
    { id: 1, from: 'Alex Chen', message: 'Hey, want to study together?', time: '2h ago', unread: true },
    { id: 2, from: 'Sarah Kim', message: 'Thanks for the notes!', time: '1d ago', unread: false },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>💬 Messages</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map(m => (
          <div key={m.id} style={{ background: m.unread ? 'var(--primary)' + '10' : 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: m.unread ? '1px solid var(--primary)' : '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{m.from}</span>
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{m.time}</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
