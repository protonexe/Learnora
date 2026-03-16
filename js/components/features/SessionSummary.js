const SessionSummary = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const [sessions] = React.useState(() => JSON.parse(localStorage.getItem('study-sessions') || '[]'));
  const today = sessions.filter(s => new Date(s.date).toDateString() === new Date().toDateString());
  const totalMin = today.reduce((sum, s) => sum + (s.duration || 0), 0);

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.back}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>📊 Session Summary</h1>
      </div>
      <div style={styles.card}>
        <h2 style={styles.title}>Today</h2>
        <div style={styles.stats}>
          <div><span style={styles.value}>{today.length}</span><span style={styles.label}>Sessions</span></div>
          <div><span style={styles.value}>{totalMin}</span><span style={styles.label}>Minutes</span></div>
        </div>
      </div>
      <h3 style={styles.listTitle}>Recent Sessions</h3>
      {today.length === 0 ? <p style={styles.empty}>No sessions today</p> : today.slice(0,5).map(s => (
        <div key={s.id} style={styles.item}>
          <span>📚 {s.subject || 'Study'}</span>
          <span>{s.duration || 0} min</span>
        </div>
      ))}
    </div>
  );
};

const styles = { back: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', cursor: 'pointer' }, card: { background: 'var(--gradient-primary)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }, title: { color: '#fff', fontSize: '20px', margin: '0 0 20px' }, stats: { display: 'flex', gap: '40px' }, value: { display: 'block', fontSize: '36px', fontWeight: 700, color: '#fff' }, label: { color: 'rgba(255,255,255,0.8)', fontSize: '14px' }, listTitle: { fontSize: '16px', fontWeight: 600, marginBottom: '12px' }, empty: { textAlign: 'center', color: '#888', padding: '40px' }, item: { display: 'flex', justifyContent: 'space-between', padding: '14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '8px' }};

window.SessionSummary = SessionSummary;
