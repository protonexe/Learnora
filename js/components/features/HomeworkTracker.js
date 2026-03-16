const HomeworkTracker = ({ onClose }) => {
  const homeworks = [
    { id: 1, subject: 'Math', task: 'Problem Set 3', due: 'Tomorrow', priority: 'high' },
    { id: 2, subject: 'Physics', task: 'Lab Report', due: '3 days', priority: 'medium' },
  ];

  const colors = { high: '#f43f5e', medium: '#f59e0b', low: '#10b981' };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📝 Homework</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {homeworks.map(h => (
          <div key={h.id} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, borderLeft: `4px solid ${colors[h.priority]}`, border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: colors[h.priority], fontWeight: 600, textTransform: 'uppercase' }}>{h.priority}</span>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Due: {h.due}</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{h.task}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{h.subject}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
