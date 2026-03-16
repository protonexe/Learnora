const FlashcardBuilder = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [decks, setDecks] = React.useState(() => JSON.parse(localStorage.getItem('flashcard-decks') || '[]'));
  const [showCreate, setShowCreate] = React.useState(false);
  const [selectedDeck, setSelectedDeck] = React.useState(null);
  const [newDeck, setNewDeck] = React.useState({ name: '', subject: '' });
  const [newCard, setNewCard] = React.useState({ front: '', back: '' });

  React.useEffect(() => { localStorage.setItem('flashcard-decks', JSON.stringify(decks)); }, [decks]);

  const createDeck = () => {
    if (!newDeck.name) return;
    const deck = { id: Date.now(), name: newDeck.name, subject: newDeck.subject, cards: [], createdAt: new Date().toISOString() };
    setDecks([...decks, deck]);
    setNewDeck({ name: '', subject: '' });
    setShowCreate(false);
    showToast?.('Deck created!', 'success');
  };

  const addCard = () => {
    if (!newCard.front || !newCard.back || !selectedDeck) return;
    setDecks(decks.map(d => d.id === selectedDeck.id ? { ...d, cards: [...d.cards, { id: Date.now(), ...newCard }] } : d));
    setNewCard({ front: '', back: '' });
    showToast?.('Card added!', 'success');
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>🃏 Flashcard Builder</h1>
        </div>
        <button onClick={() => setShowCreate(true)} style={styles.addButton}><Icon name="plus" size={18} /> New Deck</button>
      </div>

      {showCreate && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Create New Deck</h3>
          <input type="text" value={newDeck.name} onChange={(e) => setNewDeck({...newDeck, name: e.target.value})} placeholder="Deck name" style={styles.input} />
          <input type="text" value={newDeck.subject} onChange={(e) => setNewDeck({...newDeck, subject: e.target.value})} placeholder="Subject" style={styles.input} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={createDeck} style={styles.primaryButton}>Create</button>
            <button onClick={() => setShowCreate(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      {selectedDeck && (
        <div style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={styles.cardTitle}>Add to: {selectedDeck.name}</h3>
            <button onClick={() => setSelectedDeck(null)} style={styles.closeButton}>×</button>
          </div>
          <input type="text" value={newCard.front} onChange={(e) => setNewCard({...newCard, front: e.target.value})} placeholder="Front (question)" style={styles.input} />
          <input type="text" value={newCard.back} onChange={(e) => setNewCard({...newCard, back: e.target.value})} placeholder="Back (answer)" style={styles.input} />
          <button onClick={addCard} style={styles.primaryButton}>Add Card</button>
        </div>
      )}

      {decks.length === 0 ? (
        <div style={styles.emptyState}><p>No flashcard decks yet. Create one!</p></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '16px' }}>
          {decks.map(deck => (
            <div key={deck.id} style={styles.deckCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={styles.deckName}>{deck.name}</h3>
                  <p style={styles.deckMeta}>{deck.subject} • {deck.cards.length} cards</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button onClick={() => setSelectedDeck(deck)} style={styles.actionButton}>+ Add Cards</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  addButton: { display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  cardTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' },
  input: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  primaryButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  closeButton: { background: 'transparent', border: 'none', fontSize: '24px', color: 'var(--text-tertiary)', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '60px', color: 'var(--text-tertiary)' },
  deckCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px' },
  deckName: { fontSize: '18px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  deckMeta: { fontSize: '13px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' },
  actionButton: { padding: '8px 16px', background: 'var(--primary-100)', color: 'var(--primary-600)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }
};

window.FlashcardBuilder = FlashcardBuilder;
