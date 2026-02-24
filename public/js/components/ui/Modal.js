const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  React.useEffect(() => { 
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'; 
    return () => { document.body.style.overflow = 'auto'; }; 
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const sizes = { sm: '420px', md: '560px', lg: '720px', xl: '900px', full: '95vw' };
  
  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose} 
      style={{
        position: 'fixed', 
        inset: 0, 
        background: 'var(--overlay-bg)', 
        backdropFilter: 'blur(8px)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        zIndex: 1000, 
        padding: '20px', 
        animation: 'fadeIn 0.2s ease'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="modal-content"
        style={{
          background: 'var(--bg-secondary)', 
          borderRadius: 'var(--radius-2xl)', 
          width: '100%', 
          maxWidth: sizes[size],
          maxHeight: '90vh', 
          display: 'flex', 
          flexDirection: 'column',
          boxShadow: 'var(--shadow-xl)', 
          border: '1px solid var(--border-color)',
          animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {title && (
          <div className="modal-header" style={{ 
            padding: '24px 28px', 
            borderBottom: '1px solid var(--border-color)', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <h2 id="modal-title" style={{ fontSize: '20px', fontWeight: '700', margin: 0, letterSpacing: '-0.02em' }}>
              {title}
            </h2>
            <button 
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              style={{ 
                background: 'var(--bg-tertiary)', 
                border: '1px solid var(--border-light)', 
                width: '38px', 
                height: '38px', 
                borderRadius: 'var(--radius-sm)', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                transition: 'all var(--transition-fast)',
                color: 'var(--text-tertiary)',
                fontSize: '18px',
                fontWeight: '600'
              }}
            >
              ✕
            </button>
          </div>
        )}
        <div className="modal-body" style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

window.Modal = Modal;