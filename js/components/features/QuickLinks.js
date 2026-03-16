const QuickLinks = ({ onBack }) => {
  const links = [
    { name: 'Dashboard', view: 'dashboard', icon: '🏠' },
    { name: 'Courses', view: 'courses', icon: '📚' },
    { name: 'Quizzes', view: 'quizzes', icon: '📝' },
    { name: 'Flashcards', view: 'flashcards', icon: '🃏' },
    { name: 'Analytics', view: 'analytics', icon: '📊' },
    { name: 'Settings', view: 'settings', icon: '⚙️' }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Quick Links</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {links.map((l, i) => (
            <div key={i} style={{ background: 'white', padding: '25px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>{l.icon}</div>
              <div style={{ fontWeight: '600', color: '#1f2937' }}>{l.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.QuickLinks = QuickLinks;
