const TreeView = ({ data = [], onSelect, defaultExpanded = true }) => {
  const [expanded, setExpanded] = React.useState({});

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderNode = (node, level = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded[node.id] !== undefined ? expanded[node.id] : defaultExpanded;

    return (
      <div key={node.id}>
        <div
          onClick={() => {
            if (hasChildren) toggleExpand(node.id);
            onSelect?.(node);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            paddingLeft: `${12 + level * 20}px`,
            cursor: 'pointer',
            borderRadius: '6px',
            margin: '2px 8px',
            transition: 'background 0.2s'
          }}
        >
          {hasChildren ? (
            <Icon name={isExpanded ? 'chevron-down' : 'chevron-right'} size={14} color="var(--text-tertiary)" />
          ) : (
            <span style={{ width: 14 }} />
          )}
          <span style={{ fontSize: '16px' }}>{node.icon || '📁'}</span>
          <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{node.label}</span>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: '12px',
      border: '1px solid var(--border-color)',
      padding: '8px 0'
    }}>
      {data.map(node => renderNode(node))}
    </div>
  );
};

window.TreeView = TreeView;
