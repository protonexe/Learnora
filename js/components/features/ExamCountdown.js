const ExamCountdown = ({ onBack, showToast }) => {
  const [exams, setExams] = React.useState(() => JSON.parse(localStorage.getItem('exam-countdowns')) || []);

  const addExam = () => {
    const name = prompt('Exam name:');
    const date = prompt('Exam date (YYYY-MM-DD):');
    if (name && date) {
      const newExam = { id: Date.now(), name, date, color: ['#f43f5e', '#14b8a6', '#0ea5e9', '#10b981', '#8b5cf6'][Math.floor(Math.random() * 5)] };
      setExams([...exams, newExam]);
      localStorage.setItem('exam-countdowns', JSON.stringify([...exams, newExam]));
      showToast?.('Exam added!', 'success');
    }
  };

  const deleteExam = (id) => {
    const updated = exams.filter(e => e.id !== id);
    setExams(updated);
    localStorage.setItem('exam-countdowns', JSON.stringify(updated));
  };

  const getCountdown = (dateStr) => {
    const examDate = new Date(dateStr);
    const now = new Date();
    const diff = examDate - now;
    if (diff < 0) return { days: 0, text: 'Passed' };
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return { days, text: days === 1 ? '1 day' : `${days} days` };
  };

  const sortedExams = [...exams].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Exam Countdown</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <button
          onClick={addExam}
          style={{ width: '100%', padding: '15px', background: '#1f2937', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', marginBottom: '25px', fontWeight: '600' }}
        >
          + Add Exam
        </button>

        {sortedExams.length === 0 && (
          <div style={{ textAlign: 'center', color: '#9ca3af', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📅</div>
            <p>No exams scheduled</p>
          </div>
        )}

        {sortedExams.map(exam => {
          const countdown = getCountdown(exam.date);
          const isUrgent = countdown.days <= 3 && countdown.days > 0;
          return (
            <div key={exam.id} style={{ background: exam.color, padding: '25px', borderRadius: '20px', marginBottom: '15px', color: 'white', position: 'relative' }}>
              <button
                onClick={() => deleteExam(exam.id)}
                style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}
              >
                ×
              </button>
              <h3 style={{ marginBottom: '5px', fontSize: '20px' }}>{exam.name}</h3>
              <p style={{ opacity: 0.9, marginBottom: '15px' }}>{new Date(exam.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <div style={{ fontSize: '48px', fontWeight: 'bold', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                {countdown.days === 0 ? '📝' : countdown.text}
              </div>
              {isUrgent && (
                <div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.2)', padding: '8px 15px', borderRadius: '20px', display: 'inline-block', fontSize: '12px' }}>
                  ⚠️ Coming soon!
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

window.ExamCountdown = ExamCountdown;
