const EventDiscovery = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [events] = React.useState([
    { id: 1, title: 'Math Olympiad', date: 'Mar 20, 2026', type: 'Competition', participants: 150, level: 'All' },
    { id: 2, title: 'Science Fair', date: 'Mar 25, 2026', type: 'Exhibition', participants: 80, level: 'Intermediate' },
    { id: 3, title: 'Study Workshop', date: 'Mar 28, 2026', type: 'Workshop', participants: 30, level: 'Beginner' },
    { id: 4, title: 'Quiz Championship', date: 'Apr 1, 2026', type: 'Competition', participants: 200, level: 'All' },
  ]);

  const register = (id) => {
    showToast?.('Registered for event!', 'success');
  };

  const typeColors = { Competition: '#f43f5e', Exhibition: '#10b981', Workshop: '#6366f1' };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>🎉 Event Discovery</h1>
      </div>

      <div style={styles.categories}>
        {['All', 'Competition', 'Workshop', 'Exhibition'].map(cat => (
          <button key={cat} style={styles.catButton}>{cat}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {events.map(event => (
          <div key={event.id} style={styles.eventCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ ...styles.typeBadge, background: `${typeColors[event.type]}20`, color: typeColors[event.type] }}>{event.type}</span>
                <h3 style={styles.eventTitle}>{event.title}</h3>
                <p style={styles.eventDate}>📅 {event.date}</p>
              </div>
            </div>
            <div style={styles.eventFooter}>
              <span style={styles.participants}>👥 {event.participants} participants</span>
              <span style={styles.level}>📊 {event.level}</span>
              <button onClick={() => register(event.id)} style={styles.registerButton}>Register</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  categories: { display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto' },
  catButton: { padding: '8px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' },
  eventCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px' },
  typeBadge: { display: 'inline-block', fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '4px', marginBottom: '8px' },
  eventTitle: { fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0', color: 'var(--text-primary)' },
  eventDate: { fontSize: '14px', color: 'var(--text-secondary)', margin: 0 },
  eventFooter: { display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' },
  participants: { fontSize: '13px', color: 'var(--text-tertiary)' },
  level: { fontSize: '13px', color: 'var(--text-tertiary)', flex: 1 },
  registerButton: { padding: '10px 20px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }
};

window.EventDiscovery = EventDiscovery;
