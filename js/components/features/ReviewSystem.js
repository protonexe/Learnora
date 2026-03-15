const ReviewSystem = ({ itemId, itemType, showToast }) => {
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const submitReview = () => {
    if (rating === 0) {
      showToast?.('Please select a rating', 'error');
      return;
    }

    const reviews = JSON.parse(localStorage.getItem('learnora-reviews') || '[]');
    reviews.push({
      id: Date.now(),
      itemId,
      itemType,
      rating,
      comment,
      createdAt: Date.now()
    });
    localStorage.setItem('learnora-reviews', JSON.stringify(reviews));
    setSubmitted(true);
    showToast?.('Review submitted!', 'success');
  };

  if (submitted) {
    return (
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
        border: '1px solid var(--border-color)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
        <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px 0' }}>Thank you!</h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
          Your review helps others learn better.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-xl)',
      padding: '24px',
      border: '1px solid var(--border-color)'
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0' }}>Rate this {itemType}</h3>

      {/* Stars */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '20px'
      }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '32px',
              transition: 'transform 0.2s ease'
            }}
          >
            {star <= (hoverRating || rating) ? '⭐' : '☆'}
          </button>
        ))}
      </div>

      <textarea
        placeholder="Write a review (optional)..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '16px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          background: 'var(--bg-primary)',
          fontSize: '14px',
          resize: 'none'
        }}
      />

      <button
        onClick={submitReview}
        style={{
          width: '100%',
          padding: '14px',
          background: 'var(--primary-500)',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          color: '#fff'
        }}
      >
        Submit Review
      </button>
    </div>
  );
};

const RatingDisplay = ({ rating, showCount = true, count = 0 }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} style={{ color: '#f59e0b' }}>⭐</span>
      ))}
      {hasHalf && <span style={{ color: '#f59e0b' }}>⭐</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} style={{ color: 'var(--text-tertiary)' }}>☆</span>
      ))}
      {showCount && (
        <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginLeft: '4px' }}>
          ({count})
        </span>
      )}
    </div>
  );
};

window.ReviewSystem = ReviewSystem;
window.RatingDisplay = RatingDisplay;
