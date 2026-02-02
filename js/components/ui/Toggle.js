const Toggle = ({ checked, onChange, label, description }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
    {(label || description) && (
      <div style={{ flex: 1 }}>
        {label && (
          <div style={{ 
            fontSize: '15px', 
            fontWeight: '600', 
            color: 'var(--text-primary)', 
            marginBottom: description ? '4px' : 0 
          }}>
            {label}
          </div>
        )}
        {description && (
          <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
            {description}
          </div>
        )}
      </div>
    )}
    <button 
      onClick={() => onChange(!checked)} 
      style={{
        width: '52px', 
        height: '30px', 
        borderRadius: 'var(--radius-full)',
        background: checked ? 'var(--gradient-primary)' : 'var(--bg-tertiary)',
        border: checked ? 'none' : '2px solid var(--border-color)',
        cursor: 'pointer', 
        position: 'relative', 
        transition: 'all var(--transition-normal)',
        flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute', 
        width: '22px', 
        height: '22px', 
        borderRadius: '50%',
        background: 'var(--bg-primary)', 
        top: '4px', 
        left: checked ? '26px' : '4px',
        transition: 'all var(--transition-bounce)',
        boxShadow: 'var(--shadow-sm)'
      }} />
    </button>
  </div>
);

window.Toggle = Toggle;