const StickyTabBar = ({ tabs, activeTab, onChange, sticky = true }) => {
  const isMobile = window.innerWidth <= 768;
  const [isSticky, setIsSticky] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!sticky) {
    return (
      <div style={{
        display: 'flex',
        gap: '4px',
        background: 'var(--bg-secondary)',
        padding: '4px',
        borderRadius: '12px',
        marginBottom: '16px'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: activeTab === tab.id ? 'var(--primary-500)' : 'transparent',
              color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Static Tab Bar */}
      <div style={{
        display: 'flex',
        gap: '4px',
        background: 'var(--bg-secondary)',
        padding: '4px',
        borderRadius: '12px',
        marginBottom: isSticky ? '0' : '16px',
        transition: 'margin 0.3s ease'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: activeTab === tab.id ? 'var(--primary-500)' : 'transparent',
              color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sticky Version */}
      {isSticky && (
        <div style={{
          position: 'fixed',
          top: '72px',
          left: '240px',
          right: '0',
          zIndex: 50,
          padding: '12px 20px',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            gap: '4px',
            background: 'var(--bg-tertiary)',
            padding: '4px',
            borderRadius: '10px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  onChange(tab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  background: activeTab === tab.id ? 'var(--primary-500)' : 'transparent',
                  color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

window.StickyTabBar = StickyTabBar;
