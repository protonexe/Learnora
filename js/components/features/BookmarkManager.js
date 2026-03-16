import React from 'react';
import { Link as LinkIcon, ExternalLink, Trash2, Edit2, Copy, Check, Clock, Globe, Lock, Search, Filter, Plus, X, Folder, FileText } from './Icon';

const BookmarkManager = ({ onClose }) => {
  const [bookmarks, setBookmarks] = React.useState([
    { id: 1, title: 'Physics Formulas', url: 'https://example.com/physics', category: 'Study Materials', favicon: '📚', createdAt: '2024-01-15' },
    { id: 2, title: 'Chemistry Lab Guide', url: 'https://example.com/chemistry', category: 'Labs', favicon: '🧪', createdAt: '2024-01-14' },
    { id: 3, title: 'Math Problem Sets', url: 'https://example.com/math', category: 'Practice', favicon: '📐', createdAt: '2024-01-13' },
    { id: 4, title: 'History Timeline', url: 'https://example.com/history', category: 'Reference', favicon: '📜', createdAt: '2024-01-12' },
    { id: 5, title: 'Biology Diagrams', url: 'https://example.com/biology', category: 'Visual Aids', favicon: '🧬', createdAt: '2024-01-11' },
  ]);
  const [search, setSearch] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState('all');
  const [showAdd, setShowAdd] = React.useState(false);
  const [newBookmark, setNewBookmark] = React.useState({ title: '', url: '', category: 'General' });
  const [copied, setCopied] = React.useState(null);
  
  const categories = ['all', 'General', 'Study Materials', 'Labs', 'Practice', 'Reference', 'Visual Aids'];
  
  const filteredBookmarks = bookmarks.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'all' || b.category === filterCategory;
    return matchesSearch && matchesCategory;
  });
  
  const copyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };
  
  const addBookmark = () => {
    if (!newBookmark.title || !newBookmark.url) return;
    setBookmarks([...bookmarks, {
      id: Date.now(),
      ...newBookmark,
      favicon: '🔗',
      createdAt: new Date().toISOString().split('T')[0]
    }]);
    setNewBookmark({ title: '', url: '', category: 'General' });
    setShowAdd(false);
  };
  
  const deleteBookmark = (id) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 450,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: 20,
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            🔖 Bookmarks
          </h3>
          <button
            onClick={() => setShowAdd(!showAdd)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--primary)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13
            }}
          >
            <Plus size={16} /> Add
          </button>
        </div>
        
        {showAdd && (
          <div style={{
            background: 'var(--bg)',
            borderRadius: 10,
            padding: 14,
            marginBottom: 12
          }}>
            <input
              type="text"
              placeholder="Title"
              value={newBookmark.title}
              onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid var(--border-color)',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                marginBottom: 8,
                outline: 'none'
              }}
            />
            <input
              type="url"
              placeholder="URL"
              value={newBookmark.url}
              onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid var(--border-color)',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                marginBottom: 8,
                outline: 'none'
              }}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <select
                value={newBookmark.category}
                onChange={(e) => setNewBookmark({ ...newBookmark, category: e.target.value })}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                  background: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                {categories.filter(c => c !== 'all').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                onClick={addBookmark}
                style={{
                  padding: '10px 16px',
                  borderRadius: 6,
                  border: 'none',
                  background: 'var(--primary)',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Add
              </button>
            </div>
          </div>
        )}
        
        <div style={{
          display: 'flex',
          gap: 8
        }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 14px',
            background: 'var(--bg)',
            borderRadius: 8,
            border: '1px solid var(--border-color)'
          }}>
            <Search size={16} style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          gap: 6,
          marginTop: 12,
          overflowX: 'auto'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              style={{
                padding: '6px 12px',
                borderRadius: 20,
                border: 'none',
                background: filterCategory === cat ? 'var(--primary)' : 'var(--bg)',
                color: filterCategory === cat ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: 12
              }}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {filteredBookmarks.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: 40,
            color: 'var(--text-secondary)'
          }}>
            No bookmarks found
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredBookmarks.map(bookmark => (
              <div
                key={bookmark.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 12,
                  background: 'var(--bg)',
                  borderRadius: 10,
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ fontSize: 24 }}>{bookmark.favicon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: 2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {bookmark.title}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {bookmark.url}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button
                    onClick={() => copyUrl(bookmark.url, bookmark.id)}
                    style={{
                      padding: 8,
                      borderRadius: 6,
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    {copied === bookmark.id ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: 8,
                      borderRadius: 6,
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      textDecoration: 'none'
                    }}
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button
                    onClick={() => deleteBookmark(bookmark.id)}
                    style={{
                      padding: 8,
                      borderRadius: 6,
                      border: 'none',
                      background: 'transparent',
                      color: '#ef4444',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkManager;
