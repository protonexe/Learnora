const SkeletonList = ({ count = 3, type = 'card' }) => {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === 'list') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map(i => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            background: 'var(--bg-secondary)',
            borderRadius: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'var(--bg-tertiary)',
              borderRadius: '10px',
              animation: 'pulse 1.5s infinite'
            }} />
            <div style={{ flex: 1 }}>
              <div style={{
                height: '14px',
                width: '60%',
                background: 'var(--bg-tertiary)',
                borderRadius: '4px',
                marginBottom: '8px',
                animation: 'pulse 1.5s infinite'
              }} />
              <div style={{
                height: '10px',
                width: '40%',
                background: 'var(--bg-tertiary)',
                borderRadius: '4px',
                animation: 'pulse 1.5s infinite'
              }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
      {items.map(i => (
        <div key={i} style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '18px'
        }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              animation: 'pulse 1.5s infinite'
            }} />
            <div style={{ flex: 1 }}>
              <div style={{
                height: '16px',
                width: '70%',
                background: 'var(--bg-tertiary)',
                borderRadius: '4px',
                marginBottom: '8px',
                animation: 'pulse 1.5s infinite'
              }} />
              <div style={{
                height: '12px',
                width: '40%',
                background: 'var(--bg-tertiary)',
                borderRadius: '4px',
                animation: 'pulse 1.5s infinite'
              }} />
            </div>
          </div>
          <div style={{
            height: '8px',
            background: 'var(--bg-tertiary)',
            borderRadius: '4px',
            animation: 'pulse 1.5s infinite'
          }} />
        </div>
      ))}
    </div>
  );
};

const SkeletonTable = ({ rows = 5, cols = 4 }) => {
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '1px',
        padding: '12px 16px',
        background: 'var(--bg-tertiary)'
      }}>
        {Array.from({ length: cols }, (_, i) => (
          <div key={i} style={{
            height: '14px',
            background: 'var(--bg-secondary)',
            borderRadius: '4px',
            animation: 'pulse 1.5s infinite'
          }} />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }, (_, rowIdx) => (
        <div key={rowIdx} style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: '1px',
          padding: '14px 16px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          {Array.from({ length: cols }, (_, colIdx) => (
            <div key={colIdx} style={{
              height: '12px',
              background: 'var(--bg-tertiary)',
              borderRadius: '4px',
              animation: 'pulse 1.5s infinite',
              animationDelay: `${rowIdx * 0.1}s`
            }} />
          ))}
        </div>
      ))}
    </div>
  );
};

window.SkeletonList = SkeletonList;
window.SkeletonTable = SkeletonTable;
