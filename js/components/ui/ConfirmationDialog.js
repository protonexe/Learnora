const ConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'default'
}) => {
  if (!isOpen) return null;

  const typeStyles = {
    default: { color: 'var(--primary-500)', icon: '❓' },
    danger: { color: 'var(--danger)', icon: '⚠️' },
    warning: { color: '#f59e0b', icon: '⚡' },
    success: { color: 'var(--success)', icon: '✅' }
  };

  const style = typeStyles[type] || typeStyles.default;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: '20px',
          padding: '24px',
          width: '90%',
          maxWidth: '400px',
          boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
          textAlign: 'center'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{style.icon}</div>
        <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 12px 0' }}>{title}</h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 24px 0' }}>{message}</p>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '14px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={() => { onConfirm?.(); onClose(); }}
            style={{
              flex: 1,
              padding: '14px',
              background: style.color,
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              color: '#fff'
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const useConfirm = () => {
  const [dialog, setDialog] = React.useState({ isOpen: false, ...{} });

  const confirm = (options) => {
    return new Promise((resolve) => {
      setDialog({
        isOpen: true,
        ...options,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      });
    });
  };

  return { confirm, dialog };
};

window.ConfirmationDialog = ConfirmationDialog;
window.useConfirm = useConfirm;
