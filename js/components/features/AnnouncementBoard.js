const AnnouncementBoard = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [announcements, setAnnouncements] = React.useState(() => JSON.parse(localStorage.getItem('announcements') || '[]'));

  const mockAnnouncements = [
    { id: 1, title: 'New Course Available!', content: 'Introduction to Machine Learning is now live. Enroll today!', author: 'Admin', date: new Date().toISOString(), pinned: true, type: 'news' },
    { id: 2, title: 'Study Group Meeting', content: 'Join us this Friday at 3 PM for a group study session.', author: 'Study Club', date: new Date(Date.now() - 86400000).toISOString(), pinned: false, type: 'event' },
    { id: 3, title: 'Maintenance Notice', content: 'The platform will be down for maintenance on Sunday from 2-4 AM.', author: 'System', date: new Date(Date.now() - 172800000).toISOString(), pinned: false, type: 'system' },
  ];

  const displayAnnouncements = announcements.length > 0 ? announcements : mockAnnouncements;
  const pinned = displayAnnouncements.filter(a => a.pinned);
  const regular = displayAnnouncements.filter(a => !a.pinned);

  const typeColors = { news: '#6366f1', event: '#10b981', system: '#f59e0b', important: '#f43f5e' };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>📢 Announcements</h1>
      </div>

      {pinned.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={styles.sectionTitle}>📌 Pinned</h3>
          {pinned.map(ann => (
            <div key={ann.id} style={{ ...styles.annCard, borderLeftColor: typeColors[ann.type] || '#6366f1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={styles.annTitle}>{ann.title}</h3>
                <span style={styles.pinnedBadge}>📌</span>
              </div>
              <p style={styles.annContent}>{ann.content}</p>
              <div style={styles.annMeta}>
                <span>👤 {ann.author}</span>
                <span>📅 {new Date(ann.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <h3 style={styles.sectionTitle}>Recent</h3>
        {regular.map(ann => (
          <div key={ann.id} style={{ ...styles.annCard, borderLeftColor: typeColors[ann.type] || '#6366f1' }}>
            <h3 style={styles.annTitle}>{ann.title}</h3>
            <p style={styles.annContent}>{ann.content}</p>
            <div style={styles.annMeta}>
              <span>👤 {ann.author}</span>
              <span>📅 {new Date(ann.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  sectionTitle: { fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '12px' },
  annCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '12px', borderLeft: '4px solid' },
  annTitle: { fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0', color: 'var(--text-primary)' },
  annContent: { fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: '1.5' },
  annMeta: { display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-tertiary)' },
  pinnedBadge: { fontSize: '16px' }
};

window.AnnouncementBoard = AnnouncementBoard;
