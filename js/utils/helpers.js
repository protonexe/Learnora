    // Utility helper functions
const Helpers = {
  formatTime: (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  },

  formatDate: (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  },

  getTimeOfDay: () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  },

  generateId: () => Date.now() + Math.random().toString(36).substr(2, 9),

  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  extractTags: (text) => {
    const matches = text.match(/#(\w+)/g) || [];
    return [...new Set(matches.map(t => t.slice(1).toLowerCase()))];
  },

  getInitials: (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  },

  getColorFromString: (str) => {
    const colors = ['#6366f1', '#8b5cf6', '#14b8a6', '#f59e0b', '#f43f5e', '#10b981'];
    const index = str ? str.charCodeAt(0) % colors.length : 0;
    return colors[index];
  }
};

window.Helpers = Helpers;