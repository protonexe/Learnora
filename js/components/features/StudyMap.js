const StudyMap = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const [currentLevel, setCurrentLevel] = React.useState(5);
  const [xp, setXp] = React.useState(2450);
  const nextLevelXp = 3000;

  const levels = [
    { level: 1, title: 'Beginner', icon: '🌱', required: 0 },
    { level: 2, title: 'Learner', icon: '📖', required: 500 },
    { level: 3, title: 'Student', icon: '🎓', required: 1000 },
    { level: 4, title: 'Scholar', icon: '📚', required: 2000 },
    { level: 5, title: 'Expert', icon: '⭐', required: 3000 },
    { level: 6, title: 'Master', icon: '👑', required: 5000 },
  ];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>🗺️ Study Map</h1>
      </div>

      <div style={styles.currentCard}>
        <span style={styles.levelIcon}>{levels[currentLevel - 1]?.icon}</span>
        <div style={styles.currentInfo}>
          <h2 style={styles.currentTitle}>Level {currentLevel}</h2>
          <p style={styles.currentName}>{levels[currentLevel - 1]?.title}</p>
        </div>
        <div style={styles.xpInfo}>
          <span style={styles.xpValue}>{xp}</span>
          <span style={styles.xpLabel}>XP</span>
        </div>
      </div>

      <div style={styles.progressCard}>
        <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: `${(xp / nextLevelXp) * 100}%` }} /></div>
        <p style={styles.progressText}>{nextLevelXp - xp} XP to next level</p>
      </div>

      <h3 style={styles.sectionTitle}>Your Journey</h3>
      <div style={styles.mapContainer}>
        {levels.map((lvl, idx) => (
          <div key={lvl.level} style={{ ...styles.mapNode, opacity: lvl.level <= currentLevel ? 1 : 0.3 }}>
            <div style={{ ...styles.nodeCircle, background: lvl.level < currentLevel ? '#10b981' : lvl.level === currentLevel ? 'var(--primary-500)' : 'var(--bg-primary)', borderColor: lvl.level === currentLevel ? 'var(--primary-500)' : 'var(--border-color)' }}>
              <span style={styles.nodeIcon}>{lvl.icon}</span>
            </div>
            <span style={styles.nodeLabel}>{lvl.title}</span>
            {lvl.level < levels.length && <div style={{ ...styles.connector, background: lvl.level < currentLevel ? '#10b981' : 'var(--border-color)' }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  currentCard: { display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--gradient-primary)', borderRadius: 'var(--radius-xl)', padding: '24px', marginBottom: '20px' },
  levelIcon: { fontSize: '48px' },
  currentInfo: { flex: 1 },
  currentTitle: { fontSize: '24px', fontWeight: '700', color: '#fff', margin: 0 },
  currentName: { fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: '4px 0 0 0' },
  xpInfo: { textAlign: 'center' },
  xpValue: { display: 'block', fontSize: '28px', fontWeight: '700', color: '#fff' },
  xpLabel: { fontSize: '12px', color: 'rgba(255,255,255,0.7)' },
  progressCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '24px' },
  progressBar: { height: '12px', background: 'var(--bg-primary)', borderRadius: '6px', overflow: 'hidden', marginBottom: '8px' },
  progressFill: { height: '100%', background: '#10b981', borderRadius: '6px', transition: 'width 0.3s' },
  progressText: { fontSize: '14px', color: 'var(--text-secondary)', margin: 0, textAlign: 'center' },
  sectionTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: 'var(--text-secondary)' },
  mapContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' },
  mapNode: { display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', transition: 'opacity 0.3s' },
  nodeCircle: { width: '64px', height: '64px', borderRadius: '50%', border: '3px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' },
  nodeIcon: { fontSize: '28px' },
  nodeLabel: { fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' },
  connector: { position: 'absolute', width: '3px', height: '24px', top: '64px', zIndex: -1 }
};

window.StudyMap = StudyMap;
