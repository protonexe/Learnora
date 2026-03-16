const ProgressWidget = ({ onClose }) => {
  const [progress, setProgress] = React.useState([
    { subject: 'Mathematics', percent: 75, color: '#f43f5e' },
    { subject: 'Physics', percent: 60, color: '#14b8a6' },
    { subject: 'Chemistry', percent: 45, color: '#0ea5e9' },
    { subject: 'Biology', percent: 80, color: '#10b981' },
    { subject: 'History', percent: 90, color: '#8b5cf6' },
  ]);

  const total = Math.round(progress.reduce((a, p) => a + p.percent, 0) / progress.length);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📊 Progress Overview</h2>
      </div>

      <div style={{ padding: 20, maxWidth: 500, margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)', borderRadius: 16, padding: 24, marginBottom: 24, textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: 48, fontWeight: 700, marginBottom: 8 }}>{total}%</div>
          <div style={{ fontSize: 14, opacity: 0.8 }}>Overall Progress</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {progress.map((item, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{item.subject}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: item.color }}>{item.percent}%</span>
              </div>
              <div style={{ height: 8, background: 'var(--bg)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: item.percent + '%', background: item.color, transition: 'width 0.3s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
