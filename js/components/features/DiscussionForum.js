import React from 'react';
import { X, MessageSquare, Send, Paperclip, Image, Smile, AtSign, Hash, MessageCircle, Check, Clock, Eye, ThumbsUp, Reply, MoreHorizontal, Edit2, Trash2, Copy, Star, Pin, Archive } from './Icon';

const DiscussionForum = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [newPost, setNewPost] = React.useState('');
  
  const posts = [
    { id: 1, author: 'Alice', avatar: 'A', title: 'Tips for studying Physics effectively?', content: 'I\'m struggling with physics concepts. Any study tips?', category: 'Physics', likes: 24, replies: 8, time: '2h ago', pinned: true },
    { id: 2, author: 'Bob', avatar: 'B', title: 'Best resources for Calculus?', content: 'Looking for good calculus resources. Share your favorites!', category: 'Mathematics', likes: 18, replies: 12, time: '4h ago', pinned: false },
    { id: 3, author: 'Charlie', avatar: 'C', title: 'Study group for Chemistry', content: 'Anyone interested in forming a chemistry study group?', category: 'Chemistry', likes: 15, replies: 6, time: 'Yesterday', pinned: false },
  ];
  
  const categories = ['all', 'Physics', 'Mathematics', 'Chemistry', 'Biology', 'General'];
  
  const filteredPosts = activeCategory === 'all' ? posts : posts.filter(p => p.category === activeCategory);
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 500,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ padding: 20, borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            💬 Discussion Forum
          </h3>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: 'none',
                background: activeCategory === cat ? 'var(--primary)' : 'var(--bg)',
                color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: 13
              }}
            >
              {cat === 'all' ? '🌟' : cat === 'Physics' ? '⚛️' : cat === 'Mathematics' ? '📐' : cat === 'Chemistry' ? '🧪' : cat === 'Biology' ? '🧬' : '💭'} {cat}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ padding: 16, background: 'var(--bg)', borderBottom: '1px solid var(--border-color)' }}>
        <textarea
          placeholder="Start a discussion..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          style={{ width: '100%', minHeight: 80, padding: 12, borderRadius: 10, border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-primary)', resize: 'none', outline: 'none', fontFamily: 'inherit' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: 8, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>📷</button>
            <button style={{ padding: 8, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>📎</button>
            <button style={{ padding: 8, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>😊</button>
          </div>
          <button disabled={!newPost.trim()} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: newPost.trim() ? 'var(--primary)' : 'var(--border-color)', color: 'white', cursor: newPost.trim() ? 'pointer' : 'not-allowed', fontWeight: 600, fontSize: 13 }}>
            Post
          </button>
        </div>
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {filteredPosts.map(post => (
          <div key={post.id} style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, marginBottom: 10, border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, flexShrink: 0 }}>
                {post.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{post.author}</span>
                    {post.pinned && <span style={{ background: 'var(--primary)', color: 'white', padding: '2px 6px', borderRadius: 4, fontSize: 10 }}>📌 Pinned</span>}
                  </div>
                  <button style={{ padding: 4, borderRadius: 4, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{post.title}</div>
                <p style={{ margin: '0 0 10px 0', color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.5 }}>{post.content}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>👍 {post.likes}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>💬 {post.replies}</span>
                    <span>🕐 {post.time}</span>
                  </div>
                  <span style={{ fontSize: 11, background: 'var(--primary)' + '20', color: 'var(--primary)', padding: '2px 8px', borderRadius: 4 }}>
                    {post.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForum;
