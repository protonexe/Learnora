import React from 'react';
import { X, MapPin, Phone, Mail, Globe, Clock, Star, ChevronRight, Calendar, MessageSquare, Share2, Heart, ExternalLink, Edit2, MoreVertical, Instagram, Twitter, Linkedin, Github } from './Icon';

const ProfileCard = ({ user, onClose }) => {
  const profile = user || {
    name: 'John Doe',
    username: '@johndoe',
    avatar: 'J',
    bio: 'Passionate learner | Physics enthusiast | Always growing',
    location: 'New York, USA',
    website: 'johndoe.dev',
    joined: 'January 2024',
    stats: { followers: 1250, following: 890, posts: 156 },
    social: { twitter: '@johndoe', github: 'johndoe', linkedin: 'johndoe' }
  };
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 20,
      width: 360,
      overflow: 'hidden'
    }}>
      <div style={{ height: 100, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, padding: 8, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>
          <X size={18} />
        </button>
      </div>
      
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ marginTop: -50, marginBottom: 12 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--primary)', border: '4px solid var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 32, fontWeight: 700 }}>
            {profile.avatar}
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: 20 }}>{profile.name}</h3>
            <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{profile.username}</div>
          </div>
          <button style={{ padding: '8px 16px', borderRadius: 20, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
            Follow
          </button>
        </div>
        
        <p style={{ color: 'var(--text-primary)', margin: '0 0 16px 0', lineHeight: 1.5, fontSize: 14 }}>{profile.bio}</p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          {profile.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)', fontSize: 13 }}>
              <MapPin size={14} /> {profile.location}
            </span>
          )}
          {profile.website && (
            <a href={`https://${profile.website}`} target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--primary)', fontSize: 13, textDecoration: 'none' }}>
              <Globe size={14} /> {profile.website}
            </a>
          )}
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)', fontSize: 13 }}>
            <Clock size={14} /> Joined {profile.joined}
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 18 }}>{profile.stats.followers.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Followers</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 18 }}>{profile.stats.following.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Following</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 18 }}>{profile.stats.posts}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Posts</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13 }}>
            <MessageSquare size={16} /> Message
          </button>
          <button style={{ padding: 10, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>
            <Share2 size={16} />
          </button>
        </div>
        
        {profile.social && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center', gap: 12 }}>
            {profile.social.twitter && <button style={{ padding: 8, borderRadius: 8, border: 'none', background: 'var(--bg)', color: '#1da1f2', cursor: 'pointer' }}>Twitter</button>}
            {profile.social.github && <button style={{ padding: 8, borderRadius: 8, border: 'none', background: 'var(--bg)', color: '#333', cursor: 'pointer' }}>GitHub</button>}
            {profile.social.linkedin && <button style={{ padding: 8, borderRadius: 8, border: 'none', background: 'var(--bg)', color: '#0077b5', cursor: 'pointer' }}>LinkedIn</button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
