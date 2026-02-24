const QuizSystem = ({ quiz, onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [answers, setAnswers] = React.useState([]);
  const [showResult, setShowResult] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(quiz?.timeLimit || 300);
  const [isAnswered, setIsAnswered] = React.useState(false);

  // Haptic feedback helper
  const triggerHaptic = React.useCallback((pattern = [10]) => {
    if (navigator.vibrate) navigator.vibrate(pattern);
  }, []);

  // Timer effect - MUST be before any early returns to follow React hooks rules
  React.useEffect(() => {
    // Guard: don't run timer if no valid quiz
    if (!quiz || !quiz.questions || quiz.questions.length === 0) return;
    
    if (timeLeft > 0 && !showResult) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, showResult, quiz]);

  // Handle timer expiration - triggers when time runs out
  React.useEffect(() => {
    if (!quiz || !quiz.questions || quiz.questions.length === 0) return;
    if (timeLeft === 0 && !showResult) {
      setShowResult(true);
    }
  }, [timeLeft, showResult, quiz]);

  // Early return if no quiz data (AFTER all hooks)
  if (!quiz || !quiz.questions || !Array.isArray(quiz.questions) || quiz.questions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: 'var(--text-tertiary)' }}>No quiz data available</p>
        <Button onClick={onClose} style={{ marginTop: '20px' }}>Close</Button>
      </div>
    );
  }

  const handleAnswer = (answerIndex) => {
    if (isAnswered) return;
    
    const isCorrect = answerIndex === quiz.questions[currentQuestion].correctAnswer;
    
    // Haptic feedback based on answer correctness
    if (isCorrect) {
      triggerHaptic([15, 50, 15, 50, 15]); // Success pattern
    } else {
      triggerHaptic([50, 30, 50]); // Error pattern
    }
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setAnswers([...answers, { questionIndex: currentQuestion, selected: answerIndex, isCorrect }]);
  };

  const handleNext = () => {
    triggerHaptic([10]); // Light tap
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else handleFinish();
  };

  const handleFinish = () => {
    setShowResult(true);
    const score = answers.filter(a => a.isCorrect).length;
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    // Celebration haptic for good scores
    if (percentage >= 80) {
      triggerHaptic([50, 50, 50, 50, 100]);
    } else if (percentage >= 60) {
      triggerHaptic([30, 50, 30]);
    }
    
    onComplete?.({ score, total: quiz.questions.length, answers });
  };

  const resetQuiz = () => {
    triggerHaptic([20]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setTimeLeft(quiz.timeLimit || 300);
    setIsAnswered(false);
  };

  const score = answers.filter(a => a.isCorrect).length;
  const percentage = quiz.questions.length > 0 ? Math.round((score / quiz.questions.length) * 100) : 0;
  const question = quiz.questions[currentQuestion];
  
  if (!question) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: 'var(--text-tertiary)' }}>No questions available</p>
        <Button onClick={onClose} style={{ marginTop: '20px' }}>Close</Button>
      </div>
    );
  }

  if (showResult) {
    const getResultData = () => {
      if (percentage >= 80) return { emoji: '🎉', title: 'Excellent!', color: 'var(--success)' };
      if (percentage >= 60) return { emoji: '👍', title: 'Good Job!', color: 'var(--warning)' };
      return { emoji: '📚', title: 'Keep Learning!', color: 'var(--danger)' };
    };
    const result = getResultData();

    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{
          width: '140px', height: '140px', margin: '0 auto 28px', borderRadius: '50%',
          background: `conic-gradient(${result.color} ${percentage * 3.6}deg, var(--bg-tertiary) 0deg)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          position: 'relative'
        }}>
          <div style={{
            width: '120px', height: '120px', borderRadius: '50%',
            background: 'var(--bg-secondary)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{ fontSize: '36px', fontWeight: '800', color: result.color }}>{percentage}%</span>
          </div>
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          {result.emoji} {result.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px' }}>
          You got <strong>{score}</strong> out of <strong>{quiz.questions.length}</strong> questions correct
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '16px', 
          marginBottom: '32px',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px'
        }}>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--success)' }}>{score}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: '500' }}>Correct</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--danger)' }}>{quiz.questions.length - score}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: '500' }}>Incorrect</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-500)' }}>{Helpers.formatTime(quiz.timeLimit - timeLeft)}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: '500' }}>Time Spent</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button icon="refresh-cw" onClick={resetQuiz}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px', 
        padding: '16px 20px', 
        background: 'var(--bg-tertiary)', 
        borderRadius: 'var(--radius-lg)' 
      }}>
        <Badge variant="primary" icon="help-circle">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </Badge>
        <Badge variant={timeLeft < 60 ? 'danger' : 'default'} icon="clock">
          {Helpers.formatTime(timeLeft)}
        </Badge>
      </div>
      
      <ProgressBar value={(currentQuestion / quiz.questions.length) * 100} height={6} color="var(--gradient-primary)" />
      
      <div style={{ marginTop: '36px', marginBottom: '28px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '700', lineHeight: '1.5', letterSpacing: '-0.01em' }}>
          {question.question}
        </h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = idx === question.correctAnswer;
          const showFeedback = isAnswered;
          
          let bgColor = 'var(--bg-tertiary)';
          let borderColor = 'transparent';
          let iconName = null;
          
          if (showFeedback) {
            if (isCorrect) { 
              bgColor = 'rgba(16, 185, 129, 0.12)'; 
              borderColor = 'var(--success)'; 
              iconName = 'check';
            } else if (isSelected && !isCorrect) { 
              bgColor = 'rgba(239, 68, 68, 0.12)'; 
              borderColor = 'var(--danger)'; 
              iconName = 'x';
            }
          } else if (isSelected) { 
            bgColor = 'rgba(35, 131, 226, 0.15)'; 
            borderColor = 'var(--accent-blue)'; 
          }
          
          return (
            <button 
              key={idx} 
              onClick={() => handleAnswer(idx)} 
              disabled={isAnswered}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px', 
                padding: '18px 20px', 
                background: bgColor, 
                border: `2px solid ${borderColor}`, 
                borderRadius: 'var(--radius-lg)', 
                cursor: isAnswered ? 'default' : 'pointer', 
                transition: 'all var(--transition-fast)', 
                textAlign: 'left', 
                fontFamily: 'inherit',
                width: '100%'
              }}
            >
              <div style={{
                width: '36px', 
                height: '36px', 
                borderRadius: 'var(--radius-sm)',
                background: showFeedback && (isCorrect || isSelected) 
                  ? (isCorrect ? 'var(--success)' : 'var(--danger)') 
                  : isSelected ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                border: !isSelected && !showFeedback ? '2px solid var(--border-color)' : 'none',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: '700', 
                fontSize: '14px',
                color: isSelected || (showFeedback && (isCorrect || (isSelected && !isCorrect))) ? '#FFF' : 'var(--text-secondary)',
                flexShrink: 0
              }}>
                {iconName ? <Icon name={iconName} size={18} /> : String.fromCharCode(65 + idx)}
              </div>
              <span style={{ fontSize: '15px', fontWeight: '500', color: 'var(--text-primary)', flex: 1 }}>
                {option}
              </span>
            </button>
          );
        })}
      </div>
      
      {isAnswered && (
        <div style={{ marginTop: '28px', animation: 'fadeInUp 0.3s ease' }}>
          <div style={{ 
            padding: '18px 22px', 
            background: selectedAnswer === question.correctAnswer ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)', 
            borderRadius: 'var(--radius-lg)', 
            marginBottom: '24px', 
            borderLeft: `4px solid ${selectedAnswer === question.correctAnswer ? 'var(--success)' : 'var(--danger)'}` 
          }}>
            <p style={{ 
              fontWeight: '600', 
              marginBottom: '6px', 
              color: selectedAnswer === question.correctAnswer ? 'var(--success)' : 'var(--danger)' 
            }}>
              {selectedAnswer === question.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            {question.explanation && (
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {question.explanation}
              </p>
            )}
          </div>
          <Button fullWidth onClick={handleNext} iconRight="arrow-right" size="lg">
            {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'See Results'}
          </Button>
        </div>
      )}
    </div>
  );
};

window.QuizSystem = QuizSystem;