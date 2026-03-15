const DataPrivacySettings = ({ showToast }) => {
  const [settings, setSettings] = React.useState({
    analytics: true,
    personalized: true,
    cookies: false,
    marketing: false
  });

  const updateSetting = (key, value) => {
    setSettings({ ...settings, [key]: value });
    showToast?.('Privacy settings updated', 'success');
  };

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-xl)',
      padding: '20px',
      border: '1px solid var(--border-color)'
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
        🔒 Privacy & Data
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          { key: 'analytics', label: 'Analytics', desc: 'Help us improve by sharing usage data', icon: '📊' },
          { key: 'personalized', label: 'Personalized Recommendations', desc: 'Get customized learning suggestions', icon: '✨' },
          { key: 'cookies', label: 'Cookies', desc: 'Store preferences locally', icon: '🍪' },
          { key: 'marketing', label: 'Marketing', desc: 'Receive updates about new features', icon: '📧' },
        ].map(item => (
          <div key={item.key} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px',
            background: 'var(--bg-tertiary)',
            borderRadius: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{item.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{item.desc}</div>
              </div>
            </div>
            <button
              onClick={() => updateSetting(item.key, !settings[item.key])}
              style={{
                width: '48px',
                height: '28px',
                borderRadius: '14px',
                border: 'none',
                background: settings[item.key] ? 'var(--primary-500)' : 'var(--bg-secondary)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s ease'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '3px',
                left: settings[item.key] ? '23px' : '3px',
                width: '22px',
                height: '22px',
                background: '#fff',
                borderRadius: '50%',
                transition: 'left 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => showToast?.('Downloading your data...', 'info')}
        style={{
          width: '100%',
          marginTop: '16px',
          padding: '12px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        <Icon name="download" size={16} />
        Download My Data
      </button>
    </div>
  );
};

window.DataPrivacySettings = DataPrivacySettings;
