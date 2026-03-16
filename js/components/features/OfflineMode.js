const OfflineMode = ({ onClose }) => {
  const files = [
    { name: 'Math Notes.pdf', size: '2.5 MB', saved: true },
    { name: 'Physics Summary.pdf', size: '1.8 MB', saved: true },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📥 Offline Files</h2>
      </div>
      <div style={{ padding: 20 }}>
        {files.map((f, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, marginBottom: 12, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{f.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{f.size} • ✓ Available offline</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
