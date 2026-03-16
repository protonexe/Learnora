import React from 'react';
import { Star, ThumbsUp, MessageCircle, Filter, TrendingUp } from './Icon';

const StarRating = ({ rating, onRate, readonly = false, size = 20 }) => {
  const [hover, setHover] = React.useState(0);
  
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => !readonly && onRate?.(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          style={{
            cursor: readonly ? 'default' : 'pointer',
            fontSize: size,
            color: star <= (hover || rating) ? '#fbbf24' : '#d1d5db',
            transition: 'transform 0.1s',
            transform: star === (hover || rating) ? 'scale(1.2)' : 'scale(1)'
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ReviewCard = ({ review, onHelpful }) => {
  const [helpful, setHelpful] = React.useState(false);
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      border: '1px solid var(--border-color)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <img 
          src={review.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.user}`} 
          alt={review.user}
          style={{ width: 40, height: 40, borderRadius: '50%' }}
        />
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{review.user}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{review.date}</div>
        </div>
        <StarRating rating={review.rating} readonly size={16} />
      </div>
      <p style={{ color: 'var(--text-primary)', marginBottom: 12 }}>{review.text}</p>
      <button
        onClick={() => { setHelpful(!helpful); onHelpful?.(review.id); }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          color: helpful ? 'var(--primary)' : 'var(--text-secondary)',
          fontSize: 13
        }}
      >
        <ThumbsUp size={14} /> Helpful ({review.helpful + (helpful ? 1 : 0)})
      </button>
    </div>
  );
};

const CourseReviews = ({ courseId, reviews: initialReviews = [], onSubmitReview }) => {
  const [reviews, setReviews] = React.useState(initialReviews);
  const [showForm, setShowForm] = React.useState(false);
  const [newReview, setNewReview] = React.useState({ rating: 5, text: '' });
  const [filter, setFilter] = React.useState('all');
  
  const filteredReviews = React.useMemo(() => {
    if (filter === 'all') return reviews;
    if (filter === '5') return reviews.filter(r => r.rating === 5);
    if (filter === '4') return reviews.filter(r => r.rating === 4);
    if (filter === '3') return reviews.filter(r => r.rating === 3);
    if (filter === '2') return reviews.filter(r => r.rating === 2);
    if (filter === '1') return reviews.filter(r => r.rating === 1);
    return reviews;
  }, [reviews, filter]);
  
  const avgRating = reviews.length 
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : 0;
  
  const handleSubmit = () => {
    if (!newReview.text.trim()) return;
    const review = {
      id: Date.now(),
      user: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you',
      date: new Date().toLocaleDateString(),
      rating: newReview.rating,
      text: newReview.text,
      helpful: 0
    };
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, text: '' });
    setShowForm(false);
    onSubmitReview?.(review);
  };
  
  return (
    <div style={{ padding: 20 }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        borderRadius: 16,
        padding: 24,
        color: 'white',
        marginBottom: 24
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 48, fontWeight: 700 }}>{avgRating}</div>
          <div>
            <StarRating rating={Math.round(avgRating)} readonly size={24} />
            <div style={{ opacity: 0.8, marginTop: 4 }}>{reviews.length} reviews</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
          {['all', '5', '4', '3', '2', '1'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 12px',
                borderRadius: 20,
                border: 'none',
                background: filter === f ? 'white' : 'rgba(255,255,255,0.2)',
                color: filter === f ? 'var(--primary)' : 'white',
                cursor: 'pointer',
                fontSize: 13
              }}
            >
              {f === 'all' ? 'All' : `${f} ★`}
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          width: '100%',
          padding: 14,
          borderRadius: 12,
          border: '2px dashed var(--border-color)',
          background: 'transparent',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          marginBottom: 20,
          fontSize: 14
        }}
      >
        + Write a Review
      </button>
      
      {showForm && (
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: 12,
          padding: 20,
          marginBottom: 20,
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)' }}>Your Rating</label>
            <StarRating rating={newReview.rating} onRate={(r) => setNewReview({ ...newReview, rating: r })} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)' }}>Your Review</label>
            <textarea
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              placeholder="Share your experience with this course..."
              style={{
                width: '100%',
                minHeight: 100,
                padding: 12,
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => setShowForm(false)}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'transparent',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 8,
                border: 'none',
                background: 'var(--primary)',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
      
      <div>
        {filteredReviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export { CourseReviews, StarRating, ReviewCard };
