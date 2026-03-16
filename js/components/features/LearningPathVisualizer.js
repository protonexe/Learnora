const LearningPathVisualizer = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const [path] = React.useState([
    { step: 1, title: 'Basics', desc: 'Learn fundamentals', status: 'completed', xp: 100 },
    { step: 2, title: 'Practice', desc: 'Solve problems', status: 'completed', xp: 150 },
    { step: 3, title: 'Advanced', desc: 'Master concepts', status: 'current', xp: 200 },
    { step: 4, title: 'Expert', desc: 'Real-world apps', status: 'locked', xp: 300 },
    { step: 5, title: 'Mastery', desc: 'Teach others', status: 'locked', xp: 500 },
  ]);

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>🛤️ Learning Path</h1>
      </div>

      <div style={styles.container}>
        {path.map((item, idx) => (
          <div key={item.step} style={{ ...styles.step, opacity: item.status === 'locked' ? 0.5 : 1 }}>
            <div style={{ ...styles.stepMarker, background: item.status === 'completed' ? '#10b981' : item.status === 'current' ? 'var(--primary-500)' : 'var(--bg-primary)', borderColor: item.status === 'current' ? 'var(--primary-500)' : 'var(--border-color)' }}>
              {item.status === 'completed' ? '✓' : item.step}
            </div>
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>{item.title}</h3>
              <p style={styles.stepDesc}>{item.desc}</p>
              <span style={styles.stepXp}>+{item.xp} XP</span>
            </div>
            {idx < path.length - 1 && <div style={{ ...styles.connector, background: item.status === 'completed' ? '#10b981' : 'var(--border-color)' }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  container: { padding: '20px' },
  step: { display: 'flex', gap: '16px', position: 'relative', marginBottom: '24px' },
  stepMarker: { width: '48px', height: '48px', borderRadius: '50%', border: '3px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#fff', flexShrink: 0, zIndex: 1 },
  stepContent: { flex: 1, paddingTop: '12px' },
  stepTitle: { fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  stepDesc: { fontSize: '13px', color: 'var(--text-tertiary)', margin: '4px 0' },
  stepXp: { fontSize: '12px', fontWeight: '600', color: '#f59e0b' },
  connector: { position: 'absolute', width: '3px', height: '24px', left: '22px', top: '48px', zIndex: 0 }
};

window.LearningPathVisualizer = LearningPathVisualizer;
