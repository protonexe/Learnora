#!/bin/bash

echo "========================================"
echo "Learnora Kiosk Mode Setup"
echo "========================================"
echo ""
echo "This script will set Learnora as the Device Owner"
echo "to enable full kiosk mode functionality."
echo ""
echo "Prerequisites:"
echo "- Android device connected via USB"
echo "- USB debugging enabled on the device"
echo "- ADB (Android Debug Bridge) installed"
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

echo ""
echo "Checking for connected devices..."
adb devices

echo ""
echo "Setting Learnora as Device Owner..."
adb shell dpm set-device-owner com.learnora.app/.plugins.KioskDeviceAdminReceiver

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "SUCCESS! Device Owner set successfully."
    echo "========================================"
    echo ""
    echo "Learnora can now:"
    echo "- Lock the device to the app (kiosk mode)"
    echo "- Disable status bar and notifications"
    echo "- Prevent app switching"
    echo "- Disable home button"
    echo ""
else
    echo ""
    echo "========================================"
    echo "ERROR: Failed to set Device Owner"
    echo "========================================"
    echo ""
    echo "Common solutions:"
    echo "1. Make sure no accounts are signed in on the device"
    echo "   (Settings > Accounts > Remove all accounts)"
    echo "2. Factory reset the device and try again"
    echo "3. Ensure the app is installed first"
    echo ""
fi

read -p "Press Enter to exit..."
