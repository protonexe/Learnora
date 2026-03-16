const AchievementCard = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const [achievements] = React.useState(() => JSON.parse(localStorage.getItem('user-badges') || '[]'));

  const allAchievements = [
    { id: 'first', name: 'First Step', desc: 'Complete your first study session', icon: '🌟', requirement: '1 session' },
    { id: 'streak7', name: 'Week Warrior', desc: 'Study for 7 days in a row', icon: '🔥', requirement: '7 day streak' },
    { id: 'streak30', name: 'Monthly Master', desc: 'Study for 30 days in a row', icon: '👑', requirement: '30 day streak' },
    { id: 'hour', name: 'Time Invested', desc: 'Study for 1 hour in total', icon: '⏱️', requirement: '1 hour' },
    { id: 'tenhour', name: 'Dedicated Learner', desc: 'Study for 10 hours total', icon: '📚', requirement: '10 hours' },
    { id: 'night', name: 'Night Owl', desc: 'Study after 10 PM', icon: '🦉', requirement: '1 night session' },
    { id: 'early', name: 'Early Bird', desc: 'Study before 7 AM', icon: '🐦', requirement: '1 early session' },
    { id: 'notes10', name: 'Note Taker', desc: 'Create 10 notes', icon: '📝', requirement: '10 notes' },
    { id: 'quiz', name: 'Quiz Ace', desc: 'Score 100% on a quiz', icon: '🎯', requirement: 'Perfect quiz' },
    { id: 'courses3', name: 'Course Explorer', desc: 'Start 3 different courses', icon: '🎓', requirement: '3 courses' },
  ];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>🏆 Achievements</h1>
        <span style={styles.badge}>{achievements.length}/{allAchievements.length}</span>
      </div>

      <div style={styles.progressCard}>
        <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: `${(achievements.length / allAchievements.length) * 100}%` }} /></div>
        <p style={styles.progressText}>{achievements.length} of {allAchievements.length} achievements unlocked</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '16px' }}>
        {allAchievements.map(ach => {
          const unlocked = achievements.find(a => a.id === ach.id);
          return (
            <div key={ach.id} style={{ ...styles.achCard, opacity: unlocked ? 1 : 0.5 }}>
              <span style={styles.achIcon}>{ach.icon}</span>
              <div style={styles.achInfo}>
                <h3 style={styles.achName}>{ach.name}</h3>
                <p style={styles.achDesc}>{ach.desc}</p>
                <span style={styles.achReq}>{ach.requirement}</span>
              </div>
              {unlocked && <span style={styles.unlockedBadge}>✓</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  badge: { background: 'var(--primary-500)', color: '#fff', fontSize: '12px', fontWeight: '700', padding: '4px 10px', borderRadius: '10px' },
  progressCard: { marginBottom: '24px' },
  progressBar: { height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' },
  progressFill: { height: '100%', background: 'var(--primary-500)', borderRadius: '4px', transition: 'width 0.3s' },
  progressText: { fontSize: '14px', color: 'var(--text-secondary)', margin: 0 },
  achCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', display: 'flex', gap: '16px', position: 'relative', transition: 'opacity 0.3s' },
  achIcon: { fontSize: '40px' },
  achInfo: { flex: 1 },
  achName: { fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  achDesc: { fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0' },
  achReq: { fontSize: '11px', color: 'var(--text-tertiary)' },
  unlockedBadge: { position: 'absolute', top: '12px', right: '12px', background: '#10b981', color: '#fff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }
};

window.AchievementCard = AchievementCard;
