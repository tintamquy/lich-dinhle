// Main Application
let currentMonthIndex = getCurrentMonthIndex();
let today = getCurrentDate();
let animationInterval = null;
let monthEvents = {};
let showEvents = true; // Default: show events
let currentLanguage = 'vi'; // Current language code

// Load settings from localStorage
function loadSettings() {
    const saved = localStorage.getItem('calendarSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        showEvents = settings.showEvents !== false; // Default true
    }
    updateEventToggleUI();
}

// Save settings to localStorage
function saveSettings() {
    localStorage.setItem('calendarSettings', JSON.stringify({
        showEvents: showEvents
    }));
}

// Update toggle button UI
function updateEventToggleUI() {
    const toggleBtn = document.getElementById('toggle-events');
    if (toggleBtn) {
        toggleBtn.classList.toggle('active', showEvents);
        toggleBtn.setAttribute('aria-pressed', showEvents);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    initEventListeners();
    loadMonth(currentMonthIndex);
    createWatercolorEffect();
    initGallery();
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

    // Toggle events button
    const toggleEventsBtn = document.getElementById('toggle-events');
    if (toggleEventsBtn) {
        toggleEventsBtn.addEventListener('click', () => {
            showEvents = !showEvents;
            saveSettings();
            updateEventToggleUI();
            // Re-render calendar to update event visibility
            const monthData = calendarData.months[currentMonthIndex];
            if (monthData) {
                renderCalendar(monthData);
            }
        });
    }

    // Gallery modal event listeners
    initGalleryModal();
}

// Initialize Gallery Modal
function initGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    const closeBtn = document.getElementById('modal-close');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeGalleryModal);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateGallery(-1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateGallery(1));
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeGalleryModal();
            }
        });
    }

    // Keyboard navigation for gallery
    document.addEventListener('keydown', (e) => {
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeGalleryModal();
            } else if (e.key === 'ArrowLeft') {
                navigateGallery(-1);
            } else if (e.key === 'ArrowRight') {
                navigateGallery(1);
            }
        }
    });
}

// Load month data and render calendar
async function loadMonth(monthIndex) {
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

    // Load events for this month
    monthEvents = await API_SERVICE.getMonthEvents(monthData.year, monthData.month);

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
        const dayDiv = createDayElement(day, true, false, false, null, null);
        container.appendChild(dayDiv);
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = isCurrentMonth && day === todayDate;
        const dayEvents = monthEvents[day] || null;
        const solarDate = new Date(year, month, day);
        const dayDiv = createDayElement(day, false, isToday, false, dayEvents, solarDate);
        container.appendChild(dayDiv);
    }

    // Add days from next month to fill the grid
    const totalCells = container.children.length;
    const remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayDiv = createDayElement(day, false, false, true, null, null);
        container.appendChild(dayDiv);
    }
}

// Create day element with events
function createDayElement(day, isPrevMonth, isToday, isNextMonth, events, solarDate) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    
    const dayNumber = document.createElement('span');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day;
    dayDiv.appendChild(dayNumber);
    
    // Add lunar date
    if (solarDate && !isPrevMonth && !isNextMonth) {
        const lunarDate = LUNAR_CALENDAR.getShortLunarDate(solarDate);
        
        const lunarSpan = document.createElement('span');
        lunarSpan.className = 'lunar-date';
        lunarSpan.textContent = lunarDate;
        dayDiv.appendChild(lunarSpan);
    }

    if (isPrevMonth || isNextMonth) {
        dayDiv.classList.add('other-month');
    }

    if (isToday) {
        dayDiv.classList.add('today');
    }

    // Add event indicator (only if showEvents is true)
    if (events && events.length > 0 && showEvents) {
        const eventIndicator = document.createElement('div');
        eventIndicator.className = 'event-indicator';
        eventIndicator.title = events.map(e => e.name).join(', ');
        
        // Add event dots
        events.forEach((event, index) => {
            const dot = document.createElement('span');
            dot.className = `event-dot event-${event.type}`;
            eventIndicator.appendChild(dot);
        });
        
        dayDiv.appendChild(eventIndicator);
        dayDiv.classList.add('has-events');
        
        // Add click to show event details
        dayDiv.addEventListener('click', () => showEventDetails(day, events));
    } else if (events && events.length > 0) {
        // Events exist but hidden - still add class for styling but no indicator
        dayDiv.classList.add('has-events-hidden');
        dayDiv.addEventListener('click', () => showEventDetails(day, events));
    }

    // Add hover animation
    dayDiv.addEventListener('mouseenter', () => {
        dayDiv.style.transform = 'translateY(-4px) scale(1.05)';
    });
    
    dayDiv.addEventListener('mouseleave', () => {
        if (!isToday) {
            dayDiv.style.transform = '';
        }
    });

    return dayDiv;
}

// Show event details
function showEventDetails(day, events) {
    // Create or update event tooltip
    let tooltip = document.getElementById('event-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'event-tooltip';
        document.body.appendChild(tooltip);
    }
    
    const eventList = events.map(e => 
        `<div class="event-item event-${e.type}">
            <strong>${e.name}</strong>
            <span>${e.description || ''}</span>
        </div>`
    ).join('');
    
    tooltip.innerHTML = `
        <div class="tooltip-header">Ngày ${day}</div>
        <div class="tooltip-events">${eventList}</div>
    `;
    
    tooltip.classList.add('show');
    
    // Position tooltip
    const dayElement = event.target.closest('.calendar-day');
    if (dayElement) {
        const rect = dayElement.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    }
    
    // Hide after 5 seconds
    setTimeout(() => {
        tooltip.classList.remove('show');
    }, 5000);
}

// Update hero background with factory image
function updateHeroBackground(monthData) {
    const heroBackground = document.getElementById('hero-background');
    if (!heroBackground) return;
    
    // Remove all theme classes
    heroBackground.className = 'hero-background';
    heroBackground.classList.add(`theme-${monthData.theme}`);
    
    // Set background image if available
    if (monthData.backgroundImage) {
        heroBackground.style.backgroundImage = `url('${monthData.backgroundImage}')`;
        heroBackground.style.backgroundSize = 'cover';
        heroBackground.style.backgroundPosition = 'center';
        heroBackground.style.filter = 'blur(8px) brightness(0.7)';
        heroBackground.style.opacity = '0.4';
    }
}

// Create beautiful floating particles effect
function createWatercolorEffect() {
    const container = document.createElement('div');
    container.id = 'floating-particles';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(container);
    
    // Create floating particles
    const particleCount = 30;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const size = Math.random() * 100 + 50;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            background: radial-gradient(circle, rgba(0, 127, 255, 0.15) 0%, rgba(0, 191, 255, 0.05) 50%, transparent 100%);
            border-radius: 50%;
            filter: blur(20px);
            animation: float-particle ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(particle);
        particles.push(particle);
    }
    
    // Add CSS animation
    if (!document.getElementById('particle-animations')) {
        const style = document.createElement('style');
        style.id = 'particle-animations';
        style.textContent = `
            @keyframes float-particle {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.3;
                }
                25% {
                    transform: translate(30px, -30px) scale(1.1);
                    opacity: 0.5;
                }
                50% {
                    transform: translate(-20px, -50px) scale(0.9);
                    opacity: 0.4;
                }
                75% {
                    transform: translate(-30px, 20px) scale(1.05);
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create animated gradient waves
    const waveContainer = document.createElement('div');
    waveContainer.className = 'gradient-waves';
    waveContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.2;
        background: linear-gradient(
            135deg,
            rgba(0, 127, 255, 0.1) 0%,
            rgba(0, 191, 255, 0.1) 25%,
            rgba(135, 206, 235, 0.1) 50%,
            rgba(0, 191, 255, 0.1) 75%,
            rgba(0, 127, 255, 0.1) 100%
        );
        background-size: 400% 400%;
        animation: gradient-wave 15s ease infinite;
    `;
    document.body.appendChild(waveContainer);
    
    // Add gradient wave animation
    if (!document.getElementById('gradient-wave-animation')) {
        const style = document.createElement('style');
        style.id = 'gradient-wave-animation';
        style.textContent = `
            @keyframes gradient-wave {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
    }
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
                
                setTimeout(() => {
                    if (petal.parentNode) {
                        petal.remove();
                    }
                }, 8000);
            }, i * 200);
        }
    }
    
    createPetals();
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

// Initialize Gallery
function initGallery() {
    const gallery = document.getElementById('factory-gallery');
    if (!gallery) return;

    gallery.innerHTML = '';

    factoryGallery.images.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.title;
        img.loading = 'lazy';
        img.onerror = () => {
            galleryItem.style.display = 'none';
        };

        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        
        const title = document.createElement('div');
        title.className = 'gallery-title';
        title.textContent = image.title;

        overlay.appendChild(title);
        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);

        galleryItem.addEventListener('click', () => openGalleryModal(index));
        gallery.appendChild(galleryItem);
    });
}

// Gallery Modal
let currentGalleryIndex = 0;

function openGalleryModal(index) {
    currentGalleryIndex = index;
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const image = factoryGallery.images[index];

    modalImage.src = image.src;
    modalTitle.textContent = image.title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateGallery(direction) {
    currentGalleryIndex += direction;
    
    if (currentGalleryIndex < 0) {
        currentGalleryIndex = factoryGallery.images.length - 1;
    } else if (currentGalleryIndex >= factoryGallery.images.length) {
        currentGalleryIndex = 0;
    }
    
    const image = factoryGallery.images[currentGalleryIndex];
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    
    modalImage.src = image.src;
    modalTitle.textContent = image.title;
}

