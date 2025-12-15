// Main Application
let currentMonthIndex = getCurrentMonthIndex();
let today = getCurrentDate();
let animationInterval = null;

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

    // Update theme and background
    updateTheme(monthData);
    updateHeroBackground(monthData);

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

// Update hero background based on theme
function updateHeroBackground(monthData) {
    const heroBackground = document.getElementById('hero-background');
    if (!heroBackground) return;
    
    // Remove all theme classes
    heroBackground.className = 'hero-background';
    heroBackground.classList.add(`theme-${monthData.theme}`);
}

// Update theme
function updateTheme(monthData) {
    const themeContainer = document.getElementById('theme-animation-container');
    const themeAnimation = document.getElementById('theme-animation');
    
    if (!themeContainer || !themeAnimation) return;
    
    // Clear previous animations
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
    
    // Remove all theme classes
    themeContainer.className = 'theme-animation-container';
    themeAnimation.className = 'theme-animation';
    
    // Add current theme class
    themeContainer.classList.add(`theme-${monthData.theme}`);
    themeAnimation.classList.add(`theme-${monthData.theme}`);
    
    // Clear and add animation based on theme
    themeAnimation.innerHTML = '';
    
    if (monthData.theme === 'snow') {
        createSnowEffect(themeAnimation);
    } else if (monthData.theme === 'cherry-blossom' || monthData.isTet) {
        createCherryBlossomFallingEffect(themeAnimation);
    } else if (monthData.theme === 'plum-blossom') {
        createPlumBlossomEffect(themeAnimation);
    } else if (monthData.theme === 'spring-rain') {
        createRainEffect(themeAnimation);
    } else if (monthData.theme === 'lotus') {
        createLotusEffect(themeAnimation);
    } else if (monthData.theme === 'summer-sun') {
        createSunEffect(themeAnimation);
    } else if (monthData.theme === 'autumn-leaves') {
        createAutumnLeavesEffect(themeAnimation);
    } else if (monthData.theme === 'autumn-moon') {
        createMoonEffect(themeAnimation);
    } else if (monthData.theme === 'chrysanthemum') {
        createChrysanthemumEffect(themeAnimation);
    } else if (monthData.theme === 'winter-frost') {
        createFrostEffect(themeAnimation);
    }
}

// Create cherry blossom falling effect (for Tet month)
function createCherryBlossomFallingEffect(container) {
    // Create continuous falling petals
    function createPetals() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const petal = document.createElement('div');
                petal.className = 'cherry-petal';
                petal.style.left = Math.random() * 100 + '%';
                petal.style.animationDuration = (Math.random() * 3 + 4) + 's';
                petal.style.animationDelay = Math.random() * 1 + 's';
                petal.style.opacity = Math.random() * 0.5 + 0.5;
                container.appendChild(petal);
                
                // Remove after animation
                setTimeout(() => {
                    if (petal.parentNode) {
                        petal.remove();
                    }
                }, 8000);
            }, i * 200);
        }
    }
    
    // Initial petals
    createPetals();
    
    // Create new petals every 2 seconds
    animationInterval = setInterval(createPetals, 2000);
}

// Create snow effect
function createSnowEffect(container) {
    for (let i = 0; i < 30; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 3 + 3) + 's';
        snowflake.style.animationDelay = Math.random() * 2 + 's';
        snowflake.style.opacity = Math.random() * 0.5 + 0.5;
        container.appendChild(snowflake);
    }
}

// Create plum blossom effect
function createPlumBlossomEffect(container) {
    for (let i = 0; i < 15; i++) {
        const blossom = document.createElement('div');
        blossom.className = 'plum-blossom';
        blossom.textContent = '🌺';
        blossom.style.left = Math.random() * 100 + '%';
        blossom.style.top = Math.random() * 100 + '%';
        blossom.style.fontSize = (Math.random() * 20 + 15) + 'px';
        blossom.style.animationDuration = (Math.random() * 3 + 2) + 's';
        blossom.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(blossom);
    }
}

// Create rain effect
function createRainEffect(container) {
    for (let i = 0; i < 20; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 0.5 + 0.3) + 's';
        drop.style.animationDelay = Math.random() * 1 + 's';
        container.appendChild(drop);
    }
}

// Create lotus effect
function createLotusEffect(container) {
    const lotus = document.createElement('div');
    lotus.className = 'lotus-symbol';
    lotus.textContent = '☸';
    lotus.style.fontSize = '6rem';
    lotus.style.opacity = '0.2';
    container.appendChild(lotus);
}

// Create sun effect
function createSunEffect(container) {
    const sun = document.createElement('div');
    sun.className = 'sun';
    container.appendChild(sun);
}

// Create autumn leaves effect
function createAutumnLeavesEffect(container) {
    for (let i = 0; i < 10; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'autumn-leaf';
        leaf.textContent = '🍂';
        leaf.style.left = Math.random() * 100 + '%';
        leaf.style.animationDuration = (Math.random() * 3 + 3) + 's';
        leaf.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(leaf);
    }
}

// Create moon effect
function createMoonEffect(container) {
    const moon = document.createElement('div');
    moon.className = 'moon';
    container.appendChild(moon);
}

// Create chrysanthemum effect
function createChrysanthemumEffect(container) {
    for (let i = 0; i < 8; i++) {
        const flower = document.createElement('div');
        flower.className = 'chrysanthemum';
        flower.textContent = '🌼';
        flower.style.left = Math.random() * 100 + '%';
        flower.style.top = Math.random() * 100 + '%';
        flower.style.fontSize = (Math.random() * 15 + 20) + 'px';
        container.appendChild(flower);
    }
}

// Create frost effect
function createFrostEffect(container) {
    const frost = document.createElement('div');
    frost.className = 'frost-pattern';
    container.appendChild(frost);
}

// Update quote
function updateQuote(monthData) {
    document.getElementById('quote-text').textContent = monthData.quote;
    document.getElementById('quote-source').textContent = monthData.source;
}
