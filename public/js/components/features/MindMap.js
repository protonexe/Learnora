const MindMap = ({ onClose, initialData = null }) => {
  // Core state
  const [nodes, setNodes] = React.useState(() => {
    if (initialData?.nodes) return initialData.nodes;
    return [
      { id: 1, text: 'Central Topic', x: 400, y: 300, color: '#6366f1', isCenter: true, expanded: true },
      { id: 2, text: 'Branch 1', x: 200, y: 150, color: '#f43f5e', parentId: 1, level: 1, expanded: true },
      { id: 3, text: 'Branch 2', x: 600, y: 150, color: '#14b8a6', parentId: 1, level: 1, expanded: true },
      { id: 4, text: 'Branch 3', x: 200, y: 450, color: '#f59e0b', parentId: 1, level: 1, expanded: true },
      { id: 5, text: 'Branch 4', x: 600, y: 450, color: '#8b5cf6', parentId: 1, level: 1, expanded: true }
    ];
  });
  
  const [connections, setConnections] = React.useState(() => {
    if (initialData?.connections) return initialData.connections;
    return [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 1, to: 5 }
    ];
  });

  // UI State
  const [selectedNodes, setSelectedNodes] = React.useState([]);
  const [dragging, setDragging] = React.useState(null);
  const [editingNode, setEditingNode] = React.useState(null);
  const [newText, setNewText] = React.useState('');
  const [zoom, setZoom] = React.useState(1);
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = React.useState(false);
  const [panStart, setPanStart] = React.useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = React.useState(true);
  const [showMinimap, setShowMinimap] = React.useState(true);
  const [mindMapName, setMindMapName] = React.useState(initialData?.name || 'Untitled Mind Map');
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [historyIndex, setHistoryIndex] = React.useState(-1);

  // Refs
  const containerRef = React.useRef(null);
  const inputRef = React.useRef(null);

  // Color palette
  const colorPalette = [
    '#6366f1', '#f43f5e', '#14b8a6', '#f59e0b', '#8b5cf6',
    '#10b981', '#0ea5e9', '#ec4899', '#84cc16', '#f97316'
  ];

  // History management
  const addToHistory = React.useCallback((newNodes, newConnections) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ 
      nodes: JSON.parse(JSON.stringify(newNodes)), 
      connections: JSON.parse(JSON.stringify(newConnections)) 
    });
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = React.useCallback(() => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setNodes(JSON.parse(JSON.stringify(prev.nodes)));
      setConnections(JSON.parse(JSON.stringify(prev.connections)));
      setHistoryIndex(historyIndex - 1);
    }
  }, [history, historyIndex]);

  const redo = React.useCallback(() => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setNodes(JSON.parse(JSON.stringify(next.nodes)));
      setConnections(JSON.parse(JSON.stringify(next.connections)));
      setHistoryIndex(historyIndex + 1);
    }
  }, [history, historyIndex]);

  // Initialize history
  React.useEffect(() => {
    if (history.length === 0) {
      addToHistory(nodes, connections);
    }
  }, []);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (editingNode) return;
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        redo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedNodes.length > 0) {
          e.preventDefault();
          deleteSelectedNodes();
        }
      }
      if (e.key === 'Escape') {
        setSelectedNodes([]);
      }
      if (e.key === 'Tab' && selectedNodes.length === 1) {
        e.preventDefault();
        addChildNode(selectedNodes[0]);
      }
      if (e.key === 'Enter' && selectedNodes.length === 1) {
        e.preventDefault();
        const node = nodes.find(n => n.id === selectedNodes[0]);
        if (node) {
          setEditingNode(node.id);
          setNewText(node.text);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodes, nodes, editingNode, undo, redo]);

  // Node operations
  const addNode = (parentId = null) => {
    const parent = parentId ? nodes.find(n => n.id === parentId) : nodes.find(n => n.isCenter);
    const newNode = {
      id: Date.now(),
      text: 'New Node',
      x: parent ? parent.x + (Math.random() - 0.5) * 200 : 400,
      y: parent ? parent.y + (Math.random() - 0.5) * 200 : 300,
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      parentId: parent?.id || null,
      level: parent ? (parent.level || 0) + 1 : 0,
      expanded: true
    };

    const newNodes = [...nodes, newNode];
    let newConnections = [...connections];
    
    if (parent) {
      newConnections.push({ from: parent.id, to: newNode.id });
    }

    setNodes(newNodes);
    setConnections(newConnections);
    setSelectedNodes([newNode.id]);
    setEditingNode(newNode.id);
    setNewText('New Node');
    addToHistory(newNodes, newConnections);
  };

  const addChildNode = (parentId) => {
    const parent = nodes.find(n => n.id === parentId);
    if (!parent) return;
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 150;
    const newNode = {
      id: Date.now(),
      text: 'New Node',
      x: parent.x + Math.cos(angle) * distance,
      y: parent.y + Math.sin(angle) * distance,
      color: parent.color,
      parentId: parent.id,
      level: (parent.level || 0) + 1,
      expanded: true
    };

    const newNodes = [...nodes, newNode];
    const newConnections = [...connections, { from: parent.id, to: newNode.id }];
    
    setNodes(newNodes);
    setConnections(newConnections);
    setSelectedNodes([newNode.id]);
    setEditingNode(newNode.id);
    setNewText('New Node');
    addToHistory(newNodes, newConnections);
  };

  const deleteSelectedNodes = () => {
    const toDelete = new Set(selectedNodes);
    
    // Don't delete center node
    const centerNode = nodes.find(n => n.isCenter);
    if (centerNode) toDelete.delete(centerNode.id);

    const newNodes = nodes.filter(n => !toDelete.has(n.id));
    const newConnections = connections.filter(c => !toDelete.has(c.from) && !toDelete.has(c.to));
    
    setNodes(newNodes);
    setConnections(newConnections);
    setSelectedNodes([]);
    addToHistory(newNodes, newConnections);
  };

  const deleteNode = (id) => {
    if (nodes.find(n => n.id === id)?.isCenter) return;
    setSelectedNodes([id]);
    setTimeout(() => deleteSelectedNodes(), 0);
  };

  // Drag handling
  const handleMouseDown = (e, node) => {
    if (e.button !== 0) return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
    
    e.stopPropagation();

    if (e.ctrlKey || e.metaKey) {
      setSelectedNodes(prev => 
        prev.includes(node.id) 
          ? prev.filter(id => id !== node.id)
          : [...prev, node.id]
      );
    } else if (!selectedNodes.includes(node.id)) {
      setSelectedNodes([node.id]);
    }
    
    setDragging(node.id);
  };

  const handleMouseMove = (e) => {
    if (dragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;
      
      const newX = Math.max(60, Math.min(x, rect.width / zoom - 60));
      const newY = Math.max(30, Math.min(y, rect.height / zoom - 30));

      if (selectedNodes.includes(dragging)) {
        const draggedNode = nodes.find(n => n.id === dragging);
        if (draggedNode) {
          const dx = newX - draggedNode.x;
          const dy = newY - draggedNode.y;
          
          setNodes(nodes.map(n => 
            selectedNodes.includes(n.id)
              ? { ...n, x: n.x + dx, y: n.y + dy }
              : n
          ));
        }
      } else {
        setNodes(nodes.map(n => 
          n.id === dragging ? { ...n, x: newX, y: newY } : n
        ));
      }
    }

    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
  };

  const handleMouseUp = () => {
    if (dragging) {
      addToHistory(nodes, connections);
    }
    setDragging(null);
    setIsPanning(false);
  };

  const handleContainerMouseDown = (e) => {
    if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      return;
    }
    
    if (e.button === 0 && !e.ctrlKey && !e.metaKey) {
      setSelectedNodes([]);
    }
  };

  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom(z => Math.max(0.2, Math.min(3, z * delta)));
    }
  };

  // Edit handling
  const saveEdit = () => {
    if (newText.trim()) {
      const newNodes = nodes.map(n => 
        n.id === editingNode ? { ...n, text: newText } : n
      );
      setNodes(newNodes);
      addToHistory(newNodes, connections);
    }
    setEditingNode(null);
    setNewText('');
  };

  const toggleExpandNode = (nodeId) => {
    setNodes(nodes.map(n => 
      n.id === nodeId ? { ...n, expanded: !n.expanded } : n
    ));
  };

  // View operations
  const centerView = () => {
    const centerNode = nodes.find(n => n.isCenter);
    if (centerNode && containerRef.current) {
      setZoom(1);
      setPan({
        x: -centerNode.x + containerRef.current.clientWidth / 2,
        y: -centerNode.y + containerRef.current.clientHeight / 2
      });
    }
  };

  const fitToScreen = () => {
    if (!containerRef.current || nodes.length === 0) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const padding = 100;
    
    const minX = Math.min(...nodes.map(n => n.x)) - padding;
    const maxX = Math.max(...nodes.map(n => n.x)) + padding;
    const minY = Math.min(...nodes.map(n => n.y)) - padding;
    const maxY = Math.max(...nodes.map(n => n.y)) + padding;

    const width = maxX - minX;
    const height = maxY - minY;

    const scaleX = rect.width / width;
    const scaleY = rect.height / height;
    const newZoom = Math.min(scaleX, scaleY, 1.5);

    setZoom(newZoom);
    setPan({
      x: -minX * newZoom + (rect.width - width * newZoom) / 2,
      y: -minY * newZoom + (rect.height - height * newZoom) / 2
    });
  };

  // Export
  const exportAsJSON = () => {
    const data = {
      name: mindMapName,
      nodes,
      connections,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = mindMapName.replace(/\s+/g, '_') + '.json';
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  // Color update
  const updateNodeColor = (nodeId, color) => {
    const newNodes = nodes.map(n => 
      selectedNodes.includes(n.id) || n.id === nodeId
        ? { ...n, color }
        : n
    );
    setNodes(newNodes);
    addToHistory(newNodes, connections);
  };

  // Get visible nodes (respecting collapsed parents)
  const getVisibleNodes = () => {
    const collapsedParents = new Set(nodes.filter(n => !n.expanded).map(n => n.id));
    return nodes.filter(n => {
      let parent = n.parentId;
      while (parent) {
        if (collapsedParents.has(parent)) return false;
        const parentNode = nodes.find(node => node.id === parent);
        parent = parentNode?.parentId;
      }
      return true;
    });
  };

  const visibleNodes = getVisibleNodes();
  const visibleConnections = connections.filter(c => 
    visibleNodes.some(n => n.id === c.from) && 
    visibleNodes.some(n => n.id === c.to)
  );

  return (
    <div style={{ 
      height: '70vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'var(--bg-primary)'
    }}>
      {/* Header Toolbar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '8px', 
        padding: '12px 16px', 
        background: 'var(--bg-secondary)', 
        borderBottom: '1px solid var(--border-color)',
        flexWrap: 'wrap'
      }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '16px' }}>
          {isEditingName ? (
            <input
              ref={inputRef}
              value={mindMapName}
              onChange={(e) => setMindMapName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyPress={(e) => e.key === 'Enter' && setIsEditingName(false)}
              style={{
                fontSize: '16px',
                fontWeight: 600,
                border: 'none',
                background: 'transparent',
                borderBottom: '2px solid var(--accent-blue)',
                outline: 'none',
                color: 'var(--text-primary)'
              }}
              autoFocus
            />
          ) : (
            <h2 
              onClick={() => setIsEditingName(true)}
              style={{ 
                fontSize: '16px', 
                fontWeight: 600, 
                cursor: 'pointer',
                color: 'var(--text-primary)'
              }}
            >
              {mindMapName}
            </h2>
          )}
          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
            {nodes.length} nodes
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <Button size="sm" icon="plus" onClick={() => addNode()}>
            Add Node
          </Button>
          {selectedNodes.length > 0 && !nodes.find(n => n.id === selectedNodes[0])?.isCenter && (
            <Button size="sm" variant="danger" icon="trash-2" onClick={deleteSelectedNodes}>
              Delete
            </Button>
          )}
        </div>

        <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 8px' }} />

        {/* Undo/Redo */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            style={{
              padding: '8px',
              background: 'transparent',
              border: '2px solid var(--border-strong)',
              borderRadius: '6px',
              cursor: historyIndex <= 0 ? 'not-allowed' : 'pointer',
              opacity: historyIndex <= 0 ? 0.5 : 1
            }}
            title="Undo (Ctrl+Z)"
          >
            <Icon name="undo" size={18} />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            style={{
              padding: '8px',
              background: 'transparent',
              border: '2px solid var(--border-strong)',
              borderRadius: '6px',
              cursor: historyIndex >= history.length - 1 ? 'not-allowed' : 'pointer',
              opacity: historyIndex >= history.length - 1 ? 0.5 : 1
            }}
            title="Redo (Ctrl+Y)"
          >
            <Icon name="redo" size={18} />
          </button>
        </div>

        <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 8px' }} />

        {/* Zoom Controls */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <button
            onClick={() => setZoom(z => Math.max(0.2, z / 1.2))}
            style={{
              padding: '8px',
              background: 'transparent',
              border: '2px solid var(--border-strong)',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <Icon name="zoom-out" size={18} />
          </button>
          <span style={{ fontSize: '12px', minWidth: '50px', textAlign: 'center' }}>
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(z => Math.min(3, z * 1.2))}
            style={{
              padding: '8px',
              background: 'transparent',
              border: '2px solid var(--border-strong)',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <Icon name="zoom-in" size={18} />
          </button>
          <button
            onClick={centerView}
            style={{
              padding: '8px',
              background: 'transparent',
              border: '2px solid var(--border-strong)',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
            title="Center View"
          >
            <Icon name="maximize" size={18} />
          </button>
          <button
            onClick={fitToScreen}
            style={{
              padding: '8px',
              background: 'transparent',
              border: '2px solid var(--border-strong)',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
            title="Fit to Screen"
          >
            <Icon name="minimize-2" size={18} />
          </button>
        </div>

        <div style={{ flex: 1 }} />

        {/* Right Side */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
            />
            Grid
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
            <input
              type="checkbox"
              checked={showMinimap}
              onChange={(e) => setShowMinimap(e.target.checked)}
            />
            Minimap
          </label>
          
          <Button size="sm" variant="secondary" icon="download" onClick={exportAsJSON}>
            Export
          </Button>
          <Button size="sm" variant="secondary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div 
        ref={containerRef}
        onMouseDown={handleContainerMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ 
          flex: 1, 
          position: 'relative', 
          background: 'var(--bg-tertiary)',
          overflow: 'hidden',
          cursor: isPanning ? 'grabbing' : 'default'
        }}
      >
        {/* Grid Background */}
        {showGrid && (
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <defs>
              <pattern id="mindmap-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path 
                  d="M 20 0 L 0 0 0 20" 
                  fill="none" 
                  stroke="var(--border-color)" 
                  strokeWidth="0.5"
                  opacity="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mindmap-grid)" />
          </svg>
        )}

        {/* Mind Map Content */}
        <div style={{
          position: 'absolute',
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          width: '100%',
          height: '100%'
        }}>
          {/* Connections SVG */}
          <svg style={{ position: 'absolute', inset: 0, width: '2000px', height: '2000px', pointerEvents: 'none' }}>
            <defs>
              <linearGradient id="mindmap-lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--primary-300)" />
                <stop offset="100%" stopColor="var(--primary-500)" />
              </linearGradient>
            </defs>
            {visibleConnections.map((conn, idx) => {
              const from = visibleNodes.find(n => n.id === conn.from);
              const to = visibleNodes.find(n => n.id === conn.to);
              if (!from || !to) return null;
              return (
                <line
                  key={idx}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="url(#mindmap-lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                  opacity="0.6"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {visibleNodes.map(node => (
            <div
              key={node.id}
              onMouseDown={(e) => handleMouseDown(e, node)}
              onDoubleClick={() => { 
                setEditingNode(node.id); 
                setNewText(node.text);
              }}
              style={{
                position: 'absolute',
                left: node.x,
                top: node.y,
                transform: 'translate(-50%, -50%)',
                background: node.isCenter ? 'var(--gradient-primary)' : node.color,
                color: '#FFF',
                padding: node.isCenter ? '20px 36px' : '14px 22px',
                borderRadius: node.isCenter ? 'var(--radius-xl)' : 'var(--radius-lg)',
                fontWeight: '600',
                fontSize: node.isCenter ? '17px' : '14px',
                cursor: dragging === node.id ? 'grabbing' : 'grab',
                border: selectedNodes.includes(node.id) ? '3px solid var(--text-primary)' : '2px solid transparent',
                boxShadow: 'var(--shadow-lg)',
                transition: dragging === node.id ? 'none' : 'border 0.2s ease',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                zIndex: selectedNodes.includes(node.id) ? 10 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Expand/Collapse Button */}
              {nodes.some(n => n.parentId === node.id) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpandNode(node.id);
                  }}
                  style={{
                    position: 'absolute',
                    right: '-10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    cursor: 'pointer',
                    zIndex: 20,
                    color: 'var(--text-primary)'
                  }}
                >
                  {node.expanded ? '−' : '+'}
                </button>
              )}

              {editingNode === node.id ? (
                <input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  onBlur={saveEdit}
                  onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#FFF',
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    fontFamily: 'inherit',
                    outline: 'none',
                    width: '120px',
                    textAlign: 'center'
                  }}
                  autoFocus
                />
              ) : (
                <span>{node.text}</span>
              )}
            </div>
          ))}
        </div>

        {/* Minimap */}
        {showMinimap && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            width: '160px',
            height: '120px',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
              {connections.map((conn, idx) => {
                const from = nodes.find(n => n.id === conn.from);
                const to = nodes.find(n => n.id === conn.to);
                if (!from || !to) return null;
                return (
                  <line
                    key={idx}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="var(--border-color)"
                    strokeWidth="1"
                  />
                );
              })}
              {nodes.map(node => (
                <circle
                  key={node.id}
                  cx={node.x}
                  cy={node.y}
                  r={node.isCenter ? 8 : 5}
                  fill={node.isCenter ? 'var(--accent-blue)' : node.color}
                  stroke={selectedNodes.includes(node.id) ? 'var(--text-primary)' : 'none'}
                  strokeWidth="2"
                />
              ))}
            </svg>
          </div>
        )}

        {/* Color Palette for Selected Nodes */}
        {selectedNodes.length > 0 && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Node Color</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', maxWidth: '150px' }}>
              {colorPalette.map(color => (
                <button
                  key={color}
                  onClick={() => updateNodeColor(null, color)}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    background: color,
                    border: '2px solid var(--border-strong)',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Status Bar */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          padding: '8px 16px',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: 'var(--text-tertiary)'
        }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>{nodes.length} nodes</span>
            <span>{connections.length} connections</span>
            <span>{selectedNodes.length} selected</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Zoom: {Math.round(zoom * 100)}%</span>
            <span>Shift+drag to pan</span>
          </div>
        </div>
      </div>

      {/* Help Text */}
      <p style={{ 
        textAlign: 'center', 
        fontSize: '12px', 
        color: 'var(--text-tertiary)', 
        padding: '8px',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)'
      }}>
        Drag nodes to move | Double-click to edit | Tab to add child | Delete to remove | Ctrl+Z/Y to undo/redo
      </p>
    </div>
  );
};

window.MindMap = MindMap;