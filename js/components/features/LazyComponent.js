const LazyComponent = ({ children, placeholder }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '100px' });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? children : (placeholder || <div style={{ height: '200px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>Loading...</div>)}
    </div>
  );
};

window.LazyComponent = LazyComponent;
