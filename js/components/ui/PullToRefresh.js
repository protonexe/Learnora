const PullToRefresh = ({ onRefresh, children }) => {
  const [pulling, setPulling] = React.useState(false);
  const [pullDistance, setPullDistance] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const containerRef = React.useRef(null);
  const startY = React.useRef(0);
  const threshold = 80;

  const handleTouchStart = (e) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      setPulling(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!pulling || refreshing) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    
    if (diff > 0 && containerRef.current?.scrollTop === 0) {
      e.preventDefault();
      const distance = Math.min(diff * 0.5, 120);
      setPullDistance(distance);
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !refreshing) {
      setRefreshing(true);
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }
      try {
        await onRefresh();
      } finally {
        setRefreshing(false);
      }
    }
    setPulling(false);
    setPullDistance(0);
  };

  const progress = Math.min(pullDistance / threshold, 1);

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ 
        position: 'relative',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {/* Pull indicator */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: `${pullDistance}px`,
        overflow: 'hidden',
        transition: pulling ? 'none' : 'height 0.3s ease'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--primary-100)',
          borderRadius: '50%',
          transform: `rotate(${progress * 360}deg)`,
          opacity: progress,
          transition: pulling ? 'none' : 'all 0.3s ease'
        }}>
          {refreshing ? (
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid var(--primary-200)',
              borderTopColor: 'var(--primary-500)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
          ) : (
            <Icon 
              name="arrow-down" 
              size={20} 
              color="var(--primary-500)"
              style={{
                transform: progress >= 1 ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{
        transform: `translateY(${pullDistance}px)`,
        transition: pulling ? 'none' : 'transform 0.3s ease'
      }}>
        {children}
      </div>
    </div>
  );
};

window.PullToRefresh = PullToRefresh;
