const InfiniteLoader = ({ loadMore, hasMore, threshold = 200, loadingRef }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          loadMore().finally(() => setIsLoading(false));
        }
      },
      { rootMargin: `${threshold}px` }
    );

    if (loadingRef?.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore, threshold, loadingRef]);

  return null;
};

const useInfiniteScroll = (callback, options = {}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const loadingRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          setIsLoading(true);
          callback().finally(() => setIsLoading(false));
        }
      },
      { rootMargin: `${options.threshold || 200}px` }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [callback, options.threshold, isLoading]);

  return { loadingRef, isLoading };
};

window.InfiniteLoader = InfiniteLoader;
window.useInfiniteScroll = useInfiniteScroll;
