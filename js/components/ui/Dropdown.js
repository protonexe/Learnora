const Dropdown = ({ 
  trigger, 
  children, 
  align = 'right',
  isOpen, 
  onToggle 
}) => {
  const dropdownRef = React.useRef(null);
  const isMobile = window.innerWidth <= 768;

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onToggle(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <div onClick={() => onToggle(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          [align]: 0,
          marginTop: '8px',
          minWidth: '180px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          zIndex: 100,
          overflow: 'hidden',
          animation: 'dropdownFadeIn 0.15s ease'
        }}>
          <style>{`
            @keyframes dropdownFadeIn {
              from { opacity: 0; transform: translateY(-8px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ children, onClick, icon, danger = false, divider = false }) => {
  if (divider) {
    return <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }} />;
  }

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '10px 14px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        fontWeight: '500',
        color: danger ? 'var(--danger)' : 'var(--text-primary)',
        textAlign: 'left',
        transition: 'background 0.15s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--bg-tertiary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
      }}
    >
      {icon && <span style={{ fontSize: '16px' }}>{icon}</span>}
      {children}
    </button>
  );
};

const DropdownMenu = ({ children }) => {
  return <div style={{ padding: '4px' }}>{children}</div>;
};

window.Dropdown = Dropdown;
window.DropdownItem = DropdownItem;
window.DropdownMenu = DropdownMenu;
