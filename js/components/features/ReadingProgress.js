import React from 'react';
import { BookMarked, Clock, ChevronLeft, ChevronRight, List, Settings, Maximize, Minimize } from './Icon';

const ReadingProgress = ({ book, onClose }) => {
  const [currentPage, setCurrentPage] = React.useState(book?.currentPage || 1);
  const [totalPages, setTotalPages] = React.useState(book?.totalPages || 100);
  const [fontSize, setFontSize] = React.useState(18);
  const [showToc, setShowToc] = React.useState(false);
  const [fullscreen, setFullscreen] = React.useState(false);
  const [readingTime, setReadingTime] = React.useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => setReadingTime(t => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);
  
  const progress = (currentPage / totalPages) * 100;
  const chapters = book?.chapters || [
    { title: 'Chapter 1: Introduction', page: 1 },
    { title: 'Chapter 2: Getting Started', page: 15 },
    { title: 'Chapter 3: Core Concepts', page: 35 },
    { title: 'Chapter 4: Advanced Topics', page: 60 },
    { title: 'Chapter 5: Conclusion', page: 90 },
  ];
  
  const formatTime = (mins) => {
    if (mins < 60) return `${mins} min read`;
    return `${Math.floor(mins / 60)}h ${mins % 60}m read`;
  };
  
  const currentChapter = chapters.find((c, i) => {
    const nextChapter = chapters[i + 1];
    return currentPage >= c.page && (!nextChapter || currentPage < nextChapter.page);
  });
  
  return (
    <div style={{
      position: fullscreen ? 'fixed' : 'relative',
      top: fullscreen ? 0 : 'auto',
      left: fullscreen ? 0 : 'auto',
      right: fullscreen ? 0 : 'auto',
      bottom: fullscreen ? 0 : 'auto',
      background: '#1a1a2e',
      color: '#e4e4e7',
      height: fullscreen ? '100vh' : 'auto',
      display: 'flex',
      flexDirection: 'column',
      zIndex: fullscreen ? 1000 : 'auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        background: '#16162a',
        borderBottom: '1px solid #2d2d4a'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onClose}
            style={{
              padding: 8,
              borderRadius: 6,
              border: 'none',
              background: 'transparent',
              color: '#a1a1aa',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <div style={{ fontWeight: 600 }}>{book?.title || 'Untitled Book'}</div>
            <div style={{ fontSize: 12, color: '#71717a' }}>
              {currentChapter?.title} • Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setShowToc(!showToc)}
            style={{
              padding: 8,
              borderRadius: 6,
              border: 'none',
              background: showToc ? '#3b82f6' : 'transparent',
              color: showToc ? 'white' : '#a1a1aa',
              cursor: 'pointer'
            }}
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setFullscreen(!fullscreen)}
            style={{
              padding: 8,
              borderRadius: 6,
              border: 'none',
              background: 'transparent',
              color: '#a1a1aa',
              cursor: 'pointer'
            }}
          >
            {fullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </div>
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {showToc && (
          <div style={{
            width: 280,
            background: '#16162a',
            borderRight: '1px solid #2d2d4a',
            overflow: 'auto',
            padding: 16
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: 14, color: '#71717a' }}>TABLE OF CONTENTS</h3>
            {chapters.map((chapter, i) => (
              <div
                key={i}
                onClick={() => setCurrentPage(chapter.page)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  marginBottom: 4,
                  background: currentPage >= chapter.page && (!chapters[i + 1] || currentPage < chapters[i + 1].page) ? '#3b82f6' : 'transparent',
                  color: currentPage >= chapter.page ? 'white' : '#a1a1aa'
                }}
              >
                {chapter.title}
              </div>
            ))}
          </div>
        )}
        
        <div style={{
          flex: 1,
          padding: '40px 60px',
          overflow: 'auto',
          maxWidth: 800,
          margin: '0 auto'
        }}>
          <div style={{
            fontSize,
            lineHeight: 1.8,
            textAlign: 'justify'
          }}>
            <p style={{ marginBottom: 24, textIndent: `${fontSize}px` }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p style={{ marginBottom: 24 }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p style={{ marginBottom: 24 }}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p style={{ marginBottom: 24 }}>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
            </p>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 20,
            marginTop: 40
          }}>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              style={{
                padding: '12px 24px',
                borderRadius: 8,
                border: 'none',
                background: currentPage <= 1 ? '#2d2d4a' : '#3b82f6',
                color: 'white',
                cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <ChevronLeft size={18} /> Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              style={{
                padding: '12px 24px',
                borderRadius: 8,
                border: 'none',
                background: currentPage >= totalPages ? '#2d2d4a' : '#3b82f6',
                color: 'white',
                cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div style={{
        padding: '12px 20px',
        background: '#16162a',
        borderTop: '1px solid #2d2d4a',
        display: 'flex',
        alignItems: 'center',
        gap: 20
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            height: 4,
            background: '#2d2d4a',
            borderRadius: 2,
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: '#3b82f6',
              transition: 'width 0.3s'
            }} />
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#71717a', fontSize: 13 }}>
          <Clock size={14} />
          {formatTime(readingTime)}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 12, color: '#71717a' }}>A-</span>
          <input
            type="range"
            min={14}
            max={28}
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            style={{ width: 80 }}
          />
          <span style={{ fontSize: 16, color: '#71717a' }}>A+</span>
        </div>
        
        <div style={{ color: '#71717a', fontSize: 13 }}>
          {Math.round(progress)}% complete
        </div>
      </div>
    </div>
  );
};

export default ReadingProgress;
