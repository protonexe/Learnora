const FlashcardBuilder = ({ onSave, showToast }) => {
  const [deckTitle, setDeckTitle] = React.useState('');
  const [deckDescription, setDeckDescription] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [currentCard, setCurrentCard] = React.useState({ front: '', back: '' });
  const isMobile = window.innerWidth <= 768;

  const addCard = () => {
    if (!currentCard.front.trim() || !currentCard.back.trim()) {
      showToast?.('Please fill in both front and back', 'error');
      return;
    }
    setCards([...cards, { ...currentCard, id: Date.now() }]);
    setCurrentCard({ front: '', back: '' });
  };

  const removeCard = (idx) => {
    setCards(cards.filter((_, i) => i !== idx));
  };

  const saveDeck = () => {
    if (!deckTitle.trim()) {
      showToast?.('Please enter a deck title', 'error');
      return;
    }
    if (cards.length === 0) {
      showToast?.('Please add at least one card', 'error');
      return;
    }
    onSave?.({
      title: deckTitle,
      description: deckDescription,
      cards,
      createdAt: Date.now()
    });
    showToast?.('Flashcard deck created!', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Deck Info */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        padding: '20px',
        border: '1px solid var(--border-color)'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0' }}>Deck Details</h3>
        <input
          type="text"
          placeholder="Deck title..."
          value={deckTitle}
          onChange={(e) => setDeckTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '12px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            fontSize: '14px'
          }}
        />
        <input
          type="text"
          placeholder="Description (optional)..."
          value={deckDescription}
          onChange={(e) => setDeckDescription(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            fontSize: '14px'
          }}
        />
      </div>

      {/* Add Card */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        padding: '20px',
        border: '1px solid var(--border-color)'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0' }}>Add Flashcard</h3>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>
            Front (Question)
          </label>
          <textarea
            placeholder="Enter the question or term..."
            value={currentCard.front}
            onChange={(e) => setCurrentCard({ ...currentCard, front: e.target.value })}
            rows={2}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-primary)',
              fontSize: '14px',
              resize: 'none'
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>
            Back (Answer)
          </label>
          <textarea
            placeholder="Enter the answer or definition..."
            value={currentCard.back}
            onChange={(e) => setCurrentCard({ ...currentCard, back: e.target.value })}
            rows={2}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-primary)',
              fontSize: '14px',
              resize: 'none'
            }}
          />
        </div>

        <button
          onClick={addCard}
          style={{
            width: '100%',
            padding: '12px',
            background: 'var(--accent-teal)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            color: '#fff'
          }}
        >
          + Add Card
        </button>
      </div>

      {/* Cards Preview */}
      {cards.length > 0 && (
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          padding: '20px',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0' }}>
            Cards ({cards.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {cards.map((card, idx) => (
              <div key={card.id || idx} style={{
                padding: '12px',
                background: 'var(--bg-tertiary)',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '13px', fontWeight: '500', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Front: {card.front}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Back: {card.back}
                  </p>
                </div>
                <button
                  onClick={() => removeCard(idx)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--danger)',
                    padding: '8px'
                  }}
                >
                  <Icon name="trash-2" size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={saveDeck}
        style={{
          padding: '16px',
          background: 'var(--accent-teal)',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '700',
          color: '#fff'
        }}
      >
        Create Deck
      </button>
    </div>
  );
};

window.FlashcardBuilder = FlashcardBuilder;
