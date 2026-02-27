const NativePlugins = {
    isNative: () => {
        return typeof window !== 'undefined' && 
               window.Capacitor && 
               window.Capacitor.isNativePlatform && 
               window.Capacitor.isNativePlatform();
    },
    
    getPlatform: () => {
        if (!window.Capacitor) return 'web';
        return window.Capacitor.getPlatform ? window.Capacitor.getPlatform() : 'web';
    },
    
    KioskMode: {
        enable: async () => {
            if (!NativePlugins.isNative()) {
                console.log('[KioskMode] Not native - simulating kiosk mode');
                return { success: true, message: 'Simulated kiosk mode (web)' };
            }
            
            try {
                const { KioskMode } = window.Capacitor.Plugins;
                return await KioskMode.enableKioskMode();
            } catch (e) {
                console.error('[KioskMode] Error:', e);
                return { success: false, message: e.message };
            }
        },
        
        disable: async (password) => {
            if (!NativePlugins.isNative()) {
                console.log('[KioskMode] Not native - disabling simulated kiosk');
                return { success: true, message: 'Simulated kiosk disabled (web)' };
            }
            
            if (!password) {
                return { success: false, message: 'Password is required to exit kiosk mode', passwordRequired: true };
            }
            
            try {
                const { KioskMode } = window.Capacitor.Plugins;
                return await KioskMode.disableKioskMode({ password: password });
            } catch (e) {
                console.error('[KioskMode] Error:', e);
                return { success: false, message: e.message };
            }
        },
        
        isActive: async () => {
            if (!NativePlugins.isNative()) {
                return { active: false };
            }
            
            try {
                const { KioskMode } = window.Capacitor.Plugins;
                return await KioskMode.isKioskModeActive();
            } catch (e) {
                return { active: false };
            }
        },
        
        isDeviceOwner: async () => {
            if (!NativePlugins.isNative()) {
                return { isDeviceOwner: false };
            }
            
            try {
                const { KioskMode } = window.Capacitor.Plugins;
                return await KioskMode.isDeviceOwner();
            } catch (e) {
                return { isDeviceOwner: false };
            }
        },
        
        verifyPassword: async (password) => {
            if (!NativePlugins.isNative()) {
                return { valid: false, message: 'Not available in web mode' };
            }
            
            try {
                const { KioskMode } = window.Capacitor.Plugins;
                return await KioskMode.verifyExitPassword({ password: password });
            } catch (e) {
                console.error('[KioskMode] Error verifying password:', e);
                return { valid: false };
            }
        },
        
        setExitPassword: async (currentPassword, newPassword) => {
            if (!NativePlugins.isNative()) {
                return { success: true, message: 'Password updated (web simulation)' };
            }
            
            try {
                const { KioskMode } = window.Capacitor.Plugins;
                return await KioskMode.setExitPassword({ 
                    currentPassword: currentPassword, 
                    newPassword: newPassword 
                });
            } catch (e) {
                console.error('[KioskMode] Error setting password:', e);
                return { success: false, message: e.message };
            }
        },
        
        checkKioskSetupStatus: async () => {
            if (!NativePlugins.isNative()) {
                return { isDeviceOwner: false, setupRequired: true, message: 'Web mode' };
            }
            
            try {
                const { KioskMode } = window.Capacitor.Plugins;
                return await KioskMode.checkKioskSetupStatus();
            } catch (e) {
                console.error('[KioskMode] Error checking setup status:', e);
                return { isDeviceOwner: false, setupRequired: true, error: e.message };
            }
        },
        
        getProvisioningQRData: async () => {
            if (!NativePlugins.isNative()) {
                return { qrData: null, message: 'Requires native app' };
            }
            
            try {
                const { KioskMode } = window.Capacitor.Plugins;
                return await KioskMode.getProvisioningQRData();
            } catch (e) {
                console.error('[KioskMode] Error getting provisioning data:', e);
                return { error: e.message };
            }
        },
        
        requestDeviceOwnerSetup: async () => {
            if (!NativePlugins.isNative()) {
                return { success: false, message: 'Requires native app' };
            }
            
            try {
                const { KioskMode } = window.Capacitor.Plugins;
                return await KioskMode.requestDeviceOwnerSetup();
            } catch (e) {
                console.error('[KioskMode] Error requesting setup:', e);
                return { success: false, message: e.message };
            }
        }
    },
    
    NFC: {
        isAvailable: async () => {
            if (!NativePlugins.isNative()) {
                return { available: false, enabled: false };
            }
            
            try {
                const { LearnoraNFC } = window.Capacitor.Plugins;
                return await LearnoraNFC.isAvailable();
            } catch (e) {
                console.error('[NFC] Error checking availability:', e);
                return { available: false, enabled: false };
            }
        },
        
        startScan: async () => {
            if (!NativePlugins.isNative()) {
                console.log('[NFC] Not native - using Web NFC or simulation');
                return { success: false, message: 'Use Web NFC or simulation' };
            }
            
            try {
                const { LearnoraNFC } = window.Capacitor.Plugins;
                return await LearnoraNFC.startScan();
            } catch (e) {
                console.error('[NFC] Error starting scan:', e);
                return { success: false, message: e.message };
            }
        },
        
        stopScan: async () => {
            if (!NativePlugins.isNative()) {
                return { success: true };
            }
            
            try {
                const { LearnoraNFC } = window.Capacitor.Plugins;
                return await LearnoraNFC.stopScan();
            } catch (e) {
                return { success: false, message: e.message };
            }
        },
        
        writeTag: async (text) => {
            if (!NativePlugins.isNative()) {
                return { success: false, message: 'Tag writing requires native app' };
            }
            
            try {
                const { LearnoraNFC } = window.Capacitor.Plugins;
                return await LearnoraNFC.writeTag({ text: text });
            } catch (e) {
                console.error('[NFC] Error writing tag:', e);
                return { success: false, message: e.message };
            }
        },
        
        addListener: (eventName, callback) => {
            if (!NativePlugins.isNative()) {
                return null;
            }
            
            try {
                const { LearnoraNFC } = window.Capacitor.Plugins;
                return LearnoraNFC.addListener(eventName, callback);
            } catch (e) {
                console.error('[NFC] Error adding listener:', e);
                return null;
            }
        },
        
        removeAllListeners: async () => {
            if (!NativePlugins.isNative()) {
                return;
            }
            
            try {
                const { LearnoraNFC } = window.Capacitor.Plugins;
                await LearnoraNFC.removeAllListeners();
            } catch (e) {
                console.error('[NFC] Error removing listeners:', e);
            }
        }
    },
    
    extractAuthData: (nfcData) => {
        if (!nfcData || !nfcData.records) return null;
        
        for (const record of nfcData.records) {
            // JSON records (from MIME or parsed text)
            if (record.type === 'json' && record.parsedContent) {
                const content = record.parsedContent;
                if (content.userId || content.token || content.role) {
                    return {
                        userId: content.userId || content.id,
                        token: content.token || content.authToken,
                        role: content.role,
                        name: content.name,
                        timestamp: content.timestamp || nfcData.timestamp
                    };
                }
            }
            
            // Text records
            if (record.type === 'text' && record.content) {
                const text = record.content.trim();
                const textLower = text.toLowerCase();
                
                // Simple role string
                const validRoles = ['student', 'teacher', 'parent'];
                if (validRoles.includes(textLower)) {
                    return {
                        userId: textLower + '-nfc-user',
                        role: textLower,
                        token: 'nfc-token-' + Date.now(),
                        name: textLower.charAt(0).toUpperCase() + textLower.slice(1) + ' User',
                        timestamp: nfcData.timestamp
                    };
                }
                
                // JSON in text record
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
                        // Not valid JSON
                    }
                }
                
                // Pipe-delimited: userId|role|token|name
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
            
            // MIME records (e.g., application/json)
            if (record.type === 'mime' && record.content) {
                try {
                    const json = JSON.parse(record.content);
                    if (json.userId || json.token || json.role) {
                        return {
                            userId: json.userId || json.id,
                            token: json.token || json.authToken,
                            role: json.role,
                            name: json.name,
                            timestamp: json.timestamp || nfcData.timestamp
                        };
                    }
                } catch (e) {
                    // Not JSON mime
                }
            }
            
            // URL records
            if (record.type === 'url' && record.content) {
                try {
                    const url = new URL(record.content);
                    if (url.hostname.includes('learnora')) {
                        return {
                            userId: url.searchParams.get('userId'),
                            token: url.searchParams.get('token'),
                            role: url.searchParams.get('role'),
                            name: url.searchParams.get('name'),
                            timestamp: nfcData.timestamp
                        };
                    }
                } catch (e) {
                    // Invalid URL
                }
            }

            // Tag ID only (non-NDEF tags) - use serial number as user ID
            if (record.type === 'tag_id' && record.content && nfcData.serialNumber) {
                return {
                    userId: 'nfc-' + nfcData.serialNumber,
                    role: 'student',
                    token: 'nfc-tag-' + Date.now(),
                    name: 'NFC User',
                    timestamp: nfcData.timestamp
                };
            }
        }
        
        return null;
    },
    
    validateAuthData: (authData) => {
        if (!authData) {
            return { valid: false, error: 'No authentication data found on tag' };
        }
        
        if (!authData.userId) {
            return { valid: false, error: 'No user ID found on tag' };
        }
        
        if (authData.timestamp) {
            const tagTime = new Date(authData.timestamp).getTime();
            const now = Date.now();
            const oneHour = 60 * 60 * 1000;
            
            if (now - tagTime > oneHour) {
                return { valid: false, error: 'Tag has expired. Please get a new tag.' };
            }
        }
        
        return { valid: true, error: null };
    }
};

window.NativePlugins = NativePlugins;
