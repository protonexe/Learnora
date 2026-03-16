const QuickAccess = ({ onClose }) => {
  const [items, setItems] = React.useState(() => {
    const saved = localStorage.getItem('learnora-quick-access');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Math Notes', type: 'note', icon: '📝', color: '#f43f5e' },
      { id: 2, name: 'Physics Quiz', type: 'quiz', icon: '✍️', color: '#14b8a6' },
      { id: 3, name: 'Chemistry Flashcards', type: 'flashcard', icon: '🃏', color: '#0ea5e9' },
    ];
  });
  const [showAdd, setShowAdd] = React.useState(false);
  const [newItem, setNewItem] = React.useState({ name: '', type: 'note' });

  const types = [
    { value: 'note', label: 'Note', icon: '📝', color: '#f43f5e' },
    { value: 'quiz', label: 'Quiz', icon: '✍️', color: '#14b8a6' },
    { value: 'flashcard', label: 'Flashcard', icon: '🃏', color: '#0ea5e9' },
    { value: 'course', label: 'Course', icon: '📚', color: '#8b5cf6' },
    { value: 'link', label: 'Link', icon: '🔗', color: '#f59e0b' },
  ];

  const saveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem('learnora-quick-access', JSON.stringify(newItems));
  };

  const addItem = () => {
    if (!newItem.name) return;
    const type = types.find(t => t.value === newItem.type);
    saveItems([...items, {
      id: Date.now(),
      name: newItem.name,
      type: newItem.type,
      icon: type.icon,
      color: type.color
    }]);
    setNewItem({ name: '', type: 'note' });
    setShowAdd(false);
  };

  const deleteItem = (id) => {
    saveItems(items.filter(i => i.id !== id));
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
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
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
            padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer'
          }}>← Back</button>
          <h2 style={{ margin: 0, fontSize: 20 }}>⚡ Quick Access</h2>
        </div>
        <button onClick={() => setShowAdd(true)} style={{
          padding: '8px 16px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontSize: 14, fontWeight: 600
        }}>+ Add</button>
      </div>

      <div style={{ padding: 20, maxWidth: 500, margin: '0 auto' }}>
        {showAdd && (
          <div style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, marginBottom: 20, border: '1px solid var(--border-color)' }}>
            <input type="text" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} placeholder="Name..." style={{
              width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: 14, marginBottom: 12
            }} />
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              {types.map(t => (
                <button key={t.value} onClick={() => setNewItem({ ...newItem, type: t.value })} style={{
                  padding: '8px 12px', borderRadius: 8, border: 'none', background: newItem.type === t.value ? t.color : 'var(--bg)', color: newItem.type === t.value ? 'white' : 'var(--text-primary)', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6
                }}>{t.icon} {t.label}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={addItem} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Add</button>
              <button onClick={() => setShowAdd(false)} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {items.map(item => (
            <div key={item.id} style={{
              background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)', position: 'relative'
            }}>
              <button onClick={() => deleteItem(item.id)} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 14 }}>×</button>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: item.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 12 }}>{item.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{item.type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
