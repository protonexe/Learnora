const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      zIndex: 9999,
      maxWidth: '360px'
    }}>
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={() => onRemove(toast.id)} />
      ))}
    </div>
  );
};

const Toast = ({ toast, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': default: return 'ℹ️';
    }
  };

  const getStyles = () => {
    switch (toast.type) {
      case 'success': return { bg: 'var(--success)', color: '#fff' };
      case 'error': return { bg: 'var(--danger)', color: '#fff' };
      case 'warning': return { bg: 'var(--warning)', color: '#000' };
      case 'info': default: return { bg: 'var(--accent-blue)', color: '#fff' };
    }
  };

  const styles = getStyles();

  return (
    <div style={{
      background: styles.bg,
      color: styles.color,
      padding: '14px 16px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      animation: 'slideInUp 0.3s ease',
      cursor: 'pointer'
    }} onClick={onClose}>
      <span style={{ fontSize: '18px' }}>{getIcon()}</span>
      <span style={{ flex: 1, fontSize: '14px', fontWeight: '500' }}>{toast.message}</span>
      <button style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '16px', opacity: 0.8 }}>✕</button>
      <style>{`
        @keyframes slideInUp {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

window.ToastContainer = ToastContainer;
window.Toast = Toast;
