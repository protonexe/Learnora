const QuickQuiz2 = ({ onBack, showToast }) => {
  const questions = [
    { q: 'What is 12 x 12?', options: ['124', '144', '134', '154'], ans: 1 },
    { q: 'Capital of Japan?', options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'], ans: 2 },
    { q: 'What is H2O?', options: ['Gold', 'Water', 'Silver', 'Oxygen'], ans: 1 },
    { q: 'Who wrote Hamlet?', options: ['Dickens', 'Hemingway', 'Shakespeare', 'Austen'], ans: 2 },
    { q: 'Square root of 81?', options: ['7', '8', '9', '10'], ans: 2 }
  ];
  const [idx, setIdx] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [sel, setSel] = React.useState(null);

  const answer = (i) => {
    setSel(i);
    if (i === questions[idx].ans) setScore(s => s + 1);
    setTimeout(() => {
      if (idx < questions.length - 1) { setIdx(idx + 1); setSel(null); }
      else setDone(true);
    }, 500);
  };

  if (done) return (
    <div className="view-container">
      <header className="view-header"><button className="back-btn" onClick={onBack}>←</button><h1>Results</h1></header>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ background: '#10b981', padding: '40px', borderRadius: '25px', color: 'white' }}>
          <div style={{ fontSize: '48px' }}>🎉</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{Math.round((score/questions.length)*100)}%</div>
          <div>{score}/{questions.length} correct</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="view-container">
      <header className="view-header"><button className="back-btn" onClick={onBack}>←</button><h1>Quick Quiz</h1></header>
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>Question {idx+1}/{questions.length}</div>
        <h2 style={{ marginBottom: '25px' }}>{questions[idx].q}</h2>
        <div style={{ display: 'grid', gap: '12px' }}>
          {questions[idx].options.map((o, i) => (
            <button key={i} onClick={() => answer(i)} disabled={sel!==null}
              style={{ padding: '18px', border: 'none', borderRadius: '12px', background: sel===i?(i===questions[idx].ans?'#10b981':'#ef4444'):'white', color: sel!==null&&i===questions[idx].ans?'white':sel===i?'white':'#1f2937', cursor: sel!==null?'default':'pointer', fontSize:'16px', boxShadow:'0 2px 8px rgba(0,0,0,0.05)'}}>
              {o}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
window.QuickQuiz2 = QuickQuiz2;
