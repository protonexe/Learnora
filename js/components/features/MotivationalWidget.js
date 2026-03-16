const MotivationalWidget = ({ onBack, showToast }) => {
  const quotes = [
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
    { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
    { text: "The roots of education are bitter, but the fruit is sweet.", author: "Aristotle" },
    { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" }
  ];

  const [currentQuote, setCurrentQuote] = React.useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  const [favorites, setFavorites] = React.useState(() => JSON.parse(localStorage.getItem('quote-favorites')) || []);

  const newQuote = () => {
    let newQ;
    do {
      newQ = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQ.text === currentQuote.text);
    setCurrentQuote(newQ);
  };

  const toggleFavorite = () => {
    const isFav = favorites.some(q => q.text === currentQuote.text);
    const updated = isFav ? favorites.filter(q => q.text !== currentQuote.text) : [...favorites, currentQuote];
    setFavorites(updated);
    localStorage.setItem('quote-favorites', JSON.stringify(updated));
    showToast?.(isFav ? 'Removed from favorites' : 'Added to favorites', 'success');
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Daily Motivation</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="quote-card" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '40px', borderRadius: '25px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>"</div>
          <p style={{ fontSize: '22px', lineHeight: '1.6', marginBottom: '25px', fontStyle: 'italic' }}>{currentQuote.text}</p>
          <p style={{ opacity: 0.9, fontSize: '16px' }}>— {currentQuote.author}</p>
        </div>

        <div className="actions" style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          <button onClick={newQuote} style={{ flex: 1, padding: '15px', background: '#1f2937', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span>🔄</span> New Quote
          </button>
          <button onClick={toggleFavorite} style={{ padding: '15px 25px', background: 'white', border: '2px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', fontSize: '20px' }}>
            {favorites.some(q => q.text === currentQuote.text) ? '❤️' : '🤍'}
          </button>
        </div>

        {favorites.length > 0 && (
          <div>
            <h3 style={{ marginBottom: '15px', color: '#374151' }}>Favorites ({favorites.length})</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {favorites.map((q, i) => (
                <div key={i} style={{ background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <p style={{ color: '#374151', marginBottom: '8px', fontStyle: 'italic' }}>"{q.text}"</p>
                  <p style={{ color: '#9ca3af', fontSize: '13px' }}>— {q.author}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

window.MotivationalWidget = MotivationalWidget;
