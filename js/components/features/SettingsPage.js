const SettingsPage = ({ onClose }) => {
  const settings = [
    { label: 'Notifications', enabled: true, icon: '🔔' },
    { label: 'Dark Mode', enabled: false, icon: '🌙' },
    { label: 'Sound Effects', enabled: true, icon: '🔊' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>⚙️ Settings</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {settings.map((s, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{s.label}</span>
            </div>
            <button style={{ width: 48, height: 28, borderRadius: 14, border: 'none', background: s.enabled ? '#10b981' : 'var(--border-color)', cursor: 'pointer', position: 'relative' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: s.enabled ? 23 : 3, transition: 'left 0.2s' }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
