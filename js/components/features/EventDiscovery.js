import React from 'react';
import { X, Bell, Clock, MapPin, Users, Video, Calendar, ChevronRight, Plus, Search, Filter, Star, Check, MoreHorizontal } from './Icon';

const EventDiscovery = ({ onClose }) => {
  const [activeTab, setActiveTab] = React.useState('upcoming');
  
  const events = [
    { id: 1, title: 'Physics Workshop', type: 'workshop', date: 'Today', time: '3:00 PM', location: 'Online', attendees: 45, image: '⚛️', color: '#3b82f6' },
    { id: 2, title: 'Math Study Session', type: 'study', date: 'Tomorrow', time: '2:00 PM', location: 'Room 204', attendees: 12, image: '📐', color: '#10b981' },
    { id: 3, title: 'Chemistry Lab Demo', type: 'demo', date: 'Jan 20', time: '10:00 AM', location: 'Lab A', attendees: 28, image: '🧪', color: '#f59e0b' },
    { id: 4, title: 'Study Group Meetup', type: 'group', date: 'Jan 22', time: '4:00 PM', location: 'Library', attendees: 8, image: '👥', color: '#8b5cf6' },
  ];
  
  const categories = ['upcoming', 'thisWeek', 'thisMonth'];
  
  return (
    <div style={{ background: 'var(--card-bg)', borderRadius: 16, width: 450, maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 20, borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>📅 Discover Events</h3>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
        </div>
        
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <Search size={16} style={{ color: 'var(--text-secondary)' }} />
            <input type="text" placeholder="Search events..." style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveTab(cat)} style={{ flex: 1, padding: 12, border: 'none', background: activeTab === cat ? 'var(--primary)' : 'transparent', color: activeTab === cat ? 'white' : 'var(--text-secondary)', cursor: 'pointer', textTransform: 'capitalize', fontSize: 13 }}>
            {cat === 'upcoming' ? '📅' : cat === 'thisWeek' ? '📆' : '🗓️'} {cat.replace(/([A-Z])/g, ' $1')}
          </button>
        ))}
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {events.map(event => (
            <div key={event.id} style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: 14 }}>
                <div style={{ width: 50, height: 50, borderRadius: 10, background: event.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                  {event.image}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{event.title}</div>
                    <span style={{ background: event.color + '20', color: event.color, padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600, textTransform: 'uppercase' }}>
                      {event.type}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>📅 {event.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>🕐 {event.time}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>📍 {event.location}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>👥 {event.attendees} attending</span>
                    <button style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ padding: 16, borderTop: '1px solid var(--border-color)' }}>
        <button style={{ width: '100%', padding: 14, borderRadius: 10, border: '2px dashed var(--border-color)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Plus size={18} /> Create Event
        </button>
      </div>
    </div>
  );
};

export default EventDiscovery;
