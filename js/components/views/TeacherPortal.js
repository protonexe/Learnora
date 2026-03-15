const TeacherPortal = ({ onLogout, showToast, user }) => {
  const [activeTab, setActiveTab] = React.useState('courses');
  const [showModal, setShowModal] = React.useState(null);
  const [editingItem, setEditingItem] = React.useState(null);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [courses, setCourses] = React.useState([]);
  const [quizzes, setQuizzes] = React.useState([]);
  const [flashcardDecks, setFlashcardDecks] = React.useState([]);
  const [assignments, setAssignments] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const isMobile = window.innerWidth <= 768;

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    if (window.Database) {
      const db = window.Database;
      const allCourses = db.getAllCourses();
      const allQuizzes = db.getAllQuizzes();
      const allDecks = db.getAllFlashcardDecks();
      const allAssignments = db.getAllAssignments();
      const allStudents = db.getStudents();
      
      setCourses(allCourses || []);
      setQuizzes(allQuizzes || []);
      setFlashcardDecks(allDecks || []);
      setAssignments(allAssignments || []);
      setStudents(allStudents || []);
    }
  };

  const getTeacherId = () => user?.id || 'teacher_0';

  const handleEditCourse = (course) => {
    setEditingItem(course);
    setShowModal('edit');
  };

  const handleEditQuiz = (quiz) => {
    setEditingItem(quiz);
    setShowModal('edit');
  };

  const handleEditFlashcardDeck = (deck) => {
    setEditingItem(deck);
    setShowModal('edit');
  };

  const handleEditAssignment = (assignment) => {
    setEditingItem(assignment);
    setShowModal('edit');
  };

  const handleUpdateCourse = (courseData) => {
    if (window.Database && editingItem) {
      const updated = window.Database.updateCourse(editingItem.id, courseData);
      setCourses(courses.map(c => c.id === editingItem.id ? updated : c));
      showToast('Course updated successfully!', 'success');
      setShowModal(null);
      setEditingItem(null);
    }
  };

  const handleUpdateQuiz = (quizData) => {
    if (window.Database && editingItem) {
      const updated = window.Database.updateQuiz(editingItem.id, quizData);
      setQuizzes(quizzes.map(q => q.id === editingItem.id ? updated : q));
      showToast('Quiz updated successfully!', 'success');
      setShowModal(null);
      setEditingItem(null);
    }
  };

  const handleUpdateFlashcardDeck = (deckData) => {
    if (window.Database && editingItem) {
      const updated = window.Database.updateFlashcardDeck(editingItem.id, deckData);
      setFlashcardDecks(flashcardDecks.map(d => d.id === editingItem.id ? updated : d));
      showToast('Flashcard deck updated successfully!', 'success');
      setShowModal(null);
      setEditingItem(null);
    }
  };

  const handleUpdateAssignment = (assignmentData) => {
    if (window.Database && editingItem) {
      const updated = window.Database.updateAssignment(editingItem.id, assignmentData);
      setAssignments(assignments.map(a => a.id === editingItem.id ? updated : a));
      showToast('Assignment updated successfully!', 'success');
      setShowModal(null);
      setEditingItem(null);
    }
  };

  const handleCreateCourse = (courseData) => {
    if (window.Database) {
      const newCourse = window.Database.createCourse({
        ...courseData,
        teacherId: getTeacherId()
      });
      setCourses([...courses, newCourse]);
      showToast('Course created successfully!', 'success');
      setShowModal(null);
    }
  };

  const handleCreateQuiz = (quizData) => {
    if (window.Database) {
      const newQuiz = window.Database.createQuiz({
        ...quizData,
        teacherId: getTeacherId()
      });
      setQuizzes([...quizzes, newQuiz]);
      showToast('Quiz created successfully!', 'success');
      setShowModal(null);
    }
  };

  const handleCreateFlashcardDeck = (deckData) => {
    if (window.Database) {
      const newDeck = window.Database.createFlashcardDeck({
        ...deckData,
        teacherId: getTeacherId()
      });
      setFlashcardDecks([...flashcardDecks, newDeck]);
      showToast('Flashcard deck created successfully!', 'success');
      setShowModal(null);
    }
  };

  const handleCreateAssignment = (assignmentData) => {
    if (window.Database) {
      const newAssignment = window.Database.createAssignment({
        ...assignmentData,
        teacherId: getTeacherId()
      });
      setAssignments([...assignments, newAssignment]);
      showToast('Assignment created successfully!', 'success');
      setShowModal(null);
    }
  };

  const handleDeleteCourse = (id) => {
    if (window.Database) {
      window.Database.deleteCourse(id);
      setCourses(courses.filter(c => c.id !== id));
      showToast('Course deleted', 'success');
    }
  };

  const handleDeleteQuiz = (id) => {
    if (window.Database) {
      window.Database.deleteQuiz(id);
      setQuizzes(quizzes.filter(q => q.id !== id));
      showToast('Quiz deleted', 'success');
    }
  };

  const handleDeleteFlashcardDeck = (id) => {
    if (window.Database) {
      window.Database.deleteFlashcardDeck(id);
      setFlashcardDecks(flashcardDecks.filter(d => d.id !== id));
      showToast('Flashcard deck deleted', 'success');
    }
  };

  const handleDeleteAssignment = (id) => {
    if (window.Database) {
      window.Database.deleteAssignment(id);
      setAssignments(assignments.filter(a => a.id !== id));
      showToast('Assignment deleted', 'success');
    }
  };

  const tabs = [
    { id: 'courses', label: '📚 Courses', count: courses.length },
    { id: 'quizzes', label: '📝 Quizzes', count: quizzes.length },
    { id: 'flashcards', label: '🗂️ Flashcards', count: flashcardDecks.length },
    { id: 'assignments', label: '📋 Assignments', count: assignments.length },
    { id: 'students', label: '👨‍🎓 Students', count: students.length }
  ];

  const stats = [
    { label: 'Total Courses', value: courses.length, icon: 'book-open', color: '#f43f5e' },
    { label: 'Active Quizzes', value: quizzes.length, icon: 'file-text', color: '#14b8a6' },
    { label: 'Flashcard Decks', value: flashcardDecks.length, icon: 'layers', color: '#0ea5e9' },
    { label: 'Total Students', value: students.length, icon: 'users', color: '#10b981' }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-primary)', 
      paddingBottom: isMobile ? '80px' : '24px'
    }}>
      {/* Header */}
      <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '24px'
        }}>
          <div>
            <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', marginBottom: '4px' }}>
              👨‍🏫 Teacher Dashboard
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Welcome back, {user?.name || 'Teacher'}!
            </p>
          </div>
          <button 
            onClick={onLogout}
            style={{
              padding: '8px 16px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '24px'
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '24px', fontWeight: '700', color: stat.color }}>{stat.value}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '20px',
          overflowX: 'auto',
          paddingBottom: '8px'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 16px',
                background: activeTab === tab.id ? 'var(--primary-500)' : 'var(--bg-secondary)',
                color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
                border: `1px solid ${activeTab === tab.id ? 'var(--primary-500)' : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {tab.label}
              <span style={{
                background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'var(--bg-tertiary)',
                padding: '2px 8px',
                borderRadius: '10px',
                fontSize: '11px'
              }}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Create Button */}
        <button
          onClick={() => setShowModal('create')}
          style={{
            padding: '12px 24px',
            background: 'var(--primary-500)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          + Create New {activeTab === 'courses' ? 'Course' : activeTab === 'quizzes' ? 'Quiz' : activeTab === 'flashcards' ? 'Flashcard Deck' : activeTab === 'assignments' ? 'Assignment' : ''}
        </button>

        {/* Content */}
        {activeTab === 'courses' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {courses.map(course => (
              <div key={course.id} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '32px' }}>{course.icon || '📚'}</span>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--danger)',
                      cursor: 'pointer',
                      fontSize: '18px'
                    }}
                  >🗑️</button>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{course.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  {course.chapters?.length || 0} chapters • {course.students || 0} students
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleEditCourse(course)} style={{ flex: 1, padding: '8px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                  <button style={{ flex: 1, padding: '8px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>View</button>
                </div>
              </div>
            ))}
            {courses.length === 0 && (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>
                No courses yet. Create your first course!
              </p>
            )}
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {quizzes.map(quiz => (
              <div key={quiz.id} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '32px' }}>📝</span>
                  <button
                    onClick={() => handleDeleteQuiz(quiz.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--danger)',
                      cursor: 'pointer',
                      fontSize: '18px'
                    }}
                  >🗑️</button>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{quiz.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  {quiz.questions?.length || 0} questions • {quiz.timeLimit || 0}s time limit
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleEditQuiz(quiz)} style={{ flex: 1, padding: '8px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                  <button style={{ flex: 1, padding: '8px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>View Results</button>
                </div>
              </div>
            ))}
            {quizzes.length === 0 && (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>
                No quizzes yet. Create your first quiz!
              </p>
            )}
          </div>
        )}

        {activeTab === 'flashcards' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {flashcardDecks.map(deck => (
              <div key={deck.id} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '32px' }}>🗂️</span>
                  <button
                    onClick={() => handleDeleteFlashcardDeck(deck.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--danger)',
                      cursor: 'pointer',
                      fontSize: '18px'
                    }}
                  >🗑️</button>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{deck.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  {deck.cards?.length || 0} cards
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleEditFlashcardDeck(deck)} style={{ flex: 1, padding: '8px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                  <button style={{ flex: 1, padding: '8px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Study</button>
                </div>
              </div>
            ))}
            {flashcardDecks.length === 0 && (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>
                No flashcard decks yet. Create your first deck!
              </p>
            )}
          </div>
        )}

        {activeTab === 'assignments' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {assignments.map(assignment => (
              <div key={assignment.id} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '32px' }}>📋</span>
                  <button
                    onClick={() => handleDeleteAssignment(assignment.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--danger)',
                      cursor: 'pointer',
                      fontSize: '18px'
                    }}
                  >🗑️</button>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{assignment.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  {assignment.subject || 'General'} • Due: {assignment.dueDate || 'No due date'}
                </p>
                <div style={{ background: 'var(--bg-tertiary)', padding: '8px', borderRadius: '6px', marginBottom: '12px' }}>
                  <p style={{ fontSize: '12px' }}>Submissions: {assignment.submissions?.length || 0}</p>
                </div>
                <button style={{ width: '100%', padding: '8px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                  View Submissions
                </button>
              </div>
            ))}
            {assignments.length === 0 && (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>
                No assignments yet. Create your first assignment!
              </p>
            )}
          </div>
        )}

        {activeTab === 'students' && (
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-tertiary)' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: '600' }}>Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: '600' }}>Grade</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: '600' }}>Email</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={student.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: '600' }}>{student.name}</td>
                    <td style={{ padding: '12px 16px' }}>{student.grade || 'N/A'}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{student.email || 'N/A'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <button style={{ padding: '4px 12px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>View Progress</button>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {(showModal === 'create' || showModal === 'edit') && (
        <CreateContentModal
          type={activeTab}
          courses={courses}
          editingItem={editingItem}
          onClose={() => { setShowModal(null); setEditingItem(null); }}
          onCreateCourse={handleCreateCourse}
          onCreateQuiz={handleCreateQuiz}
          onCreateFlashcardDeck={handleCreateFlashcardDeck}
          onCreateAssignment={handleCreateAssignment}
          onUpdateCourse={handleUpdateCourse}
          onUpdateQuiz={handleUpdateQuiz}
          onUpdateFlashcardDeck={handleUpdateFlashcardDeck}
          onUpdateAssignment={handleUpdateAssignment}
        />
      )}
    </div>
  );
};

// Create/Edit Content Modal Component
const CreateContentModal = ({ type, courses, editingItem, onClose, onCreateCourse, onCreateQuiz, onCreateFlashcardDeck, onCreateAssignment, onUpdateCourse, onUpdateQuiz, onUpdateFlashcardDeck, onUpdateAssignment }) => {
  const isEdit = !!editingItem;
  const [formData, setFormData] = React.useState(editingItem || {});
  const [questions, setQuestions] = React.useState(editingItem?.questions || [{ question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' }]);
  const [cards, setCards] = React.useState(editingItem?.cards || [{ front: '', back: '' }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      if (type === 'courses') {
        onUpdateCourse(formData);
      } else if (type === 'quizzes') {
        onUpdateQuiz({ ...formData, questions });
      } else if (type === 'flashcards') {
        onUpdateFlashcardDeck({ ...formData, cards });
      } else if (type === 'assignments') {
        onUpdateAssignment(formData);
      }
    } else {
      if (type === 'courses') {
        onCreateCourse(formData);
      } else if (type === 'quizzes') {
        onCreateQuiz({ ...formData, questions });
      } else if (type === 'flashcards') {
        onCreateFlashcardDeck({ ...formData, cards });
      } else if (type === 'assignments') {
        onCreateAssignment(formData);
      }
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' }]);
  };

  const addCard = () => {
    setCards([...cards, { front: '', back: '' }]);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
          {isEdit ? 'Edit' : 'Create New'} {type === 'courses' ? 'Course' : type === 'quizzes' ? 'Quiz' : type === 'flashcards' ? 'Flashcard Deck' : 'Assignment'}
        </h2>

        <form onSubmit={handleSubmit}>
          {type === 'courses' && (
            <>
              <input
                type="text"
                placeholder="Course Name"
                value={formData.name || ''}
                onChange={e => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.description || ''}
                onChange={e => setFormData({...formData, description: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}
              />
              <input
                type="text"
                placeholder="Icon (emoji)"
                value={formData.icon || ''}
                onChange={e => setFormData({...formData, icon: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}
              />
              <input
                type="text"
                placeholder="Color (hex)"
                value={formData.color || ''}
                onChange={e => setFormData({...formData, color: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}
              />
            </>
          )}

          {type === 'quizzes' && (
            <>
              <input
                type="text"
                placeholder="Quiz Title"
                value={formData.title || ''}
                onChange={e => setFormData({...formData, title: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}
                required
              />
              <select
                value={formData.courseId || ''}
                onChange={e => setFormData({...formData, courseId: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}
              >
                <option value="">Select Course</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input
                type="number"
                placeholder="Time Limit (seconds)"
                value={formData.timeLimit || ''}
                onChange={e => setFormData({...formData, timeLimit: parseInt(e.target.value)})}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}
              />
              <input
                type="number"
                placeholder="Passing Score (%)"
                value={formData.passingScore || ''}
                onChange={e => setFormData({...formData, passingScore: parseInt(e.target.value)})}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}
              />
              
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontWeight: '600', marginBottom: '8px' }}>Questions</p>
                {questions.map((q, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-primary)', padding: '12px', marginBottom: '8px', borderRadius: '8px' }}>
                    <input
                      type="text"
                      placeholder={`Question ${idx + 1}`}
                      value={q.question}
                      onChange={e => {
                        const newQuestions = [...questions];
                        newQuestions[idx].question = e.target.value;
                        setQuestions(newQuestions);
                      }}
                      style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}
                    />
                    {q.options.map((opt, optIdx) => (
                      <input
                        key={optIdx}
                        type="text"
                        placeholder={`Option ${optIdx + 1}`}
                        value={opt}
                        onChange={e => {
                          const newQuestions = [...questions];
                          newQuestions[idx].options[optIdx] = e.target.value;
                          setQuestions(newQuestions);
                        }}
                        style={{ width: '100%', padding: '8px', marginBottom: '4px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}
                      />
                    ))}
                  </div>
                ))}
                <button type="button" onClick={addQuestion} style={{ padding: '8px 16px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+ Add Question</button>
              </div>
            </>
          )}

          {type === 'flashcards' && (
            <>
              <input
                type="text"
                placeholder="Deck Title"
                value={formData.title || ''}
                onChange={e => setFormData({...formData, title: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}
                required
              />
              <select
                value={formData.courseId || ''}
                onChange={e => setFormData({...formData, courseId: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}
              >
                <option value="">Select Course</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontWeight: '600', marginBottom: '8px' }}>Cards</p>
                {cards.map((card, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-primary)', padding: '12px', marginBottom: '8px', borderRadius: '8px' }}>
                    <input
                      type="text"
                      placeholder={`Front (Question) ${idx + 1}`}
                      value={card.front}
                      onChange={e => {
                        const newCards = [...cards];
                        newCards[idx].front = e.target.value;
                        setCards(newCards);
                      }}
                      style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}
                    />
                    <input
                      type="text"
                      placeholder={`Back (Answer) ${idx + 1}`}
                      value={card.back}
                      onChange={e => {
                        const newCards = [...cards];
                        newCards[idx].back = e.target.value;
                        setCards(newCards);
                      }}
                      style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}
                    />
                  </div>
                ))}
                <button type="button" onClick={addCard} style={{ padding: '8px 16px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+ Add Card</button>
              </div>
            </>
          )}

          {type === 'assignments' && (
            <>
              <input
                type="text"
                placeholder="Assignment Title"
                value={formData.title || ''}
                onChange={e => setFormData({...formData, title: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}
                required
              />
              <select
                value={formData.courseId || ''}
                onChange={e => setFormData({...formData, courseId: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}
              >
                <option value="">Select Course</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject || ''}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}
              />
              <input
                type="date"
                placeholder="Due Date"
                value={formData.dueDate || ''}
                onChange={e => setFormData({...formData, dueDate: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}
              />
              <textarea
                placeholder="Instructions"
                value={formData.instructions || ''}
                onChange={e => setFormData({...formData, instructions: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', minHeight: '100px' }}
              />
            </>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
            <button type="submit" style={{ flex: 1, padding: '12px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>{isEdit ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

window.TeacherPortal = TeacherPortal;
