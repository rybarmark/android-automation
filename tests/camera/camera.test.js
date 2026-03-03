import { takeScreenshot, waitForElement } from '../../utils/helpers.js';

describe('Camera - Basic Tests', () => {
    
    before(async () => {
        console.log('\n📷 Running Camera Tests...');
    });

    it('should launch camera app', async () => {
        // Launch camera via intent
        await driver.execute('mobile: shell', {
            command: 'am start -a android.media.action.IMAGE_CAPTURE'
        });
        
        await driver.pause(3000); // Wait for camera to fully load
        
        const currentPackage = await driver.getCurrentPackage();
        console.log('Camera package:', currentPackage);
        
        // Should be a camera app (package name varies by manufacturer)
        expect(currentPackage).toMatch(/camera|gcam/i);
        
        await takeScreenshot('camera_launched');
    });

    it('should detect camera UI elements', async () => {
        // Try to find common camera UI elements
        // Note: Element IDs vary greatly between manufacturers
        
        const pageSource = await driver.getPageSource();
        const hasCameraElements = pageSource.includes('shutter') || 
                                  pageSource.includes('capture') ||
                                  pageSource.includes('photo');
        
        console.log('Camera UI detected:', hasCameraElements);
        expect(hasCameraElements).toBe(true);
    });

    it('should attempt to switch camera (front/back)', async () => {
        // Look for switch camera button
        // Common content descriptions: "Switch camera", "Switch to front camera"
        
        try {
            const switchButton = await $('~Switch camera');
            if (await switchButton.isDisplayed()) {
                await switchButton.click();
                console.log('✅ Switched camera');
                await driver.pause(2000);
                await takeScreenshot('camera_switched');
            }
        } catch (e) {
            console.log('ℹ️  Camera switch button not found (varies by device)');
        }
    });

    it('should close camera and return home', async () => {
        // Press back to close camera
        await driver.pressKeyCode(4); // KEYCODE_BACK
        await driver.pause(1000);
        
        // Press home
        await driver.pressKeyCode(3); // KEYCODE_HOME
        await driver.pause(1000);
        
        console.log('✅ Camera closed, returned to home');
    });

    after(async () => {
        // Ensure we're back at home screen
        await driver.pressKeyCode(3);
        await driver.pause(1000);
    });
});
