# Quick Setup Guide

## Step-by-Step Installation

### 1. Install Node.js

Download and install from: https://nodejs.org/ (v18 or higher)

Verify installation:
```bash
node --version
npm --version
```

### 2. Install Java JDK

Download from: https://www.oracle.com/java/technologies/downloads/

Verify installation:
```bash
java -version
```

### 3. Install Android Studio

Download from: https://developer.android.com/studio

During installation, make sure to install:
- Android SDK
- Android SDK Platform-Tools
- Android SDK Build-Tools
- At least one Android System Image (for emulator)

### 4. Set Environment Variables

#### macOS/Linux

Add to `~/.bashrc` or `~/.zshrc`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/emulator

export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-XX.jdk/Contents/Home
```

Then reload:
```bash
source ~/.bashrc  # or ~/.zshrc
```

#### Windows

1. Press Win + R, type `sysdm.cpl`, press Enter
2. Go to "Advanced" tab → "Environment Variables"
3. Add these system variables:

```
ANDROID_HOME = C:\Users\YourName\AppData\Local\Android\sdk
JAVA_HOME = C:\Program Files\Java\jdk-XX
```

4. Edit `Path` variable, add:
```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%ANDROID_HOME%\emulator
%JAVA_HOME%\bin
```

### 5. Create Android Emulator

1. Open Android Studio
2. Click "More Actions" → "Virtual Device Manager"
3. Click "Create Virtual Device"
4. Choose a device (e.g., Pixel 6)
5. Download and select a system image (e.g., Android 13 / API 33)
6. Click "Finish"

Start the emulator:
- From Android Studio: Click ▶️ on the device
- From terminal:
  ```bash
  emulator -avd Pixel_6_API_33
  ```

Verify emulator is running:
```bash
adb devices
```

You should see something like:
```
emulator-5554   device
```

### 6. Clone This Project

```bash
git clone <your-repo-url>
cd android-test-automation
```

### 7. Install Project Dependencies

```bash
npm install
```

This will install:
- WebDriverIO
- Appium
- All necessary drivers and plugins

### 8. Install Appium UiAutomator2 Driver

```bash
npx appium driver install uiautomator2
```

### 9. Verify Setup

```bash
# Install appium-doctor
npm install -g appium-doctor

# Run diagnostics
appium-doctor --android
```

Fix any ❌ errors before proceeding. Common issues:

- ANDROID_HOME not set → See step 4
- JAVA_HOME not set → See step 4
- adb not in PATH → See step 4
- emulator not in PATH → See step 4

### 10. Run Your First Test

In one terminal, start Appium:
```bash
npm run appium
```

In another terminal, run tests:
```bash
npm test
```

## Troubleshooting

### "appium: command not found"

```bash
# Try with npx
npx appium

# Or install globally
npm install -g appium
```

### "adb: command not found"

Your `ANDROID_HOME` is not set correctly. Verify:

```bash
echo $ANDROID_HOME  # macOS/Linux
echo %ANDROID_HOME%  # Windows
```

Should point to your Android SDK folder.

### "No devices detected"

```bash
# Restart adb
adb kill-server
adb start-server

# Check again
adb devices
```

If still nothing, make sure your emulator or device is actually running.

### Tests fail with "Session not started"

1. Make sure Appium server is running (`npm run appium`)
2. Make sure device/emulator is connected (`adb devices`)
3. Check `platformVersion` in `config/wdio.conf.js` matches your device

### Port 4723 already in use

```bash
# Find what's using port 4723
lsof -i :4723  # macOS/Linux
netstat -ano | findstr :4723  # Windows

# Kill the process, then restart Appium
```

## Next Steps

1. ✅ Run basic tests: `npm run test:basic`
2. ✅ Explore other test suites
3. ✅ Try Appium Inspector to find UI elements
4. ✅ Write your own tests!

## Useful Commands

```bash
# List all test suites
npm run

# Run specific test file
npx wdio run ./config/wdio.conf.js --spec ./tests/basic/launch.test.js

# Start Appium with debug logs
npx appium --log-level debug

# List connected devices
adb devices

# Restart adb
adb kill-server && adb start-server

# Install app to device
adb install path/to/app.apk

# Uninstall app from device
adb uninstall com.package.name

# Screen capture
adb shell screencap /sdcard/screen.png
adb pull /sdcard/screen.png

# Get device logs
adb logcat
```

## Resources

- [Appium Documentation](https://appium.io/docs/en/latest/)
- [WebDriverIO Documentation](https://webdriver.io/)
- [Android ADB Commands](https://developer.android.com/tools/adb)
- [Appium Inspector](https://github.com/appium/appium-inspector)

---

Need help? Check README.md or open an issue!
