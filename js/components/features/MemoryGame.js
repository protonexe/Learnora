const MemoryGame = ({ onBack, showToast }) => {
  const [cards, setCards] = React.useState([]);
  const [flipped, setFlipped] = React.useState([]);
  const [matched, setMatched] = React.useState([]);
  const [moves, setMoves] = React.useState(0);

  const symbols = ['🍎', '🍊', '🍋', '🍇', '🍓', '🥝', '🍑', '🍒'];
  const [isInitialized, setIsInitialized] = React.useState(false);

  const initGame = () => {
    const deck = [...symbols, ...symbols].sort(() => Math.random() - 0.5).map((s, i) => ({ id: i, symbol: s }));
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsInitialized(true);
  };

  React.useEffect(() => { initGame(); }, []);

  const handleFlip = (idx) => {
    if (flipped.length === 2 || matched.includes(idx) || flipped.includes(idx)) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [i1, i2] = newFlipped;
      if (cards[i1].symbol === cards[i2].symbol) {
        setMatched([...matched, i1, i2]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          showToast?.(`You won in ${moves + 1} moves!`, 'success');
        }
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Memory Match</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <span style={{ fontWeight: '600' }}>Moves: {moves}</span>
          <button onClick={initGame} style={{ padding: '8px 16px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Restart</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {cards.map((card, i) => (
            <div key={i} onClick={() => handleFlip(i)} style={{ aspectRatio: '1', background: flipped.includes(i) || matched.includes(i) ? 'white' : '#6366f1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              {flipped.includes(i) || matched.includes(i) ? card.symbol : '?'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.MemoryGame = MemoryGame;
