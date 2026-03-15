const Breadcrumb = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '13px' }}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Icon name="chevron-right" size={14} color="var(--text-tertiary)" />
          )}
          {item.onClick ? (
            <button
              onClick={item.onClick}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                color: index === items.length - 1 ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: index === items.length - 1 ? '600' : '400',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </button>
          ) : (
            <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

window.Breadcrumb = Breadcrumb;
