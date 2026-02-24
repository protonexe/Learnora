const QuizzesView = ({ courses, wrongQuestions, onOpenQuiz, sampleQuiz }) => {
  return (
    <>
      <AnimatedCard delay={50}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.02em' }}>
            Quizzes
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Test your knowledge and track your progress
          </p>
        </div>
      </AnimatedCard>
      
      {wrongQuestions.length > 0 && (
        <AnimatedCard delay={100}>
          <Card elevated style={{ 
            marginBottom: '16px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: '16px', 
            flexWrap: 'wrap',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '44px', 
                height: '44px', 
                background: 'var(--bg-secondary)', 
                borderRadius: 'var(--radius-lg)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px solid var(--border-color)'
              }}>
                <Icon name="refresh-cw" size={20} color="var(--danger)" />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '2px', color: 'var(--text-primary)' }}>
                  Review Incorrect Questions
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                  You have {wrongQuestions.length} question(s) to review
                </p>
              </div>
            </div>
            <Button 
              icon="play" 
              size="sm"
              onClick={() => {
                const reviewQuiz = { 
                  title: 'Review Session', 
                  timeLimit: 300, 
                  questions: wrongQuestions.map(w => w.question) 
                };
                onOpenQuiz(reviewQuiz);
              }}
            >
              Start Review
            </Button>
          </Card>
        </AnimatedCard>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
        {courses.map((course, idx) => (
          <AnimatedCard key={course.id} delay={150 + idx * 80}>
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
                  <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '2px', color: 'var(--text-primary)' }}>
                    {course.name} Quiz
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    5 questions • 5 minutes
                  </p>
                </div>
              </div>
              <Button 
                fullWidth 
                icon="play" 
                size="sm"
                onClick={() => onOpenQuiz({...sampleQuiz, title: `${course.name} Quiz`})}
              >
                Start Quiz
              </Button>
            </Card>
          </AnimatedCard>
        ))}
      </div>
    </>
  );
};

window.QuizzesView = QuizzesView;