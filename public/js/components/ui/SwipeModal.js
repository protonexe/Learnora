const SwipeModal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const [dragY, setDragY] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const startY = React.useRef(0);
  const modalRef = React.useRef(null);
  const threshold = 100;

  React.useEffect(() => { 
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'; 
    return () => { document.body.style.overflow = 'auto'; }; 
  }, [isOpen]);

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    if (diff > 0) {
      setDragY(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragY > threshold) {
      if (navigator.vibrate) navigator.vibrate(15);
      onClose();
    }
    setDragY(0);
  };
  
  if (!isOpen) return null;
  
  const sizes = { sm: '420px', md: '560px', lg: '720px', xl: '900px', full: '95vw' };
  const opacity = Math.max(0.6 - (dragY / 500), 0);
  
  return (
    <div 
      onClick={onClose} 
      style={{
        position: 'fixed', 
        inset: 0, 
        background: `rgba(0, 0, 0, ${opacity})`, 
        backdropFilter: 'blur(8px)',
        display: 'flex', 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        zIndex: 1000, 
        animation: 'fadeIn 0.2s ease'
      }}
    >
      <div 
        ref={modalRef}
        onClick={(e) => e.stopPropagation()} 
        className="modal-content"
        style={{
          background: 'var(--bg-secondary)', 
          borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0', 
          width: '100%', 
          maxWidth: sizes[size],
          maxHeight: '90vh', 
          display: 'flex', 
          flexDirection: 'column',
          boxShadow: 'var(--shadow-xl)', 
          border: '1px solid var(--border-color)',
          borderBottom: 'none',
          animation: 'slideInUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: `translateY(${dragY}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease'
        }}
      >
        {/* Drag Handle */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            padding: '12px',
            display: 'flex',
            justifyContent: 'center',
            cursor: 'grab'
          }}
        >
          <div style={{
            width: '36px',
            height: '4px',
            background: 'var(--text-muted)',
            borderRadius: 'var(--radius-full)'
          }} />
        </div>

        {title && (
          <div className="modal-header" style={{ 
            padding: '12px 24px 20px', 
            borderBottom: '1px solid var(--border-color)', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, letterSpacing: '-0.02em' }}>
              {title}
            </h2>
            <button 
              onClick={onClose} 
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
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icon name="x" size={18} color="var(--text-tertiary)" />
            </button>
          </div>
        )}
        <div className="modal-body" style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

window.SwipeModal = SwipeModal;
