const LearningCards = ({ onClose }) => {
  const [cards, setCards] = React.useState([
    { id: 1, question: 'What is the capital of France?', answer: 'Paris', subject: 'Geography', difficulty: 'easy' },
    { id: 2, question: 'What is H2O?', answer: 'Water', subject: 'Chemistry', difficulty: 'easy' },
    { id: 3, question: 'What year did WW2 end?', answer: '1945', subject: 'History', difficulty: 'medium' },
    { id: 4, question: 'What is the speed of light?', answer: '299,792,458 m/s', subject: 'Physics', difficulty: 'hard' },
    { id: 5, question: 'Who wrote Romeo and Juliet?', answer: 'William Shakespeare', subject: 'English', difficulty: 'medium' },
  ]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [filter, setFilter] = React.useState('all');
  const [showAddCard, setShowAddCard] = React.useState(false);
  const [newCard, setNewCard] = React.useState({ question: '', answer: '', subject: '', difficulty: 'easy' });

  const subjects = ['Geography', 'Chemistry', 'History', 'Physics', 'English', 'Mathematics', 'Biology'];
  const difficulties = ['easy', 'medium', 'hard'];
  const colors = { easy: '#10b981', medium: '#f59e0b', hard: '#f43f5e' };

  const filteredCards = filter === 'all' ? cards : cards.filter(c => c.subject === filter);

  const addCard = () => {
    if (!newCard.question || !newCard.answer) return;
    setCards([...cards, { id: Date.now(), ...newCard }]);
    setNewCard({ question: '', answer: '', subject: '', difficulty: 'easy' });
    setShowAddCard(false);
  };

  const deleteCard = (id) => {
    setCards(cards.filter(c => c.id !== id));
    if (currentIndex >= filteredCards.length - 1) {
      setCurrentIndex(Math.max(0, filteredCards.length - 2));
    }
  };

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((currentIndex + 1) % filteredCards.length);
  };

  const prevCard = () => {
    setShowAnswer(false);
    setCurrentIndex((currentIndex - 1 + filteredCards.length) % filteredCards.length);
  };

  const currentCard = filteredCards[currentIndex];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-primary)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            cursor: 'pointer'
          }}>
            ← Back
          </button>
          <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>🃏 Quick Cards</h2>
        </div>
        <button
          onClick={() => setShowAddCard(true)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            background: 'white',
            color: '#f59e0b',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600
          }}
        >
          + Add Card
        </button>
      </div>

      <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 8 }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '8px 14px',
              borderRadius: 20,
              border: 'none',
              background: filter === 'all' ? 'var(--primary)' : 'var(--bg-secondary)',
              color: filter === 'all' ? 'white' : 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: 12,
              whiteSpace: 'nowrap'
            }}
          >
            All ({cards.length})
          </button>
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setFilter(subject)}
              style={{
                padding: '8px 14px',
                borderRadius: 20,
                border: 'none',
                background: filter === subject ? 'var(--primary)' : 'var(--bg-secondary)',
                color: filter === subject ? 'white' : 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: 12,
                whiteSpace: 'nowrap'
              }}
            >
              {subject} ({cards.filter(c => c.subject === subject).length})
            </button>
          ))}
        </div>

        {/* Card Display */}
        {filteredCards.length > 0 && currentCard ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div
              onClick={() => setShowAnswer(!showAnswer)}
              style={{
                flex: 1,
                background: 'var(--bg-secondary)',
                borderRadius: 16,
                padding: 32,
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                minHeight: 300,
                position: 'relative'
              }}
            >
              <span style={{
                position: 'absolute',
                top: 16,
                left: 16,
                padding: '4px 10px',
                background: colors[currentCard.difficulty] + '20',
                color: colors[currentCard.difficulty],
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase'
              }}>
                {currentCard.difficulty}
              </span>
              
              <span style={{
                position: 'absolute',
                top: 16,
                right: 16,
                padding: '4px 10px',
                background: 'var(--bg)',
                color: 'var(--text-secondary)',
                borderRadius: 6,
                fontSize: 11
              }}>
                {currentCard.subject}
              </span>

              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>QUESTION</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--text-primary)', textAlign: 'center', marginBottom: 32 }}>
                {currentCard.question}
              </div>

              {showAnswer && (
                <div style={{
                  width: '100%',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: 24,
                  marginTop: 16,
                  animation: 'fadeIn 0.2s ease'
                }}>
                  <div style={{ fontSize: 14, color: '#10b981', marginBottom: 12, textAlign: 'center' }}>ANSWER</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', textAlign: 'center' }}>
                    {currentCard.answer}
                  </div>
                </div>
              )}

              {!showAnswer && (
                <div style={{ color: 'var(--text-tertiary)', fontSize: 13 }}>
                  Tap to reveal answer
                </div>
              )}
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
              <button
                onClick={prevCard}
                style={{
                  padding: '12px 20px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                ← Previous
              </button>
              
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                {currentIndex + 1} / {filteredCards.length}
              </span>

              <button
                onClick={nextCard}
                style={{
                  padding: '12px 20px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'var(--primary)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600
                }}
              >
                Next →
              </button>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
            No cards in this category
          </div>
        )}
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 20,
            width: 340,
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Add New Card</h3>
            <textarea
              value={newCard.question}
              onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
              placeholder="Question..."
              style={{
                width: '100%',
                minHeight: 60,
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                fontSize: 14,
                fontFamily: 'inherit',
                marginBottom: 12,
                resize: 'vertical'
              }}
            />
            <input
              type="text"
              value={newCard.answer}
              onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
              placeholder="Answer..."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                fontSize: 14,
                marginBottom: 12
              }}
            />
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <select
                value={newCard.subject}
                onChange={(e) => setNewCard({ ...newCard, subject: e.target.value })}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  fontSize: 14
                }}
              >
                <option value="">Select Subject</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select
                value={newCard.difficulty}
                onChange={(e) => setNewCard({ ...newCard, difficulty: e.target.value })}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  fontSize: 14
                }}
              >
                {difficulties.map(d => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={addCard}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'var(--primary)',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Add Card
              </button>
              <button
                onClick={() => setShowAddCard(false)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
