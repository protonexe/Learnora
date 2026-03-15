const Tabs = ({ tabs, activeTab, onChange, variant = 'default' }) => {
  const isMobile = window.innerWidth <= 768;

  const variants = {
    default: {
      container: { background: 'var(--bg-tertiary)', padding: '4px', borderRadius: '12px' },
      button: (active) => ({
        background: active ? 'var(--bg-secondary)' : 'transparent',
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
        boxShadow: active ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
      })
    },
    pills: {
      container: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
      button: (active) => ({
        background: active ? 'var(--primary-500)' : 'var(--bg-tertiary)',
        color: active ? '#fff' : 'var(--text-secondary)',
        border: active ? 'none' : '1px solid var(--border-color)'
      })
    },
    underline: {
      container: { display: 'flex', borderBottom: '1px solid var(--border-color)' },
      button: (active) => ({
        background: 'transparent',
        color: active ? 'var(--primary-500)' : 'var(--text-secondary)',
        borderBottom: active ? '2px solid var(--primary-500)' : '2px solid transparent',
        borderRadius: 0,
        paddingBottom: '12px'
      })
    }
  };

  const style = variants[variant] || variants.default;

  return (
    <div style={{
      ...style.container,
      marginBottom: '20px'
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            flex: 1,
            padding: isMobile ? '10px 12px' : '12px 20px',
            border: 'none',
            borderRadius: variant === 'underline' ? 0 : '8px',
            cursor: 'pointer',
            fontSize: isMobile ? '13px' : '14px',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            ...style.button(activeTab === tab.id)
          }}
        >
          {tab.icon && <span style={{ marginRight: '6px' }}>{tab.icon}</span>}
          {tab.label}
          {tab.badge && (
            <span style={{
              marginLeft: '6px',
              padding: '2px 8px',
              background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'var(--primary-500)',
              borderRadius: '10px',
              fontSize: '11px'
            }}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

const TabPanel = ({ children, activeTab, tabId }) => {
  if (activeTab !== tabId) return null;
  return <div>{children}</div>;
};

window.Tabs = Tabs;
window.TabPanel = TabPanel;
