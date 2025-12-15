// Vietnamese Lunar Calendar Converter
// Converts solar date to lunar date

const LUNAR_CALENDAR = {
    // Lunar calendar data for 2025-2026 (approximate conversion)
    // Format: {solar: 'YYYY-MM-DD', lunar: {day: D, month: M, year: Y, leap: false}}
    
    // Simplified conversion - for production, use a proper library
    convertToLunar(solarDate) {
        const year = solarDate.getFullYear();
        const month = solarDate.getMonth() + 1;
        const day = solarDate.getDate();
        
        // Base offset for 2025-2026
        // This is a simplified version - for accurate conversion, use a proper library
        const baseDate = new Date(2025, 0, 29); // Tết 2025
        const diffDays = Math.floor((solarDate - baseDate) / (1000 * 60 * 60 * 24));
        
        // Approximate lunar month length: 29.5 days
        let lunarDays = diffDays;
        let lunarMonth = 1;
        let lunarYear = year === 2025 ? 4723 : 4724; // Giáp Thìn 2024-2025, Ất Tỵ 2025-2026
        
        // Calculate lunar month and day
        while (lunarDays >= 29) {
            lunarDays -= 29;
            lunarMonth++;
            if (lunarMonth > 12) {
                lunarMonth = 1;
                lunarYear++;
            }
        }
        
        if (lunarDays < 0) {
            lunarMonth--;
            lunarDays += 29;
            if (lunarMonth < 1) {
                lunarMonth = 12;
                lunarYear--;
            }
        }
        
        const lunarDay = Math.floor(lunarDays) + 1;
        
        // Vietnamese month names
        const monthNames = [
            '', 'Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu',
            'Bảy', 'Tám', 'Chín', 'Mười', 'Mười Một', 'Chạp'
        ];
        
        // Special day names
        const dayNames = {
            1: 'Mùng 1',
            2: 'Mùng 2',
            3: 'Mùng 3',
            10: 'Mùng 10',
            15: 'Rằm',
            30: '30'
        };
        
        const dayName = dayNames[lunarDay] || lunarDay;
        const monthName = monthNames[lunarMonth] || lunarMonth;
        
        return {
            day: lunarDay,
            month: lunarMonth,
            year: lunarYear,
            dayName: dayName,
            monthName: monthName,
            fullName: `${dayName} tháng ${monthName}`
        };
    },
    
    // Get lunar date string for display
    getLunarDateString(solarDate) {
        const lunar = this.convertToLunar(solarDate);
        return lunar.fullName;
    },
    
    // Get short lunar date
    getShortLunarDate(solarDate) {
        const lunar = this.convertToLunar(solarDate);
        return `${lunar.dayName}/${lunar.month}`;
    }
};

