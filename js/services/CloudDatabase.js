// Cloud Database Adapter using Firebase Firestore
// Falls back gracefully to LocalDatabase if Firebase is unconfigured

// Guard against double-loading
if (typeof CloudDatabase === 'undefined') {

class CloudDatabase {
  constructor() {
    this._cachedData = null;
    this.isConfigured = window.firebaseConfig && 
                        window.firebaseConfig.apiKey && 
                        window.firebaseConfig.apiKey !== "YOUR_API_KEY";
    
    if (this.isConfigured) {
      try {
        if (!window.firebase || !window.firebase.initializeApp) {
          console.error('Firebase SDK not loaded. Falling back to LocalStorage.');
          this.isConfigured = false;
          this.localDB = new LocalDatabase();
          return;
        }
        if (!window.firebase.apps.length) {
          window.firebase.initializeApp(window.firebaseConfig);
        }
        this.db = window.firebase.firestore();
        console.log('Firebase Firestore initialized successfully.');
      } catch (e) {
        console.error('Firebase init failed, falling back to LocalStorage:', e);
        this.isConfigured = false;
        this.localDB = new LocalDatabase();
      }
    } else {
      console.warn('Firebase not configured. Using LocalStorage DB.');
      this.localDB = new LocalDatabase();
    }
  }

  get data() {
    if (!this.isConfigured) return this.localDB.data;
    // For Firebase mode, return cached data or SampleData as fallback
    // This keeps components that read LearnoraDB.data.analytics etc. working
    if (!this._cachedData) {
      this._cachedData = {
        users: [],
        courses: window.SampleData ? window.SampleData.courses : [],
        assignments: window.SampleData ? window.SampleData.assignments : [],
        stats: window.SampleData ? window.SampleData.stats : [],
        analytics: window.SampleData ? window.SampleData.analytics : {},
        weeklyStudyData: window.SampleData ? window.SampleData.weeklyStudyData : [],
        classes: [],
        studentGrades: [],
        studentProgress: {}
      };
    }
    return this._cachedData;
  }

  async init(sampleData, demoCredentials) {
    if (!this.isConfigured) {
      return this.localDB.init(sampleData, demoCredentials);
    }

    try {
      const configRef = this.db.collection('system').doc('config');
      const doc = await configRef.get();
      if (doc.exists && doc.data().initialized) {
        console.log('Firebase already populated with sample data');
        return;
      }

      console.log('Populating Firebase with initial sample data...');
      const batch = this.db.batch();

      // 1. Users
      let users = [];
      if (demoCredentials) {
        ['students', 'teachers', 'parents'].forEach(role => {
          if (demoCredentials[role]) {
            const formattedRole = role === 'students' ? 'student' : (role === 'teachers' ? 'teacher' : 'parent');
            demoCredentials[role].forEach((u, i) => {
              users.push({
                id: `${formattedRole}_${i}`,
                role: formattedRole,
                ...u
              });
            });
          }
        });
      }
      users.forEach(u => {
        batch.set(this.db.collection('users').doc(u.id), u);
      });

      // 2. Classes
      const classes = [
        { id: 'c1', name: 'Mathematics 101', teacherId: 'teacher_0', icon: '📐', color: '#f43f5e' },
        { id: 'c2', name: 'Physics 102', teacherId: 'teacher_1', icon: '⚛️', color: '#14b8a6' },
        { id: 'c3', name: 'Chemistry 103', teacherId: 'teacher_2', icon: '🧪', color: '#0ea5e9' },
        { id: 'c4', name: 'Biology 104', teacherId: 'teacher_0', icon: '🧬', color: '#10b981' }
      ];
      classes.forEach(c => {
        batch.set(this.db.collection('classes').doc(c.id), c);
      });

      // 3. Grades
      users.filter(u => u.role === 'student').forEach(student => {
        classes.forEach(cls => {
          const gradeId = `grade_${student.id}_${cls.id}`;
          const gradeData = {
            id: gradeId,
            studentId: student.id,
            classId: cls.id,
            score: Math.floor(Math.random() * 30) + 70 // 70 to 100
          };
          batch.set(this.db.collection('studentGrades').doc(gradeId), gradeData);
        });
      });

      // 4. Global Data
      batch.set(this.db.collection('global').doc('courses'), { data: sampleData?.courses || [] });
      batch.set(this.db.collection('global').doc('assignments'), { data: sampleData?.assignments || [] });
      batch.set(this.db.collection('global').doc('stats'), { data: sampleData?.stats || [] });
      batch.set(this.db.collection('global').doc('analytics'), { data: sampleData?.analytics || {} });
      batch.set(this.db.collection('global').doc('weeklyStudyData'), { data: sampleData?.weeklyStudyData || [] });
      
      // Mark as initialized
      batch.set(configRef, { initialized: true });

      await batch.commit();
      console.log('Firebase population complete!');
    } catch (e) {
      console.error('Failed to initialize Firebase data. Make sure Firestore is enabled and rules allow writing:', e);
    }
  }

  // --- Users ---

  // --- Users ---
  async validateUser(role, username, password) {
    if (!this.isConfigured) {
      // LocalStorage fallback
      const allUsers = this.localDB.data.users || [];
      const match = allUsers.find(u => u.role === role && u.username === username && u.password === password);
      return match || null;
    }

    try {
      // Query by username first (single field query, no index needed)
      const snapshot = await this.db.collection('users')
        .where('username', '==', username)
        .get();
      
      if (snapshot.empty) return null;
      
      // Validate role and password in code (avoids composite index requirement)
      for (const doc of snapshot.docs) {
        const user = doc.data();
        if (user.role === role && user.password === password) {
          return user;
        }
      }
      
      return null;
    } catch (e) {
      console.error('Firebase validateUser error:', e);
      throw new Error('Database connection error. Please try again.');
    }
  }

    const snapshot = await this.db.collection('users').where('username', '==', username).get();
    if (snapshot.empty) return null;
    return snapshot.docs[0].data();
  }

  async getUserById(id) {
    if (!this.isConfigured) return this.localDB.getUserById(id);
    const doc = await this.db.collection('users').doc(id).get();
    return doc.exists ? doc.data() : null;
  }

  async getStudents() {
    if (!this.isConfigured) return this.localDB.getStudents();
    const snapshot = await this.db.collection('users').where('role', '==', 'student').get();
    return snapshot.docs.map(d => d.data());
  }

  async getChildrenForParent(parentId) {
    if (!this.isConfigured) return this.localDB.getChildrenForParent(parentId);
    const parent = await this.getUserById(parentId);
    if (!parent || !parent.children || parent.children.length === 0) return [];
    
    // Using simple approach suitable for small sets
    const childrenDocs = [];
    for (const childName of parent.children) {
      const snap = await this.db.collection('users').where('name', '==', childName).where('role', '==', 'student').get();
      if (!snap.empty) {
        childrenDocs.push(snap.docs[0].data());
      }
    }
    return childrenDocs;
  }

  // --- Teacher Portal ---
  async getClassesForTeacher(teacherId) {
    if (!this.isConfigured) return this.localDB.getClassesForTeacher(teacherId);
    
    const snapshot = await this.db.collection('classes').where('teacherId', '==', teacherId).get();
    const classesList = snapshot.docs.map(d => d.data());
    
    // Enrich with grades for averages
    const enrichedClasses = await Promise.all(classesList.map(async cls => {
      const gradesSnap = await this.db.collection('studentGrades').where('classId', '==', cls.id).get();
      const grades = gradesSnap.docs.map(d => d.data());
      const avgScore = grades.length > 0 
        ? Math.round(grades.reduce((acc, curr) => acc + curr.score, 0) / grades.length) 
        : 0;
      return {
        ...cls,
        students: grades.length,
        avgScore,
        assignments: Math.floor(Math.random() * 5) + 3
      };
    }));
    return enrichedClasses;
  }

  async getRecentStudentsForTeacher(teacherId) {
    if (!this.isConfigured) return this.localDB.getRecentStudentsForTeacher(teacherId);
    
    const classesList = await this.getClassesForTeacher(teacherId);
    const classIds = classesList.map(c => c.id);
    if (classIds.length === 0) return [];

    let grades = [];
    // Firestore 'in' query works up to 10 limits, batch query manually for safety
    for (const classId of classIds) {
      const gradesSnap = await this.db.collection('studentGrades').where('classId', '==', classId).get();
      grades = grades.concat(gradesSnap.docs.map(d => d.data()));
    }

    const results = await Promise.all(grades.map(async g => {
      const studentDoc = await this.db.collection('users').doc(g.studentId).get();
      const student = studentDoc.exists ? studentDoc.data() : { name: 'Unknown' };
      const cls = classesList.find(c => c.id === g.classId);
      let status = 'good';
      if (g.score >= 85) status = 'excellent';
      if (g.score < 75) status = 'needs-improvement';

      return {
        id: g.id,
        name: student.name,
        class: cls?.name || 'Unknown',
        score: g.score,
        status: status
      };
    }));

    return results.sort((a, b) => b.score - a.score);
  }

  async getPendingAssignments(teacherId) {
    if (!this.isConfigured) return this.localDB.getPendingAssignments(teacherId);
    const classesList = await this.getClassesForTeacher(teacherId);
    if (classesList.length === 0) return [];
    
    return [
      { id: 1, title: 'Chapter 1 Quiz', class: classesList[0].name, due: 'Today', submissions: `${Math.floor(Math.random()*20)}/${classesList[0].students}` },
      { id: 2, title: 'Midterm Report', class: classesList[0].name, due: 'Tomorrow', submissions: `5/${classesList[0].students}` },
    ];
  }

  // --- Student Progress ---
  async updateStudentProgress(studentId, courseId, progress) {
    if (!this.isConfigured) return this.localDB.updateStudentProgress(studentId, courseId, progress);
    
    await this.db.collection('studentProgress').doc(studentId).set({
      [courseId]: progress
    }, { merge: true });
  }

  async getStudentProgress(studentId) {
    if (!this.isConfigured) return this.localDB.getStudentProgress(studentId);
    
    const doc = await this.db.collection('studentProgress').doc(studentId).get();
    return doc.exists ? doc.data() : {};
  }

  async getCourses() {
    if (!this.isConfigured) return this.localDB.getCourses();
    const doc = await this.db.collection('global').doc('courses').get();
    return doc.exists ? doc.data().data : [];
  }
  
  async getAssignments() {
    if (!this.isConfigured) return this.localDB.getAssignments();
    const doc = await this.db.collection('global').doc('assignments').get();
    return doc.exists ? doc.data().data : [];
  }

  async getStats() {
    if (!this.isConfigured) return this.localDB.getStats();
    const doc = await this.db.collection('global').doc('stats').get();
    return doc.exists ? doc.data().data : [];
  }
  
  async getAnalytics() {
    if (!this.isConfigured) return this.localDB.getAnalytics();
    try {
      const doc = await this.db.collection('global').doc('analytics').get();
      const data = doc.exists ? doc.data().data : null;
      
      if (data && this._cachedData) {
        const weeklyDoc = await this.db.collection('global').doc('weeklyStudyData').get();
        this._cachedData.weeklyStudyData = weeklyDoc.exists ? weeklyDoc.data().data : [];
        this._cachedData.analytics = data;
      }
      return data;
    } catch (e) {
      console.error('getAnalytics error:', e);
      return window.SampleData ? window.SampleData.analytics : {};
    }
  }

  async updateGrade(studentId, classId, newScore) {
    if (!this.isConfigured) return this.localDB.updateGrade(studentId, classId, newScore);
    const gradeId = `grade_${studentId}_${classId}`;
    await this.db.collection('studentGrades').doc(gradeId).update({ score: newScore });
  }
}

// Initialize CloudDatabase as the global LearnoraDB
// Must wait for Babel-transpiled scripts (SampleData, DemoCredentials) to load
(function initCloudDB() {
  // Create the DB instance immediately so window.LearnoraDB exists
  try {
    window.LearnoraDB = new CloudDatabase();
    console.log('[Learnora] CloudDatabase created. isConfigured:', window.LearnoraDB.isConfigured);
  } catch (e) {
    console.error('[Learnora] Fatal DB creation error:', e);
    window.LearnoraDB = new LocalDatabase();
  }

  // Poll for SampleData + DemoCredentials (loaded async via text/babel)
  let attempts = 0;
  const maxAttempts = 100; // 10 seconds max

  function waitForData() {
    attempts++;
    if (window.SampleData && window.DemoCredentials) {
      console.log('[Learnora] SampleData found after', attempts, 'checks. Initializing DB...');
      window.LearnoraDB.init(window.SampleData, window.DemoCredentials).then(() => {
        console.log('[Learnora] Database init complete.');
      }).catch(err => {
        console.error('[Learnora] Database init error:', err);
      });
    } else if (attempts < maxAttempts) {
      setTimeout(waitForData, 100);
    } else {
      console.error('[Learnora] Gave up waiting for SampleData/DemoCredentials after 10s.');
    }
  }

  waitForData();
})();
} // End of CloudDatabase guard
