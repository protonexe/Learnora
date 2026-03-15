# Learnora Mobile App

A mobile education platform with NFC login and screen pinning features for students.

## Features

- **NFC Authentication**: Students can log in by tapping their NFC badge/card
- **Screen Pinning**: Pins the app to the foreground when students log in
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

## Screen Pinning

### Android

When students log in, the app requests Android's built-in screen pinning feature. This keeps the app in the foreground and prevents accidental navigation away.

**How to unpin:**
1. Press the Recent Apps button
2. Long-press the Learnora app icon
3. Select "Unpin"

The screen will stay awake while pinned.

### iOS

On iOS, the app keeps the screen awake. For full kiosk functionality, MDM (Mobile Device Management) with Single App Mode is required.

## Project Structure

```
learnora/
├── android/                    # Android native project
│   └── app/src/main/
│       ├── java/com/learnora/app/
│       │   └── plugins/
│       │       ├── ScreenPinPlugin.java
│       │       └── LearnoraNFCPlugin.java
│       └── res/xml/
│           ├── nfc_tech_list.xml
│           └── network_security_config.xml
├── ios/                        # iOS native project
│   └── Plugin/
│       ├── ScreenPinPlugin.swift
│       └── LearnoraNFCPlugin.swift
├── js/                         # JavaScript/React code
│   ├── utils/
│   │   ├── nfcUtils.js         # Web NFC utilities
│   │   └── nativePlugins.js    # Capacitor plugin wrappers
│   └── components/
│       └── views/
│           ├── Login.js        # NFC-enabled login
│           └── Settings.js     # Screen pin controls
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

### Screen Pinning
- Screen pinning is a user-initiated feature - users can always unpin
- For stricter lockdown, consider MDM solutions

### Data Protection
- All authentication data should be validated server-side
- Use HTTPS for all network communications
- Store sensitive data in secure storage (Keychain/Keystore)

## Troubleshooting

### NFC Not Working on Android
- Ensure NFC is enabled in device settings
- Check that the app has NFC permission
- Verify the device supports NFC

### Screen Pinning Not Activating
- Verify the app is running with student role
- Check that Android screen pinning is enabled in settings

### Build Errors
- Run `npm run cap:sync` before building
- Clean build directories in Android Studio/Xcode
- Ensure all dependencies are installed

## License

MIT License - See LICENSE file for details.
