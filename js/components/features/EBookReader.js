const EBookReader = ({ book, onClose }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [fontSize, setFontSize] = React.useState(17);
  const { theme, toggleTheme } = useTheme();
  
  const pages = book.content || SampleData.sampleBook.content;
  const progress = ((currentPage + 1) / pages.length) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '70vh' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingBottom: '20px', 
        borderBottom: '1px solid var(--border-color)', 
        marginBottom: '20px' 
      }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px', letterSpacing: '-0.01em' }}>
            {book.title}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
            Page {currentPage + 1} of {pages.length}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setFontSize(Math.max(13, fontSize - 2))} 
            style={{ 
              background: 'var(--bg-tertiary)', 
              border: '2px solid var(--border-strong)', 
              padding: '10px 14px', 
              borderRadius: 'var(--radius-sm)', 
              cursor: 'pointer', 
              fontWeight: '600',
              fontSize: '14px',
              color: 'var(--text-secondary)'
            }}
          >
            A-
          </button>
          <button 
            onClick={() => setFontSize(Math.min(24, fontSize + 2))} 
            style={{ 
              background: 'var(--bg-tertiary)', 
              border: '2px solid var(--border-strong)', 
              padding: '10px 14px', 
              borderRadius: 'var(--radius-sm)', 
              cursor: 'pointer', 
              fontWeight: '600',
              fontSize: '14px',
              color: 'var(--text-secondary)'
            }}
          >
            A+
          </button>
          <button 
            onClick={toggleTheme} 
            style={{ 
              background: 'var(--bg-tertiary)', 
              border: '1px solid var(--border-light)', 
              width: '44px', 
              height: '44px', 
              borderRadius: 'var(--radius-sm)', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} color="var(--text-secondary)" />
          </button>
        </div>
      </div>
      
      <ProgressBar value={progress} height={4} color="var(--gradient-cool)" />
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 0' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '24px', letterSpacing: '-0.02em' }}>
          {pages[currentPage].title}
        </h2>
        <div style={{ 
          fontSize: `${fontSize}px`, 
          lineHeight: '1.9', 
          color: 'var(--text-secondary)', 
          whiteSpace: 'pre-wrap' 
        }}>
          {pages[currentPage].content}
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingTop: '20px', 
        borderTop: '1px solid var(--border-color)', 
        marginTop: '20px' 
      }}>
        <Button 
          variant="secondary" 
          icon="chevron-left" 
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))} 
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <Badge variant="primary">{Math.round(progress)}% complete</Badge>
        <Button 
          iconRight="chevron-right" 
          onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))} 
          disabled={currentPage === pages.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

window.EBookReader = EBookReader;