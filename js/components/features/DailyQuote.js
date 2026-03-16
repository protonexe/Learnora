const DailyQuote = ({ onBack }) => {
  const quotes = [
    { text: "Education is the passport to the future.", author: "Malcolm X" },
    { text: "The beautiful thing about learning is that no one can take it away.", author: "B.B. King" },
    { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Gandhi" },
    { text: "An investment in knowledge pays the best interest.", author: "Franklin" }
  ];

  const [quote] = React.useState(quotes[Math.floor(Math.random() * quotes.length)]);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Daily Quote</h1>
      </header>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px', color: '#6366f1' }}>"</div>
          <p style={{ fontSize: '24px', lineHeight: '1.6', color: '#1f2937', marginBottom: '25px', fontStyle: 'italic' }}>{quote.text}</p>
          <p style={{ color: '#6b7280', fontSize: '18px' }}>— {quote.author}</p>
        </div>
      </div>
    </div>
  );
};

window.DailyQuote = DailyQuote;
