import Foundation
import Capacitor
import UIKit

@objc(ScreenPinPlugin)
public class ScreenPinPlugin: CAPPlugin {
    
    private var isPinActive = false
    
    @objc func enablePin(_ call: CAPPluginCall) {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            
            var result = JSObject()
            
            self.isPinActive = true
            self.keepScreenOn()
            
            result["success"] = true
            result["message"] = "Screen pin enabled - screen will stay on"
            
            call.resolve(result)
        }
    }
    
    @objc func disablePin(_ call: CAPPluginCall) {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            
            var result = JSObject()
            
            self.isPinActive = false
            self.allowScreenSleep()
            
            result["success"] = true
            result["message"] = "Screen pin disabled"
            
            call.resolve(result)
        }
    }
    
    @objc func isPinActive(_ call: CAPPluginCall) {
        var result = JSObject()
        result["active"] = isPinActive
        call.resolve(result)
    }
    
    private func keepScreenOn() {
        UIApplication.shared.isIdleTimerDisabled = true
    }
    
    private func allowScreenSleep() {
        UIApplication.shared.isIdleTimerDisabled = false
    }
}
