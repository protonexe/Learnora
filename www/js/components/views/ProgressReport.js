const ProgressReportView = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [reports, setReports] = React.useState([]);
  const [coursesProgress, setCoursesProgress] = React.useState([]);
  const [quizzesTaken, setQuizzesTaken] = React.useState([]);
  const [showGenerate, setShowGenerate] = React.useState(false);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    if (window.Database) {
      const db = window.Database;
      setReports(db.getProgressReports('student_0') || []);
      setCoursesProgress(db.getEnrolledCourses('student_0') || []);
      setQuizzesTaken(db.getAllQuizzes() || []);
    }
  };

  const handleGenerateReport = () => {
    if (window.Database) {
      const db = window.Database;
      const report = db.saveProgressReport('student_0', {
        coursesCompleted: coursesProgress.filter(c => c.progress === 100).length,
        coursesInProgress: coursesProgress.filter(c => c.progress > 0 && c.progress < 100).length,
        quizzesTaken: quizzesTaken.length,
        averageScore: 85,
        strongestTopic: coursesProgress[0]?.name || 'N/A',
        improvement: 'Good progress this month!'
      });
      showToast('Progress report generated!', 'success');
      setShowGenerate(false);
      loadData();
    }
  };

  const totalProgress = coursesProgress.length > 0 
    ? Math.round(coursesProgress.reduce((sum, c) => sum + (c.progress || 0), 0) / coursesProgress.length)
    : 0;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '8px 12px 80px' : '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700' }}>Progress Report</h1>
        <button onClick={() => setShowGenerate(true)} style={{ padding: '8px 16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
          Generate
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-500)' }}>{totalProgress}%</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Overall Progress</div>
        </div>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success)' }}>{coursesProgress.filter(c => c.progress === 100).length}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Completed</div>
        </div>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning)' }}>{coursesProgress.filter(c => c.progress > 0 && c.progress < 100).length}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>In Progress</div>
        </div>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--accent-blue)' }}>{quizzesTaken.length}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Quizzes Taken</div>
        </div>
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Course Progress</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {coursesProgress.map((course, idx) => (
          <div key={course.id} style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>{course.icon || '📚'}</span>
                <span style={{ fontWeight: '600' }}>{course.name}</span>
              </div>
              <span style={{ fontWeight: '700', color: course.progress === 100 ? 'var(--success)' : 'var(--primary-500)' }}>{course.progress || 0}%</span>
            </div>
            <div style={{ height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${course.progress || 0}%`, background: course.progress === 100 ? 'var(--success)' : 'var(--primary-500)', borderRadius: '4px' }} />
            </div>
          </div>
        ))}
        {coursesProgress.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
            <p>No courses enrolled yet.</p>
          </div>
        )}
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Previous Reports</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {reports.map((report, idx) => (
          <div key={report.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>Progress Report</h4>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{new Date(report.generatedAt).toLocaleDateString()}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div><span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Courses Completed:</span> <strong>{report.coursesCompleted}</strong></div>
              <div><span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>In Progress:</span> <strong>{report.coursesInProgress}</strong></div>
              <div><span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Quizzes:</span> <strong>{report.quizzesTaken}</strong></div>
              <div><span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Average Score:</span> <strong>{report.averageScore}%</strong></div>
            </div>
            <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{report.improvement}</p>
          </div>
        ))}
        {reports.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
            <p>No reports generated yet.</p>
          </div>
        )}
      </div>

      {showGenerate && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '24px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>Generate Progress Report</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>Create a detailed report of your learning progress.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowGenerate(false)} style={{ flex: 1, padding: '12px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
              <button onClick={handleGenerateReport} style={{ flex: 1, padding: '12px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Generate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

window.ProgressReportView = ProgressReportView;
