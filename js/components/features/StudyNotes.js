const StudyNotes = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem('study-notes') || '[]'));
  const [showAdd, setShowAdd] = React.useState(false);
  const [newNote, setNewNote] = React.useState({ title: '', content: '', subject: '' });

  React.useEffect(() => { localStorage.setItem('study-notes', JSON.stringify(notes)); }, [notes]);

  const addNote = () => {
    if (!newNote.title) return;
    setNotes([{ id: Date.now(), ...newNote, createdAt: new Date().toISOString() }, ...notes]);
    setNewNote({ title: '', content: '', subject: '' });
    setShowAdd(false);
    showToast?.('Note saved!', 'success');
  };

  const deleteNote = (id) => setNotes(notes.filter(n => n.id !== id));

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'English', 'General'];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>📝 Study Notes</h1>
        </div>
        <button onClick={() => setShowAdd(true)} style={styles.addButton}><Icon name="plus" size={18} /> Add</button>
      </div>

      {showAdd && (
        <div style={styles.card}>
          <input type="text" value={newNote.title} onChange={(e) => setNewNote({...newNote, title: e.target.value})} placeholder="Note title" style={styles.input} />
          <select value={newNote.subject} onChange={(e) => setNewNote({...newNote, subject: e.target.value})} style={styles.select}>
            <option value="">Select subject</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <textarea value={newNote.content} onChange={(e) => setNewNote({...newNote, content: e.target.value})} placeholder="Write your notes..." style={styles.textarea} rows={4} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addNote} style={styles.primaryButton}>Save</button>
            <button onClick={() => setShowAdd(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      {notes.length === 0 ? (
        <div style={styles.emptyState}><p>No notes yet. Start taking notes!</p></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '16px' }}>
          {notes.map(note => (
            <div key={note.id} style={styles.noteCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={styles.noteTitle}>{note.title}</h3>
                  <span style={styles.noteSubject}>{note.subject}</span>
                </div>
                <button onClick={() => deleteNote(note.id)} style={styles.deleteButton}>×</button>
              </div>
              <p style={styles.noteContent}>{note.content}</p>
              <p style={styles.noteDate}>{new Date(note.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  addButton: { display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  input: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  select: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  textarea: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px', resize: 'vertical' },
  primaryButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '60px', color: 'var(--text-tertiary)' },
  noteCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px' },
  noteTitle: { fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  noteSubject: { fontSize: '12px', color: 'var(--primary-500)', marginTop: '4px', display: 'inline-block', padding: '2px 8px', background: 'var(--primary-100)', borderRadius: '4px' },
  noteContent: { fontSize: '14px', color: 'var(--text-secondary)', margin: '12px 0', lineHeight: '1.5' },
  noteDate: { fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 },
  deleteButton: { background: 'transparent', border: 'none', fontSize: '20px', color: 'var(--text-tertiary)', cursor: 'pointer' }
};

window.StudyNotes = StudyNotes;
