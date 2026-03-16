const FlashcardBuilder = ({ onClose }) => {
  const [cards, setCards] = React.useState([]);
  const [showAdd, setShowAdd] = React.useState(false);
  const [newCard, setNewCard] = React.useState({ front: '', back: '' });

  const addCard = () => {
    if (!newCard.front || !newCard.back) return;
    setCards([...cards, { id: Date.now(), ...newCard }]);
    setNewCard({ front: '', back: '' });
    setShowAdd(false);
  };

  const deleteCard = (id) => setCards(cards.filter(c => c.id !== id));

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
          <h2 style={{ margin: 0, fontSize: 20 }}>🃏 Flashcard Builder</h2>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>+ Add</button>
      </div>

      <div style={{ padding: 20 }}>
        {showAdd && (
          <div style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, marginBottom: 20, border: '1px solid var(--border-color)' }}>
            <input type="text" value={newCard.front} onChange={(e) => setNewCard({ ...newCard, front: e.target.value })} placeholder="Front (question)..." style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
            <input type="text" value={newCard.back} onChange={(e) => setNewCard({ ...newCard, back: e.target.value })} placeholder="Back (answer)..." style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={addCard} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Add Card</button>
              <button onClick={() => setShowAdd(false)} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12 }}>
          {cards.map(card => (
            <div key={card.id} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)', position: 'relative' }}>
              <button onClick={() => deleteCard(card.id)} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}>×</button>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>Front: {card.front}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Back: {card.back}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
