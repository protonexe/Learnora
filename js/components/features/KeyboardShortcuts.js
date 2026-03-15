const KeyboardShortcuts = ({ isOpen, onClose }) => {
  const shortcuts = [
    { keys: ['Ctrl', 'K'], action: 'Open global search' },
    { keys: ['Ctrl', 'N'], action: 'Open notifications' },
    { keys: ['Ctrl', 'T'], action: 'Open study timer' },
    { keys: ['Ctrl', '\\'], action: 'Toggle sidebar' },
    { keys: ['Esc'], action: 'Close modal/search' },
    { keys: ['1'], action: 'Go to Dashboard' },
    { keys: ['2'], action: 'Go to Courses' },
    { keys: ['3'], action: 'Go to Quizzes' },
    { keys: ['4'], action: 'Go to Flashcards' },
    { keys: ['5'], action: 'Go to Analytics' },
    { keys: ['?'], action: 'Show keyboard shortcuts' },
  ];

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '450px',
        width: '90%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Keyboard Shortcuts</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px', color: 'var(--text-secondary)' }}>✕</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {shortcuts.map((shortcut, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{shortcut.action}</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {shortcut.keys.map((key, keyIdx) => (
                  <React.Fragment key={keyIdx}>
                    <kbd style={{
                      padding: '4px 8px',
                      background: 'var(--bg-tertiary)',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontFamily: 'monospace',
                      fontWeight: '600'
                    }}>{key}</kbd>
                    {keyIdx < shortcut.keys.length - 1 && <span style={{ color: 'var(--text-tertiary)' }}>+</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-tertiary)', textAlign: 'center' }}>
          Press ? anytime to show this help
        </p>
      </div>
    </div>
  );
};

window.KeyboardShortcuts = KeyboardShortcuts;
