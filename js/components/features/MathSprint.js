const MathSprint = ({ onBack, showToast }) => {
  const [num1, setNum1] = React.useState(0);
  const [num2, setNum2] = React.useState(0);
  const [op, setOp] = React.useState('+');
  const [answer, setAnswer] = React.useState('');
  const [score, setScore] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(60);
  const [gameOver, setGameOver] = React.useState(false);

  const generateProblem = () => {
    setNum1(Math.floor(Math.random() * 20) + 1);
    setNum2(Math.floor(Math.random() * 20) + 1);
    setOp(['+', '-', '*'][Math.floor(Math.random() * 3)]);
    setAnswer('');
  };

  React.useEffect(() => { generateProblem(); }, []);
  React.useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(t);
    } else if (timeLeft === 0) {
      setGameOver(true);
      showToast?.(`Game over! Score: ${score}`, 'info');
    }
  }, [timeLeft, gameOver, score]);

  const checkAnswer = () => {
    const correct = op === '+' ? num1 + num2 : op === '-' ? num1 - num2 : num1 * num2;
    if (parseInt(answer) === correct) {
      setScore(score + 1);
      showToast?.('Correct!', 'success');
    } else {
      showToast?.('Wrong!', 'error');
    }
    generateProblem();
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Math Sprint</h1>
      </header>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <div style={{ background: '#10b981', padding: '15px 25px', borderRadius: '12px', color: 'white' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{score}</div>
            <div style={{ fontSize: '12px' }}>Score</div>
          </div>
          <div style={{ background: '#ef4444', padding: '15px 25px', borderRadius: '12px', color: 'white' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{timeLeft}s</div>
            <div style={{ fontSize: '12px' }}>Time</div>
          </div>
        </div>
        {gameOver ? (
          <div>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Score: {score}</div>
            <button onClick={() => { setScore(0); setTimeLeft(60); setGameOver(false); generateProblem(); }} style={{ padding: '15px 40px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontSize: '18px' }}>Play Again</button>
          </div>
        ) : (
          <>
            <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '30px', color: '#1f2937' }}>{num1} {op} {num2} = ?</div>
            <input type="number" value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && checkAnswer()} placeholder="?" style={{ fontSize: '32px', width: '150px', textAlign: 'center', padding: '15px', borderRadius: '15px', border: '3px solid #6366f1', marginBottom: '20px' }} />
            <br />
            <button onClick={checkAnswer} style={{ padding: '15px 50px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontSize: '18px' }}>Submit</button>
          </>
        )}
      </div>
    </div>
  );
};

window.MathSprint = MathSprint;
