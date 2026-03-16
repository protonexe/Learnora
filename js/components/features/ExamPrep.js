const ExamPrep = ({ onClose }) => {
  const [exams, setExams] = React.useState([
    { id: 1, name: 'Midterm - Calculus', subject: 'Mathematics', date: '2026-03-20', duration: 120, status: 'upcoming', topics: ['Derivatives', 'Integrals', 'Limits'] },
    { id: 2, name: 'Final - Physics', subject: 'Physics', date: '2026-03-25', duration: 180, status: 'upcoming', topics: ['Mechanics', 'Thermodynamics', 'Waves'] },
    { id: 3, name: 'Quiz - Chemistry', subject: 'Chemistry', date: '2026-03-18', duration: 45, status: 'tomorrow', topics: ['Organic', 'Periodic Table'] },
  ]);
  const [studyPlan, setStudyPlan] = React.useState(() => {
    const saved = localStorage.getItem('learnora-exam-plan');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedExam, setSelectedExam] = React.useState(null);
  const [showPlanner, setShowPlanner] = React.useState(false);

  const savePlan = (plan) => {
    setStudyPlan(plan);
    localStorage.setItem('learnora-exam-plan', JSON.stringify(plan));
  };

  const generateStudyPlan = (exam) => {
    const days = Math.ceil((new Date(exam.date) - new Date()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return;
    
    const topicsPerDay = Math.ceil(exam.topics.length / days);
    const plan = [];
    
    for (let i = 0; i < days; i++) {
      const dayTopics = exam.topics.slice(i * topicsPerDay, (i + 1) * topicsPerDay);
      plan.push({
        id: Date.now() + i,
        examId: exam.id,
        day: i + 1,
        topics: dayTopics,
        completed: false,
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString()
      });
    }
    
    savePlan([...studyPlan, ...plan]);
  };

  const toggleTopic = (planId) => {
    savePlan(studyPlan.map(p => p.id === planId ? { ...p, completed: !p.completed } : p));
  };

  const getStatusColor = (status) => {
    if (status === 'tomorrow') return '#f43f5e';
    if (status === 'upcoming') return '#0ea5e9';
    return '#10b981';
  };

  const getDaysUntil = (date) => {
    const diff = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 'Past';
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return `${diff} days`;
  };

  const totalTopics = studyPlan.filter(p => p.examId === selectedExam?.id).length;
  const completedTopics = studyPlan.filter(p => p.examId === selectedExam?.id && p.completed).length;
  const progress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-primary)',
      zIndex: 1000,
      overflow: 'auto',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            cursor: 'pointer'
          }}>
            ← Back
          </button>
          <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>📝 Exam Prep</h2>
        </div>
      </div>

      <div style={{ padding: 20, maxWidth: 700, margin: '0 auto' }}>
        {/* Upcoming Exams */}
        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--text-secondary)' }}>Upcoming Exams</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {exams.map(exam => (
            <div
              key={exam.id}
              onClick={() => { setSelectedExam(exam); setShowPlanner(true); }}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: 12,
                padding: 16,
                border: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, color: 'var(--text-primary)' }}>{exam.name}</h3>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{exam.subject}</span>
                </div>
                <span style={{
                  padding: '4px 10px',
                  background: getStatusColor(exam.status) + '15',
                  color: getStatusColor(exam.status),
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600
                }}>
                  {getDaysUntil(exam.date)}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {exam.topics.map((topic, idx) => (
                  <span key={idx} style={{
                    padding: '4px 8px',
                    background: 'var(--bg)',
                    color: 'var(--text-secondary)',
                    borderRadius: 4,
                    fontSize: 11
                  }}>
                    {topic}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>⏱️ {exam.duration} min</span>
                <span style={{ fontSize: 12, color: 'var(--primary)' }}>Generate Study Plan →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Study Plan */}
        {showPlanner && selectedExam && (
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 20,
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16 }}>Study Plan: {selectedExam.name}</h3>
              <button
                onClick={() => generateStudyPlan(selectedExam)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'var(--primary)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 600
                }}
              >
                Generate Plan
              </button>
            </div>

            {totalTopics > 0 && (
              <>
                <div style={{
                  height: 8,
                  background: 'var(--bg)',
                  borderRadius: 4,
                  marginBottom: 16,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: progress + '%',
                    background: progress === 100 ? '#10b981' : 'var(--primary)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>
                  {completedTopics}/{totalTopics} topics completed ({progress}%)
                </p>
              </>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {studyPlan.filter(p => p.examId === selectedExam.id).map(plan => (
                <div
                  key={plan.id}
                  onClick={() => toggleTopic(plan.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: 12,
                    background: plan.completed ? '#10b98115' : 'var(--bg)',
                    borderRadius: 8,
                    cursor: 'pointer',
                    border: plan.completed ? '1px solid #10b981' : '1px solid var(--border-color)'
                  }}
                >
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: plan.completed ? 'none' : '2px solid var(--border-color)',
                    background: plan.completed ? '#10b981' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 12
                  }}>
                    {plan.completed && '✓'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: plan.completed ? '#10b981' : 'var(--text-primary)', textDecoration: plan.completed ? 'line-through' : 'none' }}>
                      Day {plan.day}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                      {plan.topics.join(', ')}
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{plan.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
