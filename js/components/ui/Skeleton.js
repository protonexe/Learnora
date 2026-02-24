const Skeleton = ({ width, height, variant = 'rectangle', className = '' }) => {
  const getStyles = () => {
    const baseStyles = {
      background: 'linear-gradient(90deg, var(--bg-tertiary) 25%, var(--border-color) 50%, var(--bg-tertiary) 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite linear',
      borderRadius: variant === 'circle' ? '50%' : 'var(--radius-md)'
    };

    if (variant === 'text') {
      return { ...baseStyles, height: height || '16px', width: width || '100%', borderRadius: 'var(--radius-xs)' };
    }
    if (variant === 'circle') {
      return { ...baseStyles, width: width || '48px', height: height || '48px' };
    }
    if (variant === 'card') {
      return { ...baseStyles, width: width || '100%', height: height || '200px', borderRadius: 'var(--radius-lg)' };
    }
    return { ...baseStyles, width: width || '100%', height: height || '48px' };
  };

  return <div className={`skeleton ${className}`} style={getStyles()} />;
};

const SkeletonCard = () => (
  <div style={{
    background: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-xl)',
    padding: '24px',
    border: '1px solid var(--border-color)'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      <Skeleton variant="circle" width="60px" height="60px" />
      <Skeleton variant="text" width="40px" height="20px" />
    </div>
    <Skeleton variant="text" width="70%" height="20px" />
    <div style={{ marginTop: '8px' }}>
      <Skeleton variant="text" width="50%" height="14px" />
    </div>
    <div style={{ marginTop: '20px' }}>
      <Skeleton variant="rectangle" width="100%" height="8px" />
    </div>
  </div>
);

const SkeletonStats = () => (
  <div style={{
    background: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-xl)',
    padding: '24px',
    border: '1px solid var(--border-color)'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Skeleton variant="circle" width="56px" height="56px" />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" width="60%" height="24px" />
        <div style={{ marginTop: '8px' }}>
          <Skeleton variant="text" width="40%" height="14px" />
        </div>
      </div>
    </div>
  </div>
);

const SkeletonList = ({ count = 3 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        border: '1px solid var(--border-color)'
      }}>
        <Skeleton variant="circle" width="48px" height="48px" />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height="16px" />
          <div style={{ marginTop: '6px' }}>
            <Skeleton variant="text" width="40%" height="12px" />
          </div>
        </div>
        <Skeleton variant="rectangle" width="24px" height="24px" />
      </div>
    ))}
  </div>
);

window.Skeleton = Skeleton;
window.SkeletonCard = SkeletonCard;
window.SkeletonStats = SkeletonStats;
window.SkeletonList = SkeletonList;
