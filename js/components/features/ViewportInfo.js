const WindowSize = () => {
  const [size, setSize] = React.useState({ width: window.innerWidth, height: window.innerHeight });

  React.useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ padding: '8px 12px', background: 'var(--bg-tertiary)', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace' }}>
      {size.width} x {size.height}
    </div>
  );
};

const ViewportInfo = () => {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <WindowSize />
      <div style={{ padding: '8px 12px', background: 'var(--bg-tertiary)', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace' }}>
        {window.innerWidth <= 768 ? '📱 Mobile' : window.innerWidth <= 1024 ? '📱 Tablet' : '💻 Desktop'}
      </div>
    </div>
  );
};

window.WindowSize = WindowSize;
window.ViewportInfo = ViewportInfo;
