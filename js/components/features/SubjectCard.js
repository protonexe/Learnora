const SubjectCard = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const subjects = [
    { name: 'Mathematics', icon: '📐', color: '#f43f5e', progress: 75 },
    { name: 'Physics', icon: '⚛️', color: '#14b8a6', progress: 60 },
    { name: 'Chemistry', icon: '🧪', color: '#0ea5e9', progress: 45 },
    { name: 'Biology', icon: '🧬', color: '#10b981', progress: 80 },
    { name: 'History', icon: '📚', color: '#8b5cf6', progress: 55 },
    { name: 'English', icon: '📝', color: '#f59e0b', progress: 70 },
  ];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.back}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>📚 Subjects</h1>
      </div>
      <div style={styles.grid}>
        {subjects.map(s => (
          <div key={s.name} style={styles.card}>
            <span style={{ ...styles.icon, background: s.color + '20' }}>{s.icon}</span>
            <h3 style={styles.name}>{s.name}</h3>
            <div style={styles.progress}><div style={{ ...styles.bar, width: s.progress + '%', background: s.color }} /></div>
            <span style={styles.percent}>{s.progress}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = { back: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', cursor: 'pointer' }, grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }, card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }, icon: { display: 'inline-block', padding: '12px', borderRadius: '12px', fontSize: '28px', marginBottom: '12px' }, name: { fontSize: '16px', fontWeight: 600, margin: '0 0 12px' }, progress: { height: '6px', background: 'var(--bg-primary)', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }, bar: { height: '100%', borderRadius: '3px' }, percent: { fontSize: '12px', color: '#888' }};

window.SubjectCard = SubjectCard;
