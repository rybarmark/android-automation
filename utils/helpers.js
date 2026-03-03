/**
 * Test Helpers and Utilities
 */

/**
 * Wait for element to be displayed
 * @param {string} selector - Element selector
 * @param {number} timeout - Timeout in ms (default: 10000)
 */
export async function waitForElement(selector, timeout = 10000) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
}

/**
 * Take screenshot with custom name
 * @param {string} name - Screenshot filename
 */
export async function takeScreenshot(name) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    await driver.saveScreenshot(`./screenshots/${name}_${timestamp}.png`);
    console.log(`📸 Screenshot saved: ${name}_${timestamp}.png`);
}

/**
 * Scroll to element by text
 * @param {string} text - Element text to scroll to
 */
export async function scrollToElement(text) {
    await driver.execute('mobile: scroll', {
        strategy: 'accessibility id',
        selector: text
    });
}

/**
 * Scroll down by percentage
 * @param {number} percentage - Scroll percentage (0-100)
 */
export async function scrollDown(percentage = 50) {
    const { width, height } = await driver.getWindowSize();
    const startY = height * 0.8;
    const endY = height * (1 - percentage / 100);
    
    await driver.touchPerform([
        { action: 'press', options: { x: width / 2, y: startY } },
        { action: 'wait', options: { ms: 500 } },
        { action: 'moveTo', options: { x: width / 2, y: endY } },
        { action: 'release' }
    ]);
}

/**
 * Get device information
 */
export async function getDeviceInfo() {
    const platform = await driver.capabilities.platformName;
    const version = await driver.capabilities.platformVersion;
    const deviceName = await driver.capabilities.deviceName;
    
    return {
        platform,
        version,
        deviceName,
        manufacturer: await driver.execute('mobile: shell', {
            command: 'getprop ro.product.manufacturer'
        }),
        model: await driver.execute('mobile: shell', {
            command: 'getprop ro.product.model'
        })
    };
}

/**
 * Get network connection type
 * Returns: 0=None, 1=Airplane, 2=Wifi, 4=Data, 6=All
 */
export async function getNetworkStatus() {
    const connection = await driver.getNetworkConnection();
    const types = {
        0: 'None',
        1: 'Airplane Mode',
        2: 'WiFi Only',
        4: 'Data Only',
        6: 'WiFi + Data'
    };
    return { code: connection, type: types[connection] || 'Unknown' };
}

/**
 * Get battery information
 */
export async function getBatteryInfo() {
    return await driver.execute('mobile: batteryInfo');
}

/**
 * Toggle airplane mode
 * @param {boolean} enable - true to enable, false to disable
 */
export async function setAirplaneMode(enable) {
    const targetState = enable ? 1 : 6; // 1 = airplane, 6 = all on
    await driver.setNetworkConnection(targetState);
    await driver.pause(2000); // Wait for state change
}

/**
 * Open Android settings
 * @param {string} action - Settings action (e.g., 'android.settings.WIFI_SETTINGS')
 */
export async function openSettings(action = 'android.settings.SETTINGS') {
    await driver.execute('mobile: shell', {
        command: `am start -a ${action}`
    });
    await driver.pause(1000);
}

/**
 * Press hardware button
 * @param {string} keyCode - Android key code (e.g., 'KEYCODE_HOME', 'KEYCODE_BACK')
 */
export async function pressKey(keyCode) {
    await driver.pressKeyCode(keyCode);
}

/**
 * Check if element exists
 * @param {string} selector - Element selector
 */
export async function elementExists(selector) {
    try {
        const element = await $(selector);
        return await element.isDisplayed();
    } catch (e) {
        return false;
    }
}

/**
 * Wait for condition with custom timeout
 * @param {Function} condition - Function that returns boolean
 * @param {number} timeout - Timeout in ms
 * @param {string} message - Error message if timeout
 */
export async function waitForCondition(condition, timeout = 10000, message = 'Condition not met') {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
        if (await condition()) {
            return true;
        }
        await driver.pause(500);
    }
    throw new Error(message);
}
