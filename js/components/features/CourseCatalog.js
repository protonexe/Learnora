import React from 'react';
import { FileText, Download, Share2, Printer, Eye, Calendar, Clock, User, BookOpen, CheckCircle, Lock, Globe, Star, ChevronRight, ChevronDown, Search, Filter, X, ExternalLink } from './Icon';

const CourseCatalog = ({ onClose }) => {
  const [search, setSearch] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState('all');
  const [filterLevel, setFilterLevel] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('popular');
  
  const courses = [
    { id: 1, title: 'Advanced Physics', instructor: 'Dr. Sarah Chen', category: 'Science', level: 'Advanced', duration: '24 hours', lessons: 48, rating: 4.9, students: 2340, thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200', price: 49, featured: true },
    { id: 2, title: 'Calculus Mastery', instructor: 'Prof. James Wilson', category: 'Mathematics', level: 'Intermediate', duration: '18 hours', lessons: 36, rating: 4.8, students: 1890, thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=200', price: 39, featured: true },
    { id: 3, title: 'Organic Chemistry', instructor: 'Dr. Emily Brown', category: 'Science', level: 'Advanced', duration: '20 hours', lessons: 40, rating: 4.7, students: 1560, thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=200', price: 45, featured: false },
    { id: 4, title: 'English Literature', instructor: 'Ms. Lisa Anderson', category: 'Language', level: 'Beginner', duration: '15 hours', lessons: 30, rating: 4.9, students: 3200, thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=200', price: 29, featured: false },
    { id: 5, title: 'World History', instructor: 'Mr. David Lee', category: 'History', level: 'Intermediate', duration: '22 hours', lessons: 44, rating: 4.6, students: 980, thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12a74?w=200', price: 35, featured: false },
    { id: 6, title: 'Python Programming', instructor: 'Dr. Alex Kim', category: 'Computer Science', level: 'Beginner', duration: '30 hours', lessons: 60, rating: 4.9, students: 5600, thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200', price: 59, featured: true },
  ];
  
  const categories = ['all', 'Science', 'Mathematics', 'Language', 'History', 'Computer Science'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];
  
  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                         c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'all' || c.category === filterCategory;
    const matchesLevel = filterLevel === 'all' || c.level === filterLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 800,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: 20,
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        color: 'white'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            📚 Course Catalog
          </h3>
          <button
            onClick={onClose}
            style={{
              padding: 4,
              borderRadius: 6,
              border: 'none',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
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
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 8
          }}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                color: 'white',
                fontSize: 14
              }}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: 'none',
                background: filterCategory === cat ? 'white' : 'rgba(255,255,255,0.2)',
                color: filterCategory === cat ? '#6366f1' : 'white',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: 13
              }}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        gap: 12,
        padding: 16,
        borderBottom: '1px solid var(--border-color)'
      }}>
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            background: 'var(--bg)',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}
        >
          {levels.map(l => (
            <option key={l} value={l}>{l === 'all' ? 'All Levels' : l}</option>
          ))}
        </select>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            background: 'var(--bg)',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
        
        <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-secondary)', alignSelf: 'center' }}>
          {filteredCourses.length} courses found
        </span>
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {filteredCourses.map(course => (
            <div
              key={course.id}
              style={{
                background: 'var(--bg)',
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                style={{
                  width: '100%',
                  height: 120,
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: 14 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 8
                }}>
                  <div>
                    <h4 style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                      {course.title}
                    </h4>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      {course.instructor}
                    </div>
                  </div>
                  <div style={{
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: 6,
                    fontWeight: 600,
                    fontSize: 14
                  }}>
                    ${course.price}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  <span>{course.duration}</span>
                  <span>•</span>
                  <span>{course.lessons} lessons</span>
                  <span>•</span>
                  <span style={{
                    background: course.level === 'Beginner' ? '#10b98120' : course.level === 'Intermediate' ? '#f59e0b20' : '#ef444420',
                    color: course.level === 'Beginner' ? '#10b981' : course.level === 'Intermediate' ? '#f59e0b' : '#ef4444',
                    padding: '2px 6px',
                    borderRadius: 4
                  }}>
                    {course.level}
                  </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={14} style={{ color: '#fbbf24' }} />
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{course.rating}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>({course.students.toLocaleString()})</span>
                  </div>
                  <button style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: 'none',
                    background: 'var(--primary)',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: 12
                  }}>
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;
