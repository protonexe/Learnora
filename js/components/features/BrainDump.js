const BrainDump = ({ onBack, showToast }) => {
  const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem('brain-dump')) || []);

  const addNote = () => {
    const text = prompt('What\'s on your mind?');
    if (text) {
      const note = { id: Date.now(), text, date: new Date().toISOString() };
      const updated = [note, ...notes];
      setNotes(updated);
      localStorage.setItem('brain-dump', JSON.stringify(updated));
      showToast?.('Note saved!', 'success');
    }
  };

  const deleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    localStorage.setItem('brain-dump', JSON.stringify(updated));
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Brain Dump</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <button onClick={addNote} style={{ width: '100%', padding: '18px', background: '#1f2937', color: 'white', border: 'none', borderRadius: '15px', cursor: 'pointer', marginBottom: '25px', fontWeight: '600', fontSize: '16px' }}>
          + Dump Your Thoughts
        </button>
        {notes.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#9ca3af', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🧠</div>
            <p>Clear your mind</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {notes.map(n => (
              <div key={n.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ color: '#1f2937', marginBottom: '8px' }}>{n.text}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>{new Date(n.date).toLocaleString()}</span>
                  <button onClick={() => deleteNote(n.id)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>×</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

window.BrainDump = BrainDump;
