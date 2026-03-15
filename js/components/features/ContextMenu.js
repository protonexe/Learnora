const ContextMenu = ({ x, y, items, onClose }) => {
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!x || !y) return null;

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        left: x,
        top: y,
        minWidth: '180px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        zIndex: 2000,
        padding: '4px',
        animation: 'contextMenuIn 0.15s ease'
      }}
    >
      <style>{`
        @keyframes contextMenuIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      {items.map((item, idx) => {
        if (item.divider) {
          return <div key={idx} style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }} />;
        }
        return (
          <button
            key={idx}
            onClick={() => { item.onClick?.(); onClose(); }}
            disabled={item.disabled}
            style={{
              width: '100%',
              padding: '10px 14px',
              background: 'transparent',
              border: 'none',
              cursor: item.disabled ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              color: item.danger ? 'var(--danger)' : item.disabled ? 'var(--text-tertiary)' : 'var(--text-primary)',
              textAlign: 'left',
              borderRadius: '8px',
              opacity: item.disabled ? 0.5 : 1
            }}
          >
            {item.icon && <span style={{ fontSize: '16px' }}>{item.icon}</span>}
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

const useContextMenu = () => {
  const [contextMenu, setContextMenu] = React.useState({ show: false, x: 0, y: 0, items: [] });

  const showContextMenu = (e, items) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      items
    });
  };

  const hideContextMenu = () => {
    setContextMenu({ ...contextMenu, show: false });
  };

  return { contextMenu, showContextMenu, hideContextMenu };
};

window.ContextMenu = ContextMenu;
window.useContextMenu = useContextMenu;
