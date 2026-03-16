const SystemStatus = ({ onClose }) => {
  const services = [
    { name: 'Server', status: 'online', color: '#10b981' },
    { name: 'Database', status: 'online', color: '#10b981' },
    { name: 'API', status: 'degraded', color: '#f59e0b' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📡 System Status</h2>
      </div>
      <div style={{ padding: 20 }}>
        {services.map((s, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, marginBottom: 12, border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</span>
            <span style={{ padding: '4px 12px', borderRadius: 20, background: s.color + '20', color: s.color, fontSize: 12, fontWeight: 600 }}>{s.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
