package com.learnora.app.plugins;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Build;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "ScreenPin")
public class ScreenPinPlugin extends Plugin {

    private static final String TAG = "ScreenPin";
    private static final String PREFS_NAME = "learnora_screenpin";
    private static final String KEY_PIN_ACTIVE = "pin_active";

    private boolean isPinActive = false;

    @Override
    public void load() {
        Context context = getContext();
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        isPinActive = prefs.getBoolean(KEY_PIN_ACTIVE, false);
    }

    private void applyPinFlags(Activity activity) {
        if (activity == null) return;
        try {
            activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

            View decorView = activity.getWindow().getDecorView();
            decorView.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            );

            decorView.setOnSystemUiVisibilityChangeListener(visibility -> {
                if ((visibility & View.SYSTEM_UI_FLAG_FULLSCREEN) == 0) {
                    decorView.setSystemUiVisibility(
                        View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                        | View.SYSTEM_UI_FLAG_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    );
                }
            });
        } catch (Exception e) {
            Log.e(TAG, "Error applying pin flags", e);
        }
    }

    private void removePinFlags(Activity activity) {
        if (activity == null) return;
        try {
            activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            View decorView = activity.getWindow().getDecorView();
            decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
            decorView.setOnSystemUiVisibilityChangeListener(null);
        } catch (Exception e) {
            Log.e(TAG, "Error removing pin flags", e);
        }
    }

    @PluginMethod
    public void enablePin(PluginCall call) {
        try {
            Activity activity = getActivity();

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                activity.runOnUiThread(() -> {
                    try {
                        activity.startLockTask();
                        applyPinFlags(activity);
                    } catch (Exception e) {
                        Log.e(TAG, "Error starting lock task", e);
                    }
                });

                isPinActive = true;
                persistPinState(true);

                JSObject result = new JSObject();
                result.put("success", true);
                result.put("message", "Screen pinning enabled - user confirmation required");
                call.resolve(result);
            } else {
                JSObject result = new JSObject();
                result.put("success", false);
                result.put("message", "Screen pinning requires Android 5.0+");
                call.resolve(result);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error enabling screen pin", e);
            JSObject result = new JSObject();
            result.put("success", false);
            result.put("message", e.getMessage());
            call.resolve(result);
        }
    }

    @PluginMethod
    public void disablePin(PluginCall call) {
        try {
            Activity activity = getActivity();
            if (isPinActive) {
                activity.runOnUiThread(() -> {
                    try {
                        activity.stopLockTask();
                        removePinFlags(activity);
                    } catch (Exception e) {
                        Log.e(TAG, "Error stopping lock task", e);
                    }
                });
                isPinActive = false;
                persistPinState(false);

                JSObject result = new JSObject();
                result.put("success", true);
                result.put("message", "Screen pinning disabled");
                call.resolve(result);
            } else {
                JSObject result = new JSObject();
                result.put("success", true);
                result.put("message", "Screen pinning was not active");
                call.resolve(result);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error disabling screen pin", e);
            JSObject result = new JSObject();
            result.put("success", false);
            result.put("message", e.getMessage());
            call.resolve(result);
        }
    }

    @PluginMethod
    public void isPinActive(PluginCall call) {
        JSObject result = new JSObject();
        result.put("active", isPinActive);
        call.resolve(result);
    }

    private void persistPinState(boolean active) {
        try {
            SharedPreferences prefs = getContext().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            prefs.edit().putBoolean(KEY_PIN_ACTIVE, active).apply();
        } catch (Exception e) {
            Log.e(TAG, "Error persisting pin state", e);
        }
    }
}
