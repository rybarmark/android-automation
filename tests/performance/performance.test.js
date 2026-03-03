import { getDeviceInfo, takeScreenshot, openSettings } from '../../utils/helpers.js';

describe('Performance - Basic Tests', () => {
    
    before(async () => {
        console.log('\n⚡ Running Performance Tests...');
    });

    it('should measure app launch time', async () => {
        const startTime = Date.now();
        
        await openSettings();
        
        const launchTime = Date.now() - startTime;
        console.log(`Settings app launch time: ${launchTime}ms`);
        
        expect(launchTime).toBeLessThan(5000); // Should launch within 5 seconds
    });

    it('should test screen orientation performance', async () => {
        const startTime = Date.now();
        
        await driver.setOrientation('LANDSCAPE');
        await driver.pause(500);
        await driver.setOrientation('PORTRAIT');
        
        const rotationTime = Date.now() - startTime;
        console.log(`Screen rotation time: ${rotationTime}ms`);
        
        expect(rotationTime).toBeLessThan(3000); // Should rotate within 3 seconds
    });

    it('should test app switching performance', async () => {
        const startTime = Date.now();
        
        // Open Settings
        await openSettings();
        await driver.pause(1000);
        
        // Switch to home
        await driver.pressKeyCode(3);
        await driver.pause(500);
        
        // Open recent apps
        await driver.pressKeyCode(187); // KEYCODE_APP_SWITCH
        await driver.pause(1000);
        
        // Back to home
        await driver.pressKeyCode(3);
        
        const switchTime = Date.now() - startTime;
        console.log(`App switching time: ${switchTime}ms`);
        
        expect(switchTime).toBeLessThan(5000);
        
        await takeScreenshot('performance_app_switch');
    });

    it('should get memory info (requires adb)', async () => {
        try {
            const memInfo = await driver.execute('mobile: shell', {
                command: 'dumpsys meminfo | grep "Total RAM"'
            });
            console.log('Memory info:', memInfo);
        } catch (e) {
            console.log('ℹ️  Memory info not available');
        }
    });

    it('should test scroll performance', async () => {
        await openSettings();
        await driver.pause(2000);
        
        const startTime = Date.now();
        const iterations = 5;
        
        for (let i = 0; i < iterations; i++) {
            const { width, height } = await driver.getWindowSize();
            await driver.touchPerform([
                { action: 'press', options: { x: width / 2, y: height * 0.8 } },
                { action: 'wait', options: { ms: 100 } },
                { action: 'moveTo', options: { x: width / 2, y: height * 0.2 } },
                { action: 'release' }
            ]);
            await driver.pause(300);
        }
        
        const scrollTime = Date.now() - startTime;
        const avgScrollTime = scrollTime / iterations;
        
        console.log(`Average scroll time: ${avgScrollTime}ms`);
        expect(avgScrollTime).toBeLessThan(1000);
    });

    after(async () => {
        await driver.pressKeyCode(3); // Home
        await driver.pause(1000);
    });
});
