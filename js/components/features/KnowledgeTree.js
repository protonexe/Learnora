const KnowledgeTree = ({ onBack, showToast }) => {
  const [subjects, setSubjects] = React.useState(() => JSON.parse(localStorage.getItem('knowledge-tree')) || [
    { id: 1, name: 'Mathematics', icon: '📐', topics: 12, mastered: 8, color: '#f43f5e' },
    { id: 2, name: 'Physics', icon: '⚛️', topics: 10, mastered: 6, color: '#14b8a6' },
    { id: 3, name: 'Chemistry', icon: '🧪', topics: 8, mastered: 4, color: '#0ea5e9' },
    { id: 4, name: 'Biology', icon: '🧬', topics: 15, mastered: 10, color: '#10b981' },
    { id: 5, name: 'History', icon: '📚', topics: 20, mastered: 15, color: '#8b5cf6' },
    { id: 6, name: 'English', icon: '📝', topics: 18, mastered: 12, color: '#f59e0b' }
  ]);

  const totalTopics = subjects.reduce((a, s) => a + s.topics, 0);
  const totalMastered = subjects.reduce((a, s) => a + s.mastered, 0);
  const overallProgress = Math.round((totalMastered / totalTopics) * 100);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Knowledge Tree</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="overview" style={{ background: 'linear-gradient(135deg, #10b981, #14b8a6)', padding: '25px', borderRadius: '20px', color: 'white', marginBottom: '25px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🌳</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{overallProgress}%</div>
          <div style={{ opacity: 0.9 }}>Overall Mastery</div>
          <div style={{ marginTop: '15px', fontSize: '14px', opacity: 0.8 }}>
            {totalMastered} of {totalTopics} topics mastered
          </div>
        </div>

        <div className="subjects-grid" style={{ display: 'grid', gap: '15px' }}>
          {subjects.map(subject => {
            const progress = Math.round((subject.mastered / subject.topics) * 100);
            return (
              <div key={subject.id} style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: subject.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                    {subject.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '16px' }}>{subject.name}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>{subject.mastered}/{subject.topics} topics</div>
                  </div>
                  <div style={{ fontWeight: 'bold', color: subject.color }}>{progress}%</div>
                </div>
                <div style={{ background: '#f3f4f6', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: subject.color, transition: 'width 0.3s' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

window.KnowledgeTree = KnowledgeTree;
