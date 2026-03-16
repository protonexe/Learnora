const NoteEditor = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [content, setContent] = React.useState('');
  const [title, setTitle] = React.useState('');

  const save = () => {
    if (!title) return;
    showToast?.('Note saved!', 'success');
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.back}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>📝 Note Editor</h1>
      </div>

      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" style={styles.title} />
      
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Start writing..." style={styles.editor} rows={15} />
      
      <div style={styles.toolbar}>
        <button style={styles.btn}>B</button>
        <button style={styles.btn}>I</button>
        <button style={styles.btn}>U</button>
        <button style={styles.btn}>📷</button>
        <button style={styles.btn}>📎</button>
        <button onClick={save} style={styles.saveBtn}>Save</button>
      </div>
    </div>
  );
};

const styles = { back: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', cursor: 'pointer' }, title: { width: '100%', padding: '14px', fontSize: '18px', fontWeight: 600, border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '12px', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }, editor: { width: '100%', padding: '14px', fontSize: '14px', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '12px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical' }, toolbar: { display: 'flex', gap: '8px' }, btn: { width: '40px', height: '40px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }, saveBtn: { marginLeft: 'auto', padding: '10px 24px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }};

window.NoteEditor = NoteEditor;
