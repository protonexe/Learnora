const LearningGallery = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [items, setItems] = React.useState(() => JSON.parse(localStorage.getItem('learning-gallery') || '[]'));
  const [showAdd, setShowAdd] = React.useState(false);
  const [newItem, setNewItem] = React.useState({ title: '', type: 'image', url: '', description: '' });

  React.useEffect(() => { localStorage.setItem('learning-gallery', JSON.stringify(items)); }, [items]);

  const addItem = () => {
    if (!newItem.title) return;
    setItems([{ id: Date.now(), ...newItem, createdAt: new Date().toISOString() }, ...items]);
    setNewItem({ title: '', type: 'image', url: '', description: '' });
    setShowAdd(false);
    showToast?.('Item added to gallery!', 'success');
  };

  const deleteItem = (id) => setItems(items.filter(i => i.id !== id));

  const typeIcons = { image: '🖼️', video: '🎬', document: '📄', link: '🔗' };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>🖼️ Learning Gallery</h1>
        </div>
        <button onClick={() => setShowAdd(true)} style={styles.addButton}>+ Add</button>
      </div>

      {showAdd && (
        <div style={styles.card}>
          <input type="text" value={newItem.title} onChange={(e) => setNewItem({...newItem, title: e.target.value})} placeholder="Title" style={styles.input} />
          <input type="text" value={newItem.url} onChange={(e) => setNewItem({...newItem, url: e.target.value})} placeholder="Image/Video URL" style={styles.input} />
          <textarea value={newItem.description} onChange={(e) => setNewItem({...newItem, description: e.target.value})} placeholder="Description" style={styles.textarea} rows={2} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addItem} style={styles.primaryButton}>Add</button>
            <button onClick={() => setShowAdd(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div style={styles.emptyState}><p>No items in gallery yet.</p><p>Save images, links, and resources!</p></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
          {items.map(item => (
            <div key={item.id} style={styles.itemCard}>
              <div style={styles.itemPreview}>
                {item.url ? <img src={item.url} alt={item.title} style={styles.itemImage} /> : <span style={styles.itemIcon}>{typeIcons[item.type]}</span>}
              </div>
              <h3 style={styles.itemTitle}>{item.title}</h3>
              {item.description && <p style={styles.itemDesc}>{item.description}</p>}
              <button onClick={() => deleteItem(item.id)} style={styles.deleteButton}>🗑️</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  addButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  input: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  textarea: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px', resize: 'vertical' },
  primaryButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '60px', color: 'var(--text-tertiary)' },
  itemCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative' },
  itemPreview: { height: '120px', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  itemImage: { width: '100%', height: '100%', objectFit: 'cover' },
  itemIcon: { fontSize: '48px' },
  itemTitle: { fontSize: '14px', fontWeight: '600', margin: '12px 12px 4px', color: 'var(--text-primary)' },
  itemDesc: { fontSize: '12px', color: 'var(--text-tertiary)', margin: '0 12px 12px', paddingBottom: '32px' },
  deleteButton: { position: 'absolute', bottom: '8px', right: '8px', background: 'transparent', border: 'none', cursor: 'pointer' }
};

window.LearningGallery = LearningGallery;
