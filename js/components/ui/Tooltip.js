const Tooltip = ({ content, children, position = 'top', delay = 300 }) => {
  const [show, setShow] = React.useState(false);
  const timeoutRef = React.useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setShow(true), delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setShow(false);
  };

  const positions = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '8px' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '8px' },
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {show && (
        <div style={{
          position: 'absolute',
          ...positions[position],
          background: 'var(--text-primary)',
          color: 'var(--bg-primary)',
          padding: '6px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 1000,
          animation: 'tooltipIn 0.15s ease'
        }}>
          {content}
        </div>
      )}
      <style>{`
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
};

const Popover = ({ isOpen, onClose, trigger, children, position = 'bottom' }) => {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  const positions = {
    bottom: { top: '100%', left: 0, marginTop: '8px' },
    top: { bottom: '100%', left: 0, marginBottom: '8px' },
    right: { left: '100%', top: 0, marginLeft: '8px' },
    left: { right: '100%', top: 0, marginRight: '8px' },
  };

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={() => onClose(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div style={{
          position: 'absolute',
          ...positions[position],
          minWidth: '200px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          zIndex: 100,
          padding: '8px',
          animation: 'popoverIn 0.15s ease'
        }}>
          {children}
        </div>
      )}
      <style>{`
        @keyframes popoverIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

window.Tooltip = Tooltip;
window.Popover = Popover;
