function LearnoraApp() {
  // ==================== STATE ====================
  const [showOnboarding, setShowOnboarding] = useLocalStorage('learnora-onboarded', true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [educationMode, setEducationMode] = React.useState(false);
  const [userRole, setUserRole] = useLocalStorage('learnora-role', 'student');
  const [currentView, setCurrentView] = useLocalStorage('learnora-view', 'dashboard');
  const [notes, setNotes] = useLocalStorage('learnora-notes', []);
  const [streak, setStreak] = useLocalStorage('learnora-streak', { current: 0, longest: 0, lastDate: null });
  const [lastPosition, setLastPosition] = useLocalStorage('learnora-lastpos', null);
  const [wrongQuestions, setWrongQuestions] = useLocalStorage('learnora-wrongs', []);
  
  const [courseSearch, setCourseSearch] = React.useState('');
  const [noteTagFilter, setNoteTagFilter] = React.useState(null);
  const [noteSearch, setNoteSearch] = React.useState('');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [currentNote, setCurrentNote] = React.useState('');
  const [toast, setToast] = React.useState({ visible: false, message: '', type: 'info' });
  
  const [activeModal, setActiveModal] = React.useState(null);
  const [selectedQuiz, setSelectedQuiz] = React.useState(null);
  const [selectedDeck, setSelectedDeck] = React.useState(null);
  const [selectedBook, setSelectedBook] = React.useState(null);
  const [aiChatOpen, setAiChatOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [shortcutsOpen, setShortcutsOpen] = React.useState(false);
  const [quickAddOpen, setQuickAddOpen] = React.useState(false);
  
  // Mobile detection
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  
  const { theme, toggleTheme } = useTheme();

  // Handle window resize for mobile detection
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    
    const handleKeyDown = (e) => {
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShortcutsOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setShortcutsOpen(false);
      }
      if (!e.metaKey && !e.ctrlKey) {
        const navMap = { '1': 'dashboard', '2': 'courses', '3': 'quizzes', '4': 'flashcards', '5': 'analytics', '6': 'calendar', '7': 'notes', '8': 'settings' };
        if (navMap[e.key] && !e.target.matches('input, textarea')) {
          handleNavigate(navMap[e.key]);
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNavigate]);

  // ==================== DATA ====================
  const courses = SampleData.courses;
  const assignments = SampleData.assignments;
  const stats = SampleData.stats;
  const sampleQuiz = SampleData.sampleQuiz;
  const sampleFlashcardDeck = SampleData.sampleFlashcardDeck;
  const sampleBook = SampleData.sampleBook;

  // ==================== CALLBACKS ====================
  const showToast = React.useCallback((message, type = 'info') => {
    setToast({ visible: true, message, type });
  }, []);

  const registerStudyActivity = React.useCallback(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    setStreak(prev => {
      if (prev.lastDate === todayStr) return prev;
      const yesterdayStr = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const continued = prev.lastDate === yesterdayStr;
      const current = continued ? (prev.current || 0) + 1 : 1;
      const longest = Math.max(prev.longest || 0, current);
      return { current, longest, lastDate: todayStr };
    });
  }, [setStreak]);

  const saveLastPosition = React.useCallback((courseId, chapterIndex) => {
    setLastPosition({ courseId, chapterIndex });
  }, [setLastPosition]);

  const handleAuthenticate = React.useCallback((role = 'student') => {
    console.log('[APP] handleAuthenticate called with role:', role);
    setUserRole(role);
    console.log('[APP] setUserRole called');
    setIsAuthenticated(true);
    console.log('[APP] setIsAuthenticated called');
    setEducationMode(true);
    console.log('[APP] setEducationMode called, authentication complete');
  }, []);

  const handleLogout = React.useCallback(() => {
    setIsAuthenticated(false);
    setEducationMode(false);
    setUserRole('student');
    showToast('Logged out successfully', 'info');
  }, [showToast]);

  // ==================== URL ROUTING (Hash-based - works with all servers) ====================
  
  // Parse URL hash to determine view (e.g., #/dashboard, #/courses/Mathematics)
  const parseHash = React.useCallback(() => {
    const hash = window.location.hash;
    
    // Remove leading #/ and split
    const parts = hash.replace(/^#\/?/, '').split('/');
    const mainView = parts[0] || 'dashboard';
    
    // Handle course-specific URLs like #/courses/Mathematics
    if (mainView === 'courses' && parts[1]) {
      const courseName = decodeURIComponent(parts[1]);
      const course = courses.find(c => c.name === courseName);
      if (course) {
        setSelectedCourse(course);
        return 'course-detail';
      }
    }
    
    return mainView;
  }, [courses]);
  
  // Update URL hash when view changes
  const updateHash = React.useCallback((view, course = null) => {
    let hash = '#/' + view;
    
    if (view === 'course-detail' && course) {
      hash = '#/courses/' + encodeURIComponent(course.name);
    }
    
    window.location.hash = hash;
  }, []);
  
  // Handle browser back/forward buttons and hash changes
  React.useEffect(() => {
    const handleHashChange = () => {
      const newView = parseHash();
      setCurrentView(newView);
      
      // Reset selected course if not on course-detail
      if (newView !== 'course-detail') {
        setSelectedCourse(null);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [parseHash]);

  // Intercept Android hardware back button
  React.useEffect(() => {
    if (window.Capacitor && window.Capacitor.Plugins.App) {
      const { App: CapacitorApp } = window.Capacitor.Plugins;
      
      const listener = CapacitorApp.addListener('backButton', async (info) => {
        // Prevent default back behavior when kiosk is active
        if (window.NativePlugins) {
          try {
            const kiosk = await window.NativePlugins.KioskMode.isActive();
            if (kiosk && kiosk.active) {
              // Block back button entirely or only allow it if not at root
              if (!info.canGoBack || currentView === 'dashboard') {
                showToast('Action blocked: Device is in Kiosk Mode', 'warning');
                return; // Consume event
              }
            }
          } catch (e) {
             console.error('Kiosk check failed', e);
          }
        }
        
        // Handle normal back navigation
        if (menuOpen) {
          setMenuOpen(false);
        } else if (aiChatOpen) {
          setAiChatOpen(false);
        } else if (activeModal) {
          setActiveModal(null);
        } else if (currentView === 'course-detail') {
          handleNavigate('courses');
        } else if (currentView !== 'dashboard') {
          handleNavigate('dashboard');
        } else if (!info.canGoBack) {
          CapacitorApp.exitApp();
        }
      });
      
      return () => listener.then(l => l.remove());
    }
  }, [currentView, activeModal, aiChatOpen, menuOpen, showToast, handleNavigate]);
  
  // Sync URL on initial load - always use hash, ignore localStorage default
  React.useEffect(() => {
    const hashView = parseHash();
    // Always set from hash on refresh, hash takes priority over localStorage
    setCurrentView(hashView);
    // If no hash, set default
    if (!window.location.hash) {
      window.location.hash = '#/dashboard';
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigate = React.useCallback((view) => {
    setCurrentView(view);
    setSelectedCourse(null);
    updateHash(view);
  }, [updateHash]);
  
  const handleSelectCourse = React.useCallback((course) => {
    setSelectedCourse(course);
    setCurrentView('course-detail');
    updateHash('course-detail', course);
  }, [updateHash]);

  const handleOpenQuiz = React.useCallback((quiz) => {
    const quizToUse = quiz || SampleData.sampleQuiz;
    setSelectedQuiz(quizToUse);
    setActiveModal('quiz');
  }, []);

  const handleOpenFlashcards = React.useCallback((deck) => {
    const deckToUse = deck || SampleData.sampleFlashcardDeck;
    setSelectedDeck(deckToUse);
    setActiveModal('flashcards');
  }, []);

  const handleOpenBook = React.useCallback((book = sampleBook) => {
    setSelectedBook(book);
    setActiveModal('ebook');
  }, [sampleBook]);

  const handleQuizComplete = React.useCallback((result) => {
    const wrongs = result.answers
      .filter(a => !a.isCorrect)
      .map(a => ({ 
        quizTitle: selectedQuiz.title, 
        question: selectedQuiz.questions[a.questionIndex] 
      }));
    setWrongQuestions(prev => [...prev, ...wrongs]);
    registerStudyActivity();
    showToast(
      `Score: ${result.score}/${result.total}`, 
      result.score >= result.total * 0.7 ? 'success' : 'warning'
    );
  }, [selectedQuiz, setWrongQuestions, registerStudyActivity, showToast]);

  const handleRestartOnboarding = React.useCallback(() => {
    setShowOnboarding(true);
  }, [setShowOnboarding]);

  const completeOnboarding = React.useCallback(() => {
    setShowOnboarding(false);
  }, [setShowOnboarding]);

  // ==================== RENDER ====================
  
  // Onboarding
  if (showOnboarding) {
    return <Onboarding onComplete={completeOnboarding} />;
  }

  // Login Screen
  if (!isAuthenticated) {
    return <LoginView onAuthenticate={handleAuthenticate} showToast={showToast} />;
  }

  // Teacher Portal
  if (userRole === 'teacher') {
    return (
      <>
        <Toast 
          message={toast.message} 
          type={toast.type} 
          isVisible={toast.visible} 
          onClose={() => setToast({ ...toast, visible: false })} 
        />
        <TeacherPortal onLogout={handleLogout} showToast={showToast} />
      </>
    );
  }

  // Parent Portal
  if (userRole === 'parent') {
    return (
      <>
        <Toast 
          message={toast.message} 
          type={toast.type} 
          isVisible={toast.visible} 
          onClose={() => setToast({ ...toast, visible: false })} 
        />
        <ParentPortal onLogout={handleLogout} showToast={showToast} />
      </>
    );
  }

  // Main App (Student Portal)
  return (
    <div style={{ 
      minHeight: '100vh',
      minHeight: '-webkit-fill-available',
      background: 'var(--bg-primary)', 
      backgroundImage: 'var(--gradient-mesh)', 
      backgroundAttachment: 'fixed',
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      {/* Toast */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.visible} 
        onClose={() => setToast({ ...toast, visible: false })} 
      />

      {/* Header */}
      <Header 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        toggleTheme={toggleTheme} 
        theme={theme} 
        onSearchClick={() => setSearchOpen(true)}
      />

      {/* Sidebar */}
      <Sidebar 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        currentView={currentView} 
        onNavigate={handleNavigate}
        onOpenAIChat={() => setAiChatOpen(true)}
        userRole={userRole}
      />

      {/* Main Content */}
      <main style={{ 
        padding: isMobile ? '12px 12px 80px 12px' : '16px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        paddingBottom: isMobile ? '80px' : '16px',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden'
      }}>
        {/* Admin Portal - Rendered for admin role */}
        {userRole === 'admin' && (
          <AdminPortal 
            onLogout={handleLogout}
            showToast={showToast}
          />
        )}

        {/* Regular views - Not rendered for admin */}
        {userRole !== 'admin' && (
          <>
        {currentView === 'dashboard' && (
          <DashboardView 
            courses={courses}
            stats={stats}
            streak={streak}
            lastPosition={lastPosition}
            onSelectCourse={handleSelectCourse}
            onNavigate={handleNavigate}
            onOpenQuiz={handleOpenQuiz}
            onOpenFlashcards={handleOpenFlashcards}
            onOpenAIChat={() => setAiChatOpen(true)}
            user={{ name: 'Student' }}
          />
        )}

        {currentView === 'courses' && (
          <CoursesView 
            courses={courses}
            courseSearch={courseSearch}
            setCourseSearch={setCourseSearch}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {currentView === 'course-detail' && (
          <CourseDetailView 
            course={selectedCourse}
            onBack={() => handleNavigate('courses')}
            onOpenQuiz={handleOpenQuiz}
            onOpenFlashcards={handleOpenFlashcards}
            saveLastPosition={saveLastPosition}
            registerStudyActivity={registerStudyActivity}
            showToast={showToast}
          />
        )}

        {currentView === 'quizzes' && (
          <QuizzesView 
            courses={courses}
            wrongQuestions={wrongQuestions}
            onOpenQuiz={handleOpenQuiz}
            sampleQuiz={sampleQuiz}
          />
        )}

        {currentView === 'flashcards' && (
          <FlashcardsView 
            courses={courses}
            onOpenFlashcards={handleOpenFlashcards}
            sampleDeck={sampleFlashcardDeck}
          />
        )}

        {currentView === 'analytics' && <AnalyticsView />}

        {currentView === 'ebooks' && (
          <EBooksView 
            courses={courses}
            onOpenBook={handleOpenBook}
            sampleBook={sampleBook}
            showToast={showToast}
          />
        )}

        {currentView === 'assignments' && (
          <AssignmentsView assignments={assignments} />
        )}

        {currentView === 'notes' && (
          <NotesView 
            notes={notes}
            setNotes={setNotes}
            currentNote={currentNote}
            setCurrentNote={setCurrentNote}
            noteSearch={noteSearch}
            setNoteSearch={setNoteSearch}
            noteTagFilter={noteTagFilter}
            setNoteTagFilter={setNoteTagFilter}
            registerStudyActivity={registerStudyActivity}
            showToast={showToast}
          />
        )}

        {currentView === 'settings' && (
          <SettingsView 
            educationMode={educationMode}
            streak={streak}
            onLogout={handleLogout}
            onRestartOnboarding={handleRestartOnboarding}
            showToast={showToast}
          />
        )}

        {currentView === 'ai-tutor' && <AITutorView />}

        {currentView === 'enrollment' && (
          <EnrollmentView 
            onBack={() => handleNavigate('dashboard')}
            onNavigate={handleNavigate}
            showToast={showToast}
          />
        )}

        {currentView === 'gradebook' && (
          <GradeBookView 
            onBack={() => handleNavigate('dashboard')}
            showToast={showToast}
          />
        )}

        {currentView === 'announcements' && (
          <AnnouncementsView 
            onBack={() => handleNavigate('dashboard')}
            showToast={showToast}
            isTeacher={userRole === 'teacher'}
          />
        )}

        {currentView === 'calendar' && (
          <CalendarView 
            onBack={() => handleNavigate('dashboard')}
            showToast={showToast}
            isTeacher={userRole === 'teacher'}
          />
        )}

        {currentView === 'progress-report' && (
          <ProgressReportView 
            onBack={() => handleNavigate('dashboard')}
            showToast={showToast}
          />
        )}

        {currentView === 'achievements' && (
          <AchievementsView 
            onBack={() => handleNavigate('dashboard')}
            showToast={showToast}
          />
        )}

        {currentView === 'leaderboard' && (
          <LeaderboardView 
            onBack={() => handleNavigate('dashboard')}
            showToast={showToast}
          />
        )}

        {currentView === 'resources' && (
          <ResourcesView 
            onBack={() => handleNavigate('dashboard')}
            showToast={showToast}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView 
            onBack={() => handleNavigate('dashboard')}
            showToast={showToast}
          />
        )}

        {currentView === 'messages' && (
          <MessagesView 
            onBack={() => handleNavigate('dashboard')}
            showToast={showToast}
            userRole={userRole}
          />
        )}

        {currentView === 'class-management' && (
          <ClassManagementView 
            onBack={() => handleNavigate('dashboard')}
            showToast={showToast}
          />
        )}

        {currentView === 'exam-schedule' && (
          <ExamScheduleView 
            onBack={() => handleNavigate('dashboard')}
            showToast={showToast}
          />
        )}

        {currentView === 'attendance' && (
          <AttendanceView 
            onBack={() => handleNavigate('dashboard')}
            showToast={showToast}
          />
        )}

        {currentView === 'homework' && (
          <HomeworkTrackerView 
            onBack={() => handleNavigate('dashboard')}
            showToast={showToast}
          />
        )}

        {currentView === 'streak' && (
          <StreakView 
            onBack={() => handleNavigate('dashboard')}
            showToast={showToast}
          />
        )}
          </>
        )}
      </main>

      {/* Modals */}
      <Modal 
        isOpen={activeModal === 'quiz'} 
        onClose={() => setActiveModal(null)} 
        title={selectedQuiz?.title || 'Quiz'} 
        size="lg"
      >
        <QuizSystem 
          quiz={selectedQuiz} 
          onComplete={handleQuizComplete} 
          onClose={() => setActiveModal(null)} 
        />
      </Modal>

      <Modal 
        isOpen={activeModal === 'flashcards'} 
        onClose={() => setActiveModal(null)} 
        title={selectedDeck?.title || 'Flashcards'} 
        size="md"
      >
        <FlashcardSystem 
          deck={selectedDeck} 
          onClose={() => setActiveModal(null)} 
        />
      </Modal>

      <Modal 
        isOpen={activeModal === 'ebook'} 
        onClose={() => setActiveModal(null)} 
        size="lg"
      >
        {selectedBook && (
          <EBookReader 
            book={selectedBook} 
            onClose={() => setActiveModal(null)} 
          />
        )}
      </Modal>




      {/* AI Chat */}
      <AIChat 
        isOpen={aiChatOpen} 
        onClose={() => setAiChatOpen(false)} 
      />

      {/* Global Search */}
      <GlobalSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Keyboard Shortcuts Help */}
      <KeyboardShortcuts
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />

      {/* Quick Add Button */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 997 }}>
        <button
          onClick={() => setQuickAddOpen(!quickAddOpen)}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--primary-500)',
            border: 'none',
            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: '#fff'
          }}
        >
          {quickAddOpen ? '✕' : '+'}
        </button>
      </div>

      <QuickAdd
        isOpen={quickAddOpen}
        onClose={() => setQuickAddOpen(false)}
        onNavigate={handleNavigate}
        showToast={showToast}
      />

      {/* Floating AI Button */}
      {!aiChatOpen && (
        <FloatingButton onClick={() => setAiChatOpen(true)} />
      )}

      {/* Bottom Navigation - Mobile Only */}
      {isMobile && window.BottomNav && (
        <BottomNav 
          currentView={currentView}
          onNavigate={handleNavigate}
        />
      )}

      {/* Install Prompt - PWA */}
      {window.InstallPrompt && <InstallPrompt />}
    </div>
  );
}

// App Wrapper with Theme Provider
function App() {
  return (
    <ThemeProvider>
      <LearnoraApp />
    </ThemeProvider>
  );
}

// Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Hide Loading Screen
setTimeout(() => {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
  }
}, 2000);

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered:', registration.scope))
      .catch(error => console.log('SW registration failed:', error));
  });
}