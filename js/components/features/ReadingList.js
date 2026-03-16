const ReadingList = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [books, setBooks] = React.useState(() => JSON.parse(localStorage.getItem('reading-list') || '[]'));
  const [showAdd, setShowAdd] = React.useState(false);
  const [newBook, setNewBook] = React.useState({ title: '', author: '', pages: '', currentPage: 0, status: 'reading' });

  React.useEffect(() => { localStorage.setItem('reading-list', JSON.stringify(books)); }, [books]);

  const addBook = () => {
    if (!newBook.title) return;
    setBooks([{ id: Date.now(), ...newBook }, ...books]);
    setNewBook({ title: '', author: '', pages: '', currentPage: 0, status: 'reading' });
    setShowAdd(false);
    showToast?.('Book added!', 'success');
  };

  const updateProgress = (id, page) => {
    setBooks(books.map(b => b.id === id ? { ...b, currentPage: page } : b));
  };

  const deleteBook = (id) => setBooks(books.filter(b => b.id !== id));

  const reading = books.filter(b => b.status === 'reading');
  const completed = books.filter(b => b.status === 'completed');

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>📖 Reading List</h1>
        </div>
        <button onClick={() => setShowAdd(true)} style={styles.addButton}><Icon name="plus" size={18} /> Add</button>
      </div>

      {showAdd && (
        <div style={styles.card}>
          <input type="text" value={newBook.title} onChange={(e) => setNewBook({...newBook, title: e.target.value})} placeholder="Book title" style={styles.input} />
          <input type="text" value={newBook.author} onChange={(e) => setNewBook({...newBook, author: e.target.value})} placeholder="Author" style={styles.input} />
          <input type="number" value={newBook.pages} onChange={(e) => setNewBook({...newBook, pages: e.target.value})} placeholder="Total pages" style={styles.input} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addBook} style={styles.primaryButton}>Add</button>
            <button onClick={() => setShowAdd(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <h3 style={styles.sectionTitle}>📚 Currently Reading ({reading.length})</h3>
        {reading.map(book => (
          <div key={book.id} style={styles.bookCard}>
            <div style={{ flex: 1 }}>
              <h3 style={styles.bookTitle}>{book.title}</h3>
              <p style={styles.bookAuthor}>{book.author}</p>
              <div style={styles.progressContainer}>
                <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: `${(book.currentPage / book.pages) * 100}%` }} /></div>
                <span style={styles.progressText}>{book.currentPage}/{book.pages} pages</span>
              </div>
            </div>
            <button onClick={() => deleteBook(book.id)} style={styles.deleteButton}>×</button>
          </div>
        ))}
      </div>

      {completed.length > 0 && (
        <div>
          <h3 style={styles.sectionTitle}>✅ Completed ({completed.length})</h3>
          {completed.map(book => (
            <div key={book.id} style={{ ...styles.bookCard, opacity: 0.7 }}>
              <h3 style={styles.bookTitle}>{book.title}</h3>
              <p style={styles.bookAuthor}>{book.author}</p>
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
  primaryButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  sectionTitle: { fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-secondary)' },
  bookCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: '12px', display: 'flex', gap: '12px' },
  bookTitle: { fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  bookAuthor: { fontSize: '13px', color: 'var(--text-tertiary)', margin: '4px 0 12px 0' },
  progressContainer: { display: 'flex', alignItems: 'center', gap: '12px' },
  progressBar: { flex: 1, height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' },
  progressFill: { height: '100%', background: 'var(--primary-500)', borderRadius: '4px' },
  progressText: { fontSize: '12px', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' },
  deleteButton: { background: 'transparent', border: 'none', fontSize: '20px', color: 'var(--text-tertiary)', cursor: 'pointer' }
};

window.ReadingList = ReadingList;
