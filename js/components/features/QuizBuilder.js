const QuizBuilder = ({ onSave, showToast }) => {
  const [questions, setQuestions] = React.useState([]);
  const [quizTitle, setQuizTitle] = React.useState('');
  const [quizDescription, setQuizDescription] = React.useState('');
  const [currentQuestion, setCurrentQuestion] = React.useState({
    text: '',
    options: ['', '', '', ''],
    correctIndex: 0
  });
  const isMobile = window.innerWidth <= 768;

  const addQuestion = () => {
    if (!currentQuestion.text.trim()) {
      showToast?.('Please enter a question', 'error');
      return;
    }
    setQuestions([...questions, { ...currentQuestion, id: Date.now() }]);
    setCurrentQuestion({
      text: '',
      options: ['', '', '', ''],
      correctIndex: 0
    });
  };

  const removeQuestion = (idx) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const saveQuiz = () => {
    if (!quizTitle.trim()) {
      showToast?.('Please enter a quiz title', 'error');
      return;
    }
    if (questions.length === 0) {
      showToast?.('Please add at least one question', 'error');
      return;
    }
    onSave?.({
      title: quizTitle,
      description: quizDescription,
      questions,
      createdAt: Date.now()
    });
    showToast?.('Quiz created successfully!', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Quiz Info */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        padding: '20px',
        border: '1px solid var(--border-color)'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0' }}>Quiz Details</h3>
        <input
          type="text"
          placeholder="Quiz title..."
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '12px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            fontSize: '14px'
          }}
        />
        <textarea
          placeholder="Quiz description (optional)..."
          value={quizDescription}
          onChange={(e) => setQuizDescription(e.target.value)}
          rows={2}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            fontSize: '14px',
            resize: 'none'
          }}
        />
      </div>

      {/* Add Question */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        padding: '20px',
        border: '1px solid var(--border-color)'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0' }}>Add Question</h3>
        <textarea
          placeholder="Enter your question..."
          value={currentQuestion.text}
          onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
          rows={2}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '16px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            fontSize: '14px',
            resize: 'none'
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          {currentQuestion.options.map((opt, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setCurrentQuestion({ ...currentQuestion, correctIndex: idx })}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: currentQuestion.correctIndex === idx ? 'none' : '2px solid var(--border-color)',
                  background: currentQuestion.correctIndex === idx ? 'var(--success)' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '12px'
                }}
              >
                {currentQuestion.correctIndex === idx && '✓'}
              </button>
              <input
                type="text"
                placeholder={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => {
                  const newOptions = [...currentQuestion.options];
                  newOptions[idx] = e.target.value;
                  setCurrentQuestion({ ...currentQuestion, options: newOptions });
                }}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                  fontSize: '13px'
                }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={addQuestion}
          style={{
            width: '100%',
            padding: '12px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            color: 'var(--text-primary)'
          }}
        >
          + Add Question
        </button>
      </div>

      {/* Questions List */}
      {questions.length > 0 && (
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          padding: '20px',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0' }}>
            Questions ({questions.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {questions.map((q, idx) => (
              <div key={q.id || idx} style={{
                padding: '12px',
                background: 'var(--bg-tertiary)',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 4px 0' }}>
                    {idx + 1}. {q.text.substring(0, 50)}...
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>
                    {q.options.filter(o => o).length} options
                  </p>
                </div>
                <button
                  onClick={() => removeQuestion(idx)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--danger)',
                    padding: '8px'
                  }}
                >
                  <Icon name="trash-2" size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={saveQuiz}
        style={{
          padding: '16px',
          background: 'var(--primary-500)',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '700',
          color: '#fff'
        }}
      >
        Create Quiz
      </button>
    </div>
  );
};

window.QuizBuilder = QuizBuilder;
