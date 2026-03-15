const PlaceholderImage = ({ width = 300, height = 200, text = '' }) => {
  return (
    <div style={{
      width,
      height,
      background: 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <span style={{ fontSize: '48px' }}>🖼️</span>
      {text && <span style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>{text}</span>}
    </div>
  );
};

window.PlaceholderImage = PlaceholderImage;
