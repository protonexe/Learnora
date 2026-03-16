const ProgressBar = ({ onClose }) => {
  const [progress, setProgress] = React.useState(65);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📊 Progress</h2>
      </div>
      <div style={{ padding: 40, textAlign: 'center' }}>
        <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto 24px' }}>
          <svg style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="100" cy="100" r="90" fill="none" stroke="var(--border-color)" strokeWidth="12" />
            <circle cx="100" cy="100" r="90" fill="none" stroke="var(--primary)" strokeWidth="12" strokeLinecap="round" strokeDasharray={2 * Math.PI * 90} strokeDashoffset={2 * Math.PI * 90 * (1 - progress / 100)} />
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 48, fontWeight: 700, color: 'var(--primary)' }}>{progress}%</div>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => setProgress(Math.max(0, progress - 10))} style={{ padding: '12px 24px', borderRadius: 8, border: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)', cursor: 'pointer', fontSize: 16 }}>-10%</button>
          <button onClick={() => setProgress(Math.min(100, progress + 10))} style={{ padding: '12px 24px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontSize: 16, fontWeight: 600 }}>+10%</button>
        </div>
      </div>
    </div>
  );
};
