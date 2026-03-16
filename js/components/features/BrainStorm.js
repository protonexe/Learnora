const BrainStorm = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [ideas, setIdeas] = React.useState(() => JSON.parse(localStorage.getItem('brainstorm-ideas') || '[]'));
  const [newIdea, setNewIdea] = React.useState('');
  const [selectedColor, setSelectedColor] = React.useState('#6366f1');

  React.useEffect(() => { localStorage.setItem('brainstorm-ideas', JSON.stringify(ideas)); }, [ideas]);

  const addIdea = () => {
    if (!newIdea.trim()) return;
    setIdeas([{ id: Date.now(), text: newIdea, color: selectedColor, x: Math.random() * 80 + 10, y: Math.random() * 60 + 20 }, ...ideas]);
    setNewIdea('');
  };

  const deleteIdea = (id) => setIdeas(ideas.filter(i => i.id !== id));

  const colors = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>💡 Brain Storm</h1>
      </div>

      <div style={styles.inputSection}>
        <input type="text" value={newIdea} onChange={(e) => setNewIdea(e.target.value)} placeholder="Type your idea..." style={styles.input} onKeyPress={(e) => e.key === 'Enter' && addIdea()} />
        <div style={styles.colorPicker}>
          {colors.map(c => <button key={c} onClick={() => setSelectedColor(c)} style={{ ...styles.colorBtn, background: c, border: selectedColor === c ? '3px solid #fff' : 'none' }} />)}
        </div>
        <button onClick={addIdea} style={styles.addButton}>Add</button>
      </div>

      <div style={styles.canvas}>
        {ideas.length === 0 ? (
          <p style={styles.emptyText}>Start brainstorming! Add your ideas above.</p>
        ) : (
          ideas.map(idea => (
            <div key={idea.id} style={{ ...styles.ideaBubble, background: idea.color, left: `${idea.x}%`, top: `${idea.y}%` }}>
              <span>{idea.text}</span>
              <button onClick={() => deleteIdea(idea.id)} style={styles.deleteBtn}>×</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  inputSection: { display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center', flexWrap: 'wrap' },
  input: { flex: 1, minWidth: '200px', padding: '14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', fontSize: '14px', background: 'var(--bg-secondary)', color: 'var(--text-primary)' },
  colorPicker: { display: 'flex', gap: '8px' },
  colorBtn: { width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' },
  addButton: { padding: '14px 24px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-lg)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  canvas: { position: 'relative', height: '400px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' },
  emptyText: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--text-tertiary)' },
  ideaBubble: { position: 'absolute', padding: '12px 16px', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: '500', maxWidth: '150px', wordWrap: 'break-word', transform: 'translate(-50%, -50%)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
  deleteBtn: { position: 'absolute', top: '-8px', right: '-8px', width: '20px', height: '20px', background: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer', fontSize: '12px', color: '#333' }
};

window.BrainStorm = BrainStorm;
