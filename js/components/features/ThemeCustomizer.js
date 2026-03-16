const ThemeCustomizer = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [theme, setTheme] = React.useState(localStorage.getItem('learnora-theme') || 'light');

  const setThemeMode = (mode) => {
    setTheme(mode);
    localStorage.setItem('learnora-theme', mode);
    document.documentElement.setAttribute('data-theme', mode);
    showToast?.(`Theme set to ${mode}!`, 'success');
  };

  const themes = [
    { id: 'light', name: 'Light', icon: '☀️', preview: '#ffffff' },
    { id: 'dark', name: 'Dark', icon: '🌙', preview: '#1a1a2e' },
    { id: 'blue', name: 'Ocean', icon: '🌊', preview: '#0ea5e9' },
    { id: 'green', name: 'Forest', icon: '🌲', preview: '#10b981' },
    { id: 'purple', name: 'Lavender', icon: '💜', preview: '#8b5cf6' },
    { id: 'rose', name: 'Rose', icon: '🌹', preview: '#f43f5e' },
  ];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>🎨 Theme</h1>
      </div>

      <div style={styles.card}>
        <h3 style={styles.title}>Choose Theme</h3>
        <div style={styles.grid}>
          {themes.map(t => (
            <button key={t.id} onClick={() => setThemeMode(t.id)} style={{ ...styles.themeBtn, borderColor: theme === t.id ? 'var(--primary-500)' : 'var(--border-color)' }}>
              <span style={{ ...styles.preview, background: t.preview }}>{t.icon}</span>
              <span style={styles.themeName}>{t.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '20px' },
  title: { fontSize: '18px', fontWeight: '600', margin: '0 0 20px 0', color: 'var(--text-primary)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' },
  themeBtn: { padding: '16px', background: 'var(--bg-primary)', border: '2px solid', borderRadius: 'var(--radius-lg)', cursor: 'pointer', textAlign: 'center' },
  preview: { display: 'block', width: '48px', height: '48px', borderRadius: '50%', margin: '0 auto 8px', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  themeName: { fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }
};

window.ThemeCustomizer = ThemeCustomizer;
