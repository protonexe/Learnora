const TodoWidget = ({ onClose }) => {
  const [todos, setTodos] = React.useState(() => {
    const saved = localStorage.getItem('learnora-todos');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Complete Math assignment', completed: false },
      { id: 2, text: 'Review Physics notes', completed: true },
      { id: 3, text: 'Take Chemistry quiz', completed: false },
    ];
  });
  const [newTodo, setNewTodo] = React.useState('');

  const saveTodos = (newTodos) => {
    setTodos(newTodos);
    localStorage.setItem('learnora-todos', JSON.stringify(newTodos));
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;
    saveTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    saveTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    saveTodos(todos.filter(t => t.id !== id));
  };

  const completed = todos.filter(t => t.completed).length;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
          <h2 style={{ margin: 0, fontSize: 20 }}>✅ To-Do List</h2>
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{completed}/{todos.length}</span>
      </div>

      <div style={{ padding: 20, maxWidth: 500, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addTodo()} placeholder="Add task..." style={{ flex: 1, padding: '12px 16px', borderRadius: 10, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 14 }} />
          <button onClick={addTodo} style={{ padding: '12px 20px', borderRadius: 10, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Add</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {todos.map(todo => (
            <div key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-secondary)', borderRadius: 10, padding: 14, border: '1px solid var(--border-color)' }}>
              <button onClick={() => toggleTodo(todo.id)} style={{ width: 24, height: 24, borderRadius: todo.completed ? '50%' : '6px', border: todo.completed ? 'none' : '2px solid var(--border-color)', background: todo.completed ? '#10b981' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12 }}>
                {todo.completed && '✓'}
              </button>
              <span style={{ flex: 1, fontSize: 14, color: todo.completed ? 'var(--text-tertiary)' : 'var(--text-primary)', textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 14 }}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
