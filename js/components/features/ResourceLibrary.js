import React from 'react';
import { Search, Filter, Plus, X, ChevronDown, ChevronUp, Tag, Folder, FileText, BookOpen, Video, Link as LinkIcon, ExternalLink, Clock, User } from './Icon';

const ResourceLibrary = ({ onClose }) => {
  const [resources, setResources] = React.useState([
    { id: 1, title: 'Physics Formula Sheet', type: 'document', tags: ['physics', 'formulas'], category: 'Study Materials', addedBy: 'Teacher', date: '2024-01-15', url: '#' },
    { id: 2, title: 'Chemistry Lab Safety Guide', type: 'document', tags: ['chemistry', 'lab'], category: 'Lab Materials', addedBy: 'Dr. Smith', date: '2024-01-14', url: '#' },
    { id: 3, title: 'Math Problem Sets', type: 'folder', tags: ['math', 'practice'], category: 'Problem Sets', addedBy: 'Ms. Johnson', date: '2024-01-13', url: '#', items: 12 },
    { id: 4, title: 'Biology Diagrams', type: 'image', tags: ['biology', 'diagrams'], category: 'Visual Aids', addedBy: 'Teacher', date: '2024-01-12', url: '#' },
    { id: 5, title: 'History Timeline', type: 'link', tags: ['history', 'timeline'], category: 'External Resources', addedBy: 'Mr. Brown', date: '2024-01-11', url: '#' },
    { id: 6, title: 'Programming Tutorials', type: 'video', tags: ['programming', 'coding'], category: 'Video Lessons', addedBy: 'Admin', date: '2024-01-10', url: '#' },
  ]);
  const [search, setSearch] = React.useState('');
  const [filterType, setFilterType] = React.useState('all');
  const [filterCategory, setFilterCategory] = React.useState('all');
  const [showFilters, setShowFilters] = React.useState(false);
  
  const types = ['all', 'document', 'folder', 'image', 'link', 'video'];
  const categories = ['all', ...new Set(resources.map(r => r.category))];
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'document': return '📄';
      case 'folder': return '📁';
      case 'image': return '🖼️';
      case 'link': return '🔗';
      case 'video': return '🎬';
      default: return '📄';
    }
  };
  
  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || 
                         r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesType = filterType === 'all' || r.type === filterType;
    const matchesCategory = filterCategory === 'all' || r.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });
  
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
            📚 Resource Library
          </h3>
          <button
            onClick={onClose}
            style={{
              padding: 4,
              borderRadius: 6,
              border: 'none',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>
        
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 12
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
            <Search size={18} style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search resources..."
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
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: showFilters ? 'var(--primary)' : 'var(--bg)',
              color: showFilters ? 'white' : 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Filter size={18} /> Filters
          </button>
          <button style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--primary)',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <Plus size={18} /> Add
          </button>
        </div>
        
        {showFilters && (
          <div style={{
            display: 'flex',
            gap: 12,
            padding: 12,
            background: 'var(--bg)',
            borderRadius: 8,
            marginBottom: 8
          }}>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 6,
                border: '1px solid var(--border-color)',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              {types.map(t => (
                <option key={t} value={t} style={{ textTransform: 'capitalize' }}>
                  {t === 'all' ? 'All Types' : t}
                </option>
              ))}
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 6,
                border: '1px solid var(--border-color)',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {filteredResources.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: 40,
            color: 'var(--text-secondary)'
          }}>
            No resources found
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredResources.map(resource => (
              <div
                key={resource.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 14,
                  background: 'var(--bg)',
                  borderRadius: 10,
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: 32 }}>{getTypeIcon(resource.type)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                    {resource.title}
                  </div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Folder size={12} /> {resource.category}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <User size={12} /> {resource.addedBy}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} /> {resource.date}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                    {resource.tags.map((tag, i) => (
                      <span key={i} style={{
                        background: 'var(--primary)' + '20',
                        color: 'var(--primary)',
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontSize: 11
                      }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button style={{
                  padding: 8,
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}>
                  <ExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div style={{
        padding: 12,
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          {filteredResources.length} resources
        </span>
        <button style={{
          padding: '8px 16px',
          borderRadius: 8,
          border: '1px solid var(--border-color)',
          background: 'transparent',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          fontSize: 13
        }}>
          View All
        </button>
      </div>
    </div>
  );
};

export default ResourceLibrary;
