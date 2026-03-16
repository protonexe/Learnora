const QuizBuilder = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [quizzes, setQuizzes] = React.useState(() => JSON.parse(localStorage.getItem('quiz-builder') || '[]'));
  const [creating, setCreating] = React.useState(false);
  const [newQuiz, setNewQuiz] = React.useState({ title: '', subject: '', questions: [] });
  const [newQuestion, setNewQuestion] = React.useState({ question: '', options: ['', '', '', ''], correct: 0 });

  React.useEffect(() => { localStorage.setItem('quiz-builder', JSON.stringify(quizzes)); }, [quizzes]);

  const addQuestion = () => {
    if (!newQuestion.question) return;
    setNewQuiz({ ...newQuiz, questions: [...newQuiz.questions, { id: Date.now(), ...newQuestion }] });
    setNewQuestion({ question: '', options: ['', '', '', ''], correct: 0 });
  };

  const saveQuiz = () => {
    if (!newQuiz.title || newQuiz.questions.length === 0) return;
    setQuizzes([...quizzes, { id: Date.now(), ...newQuiz, createdAt: new Date().toISOString() }]);
    setNewQuiz({ title: '', subject: '', questions: [] });
    setCreating(false);
    showToast?.('Quiz created!', 'success');
  };

  const deleteQuiz = (id) => setQuizzes(quizzes.filter(q => q.id !== id));

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>📝 Quiz Builder</h1>
        </div>
        <button onClick={() => setCreating(true)} style={styles.addButton}>+ Create Quiz</button>
      </div>

      {creating && (
        <div style={styles.card}>
          <input type="text" value={newQuiz.title} onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})} placeholder="Quiz title" style={styles.input} />
          <input type="text" value={newQuiz.subject} onChange={(e) => setNewQuiz({...newQuiz, subject: e.target.value})} placeholder="Subject" style={styles.input} />
          
          <div style={styles.questionSection}>
            <h4 style={styles.questionTitle}>Add Question</h4>
            <input type="text" value={newQuestion.question} onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})} placeholder="Question" style={styles.input} />
            {newQuestion.options.map((opt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <input type="radio" name="correct" checked={newQuestion.correct === i} onChange={() => setNewQuestion({...newQuestion, correct: i})} />
                <input type="text" value={opt} onChange={(e) => { const opts = [...newQuestion.options]; opts[i] = e.target.value; setNewQuestion({...newQuestion, options: opts}); }} placeholder={`Option ${i + 1}`} style={{ ...styles.input, marginBottom: 0 }} />
              </div>
            ))}
            <button onClick={addQuestion} style={styles.addQButton}>+ Add Question</button>
          </div>

          <p style={styles.questionCount}>{newQuiz.questions.length} questions added</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={saveQuiz} style={styles.primaryButton}>Save Quiz</button>
            <button onClick={() => setCreating(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      {quizzes.length === 0 && !creating ? (
        <div style={styles.emptyState}><p>No custom quizzes yet.</p><p>Create your own quizzes!</p></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {quizzes.map(quiz => (
            <div key={quiz.id} style={styles.quizCard}>
              <h3 style={styles.quizTitle}>{quiz.title}</h3>
              <p style={styles.quizMeta}>{quiz.subject} • {quiz.questions.length} questions</p>
              <button onClick={() => deleteQuiz(quiz.id)} style={styles.deleteButton}>🗑️</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  addButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  input: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  questionSection: { background: 'var(--bg-primary)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '16px' },
  questionTitle: { fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' },
  addQButton: { width: '100%', padding: '10px', background: 'var(--primary-100)', color: 'var(--primary-600)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' },
  questionCount: { fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' },
  primaryButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '60px', color: 'var(--text-tertiary)' },
  quizCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '16px', position: 'relative' },
  quizTitle: { fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  quizMeta: { fontSize: '13px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' },
  deleteButton: { position: 'absolute', top: '12px', right: '12px', background: 'transparent', border: 'none', cursor: 'pointer' }
};

window.QuizBuilder = QuizBuilder;
