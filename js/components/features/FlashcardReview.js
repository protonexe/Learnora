const FlashcardReview = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const [cards] = React.useState([
    { front: 'What is photosynthesis?', back: 'Process by which plants convert light into energy' },
    { front: 'What is Newton\'s first law?', back: 'An object at rest stays at rest unless acted upon' },
    { front: 'What is H2O?', back: 'Water - two hydrogen atoms and one oxygen' },
  ]);
  const [current, setCurrent] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);

  const next = () => { setFlipped(false); setCurrent((current + 1) % cards.length); };
  const prev = () => { setFlipped(false); setCurrent((current - 1 + cards.length) % cards.length); };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.back}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>🃏 Flashcard Review</h1>
      </div>
      <div onClick={() => setFlipped(!flipped)} style={styles.card}>
        <p style={styles.cardText}>{flipped ? cards[current].back : cards[current].front}</p>
        <p style={styles.hint}>{flipped ? 'Answer' : 'Question'} - Tap to flip</p>
      </div>
      <div style={styles.nav}>
        <button onClick={prev} style={styles.navBtn}>← Previous</button>
        <span>{current + 1}/{cards.length}</span>
        <button onClick={next} style={styles.navBtn}>Next →</button>
      </div>
    </div>
  );
};

const styles = { back: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', cursor: 'pointer' }, card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '48px 24px', textAlign: 'center', marginBottom: '24px', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer' }, cardText: { fontSize: '20px', fontWeight: 600, margin: '0 0 16px' }, hint: { color: '#888', fontSize: '14px', margin: 0 }, nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, navBtn: { padding: '12px 20px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }};

window.FlashcardReview = FlashcardReview;
