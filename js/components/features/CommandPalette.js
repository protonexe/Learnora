const CommandPalette = ({ isOpen, onClose, actions = [] }) => {
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef(null);

  const filteredActions = actions.filter(action =>
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    setQuery('');
    setSelectedIndex(0);
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredActions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filteredActions[selectedIndex]) {
      filteredActions[selectedIndex].action();
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '15vh',
        zIndex: 3000
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: '16px',
          width: '90%',
          maxWidth: '560px',
          boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <Icon name="search" size={20} color="var(--text-tertiary)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command..."
            style={{
              flex: 1,
              padding: '8px 12px',
              background: 'transparent',
              border: 'none',
              fontSize: '16px',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
          <kbd style={{
            padding: '4px 8px',
            background: 'var(--bg-tertiary)',
            borderRadius: '4px',
            fontSize: '11px',
            color: 'var(--text-tertiary)'
          }}>ESC</kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {filteredActions.length === 0 ? (
            <div style={{
              padding: '40px',
              textAlign: 'center',
              color: 'var(--text-tertiary)'
            }}>
              No commands found
            </div>
          ) : (
            filteredActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => { action.action(); onClose(); }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: idx === selectedIndex ? 'var(--bg-tertiary)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textAlign: 'left'
                }}
              >
                {action.icon && <span style={{ fontSize: '18px' }}>{action.icon}</span>}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{action.label}</div>
                  {action.description && (
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{action.description}</div>
                  )}
                </div>
                {action.shortcut && (
                  <kbd style={{
                    padding: '4px 8px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: 'var(--text-tertiary)'
                  }}>{action.shortcut}</kbd>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const useCommandPalette = (actions) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { isOpen, setIsOpen };
};

window.CommandPalette = CommandPalette;
window.useCommandPalette = useCommandPalette;
