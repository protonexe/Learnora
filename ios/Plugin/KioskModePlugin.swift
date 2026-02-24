import Foundation
import Capacitor
import UIKit

@objc(KioskModePlugin)
public class KioskModePlugin: CAPPlugin {
    
    private var isKioskModeActive = false
    
    @objc func enableKioskMode(_ call: CAPPluginCall) {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            
            if #available(iOS 13.0, *) {
                var result = JSObject()
                
                let isSingleAppMode = self.checkSingleAppMode()
                
                if isSingleAppMode {
                    self.isKioskModeActive = true
                    self.hideSystemUI()
                    
                    result["success"] = true
                    result["message"] = "Single App Mode is active"
                } else {
                    result["success"] = false
                    result["message"] = "Single App Mode requires MDM configuration. Please configure the device with an MDM profile for Single App Mode."
                    result["mdmRequired"] = true
                }
                
                call.resolve(result)
            } else {
                var result = JSObject()
                result["success"] = false
                result["message"] = "Kiosk mode requires iOS 13+"
                call.resolve(result)
            }
        }
    }
    
    @objc func disableKioskMode(_ call: CAPPluginCall) {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            
            var result = JSObject()
            
            let isSingleAppMode = self.checkSingleAppMode()
            
            if !isSingleAppMode {
                self.isKioskModeActive = false
                self.showSystemUI()
                
                result["success"] = true
                result["message"] = "Kiosk mode disabled (only works if not in MDM Single App Mode)"
            } else {
                result["success"] = false
                result["message"] = "Cannot exit MDM Single App Mode from within the app. Use MDM to disable."
                result["mdmControlled"] = true
            }
            
            call.resolve(result)
        }
    }
    
    @objc func isKioskModeActive(_ call: CAPPluginCall) {
        var result = JSObject()
        result["active"] = isKioskModeActive || checkSingleAppMode()
        call.resolve(result)
    }
    
    @objc func isSingleAppMode(_ call: CAPPluginCall) {
        var result = JSObject()
        result["isSingleAppMode"] = checkSingleAppMode()
        call.resolve(result)
    }
    
    @objc func hideSystemUI(_ call: CAPPluginCall) {
        DispatchQueue.main.async { [weak self] in
            self?.hideSystemUI()
            var result = JSObject()
            result["success"] = true
            call.resolve(result)
        }
    }
    
    private func checkSingleAppMode() -> Bool {
        if #available(iOS 13.0, *) {
            let sharedApplication = UIApplication.shared
            let isSceneBased = sharedApplication.connectedScenes.count > 0
            
            if isSceneBased {
                for scene in sharedApplication.connectedScenes {
                    if let windowScene = scene as? UIWindowScene {
                        for window in windowScene.windows {
                            if window.isKeyWindow {
                                return !window.canResignKey
                            }
                        }
                    }
                }
            }
            
            return !sharedApplication.isIdleTimerDisabled == false && 
                   sharedApplication.connectedScenes.contains { scene in
                    (scene as? UIWindowScene)?.windows.contains { $0.isKeyWindow && !$0.canResignKey } ?? false
                }
        }
        
        return !UIApplication.shared.isIdleTimerDisabled
    }
    
    private func hideSystemUI() {
        let sharedApplication = UIApplication.shared
        
        sharedApplication.isIdleTimerDisabled = true
        
        if #available(iOS 13.0, *) {
            for scene in sharedApplication.connectedScenes {
                if let windowScene = scene as? UIWindowScene {
                    windowScene.windows.forEach { window in
                        window.overrideUserInterfaceStyle = .dark
                    }
                    
                    windowScene.requestGeometryUpdate(.iOS(interfaceOrientations: .portrait)) { error in
                        if let error = error {
                            print("Error locking orientation: \(error)")
                        }
                    }
                }
            }
        } else {
            UIDevice.current.setValue(UIInterfaceOrientation.portrait.rawValue, forKey: "orientation")
        }
    }
    
    private func showSystemUI() {
        let sharedApplication = UIApplication.shared
        sharedApplication.isIdleTimerDisabled = false
        
        if #available(iOS 13.0, *) {
            for scene in sharedApplication.connectedScenes {
                if let windowScene = scene as? UIWindowScene {
                    windowScene.windows.forEach { window in
                        window.overrideUserInterfaceStyle = .unspecified
                    }
                }
            }
        }
    }
}
