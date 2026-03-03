# Contributing Guide

## Adding New Tests

### 1. Choose the Right Category

Place your test in the appropriate directory:
- `tests/basic/` - Core functionality (launch, rotation, etc.)
- `tests/connectivity/` - Network, WiFi, Bluetooth
- `tests/camera/` - Camera functionality
- `tests/sensors/` - Battery, GPS, accelerometer, etc.
- `tests/performance/` - Speed, memory, benchmarks

### 2. Use Page Object Model (POM)

For complex UI interactions, create page objects:

**Example: `tests/pages/SettingsPage.js`**

```javascript
class SettingsPage {
    get searchButton() {
        return $('~Search settings');
    }
    
    get wifiOption() {
        return $('//android.widget.TextView[@text="Wi‑Fi"]');
    }
    
    async openWifiSettings() {
        await this.wifiOption.click();
    }
    
    async searchSettings(query) {
        await this.searchButton.click();
        await driver.pause(500);
        // Type search query...
    }
}

export default new SettingsPage();
```

**Use in tests:**

```javascript
import SettingsPage from '../pages/SettingsPage.js';

it('should open WiFi settings', async () => {
    await SettingsPage.openWifiSettings();
    // assertions...
});
```

### 3. Follow Naming Conventions

- Test files: `*.test.js`
- Page objects: `*Page.js`
- Helpers: descriptive names in `camelCase`

### 4. Use Helpers

Always check `utils/helpers.js` before writing utility code. Reuse existing functions.

### 5. Add Logging

```javascript
it('should do something', async () => {
    console.log('📱 Starting test...');
    // test code
    console.log('✅ Test completed');
});
```

### 6. Take Screenshots

Take screenshots for:
- Key UI states
- Failed tests (automatic)
- Before/after comparisons

```javascript
await takeScreenshot('before_action');
// do something
await takeScreenshot('after_action');
```

### 7. Handle Manufacturer Differences

Different Android manufacturers use different element IDs:

```javascript
// Try multiple selectors
let settingsButton;
try {
    settingsButton = await $('~Settings');
} catch {
    settingsButton = await $('//android.widget.Button[@text="Settings"]');
}
```

Or use helper:

```javascript
import { elementExists } from '../../utils/helpers.js';

if (await elementExists('~Settings')) {
    // Samsung approach
} else {
    // Google Pixel approach
}
```

### 8. Add Timeouts

Always use appropriate timeouts:

```javascript
await element.waitForDisplayed({ timeout: 5000 });
```

### 9. Clean Up After Tests

Use `after` hooks:

```javascript
describe('My Tests', () => {
    after(async () => {
        // Return to home screen
        await driver.pressKeyCode(3);
        
        // Reset any changed settings
        await setAirplaneMode(false);
    });
});
```

### 10. Document Device-Specific Issues

Add comments for quirks:

```javascript
it('should switch camera', async () => {
    // Note: Samsung devices use different button ID
    // Google Pixel: ~Switch camera
    // Samsung: com.samsung.android.app.camera:id/front_back_switch_button
    
    // Your test code...
});
```

## Best Practices

### ✅ DO

- Use descriptive test names
- Keep tests independent (no cross-test dependencies)
- Use helpers for common actions
- Log important steps
- Take screenshots for verification
- Handle async properly with `await`
- Clean up after tests

### ❌ DON'T

- Hard-code device-specific values
- Skip error handling
- Ignore manufacturer differences
- Write tests that depend on previous test state
- Leave test data/apps in bad state
- Use arbitrary `pause()` times - use `waitFor` instead

## Testing Your Tests

Before committing:

1. **Run locally**
   ```bash
   npm test
   ```

2. **Test on multiple devices** (if possible)
   - Emulator
   - Real device
   - Different Android versions

3. **Check screenshots folder**
   - Verify screenshots look correct

4. **Read the logs**
   - Make sure no unexpected errors

## Commit Guidelines

```
test: add WiFi toggle test

- Added test for enabling/disabling WiFi
- Handles Samsung and Google Pixel devices
- Takes screenshots before/after state change
```

## Questions?

Check existing tests for examples or ask in pull request comments.
