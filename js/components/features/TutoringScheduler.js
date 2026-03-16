import React from 'react';
import { Search, MapPin, Calendar, Clock, Users, Star, Filter, X, ChevronRight, Heart, Share2 } from './Icon';

const TutoringScheduler = ({ onClose }) => {
  const [selectedSubject, setSelectedSubject] = React.useState('all');
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [showFilters, setShowFilters] = React.useState(false);
  
  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Computer Science'];
  
  const tutors = [
    { id: 1, name: 'Dr. Sarah Chen', subject: 'Mathematics', rating: 4.9, reviews: 234, price: 45, availability: 'Mon-Fri', image: 'S', experience: '8 years', bio: 'PhD in Mathematics, specializes in calculus and algebra' },
    { id: 2, name: 'Prof. James Wilson', subject: 'Physics', rating: 4.8, reviews: 189, price: 50, availability: 'Tue-Sat', image: 'J', experience: '12 years', bio: 'Former NASA researcher, makes physics fun!' },
    { id: 3, name: 'Ms. Emily Brown', subject: 'Chemistry', rating: 4.9, reviews: 156, price: 40, availability: 'Mon-Thu', image: 'E', experience: '6 years', bio: 'Expert in organic chemistry and test prep' },
    { id: 4, name: 'Mr. David Lee', subject: 'Biology', rating: 4.7, reviews: 98, price: 38, availability: 'Wed-Sun', image: 'D', experience: '5 years', bio: 'Medical school graduate, great at explaining complex topics' },
    { id: 5, name: 'Dr. Lisa Anderson', subject: 'English', rating: 4.9, reviews: 276, price: 42, availability: 'Mon-Fri', image: 'L', experience: '10 years', bio: 'Published author, specializes in writing and literature' },
  ];
  
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return { date, day: date.toLocaleDateString('en-US', { weekday: 'short' }), num: date.getDate() };
  });
  
  const filteredTutors = selectedSubject === 'all' 
    ? tutors 
    : tutors.filter(t => t.subject === selectedSubject);
  
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
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            👨‍🏫 Find a Tutor
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
          overflowX: 'auto',
          paddingBottom: 8
        }}>
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              style={{
                padding: '8px 14px',
                borderRadius: 20,
                border: 'none',
                background: selectedSubject === subject ? 'white' : 'rgba(255,255,255,0.2)',
                color: selectedSubject === subject ? '#059669' : 'white',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: 13
              }}
            >
              {subject === 'all' ? 'All Subjects' : subject}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        gap: 8,
        overflowX: 'auto'
      }}>
        {dates.slice(0, 7).map((d, i) => (
          <button
            key={i}
            onClick={() => setSelectedDate(d.date)}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              border: 'none',
              background: selectedDate?.toDateString() === d.date.toDateString() ? 'var(--primary)' : 'var(--bg)',
              color: selectedDate?.toDateString() === d.date.toDateString() ? 'white' : 'var(--text-primary)',
              cursor: 'pointer',
              textAlign: 'center',
              minWidth: 60
            }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 2 }}>{d.day}</div>
            <div style={{ fontWeight: 600 }}>{d.num}</div>
          </button>
        ))}
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
          {filteredTutors.length} tutors available
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredTutors.map(tutor => (
            <div
              key={tutor.id}
              style={{
                background: 'var(--bg)',
                borderRadius: 12,
                padding: 16,
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', gap: 14 }}>
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 24,
                  fontWeight: 600,
                  flexShrink: 0
                }}>
                  {tutor.image}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                        {tutor.name}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                        {tutor.subject} • {tutor.experience}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 18 }}>${tutor.price}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>/hour</div>
                    </div>
                  </div>
                  
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                    {tutor.bio}
                  </p>
                  
                  <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={14} style={{ color: '#fbbf24' }} /> {tutor.rating} ({tutor.reviews})
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={14} /> {tutor.availability}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: 'none',
                      background: 'var(--primary)',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 13
                    }}>
                      Book Session
                    </button>
                    <button style={{
                      padding: 10,
                      borderRadius: 8,
                      border: '1px solid var(--border-color)',
                      background: 'transparent',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}>
                      <Heart size={18} />
                    </button>
                    <button style={{
                      padding: 10,
                      borderRadius: 8,
                      border: '1px solid var(--border-color)',
                      background: 'transparent',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}>
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutoringScheduler;
