const FlashcardsView = ({ courses, onOpenFlashcards, sampleDeck }) => {
  const [teacherDecks, setTeacherDecks] = React.useState([]);

  React.useEffect(() => {
    loadTeacherDecks();
  }, []);

  const loadTeacherDecks = () => {
    if (window.Database) {
      const db = window.Database;
      setTeacherDecks(db.getAllFlashcardDecks() || []);
    }
  };

  return (
    <>
      <AnimatedCard delay={50}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.02em' }}>
            Flashcards
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Master concepts with spaced repetition
          </p>
        </div>
      </AnimatedCard>

      {teacherDecks.length > 0 && (
        <AnimatedCard delay={80}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px', color: 'var(--text-primary)' }}>
              Teacher Flashcard Decks
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
              Flashcard decks assigned by your teacher
            </p>
          </div>
        </AnimatedCard>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
        {teacherDecks.map((deck, idx) => (
          <AnimatedCard key={deck.id} delay={90 + idx * 80}>
            <Card hover elevated style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'linear-gradient(135deg, var(--accent-teal)20, var(--accent-teal)10)', 
                  borderRadius: 'var(--radius-lg)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '24px' 
                }}>
                  🗂️
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '2px' }}>
                    {deck.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    {deck.cards?.length || 0} cards
                  </p>
                </div>
              </div>
              <Button 
                fullWidth 
                variant="secondary" 
                icon="layers" 
                size="sm"
                onClick={() => onOpenFlashcards(deck)}
              >
                Study Deck
              </Button>
            </Card>
          </AnimatedCard>
        ))}
      </div>

      {teacherDecks.length > 0 && (
        <AnimatedCard delay={120}>
          <div style={{ marginBottom: '16px', marginTop: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px', color: 'var(--text-primary)' }}>
              Course Flashcards
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
              Flashcards from your enrolled courses
            </p>
          </div>
        </AnimatedCard>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
        {courses.map((course, idx) => (
          <AnimatedCard key={course.id} delay={100 + idx * 80}>
            <Card hover elevated style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: `linear-gradient(135deg, ${course.color}20, ${course.color}10)`, 
                  borderRadius: 'var(--radius-lg)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '24px' 
                }}>
                  {course.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '2px' }}>
                    {course.name}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    5 cards to review
                  </p>
                </div>
              </div>
              <Button 
                fullWidth 
                variant="secondary" 
                icon="layers" 
                size="sm"
                onClick={() => onOpenFlashcards({...sampleDeck, title: `${course.name} Flashcards`})}
              >
                Study Deck
              </Button>
            </Card>
          </AnimatedCard>
        ))}
      </div>
    </>
  );
};

window.FlashcardsView = FlashcardsView;