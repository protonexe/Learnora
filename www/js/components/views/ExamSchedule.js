const ExamScheduleView = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [exams, setExams] = React.useState([
    { id: 1, title: 'Mathematics Midterm', subject: 'Mathematics', date: '2026-03-20', time: '09:00', duration: '90 min', room: 'Room 101', type: 'exam' },
    { id: 2, title: 'Physics Quiz', subject: 'Physics', date: '2026-03-22', time: '10:30', duration: '45 min', room: 'Lab 3', type: 'quiz' },
    { id: 3, title: 'Chemistry Final', subject: 'Chemistry', date: '2026-03-25', time: '14:00', duration: '120 min', room: 'Auditorium', type: 'exam' },
    { id: 4, title: 'Biology Practical', subject: 'Biology', date: '2026-03-18', time: '13:00', duration: '60 min', room: 'Lab 1', type: 'practical' },
  ]);
  const [filter, setFilter] = React.useState('all');

  const filteredExams = filter === 'all' ? exams : exams.filter(e => e.type === filter);

  const getTypeIcon = (type) => {
    switch(type) {
      case 'exam': return '📝';
      case 'quiz': return '✅';
      case 'practical': return '🔬';
      default: return '📋';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'exam': return 'var(--danger)';
      case 'quiz': return 'var(--accent-blue)';
      case 'practical': return 'var(--success)';
      default: return 'var(--primary-500)';
    }
  };

  const isUpcoming = (date) => new Date(date) >= new Date();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '8px 12px 80px' : '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700' }}>Exam Schedule</h1>
        <button style={{ padding: '8px 16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
          + Add Exam
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {['all', 'exam', 'quiz', 'practical'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 16px', background: filter === f ? 'var(--primary-500)' : 'var(--bg-secondary)', color: filter === f ? '#fff' : 'var(--text-secondary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', textTransform: 'capitalize' }}>
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredExams.sort((a, b) => new Date(a.date) - new Date(b.date)).map((exam, idx) => (
          <div key={exam.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', borderLeft: `4px solid ${getTypeColor(exam.type)}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', background: getTypeColor(exam.type), borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                  {getTypeIcon(exam.type)}
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>{exam.title}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>{exam.subject}</p>
                </div>
              </div>
              <span style={{ padding: '4px 12px', background: isUpcoming(exam.date) ? 'var(--success)20' : 'var(--bg-tertiary)', color: isUpcoming(exam.date) ? 'var(--success)' : 'var(--text-secondary)', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>
                {isUpcoming(exam.date) ? 'UPCOMING' : 'PAST'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon name="calendar" size={14} color="var(--text-tertiary)" />
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{new Date(exam.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon name="clock" size={14} color="var(--text-tertiary)" />
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{exam.time} ({exam.duration})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon name="map-pin" size={14} color="var(--text-tertiary)" />
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{exam.room}</span>
              </div>
            </div>
          </div>
        ))}
        {filteredExams.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
            <p>No exams scheduled.</p>
          </div>
        )}
      </div>
    </div>
  );
};

window.ExamScheduleView = ExamScheduleView;
