export const config = {
    // Runner Configuration
    runner: 'local',
    
    // Appium server
    hostname: 'localhost',
    port: 4723,
    path: '/',
    
    // Test specs
    specs: [
        '../tests/**/*.test.js'
    ],
    
    // Patterns to exclude
    exclude: [],
    
    // Capabilities
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554',
        'appium:platformVersion': '16',
        'appium:automationName': 'UiAutomator2',
        // Use app package/activity instead of APK path for testing installed apps
        'appium:appPackage': 'com.android.settings',
        'appium:appActivity': '.Settings',
        'appium:noReset': true,
        'appium:fullReset': false,
        'appium:autoGrantPermissions': true
    }],
    
    // Test runner services
    services: [],
    
    // Framework
    framework: 'mocha',
    
    // Test reporters
    reporters: ['spec'],
    
    // Mocha options
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    
    // Logging
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    // Hooks
    before: async function (capabilities, specs) {
        console.log('🚀 Starting test session...');
    },
    
    after: async function (result, capabilities, specs) {
        console.log('✅ Test session completed');
    },
    
    beforeTest: async function (test, context) {
        console.log(`\n▶️  Running: ${test.title}`);
    },
    
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await driver.saveScreenshot(`./screenshots/FAIL_${test.title.replace(/\s/g, '_')}.png`);
        }
    }
}
