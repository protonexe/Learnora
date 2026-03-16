const TopicExplorer = ({ onBack, showToast }) => {
  const [subjects] = React.useState({
    'Mathematics': ['Calculus', 'Algebra', 'Geometry', 'Statistics', 'Trigonometry'],
    'Physics': ['Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism', 'Quantum'],
    'Chemistry': ['Organic', 'Inorganic', 'Physical', 'Analytical', 'Biochemistry'],
    'Biology': ['Anatomy', 'Genetics', 'Ecology', 'Physiology', 'Molecular'],
    'History': ['World', 'American', 'European', 'Ancient', 'Modern'],
    'English': ['Literature', 'Grammar', 'Writing', 'Vocabulary', 'Poetry']
  });

  const [selectedSubject, setSelectedSubject] = React.useState(null);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Topic Explorer</h1>
      </header>

      <div style={{ padding: '20px' }}>
        {!selectedSubject ? (
          <>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>Select a subject to explore topics</p>
            <div style={{ display: 'grid', gap: '12px' }}>
              {Object.entries(subjects).map(([subject, topics]) => (
                <div key={subject} onClick={() => setSelectedSubject(subject)} style={{ background: 'white', padding: '20px', borderRadius: '15px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>{subject}</div>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>{topics.length} topics</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <button onClick={() => setSelectedSubject(null)} style={{ marginBottom: '20px', padding: '10px 20px', background: '#f3f4f6', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
              ← Back to Subjects
            </button>
            <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>{selectedSubject}</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {subjects[selectedSubject].map((topic, i) => (
                <div key={i} style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <span style={{ fontWeight: '500', color: '#1f2937' }}>{topic}</span>
                  <button onClick={() => showToast?.(`Started learning ${topic}!`, 'success')} style={{ padding: '8px 16px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '13px' }}>
                    Start
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

window.TopicExplorer = TopicExplorer;
