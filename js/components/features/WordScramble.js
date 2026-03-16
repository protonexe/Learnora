const WordScramble = ({ onBack, showToast }) => {
  const words = ['STUDY', 'LEARN', 'BOOK', 'QUIZ', 'FOCUS', 'NOTES', 'EXAM', 'SCHOOL'];
  const [word, setWord] = React.useState('');
  const [scrambled, setScrambled] = React.useState('');
  const [guess, setGuess] = React.useState('');
  const [score, setScore] = React.useState(0);

  const newWord = () => {
    const w = words[Math.floor(Math.random() * words.length)];
    setWord(w);
    setScrambled(w.split('').sort(() => Math.random() - 0.5).join(''));
    setGuess('');
  };

  React.useEffect(() => { newWord(); }, []);

  const check = () => {
    if (guess.toUpperCase() === word) {
      setScore(score + 10);
      showToast?.('Correct! +10 points', 'success');
      newWord();
    } else {
      showToast?.('Wrong! Try again.', 'error');
    }
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Word Scramble</h1>
      </header>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ background: '#ecfdf5', padding: '15px', borderRadius: '12px', marginBottom: '25px' }}>
          <span style={{ fontWeight: '600', color: '#10b981' }}>Score: {score}</span>
        </div>
        <div style={{ fontSize: '48px', letterSpacing: '10px', fontWeight: 'bold', marginBottom: '30px', color: '#6366f1' }}>{scrambled}</div>
        <input value={guess} onChange={(e) => setGuess(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && check()} placeholder="Unscramble..." style={{ fontSize: '24px', padding: '15px', borderRadius: '12px', border: '2px solid #e5e7eb', width: '80%', marginBottom: '20px', textAlign: 'center' }} />
        <br />
        <button onClick={check} style={{ padding: '15px 50px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontSize: '18px' }}>Submit</button>
        <button onClick={newWord} style={{ marginLeft: '10px', padding: '15px 30px', background: '#f3f4f6', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>Skip</button>
      </div>
    </div>
  );
};

window.WordScramble = WordScramble;
