const AlertBanner = ({ 
  type = 'info', 
  title, 
  message, 
  dismissible = true,
  onClose 
}) => {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  const styles = {
    info: { bg: '#6366f115', border: '#6366f1', icon: 'ℹ️' },
    success: { bg: '#10b98115', border: '#10b981', icon: '✅' },
    warning: { bg: '#f59e0b15', border: '#f59e0b', icon: '⚠️' },
    error: { bg: '#ef444415', border: '#ef4444', icon: '❌' }
  };

  const style = styles[type] || styles.info;

  return (
    <div style={{
      background: style.bg,
      border: `1px solid ${style.border}`,
      borderRadius: '12px',
      padding: '16px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      marginBottom: '16px'
    }}>
      <span style={{ fontSize: '20px' }}>{style.icon}</span>
      <div style={{ flex: 1 }}>
        {title && (
          <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
            {title}
          </h4>
        )}
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
          {message}
        </p>
      </div>
      {dismissible && (
        <button
          onClick={() => { setVisible(false); onClose?.(); }}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-tertiary)',
            padding: '4px'
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

const Callout = ({ icon, title, children, variant = 'default' }) => {
  const variants = {
    default: { bg: 'var(--bg-tertiary)', border: 'var(--border-color)' },
    tip: { bg: '#10b98110', border: '#10b981' },
    warning: { bg: '#f59e0b10', border: '#f59e0b' },
    danger: { bg: '#ef444410', border: '#ef4444' },
    info: { bg: '#6366f110', border: '#6366f1' }
  };

  const style = variants[variant] || variants.default;

  return (
    <div style={{
      background: style.bg,
      borderLeft: `4px solid ${style.border}`,
      borderRadius: '8px',
      padding: '16px',
      margin: '16px 0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: title ? '8px' : 0 }}>
        {icon && <span style={{ fontSize: '18px' }}>{icon}</span>}
        {title && (
          <h4 style={{ fontSize: '14px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' }}>
            {title}
          </h4>
        )}
      </div>
      <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
        {children}
      </div>
    </div>
  );
};

window.AlertBanner = AlertBanner;
window.Callout = Callout;
