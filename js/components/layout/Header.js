const Header = ({ menuOpen, setMenuOpen, toggleTheme, theme }) => {
  const isMobile = window.innerWidth <= 768;
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    if (window.Database) {
      setNotifications(window.Database.getNotifications() || []);
    }
  };

  const getUnreadCount = () => notifications.filter(n => !n.read).length;

  return (
    <header style={{
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid var(--border-light)',
      padding: isMobile ? '0 12px' : '0 24px',
      height: isMobile ? '56px' : '72px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '16px' }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: menuOpen ? 'var(--primary-100)' : 'var(--bg-tertiary)',
            border: 'none',
            width: isMobile ? '36px' : '44px',
            height: isMobile ? '36px' : '44px',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all var(--transition-fast)'
          }}
        >
          <Icon
            name={menuOpen ? "x" : "menu"}
            size={isMobile ? 16 : 20}
            color={menuOpen ? 'var(--primary-500)' : 'var(--text-secondary)'}
          />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '14px' }}>
          <div style={{
            width: isMobile ? '32px' : '42px',
            height: isMobile ? '32px' : '42px',
            background: 'var(--gradient-primary)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '16px' : '22px',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
          }}>
            &#128218;
          </div>
          <div>
            <h1 style={{
              fontSize: isMobile ? '14px' : '18px',
              fontWeight: '800',
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              LEARNORA
            </h1>
            {!isMobile && (
              <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', margin: 0, fontWeight: '500' }}>
                Smart Learning
              </p>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '12px' }}>
        <button
          onClick={toggleTheme}
          style={{
            background: 'var(--bg-tertiary)',
            border: 'none',
            width: isMobile ? '32px' : '44px',
            height: isMobile ? '32px' : '44px',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all var(--transition-fast)'
          }}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={isMobile ? 14 : 18} color="var(--text-secondary)" />
        </button>

        {/* Hide Protected badge on mobile */}
        {!isMobile && <Badge variant="success" icon="lock">Protected</Badge>}

        <button
          onClick={() => { setShowNotifications(!showNotifications); loadNotifications(); }}
          style={{
            background: 'var(--bg-tertiary)',
            border: 'none',
            width: isMobile ? '32px' : '44px',
            height: isMobile ? '32px' : '44px',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <Icon name="bell" size={isMobile ? 14 : 18} color="var(--text-secondary)" />
          {getUnreadCount() > 0 && (
            <span style={{
              position: 'absolute',
              top: isMobile ? '6px' : '8px',
              right: isMobile ? '6px' : '8px',
              width: isMobile ? '6px' : '8px',
              height: isMobile ? '6px' : '8px',
              background: 'var(--danger)',
              borderRadius: '50%',
              border: '2px solid var(--bg-secondary)'
            }} />
          )}
        </button>

        {showNotifications && (
          <div style={{ position: 'absolute', top: isMobile ? '56px' : '72px', right: '20px', width: '320px', maxHeight: '400px', overflowY: 'auto', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', boxShadow: 'var(--shadow-xl)', zIndex: 200 }}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>Notifications</h3>
              <button onClick={() => { window.Database?.markAllNotificationsRead(); loadNotifications(); }} style={{ background: 'transparent', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', fontSize: '12px' }}>Mark all read</button>
            </div>
            {notifications.length === 0 && (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>No notifications</div>
            )}
            {notifications.slice(0, 10).map((notif, idx) => (
              <div key={notif.id} style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', background: notif.read ? 'transparent' : 'var(--primary-500)10', cursor: 'pointer' }} onClick={() => { window.Database?.markNotificationRead(notif.id); loadNotifications(); }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '20px' }}>{notif.icon || '🔔'}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: '600', margin: '0 0 4px 0' }}>{notif.title}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>{notif.message}</p>
                    <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' }}>{new Date(notif.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Avatar name="John Doe" size={isMobile ? 32 : 44} />
      </div>
    </header>
  );
};

window.Header = Header;