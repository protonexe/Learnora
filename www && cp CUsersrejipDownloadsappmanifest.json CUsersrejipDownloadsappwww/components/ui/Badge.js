const Badge = ({ children, variant = 'default', size = 'md', icon, dot, style }) => {
  const variants = {
    default: { background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' },
    primary: { background: 'var(--primary-100)', color: 'var(--primary-600)' },
    success: { background: 'rgba(16, 185, 129, 0.12)', color: 'var(--success)' },
    warning: { background: 'rgba(245, 158, 11, 0.12)', color: 'var(--warning)' },
    danger: { background: 'rgba(239, 68, 68, 0.12)', color: 'var(--danger)' },
    info: { background: 'rgba(59, 130, 246, 0.12)', color: 'var(--info)' },
  };

  const sizes = { 
    sm: { padding: '4px 10px', fontSize: '11px', gap: '4px' }, 
    md: { padding: '6px 12px', fontSize: '12px', gap: '6px' }, 
    lg: { padding: '8px 16px', fontSize: '14px', gap: '8px' } 
  };

  return (
    <span style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: sizes[size].gap, 
      borderRadius: 'var(--radius-full)', 
      fontWeight: '600',
      letterSpacing: '0.01em',
      ...variants[variant], 
      ...sizes[size],
      ...style
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />}
      {icon && <Icon name={icon} size={size === 'sm' ? 12 : 14} />}
      {children}
    </span>
  );
};

window.Badge = Badge;