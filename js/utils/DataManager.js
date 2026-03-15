const DataManager = {
  exportData: () => {
    const data = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      data: {}
    };
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('learnora_') || key === 'theme' || key.startsWith('user_')) {
        try {
          data.data[key] = JSON.parse(localStorage.getItem(key));
        } catch (e) {
          data.data[key] = localStorage.getItem(key);
        }
      }
    });
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learnora-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    return data;
  },

  importData: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          
          if (!data.data) {
            reject(new Error('Invalid backup file'));
            return;
          }
          
          Object.keys(data.data).forEach(key => {
            const value = data.data[key];
            if (typeof value === 'string') {
              localStorage.setItem(key, value);
            } else {
              localStorage.setItem(key, JSON.stringify(value));
            }
          });
          
          resolve({ success: true, message: 'Data imported successfully!' });
        } catch (error) {
          reject(new Error('Failed to parse backup file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  },

  clearAllData: () => {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('learnora_') || key.startsWith('user_') || key === 'theme')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    return keysToRemove.length;
  },

  getStorageInfo: () => {
    let used = 0;
    const items = {};
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('learnora_') || key.startsWith('user_') || key === 'theme') {
        const value = localStorage.getItem(key);
        used += value.length + key.length;
        items[key] = {
          size: (value.length / 1024).toFixed(2) + ' KB',
          type: typeof value
        };
      }
    });
    
    return {
      totalUsed: (used / 1024).toFixed(2) + ' KB',
      itemCount: Object.keys(items).length,
      items
    };
  }
};

window.DataManager = DataManager;
