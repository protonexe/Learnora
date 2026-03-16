import React from 'react';
import { Search, X, Hash, TrendingUp, Clock, Users, MessageSquare, BookOpen, Star, Filter, ChevronRight } from './Icon';

const HashtagExplorer = ({ onClose }) => {
  const [search, setSearch] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('trending');
  
  const hashtags = {
    trending: [
      { tag: '#Physics', posts: 2340, trend: 'up', category: 'Science' },
      { tag: '#Mathematics', posts: 1890, trend: 'up', category: 'Math' },
      { tag: '#StudyMotivation', posts: 1560, trend: 'up', category: 'Motivation' },
      { tag: '#Chemistry', posts: 980, trend: 'down', category: 'Science' },
      { tag: '#OnlineLearning', posts: 870, trend: 'up', category: 'Education' },
      { tag: '#Biology', posts: 760, trend: 'up', category: 'Science' },
    ],
    popular: [
      { tag: '#Learnora', posts: 5600, trend: 'up', category: 'Platform' },
      { tag: '#StudyTips', posts: 4200, trend: 'up', category: 'Education' },
      { tag: '#StudentLife', posts: 3100, trend: 'stable', category: 'Lifestyle' },
      { tag: '#ExamPrep', posts: 2800, trend: 'up', category: 'Education' },
      { tag: '#Homework', posts: 1900, trend: 'down', category: 'Education' },
    ],
    recent: [
      { tag: '#QuantumMechanics', posts: 45, trend: 'up', category: 'Physics' },
      { tag: '#OrganicChem', posts: 38, trend: 'up', category: 'Chemistry' },
      { tag: '#Calculus', posts: 32, trend: 'up', category: 'Math' },
      { tag: '#WorldHistory', posts: 28, trend: 'up', category: 'History' },
      { tag: '#Literature', posts: 24, trend: 'up', category: 'English' },
    ]
  };
  
  const categories = ['All', 'Science', 'Math', 'Education', 'Lifestyle', 'Platform'];
  
  const filtered = hashtags[activeTab].filter(h => 
    h.tag.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 400,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ padding: 20, borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            # Hashtag Explorer
          </h3>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <Search size={18} style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Search hashtags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-primary)' }}
          />
        </div>
      </div>
      
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
        {['trending', 'popular', 'recent'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: 12,
              border: 'none',
              background: activeTab === tab ? 'var(--primary)' : 'transparent',
              color: activeTab === tab ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontSize: 13
            }}
          >
            {tab === 'trending' ? '🔥' : tab === 'popular' ? '⭐' : '🕐'} {tab}
          </button>
        ))}
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {filtered.map((h, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg)', borderRadius: 10, marginBottom: 8, cursor: 'pointer' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14 }}>
              {i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: 2 }}>{h.tag}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                {h.category} • {h.posts.toLocaleString()} posts
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: h.trend === 'up' ? '#10b981' : h.trend === 'down' ? '#ef4444' : 'var(--text-secondary)' }}>
              {h.trend === 'up' ? '↑' : h.trend === 'down' ? '↓' : '→'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashtagExplorer;
