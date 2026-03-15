const JSONViewer = ({ data, expanded = true }) => {
  const [isExpanded, setIsExpanded] = React.useState(expanded);

  const renderValue = (value, indent = 0) => {
    if (value === null) return <span style={{ color: '#ef4444' }}>null</span>;
    if (typeof value === 'boolean') return <span style={{ color: '#8b5cf6' }}>{value.toString()}</span>;
    if (typeof value === 'number') return <span style={{ color: '#10b981' }}>{value}</span>;
    if (typeof value === 'string') return <span style={{ color: '#f59e0b' }}>"{value}"</span>;
    
    if (Array.isArray(value)) {
      if (value.length === 0) return <span>[]</span>;
      return (
        <span>
          [
          {isExpanded && value.map((item, idx) => (
            <div key={idx} style={{ marginLeft: '20px' }}>
              {renderValue(item, indent + 1)}
              {idx < value.length - 1 && ','}
            </div>
          ))}
          {!isExpanded && <span style={{ color: 'var(--text-tertiary)' }}> ... {value.length} items</span>}
          ]
        </span>
      );
    }
    
    if (typeof value === 'object') {
      const entries = Object.entries(value);
      if (entries.length === 0) return <span>{"{}"}</span>;
      return (
        <span>
          {'{'}
          {isExpanded && entries.map(([key, val], idx) => (
            <div key={key} style={{ marginLeft: '20px' }}>
              <span style={{ color: '#6366f1' }}>"{key}"</span>: {renderValue(val, indent + 1)}
              {idx < entries.length - 1 && ','}
            </div>
          ))}
          {!isExpanded && <span style={{ color: 'var(--text-tertiary)' }}> ... {entries.length} keys</span>}
          {'}'}
        </span>
      );
    }
    
    return <span>{String(value)}</span>;
  };

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: '12px',
      border: '1px solid var(--border-color)',
      overflow: 'hidden'
    }}>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          padding: '12px 16px',
          background: 'var(--bg-tertiary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13px',
          fontWeight: '600'
        }}
      >
        <Icon name={isExpanded ? 'chevron-down' : 'chevron-right'} size={14} />
        JSON Data
      </div>
      {isExpanded && (
        <pre style={{
          margin: 0,
          padding: '16px',
          fontSize: '13px',
          fontFamily: 'monospace',
          overflow: 'auto',
          lineHeight: '1.6'
        }}>
          {renderValue(data)}
        </pre>
      )}
    </div>
  );
};

window.JSONViewer = JSONViewer;
