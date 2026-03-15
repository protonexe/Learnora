const CelebrationAnimation = ({ type = 'complete', message }) => {
  const [particles, setParticles] = React.useState([]);

  React.useEffect(() => {
    generateParticles();
  }, []);

  const generateParticles = () => {
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 0.5
    }));
    setParticles(newParticles);
  };

  const icons = {
    complete: '🎉',
    achievement: '🏆',
    streak: '🔥',
    level: '⭐',
    quiz: '📝'
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {/* Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.size > 6 ? '50%' : '2px',
            transform: `rotate(${p.rotation}deg)`,
            animation: `confetti ${p.duration}s ease-out ${p.delay}s forwards`,
          }}
        />
      ))}

      {/* Center Message */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        animation: 'scaleIn 0.5s ease-out'
      }}>
        <div style={{
          fontSize: '80px',
          marginBottom: '20px',
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))'
        }}>
          {icons[type] || '🎉'}
        </div>
        {message && (
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'var(--text-primary)',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            {message}
          </div>
        )}
      </div>

      <style>{`
        @keyframes confetti {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(${Math.random() > 0.5 ? '' : '-'}100px, 400px) rotate(720deg) scale(0);
            opacity: 0;
          }
        }
        @keyframes scaleIn {
          from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

const triggerCelebration = (type = 'complete', message = '') => {
  const container = document.createElement('div');
  container.id = 'celebration-' + Date.now();
  document.body.appendChild(container);
  
  const Celebration = () => (
    <CelebrationAnimation type={type} message={message} />
  );
  
  // Render celebration
  window.renderToRoot?.(Celebration, container);
  
  // Remove after animation
  setTimeout(() => {
    container.remove();
  }, 3000);
};

window.CelebrationAnimation = CelebrationAnimation;
window.triggerCelebration = triggerCelebration;
