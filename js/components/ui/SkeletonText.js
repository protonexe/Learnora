const SkeletonText = ({ lines = 3, width = '100%' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {Array.from({ length: lines }, (_, i) => (
      <div key={i} style={{
        height: '14px',
        width: i === lines - 1 ? '60%' : width,
        background: 'var(--bg-tertiary)',
        borderRadius: '4px',
        animation: 'pulse 1.5s infinite'
      }} />
    ))}
  </div>
);

const SkeletonAvatar = ({ size = 48 }) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: '50%',
    background: 'var(--bg-tertiary)',
    animation: 'pulse 1.5s infinite'
  }} />
);

window.SkeletonText = SkeletonText;
window.SkeletonAvatar = SkeletonAvatar;
