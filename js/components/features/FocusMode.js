const FocusMode = ({ isActive, onClose, children }) => {
  const isMobile = window.innerWidth <= 768;
  
  if (!isActive) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--bg-primary)',
      zIndex: 9999,
      overflow: 'auto'
    }}>
      {/* Minimal Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>🎯</span>
          <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Focus Mode
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'var(--bg-tertiary)',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Icon name="x" size={16} />
          Exit Focus
        </button>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: isMobile ? '20px' : '40px'
      }}>
        {children}
      </div>

      {/* Keyboard hint */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--bg-secondary)',
        padding: '8px 16px',
        borderRadius: '8px',
        fontSize: '12px',
        color: 'var(--text-tertiary)',
        border: '1px solid var(--border-color)'
      }}>
        Press Esc to exit focus mode
      </div>
    </div>
  );
};

window.FocusMode = FocusMode;
