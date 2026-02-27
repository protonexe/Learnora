package com.learnora.app.plugins;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Build;
import android.view.KeyEvent;
import android.view.View;
import android.view.WindowManager;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;

@CapacitorPlugin(name = "KioskMode")
public class KioskModePlugin extends Plugin {

    private static final String TAG = "KioskMode";
    private static final String PREFS_NAME = "learnora_kiosk";
    private static final String KEY_PASSWORD_HASH = "exit_password_hash";
    private static final String KEY_KIOSK_ACTIVE = "kiosk_active";
    private static final String DEFAULT_PASSWORD = "admin1234";

    private DevicePolicyManager devicePolicyManager;
    private ComponentName adminComponent;
    private boolean isKioskModeActive = false;

    @Override
    public void load() {
        Context context = getContext();
        devicePolicyManager = (DevicePolicyManager) context.getSystemService(Context.DEVICE_POLICY_SERVICE);
        adminComponent = new ComponentName(context, KioskDeviceAdminReceiver.class);

        // Restore kiosk state from persistent storage
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        isKioskModeActive = prefs.getBoolean(KEY_KIOSK_ACTIVE, false);

        // Ensure default password is set if none exists
        if (!prefs.contains(KEY_PASSWORD_HASH)) {
            prefs.edit().putString(KEY_PASSWORD_HASH, hashPassword(DEFAULT_PASSWORD)).apply();
        }

        // If kiosk was active before restart, re-enable it
        if (isKioskModeActive) {
            reEnableKioskMode();
        }
    }

    private void reEnableKioskMode() {
        try {
            Activity activity = getActivity();
            Context context = getContext();
            if (activity == null || context == null) return;

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                if (devicePolicyManager.isDeviceOwnerApp(context.getPackageName())) {
                    String[] packages = { context.getPackageName() };
                    devicePolicyManager.setLockTaskPackages(adminComponent, packages);
                    activity.runOnUiThread(() -> {
                        activity.startLockTask();
                        applyKioskFlags(activity);
                    });
                    Log.i(TAG, "Kiosk mode re-enabled after restart");
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "Error re-enabling kiosk mode", e);
        }
    }

    private void applyKioskFlags(Activity activity) {
        if (activity == null) return;
        try {
            // Keep screen on
            activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

            // Immersive sticky mode - hide system bars
            View decorView = activity.getWindow().getDecorView();
            decorView.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            );

            // Re-apply if system UI becomes visible
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
            Log.e(TAG, "Error applying kiosk flags", e);
        }
    }

    private void removeKioskFlags(Activity activity) {
        if (activity == null) return;
        try {
            activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            View decorView = activity.getWindow().getDecorView();
            decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
            decorView.setOnSystemUiVisibilityChangeListener(null);
        } catch (Exception e) {
            Log.e(TAG, "Error removing kiosk flags", e);
        }
    }

    @PluginMethod
    public void enableKioskMode(PluginCall call) {
        try {
            Activity activity = getActivity();
            Context context = getContext();

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                if (devicePolicyManager.isDeviceOwnerApp(context.getPackageName())) {
                    String[] packages = { context.getPackageName() };
                    devicePolicyManager.setLockTaskPackages(adminComponent, packages);

                    activity.runOnUiThread(() -> {
                        activity.startLockTask();
                        applyKioskFlags(activity);
                    });

                    isKioskModeActive = true;
                    persistKioskState(true);

                    JSObject result = new JSObject();
                    result.put("success", true);
                    result.put("message", "Kiosk mode enabled - device locked");
                    call.resolve(result);
                } else {
                    // Not device owner - use screen pinning as fallback
                    activity.runOnUiThread(() -> {
                        activity.startLockTask();
                        applyKioskFlags(activity);
                    });

                    isKioskModeActive = true;
                    persistKioskState(true);

                    JSObject result = new JSObject();
                    result.put("success", true);
                    result.put("message", "Screen pinning enabled (not device owner)");
                    result.put("pinned", true);
                    call.resolve(result);
                }
            } else {
                JSObject result = new JSObject();
                result.put("success", false);
                result.put("message", "Kiosk mode requires Android 5.0+");
                call.resolve(result);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error enabling kiosk mode", e);
            JSObject result = new JSObject();
            result.put("success", false);
            result.put("message", e.getMessage());
            call.resolve(result);
        }
    }

    @PluginMethod
    public void disableKioskMode(PluginCall call) {
        String password = call.getString("password");

        if (password == null || password.isEmpty()) {
            JSObject result = new JSObject();
            result.put("success", false);
            result.put("message", "Password is required to exit kiosk mode");
            result.put("passwordRequired", true);
            call.resolve(result);
            return;
        }

        if (!verifyPassword(password)) {
            JSObject result = new JSObject();
            result.put("success", false);
            result.put("message", "Incorrect password");
            result.put("passwordRequired", true);
            call.resolve(result);
            return;
        }

        try {
            Activity activity = getActivity();
            if (isKioskModeActive) {
                activity.runOnUiThread(() -> {
                    try {
                        activity.stopLockTask();
                        removeKioskFlags(activity);
                    } catch (Exception e) {
                        Log.e(TAG, "Error stopping lock task", e);
                    }
                });
                isKioskModeActive = false;
                persistKioskState(false);

                JSObject result = new JSObject();
                result.put("success", true);
                result.put("message", "Kiosk mode disabled");
                call.resolve(result);
            } else {
                JSObject result = new JSObject();
                result.put("success", true);
                result.put("message", "Kiosk mode was not active");
                call.resolve(result);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error disabling kiosk mode", e);
            JSObject result = new JSObject();
            result.put("success", false);
            result.put("message", e.getMessage());
            call.resolve(result);
        }
    }

    @PluginMethod
    public void setExitPassword(PluginCall call) {
        String currentPassword = call.getString("currentPassword");
        String newPassword = call.getString("newPassword");

        if (currentPassword == null || newPassword == null) {
            call.reject("Both current and new passwords are required");
            return;
        }

        if (!verifyPassword(currentPassword)) {
            JSObject result = new JSObject();
            result.put("success", false);
            result.put("message", "Current password is incorrect");
            call.resolve(result);
            return;
        }

        if (newPassword.length() < 4) {
            JSObject result = new JSObject();
            result.put("success", false);
            result.put("message", "Password must be at least 4 characters");
            call.resolve(result);
            return;
        }

        SharedPreferences prefs = getContext().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        prefs.edit().putString(KEY_PASSWORD_HASH, hashPassword(newPassword)).apply();

        JSObject result = new JSObject();
        result.put("success", true);
        result.put("message", "Exit password updated");
        call.resolve(result);
    }

    @PluginMethod
    public void verifyExitPassword(PluginCall call) {
        String password = call.getString("password");
        if (password == null) {
            call.reject("Password is required");
            return;
        }

        JSObject result = new JSObject();
        result.put("valid", verifyPassword(password));
        call.resolve(result);
    }

    @PluginMethod
    public void isKioskModeActive(PluginCall call) {
        JSObject result = new JSObject();
        result.put("active", isKioskModeActive);
        call.resolve(result);
    }

     @PluginMethod
     public void isDeviceOwner(PluginCall call) {
         Context context = getContext();
         boolean isOwner = false;
         if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
             isOwner = devicePolicyManager.isDeviceOwnerApp(context.getPackageName());
         }
         JSObject result = new JSObject();
         result.put("isDeviceOwner", isOwner);
         call.resolve(result);
     }

     @PluginMethod
     public void clearDeviceOwner(PluginCall call) {
         String password = call.getString("password");

         if (password == null || password.isEmpty()) {
             JSObject result = new JSObject();
             result.put("success", false);
             result.put("message", "Password is required to disable Device Owner");
             call.resolve(result);
             return;
         }

         if (!verifyPassword(password)) {
             JSObject result = new JSObject();
             result.put("success", false);
             result.put("message", "Incorrect password");
             call.resolve(result);
              return;
          }

          try {
              Context context = getContext();
              String packageName = context.getPackageName();
              
              if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                  if (devicePolicyManager.isDeviceOwnerApp(packageName)) {
                      // First disable kiosk mode if active
                      if (isKioskModeActive) {
                          Activity activity = getActivity();
                          if (activity != null) {
                              activity.runOnUiThread(() -> {
                                  try {
                                      activity.stopLockTask();
                                      removeKioskFlags(activity);
                                  } catch (Exception e) {
                                      Log.e(TAG, "Error stopping lock task", e);
                                  }
                              });
                          }
                          isKioskModeActive = false;
                          persistKioskState(false);
                      }

                      boolean removed = false;
                      String message = "";
                      
                      // Method 1: Remove as active admin first
                      try {
                          if (devicePolicyManager.isAdminActive(adminComponent)) {
                              devicePolicyManager.removeActiveAdmin(adminComponent);
                              Log.i(TAG, "Active admin removed successfully");
                              removed = true;
                          }
                      } catch (Exception e) {
                          Log.w(TAG, "removeActiveAdmin failed: " + e.getMessage());
                          message += "removeActiveAdmin failed. ";
                      }

                      // Method 2: Clear device owner app
                      try {
                          devicePolicyManager.clearDeviceOwnerApp(packageName);
                          Log.i(TAG, "Device Owner cleared successfully");
                          removed = true;
                      } catch (Exception e) {
                          Log.w(TAG, "clearDeviceOwnerApp failed: " + e.getMessage());
                          message += "clearDeviceOwnerApp failed: " + e.getMessage();
                      }

                      JSObject result = new JSObject();
                      if (removed) {
                          result.put("success", true);
                          result.put("message", "Device Owner and Admin permissions removed! You can now uninstall the app normally.");
                      } else {
                          result.put("success", false);
                          result.put("message", "Could not automatically remove. " + message + " Please use ADB or manual removal.");
                      }
                      call.resolve(result);
                  } else {
                      JSObject result = new JSObject();
                      result.put("success", false);
                      result.put("message", "App is not currently Device Owner");
                      call.resolve(result);
                  }
              } else {
                  JSObject result = new JSObject();
                  result.put("success", false);
                  result.put("message", "Device Owner API not available on this Android version");
                  call.resolve(result);
              }
          } catch (Exception e) {
              Log.e(TAG, "Error in clearDeviceOwner", e);
              JSObject result = new JSObject();
              result.put("success", false);
              result.put("message", "Error: " + e.getMessage());
              call.resolve(result);
          }
      }

     private void persistKioskState(boolean active) {
        try {
            SharedPreferences prefs = getContext().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            prefs.edit().putBoolean(KEY_KIOSK_ACTIVE, active).apply();
        } catch (Exception e) {
            Log.e(TAG, "Error persisting kiosk state", e);
        }
    }

    private boolean verifyPassword(String password) {
        SharedPreferences prefs = getContext().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String storedHash = prefs.getString(KEY_PASSWORD_HASH, hashPassword(DEFAULT_PASSWORD));
        return storedHash.equals(hashPassword(password));
    }

    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            Log.e(TAG, "Error hashing password", e);
            return password; // fallback - not ideal but prevents lockout
        }
    }
}
