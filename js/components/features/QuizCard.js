const QuizCard = ({ onClose }) => {
  const quizzes = [
    { title: 'Math Quiz 1', score: 85, total: 10, date: '2026-03-15' },
    { title: 'Physics Quiz', score: 92, total: 10, date: '2026-03-14' },
    { title: 'Chemistry Quiz', score: 78, total: 10, date: '2026-03-13' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>✍️ Recent Quizzes</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {quizzes.map((q, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{q.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{q.date}</div>
            </div>
            <span style={{ padding: '8px 16px', background: q.score >= 80 ? '#10b98115' : '#f59e0b15', color: q.score >= 80 ? '#10b981' : '#f59e0b', borderRadius: 8, fontWeight: 600 }}>{q.score}/{q.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
