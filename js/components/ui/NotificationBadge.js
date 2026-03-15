const NotificationBadge = ({ count, max = 9, showZero = false, children, ...props }) => {
  const displayCount = count > max ? `${max}+` : count;
  const isZero = count === 0;

  if (!showZero && isZero) {
    return children || null;
  }

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }} {...props}>
      {children}
      {count > 0 && (
        <span style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          minWidth: '18px',
          height: '18px',
          padding: '0 5px',
          background: count > 0 ? 'var(--danger)' : 'var(--bg-tertiary)',
          color: '#fff',
          fontSize: '10px',
          fontWeight: '700',
          borderRadius: '9px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid var(--bg-secondary)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          {displayCount}
        </span>
      )}
    </div>
  );
};

const MessageBadge = ({ unread = 0, position = 'bottom-right' }) => {
  const positionStyles = {
    'bottom-right': { bottom: '-2px', right: '-2px' },
    'top-right': { top: '-2px', right: '-2px' },
    'top-left': { top: '-2px', left: '-2px' },
    'bottom-left': { bottom: '-2px', left: '-2px' },
  };

  if (unread === 0) return null;

  return (
    <span style={{
      position: 'absolute',
      ...positionStyles[position],
      minWidth: '16px',
      height: '16px',
      padding: '0 4px',
      background: 'var(--danger)',
      color: '#fff',
      fontSize: '9px',
      fontWeight: '700',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid var(--bg-secondary)',
    }}>
      {unread > 9 ? '9+' : unread}
    </span>
  );
};

const OnlineStatus = ({ isOnline = true, size = 'md' }) => {
  const sizes = { sm: '8px', md: '10px', lg: '14px' };
  const dotSize = sizes[size] || sizes.md;

  return (
    <div style={{
      width: dotSize,
      height: dotSize,
      borderRadius: '50%',
      background: isOnline ? 'var(--success)' : 'var(--text-tertiary)',
      border: '2px solid var(--bg-secondary)',
      boxShadow: isOnline ? '0 0 0 2px var(--success)30' : 'none'
    }} />
  );
};

const StatusIndicator = ({ status = 'offline', label }) => {
  const statusConfig = {
    online: { color: 'var(--success)', bg: 'var(--success)15', icon: '🟢' },
    offline: { color: 'var(--text-tertiary)', bg: 'var(--bg-tertiary)', icon: '⚫' },
    busy: { color: 'var(--danger)', bg: 'var(--danger)15', icon: '🔴' },
    away: { color: '#f59e0b', bg: '#f59e0b15', icon: '🟡' },
  };

  const config = statusConfig[status] || statusConfig.offline;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 10px',
      background: config.bg,
      color: config.color,
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500'
    }}>
      <span style={{ fontSize: '10px' }}>{config.icon}</span>
      {label || status}
    </span>
  );
};

window.NotificationBadge = NotificationBadge;
window.MessageBadge = MessageBadge;
window.OnlineStatus = OnlineStatus;
window.StatusIndicator = StatusIndicator;
