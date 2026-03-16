const StorageManager = ({ onClose }) => {
  const storage = [
    { type: 'Courses', used: 1.2, total: 5, color: '#f43f5e' },
    { type: 'Downloads', used: 0.8, total: 2, color: '#14b8a6' },
    { type: 'Cache', used: 0.3, total: 1, color: '#0ea5e9' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>💾 Storage</h2>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ background: 'var(--primary)', borderRadius: 16, padding: 24, marginBottom: 24, color: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700 }}>2.3 GB</div>
          <div style={{ fontSize: 14, opacity: 0.8 }}>of 8 GB used</div>
        </div>
        {storage.map((s, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{s.type}</span>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s.used} / {s.total} GB</span>
            </div>
            <div style={{ height: 8, background: 'var(--bg)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: (s.used / s.total * 100) + '%', background: s.color, borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
