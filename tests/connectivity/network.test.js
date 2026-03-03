import { getNetworkStatus, setAirplaneMode, openSettings, takeScreenshot } from '../../utils/helpers.js';

describe('Connectivity - Network Tests', () => {
    
    before(async () => {
        console.log('\n🌐 Running Network Connectivity Tests...');
    });

    it('should get current network status', async () => {
        const networkStatus = await getNetworkStatus();
        console.log('Network status:', networkStatus);
        
        expect(networkStatus).toHaveProperty('code');
        expect(networkStatus).toHaveProperty('type');
    });

    it('should enable airplane mode', async () => {
        await setAirplaneMode(true);
        const status = await getNetworkStatus();
        console.log('After enabling airplane mode:', status);
        
        expect(status.code).toBe(1);
        expect(status.type).toBe('Airplane Mode');
        
        await takeScreenshot('airplane_mode_on');
        await driver.pause(2000);
    });

    it('should disable airplane mode', async () => {
        await setAirplaneMode(false);
        const status = await getNetworkStatus();
        console.log('After disabling airplane mode:', status);
        
        expect(status.code).toBeGreaterThan(1);
        
        await takeScreenshot('airplane_mode_off');
        await driver.pause(2000);
    });

    it('should open WiFi settings', async () => {
        await openSettings('android.settings.WIFI_SETTINGS');
        await driver.pause(2000);
        
        const packageName = await driver.getCurrentPackage();
        expect(packageName).toContain('settings');
        
        await takeScreenshot('wifi_settings');
    });

    it('should open Bluetooth settings', async () => {
        await openSettings('android.settings.BLUETOOTH_SETTINGS');
        await driver.pause(2000);
        
        const packageName = await driver.getCurrentPackage();
        expect(packageName).toContain('settings');
        
        await takeScreenshot('bluetooth_settings');
    });

    it('should navigate back to home', async () => {
        await driver.pressKeyCode(3); // KEYCODE_HOME
        await driver.pause(1000);
    });

    after(async () => {
        // Ensure airplane mode is disabled after tests
        await setAirplaneMode(false);
    });
});
