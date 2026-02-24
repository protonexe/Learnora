// NFC Utilities for LEARNORA
// Uses Web NFC API for reading NFC tags

const NFCUtils = {
  // Check if Web NFC is supported
  isSupported: () => {
    return 'NDEFReader' in window;
  },

  // Check if NFC permission is granted
  checkPermission: async () => {
    if (!NFCUtils.isSupported()) {
      return { granted: false, error: 'NFC not supported on this device' };
    }

    try {
      // Try to create an NDEFReader instance to check permissions
      const ndef = new NDEFReader();
      return { granted: true, error: null };
    } catch (error) {
      return { granted: false, error: error.message };
    }
  },

  // Request NFC permission
  requestPermission: async () => {
    if (!NFCUtils.isSupported()) {
      return { success: false, error: 'NFC not supported on this device' };
    }

    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      ndef.onreading = null; // Remove listener immediately
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Start NFC scanning
  startScan: async (onRead, onError) => {
    if (!NFCUtils.isSupported()) {
      onError('NFC not supported on this device');
      return null;
    }

    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      
      ndef.onreading = (event) => {
        const message = event.message;
        const records = [];
        
        for (const record of message.records) {
          const data = NFCUtils.parseRecord(record);
          records.push(data);
        }
        
        onRead({
          serialNumber: event.serialNumber,
          records: records,
          timestamp: new Date().toISOString()
        });
      };

      ndef.onreadingerror = () => {
        onError('Error reading NFC tag. Please try again.');
      };

      return ndef;
    } catch (error) {
      onError(error.message);
      return null;
    }
  },

  // Stop NFC scanning
  stopScan: (ndef) => {
    if (ndef) {
      ndef.onreading = null;
      ndef.onreadingerror = null;
    }
  },

  // Parse NDEF record
  parseRecord: (record) => {
    const { recordType, mediaType, id, data } = record;
    
    if (recordType === 'text') {
      const textDecoder = new TextDecoder(record.encoding || 'utf-8');
      const text = textDecoder.decode(data);
      return {
        type: 'text',
        content: text,
        id: id || null
      };
    }
    
    if (recordType === 'url') {
      const textDecoder = new TextDecoder();
      const url = textDecoder.decode(data);
      return {
        type: 'url',
        content: url,
        id: id || null
      };
    }
    
    if (recordType === 'mime' && mediaType === 'application/json') {
      const textDecoder = new TextDecoder();
      const json = textDecoder.decode(data);
      try {
        return {
          type: 'json',
          content: JSON.parse(json),
          id: id || null
        };
      } catch (e) {
        return {
          type: 'json',
          content: json,
          id: id || null,
          error: 'Invalid JSON'
        };
      }
    }

    // Unknown record type
    return {
      type: 'unknown',
      recordType: recordType,
      mediaType: mediaType,
      id: id || null
    };
  },

  // Extract authentication data from NFC tag
  extractAuthData: (nfcData) => {
    // Look for JSON or text records that might contain auth info
    for (const record of nfcData.records) {
      if (record.type === 'json' && record.content) {
        // Check if it's an auth payload
        if (record.content.userId || record.content.token || record.content.role) {
          return {
            userId: record.content.userId || record.content.id,
            token: record.content.token || record.content.authToken,
            role: record.content.role,
            name: record.content.name,
            timestamp: record.content.timestamp || nfcData.timestamp
          };
        }
      }
      
      if (record.type === 'text') {
        // Try to parse as JSON or simple auth string
        const text = record.content.trim().toLowerCase();
        
        // Check for plaintext role only: "student", "teacher", or "parent"
        const validRoles = ['student', 'teacher', 'parent'];
        if (validRoles.includes(text)) {
          return {
            userId: text + '-nfc-user',
            role: text,
            token: 'nfc-token-' + Date.now(),
            name: text.charAt(0).toUpperCase() + text.slice(1) + ' User',
            timestamp: nfcData.timestamp
          };
        }
        
        // Check for JSON format
        if (text.startsWith('{') && text.endsWith('}')) {
          try {
            const json = JSON.parse(text);
            return {
              userId: json.userId || json.id,
              token: json.token || json.authToken,
              role: json.role,
              name: json.name,
              timestamp: json.timestamp || nfcData.timestamp
            };
          } catch (e) {
            // Not valid JSON, continue
          }
        }
        
        // Check for URL format with auth parameters
        if (text.startsWith('learnora://')) {
          const params = new URLSearchParams(text.replace('learnora://', ''));
          return {
            userId: params.get('userId'),
            token: params.get('token'),
            role: params.get('role'),
            name: params.get('name'),
            timestamp: nfcData.timestamp
          };
        }
        
        // Simple format: "userId|role|token"
        const parts = text.split('|');
        if (parts.length >= 2) {
          return {
            userId: parts[0],
            role: parts[1],
            token: parts[2] || null,
            name: parts[3] || null,
            timestamp: nfcData.timestamp
          };
        }
      }
      
      if (record.type === 'url') {
        // Check for URL with auth parameters
        const url = record.content;
        if (url.includes('learnora.app/auth')) {
          try {
            const urlObj = new URL(url);
            return {
              userId: urlObj.searchParams.get('userId'),
              token: urlObj.searchParams.get('token'),
              role: urlObj.searchParams.get('role'),
              name: urlObj.searchParams.get('name'),
              timestamp: nfcData.timestamp
            };
          } catch (e) {
            // Invalid URL
          }
        }
      }
    }
    
    return null;
  },

  // Validate NFC authentication data
  validateAuthData: (authData) => {
    if (!authData) {
      return { valid: false, error: 'No authentication data found on tag' };
    }
    
    if (!authData.userId) {
      return { valid: false, error: 'No user ID found on tag' };
    }
    
    // Check if timestamp is too old (e.g., older than 1 hour for security)
    if (authData.timestamp) {
      const tagTime = new Date(authData.timestamp).getTime();
      const now = new Date().getTime();
      const oneHour = 60 * 60 * 1000;
      
      if (now - tagTime > oneHour) {
        return { valid: false, error: 'Tag has expired. Please get a new tag.' };
      }
    }
    
    return { valid: true, error: null };
  },

  // Demo mode: Simulate NFC scan for testing
  // Supports plaintext roles: 'student', 'teacher', 'parent'
  simulateScan: (onRead, demoRole) => {
    setTimeout(() => {
      const role = demoRole || 'student';
      onRead({
        serialNumber: 'demo-nfc-' + role,
        records: [
          {
            type: 'text',
            content: role,  // Plaintext role
            id: null
          }
        ],
        timestamp: new Date().toISOString()
      });
    }, 2000);
  },

  // Write to NFC tag (for admin/teacher use)
  writeTag: async (data, onSuccess, onError) => {
    if (!NFCUtils.isSupported()) {
      onError('NFC not supported on this device');
      return;
    }

    try {
      const ndef = new NDEFReader();
      
      // Convert data to NDEF message
      let records = [];
      
      if (typeof data === 'string') {
        const encoder = new TextEncoder();
        records.push({
          recordType: 'text',
          data: encoder.encode(data)
        });
      } else if (typeof data === 'object') {
        const json = JSON.stringify(data);
        const encoder = new TextEncoder();
        records.push({
          recordType: 'mime',
          mediaType: 'application/json',
          data: encoder.encode(json)
        });
      }

      await ndef.write({ records });
      onSuccess('Tag written successfully!');
    } catch (error) {
      onError(error.message);
    }
  }
};

window.NFCUtils = NFCUtils;