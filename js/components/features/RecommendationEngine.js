import React from 'react';
import { Sparkles, BookOpen, Clock, Star, TrendingUp, ArrowRight, ThumbsUp } from './Icon';

const RecommendationEngine = ({ onCourseClick, userPreferences }) => {
  const [activeTab, setActiveTab] = React.useState('for-you');
  
  const recommendations = {
    'for-you': [
      {
        id: 1,
        title: 'Advanced Calculus II',
        reason: 'Based on your math progress',
        match: 95,
        duration: '8 hours',
        level: 'Advanced',
        rating: 4.8,
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200'
      },
      {
        id: 2,
        title: 'Quantum Physics Fundamentals',
        reason: 'Complements your physics studies',
        match: 89,
        duration: '12 hours',
        level: 'Intermediate',
        rating: 4.9,
        thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=200'
      },
      {
        id: 3,
        title: 'Organic Chemistry',
        reason: 'Next in your chemistry path',
        match: 82,
        duration: '10 hours',
        level: 'Intermediate',
        rating: 4.7,
        thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=200'
      }
    ],
    'trending': [
      {
        id: 4,
        title: 'Machine Learning Basics',
        reason: 'Trending in Computer Science',
        match: 78,
        duration: '15 hours',
        level: 'Beginner',
        rating: 4.9,
        thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=200'
      },
      {
        id: 5,
        title: 'Creative Writing Workshop',
        reason: 'Popular this week',
        match: 65,
        duration: '6 hours',
        level: 'All Levels',
        rating: 4.8,
        thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=200'
      },
      {
        id: 6,
        title: 'Data Science with Python',
        reason: 'High demand course',
        match: 72,
        duration: '20 hours',
        level: 'Intermediate',
        rating: 4.9,
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200'
      }
    ],
    'continue': [
      {
        id: 7,
        title: 'Calculus I: Review',
        reason: 'Continue where you left off',
        match: 100,
        duration: '4 hours',
        level: 'Beginner',
        rating: 4.6,
        thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=200'
      },
      {
        id: 8,
        title: 'Classical Mechanics',
        reason: 'Chapter 5 incomplete',
        match: 100,
        duration: '10 hours',
        level: 'Intermediate',
        rating: 4.8,
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200'
      }
    ]
  };
  
  const currentRecommendations = recommendations[activeTab];
  
  return (
    <div style={{ padding: 20 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={20} style={{ color: '#f59e0b' }} /> Recommended for You
        </h3>
      </div>
      
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 20,
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: 8
      }}>
        {[
          { id: 'for-you', label: 'For You', icon: <Sparkles size={14} /> },
          { id: 'trending', label: 'Trending', icon: <TrendingUp size={14} /> },
          { id: 'continue', label: 'Continue Learning', icon: <BookOpen size={14} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
              color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              transition: 'all 0.2s'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {currentRecommendations.map(course => (
          <div
            key={course.id}
            onClick={() => onCourseClick?.(course)}
            style={{
              display: 'flex',
              gap: 14,
              background: 'var(--bg)',
              borderRadius: 12,
              padding: 12,
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              style={{
                width: 80,
                height: 60,
                borderRadius: 8,
                objectFit: 'cover',
                flexShrink: 0
              }}
            />
            
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 4
              }}>
                <h4 style={{
                  margin: 0,
                  color: 'var(--text-primary)',
                  fontSize: 14,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {course.title}
                </h4>
                {course.match >= 90 && (
                  <span style={{
                    background: '#10b98120',
                    color: '#10b981',
                    padding: '2px 6px',
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {course.match}% Match
                  </span>
                )}
              </div>
              
              <p style={{
                margin: '0 0 8px 0',
                fontSize: 12,
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {course.reason}
              </p>
              
              <div style={{
                display: 'flex',
                gap: 12,
                fontSize: 11,
                color: 'var(--text-secondary)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={12} /> {course.duration}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={12} style={{ color: '#fbbf24' }} /> {course.rating}
                </span>
                <span style={{
                  background: 'var(--card-bg)',
                  padding: '2px 6px',
                  borderRadius: 4
                }}>
                  {course.level}
                </span>
              </div>
            </div>
            
            <button
              style={{
                padding: 8,
                borderRadius: 8,
                border: 'none',
                background: 'var(--primary)',
                color: 'white',
                cursor: 'pointer',
                alignSelf: 'center',
                flexShrink: 0
              }}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationEngine;
