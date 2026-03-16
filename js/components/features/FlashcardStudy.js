const FlashcardStudy = ({ onBack }) => {
  const [cards] = React.useState([
    { front: 'What is H2O?', back: 'Water' },
    { front: 'Capital of France?', back: 'Paris' },
    { front: '5 x 6?', back: '30' },
    { front: 'Largest planet?', back: 'Jupiter' }
  ]);
  const [current, setCurrent] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);

  const next = () => {
    setFlipped(false);
    setCurrent((current + 1) % cards.length);
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Flashcard Study</h1>
      </header>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
        <div onClick={() => setFlipped(!flipped)} style={{ width: '100%', maxWidth: '350px', height: '220px', background: flipped ? '#10b981' : '#6366f1', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <p style={{ color: 'white', fontSize: '24px', textAlign: 'center', padding: '20px', fontWeight: '600' }}>
            {flipped ? cards[current].back : cards[current].front}
          </p>
        </div>
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>{current + 1} / {cards.length}</p>
        <button onClick={next} style={{ padding: '15px 50px', background: '#1f2937', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontSize: '18px' }}>Next Card</button>
      </div>
    </div>
  );
};

window.FlashcardStudy = FlashcardStudy;
