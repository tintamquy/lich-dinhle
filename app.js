// Main Application
let currentMonthIndex = getCurrentMonthIndex();
let today = getCurrentDate();

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    loadMonth(currentMonthIndex);
});

// Initialize event listeners
function initEventListeners() {
    // Month navigation
    document.getElementById('prev-month').addEventListener('click', () => {
        if (currentMonthIndex > 0) {
            currentMonthIndex--;
            loadMonth(currentMonthIndex);
        }
    });

    document.getElementById('next-month').addEventListener('click', () => {
        if (currentMonthIndex < calendarData.months.length - 1) {
            currentMonthIndex++;
            loadMonth(currentMonthIndex);
        }
    });

    // Month selector buttons
    document.querySelectorAll('.month-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const month = parseInt(e.target.dataset.month);
            if (month !== currentMonthIndex) {
                currentMonthIndex = month;
                loadMonth(currentMonthIndex);
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentMonthIndex > 0) {
            currentMonthIndex--;
            loadMonth(currentMonthIndex);
        } else if (e.key === 'ArrowRight' && currentMonthIndex < calendarData.months.length - 1) {
            currentMonthIndex++;
            loadMonth(currentMonthIndex);
        }
    });
}

// Load month data and render calendar
function loadMonth(monthIndex) {
    const monthData = calendarData.months[monthIndex];
    if (!monthData) return;

    // Update month name and year
    document.getElementById('current-month-name').textContent = monthData.name;
    document.getElementById('current-year').textContent = monthData.year;

    // Update navigation buttons
    document.getElementById('prev-month').disabled = monthIndex === 0;
    document.getElementById('next-month').disabled = monthIndex === calendarData.months.length - 1;

    // Update active month button
    document.querySelectorAll('.month-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index === monthIndex);
    });

    // Render calendar
    renderCalendar(monthData);

    // Update theme
    updateTheme(monthData);

    // Update quote
    updateQuote(monthData);
}

// Render calendar grid
function renderCalendar(monthData) {
    const container = document.getElementById('calendar-grid');
    container.innerHTML = '';

    const year = monthData.year;
    const month = monthData.month;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Get previous month's last day
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

    // Check if this is the current month
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    const todayDate = today.getDate();

    // Add days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const dayDiv = createDayElement(day, true, false, false);
        container.appendChild(dayDiv);
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = isCurrentMonth && day === todayDate;
        const dayDiv = createDayElement(day, false, isToday, false);
        container.appendChild(dayDiv);
    }

    // Add days from next month to fill the grid
    const totalCells = container.children.length;
    const remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayDiv = createDayElement(day, false, false, true);
        container.appendChild(dayDiv);
    }
}

// Create day element
function createDayElement(day, isPrevMonth, isToday, isNextMonth) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    dayDiv.textContent = day;

    if (isPrevMonth || isNextMonth) {
        dayDiv.classList.add('other-month');
    }

    if (isToday) {
        dayDiv.classList.add('today');
    }

    return dayDiv;
}

// Update theme
function updateTheme(monthData) {
    const themeDisplay = document.getElementById('theme-display');
    const themeAnimation = document.getElementById('theme-animation');
    
    // Remove all theme classes
    themeDisplay.className = 'theme-display';
    
    // Add current theme class
    themeDisplay.classList.add(`theme-${monthData.theme}`);
    
    // Add animation based on theme
    themeAnimation.innerHTML = '';
    if (monthData.theme === 'snow') {
        createSnowEffect(themeAnimation);
    } else if (monthData.theme === 'cherry-blossom') {
        createCherryBlossomEffect(themeAnimation);
    } else if (monthData.theme === 'plum-blossom') {
        createPlumBlossomEffect(themeAnimation);
    }
}

// Create snow effect
function createSnowEffect(container) {
    for (let i = 0; i < 20; i++) {
        const snowflake = document.createElement('div');
        snowflake.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 3}px;
            height: ${snowflake.style.width};
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.5};
            animation: fall ${Math.random() * 3 + 2}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(snowflake);
    }
    
    // Add fall animation
    if (!document.getElementById('snow-animation-style')) {
        const style = document.createElement('style');
        style.id = 'snow-animation-style';
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(200px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Create cherry blossom effect
function createCherryBlossomEffect(container) {
    for (let i = 0; i < 15; i++) {
        const blossom = document.createElement('div');
        blossom.textContent = '🌸';
        blossom.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-blossom ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(blossom);
    }
}

// Create plum blossom effect
function createPlumBlossomEffect(container) {
    for (let i = 0; i < 12; i++) {
        const blossom = document.createElement('div');
        blossom.textContent = '🌺';
        blossom.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-blossom ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(blossom);
    }
}

// Update quote
function updateQuote(monthData) {
    document.getElementById('quote-text').textContent = monthData.quote;
    document.getElementById('quote-source').textContent = monthData.source;
}
