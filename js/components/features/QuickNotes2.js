const QuickNotes2 = ({ onBack, showToast }) => {
  const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem('quick-notes-2')) || []);

  const add = () => {
    const text = prompt('Note:');
    if (text) {
      const updated = [{ id: Date.now(), text, date: new Date().toISOString() }, ...notes];
      setNotes(updated);
      localStorage.setItem('quick-notes-2', JSON.stringify(updated));
    }
  };

  const del = (id) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    localStorage.setItem('quick-notes-2', JSON.stringify(updated));
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Quick Notes</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <button onClick={add} style={{ width: '100%', padding: '15px', background: '#1f2937', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', marginBottom: '20px' }}>+ Add Note</button>
        <div style={{ display: 'grid', gap: '12px' }}>
          {notes.map(n => (
            <div key={n.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{n.text}</span>
              <button onClick={() => del(n.id)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.QuickNotes2 = QuickNotes2;
