const QuickMath = ({ onBack, showToast }) => {
  const [a, setA] = React.useState(0);
  const [b, setB] = React.useState(0);
  const [op, setOp] = React.useState('+');
  const [answer, setAnswer] = React.useState('');
  const [score, setScore] = React.useState(0);

  const next = () => {
    setA(Math.floor(Math.random() * 20) + 1);
    setB(Math.floor(Math.random() * 20) + 1);
    setOp(['+', '-', '*'][Math.floor(Math.random() * 3)]);
    setAnswer('');
  };

  React.useEffect(() => { next(); }, []);

  const check = () => {
    const correct = op === '+' ? a + b : op === '-' ? a - b : a * b;
    if (parseInt(answer) === correct) {
      setScore(score + 1);
      showToast?.('Correct!', 'success');
    }
    next();
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Quick Math</h1>
      </header>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ background: '#ecfdf5', padding: '15px', borderRadius: '12px', marginBottom: '25px' }}>
          <span style={{ fontWeight: '600', color: '#10b981', fontSize: '24px' }}>Score: {score}</span>
        </div>
        <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '25px', color: '#1f2937' }}>{a} {op} {b} = ?</div>
        <input type="number" value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && check()} placeholder="?" style={{ fontSize: '32px', width: '150px', textAlign: 'center', padding: '15px', borderRadius: '15px', border: '3px solid #6366f1', marginBottom: '20px' }} />
        <br />
        <button onClick={check} style={{ padding: '15px 50px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontSize: '18px' }}>Submit</button>
      </div>
    </div>
  );
};

window.QuickMath = QuickMath;
