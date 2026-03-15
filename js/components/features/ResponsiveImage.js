const ResponsiveImage = ({ 
  src, 
  alt = '', 
  sources = [],
  placeholder = 'Loading...',
  fallback = '🖼️'
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [currentSrc, setCurrentSrc] = React.useState(src);

  React.useEffect(() => {
    // Try to load responsive source based on viewport
    const updateSource = () => {
      const width = window.innerWidth;
      const sortedSources = [...sources].sort((a, b) => b.width - a.width);
      const bestSource = sortedSources.find(s => s.width <= width);
      
      if (bestSource) {
        setCurrentSrc(bestSource.src);
      } else {
        setCurrentSrc(src);
      }
    };

    updateSource();
    window.addEventListener('resize', updateSource);
    return () => window.removeEventListener('resize', updateSource);
  }, [src, sources]);

  return (
    <div style={{ position: 'relative', background: 'var(--bg-tertiary)', borderRadius: '8px', overflow: 'hidden' }}>
      {!loaded && !error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100px',
          color: 'var(--text-tertiary)',
          fontSize: '14px'
        }}>
          {placeholder}
        </div>
      )}
      
      {error ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100px',
          fontSize: '48px'
        }}>
          {fallback}
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: '100%',
            height: 'auto',
            display: loaded ? 'block' : 'none'
          }}
        />
      )}
    </div>
  );
};

window.ResponsiveImage = ResponsiveImage;
