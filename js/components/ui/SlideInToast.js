const SlideInToast = ({ message, type = 'info', onClose }) => {
  const isMobile = window.innerWidth <= 768;
  
  const typeStyles = {
    success: { bg: '#10b981', icon: '✓' },
    error: { bg: '#ef4444', icon: '✕' },
    warning: { bg: '#f59e0b', icon: '⚠' },
    info: { bg: '#6366f1', icon: 'ℹ' }
  };

  const style = typeStyles[type] || typeStyles.info;

  return (
    <div style={{
      position: 'fixed',
      top: isMobile ? '12px' : '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      animation: 'slideDown 0.3s ease'
    }}>
      <div style={{
        background: style.bg,
        color: '#fff',
        padding: isMobile ? '12px 20px' : '14px 24px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: isMobile ? '14px' : '15px',
        fontWeight: '600',
        maxWidth: isMobile ? '90vw' : '400px'
      }}>
        <span style={{
          width: '24px',
          height: '24px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px'
        }}>
          {style.icon}
        </span>
        <span style={{ flex: 1 }}>{message}</span>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            padding: '4px',
            opacity: 0.8,
            fontSize: '16px'
          }}
        >
          ✕
        </button>
      </div>
      <style>{`
        @keyframes slideDown {
          from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

window.SlideInToast = SlideInToast;
