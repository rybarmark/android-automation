# Android Test Automation with Appium

Automated test suite for Android device testing using Appium + WebDriverIO.

## 📋 Features

- **Basic Tests**: App launch, device info, screen rotation
- **Connectivity Tests**: WiFi, Bluetooth, Airplane mode, network status
- **Camera Tests**: Launch camera, switch front/back
- **Sensor Tests**: Battery level, battery state
- **Performance Tests**: App launch time, scroll performance, app switching

## 🛠️ Prerequisites

### Required Software

1. **Node.js** (v18 or higher)
   - Download: https://nodejs.org/

2. **Android Studio**
   - Download: https://developer.android.com/studio
   - Install Android SDK Platform-Tools
   - Set environment variables:
     ```bash
     # macOS/Linux
     export ANDROID_HOME=$HOME/Library/Android/sdk
     export PATH=$PATH:$ANDROID_HOME/platform-tools
     export PATH=$PATH:$ANDROID_HOME/tools
     
     # Windows (PowerShell)
     $env:ANDROID_HOME = "C:\Users\YourName\AppData\Local\Android\sdk"
     $env:PATH += ";$env:ANDROID_HOME\platform-tools"
     ```

3. **Java JDK** (required by Appium)
   - Download: https://www.oracle.com/java/technologies/downloads/
   - Set `JAVA_HOME` environment variable

### Optional

- **Appium Inspector** (for finding UI elements)
  - Download: https://github.com/appium/appium-inspector/releases

## 🚀 Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd android-test-automation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Appium UiAutomator2 Driver

```bash
npx appium driver install uiautomator2
```

### 4. Verify Setup

```bash
npx appium-doctor --android
```

Fix any issues reported by appium-doctor before proceeding.

## 📱 Prepare Android Device/Emulator

### Option A: Android Emulator (Recommended for Testing)

1. Open Android Studio → **Device Manager**
2. Create new virtual device (e.g., Pixel 6, API 33)
3. Start the emulator
4. Verify it's running:
   ```bash
   adb devices
   ```

### Option B: Real Device

1. Enable **Developer Options** on your phone:
   - Settings → About Phone → Tap "Build Number" 7 times
2. Enable **USB Debugging**:
   - Settings → Developer Options → USB Debugging
3. Connect via USB
4. Accept debugging prompt on phone
5. Verify connection:
   ```bash
   adb devices
   ```

## ▶️ Running Tests

### Start Appium Server

In a separate terminal:

```bash
npm run appium
```

Keep this running while tests execute.

### Run All Tests

```bash
npm test
```

### Run Specific Test Suites

```bash
# Basic tests only
npm run test:basic

# Connectivity tests only
npm run test:connectivity

# Camera tests
npm run test:camera

# Sensor tests
npm run test:sensors

# Performance tests
npm run test:performance
```

### Run Single Test File

```bash
npx wdio run ./config/wdio.conf.js --spec ./tests/basic/launch.test.js
```

## 📁 Project Structure

```
android-test-automation/
├── config/
│   └── wdio.conf.js          # WebDriverIO configuration
├── tests/
│   ├── basic/
│   │   └── launch.test.js    # Basic app launch tests
│   ├── connectivity/
│   │   └── network.test.js   # WiFi, Bluetooth, Airplane mode
│   ├── camera/
│   │   └── camera.test.js    # Camera functionality
│   ├── sensors/
│   │   └── battery.test.js   # Battery and sensor tests
│   └── performance/
│       └── performance.test.js # Performance benchmarks
├── utils/
│   └── helpers.js            # Reusable helper functions
├── screenshots/              # Auto-saved on test failures
├── reports/                  # Test reports (future)
├── package.json
└── README.md
```

## 🧪 Writing New Tests

### Example Test

```javascript
import { takeScreenshot, getDeviceInfo } from '../../utils/helpers.js';

describe('My New Test Suite', () => {
    
    it('should do something', async () => {
        // Your test code here
        const deviceInfo = await getDeviceInfo();
        console.log(deviceInfo);
        
        expect(deviceInfo.platform).toBe('Android');
        
        await takeScreenshot('my_test');
    });
});
```

### Available Helper Functions

- `waitForElement(selector, timeout)` - Wait for element to appear
- `takeScreenshot(name)` - Save screenshot
- `scrollToElement(text)` - Scroll to element by text
- `scrollDown(percentage)` - Scroll down by percentage
- `getDeviceInfo()` - Get device manufacturer, model, etc.
- `getNetworkStatus()` - Get current network connection type
- `getBatteryInfo()` - Get battery level and state
- `setAirplaneMode(enable)` - Toggle airplane mode
- `openSettings(action)` - Open specific Settings screen
- `elementExists(selector)` - Check if element exists

See `utils/helpers.js` for full list.

## 🐛 Troubleshooting

### Appium server won't start
```bash
# Check if port 4723 is already in use
lsof -i :4723  # macOS/Linux
netstat -ano | findstr :4723  # Windows

# Kill the process if needed
```

### Device not detected
```bash
# Restart adb
adb kill-server
adb start-server
adb devices
```

### Tests failing with "Session not created"
- Make sure Appium server is running (`npm run appium`)
- Verify device/emulator is connected (`adb devices`)
- Check `platformVersion` in config matches your device

### Element not found errors
- Use Appium Inspector to find correct selectors
- Element IDs vary between manufacturers
- Add longer wait times for slow devices

## 📊 Test Reports

Screenshots from failed tests are automatically saved to `./screenshots/`

## 🔧 Configuration

Edit `config/wdio.conf.js` to customize:

- Device capabilities
- Test timeout values
- Reporters
- Appium server settings

### For Real Device

Change in `wdio.conf.js`:

```javascript
capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'Your Device Name',  // from adb devices
    'appium:platformVersion': '13',           // your Android version
    'appium:automationName': 'UiAutomator2',
    // ... rest of config
}]
```

## 🤝 Contributing

1. Write new test in appropriate directory
2. Use existing helpers from `utils/helpers.js`
3. Add screenshots for visual verification
4. Document any device-specific quirks

## 📝 Notes

- **Element selectors vary by manufacturer** - Samsung, Google, Xiaomi all use different IDs
- **Some tests require specific apps** - Camera tests need camera app installed
- **Performance tests** - Results vary greatly by device specs
- **Network tests** - May need special permissions on some devices

## 📞 Support

- Appium Docs: https://appium.io/docs/en/latest/
- WebDriverIO Docs: https://webdriver.io/
- Android Debug Bridge (adb): https://developer.android.com/tools/adb

---

**Built with 🔥 by Ember**
