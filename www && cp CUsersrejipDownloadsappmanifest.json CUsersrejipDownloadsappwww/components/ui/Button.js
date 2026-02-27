const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconRight, 
  loading, 
  disabled, 
  fullWidth, 
  style, 
  onClick, 
  ...props 
}) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'inherit',
    fontWeight: '600',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    transition: 'all var(--transition-normal)',
    border: '2px solid var(--border-strong)',
    outline: 'none',
  };

  const variants = {
    primary: {
      background: 'var(--primary-600)',
      color: 'var(--bg-primary)',
      border: '2px solid var(--primary-600)',
    },
    secondary: {
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      border: '2px solid var(--border-strong)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-primary)',
      border: '2px solid var(--border-strong)',
    },
    danger: {
      background: 'var(--danger)',
      color: 'var(--bg-primary)',
      border: '2px solid var(--danger)',
    },
    success: {
      background: 'var(--success)',
      color: 'var(--bg-primary)',
      border: '2px solid var(--success)',
    }
  };

  const sizes = {
    sm: { padding: '8px 14px', fontSize: '12px', gap: '6px', borderRadius: 'var(--radius-sm)' },
    md: { padding: '10px 18px', fontSize: '13px', gap: '8px' },
    lg: { padding: '12px 24px', fontSize: '14px', gap: '8px', borderRadius: 'var(--radius-lg)' },
  };

  return (
    <button 
      onClick={(e) => {
        console.log('[BUTTON] Button clicked, type:', props.type || 'not specified');
        if (onClick) {
          console.log('[BUTTON] Calling onClick handler');
          onClick(e);
        }
      }}
      disabled={disabled || loading} 
      style={{
        ...baseStyle,
        ...variants[variant],
        ...sizes[size],
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        ...style
      }} 
      {...props}
    >
      {loading && (
        <span style={{ 
          width: size === 'sm' ? 14 : size === 'lg' ? 18 : 16, 
          height: size === 'sm' ? 14 : size === 'lg' ? 18 : 16, 
          border: '2px solid var(--text-tertiary)', 
          borderTopColor: 'var(--text-primary)', 
          borderRadius: '50%', 
          animation: 'spin 0.8s linear infinite' 
        }} />
      )}
      {icon && !loading && <Icon name={icon} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      {children && <span>{children}</span>}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
    </button>
  );
};

window.Button = Button;
