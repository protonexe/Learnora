const KeyValueRow = ({ label, value, icon, action }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid var(--border-color)'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {icon && <span style={{ fontSize: '18px' }}>{icon}</span>}
      <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{label}</span>
    </div>
    {action ? (
      <button onClick={action} style={{
        background: 'transparent',
        border: 'none',
        color: 'var(--accent-blue)',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer'
      }}>
        {value}
      </button>
    ) : (
      <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{value}</span>
    )}
  </div>
);

const InfoCard = ({ title, icon, children, action }) => (
  <div style={{
    background: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-xl)',
    padding: '20px',
    border: '1px solid var(--border-color)'
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
        {icon && <span>{icon}</span>}
        {title}
      </h3>
      {action}
    </div>
    {children}
  </div>
);

const SettingsGroup = ({ title, children, icon }) => (
  <div style={{ marginBottom: '24px' }}>
    {title && (
      <h3 style={{
        fontSize: '13px',
        fontWeight: '600',
        color: 'var(--text-tertiary)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        {icon && <span>{icon}</span>}
        {title}
      </h3>
    )}
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-lg)',
      padding: '4px 16px',
      border: '1px solid var(--border-color)'
    }}>
      {children}
    </div>
  </div>
);

window.KeyValueRow = KeyValueRow;
window.InfoCard = InfoCard;
window.SettingsGroup = SettingsGroup;
