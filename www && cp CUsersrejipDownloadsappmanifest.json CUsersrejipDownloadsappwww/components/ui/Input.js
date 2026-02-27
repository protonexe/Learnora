const Input = ({ icon, style, ...props }) => (
  <div style={{ position: 'relative', width: '100%' }}>
    {icon && (
      <div style={{ 
        position: 'absolute', 
        left: '16px', 
        top: '50%', 
        transform: 'translateY(-50%)', 
        pointerEvents: 'none' 
      }}>
        <Icon name={icon} size={18} color="var(--text-tertiary)" />
      </div>
    )}
    <input 
      {...props} 
      style={{ 
        width: '100%',
        padding: '14px 18px',
        paddingLeft: icon ? '48px' : '18px',
        fontSize: '15px',
        fontFamily: 'inherit',
        background: 'var(--bg-tertiary)',
        border: '2px solid transparent',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-primary)',
        transition: 'all var(--transition-fast)',
        outline: 'none',
        ...style 
      }} 
    />
  </div>
);

window.Input = Input;