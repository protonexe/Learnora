const ProgressBar = ({ 
  value, 
  color = 'var(--primary-500)', 
  height = 8, 
  animated = true, 
  showLabel, 
  label 
}) => {
  const [width, setWidth] = React.useState(0);
  
  React.useEffect(() => { 
    setTimeout(() => setWidth(value), 100); 
  }, [value]);

  return (
    <div>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>
            {label || 'Progress'}
          </span>
          <span style={{ fontSize: '13px', fontWeight: '700', color }}>
            {Math.round(value)}%
          </span>
        </div>
      )}
      <div style={{ 
        width: '100%', 
        height, 
        background: 'var(--bg-tertiary)', 
        borderRadius: 'var(--radius-full)', 
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{ 
          width: `${width}%`, 
          height: '100%', 
          background: color.includes('gradient') ? color : `linear-gradient(90deg, ${color}, ${color}dd)`,
          borderRadius: 'var(--radius-full)', 
          transition: animated ? 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        }} />
      </div>
    </div>
  );
};

window.ProgressBar = ProgressBar;