const StudyGame = ({ isOpen, onClose, showToast }) => {
  const [gameState, setGameState] = React.useState('menu');
  const [score, setScore] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(30);
  const [currentCard, setCurrentCard] = React.useState(0);
  const [cards] = React.useState([
    { question: 'What is H2O?', answer: 'Water' },
    { question: 'What is the square root of 144?', answer: '12' },
    { question: 'What year did WWII end?', answer: '1945' },
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is 15 x 15?', answer: '225' },
    { question: 'What is the largest planet?', answer: 'Jupiter' },
    { question: 'What gas do plants absorb?', answer: 'Carbon Dioxide' },
    { question: 'What is the speed of light?', answer: '299,792 km/s' },
    { question: 'Who wrote Romeo and Juliet?', answer: 'Shakespeare' },
    { question: 'What is the chemical symbol for gold?', answer: 'Au' },
  ]);
  const [userAnswer, setUserAnswer] = React.useState('');
  const [feedback, setFeedback] = React.useState(null);

  React.useEffect(() => {
    let interval;
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('gameover');
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setCurrentCard(0);
    setUserAnswer('');
    setFeedback(null);
    setGameState('playing');
  };

  const checkAnswer = () => {
    const isCorrect = userAnswer.toLowerCase().trim() === cards[currentCard].answer.toLowerCase().trim();
    if (isCorrect) {
      setScore(s => s + 10);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
    setTimeout(() => {
      setFeedback(null);
      setUserAnswer('');
      if (currentCard < cards.length - 1) {
        setCurrentCard(c => c + 1);
      } else {
        setCurrentCard(0);
      }
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: '20px',
        padding: '32px',
        maxWidth: '450px',
        width: '90%',
        textAlign: 'center'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '24px' }}>✕</button>

        {gameState === 'menu' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎮</div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>Flashcard Challenge</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Answer as many flashcards as you can in 30 seconds!</p>
            <button onClick={startGame} style={{ padding: '14px 32px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}>
              Start Game
            </button>
          </>
        )}

        {gameState === 'playing' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ background: 'var(--primary-500)', padding: '8px 16px', borderRadius: '8px', color: '#fff', fontWeight: '600' }}>
                ⏱️ {timeLeft}s
              </div>
              <div style={{ background: 'var(--success)', padding: '8px 16px', borderRadius: '8px', color: '#fff', fontWeight: '600' }}>
                🏆 {score}
              </div>
            </div>

            <div style={{ background: 'var(--bg-tertiary)', borderRadius: '16px', padding: '24px', marginBottom: '24px', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>
                <p style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>{cards[currentCard].question}</p>
                {feedback && (
                  <p style={{ fontSize: '14px', marginTop: '12px', color: feedback === 'correct' ? 'var(--success)' : 'var(--danger)' }}>
                    {feedback === 'correct' ? '✅ Correct!' : `❌ Answer: ${cards[currentCard].answer}`}
                  </p>
                )}
              </div>
            </div>

            <input
              type="text"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && checkAnswer()}
              placeholder="Type your answer..."
              disabled={!!feedback}
              style={{ width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', fontSize: '16px', textAlign: 'center' }}
            />
            <button onClick={checkAnswer} disabled={!!feedback || !userAnswer.trim()} style={{ width: '100%', padding: '14px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '16px', opacity: (!userAnswer.trim() || feedback) ? 0.5 : 1 }}>
              Submit Answer
            </button>
          </>
        )}

        {gameState === 'gameover' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏁</div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>Time's Up!</h2>
            <div style={{ background: 'var(--bg-tertiary)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
              <p style={{ fontSize: '48px', fontWeight: '700', color: 'var(--primary-500)', margin: 0 }}>{score}</p>
              <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0 0' }}>points earned</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={startGame} style={{ flex: 1, padding: '14px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}>
                Play Again
              </button>
              <button onClick={onClose} style={{ flex: 1, padding: '14px', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}>
                Exit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

window.StudyGame = StudyGame;
