const FlashcardPractice = ({ onBack }) => {
  const cards = [
    { front: 'What is photosynthesis?', back: 'Process by which plants convert sunlight into energy' },
    { front: 'What is the speed of light?', back: 'Approximately 299,792 km/s' },
    { front: 'What is H2O?', back: 'Water' },
    { front: 'Capital of Australia?', back: 'Canberra' },
    { front: 'What year did WW2 end?', back: '1945' }
  ];
  const [idx, setIdx] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Flashcard Practice</h1>
      </header>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
        <div onClick={() => setFlipped(!flipped)} style={{ width: '100%', maxWidth: '350px', minHeight: '200px', background: flipped ? '#10b981' : '#6366f1', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', padding: '20px' }}>
          <p style={{ color: 'white', fontSize: '20px', textAlign: 'center', fontWeight: '600' }}>{flipped ? cards[idx].back : cards[idx].front}</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => { setIdx(Math.max(0, idx - 1)); setFlipped(false); }} style={{ padding: '12px 25px', background: '#e5e7eb', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>Previous</button>
          <button onClick={() => { setIdx((idx + 1) % cards.length); setFlipped(false); }} style={{ padding: '12px 25px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>Next</button>
        </div>
        <p style={{ marginTop: '20px', color: '#6b7280' }}>{idx + 1} / {cards.length}</p>
      </div>
    </div>
  );
};

window.FlashcardPractice = FlashcardPractice;
