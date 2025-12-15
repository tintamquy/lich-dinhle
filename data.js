// Calendar Data for 2026 - From December 2025 to December 2026
// Quotes from Kinh Địa Tạng (Earth Store Sutra)
const calendarData = {
    months: [
        {
            month: 11, // December 2025
            year: 2025,
            name: "Tháng Mười Hai",
            quote: "Địa Tạng Bồ Tát bạch Phật: 'Thế Tôn! Chúng sanh trong cõi Diêm Phù Đề, khởi tâm động niệm, không có gì chẳng phải là nghiệp, không có gì chẳng phải là tội.'",
            source: "Kinh Địa Tạng Bồ Tát Bổn Nguyện - Phẩm thứ 4",
            theme: "snow",
            themeName: "Tuyết Rơi"
        },
        {
            month: 0, // January 2026 - Tết Nguyên Đán
            year: 2026,
            name: "Tháng Giêng",
            quote: "Địa Tạng Bồ Tát dạy: 'Nếu có chúng sanh nào, hoặc tạo tội, hoặc tạo phước, hoặc có nhân duyên, hoặc không có nhân duyên, ta đều dùng trăm ngàn phương tiện để độ thoát họ, khiến họ được giải thoát.'",
            source: "Kinh Địa Tạng Bồ Tát Bổn Nguyện - Phẩm thứ 2",
            theme: "cherry-blossom",
            themeName: "Hoa Đào",
            isTet: true // Tháng Tết
        },
        {
            month: 1, // February 2026
            year: 2026,
            name: "Tháng Hai",
            quote: "Địa Tạng Bồ Tát nói: 'Chúng sanh trong cõi Diêm Phù Đề, tánh tình cố chấp, tập khí ác nhiều, dù được khai hóa, nhưng vẫn tạo tội, tạo nghiệp nhiều hơn làm phước.'",
            source: "Kinh Địa Tạng Bồ Tát Bổn Nguyện - Phẩm thứ 6",
            theme: "plum-blossom",
            themeName: "Hoa Mai"
        },
        {
            month: 2, // March 2026
            year: 2026,
            name: "Tháng Ba",
            quote: "Địa Tạng Bồ Tát dạy: 'Nếu có người nào, hoặc nam, hoặc nữ, ở đời hiện tại, không làm việc lành, chỉ tạo ác nghiệp, thì khi chết, sẽ đọa vào địa ngục.'",
            source: "Kinh Địa Tạng Bồ Tát Bổn Nguyện - Phẩm thứ 3",
            theme: "spring-rain",
            themeName: "Mưa Xuân"
        },
        {
            month: 3, // April 2026
            year: 2026,
            name: "Tháng Tư",
            quote: "Địa Tạng Bồ Tát nói: 'Nếu có chúng sanh nào, ở đời hiện tại, hoặc đời vị lai, có thể ở trước tượng Phật, Bồ Tát, hoặc ở trước kinh tượng, đốt hương, cúng dường, thì sẽ được phước đức vô lượng.'",
            source: "Kinh Địa Tạng Bồ Tát Bổn Nguyện - Phẩm thứ 10",
            theme: "lotus",
            themeName: "Hoa Sen"
        },
        {
            month: 4, // May 2026
            year: 2026,
            name: "Tháng Năm",
            quote: "Địa Tạng Bồ Tát dạy: 'Nếu có chúng sanh nào, ở đời hiện tại, hoặc đời vị lai, có thể niệm danh hiệu Địa Tạng Bồ Tát, thì sẽ được phước đức vô lượng, vô biên.'",
            source: "Kinh Địa Tạng Bồ Tát Bổn Nguyện - Phẩm thứ 13",
            theme: "summer-sun",
            themeName: "Nắng Hè"
        },
        {
            month: 5, // June 2026
            year: 2026,
            name: "Tháng Sáu",
            quote: "Địa Tạng Bồ Tát nói: 'Nếu có chúng sanh nào, ở đời hiện tại, hoặc đời vị lai, có thể tụng đọc Kinh Địa Tạng, thì sẽ được phước đức vô lượng, vô biên.'",
            source: "Kinh Địa Tạng Bồ Tát Bổn Nguyện - Phẩm thứ 13",
            theme: "lotus",
            themeName: "Hoa Sen"
        },
        {
            month: 6, // July 2026
            year: 2026,
            name: "Tháng Bảy",
            quote: "Địa Tạng Bồ Tát dạy: 'Nếu có chúng sanh nào, ở đời hiện tại, hoặc đời vị lai, có thể cúng dường, tán thán, lễ bái Địa Tạng Bồ Tát, thì sẽ được phước đức vô lượng, vô biên.'",
            source: "Kinh Địa Tạng Bồ Tát Bổn Nguyện - Phẩm thứ 13",
            theme: "summer-sun",
            themeName: "Nắng Hè"
        },
        {
            month: 7, // August 2026
            year: 2026,
            name: "Tháng Tám",
            quote: "Địa Tạng Bồ Tát nói: 'Nếu có chúng sanh nào, ở đời hiện tại, hoặc đời vị lai, có thể phát tâm Bồ Đề, tu tập thiện pháp, thì sẽ được phước đức vô lượng, vô biên.'",
            source: "Kinh Địa Tạng Bồ Tát Bổn Nguyện - Phẩm thứ 13",
            theme: "autumn-leaves",
            themeName: "Lá Thu"
        },
        {
            month: 8, // September 2026
            year: 2026,
            name: "Tháng Chín",
            quote: "Địa Tạng Bồ Tát dạy: 'Nếu có chúng sanh nào, ở đời hiện tại, hoặc đời vị lai, có thể phóng sanh, cứu vật, thì sẽ được phước đức vô lượng, vô biên.'",
            source: "Kinh Địa Tạng Bồ Tát Bổn Nguyện - Phẩm thứ 13",
            theme: "autumn-moon",
            themeName: "Trăng Thu"
        },
        {
            month: 9, // October 2026
            year: 2026,
            name: "Tháng Mười",
            quote: "Địa Tạng Bồ Tát nói: 'Nếu có chúng sanh nào, ở đời hiện tại, hoặc đời vị lai, có thể bố thí, cúng dường, thì sẽ được phước đức vô lượng, vô biên.'",
            source: "Kinh Địa Tạng Bồ Tát Bổn Nguyện - Phẩm thứ 13",
            theme: "chrysanthemum",
            themeName: "Hoa Cúc"
        },
        {
            month: 10, // November 2026
            year: 2026,
            name: "Tháng Mười Một",
            quote: "Địa Tạng Bồ Tát dạy: 'Nếu có chúng sanh nào, ở đời hiện tại, hoặc đời vị lai, có thể giữ gìn giới luật, tu tập thiền định, thì sẽ được phước đức vô lượng, vô biên.'",
            source: "Kinh Địa Tạng Bồ Tát Bổn Nguyện - Phẩm thứ 13",
            theme: "winter-frost",
            themeName: "Sương Giá"
        },
        {
            month: 11, // December 2026
            year: 2026,
            name: "Tháng Mười Hai",
            quote: "Địa Tạng Bồ Tát nói: 'Nếu có chúng sanh nào, ở đời hiện tại, hoặc đời vị lai, có thể phát tâm Bồ Đề, tu tập Bồ Tát đạo, thì sẽ được phước đức vô lượng, vô biên.'",
            source: "Kinh Địa Tạng Bồ Tát Bổn Nguyện - Phẩm thứ 13",
            theme: "snow",
            themeName: "Tuyết Rơi"
        }
    ]
};

// Get current date
function getCurrentDate() {
    return new Date();
}

// Get current month index (0-12, where 0 is Dec 2025, 12 is Dec 2026)
function getCurrentMonthIndex() {
    const now = getCurrentDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // If we're in December 2025, return index 0
    if (currentYear === 2025 && currentMonth === 11) {
        return 0;
    }
    // If we're in 2026, return index based on month (1-12)
    if (currentYear === 2026) {
        return currentMonth + 1;
    }
    // Default to current month
    return currentMonth + 1;
}
