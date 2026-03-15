const KeyboardKey = ({ keys = [], size = 'md' }) => {
  const sizes = { sm: '24px', md: '28px', lg: '32px' };
  const fontSizes = { sm: '10px', md: '12px', lg: '14px' };
  
  return (
    <div style={{ display: 'inline-flex', gap: '4px' }}>
      {keys.map((key, idx) => (
        <kbd key={idx} style={{
          padding: '4px 8px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          fontSize: fontSizes[size],
          fontFamily: 'monospace',
          fontWeight: '600',
          boxShadow: '0 2px 0 var(--border-color)'
        }}>
          {key}
        </kbd>
      ))}
    </div>
  );
};

window.KeyboardKey = KeyboardKey;
