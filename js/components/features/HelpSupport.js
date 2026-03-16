const HelpSupport = ({ onClose }) => {
  const topics = [
    { title: 'How to use the app', icon: '📖' },
    { title: 'Account settings', icon: '⚙️' },
    { title: 'Payment issues', icon: '💳' },
    { title: 'Technical support', icon: '🔧' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>❓ Help & Support</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {topics.map((t, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <span style={{ fontSize: 24 }}>{t.icon}</span>
            <span style={{ flex: 1, fontSize: 14, color: 'var(--text-primary)' }}>{t.title}</span>
            <span style={{ color: 'var(--text-tertiary)' }}>→</span>
          </div>
        ))}
      </div>
    </div>
  );
};
