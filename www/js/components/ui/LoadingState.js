const LoadingState = ({ type = 'card', count = 3 }) => {
  const renderSkeletonCard = () => (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid var(--border-color)'
    }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          background: 'var(--bg-tertiary)',
          borderRadius: '8px'
        }} />
        <div style={{ flex: 1 }}>
          <div style={{
            width: '60%',
            height: '16px',
            background: 'var(--bg-tertiary)',
            borderRadius: '4px',
            marginBottom: '8px'
          }} />
          <div style={{
            width: '40%',
            height: '12px',
            background: 'var(--bg-tertiary)',
            borderRadius: '4px'
          }} />
        </div>
      </div>
      <div style={{
        width: '100%',
        height: '8px',
        background: 'var(--bg-tertiary)',
        borderRadius: '4px'
      }} />
    </div>
  );

  const renderSkeletonList = () => (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid var(--border-color)'
    }}>
      {[...Array(count)].map((_, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 0',
          borderBottom: i < count - 1 ? '1px solid var(--border-color)' : 'none'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'var(--bg-tertiary)',
            borderRadius: '50%'
          }} />
          <div style={{ flex: 1 }}>
            <div style={{
              width: '70%',
              height: '14px',
              background: 'var(--bg-tertiary)',
              borderRadius: '4px',
              marginBottom: '6px'
            }} />
            <div style={{
              width: '40%',
              height: '12px',
              background: 'var(--bg-tertiary)',
              borderRadius: '4px'
            }} />
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkeletonTable = () => (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid var(--border-color)'
    }}>
      <div style={{
        display: 'flex',
        gap: '16px',
        padding: '16px',
        background: 'var(--bg-tertiary)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            flex: 1,
            height: '14px',
            background: 'var(--bg-secondary)',
            borderRadius: '4px'
          }} />
        ))}
      </div>
      {[...Array(5)].map((_, rowIndex) => (
        <div key={rowIndex} style={{
          display: 'flex',
          gap: '16px',
          padding: '16px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{
              flex: 1,
              height: '14px',
              background: 'var(--bg-tertiary)',
              borderRadius: '4px'
            }} />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[...Array(count)].map((_, i) => (
        <div key={i} style={{ animation: 'pulse 2s infinite', animationDelay: `${i * 0.1}s' }}>
          {type === 'card' && renderSkeletonCard()}
          {type === 'list' && renderSkeletonList()}
          {type === 'table' && renderSkeletonTable()}
        </div>
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

window.LoadingState = LoadingState;
