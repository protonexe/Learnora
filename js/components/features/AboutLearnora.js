const AboutLearnora = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', justifyContent: 'center' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>ℹ️ About Learnora</h1>
      </div>

      <div style={styles.logoSection}>
        <span style={styles.logo}>📚</span>
        <h2 style={styles.appName}>Learnora</h2>
        <p style={styles.tagline}>Smart Education Platform</p>
      </div>

      <div style={styles.versionCard}>
        <p style={styles.versionText}>Version 1.0.0</p>
        <p style={styles.dateText}>Built with React + Babel</p>
      </div>

      <div style={styles.featureCard}>
        <h3 style={styles.featureTitle}>🎯 Features</h3>
        <ul style={styles.featureList}>
          <li>📚 Course Management</li>
          <li>🍅 Pomodoro Timer</li>
          <li>📝 Study Notes</li>
          <li>🃏 Flashcards</li>
          <li>📊 Analytics</li>
          <li>🎯 Goal Tracking</li>
          <li>🏆 Achievements</li>
          <li>🔥 Streak Tracking</li>
        </ul>
      </div>

      <div style={styles.featureCard}>
        <h3 style={styles.featureTitle}>🚀 Getting Started</h3>
        <p style={styles.helpText}>1. Complete the onboarding to set up your profile</p>
        <p style={styles.helpText}>2. Browse courses and start learning</p>
        <p style={styles.helpText}>3. Use the Pomodoro timer for focused study sessions</p>
        <p style={styles.helpText}>4. Track your progress with analytics</p>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>Made with ❤️ for students</p>
        <p style={styles.copyrightText}>© 2024 Learnora. All rights reserved.</p>
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  logoSection: { marginBottom: '24px' },
  logo: { display: 'block', fontSize: '80px', marginBottom: '16px' },
  appName: { fontSize: '32px', fontWeight: '700', margin: 0, color: 'var(--text-primary)' },
  tagline: { fontSize: '16px', color: 'var(--text-tertiary)', margin: '8px 0 0 0' },
  versionCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  versionText: { fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 },
  dateText: { fontSize: '14px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' },
  featureCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '20px', textAlign: 'left' },
  featureTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)', textAlign: 'center' },
  featureList: { listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' },
  helpText: { fontSize: '14px', color: 'var(--text-secondary)', margin: '8px 0', textAlign: 'left' },
  footer: { marginTop: '32px' },
  footerText: { fontSize: '14px', color: 'var(--text-secondary)', margin: 0 },
  copyrightText: { fontSize: '12px', color: 'var(--text-tertiary)', margin: '8px 0 0 0' }
};

window.AboutLearnora = AboutLearnora;
