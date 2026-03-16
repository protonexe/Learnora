import React from 'react';
import { FileText, Download, Share2, Printer, Clock, CheckCircle, Circle, MoreVertical, Trash2, Edit2, Copy } from './Icon';

const DocumentManager = ({ onClose }) => {
  const [documents, setDocuments] = React.useState([
    { id: 1, name: 'Calculus Notes.pdf', type: 'pdf', size: '2.4 MB', date: '2024-01-15', course: 'Mathematics' },
    { id: 2, name: 'Physics Summary.docx', type: 'doc', size: '1.1 MB', date: '2024-01-14', course: 'Physics' },
    { id: 3, name: 'Chemistry Lab Report.pdf', type: 'pdf', size: '3.2 MB', date: '2024-01-13', course: 'Chemistry' },
    { id: 4, name: 'History Essay.docx', type: 'doc', size: '856 KB', date: '2024-01-12', course: 'History' },
    { id: 5, name: 'Biology Notes.pdf', type: 'pdf', size: '4.1 MB', date: '2024-01-11', course: 'Biology' },
  ]);
  const [selected, setSelected] = React.useState([]);
  const [view, setView] = React.useState('grid');
  const [search, setSearch] = React.useState('');
  const [sortBy, setSortBy] = React.useState('date');
  
  const getIcon = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'doc': return '📝';
      case 'xls': return '📊';
      case 'ppt': return '📽️';
      default: return '📁';
    }
  };
  
  const filteredDocs = React.useMemo(() => {
    let filtered = documents.filter(d => 
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.course.toLowerCase().includes(search.toLowerCase())
    );
    
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'size') {
      filtered.sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
    } else {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    return filtered;
  }, [documents, search, sortBy]);
  
  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };
  
  const selectAll = () => {
    if (selected.length === filteredDocs.length) {
      setSelected([]);
    } else {
      setSelected(filteredDocs.map(d => d.id));
    }
  };
  
  const deleteSelected = () => {
    setDocuments(documents.filter(d => !selected.includes(d.id)));
    setSelected([]);
  };
  
  const copySelected = () => {
    const names = documents.filter(d => selected.includes(d.id)).map(d => d.name).join('\n');
    navigator.clipboard.writeText(names);
  };
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 600,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: 16,
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <FileText size={20} /> Documents
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
            style={{
              padding: 8,
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            {view === 'grid' ? '☰' : '⊞'}
          </button>
        </div>
      </div>
      
      <div style={{
        padding: 12,
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        gap: 12,
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            background: 'var(--bg)',
            color: 'var(--text-primary)',
            outline: 'none'
          }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            background: 'var(--bg)',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
          <option value="size">Sort by Size</option>
        </select>
      </div>
      
      {selected.length > 0 && (
        <div style={{
          padding: '8px 16px',
          background: 'var(--primary)',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{selected.length} selected</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={copySelected}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: 'none',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                cursor: 'pointer',
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <Copy size={14} /> Copy
            </button>
            <button
              onClick={deleteSelected}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: 'none',
                background: 'rgba(239, 68, 68, 0.8)',
                color: 'white',
                cursor: 'pointer',
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      )}
      
      <div style={{ flex: 1, overflow: 'auto', padding: 12 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12
        }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
            {filteredDocs.length} documents
          </span>
          <button
            onClick={selectAll}
            style={{
              padding: '4px 10px',
              borderRadius: 4,
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 12
            }}
          >
            {selected.length === filteredDocs.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>
        
        {view === 'grid' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12
          }}>
            {filteredDocs.map(doc => (
              <div
                key={doc.id}
                onClick={() => toggleSelect(doc.id)}
                style={{
                  background: selected.includes(doc.id) ? 'var(--primary)' + '20' : 'var(--bg)',
                  borderRadius: 12,
                  padding: 16,
                  border: `2px solid ${selected.includes(doc.id) ? 'var(--primary)' : 'var(--border-color)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  fontSize: 36,
                  textAlign: 'center',
                  marginBottom: 12
                }}>
                  {getIcon(doc.type)}
                </div>
                <div style={{
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  fontSize: 13,
                  marginBottom: 4,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {doc.name}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  {doc.size} • {doc.course}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredDocs.map(doc => (
              <div
                key={doc.id}
                onClick={() => toggleSelect(doc.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 12,
                  background: selected.includes(doc.id) ? 'var(--primary)' + '20' : 'var(--bg)',
                  borderRadius: 8,
                  border: `1px solid ${selected.includes(doc.id) ? 'var(--primary)' : 'var(--border-color)'}`,
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: 24 }}>{getIcon(doc.type)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{doc.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {doc.size} • {doc.course} • {doc.date}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    style={{
                      padding: 8,
                      borderRadius: 6,
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    style={{
                      padding: 8,
                      borderRadius: 6,
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    <Share2 size={16} />
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

export default DocumentManager;
