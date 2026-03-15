const ColorTheme = ({ onSelect, currentTheme }) => {
  const themes = [
    { id: 'light', name: 'Light', bg: '#ffffff', text: '#1a1a2e' },
    { id: 'dark', name: 'Dark', bg: '#1a1a2e', text: '#ffffff' },
    { id: 'blue', name: 'Ocean', bg: '#0f172a', text: '#e0f2fe' },
    { id: 'green', name: 'Forest', bg: '#052e16', text: '#dcfce7' },
    { id: 'purple', name: 'Violet', bg: '#2e1065', text: '#f3e8ff' },
    { id: 'rose', name: 'Rose', bg: '#2f1a1d', text: '#ffe4e6' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
      {themes.map(theme => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme.id)}
          style={{
            padding: '12px',
            background: theme.bg,
            border: currentTheme === theme.id ? '3px solid var(--primary-500)' : '1px solid var(--border-color)',
            borderRadius: '12px',
            cursor: 'pointer',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎨</div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: theme.text }}>{theme.name}</div>
        </button>
      ))}
    </div>
  );
};

window.ColorTheme = ColorTheme;
