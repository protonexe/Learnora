import React from 'react';
import { Sparkles, RefreshCw, Copy, Heart, Share2 } from './Icon';

const QUOTES = [
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", author: "Malcolm X" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { text: "The roots of education are bitter, but the fruit is sweet.", author: "Aristotle" },
  { text: "Education is not preparation for life; education is life itself.", author: "John Dewey" },
  { text: "The mind is not a vessel to be filled, but a fire to be kindled.", author: "Plutarch" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.", author: "Brian Herbert" },
  { text: "Anyone who has never made a mistake has never tried anything new.", author: "Albert Einstein" },
  { text: "The only person who is educated is the one who has learned how to learn and change.", author: "Carl Rogers" },
  { text: "Study without desire spoils the memory, and it retains nothing that it takes in.", author: "Leonardo da Vinci" },
  { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "The superior man is modest in his speech, but exceeds in his actions.", author: "Confucius" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "Don't let what you cannot do interfere with what you can do.", author: "John Wooden" }
];

const MotivationalQuote = ({ onClose }) => {
  const [quote, setQuote] = React.useState(() => 
    QUOTES[Math.floor(Math.random() * QUOTES.length)]
  );
  const [liked, setLiked] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  
  const refreshQuote = () => {
    let newQuote;
    do {
      newQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    } while (newQuote.text === quote.text);
    setQuote(newQuote);
    setLiked(false);
  };
  
  const copyQuote = () => {
    navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: 20,
      padding: 32,
      color: 'white',
      textAlign: 'center',
      maxWidth: 400
    }}>
      <Sparkles size={32} style={{ marginBottom: 16, opacity: 0.9 }} />
      
      <div style={{
        fontSize: 20,
        lineHeight: 1.6,
        marginBottom: 20,
        fontStyle: 'italic'
      }}>
        "{quote.text}"
      </div>
      
      <div style={{
        fontSize: 14,
        opacity: 0.8,
        marginBottom: 24
      }}>
        — {quote.author}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
        <button
          onClick={refreshQuote}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13
          }}
        >
          <RefreshCw size={16} /> New Quote
        </button>
        <button
          onClick={copyQuote}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.3)',
            background: copied ? '#10b981' : 'rgba(255,255,255,0.1)',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13
          }}
        >
          {copied ? '✓ Copied!' : <><Copy size={16} /> Copy</>}
        </button>
        <button
          onClick={() => setLiked(!liked)}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.3)',
            background: liked ? '#ef4444' : 'rgba(255,255,255,0.1)',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13
          }}
        >
          <Heart size={16} fill={liked ? 'white' : 'none'} /> {liked ? 'Liked' : 'Like'}
        </button>
      </div>
    </div>
  );
};

export default MotivationalQuote;
