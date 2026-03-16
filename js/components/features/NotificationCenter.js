const NotificationCenter = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [notifications, setNotifications] = React.useState(() => JSON.parse(localStorage.getItem('notifications') || '[]'));
  const [filter, setFilter] = React.useState('all');

  React.useEffect(() => { localStorage.setItem('notifications', JSON.stringify(notifications)); }, [notifications]);

  const markAsRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));
  const deleteNotification = (id) => setNotifications(notifications.filter(n => n.id !== id));
  const clearAll = () => setNotifications([]);

  const filtered = filter === 'all' ? notifications : notifications.filter(n => n.type === filter);
  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (type, title, message) => {
    const newNotif = { id: Date.now(), type, title, message, read: false, createdAt: new Date().toISOString() };
    setNotifications([newNotif, ...notifications]);
  };

  const typeIcons = { achievement: '🏆', reminder: '⏰', assignment: '📝', streak: '🔥', message: '💬', system: '⚙️' };
  const typeColors = { achievement: '#FFD700', reminder: '#f59e0b', assignment: '#6366f1', streak: '#f43f5e', message: '#10b981', system: '#8b5cf6' };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>🔔 Notifications</h1>
          {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={markAllRead} style={styles.actionButton}>Mark all read</button>
          <button onClick={clearAll} style={styles.actionButton}>Clear all</button>
        </div>
      </div>

      <div style={styles.filterTabs}>
        {['all', 'achievement', 'reminder', 'assignment', 'streak', 'message'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ ...styles.filterButton, background: filter === f ? 'var(--primary-500)' : 'var(--bg-secondary)', color: filter === f ? '#fff' : 'var(--text-secondary)' }}>
            {f === 'all' ? 'All' : typeIcons[f]} {f !== 'all' && f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Demo notifications for testing */}
      {notifications.length === 0 && (
        <div style={styles.emptyState}>
          <p>No notifications yet.</p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
            <button onClick={() => addNotification('achievement', 'Badge Unlocked!', 'You earned the "Week Streak" badge!')} style={styles.demoButton}>🎉 Add Achievement</button>
            <button onClick={() => addNotification('reminder', 'Study Reminder', 'Time to start your daily study session!')} style={styles.demoButton}>⏰ Add Reminder</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.map(notif => (
          <div key={notif.id} onClick={() => markAsRead(notif.id)} style={{ ...styles.notifCard, background: notif.read ? 'var(--bg-secondary)' : 'var(--primary-100)', borderLeftColor: typeColors[notif.type] }}>
            <span style={styles.notifIcon}>{typeIcons[notif.type]}</span>
            <div style={{ flex: 1 }}>
              <h3 style={{ ...styles.notifTitle, fontWeight: notif.read ? '500' : '700' }}>{notif.title}</h3>
              <p style={styles.notifMessage}>{notif.message}</p>
              <span style={styles.notifTime}>{new Date(notif.createdAt).toLocaleTimeString()}</span>
            </div>
            <button onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }} style={styles.deleteButton}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  badge: { background: '#f43f5e', color: '#fff', fontSize: '12px', fontWeight: '700', padding: '2px 8px', borderRadius: '10px' },
  actionButton: { padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '12px', cursor: 'pointer' },
  filterTabs: { display: 'flex', gap: '6px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '8px' },
  filterButton: { padding: '8px 12px', borderRadius: 'var(--radius-md)', border: 'none', fontSize: '12px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' },
  emptyState: { textAlign: 'center', padding: '60px', color: 'var(--text-tertiary)' },
  demoButton: { padding: '10px 16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '13px', cursor: 'pointer' },
  notifCard: { display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', borderLeft: '4px solid', cursor: 'pointer' },
  notifIcon: { fontSize: '24px' },
  notifTitle: { fontSize: '15px', margin: '0 0 4px 0', color: 'var(--text-primary)' },
  notifMessage: { fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 4px 0' },
  notifTime: { fontSize: '11px', color: 'var(--text-tertiary)' },
  deleteButton: { background: 'transparent', border: 'none', fontSize: '20px', color: 'var(--text-tertiary)', cursor: 'pointer' }
};

window.NotificationCenter = NotificationCenter;
