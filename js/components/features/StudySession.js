const StudySession = ({ onClose }) => {
  const [active, setActive] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);

  React.useEffect(() => {
    let interval = null;
    if (active) interval = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(interval);
  }, [active]);

  const format = (s) => `${Math.floor(s / 3600).toString().padStart(2, '0')}:${Math.floor((s % 3600) / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>⏱️ Study Session</h2>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 56, fontWeight: 700, fontFamily: 'monospace', color: active ? '#10b981' : 'var(--text-primary)', marginBottom: 32 }}>{format(elapsed)}</div>
        <button onClick={() => setActive(!active)} style={{ width: 80, height: 80, borderRadius: '50%', border: 'none', background: active ? '#f43f5e' : '#10b981', color: 'white', cursor: 'pointer', fontSize: 24 }}>{active ? '⏹' : '▶'}</button>
      </div>
    </div>
  );
};
