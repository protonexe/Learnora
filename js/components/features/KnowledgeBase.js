const KnowledgeBase = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const [search, setSearch] = React.useState('');
  
  const articles = [
    { id: 1, title: 'How to Use Pomodoro Technique', category: 'Study Tips', readTime: '5 min' },
    { id: 2, title: 'Effective Note-Taking Methods', category: 'Study Tips', readTime: '8 min' },
    { id: 3, title: 'Understanding Flashcards', category: 'Tools', readTime: '4 min' },
    { id: 4, title: 'Setting Study Goals', category: 'Productivity', readTime: '6 min' },
    { id: 5, title: 'Managing Exam Stress', category: 'Wellness', readTime: '7 min' },
    { id: 6, title: 'Building a Study Routine', category: 'Productivity', readTime: '10 min' },
  ];

  const filtered = articles.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>📖 Knowledge Base</h1>
      </div>

      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..." style={styles.searchInput} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map(article => (
          <div key={article.id} style={styles.articleCard}>
            <h3 style={styles.articleTitle}>{article.title}</h3>
            <div style={styles.articleMeta}>
              <span style={styles.category}>{article.category}</span>
              <span style={styles.readTime}>⏱️ {article.readTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  searchInput: { width: '100%', padding: '14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', fontSize: '14px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', marginBottom: '20px' },
  articleCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', cursor: 'pointer' },
  articleTitle: { fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0', color: 'var(--text-primary)' },
  articleMeta: { display: 'flex', gap: '16px' },
  category: { fontSize: '12px', color: 'var(--primary-500)', background: 'var(--primary-100)', padding: '2px 8px', borderRadius: '4px' },
  readTime: { fontSize: '12px', color: 'var(--text-tertiary)' }
};

window.KnowledgeBase = KnowledgeBase;
