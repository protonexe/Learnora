# Learnora iOS Configuration

## Capacitor iOS Setup

After running `npx cap add ios`, the iOS project will be created in the `ios/` folder.

## Adding Custom Plugins

The custom NFC and Kiosk plugins need to be manually added to the Xcode project:

### 1. Open the Xcode Project

```bash
npx cap open ios
```

### 2. Add Plugin Files

In Xcode:
1. Right-click on the project navigator
2. Select "Add Files to 'App'"
3. Add the following files from `ios/Plugin/`:
   - `LearnoraNFCPlugin.swift`
   - `KioskModePlugin.swift`

### 3. Register Plugins

In `ios/App/App/capacitor.config.json`, ensure plugins are registered:

```json
{
  "appId": "com.learnora.app",
  "appName": "Learnora",
  "webDir": "www",
  "plugins": {
    "LearnoraNFC": {},
    "KioskMode": {}
  }
}
```

### 4. Update AppDelegate.swift

```swift
import UIKit
import Capacitor

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        // Register custom plugins
        capacitorApplication.registerPlugin(LearnoraNFCPlugin.self)
        capacitorApplication.registerPlugin(KioskModePlugin.self)
        
        return true
    }
    
    // ... rest of AppDelegate
}
```

## NFC Entitlements

1. In Xcode, select the project
2. Go to "Signing & Capabilities"
3. Click "+ Capability"
4. Add "Near Field Communication Tag Reading"
5. Ensure the Info.plist includes:
   - `NFCReaderUsageDescription`
   - `com.apple.developer.nfc.readersession.formats`

## Single App Mode (Kiosk)

For iOS kiosk mode, you must use MDM:

### Using Apple Business Manager / MDM

1. Enroll devices in Apple Business Manager
2. Create a Device Enrollment Program (DEP) profile
3. Enable "Single App Mode" with Learnora as the locked app
4. Deploy the profile to devices

### MDM Profile Example

Create a profile with these restrictions:
- Disable Home button
- Disable Lock button
- Disable volume buttons
- Disable touch (optional)
- Disable device rotation

## Build for Distribution

### TestFlight / App Store

1. Select a development team in Signing & Capabilities
2. Archive the app (Product > Archive)
3. Upload to App Store Connect
4. Configure TestFlight or submit for App Store review

### Enterprise Distribution

For internal school deployment:
1. Use an Apple Developer Enterprise Program account
2. Archive and export for enterprise distribution
3. Distribute via MDM or internal website

## Troubleshooting

### NFC Not Working
- Ensure device supports NFC (iPhone 7 or later)
- Check NFC entitlements are added
- Verify Info.plist permissions

### Single App Mode Not Activating
- Device must be supervised via MDM
- Profile must be properly configured
- Check MDM logs for errors

### Build Errors
- Update CocoaPods: `pod install`
- Clean build folder (Product > Clean Build Folder)
- Ensure deployment target is iOS 13.0+
