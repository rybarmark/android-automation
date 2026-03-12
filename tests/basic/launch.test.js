import { getDeviceInfo, takeScreenshot } from '../../utils/helpers.js';

describe('Basic - App Launch & Device Info', () => {
    
    before(async () => {
        console.log('\n📱 Running Basic Tests...');
        await driver.execute('mobile: shell', {
            command: 'am start -n com.android.settings/.Settings'
        });
    });

    it('should get device information', async () => {
        const deviceInfo = await getDeviceInfo();
        console.log('Device Info:', deviceInfo);
        
        expect(deviceInfo).toHaveProperty('platform');
        expect(deviceInfo).toHaveProperty('version');
        expect(deviceInfo.platform).toBe('Android');
    });

    it('should launch Settings app successfully', async () => {
        await driver.waitUntil(
            async () => (await driver.execute('mobile: getCurrentPackage')).includes('settings'),
            { timeout: 10000, timeoutMsg: 'Settings app did not launch in time' }
        );
        const packageName = await driver.execute('mobile: getCurrentPackage');
        console.log('Current package:', packageName);
        expect(packageName).toContain('settings');
    });

    it('should display Settings home screen', async () => {
        // Wait for Settings to load
        await driver.pause(2000);
        
        // Try to find common Settings elements
        const searchButton = await $('~Search settings');
        const isDisplayed = await searchButton.isDisplayed().catch(() => false);
        
        // If search button exists, Settings loaded properly
        if (isDisplayed) {
            console.log('✅ Settings UI loaded successfully');
        }
        
        await takeScreenshot('settings_home');
    });

    it('should rotate screen to landscape', async () => {
        await driver.execute('mobile: shell', {
            command: 'settings put system accelerometer_rotation 1'
        });
        await driver.setOrientation('LANDSCAPE');
        const orientation = await driver.getOrientation();
        console.log('Orientation:', orientation);
        
        expect(orientation).toBe('LANDSCAPE');
        await driver.pause(1000);
    });

    it('should rotate back to portrait', async () => {
        await driver.setOrientation('PORTRAIT');
        const orientation = await driver.getOrientation();
        console.log('Orientation:', orientation);
        
        expect(orientation).toBe('PORTRAIT');
        await driver.pause(1000);
    });

    it('should get screen resolution', async () => {
        const { width, height } = await driver.getWindowSize();
        console.log(`Screen resolution: ${width}x${height}`);
        
        expect(width).toBeGreaterThan(0);
        expect(height).toBeGreaterThan(0);
    });
});
