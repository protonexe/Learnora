const NotesWidget = ({ onClose }) => {
  const [notes, setNotes] = React.useState(() => {
    const saved = localStorage.getItem('learnora-notes-widget');
    return saved ? JSON.parse(saved) : [];
  });
  const [newNote, setNewNote] = React.useState('');

  const saveNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem('learnora-notes-widget', JSON.stringify(newNotes));
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    saveNotes([{ id: Date.now(), text: newNote, date: new Date().toISOString() }, ...notes]);
    setNewNote('');
  };

  const deleteNote = (id) => {
    saveNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>← Back</button>
          <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>📋 Quick Notes</h2>
        </div>
      </div>

      <div style={{ padding: 20, maxWidth: 500, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addNote()} placeholder="Add a quick note..." style={{ flex: 1, padding: '12px 16px', borderRadius: 10, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 14 }} />
          <button onClick={addNote} style={{ padding: '12px 20px', borderRadius: 10, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Add</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {notes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>No notes yet</div>
          ) : (
            notes.map(note => (
              <div key={note.id} style={{ background: 'var(--bg-secondary)', borderRadius: 10, padding: 14, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ flex: 1, fontSize: 14, color: 'var(--text-primary)' }}>{note.text}</span>
                <button onClick={() => deleteNote(note.id)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 14 }}>×</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
