const ConceptMap = ({ onClose }) => {
  const [concepts, setConcepts] = React.useState([
    { id: 1, label: 'Calculus', x: 400, y: 150, color: '#f43f5e', connections: [2, 3] },
    { id: 2, label: 'Derivatives', x: 250, y: 250, color: '#14b8a6', connections: [4] },
    { id: 3, label: 'Integrals', x: 550, y: 250, color: '#0ea5e9', connections: [4] },
    { id: 4, label: 'Limits', x: 400, y: 350, color: '#8b5cf6', connections: [] },
  ]);
  const [selectedConcept, setSelectedConcept] = React.useState(null);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newConcept, setNewConcept] = React.useState({ label: '', parentId: '' });

  const addConcept = () => {
    if (!newConcept.label) return;
    
    const parent = concepts.find(c => c.id === parseInt(newConcept.parentId));
    const newId = Math.max(...concepts.map(c => c.id)) + 1;
    
    const concept = {
      id: newId,
      label: newConcept.label,
      x: parent ? parent.x + (Math.random() - 0.5) * 100 : 400,
      y: parent ? parent.y + 100 : 150,
      color: parent?.color || '#' + Math.floor(Math.random()*16777215).toString(16),
      connections: parent ? [parent.id] : []
    };
    
    if (parent) {
      setConcepts([...concepts.map(c => c.id === parent.id ? { ...c, connections: [...c.connections, newId] } : c), concept]);
    } else {
      setConcepts([...concepts, concept]);
    }
    
    setNewConcept({ label: '', parentId: '' });
    setShowAddForm(false);
  };

  const deleteConcept = (id) => {
    setConcepts(concepts.filter(c => c.id !== id).map(c => ({
      ...c,
      connections: c.connections.filter(conn => conn !== id)
    })));
    setSelectedConcept(null);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-primary)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--bg)',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}>
            ← Back
          </button>
          <h2 style={{ margin: 0, fontSize: 20 }}>🗺️ Concept Map</h2>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--primary)',
            color: 'white',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600
          }}
        >
          + Add Concept
        </button>
      </div>

      {/* Canvas */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'radial-gradient(circle at center, var(--bg-secondary) 0%, var(--bg-primary) 100%)' }}>
        {/* Grid */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1 }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--text-primary)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Connections */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {concepts.map(concept => 
            concept.connections.map(connId => {
              const target = concepts.find(c => c.id === connId);
              if (!target) return null;
              return (
                <line
                  key={`${concept.id}-${connId}`}
                  x1={concept.x}
                  y1={concept.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={concept.color}
                  strokeWidth="2"
                  strokeOpacity="0.5"
                />
              );
            })
          )}
        </svg>

        {/* Concepts */}
        {concepts.map(concept => (
          <div
            key={concept.id}
            onClick={() => setSelectedConcept(concept)}
            style={{
              position: 'absolute',
              left: concept.x - 50,
              top: concept.y - 25,
              width: 100,
              height: 50,
              background: selectedConcept?.id === concept.id ? concept.color : concept.color + 'dd',
              borderRadius: 25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: selectedConcept?.id === concept.id ? `0 0 20px ${concept.color}` : '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'all 0.2s ease',
              border: selectedConcept?.id === concept.id ? '3px solid white' : 'none',
              zIndex: selectedConcept?.id === concept.id ? 10 : 1
            }}
          >
            <span style={{ color: 'white', fontSize: 12, fontWeight: 600, textAlign: 'center' }}>
              {concept.label}
            </span>
          </div>
        ))}
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 20,
            width: 300,
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Add New Concept</h3>
            <input
              type="text"
              value={newConcept.label}
              onChange={(e) => setNewConcept({ ...newConcept, label: e.target.value })}
              placeholder="Concept name..."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                fontSize: 14,
                marginBottom: 12
              }}
            />
            <select
              value={newConcept.parentId}
              onChange={(e) => setNewConcept({ ...newConcept, parentId: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                fontSize: 14,
                marginBottom: 16
              }}
            >
              <option value="">Root Concept (no parent)</option>
              {concepts.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={addConcept}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'var(--primary)',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Add
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Concept Panel */}
      {selectedConcept && (
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          background: 'var(--bg-secondary)',
          borderRadius: 12,
          padding: 16,
          width: 250,
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ margin: 0, fontSize: 16 }}>{selectedConcept.label}</h3>
            <button
              onClick={() => setSelectedConcept(null)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-tertiary)',
                cursor: 'pointer',
                fontSize: 18
              }}
            >
              ×
            </button>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '0 0 12px 0' }}>
            Connected to {selectedConcept.connections.length} concept(s)
          </p>
          <button
            onClick={() => deleteConcept(selectedConcept.id)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: 6,
              border: 'none',
              background: '#f43f5e15',
              color: '#f43f5e',
              cursor: 'pointer',
              fontSize: 12
            }}
          >
            Delete Concept
          </button>
        </div>
      )}
    </div>
  );
};
