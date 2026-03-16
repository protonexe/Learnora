const QuickNotes = ({ onBack, showToast }) => {
  const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem('quick-notes')) || []);
  const [newNote, setNewNote] = React.useState('');
  const [filter, setFilter] = React.useState('all');

  const addNote = () => {
    if (!newNote.trim()) return;
    const note = { id: Date.now(), text: newNote, pinned: false, createdAt: new Date().toISOString() };
    const updated = [note, ...notes];
    setNotes(updated);
    localStorage.setItem('quick-notes', JSON.stringify(updated));
    setNewNote('');
    showToast?.('Note added!', 'success');
  };

  const togglePin = (id) => {
    const updated = notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n);
    setNotes(updated);
    localStorage.setItem('quick-notes', JSON.stringify(updated));
  };

  const deleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    localStorage.setItem('quick-notes', JSON.stringify(updated));
  };

  const filteredNotes = filter === 'pinned' ? notes.filter(n => n.pinned) : notes;
  const sortedNotes = [...filteredNotes].sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Quick Notes</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Type a quick note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addNote()}
            style={{ flex: 1, padding: '15px', borderRadius: '12px', border: '2px solid #e5e7eb', fontSize: '16px' }}
          />
          <button
            onClick={addNote}
            style={{ padding: '15px 25px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' }}
          >
            Add
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {['all', 'pinned'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{ padding: '8px 16px', border: 'none', borderRadius: '20px', background: filter === f ? '#1f2937' : '#e5e7eb', color: filter === f ? 'white' : '#6b7280', cursor: 'pointer', textTransform: 'capitalize' }}
            >
              {f}
            </button>
          ))}
        </div>

        {sortedNotes.length === 0 && (
          <div style={{ textAlign: 'center', color: '#9ca3af', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📝</div>
            <p>No notes yet</p>
          </div>
        )}

        <div style={{ display: 'grid', gap: '12px' }}>
          {sortedNotes.map(note => (
            <div key={note.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <button
                onClick={() => togglePin(note.id)}
                style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', opacity: note.pinned ? 1 : 0.3 }}
              >
                📌
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#1f2937' }}>{note.text}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '5px' }}>
                  {new Date(note.createdAt).toLocaleString()}
                </div>
              </div>
              <button onClick={() => deleteNote(note.id)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '18px' }}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.QuickNotes = QuickNotes;
