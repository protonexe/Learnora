const StudyChecklist = ({ onClose }) => {
  const [checklists, setChecklists] = React.useState(() => {
    const saved = localStorage.getItem('learnora-checklists');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Before Exam', items: [
        { id: 1, text: 'Review all chapters', completed: true },
        { id: 2, text: 'Complete practice problems', completed: true },
        { id: 3, text: 'Review notes', completed: false },
        { id: 4, text: 'Get adequate sleep', completed: false },
      ]},
      { id: 2, title: 'Daily Routine', items: [
        { id: 1, text: 'Morning review (30 min)', completed: true },
        { id: 2, text: 'Afternoon study session', completed: false },
        { id: 3, text: 'Evening recap', completed: false },
      ]},
    ];
  });
  const [showAddList, setShowAddList] = React.useState(false);
  const [showAddItem, setShowAddItem] = React.useState(null);
  const [newListTitle, setNewListTitle] = React.useState('');
  const [newItemText, setNewItemText] = React.useState('');

  const saveChecklists = (newChecklists) => {
    setChecklists(newChecklists);
    localStorage.setItem('learnora-checklists', JSON.stringify(newChecklists));
  };

  const toggleItem = (listId, itemId) => {
    saveChecklists(checklists.map(list => 
      list.id === listId 
        ? { ...list, items: list.items.map(item => 
            item.id === itemId ? { ...item, completed: !item.completed } : item
          )}
        : list
    ));
  };

  const addChecklist = () => {
    if (!newListTitle) return;
    saveChecklists([...checklists, {
      id: Date.now(),
      title: newListTitle,
      items: []
    }]);
    setNewListTitle('');
    setShowAddList(false);
  };

  const addItem = (listId) => {
    if (!newItemText) return;
    saveChecklists(checklists.map(list => 
      list.id === listId 
        ? { ...list, items: [...list.items, { id: Date.now(), text: newItemText, completed: false }]}
        : list
    ));
    setNewItemText('');
    setShowAddItem(null);
  };

  const deleteChecklist = (id) => {
    saveChecklists(checklists.filter(l => l.id !== id));
  };

  const deleteItem = (listId, itemId) => {
    saveChecklists(checklists.map(list => 
      list.id === listId 
        ? { ...list, items: list.items.filter(item => item.id !== itemId)}
        : list
    ));
  };

  const getProgress = (items) => {
    if (items.length === 0) return 0;
    const completed = items.filter(i => i.completed).length;
    return Math.round((completed / items.length) * 100);
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
      overflow: 'auto',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #14b8a6 0%, #10b981 100%)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            cursor: 'pointer'
          }}>
            ← Back
          </button>
          <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>✅ Study Checklists</h2>
        </div>
        <button
          onClick={() => setShowAddList(true)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            background: 'white',
            color: '#10b981',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600
          }}
        >
          + New List
        </button>
      </div>

      <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
        {/* Add List Form */}
        {showAddList && (
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            border: '1px solid var(--border-color)'
          }}>
            <input
              type="text"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="Checklist title..."
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
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={addChecklist} style={{
                flex: 1,
                padding: '10px',
                borderRadius: 8,
                border: 'none',
                background: 'var(--primary)',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 600
              }}>
                Create
              </button>
              <button onClick={() => setShowAddList(false)} style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Checklists */}
        {checklists.map(list => {
          const progress = getProgress(list.items);
          return (
            <div
              key={list.id}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 16, color: 'var(--text-primary)' }}>{list.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{progress}%</span>
                  <button
                    onClick={() => deleteChecklist(list.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-tertiary)',
                      cursor: 'pointer',
                      fontSize: 14
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div style={{ height: 4, background: 'var(--bg)', borderRadius: 2, marginBottom: 12, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: progress + '%', background: progress === 100 ? '#10b981' : 'var(--primary)', transition: 'width 0.3s ease' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {list.items.map(item => (
                  <div
                    key={item.id}
                    style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                  >
                    <button
                      onClick={() => toggleItem(list.id, item.id)}
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: item.completed ? '50%' : '6px',
                        border: item.completed ? 'none' : '2px solid var(--border-color)',
                        background: item.completed ? '#10b981' : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: 12
                      }}
                    >
                      {item.completed && '✓'}
                    </button>
                    <span style={{
                      flex: 1,
                      fontSize: 14,
                      color: item.completed ? 'var(--text-tertiary)' : 'var(--text-primary)',
                      textDecoration: item.completed ? 'line-through' : 'none'
                    }}>
                      {item.text}
                    </span>
                    <button
                      onClick={() => deleteItem(list.id, item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-tertiary)',
                        cursor: 'pointer',
                        fontSize: 12,
                        padding: 4
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowAddItem(list.id)}
                style={{
                  width: '100%',
                  marginTop: 12,
                  padding: '8px',
                  borderRadius: 6,
                  border: '1px dashed var(--border-color)',
                  background: 'transparent',
                  color: 'var(--text-tertiary)',
                  cursor: 'pointer',
                  fontSize: 13
                }}
              >
                + Add Item
              </button>

              {/* Add Item Form */}
              {showAddItem === list.id && (
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    placeholder="Add item..."
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 6,
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg)',
                      color: 'var(--text-primary)',
                      fontSize: 13
                    }}
                  />
                  <button
                    onClick={() => addItem(list.id)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 6,
                      border: 'none',
                      background: 'var(--primary)',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
