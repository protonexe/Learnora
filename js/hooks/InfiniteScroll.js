const InfiniteScroll = ({ 
  children, 
  loadMore, 
  hasMore = true, 
  loading = false,
  threshold = 200,
  loader 
}) => {
  const observerRef = React.useRef(null);
  const loadMoreRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore?.();
        }
      },
      { rootMargin: `${threshold}px` }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    observerRef.current = observer;

    return () => observer.disconnect();
  }, [loadMore, hasMore, loading, threshold]);

  return (
    <div>
      {children}
      <div ref={loadMoreRef} style={{ padding: '20px', textAlign: 'center' }}>
        {loading && (loader || (
          <div style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>
            Loading more...
          </div>
        ))}
        {!hasMore && (
          <div style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>
            No more items
          </div>
        )}
      </div>
    </div>
  );
};

const LazyLoad = ({ children, placeholder, height = '200px' }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: height }}>
      {isVisible ? (
        loaded ? children : (
          <div onLoad={() => setLoaded(true)}>
            {children}
          </div>
        )
      ) : (
        placeholder || (
          <div style={{
            height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-tertiary)',
            borderRadius: '12px',
            color: 'var(--text-tertiary)'
          }}>
            Loading...
          </div>
        )
      )}
    </div>
  );
};

window.InfiniteScroll = InfiniteScroll;
window.LazyLoad = LazyLoad;
