import React from 'react';
import { Search, Filter, SlidersHorizontal, X, ChevronDown } from './Icon';

const AdvancedSearch = ({ onClose, onSearch }) => {
  const [query, setQuery] = React.useState('');
  const [filters, setFilters] = React.useState({
    type: 'all',
    subject: '',
    level: '',
    duration: '',
    rating: 0,
    sortBy: 'relevance'
  });
  const [showFilters, setShowFilters] = React.useState(true);
  
  const types = ['all', 'course', 'quiz', 'flashcard', 'note', 'video', 'document'];
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];
  const durations = ['all', 'short', 'medium', 'long'];
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'duration', label: 'Shortest First' },
  ];
  
  const handleSearch = () => {
    onSearch?.({ query, filters });
  };
  
  const clearFilters = () => {
    setFilters({
      type: 'all',
      subject: '',
      level: '',
      duration: '',
      rating: 0,
      sortBy: 'relevance'
    });
    setQuery('');
  };
  
  const activeFiltersCount = Object.values(filters).filter(v => 
    v !== 'all' && v !== '' && v !== 0 && v !== 'relevance'
  ).length;
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      padding: 24,
      width: 500,
      maxHeight: '80vh',
      overflow: 'auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Search size={20} /> Advanced Search
        </h3>
        <button
          onClick={onClose}
          style={{
            padding: 8,
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
        marginBottom: 16
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 16px',
          background: 'var(--bg)',
          borderRadius: 10,
          border: '1px solid var(--border-color)'
        }}>
          <Search size={18} style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Search courses, quizzes, notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: 14
            }}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            padding: '12px 16px',
            borderRadius: 10,
            border: '1px solid var(--border-color)',
            background: showFilters ? 'var(--primary)' : 'var(--bg)',
            color: showFilters ? 'white' : 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            position: 'relative'
          }}
        >
          <Filter size={18} /> Filters
          {activeFiltersCount > 0 && (
            <span style={{
              position: 'absolute',
              top: -6,
              right: -6,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: '#ef4444',
              color: 'white',
              fontSize: 11,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>
      
      {showFilters && (
        <div style={{
          background: 'var(--bg)',
          borderRadius: 12,
          padding: 16,
          marginBottom: 16
        }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
              Content Type
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setFilters({ ...filters, type })}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    border: 'none',
                    background: filters.type === type ? 'var(--primary)' : 'var(--card-bg)',
                    color: filters.type === type ? 'white' : 'var(--text-primary)',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    fontSize: 13
                  }}
                >
                  {type === 'all' ? '📚 All' : type === 'course' ? '🎓 Course' : type === 'quiz' ? '✍️ Quiz' : type === 'flashcard' ? '🧠 Flashcard' : type === 'note' ? '📝 Note' : type === 'video' ? '🎬 Video' : '📄 Document'}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
                Subject
              </label>
              <select
                value={filters.subject}
                onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                <option value="">All Subjects</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
                Level
              </label>
              <select
                value={filters.level}
                onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Levels</option>
                {levels.filter(l => l !== 'all').map(l => (
                  <option key={l} value={l} style={{ textTransform: 'capitalize' }}>{l}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
                Duration
              </label>
              <select
                value={filters.duration}
                onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                <option value="all">Any Duration</option>
                <option value="short">&lt; 1 hour</option>
                <option value="medium">1-5 hours</option>
                <option value="long">&gt; 5 hours</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
                Minimum Rating
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setFilters({ ...filters, rating: filters.rating === star ? 0 : star })}
                    style={{
                      padding: 8,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: 18,
                      color: star <= filters.rating ? '#fbbf24' : 'var(--border-color)'
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div style={{ display: 'flex', gap: 12 }}>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 10,
            border: '1px solid var(--border-color)',
            background: 'var(--bg)',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <button
          onClick={clearFilters}
          style={{
            padding: '12px 20px',
            borderRadius: 10,
            border: '1px solid var(--border-color)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          Clear
        </button>
        <button
          onClick={handleSearch}
          style={{
            padding: '12px 24px',
            borderRadius: 10,
            border: 'none',
            background: 'var(--primary)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <Search size={18} /> Search
        </button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
