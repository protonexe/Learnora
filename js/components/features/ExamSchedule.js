const ExamSchedule = ({ onClose }) => {
  const exams = [
    { name: 'Mathematics Midterm', date: 'March 20, 2026', time: '9:00 AM', room: 'Room 101' },
    { name: 'Physics Final', date: 'March 25, 2026', time: '2:00 PM', room: 'Room 203' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>📅 Exam Schedule</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {exams.map((e, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 20, border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>{e.name}</div>
            <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'var(--text-secondary)' }}>
              <span>📅 {e.date}</span>
              <span>⏰ {e.time}</span>
              <span>📍 {e.room}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
