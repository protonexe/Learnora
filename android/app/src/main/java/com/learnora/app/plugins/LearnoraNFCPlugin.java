package com.learnora.app.plugins;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.IntentFilter;
import android.nfc.NdefMessage;
import android.nfc.NdefRecord;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.nfc.tech.Ndef;
import android.nfc.tech.NdefFormatable;
import android.nfc.tech.IsoDep;
import android.nfc.tech.MifareClassic;
import android.nfc.tech.MifareUltralight;
import android.nfc.tech.NfcA;
import android.nfc.tech.NfcB;
import android.nfc.tech.NfcF;
import android.nfc.tech.NfcV;
import android.os.Build;
import android.os.Parcelable;
import android.util.Log;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

@CapacitorPlugin(name = "LearnoraNFC")
public class LearnoraNFCPlugin extends Plugin {

    private static final String TAG = "LearnoraNFC";
    private NfcAdapter nfcAdapter;
    private boolean isScanning = false;
    private PendingIntent pendingIntent;
    private IntentFilter[] intentFilters;
    private String[][] techLists;

    @Override
    public void load() {
        nfcAdapter = NfcAdapter.getDefaultAdapter(getContext());
        setupForegroundDispatch();
    }

    private void setupForegroundDispatch() {
        Activity activity = getActivity();
        if (activity == null) return;

        Intent intent = new Intent(activity, activity.getClass());
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);

        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            flags |= PendingIntent.FLAG_MUTABLE;
        }
        pendingIntent = PendingIntent.getActivity(activity, 0, intent, flags);

        // Match all NFC tag types
        try {
            IntentFilter ndefFilter = new IntentFilter(NfcAdapter.ACTION_NDEF_DISCOVERED);
            ndefFilter.addDataType("*/*");
            
            IntentFilter techFilter = new IntentFilter(NfcAdapter.ACTION_TECH_DISCOVERED);
            IntentFilter tagFilter = new IntentFilter(NfcAdapter.ACTION_TAG_DISCOVERED);

            intentFilters = new IntentFilter[]{ ndefFilter, techFilter, tagFilter };
        } catch (IntentFilter.MalformedMimeTypeException e) {
            Log.e(TAG, "MalformedMimeType", e);
            intentFilters = new IntentFilter[]{
                new IntentFilter(NfcAdapter.ACTION_TAG_DISCOVERED)
            };
        }

        // Support all common NFC tech types
        techLists = new String[][]{
            new String[]{ Ndef.class.getName() },
            new String[]{ NdefFormatable.class.getName() },
            new String[]{ IsoDep.class.getName() },
            new String[]{ NfcA.class.getName() },
            new String[]{ NfcB.class.getName() },
            new String[]{ NfcF.class.getName() },
            new String[]{ NfcV.class.getName() },
            new String[]{ MifareClassic.class.getName() },
            new String[]{ MifareUltralight.class.getName() }
        };
    }

    @Override
    protected void handleOnResume() {
        super.handleOnResume();
        enableForegroundDispatch();
    }

    @Override
    protected void handleOnPause() {
        super.handleOnPause();
        disableForegroundDispatch();
    }

    private void enableForegroundDispatch() {
        if (nfcAdapter != null && pendingIntent != null) {
            try {
                Activity activity = getActivity();
                if (activity != null && !activity.isFinishing()) {
                    nfcAdapter.enableForegroundDispatch(activity, pendingIntent, intentFilters, techLists);
                }
            } catch (Exception e) {
                Log.e(TAG, "Error enabling foreground dispatch", e);
            }
        }
    }

    private void disableForegroundDispatch() {
        if (nfcAdapter != null) {
            try {
                Activity activity = getActivity();
                if (activity != null && !activity.isFinishing()) {
                    nfcAdapter.disableForegroundDispatch(activity);
                }
            } catch (Exception e) {
                Log.e(TAG, "Error disabling foreground dispatch", e);
            }
        }
    }

    @Override
    protected void handleOnNewIntent(Intent intent) {
        super.handleOnNewIntent(intent);
        String action = intent.getAction();
        if (NfcAdapter.ACTION_NDEF_DISCOVERED.equals(action) ||
            NfcAdapter.ACTION_TECH_DISCOVERED.equals(action) ||
            NfcAdapter.ACTION_TAG_DISCOVERED.equals(action)) {
            handleNfcIntent(intent);
        }
    }

    @PluginMethod
    public void isAvailable(PluginCall call) {
        JSObject result = new JSObject();
        result.put("available", nfcAdapter != null);
        result.put("enabled", nfcAdapter != null && nfcAdapter.isEnabled());
        call.resolve(result);
    }

    @PluginMethod
    public void startScan(PluginCall call) {
        if (nfcAdapter == null) {
            JSObject result = new JSObject();
            result.put("success", false);
            result.put("message", "NFC not available on this device");
            call.resolve(result);
            return;
        }

        if (!nfcAdapter.isEnabled()) {
            JSObject result = new JSObject();
            result.put("success", false);
            result.put("message", "NFC is disabled. Please enable it in device settings.");
            call.resolve(result);
            return;
        }

        isScanning = true;
        enableForegroundDispatch();

        JSObject result = new JSObject();
        result.put("success", true);
        result.put("message", "NFC scanning started");
        call.resolve(result);
    }

    @PluginMethod
    public void stopScan(PluginCall call) {
        isScanning = false;
        JSObject result = new JSObject();
        result.put("success", true);
        call.resolve(result);
    }

    @PluginMethod
    public void writeTag(PluginCall call) {
        String text = call.getString("text");
        if (text == null || text.isEmpty()) {
            call.reject("Text to write is required");
            return;
        }
        // Writing requires a tag to be present - store the text and write on next tap
        pendingWriteText = text;
        pendingWriteCall = call;
        isWriteMode = true;
    }

    private String pendingWriteText = null;
    private PluginCall pendingWriteCall = null;
    private boolean isWriteMode = false;

    private void handleNfcIntent(Intent intent) {
        if (!isScanning && !isWriteMode) return;

        try {
            Tag tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
            if (tag == null) {
                notifyError("No NFC tag detected");
                return;
            }

            // Handle write mode
            if (isWriteMode && pendingWriteText != null && pendingWriteCall != null) {
                handleWriteTag(tag, pendingWriteText, pendingWriteCall);
                pendingWriteText = null;
                pendingWriteCall = null;
                isWriteMode = false;
                return;
            }

            String serialNumber = bytesToHex(tag.getId());
            
            // Get tag tech list
            JSArray techList = new JSArray();
            for (String tech : tag.getTechList()) {
                techList.put(tech.substring(tech.lastIndexOf('.') + 1));
            }

            JSArray records = new JSArray();

            // Try to read NDEF messages from the intent
            Parcelable[] rawMsgs = intent.getParcelableArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES);
            if (rawMsgs != null && rawMsgs.length > 0) {
                for (Parcelable rawMsg : rawMsgs) {
                    NdefMessage msg = (NdefMessage) rawMsg;
                    for (NdefRecord record : msg.getRecords()) {
                        JSObject parsed = parseNdefRecord(record);
                        if (parsed != null) {
                            records.put(parsed);
                        }
                    }
                }
            } else {
                // Try reading NDEF directly from the tag
                Ndef ndef = Ndef.get(tag);
                if (ndef != null) {
                    try {
                        ndef.connect();
                        NdefMessage ndefMessage = ndef.getNdefMessage();
                        if (ndefMessage != null) {
                            for (NdefRecord record : ndefMessage.getRecords()) {
                                JSObject parsed = parseNdefRecord(record);
                                if (parsed != null) {
                                    records.put(parsed);
                                }
                            }
                        }
                    } catch (Exception e) {
                        Log.w(TAG, "Error reading NDEF from tag", e);
                    } finally {
                        try { ndef.close(); } catch (IOException e) { /* ignore */ }
                    }
                }
            }

            // If no NDEF records, report raw tag info
            if (records.length() == 0) {
                JSObject rawRecord = new JSObject();
                rawRecord.put("type", "tag_id");
                rawRecord.put("content", serialNumber);
                records.put(rawRecord);
            }

            JSObject nfcData = new JSObject();
            nfcData.put("serialNumber", serialNumber);
            nfcData.put("records", records);
            nfcData.put("techList", techList);
            nfcData.put("timestamp", System.currentTimeMillis());

            notifyListeners("nfcTagRead", nfcData);

        } catch (Exception e) {
            Log.e(TAG, "Error handling NFC intent", e);
            notifyError("Error reading NFC tag: " + e.getMessage());
        }
    }

    private void handleWriteTag(Tag tag, String text, PluginCall call) {
        try {
            NdefRecord record = NdefRecord.createTextRecord("en", text);
            NdefMessage message = new NdefMessage(new NdefRecord[]{ record });

            Ndef ndef = Ndef.get(tag);
            if (ndef != null) {
                ndef.connect();
                if (!ndef.isWritable()) {
                    call.reject("NFC tag is read-only");
                    ndef.close();
                    return;
                }
                int size = message.toByteArray().length;
                if (ndef.getMaxSize() < size) {
                    call.reject("NFC tag capacity too small. Need " + size + " bytes, tag has " + ndef.getMaxSize());
                    ndef.close();
                    return;
                }
                ndef.writeNdefMessage(message);
                ndef.close();

                JSObject result = new JSObject();
                result.put("success", true);
                result.put("message", "Tag written successfully");
                call.resolve(result);
            } else {
                NdefFormatable formatable = NdefFormatable.get(tag);
                if (formatable != null) {
                    formatable.connect();
                    formatable.format(message);
                    formatable.close();

                    JSObject result = new JSObject();
                    result.put("success", true);
                    result.put("message", "Tag formatted and written");
                    call.resolve(result);
                } else {
                    call.reject("NFC tag does not support NDEF");
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "Error writing NFC tag", e);
            call.reject("Failed to write NFC tag: " + e.getMessage());
        }
    }

    private void notifyError(String message) {
        JSObject error = new JSObject();
        error.put("success", false);
        error.put("message", message);
        notifyListeners("nfcError", error);
    }

    private JSObject parseNdefRecord(NdefRecord record) {
        JSObject result = new JSObject();
        try {
            short tnf = record.getTnf();
            byte[] payload = record.getPayload();
            byte[] type = record.getType();

            if (tnf == NdefRecord.TNF_WELL_KNOWN) {
                if (Arrays.equals(type, NdefRecord.RTD_TEXT)) {
                    String text = parseTextRecord(payload);
                    result.put("type", "text");
                    result.put("content", text);

                    // Try to parse as JSON for auth data
                    if (text.trim().startsWith("{")) {
                        try {
                            result.put("type", "json");
                            result.put("parsedContent", new JSObject(text.trim()));
                        } catch (Exception e) {
                            // Not JSON, keep as text
                        }
                    }
                } else if (Arrays.equals(type, NdefRecord.RTD_URI)) {
                    result.put("type", "url");
                    result.put("content", parseUriRecord(payload));
                } else {
                    result.put("type", "well_known");
                    result.put("content", new String(payload, StandardCharsets.UTF_8));
                }
            } else if (tnf == NdefRecord.TNF_MIME_MEDIA) {
                String mimeType = new String(type, StandardCharsets.UTF_8);
                String content = new String(payload, StandardCharsets.UTF_8);
                result.put("type", "mime");
                result.put("mimeType", mimeType);
                result.put("content", content);

                // Try JSON parsing for application/json
                if (mimeType.contains("json") && content.trim().startsWith("{")) {
                    try {
                        result.put("type", "json");
                        result.put("parsedContent", new JSObject(content.trim()));
                    } catch (Exception e) {
                        // keep as mime
                    }
                }
            } else if (tnf == NdefRecord.TNF_ABSOLUTE_URI) {
                result.put("type", "url");
                result.put("content", new String(payload, StandardCharsets.UTF_8));
            } else if (tnf == NdefRecord.TNF_EXTERNAL_TYPE) {
                String extType = new String(type, StandardCharsets.UTF_8);
                result.put("type", "external");
                result.put("externalType", extType);
                result.put("content", new String(payload, StandardCharsets.UTF_8));
            } else if (tnf == NdefRecord.TNF_EMPTY) {
                return null; // skip empty records
            } else {
                result.put("type", "raw");
                result.put("content", bytesToHex(payload));
            }
        } catch (Exception e) {
            Log.e(TAG, "Error parsing NDEF record", e);
            result.put("type", "error");
            result.put("message", e.getMessage());
        }
        return result;
    }

    private String parseTextRecord(byte[] payload) {
        if (payload == null || payload.length < 1) return "";
        byte status = payload[0];
        int langLen = status & 0x3F;
        if (langLen + 1 > payload.length) return new String(payload, StandardCharsets.UTF_8);
        return new String(payload, langLen + 1, payload.length - langLen - 1, StandardCharsets.UTF_8);
    }

    private String parseUriRecord(byte[] payload) {
        if (payload == null || payload.length < 1) return "";
        String[] prefixes = {
            "", "http://www.", "https://www.", "http://", "https://",
            "tel:", "mailto:", "ftp://anonymous:anonymous@", "ftp://ftp.",
            "ftps://", "sftp://", "smb://", "nfs://", "ftp://",
            "dav://", "news:", "telnet://", "imap:", "rtsp://",
            "urn:", "pop:", "sip:", "sips:", "tftp:", "btspp://",
            "btl2cap://", "btgoep://", "tcpobex://", "irdaobex://",
            "file://", "urn:epc:id:", "urn:epc:tag:", "urn:epc:pat:",
            "urn:epc:raw:", "urn:epc:", "urn:nfc:"
        };
        int prefixIdx = payload[0] & 0xFF;
        String prefix = prefixIdx < prefixes.length ? prefixes[prefixIdx] : "";
        return prefix + new String(payload, 1, payload.length - 1, StandardCharsets.UTF_8);
    }

    private String bytesToHex(byte[] bytes) {
        if (bytes == null || bytes.length == 0) return "";
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02X", b));
        }
        return sb.toString();
    }
}
