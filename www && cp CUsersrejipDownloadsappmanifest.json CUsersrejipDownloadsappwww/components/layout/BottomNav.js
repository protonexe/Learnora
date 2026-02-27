const BottomNav = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Home' },
    { id: 'courses', icon: '📚', label: 'Courses' },
    { id: 'quizzes', icon: '❓', label: 'Quizzes' },
    { id: 'flashcards', icon: '🎴', label: 'Cards' },
    { id: 'settings', icon: '👤', label: 'Profile' }
  ];

  const handleNavClick = (itemId) => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    onNavigate(itemId);
  };

  return (
    <nav className="bottom-nav" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '70px',
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderTop: '1px solid var(--border-light)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '0 8px',
      paddingBottom: 'env(safe-area-inset-bottom, 0)',
      zIndex: 100,
      boxShadow: 'var(--shadow-lg)'
    }}>
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            type="button"
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={item.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '8px 12px',
              background: isActive ? 'var(--primary-100)' : 'transparent',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              minWidth: '60px'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform var(--transition-fast)',
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
              fontSize: '22px',
              opacity: isActive ? 1 : 0.6
            }}>
              {item.icon}
            </div>
            <span style={{
              fontSize: '11px',
              fontWeight: isActive ? '600' : '500',
              color: isActive ? 'var(--primary-500)' : 'var(--text-tertiary)',
              transition: 'color var(--transition-fast)'
            }}>
              {item.label}
            </span>
            {isActive && (
              <div style={{
                position: 'absolute',
                top: '0',
                width: '20px',
                height: '3px',
                background: 'var(--gradient-primary)',
                borderRadius: '0 0 3px 3px'
              }} />
            )}
          </button>
        );
      })}
    </nav>
  );
};

window.BottomNav = BottomNav;
