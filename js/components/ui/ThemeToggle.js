const ThemeToggle = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';
  
  return (
    <button
      onClick={onToggle}
      style={{
        position: 'relative',
        width: '64px',
        height: '34px',
        background: isDark ? 'var(--bg-tertiary)' : 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
        border: 'none',
        borderRadius: '17px',
        cursor: 'pointer',
        padding: '3px',
        transition: 'all 0.3s ease',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isDark ? 'transparent' : 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
        opacity: isDark ? 0 : 1,
        transition: 'opacity 0.3s ease'
      }} />
      
      <div style={{
        width: '28px',
        height: '28px',
        background: isDark ? '#1a1a2e' : '#fff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: isDark ? 'translateX(30px)' : 'translateX(0)',
        transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        position: 'relative',
        zIndex: 1
      }}>
        {isDark ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </div>
    </button>
  );
};

const AnimatedThemeToggle = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';
  
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        position: 'relative',
        width: '56px',
        height: '32px',
        background: isDark 
          ? 'linear-gradient(135deg, #1e1e3f 0%, #2d2d5a 100%)'
          : 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)',
        border: 'none',
        borderRadius: '16px',
        cursor: 'pointer',
        padding: '4px',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Sun/Moon Icons Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8px',
        opacity: isDark ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}>
        <span style={{ fontSize: '12px' }}>🌙</span>
        <span style={{ fontSize: '12px' }}>⭐</span>
      </div>
      
      {/* Toggle Knob */}
      <div style={{
        width: '24px',
        height: '24px',
        background: isDark ? '#6366f1' : '#fff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: isDark ? 'translateX(24px)' : 'translateX(0)',
        transition: 'transform 0.4s cubic-bezier(0.68, -0.15, 0.27, 1.15)',
        boxShadow: isDark 
          ? '0 2px 8px rgba(99, 102, 241, 0.5)' 
          : '0 2px 6px rgba(0,0,0,0.2)',
        position: 'relative',
        zIndex: 1
      }}>
        {isDark ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3" stroke="#f59e0b" strokeWidth="2"/>
            <line x1="12" y1="21" x2="12" y2="23" stroke="#f59e0b" strokeWidth="2"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#f59e0b" strokeWidth="2"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#f59e0b" strokeWidth="2"/>
            <line x1="1" y1="12" x2="3" y2="12" stroke="#f59e0b" strokeWidth="2"/>
            <line x1="21" y1="12" x2="23" y2="12" stroke="#f59e0b" strokeWidth="2"/>
          </svg>
        )}
      </div>
      
      {/* Glow Effect */}
      {isDark && (
        <div style={{
          position: 'absolute',
          right: '8px',
          width: '6px',
          height: '6px',
          background: '#6366f1',
          borderRadius: '50%',
          boxShadow: '0 0 8px 2px rgba(99, 102, 241, 0.6)'
        }} />
      )}
    </button>
  );
};

window.ThemeToggle = ThemeToggle;
window.AnimatedThemeToggle = AnimatedThemeToggle;
