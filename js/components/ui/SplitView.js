const SplitView = ({ left, right, defaultRatio = 50 }) => {
  const [ratio, setRatio] = React.useState(defaultRatio);
  const containerRef = React.useRef(null);
  const isDragging = React.useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const newRatio = ((e.clientX - rect.left) / rect.width) * 100;
    setRatio(Math.min(Math.max(newRatio, 20), 80));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ display: 'flex', height: '100%' }}>
      <div style={{ width: `${ratio}%`, overflow: 'auto' }}>{left}</div>
      
      <div
        onMouseDown={handleMouseDown}
        style={{
          width: '8px',
          background: 'var(--border-color)',
          cursor: 'col-resize',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s'
        }}
      >
        <div style={{
          width: '4px',
          height: '40px',
          background: 'var(--text-tertiary)',
          borderRadius: '2px'
        }} />
      </div>
      
      <div style={{ width: `${100 - ratio}%`, overflow: 'auto' }}>{right}</div>
    </div>
  );
};

const ResizablePanel = ({ children, minSize = 200, maxSize = 800 }) => {
  const [size, setSize] = React.useState(400);
  const isDragging = React.useRef(false);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ width: size, overflow: 'auto' }}>{children}</div>
      
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '8px',
          cursor: 'ew-resize',
          background: 'var(--border-color)'
        }}
      />
    </div>
  );
};

window.SplitView = SplitView;
window.ResizablePanel = ResizablePanel;
