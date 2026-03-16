import React from 'react';
import { X, Star, MessageSquare, ThumbsUp, ThumbsDown, Flag, Share2, MoreHorizontal, Edit2, Trash2, Copy, Check, Clock, User } from './Icon';

const ReviewCourse = ({ onClose }) => {
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [review, setReview] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  
  const course = { title: 'Advanced Physics', instructor: 'Dr. Sarah Chen', rating: 4.8, students: 2340 };
  
  const submitReview = () => {
    if (rating > 0 && review.trim()) {
      setSubmitted(true);
    }
  };
  
  if (submitted) {
    return (
      <div style={{ background: 'var(--card-bg)', borderRadius: 16, padding: 32, width: 400, textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)' }}>Thank You!</h3>
        <p style={{ margin: '0 0 24px 0', color: 'var(--text-secondary)' }}>Your review has been submitted successfully.</p>
        <button onClick={onClose} style={{ padding: '12px 24px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600 }}>
          Done
        </button>
      </div>
    );
  }
  
  return (
    <div style={{ background: 'var(--card-bg)', borderRadius: 16, width: 450, overflow: 'hidden' }}>
      <div style={{ padding: 20, borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>⭐ Write a Review</h3>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
        </div>
      </div>
      
      <div style={{ padding: 20 }}>
        <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, marginBottom: 20, display: 'flex', gap: 14 }}>
          <div style={{ width: 60, height: 60, borderRadius: 8, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>📚</div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{course.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>{course.instructor}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: '#fbbf24' }}>★</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{course.rating}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>({course.students.toLocaleString()} students)</span>
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)', fontSize: 13 }}>Your Rating</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                style={{ fontSize: 36, background: 'none', border: 'none', cursor: 'pointer', color: star <= (hoverRating || rating) ? '#fbbf24' : '#d1d5db', transition: 'transform 0.1s' }}
              >
                ★
              </button>
            ))}
          </div>
          <div style={{ marginTop: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
            {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : rating === 5 ? 'Excellent' : 'Select a rating'}
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)', fontSize: 13 }}>Your Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="What did you like about this course? What could be improved?"
            style={{ width: '100%', minHeight: 120, padding: 12, borderRadius: 10, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }}
          />
        </div>
        
        <button
          onClick={submitReview}
          disabled={rating === 0 || !review.trim()}
          style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: rating > 0 && review.trim() ? 'var(--primary)' : 'var(--border-color)', color: 'white', cursor: rating > 0 && review.trim() ? 'pointer' : 'not-allowed', fontWeight: 600, marginBottom: 12 }}
        >
          Submit Review
        </button>
        
        <p style={{ margin: 0, textAlign: 'center', fontSize: 12, color: 'var(--text-secondary)' }}>
          Your review helps other students make informed decisions
        </p>
      </div>
    </div>
  );
};

export default ReviewCourse;
