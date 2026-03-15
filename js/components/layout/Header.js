const Header = ({ menuOpen, setMenuOpen, toggleTheme, theme, onSearchClick }) => {
  const isMobile = window.innerWidth <= 768;
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('all');

  React.useEffect(() => {
    loadNotifications();
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onSearchClick?.();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        setShowNotifications(prev => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSearchClick]);

  const loadNotifications = () => {
    if (window.Database) {
      setNotifications(window.Database.getNotifications() || []);
    }
  };

  const getUnreadCount = () => notifications.filter(n => !n.read).length;
  
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);
    
  const notificationTypes = [
    { id: 'all', label: 'All', icon: '📋' },
    { id: 'achievement', label: 'Achievements', icon: '🏆' },
    { id: 'assignment', label: 'Assignments', icon: '📝' },
    { id: 'course', label: 'Courses', icon: '📚' },
    { id: 'reminder', label: 'Reminders', icon: '🔔' },
  ];

  const getNotificationIcon = (type) => {
    const icons = {
      achievement: '🏆',
      assignment: '📝',
      course: '📚',
      reminder: '🔔',
      quiz: '📋',
      streak: '🔥',
      message: '💬',
      announcement: '📢'
    };
    return icons[type] || '📌';
  };

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
          onClick={onSearchClick}
          title="Search (Ctrl+K)"
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
          <Icon name="search" size={isMobile ? 14 : 18} color="var(--text-secondary)" />
        </button>

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
          <div style={{ position: 'absolute', top: isMobile ? '56px' : '72px', right: '20px', width: isMobile ? '95vw' : '380px', maxHeight: '500px', overflow: 'hidden', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', boxShadow: 'var(--shadow-xl)', zIndex: 200, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>Notifications</h3>
                <button onClick={() => { window.Database?.markAllNotificationsRead(); loadNotifications(); }} style={{ background: 'transparent', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Mark all read</button>
              </div>
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
                {notificationTypes.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: '6px 12px',
                      background: activeTab === tab.id ? 'var(--primary-500)' : 'var(--bg-tertiary)',
                      border: 'none',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: '600',
                      color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', maxHeight: '350px' }}>
              {filteredNotifications.length === 0 && (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>🔔</span>
                  <p style={{ margin: 0, fontSize: '14px' }}>No notifications</p>
                </div>
              )}
              {filteredNotifications.slice(0, 15).map((notif, idx) => (
                <div 
                  key={notif.id || idx} 
                  style={{ 
                    padding: '14px 16px', 
                    borderBottom: '1px solid var(--border-color)', 
                    background: notif.read ? 'transparent' : 'var(--primary-500)08', 
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }} 
                  onClick={() => { window.Database?.markNotificationRead(notif.id); loadNotifications(); }}
                >
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '22px' }}>{notif.icon || getNotificationIcon(notif.type)}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '13px', fontWeight: '600', margin: '0 0 4px 0', color: 'var(--text-primary)' }}>{notif.title}</p>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>{notif.message}</p>
                      <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', margin: '6px 0 0 0' }}>{new Date(notif.createdAt || Date.now()).toLocaleString()}</p>
                    </div>
                    {!notif.read && (
                      <div style={{ width: '8px', height: '8px', background: 'var(--primary-500)', borderRadius: '50%', flexShrink: 0, marginTop: '4px' }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Avatar name="John Doe" size={isMobile ? 32 : 44} />
      </div>
    </header>
  );
};

window.Header = Header;