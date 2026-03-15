const GlobalSearch = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (query.trim().length > 0) {
      performSearch(query);
    } else {
      setResults([]);
    }
  }, [query]);

  const performSearch = async (searchQuery) => {
    setIsSearching(true);
    const searchResults = [];
    const q = searchQuery.toLowerCase();

    if (window.Database) {
      const db = window.Database;
      
      const courses = db.getAllCourses() || [];
      courses.forEach(course => {
        if (course.name?.toLowerCase().includes(q) || course.description?.toLowerCase().includes(q)) {
          searchResults.push({ type: 'course', title: course.name, subtitle: course.description || 'Course', icon: course.icon || '📚', action: () => onNavigate('courses') });
        }
      });

      const quizzes = db.getAllQuizzes() || [];
      quizzes.forEach(quiz => {
        if (quiz.title?.toLowerCase().includes(q)) {
          searchResults.push({ type: 'quiz', title: quiz.title, subtitle: `${quiz.questions?.length || 0} questions`, icon: '📝', action: () => onNavigate('quizzes') });
        }
      });

      const flashcards = db.getAllFlashcardDecks() || [];
      flashcards.forEach(deck => {
        if (deck.title?.toLowerCase().includes(q)) {
          searchResults.push({ type: 'flashcard', title: deck.title, subtitle: `${deck.cards?.length || 0} cards`, icon: '🗂️', action: () => onNavigate('flashcards') });
        }
      });

      const assignments = db.getAllAssignments() || [];
      assignments.forEach(assignment => {
        if (assignment.title?.toLowerCase().includes(q) || assignment.subject?.toLowerCase().includes(q)) {
          searchResults.push({ type: 'assignment', title: assignment.title, subtitle: assignment.subject || 'Assignment', icon: '📋', action: () => onNavigate('assignments') });
        }
      });
    }

    const notes = JSON.parse(localStorage.getItem('learnora-notes') || '[]');
    notes.forEach(note => {
      if (note.title?.toLowerCase().includes(q) || note.content?.toLowerCase().includes(q)) {
        searchResults.push({ type: 'note', title: note.title || 'Untitled', subtitle: note.content?.substring(0, 50), icon: '📝', action: () => onNavigate('notes') });
      }
    });

    const navItems = [
      { type: 'nav', title: 'Dashboard', subtitle: 'Go to Dashboard', icon: '🏠', action: () => onNavigate('dashboard') },
      { type: 'nav', title: 'Courses', subtitle: 'Browse Courses', icon: '📚', action: () => onNavigate('courses') },
      { type: 'nav', title: 'Quizzes', subtitle: 'Take Quizzes', icon: '📝', action: () => onNavigate('quizzes') },
      { type: 'nav', title: 'Flashcards', subtitle: 'Study Flashcards', icon: '🗂️', action: () => onNavigate('flashcards') },
      { type: 'nav', title: 'Analytics', subtitle: 'View Analytics', icon: '📊', action: () => onNavigate('analytics') },
      { type: 'nav', title: 'Calendar', subtitle: 'View Calendar', icon: '📅', action: () => onNavigate('calendar') },
      { type: 'nav', title: 'Settings', subtitle: 'App Settings', icon: '⚙️', action: () => onNavigate('settings') },
    ];
    
    navItems.forEach(item => {
      if (item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)) {
        searchResults.push(item);
      }
    });

    setResults(searchResults.slice(0, 10));
    setIsSearching(false);
  };

  const handleResultClick = (result) => {
    result.action?.();
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '100px', zIndex: 2000 }} onClick={onClose}>
      <div style={{ width: '100%', maxWidth: '600px', background: 'var(--bg-secondary)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', margin: '0 20px' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search courses, quizzes, notes..."
            style={{ flex: 1, background: 'transparent', border: 'none', fontSize: '16px', outline: 'none', color: 'var(--text-primary)' }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              ✕
            </button>
          )}
        </div>
        
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {query.trim().length === 0 && (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <p style={{ margin: 0, fontSize: '14px' }}>Start typing to search...</p>
            </div>
          )}
          
          {isSearching && (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <p style={{ margin: 0, fontSize: '14px' }}>Searching...</p>
            </div>
          )}
          
          {!isSearching && results.length > 0 && (
            <div>
              {results.map((result, idx) => (
                <div key={idx} onClick={() => handleResultClick(result)} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ width: '36px', height: '36px', background: 'var(--bg-tertiary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                    {result.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{result.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{result.subtitle}</div>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'capitalize' }}>{result.type}</div>
                </div>
              ))}
            </div>
          )}
          
          {!isSearching && query.trim().length > 0 && results.length === 0 && (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <p style={{ margin: 0, fontSize: '14px' }}>No results found for "{query}"</p>
            </div>
          )}
        </div>
        
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--text-tertiary)' }}>
            <span>↵ to select</span>
            <span>↑↓ to navigate</span>
            <span>esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

window.GlobalSearch = GlobalSearch;
