import React from 'react';
import { Brain, Plus, Play, Trash2, Edit2, Shuffle, Check, X, RotateCcw } from './Icon';

const FlashcardStudy = ({ deck, onComplete, onExit }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [studyMode, setStudyMode] = React.useState('learn');
  const [showResults, setShowResults] = React.useState(false);
  const [results, setResults] = React.useState({ correct: [], incorrect: [] });
  
  const cards = deck?.cards || [
    { id: 1, front: 'What is photosynthesis?', back: 'The process by which plants convert sunlight into energy' },
    { id: 2, front: 'What is H2O?', back: 'Water - two hydrogen atoms and one oxygen atom' },
    { id: 3, front: 'What is the capital of France?', back: 'Paris' },
    { id: 4, front: 'What year did WW2 end?', back: '1945' },
    { id: 5, front: 'What is the speed of light?', back: 'Approximately 299,792 km/s' },
  ];
  
  const card = cards[currentIndex];
  
  const markCard = (isCorrect) => {
    if (isCorrect) {
      setResults({ ...results, correct: [...results.correct, card.id] });
    } else {
      setResults({ ...results, incorrect: [...results.incorrect, card.id] });
    }
    
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    } else {
      setShowResults(true);
    }
  };
  
  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCurrentIndex(0);
    setFlipped(false);
    setShowResults(false);
    setResults({ correct: [], incorrect: [] });
  };
  
  const restartStudy = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setShowResults(false);
    setResults({ correct: [], incorrect: [] });
  };
  
  if (showResults) {
    const score = Math.round((results.correct.length / cards.length) * 100);
    
    return (
      <div style={{
        background: 'var(--card-bg)',
        borderRadius: 20,
        padding: 40,
        maxWidth: 500,
        textAlign: 'center'
      }}>
        <Brain size={64} style={{ color: '#8b5cf6', marginBottom: 20 }} />
        
        <div style={{
          fontSize: 48,
          fontWeight: 700,
          color: score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444',
          marginBottom: 8
        }}>
          {score}%
        </div>
        
        <h2 style={{ margin: '0 0 24px 0', color: 'var(--text-primary)' }}>
          {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good Job!' : 'Keep Practicing!'}
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 24
        }}>
          <div style={{ background: '#10b98120', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#10b981' }}>{results.correct.length}</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Correct</div>
          </div>
          <div style={{ background: '#ef444420', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#ef4444' }}>{results.incorrect.length}</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Needs Review</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={restartStudy}
            style={{
              flex: 1,
              padding: 14,
              borderRadius: 10,
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
          >
            <RotateCcw size={18} /> Study Again
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
            Done
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
      maxWidth: 500
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <div>
          <span style={{ color: 'var(--text-secondary)' }}>Card </span>
          <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 18 }}>
            {currentIndex + 1} / {cards.length}
          </span>
        </div>
        <button
          onClick={shuffleCards}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13
          }}
        >
          <Shuffle size={16} /> Shuffle
        </button>
      </div>
      
      <div
        onClick={() => setFlipped(!flipped)}
        style={{
          minHeight: 200,
          background: 'var(--bg)',
          borderRadius: 16,
          padding: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          marginBottom: 24,
          border: '1px solid var(--border-color)',
          perspective: 1000,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s'
        }}
      >
        <div style={{
          textAlign: 'center',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
          transition: 'transform 0.6s'
        }}>
          <div style={{
            fontSize: 12,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 16
          }}>
            {flipped ? 'Answer' : 'Question'}
          </div>
          <div style={{
            fontSize: 20,
            color: 'var(--text-primary)',
            lineHeight: 1.6
          }}>
            {flipped ? card.back : card.front}
          </div>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 20
      }}>
        <button
          onClick={() => markCard(false)}
          style={{
            flex: 1,
            padding: 16,
            borderRadius: 12,
            border: 'none',
            background: '#ef4444',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            fontSize: 16,
            fontWeight: 600
          }}
        >
          <X size={20} /> Don't Know
        </button>
        <button
          onClick={() => markCard(true)}
          style={{
            flex: 1,
            padding: 16,
            borderRadius: 12,
            border: 'none',
            background: '#10b981',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            fontSize: 16,
            fontWeight: 600
          }}
        >
          <Check size={20} /> Know It
        </button>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 6
      }}>
        {cards.map((_, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: i === currentIndex ? 'var(--primary)' : 
                results.correct.includes(cards[i]?.id) ? '#10b981' : 
                results.incorrect.includes(cards[i]?.id) ? '#ef4444' : 'var(--border-color)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FlashcardStudy;
