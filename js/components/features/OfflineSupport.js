const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#ef4444',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      boxShadow: '0 10px 40px rgba(239, 68, 68, 0.4)',
      zIndex: 9999,
      animation: 'slideUp 0.3s ease'
    }}>
      <Icon name="wifi-off" size={20} />
      <span style={{ fontWeight: '600' }}>You're offline</span>
      <style>{`
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(100%); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const SyncStatus = ({ lastSynced }) => {
  const [syncing, setSyncing] = React.useState(false);

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Never';
    const diff = Date.now() - timestamp;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return new Date(timestamp).toLocaleTimeString();
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 12px',
      background: 'var(--bg-tertiary)',
      borderRadius: '8px',
      fontSize: '12px',
      color: 'var(--text-secondary)'
    }}>
      <Icon name={syncing ? 'refresh-cw' : 'cloud'} size={14} className={syncing ? 'spin' : ''} />
      <span>{syncing ? 'Syncing...' : `Synced ${formatTime(lastSynced)}`}</span>
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

const AutoSaveIndicator = ({ isSaving, lastSaved }) => {
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const diff = Date.now() - timestamp;
    if (diff < 60000) return 'Saved just now';
    return `Saved ${Math.floor(diff / 60000)}m ago`;
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '12px',
      color: 'var(--text-tertiary)'
    }}>
      {isSaving ? (
        <>
          <div style={{
            width: '8px',
            height: '8px',
            background: '#f59e0b',
            borderRadius: '50%',
            animation: 'pulse 1s infinite'
          }} />
          <span>Saving...</span>
        </>
      ) : lastSaved ? (
        <>
          <Icon name="check-circle" size={12} color="var(--success)" />
          <span>{formatTime(lastSaved)}</span>
        </>
      ) : null}
    </div>
  );
};

window.OfflineIndicator = OfflineIndicator;
window.SyncStatus = SyncStatus;
window.AutoSaveIndicator = AutoSaveIndicator;
