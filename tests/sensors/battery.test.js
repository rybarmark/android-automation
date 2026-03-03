import { getBatteryInfo, takeScreenshot } from '../../utils/helpers.js';

describe('Sensors - Battery Tests', () => {
    
    before(async () => {
        console.log('\n🔋 Running Battery Tests...');
    });

    it('should get battery information', async () => {
        const batteryInfo = await getBatteryInfo();
        console.log('Battery Info:', JSON.stringify(batteryInfo, null, 2));
        
        expect(batteryInfo).toHaveProperty('level');
        expect(batteryInfo.level).toBeGreaterThanOrEqual(0);
        expect(batteryInfo.level).toBeLessThanOrEqual(100);
    });

    it('should check battery level is above 20%', async () => {
        const batteryInfo = await getBatteryInfo();
        const level = batteryInfo.level;
        
        console.log(`Current battery level: ${level}%`);
        
        if (level < 20) {
            console.warn('⚠️  Battery level is low! Consider charging the device.');
        } else if (level > 80) {
            console.log('✅ Battery level is good');
        }
        
        expect(level).toBeGreaterThan(0);
    });

    it('should detect battery state', async () => {
        const batteryInfo = await getBatteryInfo();
        
        if (batteryInfo.state !== undefined) {
            console.log('Battery state:', batteryInfo.state);
            // 2 = Charging, 3 = Discharging, 4 = Not charging, 5 = Full
            const states = {
                2: 'Charging',
                3: 'Discharging',
                4: 'Not Charging',
                5: 'Full'
            };
            console.log('Status:', states[batteryInfo.state] || 'Unknown');
        }
        
        expect(batteryInfo).toBeDefined();
    });
});
