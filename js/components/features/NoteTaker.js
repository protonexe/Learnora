const NoteTaker = ({ onBack, showToast }) => {
  const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem('app-notes')) || []);
  const [text, setText] = React.useState('');

  const save = () => {
    if (!text.trim()) return;
    const note = { id: Date.now(), text, date: new Date().toISOString() };
    const updated = [note, ...notes];
    setNotes(updated);
    localStorage.setItem('app-notes', JSON.stringify(updated));
    setText('');
    showToast?.('Note saved!', 'success');
  };

  const del = (id) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    localStorage.setItem('app-notes', JSON.stringify(updated));
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Note Taker</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a note..." style={{ width: '100%', height: '120px', padding: '15px', borderRadius: '12px', border: '2px solid #e5e7eb', marginBottom: '15px', fontSize: '16px', resize: 'none' }} />
        <button onClick={save} style={{ width: '100%', padding: '15px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', marginBottom: '20px' }}>Save Note</button>
        <div style={{ display: 'grid', gap: '12px' }}>
          {notes.map(n => (
            <div key={n.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', position: 'relative' }}>
              <p style={{ margin: 0, color: '#1f2937' }}>{n.text}</p>
              <small style={{ color: '#9ca3af' }}>{new Date(n.date).toLocaleString()}</small>
              <button onClick={() => del(n.id)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.NoteTaker = NoteTaker;
