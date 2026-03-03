/**
 * Page Object Model for Android Settings App
 * Handles different manufacturer variations
 */

class SettingsPage {
    
    /**
     * Selectors - adjust based on your device
     */
    get searchButton() {
        return $('~Search settings');
    }
    
    get wifiOption() {
        // Try multiple selectors for different manufacturers
        return $('//android.widget.TextView[@text="Wi‑Fi"]');
    }
    
    get bluetoothOption() {
        return $('//android.widget.TextView[@text="Bluetooth"]');
    }
    
    get networkOption() {
        return $('//android.widget.TextView[@text="Network & internet"]');
    }
    
    get batteryOption() {
        return $('//android.widget.TextView[@text="Battery"]');
    }
    
    get displayOption() {
        return $('//android.widget.TextView[@text="Display"]');
    }
    
    get appsOption() {
        return $('//android.widget.TextView[@text="Apps"]');
    }
    
    /**
     * Actions
     */
    
    async openWifiSettings() {
        try {
            await this.wifiOption.waitForDisplayed({ timeout: 5000 });
            await this.wifiOption.click();
            await driver.pause(1000);
            console.log('✅ Opened WiFi settings');
        } catch (error) {
            console.log('❌ Could not find WiFi option');
            throw error;
        }
    }
    
    async openBluetoothSettings() {
        try {
            await this.bluetoothOption.waitForDisplayed({ timeout: 5000 });
            await this.bluetoothOption.click();
            await driver.pause(1000);
            console.log('✅ Opened Bluetooth settings');
        } catch (error) {
            console.log('❌ Could not find Bluetooth option');
            throw error;
        }
    }
    
    async searchSettings(query) {
        try {
            await this.searchButton.click();
            await driver.pause(500);
            
            // Type search query
            await driver.execute('mobile: shell', {
                command: `input text "${query}"`
            });
            
            await driver.pause(1000);
            console.log(`🔍 Searched for: ${query}`);
        } catch (error) {
            console.log('❌ Search failed');
            throw error;
        }
    }
    
    async scrollToOption(optionText) {
        const selector = `//android.widget.TextView[@text="${optionText}"]`;
        
        // Scroll down until element is found or max attempts reached
        let attempts = 0;
        const maxAttempts = 10;
        
        while (attempts < maxAttempts) {
            const element = await $(selector);
            const isDisplayed = await element.isDisplayed().catch(() => false);
            
            if (isDisplayed) {
                console.log(`✅ Found option: ${optionText}`);
                return element;
            }
            
            // Scroll down
            const { width, height } = await driver.getWindowSize();
            await driver.touchPerform([
                { action: 'press', options: { x: width / 2, y: height * 0.8 } },
                { action: 'wait', options: { ms: 300 } },
                { action: 'moveTo', options: { x: width / 2, y: height * 0.2 } },
                { action: 'release' }
            ]);
            
            await driver.pause(500);
            attempts++;
        }
        
        throw new Error(`Option "${optionText}" not found after ${maxAttempts} scroll attempts`);
    }
    
    async isOptionDisplayed(optionText) {
        const selector = `//android.widget.TextView[@text="${optionText}"]`;
        const element = await $(selector);
        return await element.isDisplayed().catch(() => false);
    }
    
    async goBack() {
        await driver.pressKeyCode(4); // KEYCODE_BACK
        await driver.pause(500);
    }
    
    async goHome() {
        await driver.pressKeyCode(3); // KEYCODE_HOME
        await driver.pause(500);
    }
}

export default new SettingsPage();
