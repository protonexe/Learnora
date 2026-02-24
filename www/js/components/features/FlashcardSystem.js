const FlashcardSystem = ({ deck, onClose }) => {
  const [currentCard, setCurrentCard] = React.useState(0);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [knownCards, setKnownCards] = React.useState([]);
  const [learningCards, setLearningCards] = React.useState([]);
  const [showStats, setShowStats] = React.useState(false);
  
  // Swipe gesture state
  const [swipeX, setSwipeX] = React.useState(0);
  const [swiping, setSwiping] = React.useState(false);
  const startX = React.useRef(0);
  const swipeThreshold = 100;

  // Safety check for deck data
  const cards = deck?.cards || [];
  const card = cards[currentCard] || { front: 'No card', back: 'No content' };
  const progress = cards.length > 0 ? ((knownCards.length + learningCards.length) / cards.length) * 100 : 0;

  const triggerHaptic = (pattern = [10]) => {
    if (navigator.vibrate) navigator.vibrate(pattern);
  };

  const goToNext = () => {
    setIsFlipped(false);
    setSwipeX(0);
    if (currentCard < cards.length - 1) {
      setTimeout(() => setCurrentCard(currentCard + 1), 200);
    } else {
      setShowStats(true);
    }
  };

  const handleKnown = () => {
    triggerHaptic([15, 50, 15]);
    setKnownCards([...knownCards, currentCard]);
    goToNext();
  };

  const handleLearning = () => {
    triggerHaptic([30]);
    setLearningCards([...learningCards, currentCard]);
    goToNext();
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    if (!isFlipped) return;
    startX.current = e.touches[0].clientX;
    setSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!swiping || !isFlipped) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;
    setSwipeX(diff);
  };

  const handleTouchEnd = () => {
    if (!swiping || !isFlipped) return;
    setSwiping(false);
    
    if (swipeX > swipeThreshold) {
      // Swipe right = Known
      handleKnown();
    } else if (swipeX < -swipeThreshold) {
      // Swipe left = Learning
      handleLearning();
    } else {
      setSwipeX(0);
    }
  };

  const resetDeck = () => { 
    setCurrentCard(0); 
    setIsFlipped(false); 
    setKnownCards([]); 
    setLearningCards([]); 
    setShowStats(false);
    setSwipeX(0);
  };

  // Show error if no cards
  if (cards.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <Icon name="alert-circle" size={48} color="var(--danger)" />
        <h3 style={{ marginTop: '16px', fontSize: '18px', color: 'var(--text-primary)' }}>
          No flashcards available
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          This deck doesn't have any cards yet.
        </p>
        <Button onClick={onClose} style={{ marginTop: '24px' }}>Close</Button>
      </div>
    );
  }

  if (showStats) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-xl)' }}>
        <div style={{ 
          width: '100px', 
          height: '100px', 
          margin: '0 auto 24px', 
          background: 'var(--success)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          animation: 'scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}>
          <Icon name="check" size={48} color="#FFF" />
        </div>
        <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          Deck Complete! 🎉
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>
          You've reviewed all {cards.length} cards
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '36px', fontWeight: '800', color: 'var(--success)' }}>{knownCards.length}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>Known</div>
          </div>
          <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '36px', fontWeight: '800', color: 'var(--warning)' }}>{learningCards.length}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>Learning</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" onClick={onClose} fullWidth>Done</Button>
          <Button onClick={resetDeck} fullWidth icon="refresh-cw">Study Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <ProgressBar 
          value={progress} 
          height={6} 
          color="var(--gradient-secondary)" 
          showLabel 
          label={`Card ${currentCard + 1} of ${cards.length}`} 
        />
      </div>
      
      {/* Swipe indicators */}
      {isFlipped && Math.abs(swipeX) > 20 && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: swipeX > 0 ? '20px' : 'auto',
          right: swipeX < 0 ? '20px' : 'auto',
          transform: 'translateY(-50%)',
          padding: '12px',
          background: swipeX > 0 ? 'var(--success)' : 'var(--danger)',
          borderRadius: '50%',
          opacity: Math.min(Math.abs(swipeX) / swipeThreshold, 1),
          transition: 'opacity 0.1s ease',
          zIndex: 10
        }}>
          <Icon 
            name={swipeX > 0 ? 'check' : 'x'} 
            size={24} 
            color="#fff" 
          />
        </div>
      )}
      
      <div 
        onClick={() => !swiping && setIsFlipped(!isFlipped)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ 
          perspective: '1000px', 
          cursor: 'pointer', 
          marginBottom: '28px',
          position: 'relative'
        }}
      >
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: '280px', 
          transition: swiping ? 'none' : 'transform 0.6s', 
          transformStyle: 'preserve-3d', 
          transform: `rotateY(${isFlipped ? 180 : 0}deg) translateX(${swipeX}px) rotate(${swipeX * 0.05}deg)`
        }}>
          {/* Front */}
          <div className="flashcard" style={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            backfaceVisibility: 'hidden', 
            background: 'var(--bg-secondary)', 
            border: '2px solid var(--border-color)',
            borderRadius: 'var(--radius-2xl)', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '32px', 
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <Badge style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Question
            </Badge>
            <h3 style={{ fontSize: '22px', fontWeight: '700', textAlign: 'center', lineHeight: '1.4', color: 'var(--text-primary)' }}>
              {card.front}
            </h3>
            <p style={{ fontSize: '13px', marginTop: '24px', color: 'var(--text-tertiary)' }}>
              <Icon name="rotate-cw" size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Tap to flip
            </p>
          </div>
          
          {/* Back */}
          <div className="flashcard" style={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            backfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)', 
            background: 'var(--bg-primary)', 
            border: '2px solid var(--accent-green)', 
            borderRadius: 'var(--radius-2xl)', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '32px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <Badge variant="success" style={{ marginBottom: '16px', background: 'var(--accent-green)', color: '#FFF' }}>Answer</Badge>
            <h3 style={{ fontSize: '20px', fontWeight: '600', textAlign: 'center', lineHeight: '1.5', color: 'var(--text-primary)' }}>
              {card.back}
            </h3>
            <p style={{ fontSize: '12px', marginTop: '24px', color: 'var(--text-tertiary)' }}>
              <Icon name="move-horizontal" size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Swipe left or right
            </p>
          </div>
        </div>
      </div>
      
      {isFlipped ? (
        <div style={{ display: 'flex', gap: '12px', animation: 'fadeInUp 0.3s ease' }}>
          <Button 
            variant="danger" 
            fullWidth 
            onClick={handleLearning} 
            icon="x"
            size="lg"
          >
            Still Learning
          </Button>
          <Button 
            variant="success" 
            fullWidth 
            onClick={handleKnown} 
            icon="check"
            size="lg"
          >
            Got It!
          </Button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>
            Tap the card to reveal the answer
          </p>
        </div>
      )}
    </div>
  );
};

window.FlashcardSystem = FlashcardSystem;