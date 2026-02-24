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
        
        disable: async () => {
            if (!NativePlugins.isNative()) {
                console.log('[KioskMode] Not native - disabling simulated kiosk');
                return { success: true, message: 'Simulated kiosk disabled (web)' };
            }
            
            try {
                const { KioskMode } = window.Capacitor.Plugins;
                return await KioskMode.disableKioskMode();
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
            
            if (record.type === 'text' && record.content) {
                const text = record.content.trim().toLowerCase();
                
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
