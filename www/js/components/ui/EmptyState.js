const EmptyState = ({ icon, title, description, action, actionLabel }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center'
    }}>
      {icon && (
        <div style={{
          fontSize: '48px',
          marginBottom: '16px',
          opacity: 0.8
        }}>
          {icon}
        </div>
      )}
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: 'var(--text-primary)',
        margin: '0 0 8px 0'
      }}>
        {title}
      </h3>
      {description && (
        <p style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          margin: '0 0 24px 0',
          maxWidth: '300px'
        }}>
          {description}
        </p>
      )}
      {action && actionLabel && (
        <button
          onClick={action}
          style={{
            padding: '12px 24px',
            background: 'var(--primary-500)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

window.EmptyState = EmptyState;
