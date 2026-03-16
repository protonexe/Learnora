const ExamCountdown = ({ onClose }) => {
  const exams = [
    { name: 'Math Midterm', date: '2026-03-20', days: 4 },
    { name: 'Physics Final', date: '2026-03-25', days: 9 },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>📝 Exam Countdown</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {exams.map((e, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 20, border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#f43f5e', marginBottom: 8 }}>{e.days}</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 4 }}>days until</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>{e.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
