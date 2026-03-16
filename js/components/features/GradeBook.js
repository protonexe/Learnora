const GradeBook = ({ onClose }) => {
  const grades = [
    { subject: 'Mathematics', grade: 'A', score: 95 },
    { subject: 'Physics', grade: 'A-', score: 92 },
    { subject: 'Chemistry', grade: 'B+', score: 88 },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📊 Grade Book</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {grades.map((g, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{g.subject}</span>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#10b981', marginRight: 8 }}>{g.grade}</span>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>({g.score}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
