import Foundation
import Capacitor
import CoreNFC

@objc(LearnoraNFCPlugin)
public class LearnoraNFCPlugin: CAPPlugin, NFCNDEFReaderSessionDelegate {
    
    private var session: NFCNDEFReaderSession?
    private var savedCall: CAPPluginCall?
    private var isScanning = false
    
    @objc func isAvailable(_ call: CAPPluginCall) {
        let available = NFCNDEFReaderSession.readingAvailable
        var result = JSObject()
        result["available"] = available
        call.resolve(result)
    }
    
    @objc func startScan(_ call: CAPPluginCall) {
        if !NFCNDEFReaderSession.readingAvailable {
            var result = JSObject()
            result["success"] = false
            result["message"] = "NFC is not available on this device"
            call.resolve(result)
            return
        }
        
        savedCall = call
        isScanning = true
        
        DispatchQueue.main.async { [weak self] in
            self?.session = NFCNDEFReaderSession(
                readingAvailable: true,
                delegate: self!,
                queue: nil,
                invalidateAfterFirstRead: false
            )
            self?.session?.alertMessage = "Hold your NFC card near the device"
            self?.session?.begin()
        }
        
        var result = JSObject()
        result["success"] = true
        result["message"] = "NFC scanning started"
        call.resolve(result)
    }
    
    @objc func stopScan(_ call: CAPPluginCall) {
        isScanning = false
        session?.invalidate()
        session = nil
        savedCall = nil
        
        var result = JSObject()
        result["success"] = true
        call.resolve(result)
    }
    
    public func readerSession(_ session: NFCNDEFReaderSession, didInvalidateWithError error: Error) {
        isScanning = false
        self.session = nil
        
        var errorData = JSObject()
        errorData["success"] = false
        errorData["message"] = error.localizedDescription
        notifyListeners("nfcError", data: errorData)
    }
    
    public func readerSession(_ session: NFCNDEFReaderSession, didDetectNDEFs messages: [NFCNDEFMessage]) {
        var records = JSArray()
        
        for message in messages {
            for record in message.records {
                var recordObj = JSObject()
                recordObj["type"] = getRecordType(record)
                recordObj["content"] = getRecordContent(record)
                records.append(recordObj)
            }
        }
        
        var nfcData = JSObject()
        nfcData["records"] = records
        nfcData["timestamp"] = Date().ISO8601Format()
        
        notifyListeners("nfcTagRead", data: nfcData)
    }
    
    public func readerSessionDidBecomeActive(_ session: NFCNDEFReaderSession) {
        // Session became active
    }
    
    private func getRecordType(_ record: NFCNDEFPayload) -> String {
        switch record.typeNameFormat {
        case .nfcWellKnown:
            if record.type == "T" {
                return "text"
            } else if record.type == "U" {
                return "url"
            }
            return "wellKnown"
        case .media:
            return "mime"
        case .absoluteURI:
            return "uri"
        case .nfcExternal:
            return "external"
        default:
            return "unknown"
        }
    }
    
    private func getRecordContent(_ record: NFCNDEFPayload) -> String {
        let payload = record.payload
        
        switch record.typeNameFormat {
        case .nfcWellKnown:
            if record.type == "T" {
                if payload.count > 3 {
                    let languageCodeLength = Int(payload[0]) & 0x3F
                    if payload.count > languageCodeLength + 1 {
                        return String(data: payload.subdata(in: (languageCodeLength + 1)..<payload.count), encoding: .utf8) ?? ""
                    }
                }
            } else if record.type == "U" {
                if payload.count > 0 {
                    let prefixCode = payload[0]
                    let prefix = getUriPrefix(prefixCode)
                    if payload.count > 1 {
                        let uri = String(data: payload.subdata(in: 1..<payload.count), encoding: .utf8) ?? ""
                        return prefix + uri
                    }
                    return prefix
                }
            }
            return payload.map { String(format: "%02X", $0) }.joined()
            
        case .media, .absoluteURI, .nfcExternal:
            return String(data: payload, encoding: .utf8) ?? payload.map { String(format: "%02X", $0) }.joined()
            
        default:
            return payload.map { String(format: "%02X", $0) }.joined()
        }
    }
    
    private func getUriPrefix(_ code: UInt8) -> String {
        let prefixes: [UInt8: String] = [
            0x01: "http://www.",
            0x02: "https://www.",
            0x03: "http://",
            0x04: "https://",
            0x05: "tel:",
            0x06: "mailto:",
            0x07: "ftp://anonymous:anonymous@",
            0x08: "ftp://ftp.",
            0x09: "ftps://",
            0x0A: "sftp://",
            0x1D: "file://",
            0x23: "urn:nfc:"
        ]
        return prefixes[code] ?? ""
    }
}
