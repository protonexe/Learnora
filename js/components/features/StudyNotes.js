const StudyNotes = ({ onClose }) => {
  const [notes, setNotes] = React.useState(() => {
    const saved = localStorage.getItem('learnora-study-notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showAdd, setShowAdd] = React.useState(false);
  const [newNote, setNewNote] = React.useState({ title: '', content: '', subject: '' });

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'English'];

  const saveNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem('learnora-study-notes', JSON.stringify(newNotes));
  };

  const addNote = () => {
    if (!newNote.title) return;
    saveNotes([...notes, { id: Date.now(), ...newNote, date: new Date().toISOString() }]);
    setNewNote({ title: '', content: '', subject: '' });
    setShowAdd(false);
  };

  const deleteNote = (id) => {
    saveNotes(notes.filter(n => n.id !== id));
  };

  const filtered = notes.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.content.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
            <h2 style={{ margin: 0, fontSize: 20 }}>📝 Study Notes</h2>
          </div>
          <button onClick={() => setShowAdd(true)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>+ Add</button>
        </div>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search notes..." style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: 14 }} />
      </div>

      <div style={{ padding: 20 }}>
        {showAdd && (
          <div style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, marginBottom: 20, border: '1px solid var(--border-color)' }}>
            <input type="text" value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} placeholder="Note title..." style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
            <textarea value={newNote.content} onChange={(e) => setNewNote({ ...newNote, content: e.target.value })} placeholder="Note content..." style={{ width: '100%', minHeight: 80, padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: 14, fontFamily: 'inherit', marginBottom: 12, resize: 'vertical' }} />
            <select value={newNote.subject} onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }}>
              <option value="">Select Subject</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={addNote} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Save Note</button>
              <button onClick={() => setShowAdd(false)} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>No notes found</div>
          ) : (
            filtered.map(note => (
              <div key={note.id} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 15, color: 'var(--text-primary)' }}>{note.title}</h3>
                  <button onClick={() => deleteNote(note.id)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 14 }}>🗑️</button>
                </div>
                <p style={{ margin: '0 0 8px 0', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{note.content.slice(0, 100)}{note.content.length > 100 ? '...' : ''}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-tertiary)' }}>
                  <span>{note.subject}</span>
                  <span>{new Date(note.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
