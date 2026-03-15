const NativePlugins = {
    isNative: () => {
        if (typeof window === 'undefined' || !window.Capacitor) return false;
        const platform = window.Capacitor.getPlatform ? window.Capacitor.getPlatform() : null;
        return platform === 'android' || platform === 'ios';
    },
    
    getPlatform: () => {
        if (!window.Capacitor) return 'web';
        return window.Capacitor.getPlatform ? window.Capacitor.getPlatform() : 'web';
    },
    
    ScreenPin: {
        enable: async () => {
            if (!NativePlugins.isNative()) {
                console.log('[ScreenPin] Not native - simulating screen pin');
                return { success: true, message: 'Simulated screen pin (web)' };
            }
            
            try {
                const { ScreenPin } = window.Capacitor.Plugins;
                return await ScreenPin.enablePin();
            } catch (e) {
                console.error('[ScreenPin] Error:', e);
                return { success: false, message: e.message };
            }
        },
        
        disable: async () => {
            if (!NativePlugins.isNative()) {
                console.log('[ScreenPin] Not native - disabling simulated pin');
                return { success: true, message: 'Simulated pin disabled (web)' };
            }
            
            try {
                const { ScreenPin } = window.Capacitor.Plugins;
                return await ScreenPin.disablePin();
            } catch (e) {
                console.error('[ScreenPin] Error:', e);
                return { success: false, message: e.message };
            }
        },
        
        isActive: async () => {
            if (!NativePlugins.isNative()) {
                return { active: false };
            }
            
            try {
                const { ScreenPin } = window.Capacitor.Plugins;
                return await ScreenPin.isPinActive();
            } catch (e) {
                return { active: false };
            }
        }
    },
    
    KioskMode: {
        enable: async () => {
            return await NativePlugins.ScreenPin.enable();
        },
        
        disable: async (password) => {
            return await NativePlugins.ScreenPin.disable();
        },
        
        isActive: async () => {
            return await NativePlugins.ScreenPin.isActive();
        },
        
        isDeviceOwner: async () => {
            return { isDeviceOwner: false };
        },
        
        verifyPassword: async (password) => {
            return { valid: true };
        },
        
        setExitPassword: async () => {
            return { success: true, message: 'Password update not needed (using screen pin)' };
        },
        
        clearDeviceOwner: async () => {
            return { success: true, message: 'Not device owner (using screen pin)' };
        },
        
        getDeviceOwnerInfo: async () => {
            return { 
                isDeviceOwner: false, 
                isAdminActive: false, 
                isRemovable: false,
                supportedMethods: [],
                message: 'Using screen pinning instead of device owner'
            };
        },
        
        isRemovableDeviceOwner: async () => {
            return { isRemovable: false };
        },
        
        getSetDeviceOwnerAdbCommand: async () => {
            return { command: '', message: 'Not needed - using screen pinning' };
        },
        
        getRemoveDeviceOwnerAdbCommand: async () => {
            return { command: '', message: 'Not needed - using screen pinning' };
        },
        
        generateProvisioningQrData: async () => {
            return { qrData: '{}', instructions: 'Not needed - using screen pinning' };
        },
        
        openDeviceAdminSettings: async () => {
            return { success: false, message: 'Not needed - using screen pinning' };
        },
        
        requestDeviceOwnerActivation: async () => {
            return { success: false, message: 'Using screen pinning instead of device owner', requiresSetup: false };
        },
        
        generateProvisioningQrCode: async () => {
            return { qrCodeImage: '', instructions: 'Not needed - using screen pinning' };
        },
        
        factoryReset: async () => {
            return { success: false, message: 'Factory reset not available with screen pinning' };
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
