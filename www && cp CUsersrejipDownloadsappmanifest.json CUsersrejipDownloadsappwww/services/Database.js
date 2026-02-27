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
      classes: [],
      studentGrades: [],
      studentProgress: {}
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
      // Populate with demo users
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
      this.data.courses = sampleData.courses;
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

    this.saveData();
    this.initialized = true;
    console.log('[Learnora] LocalDatabase initialized');
  }

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

  getClassesForTeacher(teacherId) {
    if (!Array.isArray(this.data.classes)) return [];
    return this.data.classes.filter(c => c.teacherId === teacherId);
  }

  getStudentsInClass(classId) {
    if (!Array.isArray(this.data.studentGrades)) return [];
    const gradeRecords = this.data.studentGrades.filter(g => g.classId === classId);
    return gradeRecords.map(g => this.getUserById(g.studentId)).filter(Boolean);
  }

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

  getMessagesForUser(userId) {
    if (!this.data.messages) this.data.messages = [];
    return this.data.messages.filter(m => m.to === userId || m.from === userId);
  }

  sendMessage(fromId, toId, content) {
    if (!this.data.messages) this.data.messages = [];
    const message = {
      id: `msg_${Date.now()}`,
      from: fromId,
      to: toId,
      content,
      timestamp: { seconds: Math.floor(Date.now() / 1000) },
      read: false
    };
    this.data.messages.push(message);
    this.saveData();
    return message;
  }

  getStudentGrades(studentId) {
    if (!this.data.studentGrades) {
      this.data.studentGrades = [
        { studentId, course: 'Mathematics', assignments: [{ name: 'Quiz 1', score: 92, maxScore: 100, date: '2024-03-15' }, { name: 'Quiz 2', score: 88, maxScore: 100, date: '2024-03-22' }, { name: 'Midterm', score: 95, maxScore: 100, date: '2024-03-28' }], overall: 91.7 },
        { studentId, course: 'English', assignments: [{ name: 'Essay 1', score: 85, maxScore: 100, date: '2024-03-10' }, { name: 'Essay 2', score: 90, maxScore: 100, date: '2024-03-24' }, { name: 'Presentation', score: 88, maxScore: 100, date: '2024-03-30' }], overall: 87.7 },
        { studentId, course: 'Science', assignments: [{ name: 'Lab 1', score: 95, maxScore: 100, date: '2024-03-12' }, { name: 'Lab 2', score: 92, maxScore: 100, date: '2024-03-26' }, { name: 'Lab Exam', score: 89, maxScore: 100, date: '2024-03-29' }], overall: 92 },
        { studentId, course: 'History', assignments: [{ name: 'Chapter Test', score: 78, maxScore: 100, date: '2024-03-14' }, { name: 'Project', score: 95, maxScore: 100, date: '2024-03-25' }, { name: 'Quiz', score: 88, maxScore: 100, date: '2024-03-27' }], overall: 87 },
        { studentId, course: 'Physics', assignments: [{ name: 'Problem Set 1', score: 94, maxScore: 100, date: '2024-03-11' }, { name: 'Problem Set 2', score: 91, maxScore: 100, date: '2024-03-18' }, { name: 'Lab Report', score: 88, maxScore: 100, date: '2024-03-28' }], overall: 91 }
      ];
    }
    return this.data.studentGrades.filter(g => g.studentId === studentId);
  }

  getSchedule(studentId) {
    if (!this.data.schedules) {
      this.data.schedules = [
        { day: 'Monday', periods: [{ time: '8:00 AM', subject: 'Mathematics', room: 'Room 101', teacher: 'Mr. Johnson' }, { time: '9:00 AM', subject: 'English', room: 'Room 203', teacher: 'Ms. Smith' }, { time: '10:00 AM', subject: 'Physics', room: 'Lab 3', teacher: 'Dr. Lee' }, { time: '11:00 AM', subject: 'History', room: 'Room 105', teacher: 'Mr. Brown' }, { time: '12:00 PM', subject: 'Lunch', room: 'Cafeteria' }, { time: '1:00 PM', subject: 'Study Hall', room: 'Library' }, { time: '2:00 PM', subject: 'PE', room: 'Gym' }] },
        { day: 'Tuesday', periods: [{ time: '8:00 AM', subject: 'History', room: 'Room 105', teacher: 'Mr. Brown' }, { time: '9:00 AM', subject: 'Mathematics', room: 'Room 101', teacher: 'Mr. Johnson' }, { time: '10:00 AM', subject: 'English', room: 'Room 203', teacher: 'Ms. Smith' }, { time: '11:00 AM', subject: 'Science', room: 'Lab 3', teacher: 'Dr. Lee' }, { time: '12:00 PM', subject: 'Lunch', room: 'Cafeteria' }, { time: '1:00 PM', subject: 'Art', room: 'Art Room' }, { time: '2:00 PM', subject: 'Music', room: 'Music Room' }] },
        { day: 'Wednesday', periods: [{ time: '8:00 AM', subject: 'Physics', room: 'Lab 3', teacher: 'Dr. Lee' }, { time: '9:00 AM', subject: 'History', room: 'Room 105', teacher: 'Mr. Brown' }, { time: '10:00 AM', subject: 'Mathematics', room: 'Room 101', teacher: 'Mr. Johnson' }, { time: '11:00 AM', subject: 'English', room: 'Room 203', teacher: 'Ms. Smith' }, { time: '12:00 PM', subject: 'Lunch', room: 'Cafeteria' }, { time: '1:00 PM', subject: 'Science', room: 'Lab 3', teacher: 'Dr. Lee' }, { time: '2:00 PM', subject: 'Computer', room: 'Lab 1' }] },
        { day: 'Thursday', periods: [{ time: '8:00 AM', subject: 'English', room: 'Room 203', teacher: 'Ms. Smith' }, { time: '9:00 AM', subject: 'Physics', room: 'Lab 3', teacher: 'Dr. Lee' }, { time: '10:00 AM', subject: 'History', room: 'Room 105', teacher: 'Mr. Brown' }, { time: '11:00 AM', subject: 'Mathematics', room: 'Room 101', teacher: 'Mr. Johnson' }, { time: '12:00 PM', subject: 'Lunch', room: 'Cafeteria' }, { time: '1:00 PM', subject: 'Study Hall', room: 'Library' }, { time: '2:00 PM', subject: 'PE', room: 'Gym' }] },
        { day: 'Friday', periods: [{ time: '8:00 AM', subject: 'Science', room: 'Lab 3', teacher: 'Dr. Lee' }, { time: '9:00 AM', subject: 'English', room: 'Room 203', teacher: 'Ms. Smith' }, { time: '10:00 AM', subject: 'Physics', room: 'Lab 3', teacher: 'Dr. Lee' }, { time: '11:00 AM', subject: 'Mathematics', room: 'Room 101', teacher: 'Mr. Johnson' }, { time: '12:00 PM', subject: 'Lunch', room: 'Cafeteria' }, { time: '1:00 PM', subject: 'History', room: 'Room 105', teacher: 'Mr. Brown' }, { time: '2:00 PM', subject: 'Assembly', room: 'Auditorium' }] }
      ];
    }
    return this.data.schedules;
  }

  getNotifications(userId) {
    if (!this.data.notifications) {
      this.data.notifications = [
        { id: 1, userId, type: 'grade', title: 'New Grade Posted', message: 'Emma scored 95% on Math Midterm', timestamp: { seconds: Math.floor(Date.now() / 1000) - 3600 }, read: false },
        { id: 2, userId, type: 'assignment', title: 'Assignment Due Soon', message: 'Science Lab Report due in 2 days', timestamp: { seconds: Math.floor(Date.now() / 1000) - 7200 }, read: false },
        { id: 3, userId, type: 'attendance', title: 'Attendance Alert', message: 'Emma was marked absent for History class', timestamp: { seconds: Math.floor(Date.now() / 1000) - 86400 }, read: true },
        { id: 4, userId, type: 'message', title: 'New Message', message: 'Mr. Johnson sent a message about Emma\'s progress', timestamp: { seconds: Math.floor(Date.now() / 1000) - 172800 }, read: true },
        { id: 5, userId, type: 'event', title: 'Parent-Teacher Conference', message: 'Scheduled for next Friday at 2:00 PM', timestamp: { seconds: Math.floor(Date.now() / 1000) - 259200 }, read: false }
      ];
    }
    return this.data.notifications.filter(n => n.userId === userId);
  }

  getParentalControls(parentId) {
    if (!this.data.parentalControls) this.data.parentalControls = {};
    return this.data.parentalControls[parentId] || {
      screenTimeLimit: 120,
      bedtimeEnabled: true,
      bedtimeStart: '20:00',
      bedtimeEnd: '07:00',
      contentFilters: ['social-media', 'gaming'],
      appRestrictions: {},
      weeklyReport: true
    };
  }

  updateParentalControls(parentId, controls) {
    if (!this.data.parentalControls) this.data.parentalControls = {};
    this.data.parentalControls[parentId] = controls;
    this.saveData();
  }

  getAttendance(studentId) {
    if (!this.data.attendance) {
      this.data.attendance = {};
    }
    if (!this.data.attendance[studentId]) {
      this.data.attendance[studentId] = {
        total: 90,
        present: 86,
        absent: 2,
        late: 2,
        excused: 1,
        byMonth: [
          { month: 'September', present: 18, absent: 1, late: 1 },
          { month: 'October', present: 20, absent: 0, late: 2 },
          { month: 'November', present: 17, absent: 2, late: 1 },
          { month: 'December', present: 15, absent: 0, late: 0 },
          { month: 'January', present: 16, absent: 1, late: 1 },
          { month: 'February', present: 14, absent: 1, late: 0 },
          { month: 'March', present: 12, absent: 1, late: 1 }
        ]
      };
    }
    return this.data.attendance[studentId];
  }

  markNotificationRead(notificationId) {
    if (this.data.notifications) {
      const notif = this.data.notifications.find(n => n.id === notificationId);
      if (notif) {
        notif.read = true;
        this.saveData();
      }
    }
  }
}
