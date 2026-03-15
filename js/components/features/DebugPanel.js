const DebugPanel = ({ data, isOpen, onClose }) => {
  const [tab, setTab] = React.useState('console');
  const [logs, setLogs] = React.useState([]);

  React.useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => {
      setLogs(prev => [...prev, { type: 'log', message: args.join(' '), time: Date.now() }]);
      originalLog(...args);
    };
    console.error = (...args) => {
      setLogs(prev => [...prev, { type: 'error', message: args.join(' '), time: Date.now() }]);
      originalError(...args);
    };
    console.warn = (...args) => {
      setLogs(prev => [...prev, { type: 'warn', message: args.join(' '), time: Date.now() }]);
      originalWarn(...args);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '300px',
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-tertiary)' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['console', 'state', 'network'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '4px 12px', background: tab === t ? 'var(--primary-500)' : 'transparent', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '12px', cursor: 'pointer' }}>{t}</button>
          ))}
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>✕</button>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
        {tab === 'console' && logs.map((log, idx) => (
          <div key={idx} style={{ fontSize: '12px', fontFamily: 'monospace', color: log.type === 'error' ? '#ef4444' : log.type === 'warn' ? '#f59e0b' : 'var(--text-primary)', padding: '2px 0' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>[{new Date(log.time).toLocaleTimeString()}]</span> {log.message}
          </div>
        ))}
        {tab === 'state' && <pre style={{ fontSize: '12px', fontFamily: 'monospace' }}>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  );
};

window.DebugPanel = DebugPanel;
