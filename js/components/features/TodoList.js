const TodoList = ({ onBack, showToast }) => {
  const [todos, setTodos] = React.useState(() => JSON.parse(localStorage.getItem('app-todos')) || []);
  const [text, setText] = React.useState('');

  const add = () => {
    if (!text.trim()) return;
    const newTodo = { id: Date.now(), text, done: false };
    const updated = [...todos, newTodo];
    setTodos(updated);
    localStorage.setItem('app-todos', JSON.stringify(updated));
    setText('');
    showToast?.('Task added!', 'success');
  };

  const toggle = (id) => {
    const updated = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setTodos(updated);
    localStorage.setItem('app-todos', JSON.stringify(updated));
  };

  const del = (id) => {
    const updated = todos.filter(t => t.id !== id);
    setTodos(updated);
    localStorage.setItem('app-todos', JSON.stringify(updated));
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Todo List</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="Add a task..."
            style={{ flex: 1, padding: '15px', borderRadius: '12px', border: '2px solid #e5e7eb', fontSize: '16px' }}
          />
          <button onClick={add} style={{ padding: '15px 25px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' }}>Add</button>
        </div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {todos.map(todo => (
            <div key={todo.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div onClick={() => toggle(todo.id)} style={{ width: '24px', height: '24px', borderRadius: '6px', border: todo.done ? 'none' : '2px solid #6366f1', background: todo.done ? '#10b981' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                {todo.done && '✓'}
              </div>
              <span style={{ flex: 1, textDecoration: todo.done ? 'line-through' : 'none', opacity: todo.done ? 0.6 : 1 }}>{todo.text}</span>
              <button onClick={() => del(todo.id)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '18px' }}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.TodoList = TodoList;
