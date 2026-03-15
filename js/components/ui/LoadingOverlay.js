const LoadingOverlay = ({ isLoading, message = 'Loading...' }) => {
  if (!isLoading) return null;
  
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: '16px',
        padding: '32px 48px',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid var(--bg-tertiary)',
          borderTopColor: 'var(--primary-500)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }} />
        <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>{message}</p>
      </div>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

window.LoadingOverlay = LoadingOverlay;
