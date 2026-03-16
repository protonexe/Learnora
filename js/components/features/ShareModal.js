const ShareModal = ({ onClose }) => {
  const options = [
    { icon: '📱', label: 'Messages', color: '#10b981' },
    { icon: '📧', label: 'Email', color: '#0ea5e9' },
    { icon: '🔗', label: 'Copy Link', color: '#8b5cf6' },
    { icon: '🐦', label: 'Twitter', color: '#1da1f2' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ background: 'var(--bg-secondary)', borderRadius: '20px 20px 0 0', padding: 24, width: '100%', maxWidth: 400, animation: 'slideUp 0.3s ease' }}>
        <h3 style={{ margin: '0 0 20px 0', textAlign: 'center', fontSize: 18 }}>Share</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {options.map((o, i) => (
            <div key={i} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: o.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 8px' }}>{o.icon}</div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{o.label}</span>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{ width: '100%', marginTop: 20, padding: 14, borderRadius: 12, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
      </div>
    </div>
  );
};
