const DailyQuote = ({ onClose }) => {
  const quotes = [
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Education is the passport to the future.", author: "Malcolm X" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  ];
  const quote = quotes[Math.floor(Date.now() / 86400000) % quotes.length];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, color: 'white' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, padding: '10px 16px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer' }}>Close</button>
      <div style={{ fontSize: 48, marginBottom: 24 }}>💬</div>
      <p style={{ fontSize: 24, textAlign: 'center', lineHeight: 1.6, marginBottom: 24, fontStyle: 'italic' }}>"{quote.text}"</p>
      <p style={{ fontSize: 16, opacity: 0.7 }}>— {quote.author}</p>
    </div>
  );
};
