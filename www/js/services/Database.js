// Simple LocalStorage-based Database for Learnora
// Simulates a real database with collections/tables

class LocalDatabase {
  constructor(dbName = 'learnora_db') {
    this.dbName = dbName;
    this.data = this.loadData();
    this.initialized = false;
  }

  loadData() {
    try {
      const json = window.localStorage.getItem(this.dbName);
      if (json) {
        return JSON.parse(json);
      }
    } catch (e) {
      console.error('Failed to load DB from localStorage', e);
    }
    return {
      users: [],
      courses: [],
      assignments: [],
      stats: [],
      analytics: null,
      quizzes: [],
      flashcards: [],
      classes: [],
      studentGrades: [],
      studentProgress: {},
      chapters: [],
      quizResults: {},
      flashcardDecks: []
    };
  }

  saveData() {
    try {
      window.localStorage.setItem(this.dbName, JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save DB to localStorage', e);
    }
  }

  init(sampleData, demoCredentials) {
    if (this.initialized) return;
    
    if (!this.data.users.length && demoCredentials) {
      let users = [];
      ['students', 'teachers', 'parents'].forEach(role => {
        if (demoCredentials[role]) {
          const formattedRole = role === 'students' ? 'student' : (role === 'teachers' ? 'teacher' : 'parent');
          demoCredentials[role].forEach((u, i) => {
            users.push({ id: `${formattedRole}_${i}`, role: formattedRole, ...u });
          });
        }
      });
      this.data.users = users;
    }

    if (!this.data.courses.length && sampleData?.courses) {
      this.data.courses = sampleData.courses.map((c, i) => ({
        ...c,
        id: c.id || `course_${i}`,
        chapters: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    }
    
    if (!this.data.assignments.length && sampleData?.assignments) {
      this.data.assignments = sampleData.assignments;
    }
    if (!this.data.stats.length && sampleData?.stats) {
      this.data.stats = sampleData.stats;
    }
    if (!this.data.analytics && sampleData?.analytics) {
      this.data.analytics = sampleData.analytics;
    }

    if (!this.data.quizzes.length && sampleData?.sampleQuiz) {
      this.data.quizzes = [{
        ...sampleData.sampleQuiz,
        id: 'quiz_1',
        courseId: '1',
        createdAt: new Date().toISOString()
      }];
    }

    if (!this.data.flashcardDecks.length && sampleData?.sampleFlashcardDeck) {
      this.data.flashcardDecks = [{
        ...sampleData.sampleFlashcardDeck,
        id: 'deck_1',
        courseId: '2',
        createdAt: new Date().toISOString()
      }];
    }

    this.saveData();
    this.initialized = true;
    console.log('[Learnora] LocalDatabase initialized');
  }

  // ==================== USER METHODS ====================
  
  validateUser(role, username, password) {
    const match = this.data.users.find(u => u.role === role && u.username === username && u.password === password);
    return match || null;
  }

  getUserByUsername(username) {
    return this.data.users.find(u => u.username === username) || null;
  }

  getUserById(id) {
    return this.data.users.find(u => u.id === id) || null;
  }

  getStudents() {
    return this.data.users.filter(u => u.role === 'student');
  }

  getTeachers() {
    return this.data.users.filter(u => u.role === 'teacher');
  }

  getParents() {
    return this.data.users.filter(u => u.role === 'parent');
  }

  // ==================== COURSE METHODS ====================
  
  getAllCourses() {
    return this.data.courses || [];
  }

  getCourseById(id) {
    return this.data.courses.find(c => c.id === id) || null;
  }

  getCoursesForTeacher(teacherId) {
    return (this.data.courses || []).filter(c => c.teacherId === teacherId);
  }

  createCourse(courseData) {
    const newCourse = {
      id: `course_${Date.now()}`,
      ...courseData,
      chapters: [],
      students: courseData.students || 0,
      rating: courseData.rating || 0,
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.courses.push(newCourse);
    this.saveData();
    return newCourse;
  }

  updateCourse(id, updates) {
    const index = this.data.courses.findIndex(c => c.id === id);
    if (index !== -1) {
      this.data.courses[index] = {
        ...this.data.courses[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.saveData();
      return this.data.courses[index];
    }
    return null;
  }

  deleteCourse(id) {
    this.data.courses = this.data.courses.filter(c => c.id !== id);
    this.data.chapters = (this.data.chapters || []).filter(ch => ch.courseId !== id);
    this.saveData();
  }

  // ==================== CHAPTER METHODS ====================
  
  getChaptersForCourse(courseId) {
    return (this.data.chapters || []).filter(ch => ch.courseId === courseId);
  }

  createChapter(courseId, chapterData) {
    const newChapter = {
      id: `chapter_${Date.now()}`,
      courseId,
      ...chapterData,
      lessons: [],
      order: (this.data.chapters?.filter(ch => ch.courseId === courseId).length || 0) + 1,
      createdAt: new Date().toISOString()
    };
    if (!this.data.chapters) this.data.chapters = [];
    this.data.chapters.push(newChapter);
    
    const course = this.getCourseById(courseId);
    if (course) {
      course.chapters = (course.chapters || []).concat(newChapter.id);
      course.chaptersCount = (course.chaptersCount || 0) + 1;
    }
    
    this.saveData();
    return newChapter;
  }

  updateChapter(id, updates) {
    const index = (this.data.chapters || []).findIndex(ch => ch.id === id);
    if (index !== -1) {
      this.data.chapters[index] = { ...this.data.chapters[index], ...updates };
      this.saveData();
      return this.data.chapters[index];
    }
    return null;
  }

  deleteChapter(id) {
    const chapter = (this.data.chapters || []).find(ch => ch.id === id);
    if (chapter) {
      const course = this.getCourseById(chapter.courseId);
      if (course) {
        course.chapters = (course.chapters || []).filter(chId => chId !== id);
      }
    }
    this.data.chapters = (this.data.chapters || []).filter(ch => ch.id !== id);
    this.saveData();
  }

  // ==================== QUIZ METHODS ====================
  
  getAllQuizzes() {
    return this.data.quizzes || [];
  }

  getQuizById(id) {
    return this.data.quizzes.find(q => q.id === id) || null;
  }

  getQuizzesForCourse(courseId) {
    return (this.data.quizzes || []).filter(q => q.courseId === courseId);
  }

  getQuizzesForTeacher(teacherId) {
    return (this.data.quizzes || []).filter(q => q.teacherId === teacherId);
  }

  createQuiz(quizData) {
    const newQuiz = {
      id: `quiz_${Date.now()}`,
      ...quizData,
      questions: quizData.questions || [],
      timeLimit: quizData.timeLimit || 300,
      passingScore: quizData.passingScore || 60,
      attempts: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (!this.data.quizzes) this.data.quizzes = [];
    this.data.quizzes.push(newQuiz);
    this.saveData();
    return newQuiz;
  }

  updateQuiz(id, updates) {
    const index = (this.data.quizzes || []).findIndex(q => q.id === id);
    if (index !== -1) {
      this.data.quizzes[index] = {
        ...this.data.quizzes[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.saveData();
      return this.data.quizzes[index];
    }
    return null;
  }

  deleteQuiz(id) {
    this.data.quizzes = (this.data.quizzes || []).filter(q => q.id !== id);
    this.saveData();
  }

  submitQuizResult(quizId, studentId, result) {
    if (!this.data.quizResults) this.data.quizResults = {};
    if (!this.data.quizResults[studentId]) this.data.quizResults[studentId] = [];
    
    const resultRecord = {
      quizId,
      score: result.score,
      totalQuestions: result.totalQuestions,
      correctAnswers: result.correctAnswers,
      timeTaken: result.timeTaken,
      answers: result.answers,
      submittedAt: new Date().toISOString()
    };
    
    this.data.quizResults[studentId].push(resultRecord);
    
    const quiz = this.getQuizById(quizId);
    if (quiz) {
      quiz.attempts = (quiz.attempts || 0) + 1;
    }
    
    this.saveData();
    return resultRecord;
  }

  getQuizResultsForStudent(studentId) {
    return this.data.quizResults?.[studentId] || [];
  }

  // ==================== FLASHCARD METHODS ====================
  
  getAllFlashcardDecks() {
    return this.data.flashcardDecks || [];
  }

  getFlashcardDeckById(id) {
    return this.data.flashcardDecks.find(d => d.id === id) || null;
  }

  getFlashcardDecksForCourse(courseId) {
    return (this.data.flashcardDecks || []).filter(d => d.courseId === courseId);
  }

  getFlashcardDecksForTeacher(teacherId) {
    return (this.data.flashcardDecks || []).filter(d => d.teacherId === teacherId);
  }

  createFlashcardDeck(deckData) {
    const newDeck = {
      id: `deck_${Date.now()}`,
      ...deckData,
      cards: deckData.cards || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (!this.data.flashcardDecks) this.data.flashcardDecks = [];
    this.data.flashcardDecks.push(newDeck);
    this.saveData();
    return newDeck;
  }

  updateFlashcardDeck(id, updates) {
    const index = (this.data.flashcardDecks || []).findIndex(d => d.id === id);
    if (index !== -1) {
      this.data.flashcardDecks[index] = {
        ...this.data.flashcardDecks[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.saveData();
      return this.data.flashcardDecks[index];
    }
    return null;
  }

  deleteFlashcardDeck(id) {
    this.data.flashcardDecks = (this.data.flashcardDecks || []).filter(d => d.id !== id);
    this.saveData();
  }

  addCardToDeck(deckId, cardData) {
    const deck = this.getFlashcardDeckById(deckId);
    if (deck) {
      const newCard = {
        id: `card_${Date.now()}`,
        ...cardData
      };
      deck.cards.push(newCard);
      deck.cardCount = deck.cards.length;
      this.saveData();
      return newCard;
    }
    return null;
  }

  removeCardFromDeck(deckId, cardId) {
    const deck = this.getFlashcardDeckById(deckId);
    if (deck) {
      deck.cards = deck.cards.filter(c => c.id !== cardId);
      deck.cardCount = deck.cards.length;
      this.saveData();
    }
  }

  // ==================== ASSIGNMENT METHODS ====================
  
  getAllAssignments() {
    return this.data.assignments || [];
  }

  getAssignmentById(id) {
    return this.data.assignments.find(a => a.id === id) || null;
  }

  getAssignmentsForCourse(courseId) {
    return (this.data.assignments || []).filter(a => a.courseId === courseId);
  }

  getAssignmentsForTeacher(teacherId) {
    return (this.data.assignments || []).filter(a => a.teacherId === teacherId);
  }

  createAssignment(assignmentData) {
    const newAssignment = {
      id: `assignment_${Date.now()}`,
      ...assignmentData,
      submissions: [],
      status: 'pending',
      createdAt: new Date().toISOString(),
      dueDate: assignmentData.dueDate || null
    };
    if (!this.data.assignments) this.data.assignments = [];
    this.data.assignments.push(newAssignment);
    this.saveData();
    return newAssignment;
  }

  updateAssignment(id, updates) {
    const index = (this.data.assignments || []).findIndex(a => a.id === id);
    if (index !== -1) {
      this.data.assignments[index] = { ...this.data.assignments[index], ...updates };
      this.saveData();
      return this.data.assignments[index];
    }
    return null;
  }

  deleteAssignment(id) {
    this.data.assignments = (this.data.assignments || []).filter(a => a.id !== id);
    this.saveData();
  }

  submitAssignment(assignmentId, studentId, submission) {
    const assignment = this.getAssignmentById(assignmentId);
    if (assignment) {
      if (!assignment.submissions) assignment.submissions = [];
      assignment.submissions.push({
        studentId,
        content: submission.content,
        submittedAt: new Date().toISOString()
      });
      this.saveData();
      return assignment;
    }
    return null;
  }

  // ==================== CLASS METHODS ====================
  
  getClassesForTeacher(teacherId) {
    if (!Array.isArray(this.data.classes)) return [];
    return this.data.classes.filter(c => c.teacherId === teacherId);
  }

  createClass(classData) {
    const newClass = {
      id: `class_${Date.now()}`,
      ...classData,
      students: [],
      createdAt: new Date().toISOString()
    };
    if (!this.data.classes) this.data.classes = [];
    this.data.classes.push(newClass);
    this.saveData();
    return newClass;
  }

  addStudentToClass(classId, studentId) {
    const classObj = (this.data.classes || []).find(c => c.id === classId);
    if (classObj) {
      if (!classObj.students.includes(studentId)) {
        classObj.students.push(studentId);
        classObj.studentCount = classObj.students.length;
        this.saveData();
      }
    }
  }

  removeStudentFromClass(classId, studentId) {
    const classObj = (this.data.classes || []).find(c => c.id === classId);
    if (classObj) {
      classObj.students = classObj.students.filter(s => s !== studentId);
      classObj.studentCount = classObj.students.length;
      this.saveData();
    }
  }

  getStudentsInClass(classId) {
    const classObj = (this.data.classes || []).find(c => c.id === classId);
    if (!classObj) return [];
    return classObj.students.map(sId => this.getUserById(sId)).filter(Boolean);
  }

  // ==================== ANALYTICS & PROGRESS ====================
  
  getChildrenForParent(parentId) {
    const parent = this.getUserById(parentId);
    if (!parent || !parent.children) return [];
    return parent.children.map(name => this.data.users.find(u => u.name === name)).filter(Boolean);
  }

  getStudentProgress(studentId) {
    return this.data.studentProgress[studentId] || {};
  }

  updateStudentProgress(studentId, progressData) {
    this.data.studentProgress[studentId] = progressData;
    this.saveData();
  }

  getAnalytics() {
    return this.data.analytics || {};
  }

  updateStudentGrade(studentId, classId, grade) {
    if (!this.data.studentGrades) this.data.studentGrades = [];
    const existingIndex = this.data.studentGrades.findIndex(
      g => g.studentId === studentId && g.classId === classId
    );
    
    const gradeRecord = {
      studentId,
      classId,
      grade,
      updatedAt: new Date().toISOString()
    };
    
    if (existingIndex !== -1) {
      this.data.studentGrades[existingIndex] = gradeRecord;
    } else {
      this.data.studentGrades.push(gradeRecord);
    }
    this.saveData();
  }

  getGradesForStudent(studentId) {
    return (this.data.studentGrades || []).filter(g => g.studentId === studentId);
  }

  getGradesForClass(classId) {
    return (this.data.studentGrades || []).filter(g => g.classId === classId);
  }

  // ==================== ENROLLMENT METHODS ====================
  
  enrollStudentInCourse(studentId, courseId) {
    const course = this.getCourseById(courseId);
    if (course) {
      if (!course.enrolledStudents) course.enrolledStudents = [];
      if (!course.enrolledStudents.includes(studentId)) {
        course.enrolledStudents.push(studentId);
        course.students = course.enrolledStudents.length;
        this.saveData();
        return true;
      }
    }
    return false;
  }

  unenrollStudentFromCourse(studentId, courseId) {
    const course = this.getCourseById(courseId);
    if (course && course.enrolledStudents) {
      course.enrolledStudents = course.enrolledStudents.filter(id => id !== studentId);
      course.students = course.enrolledStudents.length;
      this.saveData();
    }
  }

  getEnrolledCourses(studentId) {
    return (this.data.courses || []).filter(c => 
      c.enrolledStudents && c.enrolledStudents.includes(studentId)
    );
  }

  // ==================== ANNOUNCEMENT METHODS ====================
  
  createAnnouncement(announcementData) {
    const newAnnouncement = {
      id: `announcement_${Date.now()}`,
      ...announcementData,
      createdAt: new Date().toISOString(),
      views: 0
    };
    if (!this.data.announcements) this.data.announcements = [];
    this.data.announcements.push(newAnnouncement);
    this.saveData();
    return newAnnouncement;
  }

  getAllAnnouncements() {
    return this.data.announcements || [];
  }

  getAnnouncementsForCourse(courseId) {
    return (this.data.announcements || []).filter(a => a.courseId === courseId);
  }

  deleteAnnouncement(id) {
    this.data.announcements = (this.data.announcements || []).filter(a => a.id !== id);
    this.saveData();
  }

  // ==================== CALENDAR METHODS ====================
  
  addCalendarEvent(eventData) {
    const newEvent = {
      id: `event_${Date.now()}`,
      ...eventData,
      createdAt: new Date().toISOString()
    };
    if (!this.data.calendarEvents) this.data.calendarEvents = [];
    this.data.calendarEvents.push(newEvent);
    this.saveData();
    return newEvent;
  }

  getCalendarEvents(startDate, endDate) {
    return (this.data.calendarEvents || []).filter(e => {
      const eventDate = new Date(e.date);
      return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
    });
  }

  getAllCalendarEvents() {
    return this.data.calendarEvents || [];
  }

  deleteCalendarEvent(id) {
    this.data.calendarEvents = (this.data.calendarEvents || []).filter(e => e.id !== id);
    this.saveData();
  }

  // ==================== PROGRESS REPORT METHODS ====================
  
  saveProgressReport(studentId, reportData) {
    if (!this.data.progressReports) this.data.progressReports = {};
    if (!this.data.progressReports[studentId]) this.data.progressReports[studentId] = [];
    
    const report = {
      id: `report_${Date.now()}`,
      ...reportData,
      generatedAt: new Date().toISOString()
    };
    
    this.data.progressReports[studentId].push(report);
    this.saveData();
    return report;
  }

  getProgressReports(studentId) {
    return this.data.progressReports?.[studentId] || [];
  }
}

window.LocalDatabase = LocalDatabase;
