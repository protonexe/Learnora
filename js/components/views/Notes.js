const NotesView = ({ 
  notes, 
  setNotes, 
  currentNote, 
  setCurrentNote, 
  noteSearch, 
  setNoteSearch, 
  noteTagFilter, 
  setNoteTagFilter,
  registerStudyActivity,
  showToast 
}) => {
  const { theme } = useTheme();
  
  // Canvas refs and state
  const canvasRef = React.useRef(null);
  const canvasContainerRef = React.useRef(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [currentTool, setCurrentTool] = React.useState('brush');
  const [currentColor, setCurrentColor] = React.useState('#6366f1');
  const [brushSize, setBrushSize] = React.useState(5);
  const [canvasHistory, setCanvasHistory] = React.useState([]);
  const [historyStep, setHistoryStep] = React.useState(-1);
  const [startPos, setStartPos] = React.useState(null);
  const [snapshot, setSnapshot] = React.useState(null);
  const [textInput, setTextInput] = React.useState({ visible: false, x: 0, y: 0, value: '' });
  const textInputRef = React.useRef(null);

  const allTags = Array.from(new Set(notes.flatMap(n => n.tags || [])));
  
  const filteredNotes = notes.filter(n => {
    const matchesTag = noteTagFilter ? (n.tags || []).includes(noteTagFilter) : true;
    const matchesSearch = noteSearch ? (n.content || '').toLowerCase().includes(noteSearch.toLowerCase()) : true;
    return matchesTag && matchesSearch;
  });

  // Colors preset
  const colors = [
    { name: 'black', value: '#1a1a2e' },
    { name: 'red', value: '#ef4444' },
    { name: 'blue', value: '#3b82f6' },
    { name: 'green', value: '#22c55e' },
    { name: 'yellow', value: '#eab308' },
    { name: 'purple', value: '#a855f7' },
    { name: 'orange', value: '#f97316' },
    { name: 'white', value: '#ffffff' }
  ];

  // Tools configuration
  const tools = [
    { id: 'brush', name: 'Brush', icon: 'edit-3' },
    { id: 'eraser', name: 'Eraser', icon: 'trash-2' },
    { id: 'line', name: 'Line', icon: 'minus' },
    { id: 'rectangle', name: 'Rectangle', icon: 'square' },
    { id: 'circle', name: 'Circle', icon: 'circle' },
    { id: 'text', name: 'Text', icon: 'type' }
  ];

  // Brush sizes
  const brushSizes = [
    { id: 'small', size: 2, label: 'Small' },
    { id: 'medium', size: 5, label: 'Medium' },
    { id: 'large', size: 10, label: 'Large' }
  ];

  // Initialize canvas with white background
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && canvas.getContext('2d')) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Save initial state
      saveToHistory();
    }
  }, []);

  // Save canvas state to history
  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Remove any redo states
    const newHistory = canvasHistory.slice(0, historyStep + 1);
    newHistory.push(imageData);
    
    // Limit history to 50 steps
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    
    setCanvasHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  // Undo functionality
  const undo = () => {
    if (historyStep > 0) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      restoreCanvasState(newStep);
    }
  };

  // Redo functionality
  const redo = () => {
    if (historyStep < canvasHistory.length - 1) {
      const newStep = historyStep + 1;
      setHistoryStep(newStep);
      restoreCanvasState(newStep);
    }
  };

  // Restore canvas state
  const restoreCanvasState = (step) => {
    const canvas = canvasRef.current;
    if (!canvas || !canvasHistory[step]) return;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(canvasHistory[step], 0, 0);
  };

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  // Get coordinates from mouse/touch event
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  // Start drawing
  const startDrawing = React.useCallback((e) => {
    if (currentTool === 'text') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvas.getContext('2d');
    
    setIsDrawing(true);
    setStartPos({ x, y });
    
    // Save snapshot for shape preview
    if (['line', 'rectangle', 'circle'].includes(currentTool)) {
      setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    
    if (currentTool === 'eraser') {
      ctx.strokeStyle = '#ffffff';
    } else {
      ctx.strokeStyle = currentColor;
    }
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, [currentTool, brushSize, currentColor]);

  // Draw
  const draw = React.useCallback((e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);
    
    if (currentTool === 'brush' || currentTool === 'eraser') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (['line', 'rectangle', 'circle'].includes(currentTool)) {
      // Restore snapshot and draw preview
      if (snapshot) {
        ctx.putImageData(snapshot, 0, 0);
      }
      
      ctx.beginPath();
      if (currentTool === 'line') {
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (currentTool === 'rectangle') {
        ctx.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
      } else if (currentTool === 'circle') {
        const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  }, [isDrawing, currentTool, startPos, snapshot]);

  // Stop drawing
  const stopDrawing = React.useCallback(() => {
    if (isDrawing) {
      setIsDrawing(false);
      if (['brush', 'eraser', 'line', 'rectangle', 'circle'].includes(currentTool)) {
        saveToHistory();
      }
    }
  }, [isDrawing, currentTool]);

  // Handle canvas click for text tool
  const handleCanvasClick = (e) => {
    if (currentTool === 'text') {
      const { x, y } = getCoordinates(e);
      setTextInput({ visible: true, x, y, value: '' });
      setTimeout(() => textInputRef.current?.focus(), 0);
    }
  };

  // Add text to canvas
  const addTextToCanvas = () => {
    if (!textInput.value.trim()) {
      setTextInput({ ...textInput, visible: false });
      return;
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.font = `${brushSize * 3 + 10}px sans-serif`;
    ctx.fillStyle = currentColor;
    ctx.fillText(textInput.value, textInput.x, textInput.y);
    
    setTextInput({ ...textInput, visible: false, value: '' });
    saveToHistory();
  };

  // Save drawing
  const saveDrawing = () => {
    if (canvasRef.current) { 
      setNotes([...notes, { 
        id: Date.now(), 
        type: 'drawing', 
        content: canvasRef.current.toDataURL(), 
        timestamp: new Date().toLocaleString(), 
        tags: [] 
      }]); 
      clearCanvas();
      registerStudyActivity(); 
      showToast('Drawing saved!', 'success'); 
    }
  };

  const saveTextNote = () => {
    if (currentNote.trim()) { 
      const tags = Helpers.extractTags(currentNote);
      setNotes([...notes, { 
        id: Date.now(), 
        type: 'text', 
        content: currentNote, 
        timestamp: new Date().toLocaleString(), 
        tags 
      }]); 
      setCurrentNote(''); 
      registerStudyActivity(); 
      showToast('Note saved!', 'success'); 
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
    showToast('Note deleted', 'info');
  };

  return (
    <>
      <AnimatedCard delay={50}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.02em' }}>
            Notes
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Capture and organize your thoughts
          </p>
        </div>
      </AnimatedCard>
      
      {/* Drawing Canvas */}
      <AnimatedCard delay={100}>
        <Card elevated style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
            <Icon name="edit-3" size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
            Drawing Canvas
          </h3>
          
          {/* Toolbar */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px', 
            marginBottom: '20px',
            padding: '16px',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            {/* Tools Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Tools:</span>
              {tools.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setCurrentTool(tool.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid',
                    borderColor: currentTool === tool.id ? 'var(--accent-blue)' : 'var(--border-color)',
                    background: currentTool === tool.id ? 'var(--bg-hover)' : 'var(--bg-tertiary)',
                    color: currentTool === tool.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon name={tool.icon} size={16} />
                  {tool.name}
                </button>
              ))}
            </div>
            
            {/* Colors Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Colors:</span>
              {colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setCurrentColor(color.value)}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: color.value,
                    border: '3px solid',
                    borderColor: currentColor === color.value ? 'var(--accent-blue)' : 'transparent',
                    cursor: 'pointer',
                    boxShadow: color.value === '#ffffff' ? 'inset 0 0 0 1px var(--border-color)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  title={color.name}
                />
              ))}
            </div>
            
            {/* Brush Size Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Size:</span>
              {brushSizes.map(size => (
                <button
                  key={size.id}
                  onClick={() => setBrushSize(size.size)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid',
                    borderColor: brushSize === size.size ? 'var(--accent-blue)' : 'var(--border-color)',
                    background: brushSize === size.size ? 'var(--bg-hover)' : 'var(--bg-tertiary)',
                    color: brushSize === size.size ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: size.size,
                    height: size.size,
                    borderRadius: '50%',
                    background: 'currentColor'
                  }} />
                  {size.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Canvas Container */}
          <div 
            ref={canvasContainerRef}
            style={{ 
              position: 'relative',
              width: '100%',
              marginBottom: '20px'
            }}
          >
            <canvas 
              ref={canvasRef} 
              width={800} 
              height={450}
              onMouseDown={startDrawing} 
              onMouseMove={draw} 
              onMouseUp={stopDrawing} 
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing} 
              onTouchMove={draw} 
              onTouchEnd={stopDrawing}
              onClick={handleCanvasClick}
              style={{ 
                width: '100%', 
                height: 'auto',
                aspectRatio: '800/450',
                border: '2px solid var(--border-color)', 
                borderRadius: 'var(--radius-lg)', 
                background: '#ffffff',
                cursor: currentTool === 'text' ? 'text' : 'crosshair', 
                touchAction: 'none',
                display: 'block'
              }} 
            />
            
            {/* Text Input Overlay */}
            {textInput.visible && (
              <div style={{
                position: 'absolute',
                left: `${(textInput.x / 800) * 100}%`,
                top: `${(textInput.y / 450) * 100}%`,
                zIndex: 10
              }}>
                <input
                  ref={textInputRef}
                  type="text"
                  value={textInput.value}
                  onChange={(e) => setTextInput({ ...textInput, value: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') addTextToCanvas();
                    if (e.key === 'Escape') setTextInput({ ...textInput, visible: false, value: '' });
                  }}
                  onBlur={addTextToCanvas}
                  placeholder="Type text..."
                  style={{
                    padding: '8px 12px',
                    border: `2px solid ${currentColor}`,
                    borderRadius: 'var(--radius-md)',
                    fontSize: `${brushSize * 3 + 10}px`,
                    fontFamily: 'sans-serif',
                    background: 'rgba(255,255,255,0.95)',
                    color: currentColor,
                    outline: 'none',
                    minWidth: '150px'
                  }}
                />
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button 
              variant="secondary" 
              icon="corner-up-left" 
              onClick={undo}
              disabled={historyStep <= 0}
              style={{ opacity: historyStep <= 0 ? 0.5 : 1 }}
            >
              Undo
            </Button>
            <Button 
              variant="secondary" 
              icon="corner-up-right" 
              onClick={redo}
              disabled={historyStep >= canvasHistory.length - 1}
              style={{ opacity: historyStep >= canvasHistory.length - 1 ? 0.5 : 1 }}
            >
              Redo
            </Button>
            <div style={{ flex: 1 }} />
            <Button 
              variant="secondary" 
              icon="trash-2" 
              onClick={clearCanvas}
            >
              Clear
            </Button>
            <Button icon="save" onClick={saveDrawing}>
              Save Drawing
            </Button>
          </div>
        </Card>
      </AnimatedCard>
      
      {/* Text Note */}
      <AnimatedCard delay={200}>
        <Card elevated style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
            <Icon name="file-text" size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
            Text Note
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
            Use #tags to organize your notes (e.g., #important #physics)
          </p>
          <textarea 
            value={currentNote} 
            onChange={(e) => setCurrentNote(e.target.value)} 
            placeholder="Start typing your note here..." 
            style={{ 
              width: '100%', 
              height: '150px', 
              padding: '18px', 
              border: '2px solid var(--border-color)', 
              borderRadius: 'var(--radius-md)', 
              fontSize: '15px', 
              fontFamily: 'inherit', 
              background: 'var(--bg-tertiary)', 
              color: 'var(--text-primary)', 
              resize: 'vertical',
              lineHeight: '1.6'
            }} 
          />
          <Button icon="plus" style={{ marginTop: '20px' }} onClick={saveTextNote}>
            Save Note
          </Button>
        </Card>
      </AnimatedCard>
      
      {/* Saved Notes */}
      {notes.length > 0 && (
        <AnimatedCard delay={300}>
          <Card elevated>
            {/* Filters */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
              <Input 
                icon="search"
                type="text" 
                placeholder="Search notes..." 
                value={noteSearch} 
                onChange={(e) => setNoteSearch(e.target.value)}
                style={{ flex: '1 1 250px', minWidth: '200px' }}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: '500' }}>Filter:</span>
                <button 
                  onClick={() => setNoteTagFilter(null)} 
                  style={{ 
                    padding: '8px 14px', 
                    borderRadius: 'var(--radius-full)', 
                    border: '2px solid var(--border-strong)', 
                    background: noteTagFilter === null ? 'var(--accent-blue)' : 'var(--bg-tertiary)', 
                    color: noteTagFilter === null ? 'var(--bg-primary)' : 'var(--text-secondary)', 
                    fontSize: '13px', 
                    fontWeight: '600',
                    cursor: 'pointer' 
                  }}
                >
                  All
                </button>
                {allTags.map(tag => (
                <button 
                  key={tag} 
                  onClick={() => setNoteTagFilter(tag)} 
                  style={{ 
                    padding: '8px 14px', 
                    borderRadius: 'var(--radius-full)', 
                    border: '2px solid var(--border-strong)', 
                    background: noteTagFilter === tag ? 'var(--accent-blue)' : 'var(--bg-tertiary)', 
                    color: noteTagFilter === tag ? 'var(--bg-primary)' : 'var(--text-secondary)', 
                    fontSize: '13px', 
                    fontWeight: '600',
                    cursor: 'pointer' 
                  }}
                >
                  #{tag}
                </button>
                ))}
              </div>
            </div>
            
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
              Saved Notes ({filteredNotes.length})
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredNotes.map((note) => (
                <div 
                  key={note.id}
                  style={{
                    padding: '20px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: '500' }}>
                      {note.timestamp}
                    </span>
                    <button 
                      onClick={() => deleteNote(note.id)} 
                      style={{ background: 'none', border: '2px solid var(--border-strong)', cursor: 'pointer', padding: '4px' }}
                    >
                      <Icon name="trash-2" size={16} color="var(--danger)" />
                    </button>
                  </div>
                  {note.type === 'text' ? (
                    <>
                      <p style={{ fontSize: '15px', lineHeight: '1.7', whiteSpace: 'pre-wrap', color: 'var(--text-primary)' }}>
                        {note.content}
                      </p>
                      {note.tags && note.tags.length > 0 && (
                        <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {note.tags.map(t => <Badge key={t} variant="primary" size="sm">#{t}</Badge>)}
                        </div>
                      )}
                    </>
                  ) : (
                    <img 
                      src={note.content} 
                      alt="Drawing" 
                      style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: 'var(--radius-md)' }} 
                    />
                  )}
                </div>
              ))}
            </div>
            
            {filteredNotes.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>📝</div>
                <p style={{ color: 'var(--text-tertiary)' }}>No notes found</p>
              </div>
            )}
          </Card>
        </AnimatedCard>
      )}
    </>
  );
};

window.NotesView = NotesView;