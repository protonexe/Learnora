# Learnora Mobile App

A mobile education platform with NFC login and device lockdown features for students.

## Features

- **NFC Authentication**: Students can log in by tapping their NFC badge/card
- **Device Lockdown (Kiosk Mode)**: Locks the device to the Learnora app when students log in
- **Multi-role Support**: Students, Teachers, and Parents
- **Offline Support**: Works without internet connection
- **PWA Capable**: Can be installed as a Progressive Web App

## Prerequisites

- Node.js 18+
- npm or yarn
- Android Studio (for Android builds)
- Xcode 15+ (for iOS builds, macOS only)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Web App

```bash
npm run build
```

### 3. Add Platforms

```bash
# Initialize Capacitor (first time only)
npm run cap:init

# Add Android platform
npm run cap:add:android

# Add iOS platform (macOS only)
npm run cap:add:ios
```

### 4. Sync Web Files

```bash
npm run cap:sync
```

### 5. Run the App

```bash
# Android
npm run android

# iOS (macOS only)
npm run ios
```

## NFC Setup

### NFC Card Format

The app supports multiple NFC card formats:

#### Plain Text (Simple)
Write just the role to the card:
```
student
```

#### JSON Format
```json
{
  "userId": "emma.wilson",
  "role": "student",
  "name": "Emma Wilson",
  "token": "optional-auth-token"
}
```

#### Pipe-Delimited Format
```
emma.wilson|student|optional-token|Emma Wilson
```

### Writing NFC Cards

You can use any NFC writer app to program cards. For testing, the app includes a demo mode that simulates NFC scans.

## Device Lockdown (Kiosk Mode)

### Android

#### Option 1: Device Owner Mode (Recommended for schools)

1. Enable USB debugging on the device
2. Connect the device to a computer
3. Run the following ADB command:
```bash
adb shell dpm set-device-owner com.learnora.app/.plugins.KioskDeviceAdminReceiver
```

4. Once set as device owner, the app can:
   - Lock the device to itself (kiosk mode)
   - Disable the status bar and notifications
   - Prevent app switching
   - Disable the home button

#### Option 2: Lock Task Mode (Without Device Owner)

The app can still enter lock task mode, but users can exit by pressing Home and Recent buttons simultaneously.

### iOS

iOS uses **Single App Mode (SAM)** which requires MDM configuration:

1. Set up an MDM solution (e.g., Apple Business Manager, Jamf, Mosyle)
2. Create a configuration profile with Single App Mode enabled
3. Deploy the profile to devices
4. The app will automatically enter kiosk mode when launched

#### MDM Configuration Example

```xml
<key>com.apple.app.lock</key>
<dict>
    <key>apps</key>
    <array>
        <dict>
            <key>bundleIdentifier</key>
            <string>com.learnora.app</string>
            <key>options</key>
            <dict>
                <key>disableTouch</key>
                <false/>
                <key>disableDeviceRotation</key>
                <true/>
                <key>disableVolumeButtons</key>
                <true/>
                <key>disableRingerSwitch</key>
                <true/>
                <key>disableSleepWakeButton</key>
                <true/>
                <key>disableAutoLock</key>
                <true/>
            </dict>
        </dict>
    </array>
</dict>
```

## Project Structure

```
learnora/
├── android/                    # Android native project
│   └── app/src/main/
│       ├── java/com/learnora/app/
│       │   └── plugins/
│       │       ├── KioskModePlugin.java
│       │       ├── KioskDeviceAdminReceiver.java
│       │       └── LearnoraNFCPlugin.java
│       └── res/xml/
│           ├── device_admin.xml
│           ├── nfc_tech_list.xml
│           └── network_security_config.xml
├── ios/                        # iOS native project
│   └── Plugin/
│       ├── KioskModePlugin.swift
│       └── LearnoraNFCPlugin.swift
├── js/                         # JavaScript/React code
│   ├── utils/
│   │   ├── nfcUtils.js         # Web NFC utilities
│   │   └── nativePlugins.js    # Capacitor plugin wrappers
│   └── components/
│       └── views/
│           ├── Login.js        # NFC-enabled login
│           └── Settings.js     # Kiosk mode controls
├── capacitor.config.ts         # Capacitor configuration
└── package.json
```

## Building for Production

### Android

1. Open the Android project:
```bash
npm run cap:open:android
```

2. In Android Studio:
   - Build > Generate Signed Bundle / APK
   - Create or use an existing keystore
   - Build release APK or App Bundle

### iOS

1. Open the Xcode project:
```bash
npm run cap:open:ios
```

2. In Xcode:
   - Select a development team
   - Configure signing & capabilities
   - Archive and distribute via App Store or TestFlight

## Security Considerations

### NFC Cards
- Use encrypted or write-protected cards for production
- Include timestamps in card data to prevent replay attacks
- Consider using signed tokens for authentication

### Device Lockdown
- Device Owner mode is difficult to remove without factory reset
- Test thoroughly before deploying to production devices
- Have a backup admin method to exit kiosk mode

### Data Protection
- All authentication data should be validated server-side
- Use HTTPS for all network communications
- Store sensitive data in secure storage (Keychain/Keystore)

## Troubleshooting

### NFC Not Working on Android
- Ensure NFC is enabled in device settings
- Check that the app has NFC permission
- Verify the device supports NFC

### Kiosk Mode Not Activating
- Ensure the app is set as Device Owner (Android)
- Check MDM configuration (iOS)
- Verify the app is running with student role

### Build Errors
- Run `npm run cap:sync` before building
- Clean build directories in Android Studio/Xcode
- Ensure all dependencies are installed

## License

MIT License - See LICENSE file for details.
