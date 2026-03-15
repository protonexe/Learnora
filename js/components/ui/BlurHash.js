const BlurHash = ({ hash, width = 300, height = 200, punch = 1 }) => {
  // Simple blur placeholder - in production use blurhash library
  return (
    <div style={{
      width,
      height,
      background: `linear-gradient(135deg, #6366f120 0%, #8b5cf620 100%)`,
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <span style={{ fontSize: '24px', opacity: 0.5 }}>🖼️</span>
    </div>
  );
};

window.BlurHash = BlurHash;
