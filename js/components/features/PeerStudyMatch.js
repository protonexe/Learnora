const PeerStudyMatch = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [matches] = React.useState([
    { id: 1, name: 'Emma Wilson', avatar: '👩‍🎓', subjects: ['Math', 'Physics'], level: 'Intermediate', compatibility: 92 },
    { id: 2, name: 'James Lee', avatar: '👨‍🎓', subjects: ['Chemistry', 'Biology'], level: 'Advanced', compatibility: 88 },
    { id: 3, name: 'Lisa Brown', avatar: '👩‍🎓', subjects: ['History', 'English'], level: 'Beginner', compatibility: 85 },
    { id: 4, name: 'David Park', avatar: '👨‍🎓', subjects: ['Computer Science'], level: 'Advanced', compatibility: 79 },
  ]);

  const requestMatch = (id) => {
    showToast?.('Match request sent!', 'success');
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>🤝 Study Match</h1>
      </div>

      <div style={styles.banner}>
        <span style={styles.bannerIcon}>🎯</span>
        <div>
          <h3 style={styles.bannerTitle}>Find Your Study Partner</h3>
          <p style={styles.bannerText}>Get matched with students studying similar subjects</p>
        </div>
      </div>

      <h3 style={styles.sectionTitle}>Recommended Matches</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {matches.map(match => (
          <div key={match.id} style={styles.matchCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
              <span style={styles.avatar}>{match.avatar}</span>
              <div>
                <h3 style={styles.matchName}>{match.name}</h3>
                <p style={styles.matchSubjects}>{match.subjects.join(', ')}</p>
                <span style={styles.levelBadge}>{match.level}</span>
              </div>
            </div>
            <div style={styles.matchRight}>
              <div style={styles.compatScore}>
                <span style={styles.compatValue}>{match.compatibility}%</span>
                <span style={styles.compatLabel}>Match</span>
              </div>
              <button onClick={() => requestMatch(match.id)} style={styles.connectBtn}>Connect</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  banner: { display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--gradient-primary)', borderRadius: 'var(--radius-xl)', padding: '24px', marginBottom: '24px' },
  bannerIcon: { fontSize: '48px' },
  bannerTitle: { fontSize: '18px', fontWeight: '600', color: '#fff', margin: '0 0 4px 0' },
  bannerText: { fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: 0 },
  sectionTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-secondary)' },
  matchCard: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px' },
  avatar: { fontSize: '48px' },
  matchName: { fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  matchSubjects: { fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0' },
  levelBadge: { fontSize: '11px', padding: '2px 8px', background: 'var(--primary-100)', color: 'var(--primary-600)', borderRadius: '4px' },
  matchRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  compatScore: { textAlign: 'center' },
  compatValue: { display: 'block', fontSize: '24px', fontWeight: '700', color: '#10b981' },
  compatLabel: { fontSize: '11px', color: 'var(--text-tertiary)' },
  connectButton: { padding: '10px 20px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }
};

window.PeerStudyMatch = PeerStudyMatch;
