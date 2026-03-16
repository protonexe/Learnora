const QuickQuote = ({ onBack }) => {
  const quotes = [
    { text: 'The expert in anything was once a beginner.', author: 'Helen Hayes' },
    { text: 'Success is not final, failure is not fatal.', author: 'Winston Churchill' },
    { text: 'Education is the passport to the future.', author: 'Malcolm X' },
    { text: 'The beautiful thing about learning is that no one can take it away.', author: 'B.B. King' }
  ];
  const [idx, setIdx] = React.useState(Math.floor(Math.random() * quotes.length));

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Daily Quote</h1>
      </header>
      <div style={{ padding: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', color: '#6366f1' }}>"</div>
          <p style={{ fontSize: '24px', fontStyle: 'italic', color: '#1f2937', marginBottom: '20px' }}>{quotes[idx].text}</p>
          <p style={{ color: '#6b7280', fontSize: '18px' }}>— {quotes[idx].author}</p>
        </div>
      </div>
    </div>
  );
};

window.QuickQuote = QuickQuote;
