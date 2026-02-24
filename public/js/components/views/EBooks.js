const EBooksView = ({ courses, onOpenBook, sampleBook, showToast }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('library'); // 'library' or 'search'
  const [totalResults, setTotalResults] = React.useState(0);
  const [searchError, setSearchError] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const RESULTS_PER_PAGE = 10;
  
  const isMobile = window.innerWidth <= 768;
  
  // Search Open Library API
  const performSearch = async (query, page = 1) => {
    if (!query.trim()) return;
    setIsSearching(true);
    setSearchError(null);
    
    try {
      const fields = 'key,title,author_name,first_publish_year,cover_i,edition_count,number_of_pages_median,language,publisher,subject';
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=${fields}&limit=${RESULTS_PER_PAGE}&page=${page}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform Open Library response to our format
      const results = (data.docs || []).map((doc, index) => ({
        id: doc.key || `book-${index}`,
        title: doc.title || 'Unknown Title',
        author: doc.author_name ? doc.author_name.join(', ') : 'Unknown Author',
        year: doc.first_publish_year || 'N/A',
        coverId: doc.cover_i,
        editionCount: doc.edition_count || 1,
        pages: doc.number_of_pages_median || null,
        languages: doc.language ? doc.language.slice(0, 3) : [],
        publisher: doc.publisher ? doc.publisher[0] : null,
        subjects: doc.subject ? doc.subject.slice(0, 3) : [],
        openLibraryKey: doc.key
      }));
      
      setSearchResults(results);
      setTotalResults(data.numFound || 0);
      setCurrentPage(page);
    } catch (error) {
      console.error('Open Library search error:', error);
      setSearchError(error.message || 'Failed to search. Please try again.');
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchQuery, 1);
  };
  
  const handlePageChange = (newPage) => {
    performSearch(searchQuery, newPage);
  };
  
  const openOnOpenLibrary = (book) => {
    const url = `https://openlibrary.org${book.openLibraryKey}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  const getCoverUrl = (coverId, size = 'M') => {
    if (!coverId) return null;
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  };
  
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

  return (
    <>
      <AnimatedCard delay={50}>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.02em' }}>
            E-Book Library
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
            Access textbooks, references, and study materials
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div style={{ 
          display: 'flex', 
          gap: '6px', 
          marginBottom: '16px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '10px'
        }}>
          <button
            onClick={() => setActiveTab('library')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--border-strong)',
              background: activeTab === 'library' ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
              color: activeTab === 'library' ? 'white' : 'var(--text-secondary)',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Icon name="book-open" size={16} />
            My Library
          </button>
          <button
            onClick={() => setActiveTab('search')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--border-strong)',
              background: activeTab === 'search' ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
              color: activeTab === 'search' ? 'white' : 'var(--text-secondary)',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Icon name="search" size={16} />
            Search Books
          </button>
        </div>
      </AnimatedCard>
      
      {activeTab === 'library' ? (
        /* Course Books Library */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
          {courses.map((course, idx) => (
            <AnimatedCard key={course.id} delay={100 + idx * 60}>
              <Card hover elevated style={{ padding: '12px' }}>
                <div style={{ 
                  height: '120px', 
                  background: `linear-gradient(135deg, ${course.color}20 0%, ${course.color}08 100%)`, 
                  borderRadius: 'var(--radius-md)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '40px', 
                  marginBottom: '12px' 
                }}>
                  {course.icon}
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>
                  {course.name} Textbook
                </h4>
                <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
                  3 chapters • 45 min read
                </p>
                <Button 
                  fullWidth 
                  variant="secondary" 
                  icon="book-open" 
                  size="sm"
                  onClick={() => onOpenBook({...sampleBook, title: `${course.name} Textbook`})}
                  style={{ fontSize: '12px' }}
                >
                  Read Now
                </Button>
              </Card>
            </AnimatedCard>
          ))}
        </div>
      ) : (
        /* Open Library Search Section */
        <>
          <AnimatedCard delay={100}>
            <Card elevated style={{ padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600' }}>
                  Search Open Library
                </h3>
                <a 
                  href="https://openlibrary.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    fontSize: '11px', 
                    color: 'var(--accent-blue)', 
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  openlibrary.org
                  <Icon name="external-link" size={12} />
                </a>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
                Search millions of free books from the Internet Archive's Open Library
              </p>
              <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '8px' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for books, authors, subjects..."
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    outline: 'none',
                    width: isMobile ? '100%' : 'auto'
                  }}
                />
                <Button 
                  type="submit"
                  icon="search" 
                  size="sm"
                  disabled={isSearching || !searchQuery.trim()}
                  style={{ 
                    padding: '10px 16px',
                    opacity: isSearching || !searchQuery.trim() ? 0.6 : 1,
                    width: isMobile ? '100%' : 'auto'
                  }}
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </form>
              
              {isSearching && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '32px',
                  gap: '8px',
                  color: 'var(--text-tertiary)'
                }}>
                  <div style={{ 
                    width: '18px', 
                    height: '18px', 
                    border: '2px solid var(--border-color)', 
                    borderTopColor: 'var(--accent-blue)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Searching Open Library...
                </div>
              )}
              
              {searchError && (
                <div style={{ 
                  marginTop: '12px',
                  padding: '12px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--danger)',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Icon name="alert-circle" size={16} />
                  {searchError}
                </div>
              )}
            </Card>
          </AnimatedCard>
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <AnimatedCard delay={200}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600' }}>
                    Search Results ({totalResults.toLocaleString()} found)
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    Page {currentPage} of {totalPages.toLocaleString()} • Powered by Open Library
                  </span>
                </div>
                
                {searchResults.map((book, idx) => (
                  <Card 
                    key={book.id} 
                    elevated 
                    style={{ 
                      padding: isMobile ? '12px' : '16px',
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: isMobile ? '12px' : '16px',
                      alignItems: isMobile ? 'center' : 'flex-start'
                    }}
                  >
                    {/* Book Cover */}
                    <div style={{
                      width: isMobile ? '60px' : '80px',
                      height: isMobile ? '80px' : '110px',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1px solid var(--border-color)',
                      overflow: 'hidden'
                    }}>
                      {book.coverId ? (
                        <img 
                          src={getCoverUrl(book.coverId, 'M')}
                          alt={book.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = '<span style="font-size: 32px;">📚</span>';
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: '32px' }}>📚</span>
                      )}
                    </div>
                    
                    {/* Book Info */}
                    <div style={{ flex: 1, minWidth: 0, textAlign: isMobile ? 'center' : 'left' }}>
                      <h4 style={{ 
                        fontSize: isMobile ? '14px' : '15px',
                        fontWeight: '600', 
                        marginBottom: '4px',
                        lineHeight: '1.3'
                      }}>
                        {book.title}
                      </h4>
                      <p style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        {book.author} {book.year !== 'N/A' && `• ${book.year}`}
                      </p>
                      
                      {/* Meta Info */}
                      <div style={{ 
                        display: 'flex', 
                        gap: isMobile ? '4px' : '8px',
                        fontSize: isMobile ? '11px' : '12px',
                        color: 'var(--text-tertiary)',
                        flexWrap: 'wrap',
                        marginBottom: '8px',
                        justifyContent: isMobile ? 'center' : 'flex-start'
                      }}>
                        {book.editionCount > 1 && (
                          <span style={{ 
                            padding: isMobile ? '1px 6px' : '2px 8px',
                            background: 'var(--bg-tertiary)', 
                            borderRadius: 'var(--radius-sm)'
                          }}>
                            {book.editionCount} editions
                          </span>
                        )}
                        {book.pages && (
                          <span style={{ 
                            padding: isMobile ? '1px 6px' : '2px 8px',
                            background: 'var(--bg-tertiary)', 
                            borderRadius: 'var(--radius-sm)'
                          }}>
                            ~{book.pages} pages
                          </span>
                        )}
                        {book.languages.length > 0 && (
                          <span style={{ 
                            padding: isMobile ? '1px 6px' : '2px 8px',
                            background: 'var(--bg-tertiary)', 
                            borderRadius: 'var(--radius-sm)'
                          }}>
                            {book.languages.join(', ').toUpperCase()}
                          </span>
                        )}
                      </div>
                      
                      {/* Subjects */}
                      {book.subjects.length > 0 && (
                        <div style={{ 
                          fontSize: isMobile ? '10px' : '11px',
                          color: 'var(--text-tertiary)',
                          marginBottom: '4px'
                        }}>
                          {book.subjects.slice(0, 3).join(' • ')}
                        </div>
                      )}
                      
                      {/* Source Label */}
                      <div style={{ 
                        fontSize: isMobile ? '10px' : '11px',
                        color: 'var(--accent-blue)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        justifyContent: isMobile ? 'center' : 'flex-start'
                      }}>
                        <Icon name="book" size={12} />
                        Open Library
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: isMobile ? 'row' : 'column',
                      gap: '8px', 
                      flexShrink: 0,
                      justifyContent: isMobile ? 'center' : 'flex-start',
                      width: isMobile ? '100%' : 'auto'
                    }}>
                      <Button 
                        size="sm"
                        icon="external-link"
                        onClick={() => openOnOpenLibrary(book)}
                        style={{ 
                          fontSize: isMobile ? '11px' : '12px',
                          width: isMobile ? '100%' : 'auto'
                        }}
                      >
                        View on Open Library
                      </Button>
                    </div>
                  </Card>
                ))}
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'row' : 'row',
                    justifyContent: 'center', 
                    alignItems: 'center',
                    gap: isMobile ? '4px' : '8px',
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      icon="chevron-left"
                      disabled={currentPage === 1 || isSearching}
                      onClick={() => handlePageChange(currentPage - 1)}
                      style={{ 
                        padding: isMobile ? '6px 8px' : '8px 12px',
                        minWidth: isMobile ? '36px' : 'auto'
                      }}
                    >
                      {isMobile ? '' : 'Previous'}
                    </Button>
                    <span style={{ 
                      fontSize: isMobile ? '12px' : '13px',
                      color: 'var(--text-secondary)',
                      padding: isMobile ? '0 8px' : '0 12px',
                      whiteSpace: 'nowrap'
                    }}>
                      {isMobile ? `${currentPage}/${totalPages}` : `Page ${currentPage} of ${totalPages.toLocaleString()}`}
                    </span>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      iconRight="chevron-right"
                      disabled={currentPage >= totalPages || isSearching}
                      onClick={() => handlePageChange(currentPage + 1)}
                      style={{ 
                        padding: isMobile ? '6px 8px' : '8px 12px',
                        minWidth: isMobile ? '36px' : 'auto'
                      }}
                    >
                      {isMobile ? '' : 'Next'}
                    </Button>
                  </div>
                )}
              </div>
            </AnimatedCard>
          )}
          
          {/* No Results State */}
          {searchResults.length === 0 && searchQuery && !isSearching && !searchError && (
            <AnimatedCard delay={200}>
              <Card elevated style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  No results found
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                  Try different keywords or check your spelling
                </p>
              </Card>
            </AnimatedCard>
          )}
          
          {/* Initial State - Search Tips */}
          {!searchQuery && searchResults.length === 0 && (
            <AnimatedCard delay={200}>
              <Card elevated style={{ padding: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                  Search Tips
                </h4>
                <ul style={{ 
                  fontSize: '13px', 
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  paddingLeft: '20px',
                  margin: 0
                }}>
                  <li>Search by title: <code style={{ background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: '4px' }}>the lord of the rings</code></li>
                  <li>Search by author: <code style={{ background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: '4px' }}>author:tolkien</code></li>
                  <li>Search by subject: <code style={{ background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: '4px' }}>subject:mathematics</code></li>
                  <li>Combine searches: <code style={{ background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: '4px' }}>physics author:feynman</code></li>
                </ul>
              </Card>
            </AnimatedCard>
          )}
        </>
      )}
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

window.EBooksView = EBooksView;
