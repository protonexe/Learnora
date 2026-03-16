const QuizBuilder = ({ onClose }) => {
  const [questions, setQuestions] = React.useState([]);
  const [showAdd, setShowAdd] = React.useState(false);
  const [newQ, setNewQ] = React.useState({ question: '', options: ['', '', '', ''], correct: 0 });

  const addQuestion = () => {
    if (!newQ.question) return;
    setQuestions([...questions, { id: Date.now(), ...newQ }]);
    setNewQ({ question: '', options: ['', '', '', ''], correct: 0 });
    setShowAdd(false);
  };

  const deleteQ = (id) => setQuestions(questions.filter(q => q.id !== id));

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
          <h2 style={{ margin: 0, fontSize: 20 }}>✍️ Quiz Builder</h2>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>+ Add</button>
      </div>

      <div style={{ padding: 20 }}>
        {showAdd && (
          <div style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, marginBottom: 20, border: '1px solid var(--border-color)' }}>
            <input type="text" value={newQ.question} onChange={(e) => setNewQ({ ...newQ, question: e.target.value })} placeholder="Question..." style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
            {newQ.options.map((opt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <button onClick={() => setNewQ({ ...newQ, correct: i })} style={{ width: 24, height: 24, borderRadius: '50%', border: newQ.correct === i ? 'none' : '2px solid var(--border-color)', background: newQ.correct === i ? '#10b981' : 'transparent', cursor: 'pointer' }}>{newQ.correct === i && '✓'}</button>
                <input type="text" value={opt} onChange={(e) => { const opts = [...newQ.options]; opts[i] = e.target.value; setNewQ({ ...newQ, options: opts }); }} placeholder={`Option ${i + 1}`} style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: 13 }} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button onClick={addQuestion} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Add Question</button>
              <button onClick={() => setShowAdd(false)} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {questions.map((q, idx) => (
            <div key={q.id} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Q{idx + 1}: {q.question}</span>
                <button onClick={() => deleteQ(q.id)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}>🗑️</button>
              </div>
              {q.options.map((opt, i) => (
                <div key={i} style={{ fontSize: 13, color: i === q.correct ? '#10b981' : 'var(--text-secondary)', marginLeft: 16 }}>{i + 1}. {opt} {i === q.correct && '✓'}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
