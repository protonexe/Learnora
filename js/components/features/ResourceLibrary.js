const ResourceLibrary = ({ onClose }) => {
  const resources = [
    { name: 'Math Formula Sheet', type: 'PDF', size: '2.5 MB', icon: '📄' },
    { name: 'Physics Notes', type: 'DOCX', size: '1.2 MB', icon: '📝' },
    { name: 'Chemistry Lab Guide', type: 'PDF', size: '3.8 MB', icon: '📄' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📁 Resources</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {resources.map((r, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--primary)' + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{r.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{r.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{r.type} • {r.size}</div>
            </div>
            <button style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer', fontSize: 12 }}>Download</button>
          </div>
        ))}
      </div>
    </div>
  );
};
