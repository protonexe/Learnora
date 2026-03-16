const AttendanceTracker = ({ onClose }) => {
  const records = [
    { date: '2026-03-15', status: 'present' },
    { date: '2026-03-14', status: 'present' },
    { date: '2026-03-13', status: 'absent' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>✅ Attendance</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {records.map((r, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 10, padding: 14, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{r.date}</span>
            <span style={{ padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, background: r.status === 'present' ? '#10b98115' : '#f43f5e15', color: r.status === 'present' ? '#10b981' : '#f43f5e' }}>{r.status === 'present' ? '✓ Present' : '✗ Absent'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
