import React from 'react';
import { X, Clock, MapPin, Users, Calendar, Video, ChevronRight, Search, Filter, Star, Check } from './Icon';

const PeerStudyMatch = ({ onClose }) => {
  const [filter, setFilter] = React.useState('all');
  
  const peers = [
    { id: 1, name: 'Sarah Chen', avatar: 'S', subject: 'Physics', level: 'Advanced', availability: 'Weekdays', rating: 4.9, sessions: 45, bio: 'Physics major, love helping others!', match: 95 },
    { id: 2, name: 'Mike Johnson', avatar: 'M', subject: 'Mathematics', level: 'Intermediate', availability: 'Evenings', rating: 4.7, sessions: 32, bio: 'Calculus enthusiast', match: 88 },
    { id: 3, name: 'Emma Wilson', avatar: 'E', subject: 'Chemistry', level: 'Advanced', availability: 'Weekends', rating: 4.8, sessions: 28, bio: 'Pre-med student', match: 82 },
    { id: 4, name: 'David Lee', avatar: 'D', subject: 'Biology', level: 'Beginner', availability: 'Flexible', rating: 4.6, sessions: 15, bio: 'First-year student', match: 75 },
  ];
  
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
      <div style={{ padding: 20, borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            👥 Find Study Partners
          </h3>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <Search size={16} style={{ color: 'var(--text-secondary)' }} />
            <input type="text" placeholder="Search by subject..." style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
        </div>
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>Based on your learning goals</div>
        
        {peers.map(peer => (
          <div key={peer.id} style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, marginBottom: 10, border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', gap: 14 }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 20, fontWeight: 600, flexShrink: 0 }}>
                {peer.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{peer.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{peer.subject} • {peer.level}</div>
                  </div>
                  <div style={{ background: peer.match >= 90 ? '#10b98120' : 'var(--bg)', color: peer.match >= 90 ? '#10b981' : 'var(--text-secondary)', padding: '4px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
                    {peer.match}% Match
                  </div>
                </div>
                
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 10px 0', lineHeight: 1.4 }}>{peer.bio}</p>
                
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>⭐ {peer.rating}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>📚 {peer.sessions} sessions</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>🕐 {peer.availability}</span>
                </div>
                
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                    Connect
                  </button>
                  <button style={{ padding: 10, borderRadius: 8, border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    💬
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeerStudyMatch;
