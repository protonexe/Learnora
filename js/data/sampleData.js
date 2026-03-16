// Sample data for the application
const SampleData = {
  courses: [
    { id: 1, name: 'Mathematics', icon: '📐', progress: 75, chapters: 12, color: '#f43f5e', students: 234, rating: 4.8 },
    { id: 2, name: 'Physics', icon: '⚛️', progress: 60, chapters: 10, color: '#14b8a6', students: 189, rating: 4.7 },
    { id: 3, name: 'Chemistry', icon: '🧪', progress: 45, chapters: 8, color: '#0ea5e9', students: 156, rating: 4.6 },
    { id: 4, name: 'Biology', icon: '🧬', progress: 80, chapters: 15, color: '#10b981', students: 201, rating: 4.9 },
    { id: 5, name: 'History', icon: '📚', progress: 90, chapters: 20, color: '#8b5cf6', students: 167, rating: 4.5 },
    { id: 6, name: 'English', icon: '📝', progress: 70, chapters: 18, color: '#f59e0b', students: 223, rating: 4.8 },
  ],

  assignments: [
    { id: 1, title: 'Calculus Problem Set 3', subject: 'Mathematics', due: '2 days', status: 'pending', priority: 'high' },
    { id: 2, title: 'Newton\'s Laws Lab Report', subject: 'Physics', due: '5 days', status: 'pending', priority: 'medium' },
    { id: 3, title: 'Chemical Bonding Essay', subject: 'Chemistry', due: '1 week', status: 'completed', priority: 'low' },
  ],

  stats: [
    { label: 'Courses', value: '6', icon: 'book-open', color: '#f43f5e', change: '+2' },
    { label: 'Assignments', value: '12', icon: 'file-text', color: '#14b8a6', change: '4 due' },
    { label: 'Study Hours', value: '48', icon: 'clock', color: '#0ea5e9', change: '+12h' },
    { label: 'Avg Score', value: '94%', icon: 'award', color: '#10b981', change: '+5%' },
  ],

  sampleQuiz: {
    title: 'Mathematics Quiz',
    timeLimit: 300,
    questions: [
      { question: 'What is the derivative of x²?', options: ['x', '2x', '2', 'x²'], correctAnswer: 1, explanation: 'Using the power rule, d/dx(x²) = 2x' },
      { question: 'What is the integral of 2x?', options: ['x', 'x²', '2x²', 'x² + C'], correctAnswer: 3, explanation: 'The integral of 2x is x² + C' },
      { question: 'What is sin(0)?', options: ['0', '1', '-1', 'undefined'], correctAnswer: 0, explanation: 'sin(0) = 0' },
      { question: 'What is π approximately?', options: ['3.14', '2.71', '1.41', '1.61'], correctAnswer: 0, explanation: 'π ≈ 3.14159' },
      { question: 'What is 5! (factorial)?', options: ['25', '120', '60', '720'], correctAnswer: 1, explanation: '5! = 5×4×3×2×1 = 120' }
    ]
  },

  sampleFlashcardDeck: {
    title: 'Physics Fundamentals',
    cards: [
      { front: 'What is Newton\'s First Law?', back: 'An object stays at rest or in motion unless acted upon by an external force.' },
      { front: 'What is the formula for Force?', back: 'F = ma (Force = mass × acceleration)' },
      { front: 'What is kinetic energy?', back: 'Energy of motion: KE = ½mv²' },
      { front: 'What is the speed of light?', back: '≈ 3 × 10⁸ m/s' },
      { front: 'What is Ohm\'s Law?', back: 'V = IR (Voltage = Current × Resistance)' }
    ]
  },

  sampleBook: {
    title: 'Introduction to Calculus',
    content: [
      { title: 'Chapter 1: Limits', content: 'A limit is the value that a function approaches as the input approaches some value.\n\nLimits are essential to calculus and mathematical analysis.' },
      { title: 'Chapter 2: Derivatives', content: 'The derivative represents the rate of change of a function.\n\nCommon rules: power rule, product rule, chain rule.' },
      { title: 'Chapter 3: Integrals', content: 'Integration is the reverse of differentiation.\n\nThe fundamental theorem connects derivatives and integrals.' }
    ]
  },

  navItems: [
    { icon: 'home', label: 'Dashboard', view: 'dashboard' },
    { icon: 'book-open', label: 'Courses', view: 'courses' },
    { icon: 'file-text', label: 'Assignments', view: 'assignments' },
    { icon: 'edit-3', label: 'Notes', view: 'notes' },
    { icon: 'help-circle', label: 'Quizzes', view: 'quizzes' },
    { icon: 'layers', label: 'Flashcards', view: 'flashcards' },
    { icon: 'bar-chart-2', label: 'Analytics', view: 'analytics' },
    { icon: 'book', label: 'E-Books', view: 'ebooks' },
    { icon: 'folder', label: 'Resources', view: 'resources' },
    { icon: 'calendar', label: 'Calendar', view: 'calendar' },
    { icon: 'clipboard', label: 'Announcements', view: 'announcements' },
    { icon: 'users', label: 'Enrollment', view: 'enrollment' },
    { icon: 'trending-up', label: 'Progress', view: 'progress-report' },
    { icon: 'zap', label: 'Streak', view: 'streak' },
    { icon: 'award', label: 'Achievements', view: 'achievements' },
    { icon: 'trophy', label: 'Leaderboard', view: 'leaderboard' },
    { icon: 'message-circle', label: 'Messages', view: 'messages' },
    { icon: 'user', label: 'Profile', view: 'profile' },
    { icon: 'users', label: 'Classes', view: 'class-management' },
    { icon: 'calendar', label: 'Exams', view: 'exam-schedule' },
    { icon: 'check-circle', label: 'Attendance', view: 'attendance' },
    { icon: 'list', label: 'Homework', view: 'homework' },
    { icon: 'settings', label: 'Settings', view: 'settings' },
    { icon: 'message-circle', label: 'AI Tutor', view: 'ai-tutor' },
    { icon: 'clock', label: 'Pomodoro', view: 'pomodoro' },
    { icon: 'target', label: 'Focus Timer', view: 'focus-timer' },
    { icon: 'map-pin', label: 'Study Spots', view: 'study-spots' },
    { icon: 'music', label: 'Playlists', view: 'playlists' },
    { icon: 'users', label: 'Study Rooms', view: 'study-rooms' },
    { icon: 'edit-3', label: 'Journal', view: 'journal' },
    { icon: 'calendar', label: 'Weekly Plan', view: 'weekly-planner' },
    { icon: 'trending-up', label: 'Insights', view: 'insights' },
    { icon: 'clipboard', label: 'Exam Prep', view: 'exam-prep' },
    { icon: 'bar-chart', label: 'Statistics', view: 'statistics' },
    { icon: 'history', label: 'History', view: 'session-history' },
    { icon: 'award', label: 'Badges', view: 'badges' },
    { icon: 'zap', label: 'Streak', view: 'streak' },
    { icon: 'file-text', label: 'Study Notes', view: 'study-notes' },
    { icon: 'message-square', label: 'Quote', view: 'daily-quote' },
    { icon: 'check-square', label: 'Homework', view: 'homework' },
    { icon: 'layers', label: 'Card Builder', view: 'flashcard-builder' },
    { icon: 'grid', label: 'Quick Stats', view: 'quick-stats' },
    { icon: 'award', label: 'Grade Book', view: 'grade-book' },
    { icon: 'calendar', label: 'Attendance', view: 'attendance' },
    { icon: 'calendar', label: 'Calendar', view: 'calendar' },
    { icon: 'trophy', label: 'Leaderboard', view: 'leaderboard' },
    { icon: 'bell', label: 'Notifications', view: 'notifications' },
    { icon: 'clock', label: 'Exam Schedule', view: 'exam-schedule' },
    { icon: 'check-circle', label: 'Habits', view: 'habits' },
    { icon: 'users', label: 'Groups', view: 'study-groups' },
    { icon: 'video', label: 'Live', view: 'live-sessions' },
    { icon: 'book-open', label: 'Reading', view: 'reading-list' },
    { icon: 'target', label: 'Goals', view: 'study-goals' },
    { icon: 'book', label: 'Catalog', view: 'course-catalog' },
    { icon: 'edit-3', label: 'Quiz Maker', view: 'quiz-builder' },
    { icon: 'tool', label: 'Debug', view: 'debug' },
    { icon: 'info', label: 'About', view: 'about' },
    { icon: 'lightbulb', label: 'Brain Storm', view: 'brainstorm' },
    { icon: 'search', label: 'Topics', view: 'topics' },
    { icon: 'bookmark', label: 'Tips', view: 'exam-tips' },
    { icon: 'link', label: 'Quick Links', view: 'quick-links' },
    { icon: 'calendar', label: 'Progress', view: 'weekly-progress' },
    { icon: 'clock', label: 'Classes', view: 'class-schedule' },
    { icon: 'award', label: 'Achievements', view: 'achievements' },
    { icon: 'database', label: 'Backup', view: 'data-backup' },
    { icon: 'palette', label: 'Theme', view: 'theme' },
    { icon: 'mic', label: 'Recorder', view: 'voice-recorder' },
    { icon: 'message-square', label: 'Messages', view: 'messages' },
    { icon: 'user-plus', label: 'Study Match', view: 'study-match' },
    { icon: 'zap', label: 'Challenges', view: 'daily-challenge' },
    { icon: 'credit-card', label: 'Premium', view: 'subscription' },
    { icon: 'calendar', label: 'Events', view: 'events' },
    { icon: 'image', label: 'Gallery', view: 'learning-gallery' },
    { icon: 'map', label: 'Study Map', view: 'study-map' },
    { icon: 'help-circle', label: 'Help', view: 'help-support' },
    { icon: 'star', label: 'XP Progress', view: 'xp-progress' },
    { icon: 'zap', label: 'Motivation', view: 'motivation' },
    { icon: 'git-branch', label: 'Learning Path', view: 'learning-path' },
    { icon: 'activity', label: 'Status', view: 'system-status' },
    { icon: 'book-open', label: 'Knowledge', view: 'knowledge-base' },
    { icon: 'calendar', label: 'Tutoring', view: 'tutoring' },
    { icon: 'wifi-off', label: 'Offline', view: 'offline-mode' },
    { icon: 'share-2', label: 'Share', view: 'share' },
    { icon: 'layout', label: 'Classroom', view: 'classroom' },
    { icon: 'user-check', label: 'Mentor', view: 'mentor' },
    { icon: 'credit-card', label: 'Payments', view: 'payments' },
    { icon: 'edit', label: 'Note Editor', view: 'note-editor' },
    { icon: 'play-circle', label: 'Course View', view: 'course-view' },
    { icon: 'video', label: 'Videos', view: 'video-player' },
    { icon: 'headphones', label: 'Audio', view: 'audio-player' },
    { icon: 'folder', label: 'Documents', view: 'documents' },
    { icon: 'layers', label: 'Card Review', view: 'flashcard-review' },
    { icon: 'zap', label: 'Quick Quiz', view: 'quick-quiz' },
    { icon: 'file-text', label: 'Session Summary', view: 'session-summary' },
    { icon: 'target', label: 'Weekly Goals', view: 'weekly-goals' },
    { icon: 'award', label: 'Quiz Results', view: 'quiz-results' },
    { icon: 'book', label: 'Subject Card', view: 'subject-card' },
    { icon: 'trending-up', label: 'Course Progress', view: 'course-progress' },
    { icon: 'clock', label: 'Pomodoro Pro', view: 'pomodoro-advanced' },
    { icon: 'calendar', label: 'Study Planner', view: 'study-planner' },
    { icon: 'music', label: 'Focus Music', view: 'focus-music' },
    { icon: 'target', label: 'Progress Track', view: 'progress-tracker' },
    { icon: 'countdown', label: 'Exam Countdown', view: 'exam-countdown' },
    { icon: 'edit-3', label: 'Quick Notes', view: 'quick-notes' },
    { icon: 'check-square', label: 'Task Master', view: 'task-master' },
    { icon: 'gift', label: 'Study Rewards', view: 'study-rewards' },
    { icon: 'git-branch', label: 'Knowledge Tree', view: 'knowledge-tree' },
    { icon: 'clock', label: 'Study Timer', view: 'study-timer' },
    { icon: 'book', label: 'Subject Dashboard', view: 'subject-dashboard' },
    { icon: 'star', label: 'Motivation', view: 'motivational-widget' },
    { icon: 'file-text', label: 'Study Log', view: 'study-log' },
    { icon: 'award', label: 'Achievements', view: 'achievement-system' },
    { icon: 'eye', label: 'Focus Mode', view: 'focus-mode' },
    { icon: 'file-check', label: 'Assignments', view: 'assignment-tracker' },
    { icon: 'graduation-cap', label: 'Grades', view: 'grade-tracker' },
    { icon: 'check-circle', label: 'Habits', view: 'habit-builder' },
    { icon: 'clock', label: 'Session Review', view: 'session-review' },
    { icon: 'list', label: 'Checklist', view: 'study-checklist' },
    { icon: 'bar-chart', label: 'Quick Stats', view: 'quick-stats-widget' },
    { icon: 'calendar', label: 'Weekly Overview', view: 'weekly-overview' },
    { icon: 'target', label: 'Daily Goals', view: 'daily-goals' },
    { icon: 'activity', label: 'Productivity', view: 'productivity-tracker' },
    { icon: 'compass', label: 'Topics', view: 'topic-explorer' },
    { icon: 'lightbulb', label: 'Tips', view: 'study-spotlight' },
    { icon: 'folder', label: 'Resources', view: 'resource-library' },
    { icon: 'pie-chart', label: 'Insights', view: 'study-insights' },
    { icon: 'sun', label: 'Reflection', view: 'daily-reflection' },
    { icon: 'music', label: 'Ambient', view: 'focus-music-player' },
    { icon: 'book-open', label: 'Exam Tips', view: 'exam-tips-view' },
    { icon: 'map', label: 'Journey', view: 'learning-journey' },
    { icon: 'credit-card', label: 'Progress Card', view: 'progress-card' },
    { icon: 'book', label: 'My Courses', view: 'course-card' },
    { icon: 'headphones', label: 'Playlists', view: 'focus-playlist' },
    { icon: 'zap', label: 'Brain Dump', view: 'brain-dump' },
    { icon: 'clock', label: 'Pomodoro', view: 'pomodoro-widget' },
    { icon: 'message-square', label: 'Quote', view: 'daily-quote-view' },
    { icon: 'link', label: 'Quick Links', view: 'quick-links-view' },
    { icon: 'target', label: 'Focus Session', view: 'focus-session' },
    { icon: 'gamepad-2', label: 'Mini Games', view: 'mini-games' },
    { icon: 'calendar', label: 'Calendar', view: 'study-calendar' },
    { icon: 'bell', label: 'Reminders', view: 'study-reminder' },
    { icon: 'bar-chart', label: 'Subject Progress', view: 'subject-progress' },
    { icon: 'trending-up', label: 'Stats', view: 'learning-stats' },
    { icon: 'brain', label: 'Memory Game', view: 'memory-game' },
    { icon: 'calculator', label: 'Math Sprint', view: 'math-sprint' },
    { icon: 'type', label: 'Word Scramble', view: 'word-scramble' },
    { icon: 'dollar-sign', label: 'Budget', view: 'study-budget' },
    { icon: 'clock', label: 'Focus', view: 'focus-widget' },
    { icon: 'edit-3', label: 'Notes 2', view: 'quick-notes-2' },
    { icon: 'layers', label: 'Flashcards', view: 'flashcard-study' },
    { icon: 'map-pin', label: 'Spots', view: 'study-spot-map' },
    { icon: 'target', label: 'Goals', view: 'study-goals-view' },
    { icon: 'zap', label: 'Challenge', view: 'daily-challenge' },
    { icon: 'calendar', label: 'Planner', view: 'study-planner-2' },
    { icon: 'clock', label: 'Exams', view: 'exam-scheduler' },
    { icon: 'file-text', label: 'Report', view: 'progress-report' },
    { icon: 'pie-chart', label: 'Analytics', view: 'study-analytics' },
    { icon: 'zap', label: 'Banner', view: 'motivational-banner' },
    { icon: 'git-branch', label: 'Path', view: 'learning-path' },
    { icon: 'award', label: 'Achievements', view: 'study-achievements' },
    { icon: 'timer', label: 'Timer', view: 'session-timer' },
    { icon: 'calendar', label: 'Weekly', view: 'weekly-progress' },
    { icon: 'book', label: 'Catalog', view: 'course-catalog-2' },
    { icon: 'clock', label: 'Schedule', view: 'study-schedule' },
    { icon: 'list', label: 'Todo List', view: 'todo-list' },
    { icon: 'timer', label: 'Countdown', view: 'countdown-timer' },
    { icon: 'edit', label: 'Note Taker', view: 'note-taker' },
    { icon: 'layers', label: 'Flashcard Practice', view: 'flashcard-practice' },
    { icon: 'zap', label: 'Streak 2', view: 'study-streak-2' },
    { icon: 'check-circle', label: 'Habits', view: 'habit-tracker-2' },
    { icon: 'clock', label: 'Pomodoro 2', view: 'pomodoro-2' },
    { icon: 'message-square', label: 'Quick Quote', view: 'quick-quote' },
    { icon: 'credit-card', label: 'Learning Cards', view: 'learning-card' },
    { icon: 'timer', label: 'Study Timer 2', view: 'study-timer-2' },
    { icon: 'eye', label: 'Focus Mode 2', view: 'focus-mode-2' },
    { icon: 'lightbulb', label: 'Daily Insight', view: 'daily-insight' },
    { icon: 'clock', label: 'Time Tracker', view: 'time-tracker' },
    { icon: 'calculator', label: 'Quick Math', view: 'quick-math' },
    { icon: 'credit-card', label: 'Study Cards', view: 'study-card' },
    { icon: 'zap', label: 'Motivation', view: 'daily-motiv' },
    { icon: 'grid', label: 'Study Widget', view: 'study-widget' },
    { icon: 'clock', label: 'Quick Timer', view: 'quick-timer' },
    { icon: 'list', label: 'Focus List', view: 'focus-list' },
  ],

  weeklyStudyData: [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.1 },
    { day: 'Fri', hours: 2.9 },
    { day: 'Sat', hours: 5.2 },
    { day: 'Sun', hours: 3.7 }
  ],

  subjectProgress: [
    { name: 'Mathematics', progress: 78, color: 'var(--accent-rose)' },
    { name: 'Physics', progress: 65, color: 'var(--accent-teal)' },
    { name: 'Chemistry', progress: 45, color: 'var(--accent-sky)' },
    { name: 'Biology', progress: 82, color: 'var(--accent-emerald)' }
  ],

  // Extended Analytics Data
  analytics: {
    // Overview stats
    overview: {
      totalStudyHours: 127.5,
      totalStudyHoursChange: 23,
      coursesCompleted: 4,
      coursesInProgress: 6,
      totalQuizzesTaken: 47,
      quizPassRate: 89,
      flashcardsReviewed: 342,
      averageScore: 87.5,
      currentStreak: 12,
      longestStreak: 21,
      totalXP: 4850,
      level: 8,
      xpToNextLevel: 150,
      rank: 'Scholar'
    },

    // Monthly study hours for line chart
    monthlyStudyData: [
      { month: 'Jan', hours: 32, quizzes: 8, score: 82 },
      { month: 'Feb', hours: 45, quizzes: 12, score: 85 },
      { month: 'Mar', hours: 38, quizzes: 10, score: 88 },
      { month: 'Apr', hours: 52, quizzes: 15, score: 86 },
      { month: 'May', hours: 48, quizzes: 11, score: 90 },
      { month: 'Jun', hours: 55, quizzes: 14, score: 91 }
    ],

    // Time distribution by subject (for donut chart)
    timeBySubject: [
      { name: 'Mathematics', hours: 35, color: '#f43f5e', icon: '📐' },
      { name: 'Physics', hours: 28, color: '#14b8a6', icon: '⚛️' },
      { name: 'Chemistry', hours: 22, color: '#0ea5e9', icon: '🧪' },
      { name: 'Biology', hours: 25, color: '#10b981', icon: '🧬' },
      { name: 'History', hours: 18, color: '#8b5cf6', icon: '📚' },
      { name: 'English', hours: 12, color: '#f59e0b', icon: '📝' }
    ],

    // Performance by activity type
    activityPerformance: [
      { type: 'Quizzes', completed: 47, avgScore: 87, icon: 'help-circle', color: '#6366f1' },
      { type: 'Flashcards', completed: 342, avgScore: 92, icon: 'layers', color: '#14b8a6' },
      { type: 'Assignments', completed: 23, avgScore: 85, icon: 'file-text', color: '#f59e0b' },
      { type: 'Practice', completed: 156, avgScore: 78, icon: 'target', color: '#f43f5e' }
    ],

    // Recent quiz scores
    recentQuizScores: [
      { name: 'Calculus Fundamentals', subject: 'Mathematics', score: 92, date: '2 days ago', questions: 20 },
      { name: 'Newton\'s Laws', subject: 'Physics', score: 88, date: '3 days ago', questions: 15 },
      { name: 'Organic Chemistry', subject: 'Chemistry', score: 76, date: '5 days ago', questions: 25 },
      { name: 'Cell Biology', subject: 'Biology', score: 95, date: '1 week ago', questions: 20 },
      { name: 'World War II', subject: 'History', score: 82, date: '1 week ago', questions: 30 }
    ],

    // Achievements
    achievements: [
      { id: 1, name: 'Early Bird', description: 'Study before 7 AM', icon: 'sunrise', unlocked: true, date: 'Jan 15' },
      { id: 2, name: 'Night Owl', description: 'Study after 10 PM', icon: 'moon', unlocked: true, date: 'Feb 3' },
      { id: 3, name: 'Perfect Score', description: 'Get 100% on a quiz', icon: 'award', unlocked: true, date: 'Mar 12' },
      { id: 4, name: 'Streak Master', description: '7-day study streak', icon: 'zap', unlocked: true, date: 'Mar 20' },
      { id: 5, name: 'Quiz Champion', description: 'Pass 50 quizzes', icon: 'trophy', unlocked: false, progress: 47 },
      { id: 6, name: 'Bookworm', description: 'Read 10 e-books', icon: 'book', unlocked: false, progress: 6 },
      { id: 7, name: 'Flash Master', description: 'Review 500 flashcards', icon: 'layers', unlocked: false, progress: 342 },
      { id: 8, name: 'Completionist', description: 'Complete all courses', icon: 'check-circle', unlocked: false, progress: 4 }
    ],

    // Goals
    goals: [
      { id: 1, title: 'Study 20 hours this week', current: 14.5, target: 20, unit: 'hours', icon: 'clock', color: '#6366f1' },
      { id: 2, title: 'Complete 5 quizzes', current: 3, target: 5, unit: 'quizzes', icon: 'help-circle', color: '#14b8a6' },
      { id: 3, title: 'Maintain 85% avg score', current: 87, target: 85, unit: '%', icon: 'target', color: '#10b981', achieved: true },
      { id: 4, title: 'Finish Calculus course', current: 75, target: 100, unit: '%', icon: 'book-open', color: '#f59e0b' }
    ],

    // Learning insights
    insights: [
      { type: 'strength', title: 'Strong in Biology', description: 'You score 15% above average in Biology quizzes', icon: 'trending-up', color: '#10b981' },
      { type: 'improvement', title: 'Chemistry needs attention', description: 'Your Chemistry score dropped 8% this month', icon: 'alert-circle', color: '#f59e0b' },
      { type: 'pattern', title: 'Most productive on Saturdays', description: 'You study 40% more on weekends', icon: 'calendar', color: '#6366f1' },
      { type: 'tip', title: 'Try spaced repetition', description: 'Review flashcards at optimal intervals for better retention', icon: 'lightbulb', color: '#8b5cf6' }
    ],

    // Study sessions by time of day
    studyByTimeOfDay: [
      { period: 'Morning', hours: 35, percentage: 28 },
      { period: 'Afternoon', hours: 48, percentage: 38 },
      { period: 'Evening', hours: 32, percentage: 25 },
      { period: 'Night', hours: 12, percentage: 9 }
    ],

    // Leaderboard
    leaderboard: [
      { rank: 1, name: 'Alex Chen', xp: 6240, avatar: 'A', streak: 28 },
      { rank: 2, name: 'Sarah Kim', xp: 5890, avatar: 'S', streak: 21 },
      { rank: 3, name: 'You', xp: 4850, avatar: 'E', streak: 12, isUser: true },
      { rank: 4, name: 'Mike Johnson', xp: 4520, avatar: 'M', streak: 9 },
      { rank: 5, name: 'Lisa Wang', xp: 4200, avatar: 'L', streak: 15 }
    ]
  }
};

window.SampleData = SampleData;