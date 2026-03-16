const DocumentManager = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const docs = [
    { id: 1, name: 'Math Notes.pdf', size: '2.4 MB', type: 'PDF' },
    { id: 2, name: 'Physics Cheat Sheet.docx', size: '1.1 MB', type: 'DOC' },
    { id: 3, name: 'Chemistry Formulas.pdf', size: '890 KB', type: 'PDF' },
  ];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.back}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>📁 Document Manager</h1>
      </div>

      <button style={styles.upload}>+ Upload Document</button>

      {docs.map(d => (
        <div key={d.id} style={styles.doc}>
          <span style={styles.icon}>{d.type === 'PDF' ? '📄' : '📝'}</span>
          <div style={styles.info}>
            <span style={styles.name}>{d.name}</span>
            <span style={styles.size}>{d.size}</span>
          </div>
          <button style={styles.download}>↓</button>
        </div>
      ))}
    </div>
  );
};

const styles = { back: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', cursor: 'pointer' }, upload: { width: '100%', padding: '16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }, doc: { display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px', marginBottom: '8px' }, icon: { fontSize: '32px' }, info: { flex: 1 }, name: { display: 'block', fontSize: '14px', fontWeight: 500 }, size: { fontSize: '12px', color: '#888' }, download: { padding: '8px 16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer' }};

window.DocumentManager = DocumentManager;
