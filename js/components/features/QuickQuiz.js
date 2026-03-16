const QuickQuiz = ({ onBack, showToast }) => {
  const questions = [
    { q: 'What is 15 + 27?', options: ['40', '42', '44', '46'], ans: 1 },
    { q: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'], ans: 2 },
    { q: 'What is H2O?', options: ['Salt', 'Water', 'Sugar', 'Oxygen'], ans: 1 },
    { q: 'Who wrote Romeo and Juliet?', options: ['Shakespeare', 'Hemingway', 'Austen', 'Dickens'], ans: 0 },
    { q: 'What is the square root of 64?', options: ['6', '7', '8', '9'], ans: 2 }
  ];

  const [current, setCurrent] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const answer = (idx) => {
    setSelected(idx);
    if (idx === questions[current].ans) {
      setScore(s => s + 1);
    }
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(c => c + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 500);
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setSelected(null);
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="view-container">
        <header className="view-header">
          <button className="back-btn" onClick={onBack}>←</button>
          <h1>Quiz Results</h1>
        </header>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ background: percentage >= 60 ? '#10b981' : '#ef4444', padding: '40px', borderRadius: '25px', color: 'white', marginBottom: '25px' }}>
            <div style={{ fontSize: '64px', marginBottom: '15px' }}>{percentage >= 60 ? '🎉' : '💪'}</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{percentage}%</div>
            <div style={{ opacity: 0.9 }}>{score} of {questions.length} correct</div>
          </div>
          <button onClick={restart} style={{ padding: '15px 40px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: '600' }}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Quick Quiz</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <span style={{ color: '#6b7280' }}>Question {current + 1}/{questions.length}</span>
          <div style={{ background: '#f3f4f6', borderRadius: '10px', height: '8px', marginTop: '10px' }}>
            <div style={{ width: `${((current + 1) / questions.length) * 100}%`, height: '100%', background: '#6366f1', borderRadius: '10px' }} />
          </div>
        </div>
        <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>{questions[current].q}</h2>
        <div style={{ display: 'grid', gap: '12px' }}>
          {questions[current].options.map((opt, i) => (
            <button key={i} onClick={() => answer(i)} disabled={selected !== null} style={{ padding: '18px', border: 'none', borderRadius: '12px', background: selected === i ? (i === questions[current].ans ? '#10b981' : '#ef4444') : 'white', color: selected !== null && i === questions[current].ans ? 'white' : '#1f2937', cursor: selected !== null ? 'default' : 'pointer', fontSize: '16px', fontWeight: '500', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

window.QuickQuiz = QuickQuiz;
