const Collapsible = ({ title, icon, defaultOpen = true, badge, children }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const handleToggle = () => {
    if (navigator.vibrate) {
      navigator.vibrate(5);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible" style={{ marginBottom: '16px' }}>
      <button
        onClick={handleToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: isOpen ? 'var(--radius-lg) var(--radius-lg) 0 0' : 'var(--radius-lg)',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {icon && <Icon name={icon} size={20} color="var(--primary-500)" />}
          <span style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em'
          }}>
            {title}
          </span>
          {badge && (
            <span style={{
              background: 'var(--primary-100)',
              color: 'var(--primary-600)',
              fontSize: '12px',
              fontWeight: '600',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)'
            }}>
              {badge}
            </span>
          )}
        </div>
        <div style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform var(--transition-fast)'
        }}>
          <Icon name="chevron-down" size={20} color="var(--text-tertiary)" />
        </div>
      </button>
      <div style={{
        maxHeight: isOpen ? '2000px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease-in-out',
        background: 'var(--bg-secondary)',
        borderLeft: '1px solid var(--border-color)',
        borderRight: '1px solid var(--border-color)',
        borderBottom: isOpen ? '1px solid var(--border-color)' : 'none',
        borderRadius: '0 0 var(--radius-lg) var(--radius-lg)'
      }}>
        <div style={{ padding: '16px 20px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

window.Collapsible = Collapsible;
