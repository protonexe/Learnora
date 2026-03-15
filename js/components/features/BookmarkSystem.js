const BookmarkSystem = ({ type = 'courses', showToast }) => {
  const [bookmarks, setBookmarks] = React.useState([]);
  const isMobile = window.innerWidth <= 768;

  React.useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = () => {
    const saved = localStorage.getItem(`learnora-bookmarks-${type}`) || '[]';
    setBookmarks(JSON.parse(saved));
  };

  const addBookmark = (item) => {
    const newBookmarks = [...bookmarks, { ...item, bookmarkedAt: Date.now() }];
    setBookmarks(newBookmarks);
    localStorage.setItem(`learnora-bookmarks-${type}`, JSON.stringify(newBookmarks));
    showToast?.('Added to bookmarks', 'success');
  };

  const removeBookmark = (itemId) => {
    const newBookmarks = bookmarks.filter(b => b.id !== itemId);
    setBookmarks(newBookmarks);
    localStorage.setItem(`learnora-bookmarks-${type}`, JSON.stringify(newBookmarks));
    showToast?.('Removed from bookmarks', 'info');
  };

  const isBookmarked = (itemId) => bookmarks.some(b => b.id === itemId);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    refresh: loadBookmarks
  };
};

const BookmarkButton = ({ item, type = 'courses', showToast }) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  React.useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem(`learnora-bookmarks-${type}`) || '[]');
    setIsBookmarked(bookmarks.some(b => b.id === item.id));
  }, [item.id, type]);

  const toggle = () => {
    const bookmarks = JSON.parse(localStorage.getItem(`learnora-bookmarks-${type}`) || '[]');
    let newBookmarks;
    
    if (isBookmarked) {
      newBookmarks = bookmarks.filter(b => b.id !== item.id);
      showToast?.('Removed from bookmarks', 'info');
    } else {
      newBookmarks = [...bookmarks, { ...item, bookmarkedAt: Date.now() }];
      showToast?.('Added to bookmarks', 'success');
    }
    
    localStorage.setItem(`learnora-bookmarks-${type}`, JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <button
      onClick={toggle}
      style={{
        background: 'var(--bg-tertiary)',
        border: 'none',
        padding: '8px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <Icon name="bookmark" size={18} color={isBookmarked ? 'var(--accent-blue)' : 'var(--text-secondary)'} />
    </button>
  );
};

const BookmarksView = ({ onBack, onNavigate }) => {
  const isMobile = window.innerWidth <= 768;
  const [activeTab, setActiveTab] = React.useState('courses');
  const [bookmarks, setBookmarks] = React.useState({ courses: [], quizzes: [], flashcards: [] });

  React.useEffect(() => {
    loadAllBookmarks();
  }, []);

  const loadAllBookmarks = () => {
    setBookmarks({
      courses: JSON.parse(localStorage.getItem('learnora-bookmarks-courses') || '[]'),
      quizzes: JSON.parse(localStorage.getItem('learnora-bookmarks-quizzes') || '[]'),
      flashcards: JSON.parse(localStorage.getItem('learnora-bookmarks-flashcards') || '[]'),
    });
  };

  const removeBookmark = (type, id) => {
    const newBookmarks = bookmarks[type].filter(b => b.id !== id);
    localStorage.setItem(`learnora-bookmarks-${type}`, JSON.stringify(newBookmarks));
    setBookmarks({ ...bookmarks, [type]: newBookmarks });
  };

  const tabs = [
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'quizzes', label: 'Quizzes', icon: '📝' },
    { id: 'flashcards', label: 'Flashcards', icon: '🗂️' },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: isMobile ? '8px 12px 80px' : '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <Icon name="arrow-left" size={20} />
        </button>
        <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700', margin: 0 }}>🔖 Bookmarks</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 16px',
              background: activeTab === tab.id ? 'var(--primary-500)' : 'var(--bg-tertiary)',
              color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {bookmarks[activeTab].length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🔖</span>
            <p style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>No bookmarks yet</p>
            <p style={{ fontSize: '14px', margin: 0 }}>Save your favorite courses, quizzes, and flashcards for quick access</p>
          </div>
        ) : (
          bookmarks[activeTab].map((item, idx) => (
            <div key={item.id || idx} style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: item.color || 'var(--primary-500)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                {item.icon || '📚'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.name || item.title}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>
                  {item.progress !== undefined ? `${item.progress}% complete` : item.description?.substring(0, 50) || 'Bookmarked item'}
                </p>
              </div>
              <button
                onClick={() => removeBookmark(activeTab, item.id)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: 'none',
                  padding: '8px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)'
                }}
              >
                <Icon name="trash-2" size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

window.BookmarkSystem = BookmarkSystem;
window.BookmarkButton = BookmarkButton;
window.BookmarksView = BookmarksView;
