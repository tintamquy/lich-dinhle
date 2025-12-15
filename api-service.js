// API Service for Special Days and Events
// Using free APIs and fallback data

const API_SERVICE = {
    // Get special events for a specific date
    async getSpecialEvents(year, month, day) {
        try {
            // Try to get from date.nager.at API (free, no key required)
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            // For Vietnam holidays
            const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/VN`);
            if (response.ok) {
                const holidays = await response.json();
                const dayHolidays = holidays.filter(h => {
                    const holidayDate = new Date(h.date);
                    return holidayDate.getMonth() === month && holidayDate.getDate() === day;
                });
                
                if (dayHolidays.length > 0) {
                    return dayHolidays.map(h => ({
                        name: h.localName || h.name,
                        type: 'holiday',
                        description: h.name
                    }));
                }
            }
        } catch (error) {
            console.log('API error, using fallback data:', error);
        }
        
        // Fallback to local data
        return this.getLocalSpecialEvents(year, month, day);
    },
    
    // Local fallback data for Vietnamese holidays and special days
    getLocalSpecialEvents(year, month, day) {
        const events = [];
        const monthDay = `${month + 1}-${day}`;
        
        // Vietnamese Holidays 2026
        const vietnameseHolidays = {
            '1-1': [{ name: 'Tết Dương lịch', type: 'holiday', description: 'Năm mới' }],
            '1-28': [{ name: 'Tết Nguyên Đán', type: 'holiday', description: 'Năm mới Âm lịch' }],
            '1-29': [{ name: 'Tết Nguyên Đán', type: 'holiday', description: 'Năm mới Âm lịch' }],
            '1-30': [{ name: 'Tết Nguyên Đán', type: 'holiday', description: 'Năm mới Âm lịch' }],
            '4-10': [{ name: 'Giỗ Tổ Hùng Vương', type: 'holiday', description: 'Lễ hội đền Hùng' }],
            '4-30': [{ name: 'Ngày Giải phóng miền Nam', type: 'holiday', description: 'Thống nhất đất nước' }],
            '5-1': [{ name: 'Ngày Quốc tế Lao động', type: 'holiday', description: 'Ngày lễ lao động' }],
            '9-2': [{ name: 'Quốc khánh', type: 'holiday', description: 'Ngày độc lập' }],
            '12-25': [{ name: 'Giáng Sinh', type: 'holiday', description: 'Lễ Giáng Sinh' }]
        };
        
        if (vietnameseHolidays[monthDay]) {
            events.push(...vietnameseHolidays[monthDay]);
        }
        
        // Buddhist special days (approximate)
        const buddhistDays = {
            '1-15': [{ name: 'Rằm tháng Giêng', type: 'buddhist', description: 'Lễ hội Phật giáo' }],
            '2-15': [{ name: 'Rằm tháng Hai', type: 'buddhist', description: 'Lễ hội Phật giáo' }],
            '3-15': [{ name: 'Rằm tháng Ba', type: 'buddhist', description: 'Lễ hội Phật giáo' }],
            '4-15': [{ name: 'Rằm tháng Tư', type: 'buddhist', description: 'Lễ Phật Đản' }],
            '5-15': [{ name: 'Rằm tháng Năm', type: 'buddhist', description: 'Lễ hội Phật giáo' }],
            '6-15': [{ name: 'Rằm tháng Sáu', type: 'buddhist', description: 'Lễ hội Phật giáo' }],
            '7-15': [{ name: 'Rằm tháng Bảy', type: 'buddhist', description: 'Lễ Vu Lan' }],
            '8-15': [{ name: 'Rằm tháng Tám', type: 'buddhist', description: 'Lễ hội Phật giáo' }],
            '9-15': [{ name: 'Rằm tháng Chín', type: 'buddhist', description: 'Lễ hội Phật giáo' }],
            '10-15': [{ name: 'Rằm tháng Mười', type: 'buddhist', description: 'Lễ hội Phật giáo' }],
            '11-15': [{ name: 'Rằm tháng Mười Một', type: 'buddhist', description: 'Lễ hội Phật giáo' }],
            '12-15': [{ name: 'Rằm tháng Chạp', type: 'buddhist', description: 'Lễ hội Phật giáo' }]
        };
        
        if (buddhistDays[monthDay]) {
            events.push(...buddhistDays[monthDay]);
        }
        
        return events;
    },
    
    // Get events for entire month
    async getMonthEvents(year, month) {
        const events = {};
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEvents = await this.getSpecialEvents(year, month, day);
            if (dayEvents.length > 0) {
                events[day] = dayEvents;
            }
        }
        
        return events;
    }
};

