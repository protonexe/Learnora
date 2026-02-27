const StickyHeader = ({ children, offset = 72 }) => {
  const [isSticky, setIsSticky] = React.useState(false);
  const headerRef = React.useRef(null);
  const placeholderRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (placeholderRef.current) {
        const rect = placeholderRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= offset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return (
    <>
      <div ref={placeholderRef} style={{ height: isSticky ? '52px' : '0' }} />
      <div
        ref={headerRef}
        style={{
          position: isSticky ? 'fixed' : 'relative',
          top: isSticky ? `${offset}px` : 'auto',
          left: isSticky ? '0' : 'auto',
          right: isSticky ? '0' : 'auto',
          background: isSticky ? 'var(--glass-bg)' : 'transparent',
          backdropFilter: isSticky ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isSticky ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: isSticky ? '1px solid var(--border-light)' : 'none',
          padding: isSticky ? '12px 24px' : '0',
          zIndex: isSticky ? 50 : 'auto',
          transition: 'all var(--transition-fast)',
          boxShadow: isSticky ? 'var(--shadow-sm)' : 'none'
        }}
      >
        {children}
      </div>
    </>
  );
};

window.StickyHeader = StickyHeader;
