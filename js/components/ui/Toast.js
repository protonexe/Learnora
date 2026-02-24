const Toast = ({ message, type = 'info', isVisible, onClose }) => {
  const types = { 
    info: { bg: 'var(--primary-500)', icon: 'ℹ️' }, 
    success: { bg: 'var(--success)', icon: '✅' }, 
    warning: { bg: 'var(--warning)', icon: '⚠️' }, 
    error: { bg: 'var(--danger)', icon: '❌' } 
  };

  React.useEffect(() => { 
    if (isVisible) { 
      const timer = setTimeout(onClose, 4000); 
      return () => clearTimeout(timer); 
    } 
  }, [isVisible, onClose]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      role="alert"
      aria-live="polite"
      style={{ 
        position: 'fixed', 
        bottom: '32px', 
        right: '32px', 
        background: types[type].bg, 
        color: 'var(--bg-primary)',
        padding: '16px 24px', 
        borderRadius: 'var(--radius-lg)', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        boxShadow: 'var(--shadow-xl)', 
        animation: 'slideInRight 0.3s ease', 
        zIndex: 9999 
      }}
    >
      <span style={{ fontSize: '20px' }}>{types[type].icon}</span>
      <span style={{ fontWeight: '500', fontSize: '14px' }}>{message}</span>
      <button 
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        style={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          border: 'none', 
          borderRadius: 'var(--radius-sm)', 
          width: '28px',
          height: '28px',
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '8px',
          color: '#fff',
          fontSize: '16px',
          fontWeight: '600',
          transition: 'background 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
      >
        <Icon name="x" size={18} />
      </button>
    </div>
  );
};

window.Toast = Toast;