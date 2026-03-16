import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Clock, ArrowRight, RotateCcw, HelpCircle, BookOpen } from './Icon';

const QuizSession = ({ quiz, onComplete, onExit }) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [showResults, setShowResults] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(quiz?.timeLimit || 600);
  const [flagged, setFlagged] = React.useState([]);
  
  React.useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setShowResults(true);
    }
  }, [timeLeft, showResults]);
  
  const questions = quiz?.questions || [
    { id: 1, text: "What is the derivative of x²?", options: ["x", "2x", "2", "x²"], correct: 1 },
    { id: 2, text: "What is the value of π (pi) to 2 decimal places?", options: ["3.14", "3.16", "3.12", "3.18"], correct: 0 },
    { id: 3, text: "Solve: 2x + 5 = 15", options: ["x = 5", "x = 10", "x = 4", "x = 7"], correct: 0 },
    { id: 4, text: "What is the square root of 144?", options: ["10", "11", "12", "14"], correct: 2 },
    { id: 5, text: "What is 15% of 200?", options: ["25", "30", "35", "40"], correct: 1 },
  ];
  
  const question = questions[currentQuestion];
  
  const selectAnswer = (optionIndex) => {
    setAnswers({ ...answers, [question.id]: optionIndex });
  };
  
  const toggleFlag = () => {
    if (flagged.includes(question.id)) {
      setFlagged(flagged.filter(id => id !== question.id));
    } else {
      setFlagged([...flagged, question.id]);
    }
  };
  
  const goNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const goPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const finishQuiz = () => {
    setShowResults(true);
  };
  
  const calculateResults = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    return {
      score: Math.round((correct / questions.length) * 100),
      correct,
      incorrect: questions.length - correct,
      timeUsed: (quiz?.timeLimit || 600) - timeLeft
    };
  };
  
  const results = showResults ? calculateResults() : null;
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (showResults && results) {
    return (
      <div style={{
        background: 'var(--card-bg)',
        borderRadius: 20,
        padding: 40,
        maxWidth: 500,
        textAlign: 'center'
      }}>
        <div style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: results.score >= 70 ? '#10b981' : results.score >= 50 ? '#f59e0b' : '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: 36,
          fontWeight: 700,
          color: 'white'
        }}>
          {results.score}%
        </div>
        
        <h2 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
          {results.score >= 70 ? '🎉 Great Job!' : results.score >= 50 ? '👍 Good Effort!' : '💪 Keep Practicing!'}
        </h2>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
          You answered {results.correct} out of {questions.length} questions correctly
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 24
        }}>
          <div style={{ background: '#10b98120', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#10b981' }}>{results.correct}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Correct</div>
          </div>
          <div style={{ background: '#ef444420', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#ef4444' }}>{results.incorrect}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Incorrect</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => { setAnswers({}); setCurrentQuestion(0); setShowResults(false); setTimeLeft(quiz?.timeLimit || 600); }}
            style={{
              flex: 1,
              padding: 14,
              borderRadius: 10,
              border: 'none',
              background: 'var(--bg)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
          >
            <RotateCcw size={18} /> Retry
          </button>
          <button
            onClick={onComplete}
            style={{
              flex: 1,
              padding: 14,
              borderRadius: 10,
              border: 'none',
              background: 'var(--primary)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
          >
            Continue <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 20,
      padding: 24,
      maxWidth: 600
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div>
          <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Question </span>
          <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 18 }}>
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          borderRadius: 8,
          background: timeLeft < 60 ? '#ef444420' : 'var(--bg)'
        }}>
          <Clock size={18} style={{ color: timeLeft < 60 ? '#ef4444' : 'var(--text-secondary)' }} />
          <span style={{
            fontFamily: 'monospace',
            fontSize: 18,
            fontWeight: 600,
            color: timeLeft < 60 ? '#ef4444' : 'var(--text-primary)'
          }}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
      
      <div style={{
        background: 'var(--bg)',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 16
        }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: 18, lineHeight: 1.5 }}>
            {question.text}
          </h3>
          <button
            onClick={toggleFlag}
            style={{
              padding: 8,
              borderRadius: 6,
              border: 'none',
              background: flagged.includes(question.id) ? '#f59e0b' : 'transparent',
              color: flagged.includes(question.id) ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <HelpCircle size={20} />
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => selectAnswer(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 16px',
                borderRadius: 10,
                border: `2px solid ${answers[question.id] === i ? 'var(--primary)' : 'var(--border-color)'}`,
                background: answers[question.id] === i ? 'var(--primary)' + '15' : 'var(--card-bg)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 15,
                transition: 'all 0.2s'
              }}
            >
              <span style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: `2px solid ${answers[question.id] === i ? 'var(--primary)' : 'var(--border-color)'}`,
                background: answers[question.id] === i ? 'var(--primary)' : 'transparent',
                color: answers[question.id] === i ? 'white' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 600
              }}>
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQuestion(i)}
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                border: 'none',
                background: i === currentQuestion ? 'var(--primary)' : answers[questions[i]?.id] !== undefined ? '#10b981' : flagged.includes(questions[i]?.id) ? '#f59e0b' : 'var(--bg)',
                color: i === currentQuestion || answers[questions[i]?.id] !== undefined ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 600
              }}>
              {i + 1}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={goPrev}
            disabled={currentQuestion === 0}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: currentQuestion === 0 ? 'var(--text-secondary)' : 'var(--text-primary)',
              cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Previous
          </button>
          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={finishQuiz}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: 'none',
                background: '#10b981',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Finish
            </button>
          ) : (
            <button
              onClick={goNext}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: 'none',
                background: 'var(--primary)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              Next <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizSession;
