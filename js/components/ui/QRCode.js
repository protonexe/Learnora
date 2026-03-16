const QRCode = ({ value = '', size = 128 }) => {
  // Simple QR placeholder - in production use qrcode library
  return (
    <div style={{
      width: size,
      height: size,
      background: 'var(--bg-tertiary)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '4px'
    }}>
      <span style={{ fontSize: size / 3 }}>📱</span>
      <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>QR Code</span>
    </div>
  );
};

window.QRCode = QRCode;
