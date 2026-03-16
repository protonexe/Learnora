const ThemeCustomizer = ({ onClose }) => {
  const themes = [
    { name: 'Default', color: '#6366f1' },
    { name: 'Ocean', color: '#0ea5e9' },
    { name: 'Forest', color: '#10b981' },
    { name: 'Sunset', color: '#f59e0b' },
    { name: 'Rose', color: '#f43f5e' },
    { name: 'Purple', color: '#8b5cf6' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>🎨 Theme</h2>
      </div>
      <div style={{ padding: 20 }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: 14, color: 'var(--text-secondary)' }}>Accent Color</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {themes.map((t, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 16, background: 'var(--bg-secondary)', borderRadius: 12, border: '2px solid transparent', cursor: 'pointer' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: t.color, margin: '0 auto 8px' }} />
              <span style={{ fontSize: 12, color: 'var(--text-primary)' }}>{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
