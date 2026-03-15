const Sidebar = ({ isOpen, onClose, currentView, onNavigate, onOpenAIChat, userRole }) => {
  const isMobile = window.innerWidth <= 768;

  if (!isOpen) return null;

  const teacherItems = [
    { icon: 'book', label: 'Grade Book', view: 'gradebook' },
    { icon: 'users', label: 'Classes', view: 'class-management' },
    { icon: 'calendar', label: 'Exams', view: 'exam-schedule' },
    { icon: 'check-circle', label: 'Attendance', view: 'attendance' },
    { icon: 'clipboard', label: 'Announcements', view: 'announcements' },
    { icon: 'message-circle', label: 'Messages', view: 'messages' },
  ];

  const navItems = userRole === 'teacher' 
    ? SampleData.navItems.filter(item => item.view !== 'messages' && item.view !== 'profile').concat(teacherItems)
    : SampleData.navItems;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: isMobile ? '56px' : '72px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--overlay-bg)',
          backdropFilter: 'blur(4px)',
          zIndex: 98,
          animation: 'fadeIn 0.2s ease'
        }}
      />

      {/* Sidebar */}
      <nav style={{
        position: 'fixed',
        top: isMobile ? '56px' : '72px',
        left: 0,
        width: isMobile ? '260px' : '280px',
        height: isMobile ? 'calc(100vh - 56px)' : 'calc(100vh - 72px)',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-xl)',
        zIndex: 99,
        padding: isMobile ? '16px 12px' : '24px 16px',
        overflowY: 'auto',
        animation: 'slideInLeft 0.3s ease'
      }}>
        <p style={{
          fontSize: '11px',
          fontWeight: '700',
          color: 'var(--text-tertiary)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '12px',
          paddingLeft: '12px'
        }}>
          Navigation
        </p>

        {navItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              onNavigate(item.view);
              onClose();
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '12px' : '14px',
              padding: isMobile ? '12px 14px' : '14px 16px',
              background: currentView === item.view ? 'var(--primary-100)' : 'transparent',
              color: currentView === item.view ? 'var(--primary-600)' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: isMobile ? '13px' : '14px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '4px',
              transition: 'all var(--transition-fast)',
              fontFamily: 'inherit',
              textAlign: 'left'
            }}
          >
            <Icon name={item.icon} size={isMobile ? 18 : 20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
};

window.Sidebar = Sidebar;