const InstallPrompt = ({ onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = React.useState(null);
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [isIOS, setIsIOS] = React.useState(false);
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    // Check if dismissed recently
    const dismissed = localStorage.getItem('learnora-install-dismissed');
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const daysSince = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) return;
    }

    // iOS detection
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);

    if (isIOSDevice) {
      // Show iOS-specific prompt after delay
      timeoutRef.current = setTimeout(() => setShowPrompt(true), 3000);
    } else {
      // Listen for beforeinstallprompt
      const handler = (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
        timeoutRef.current = setTimeout(() => setShowPrompt(true), 3000);
      };
      window.addEventListener('beforeinstallprompt', handler);
      return () => {
        window.removeEventListener('beforeinstallprompt', handler);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
      }
      setDeferredPrompt(null);
    }
    handleClose();
  };

  const handleClose = () => {
    setShowPrompt(false);
    localStorage.setItem('learnora-install-dismissed', new Date().toISOString());
    if (onClose) onClose();
  };

  if (!showPrompt) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '90px',
      left: '16px',
      right: '16px',
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-xl)',
      padding: '20px',
      boxShadow: 'var(--shadow-xl)',
      border: '1px solid var(--border-color)',
      zIndex: 1001,
      animation: 'slideInUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }}>
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close install prompt"
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'transparent',
          border: '1px solid var(--border-light)',
          cursor: 'pointer',
          padding: '4px'
        }}
      >
        <span aria-hidden="true">✕</span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '56px',
          height: '56px',
          background: 'var(--gradient-primary)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          flexShrink: 0
        }}>
          📚
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            marginBottom: '4px',
            color: 'var(--text-primary)'
          }}>
            Install LEARNORA
          </h3>
          <p style={{ 
            fontSize: '13px', 
            color: 'var(--text-secondary)',
            lineHeight: '1.4'
          }}>
            {isIOS 
              ? 'Tap the share button and "Add to Home Screen"' 
              : 'Add to your home screen for quick access'}
          </p>
        </div>
      </div>

      {!isIOS && (
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button
            type="button"
            onClick={handleClose}
            style={{
              flex: 1,
              padding: '12px',
              background: 'var(--bg-tertiary)',
              border: '2px solid var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Not now
          </button>
          <button
            type="button"
            onClick={handleInstall}
            style={{
              flex: 1,
              padding: '12px',
              background: 'var(--gradient-primary)',
              border: '2px solid var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--bg-primary)',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Install
          </button>
        </div>
      )}

      {isIOS && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '16px',
          padding: '12px',
          background: 'var(--primary-50)',
          borderRadius: 'var(--radius-md)'
        }}>
          <span style={{ fontSize: '18px' }}>📤</span>
          <span style={{ 
            fontSize: '13px', 
            color: 'var(--primary-600)',
            fontWeight: '500'
          }}>
            Then tap "Add to Home Screen"
          </span>
        </div>
      )}
    </div>
  );
};

window.InstallPrompt = InstallPrompt;
