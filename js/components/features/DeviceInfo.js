const DeviceInfo = () => {
  const [info, setInfo] = React.useState({});

  React.useEffect(() => {
    setInfo({
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      deviceMemory: navigator.deviceMemory || 'Unknown',
      online: navigator.onLine
    });
  }, []);

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid var(--border-color)'
    }}>
      <h3 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 12px 0' }}>Device Info</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
        {Object.entries(info).map(([key, value]) => (
          <div key={key} style={{ padding: '8px', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
            <div style={{ color: 'var(--text-tertiary)', marginBottom: '2px' }}>{key}</div>
            <div style={{ fontWeight: '500', wordBreak: 'break-all' }}>{String(value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.DeviceInfo = DeviceInfo;
