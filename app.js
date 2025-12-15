// Main Application
let currentLanguage = 'vi';
let currentMonthIndex = getCurrentMonth();
let scene, camera, renderer, controls;
let calendarPages = [];
let isFlipping = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    try {
        initThreeJS();
        initEventListeners();
        loadMonth(currentMonthIndex);
        createParticleBackground();
        
        // Hide loading screen after resources are loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                }
            }, 1000);
        });
    } catch (error) {
        console.error('Error initializing application:', error);
        showError('Có lỗi xảy ra khi khởi tạo ứng dụng. Vui lòng tải lại trang.');
    }
});

// Error handling function
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: #ff4444; color: white; padding: 15px 30px; border-radius: 10px; z-index: 10001; box-shadow: 0 4px 15px rgba(0,0,0,0.3);';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
}

// Initialize Three.js Scene
function initThreeJS() {
    const container = document.getElementById('calendar-canvas');
    if (!container) {
        throw new Error('Calendar container not found');
    }
    
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        throw new Error('Three.js library not loaded');
    }

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('calendar-canvas'),
        antialias: true,
        alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create calendar pages
    createCalendarPages();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

// Create calendar pages
function createCalendarPages() {
    const pageGeometry = new THREE.PlaneGeometry(2, 2.8);
    
    for (let i = 0; i < 12; i++) {
        const pageData = calendarData[currentLanguage].months[i];
        const texture = createPageTexture(pageData, i);
        const material = new THREE.MeshLambertMaterial({ map: texture });
        const page = new THREE.Mesh(pageGeometry, material);
        
        page.position.x = (i - 6) * 2.2;
        page.position.y = 0;
        page.rotation.y = (i === currentMonthIndex) ? 0 : Math.PI / 2;
        page.userData = { monthIndex: i, isFlipped: false };
        
        // Add shadow
        page.receiveShadow = true;
        page.castShadow = true;
        
        calendarPages.push(page);
        scene.add(page);
    }
    
    // Position camera to show current month
    updateCameraPosition();
}

// Create page texture
function createPageTexture(pageData, monthIndex) {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1120;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#f5f7fa');
    gradient.addColorStop(1, '#c3cfe2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Month name
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 60px "Playfair Display", serif';
    ctx.textAlign = 'center';
    ctx.fillText(pageData.name, canvas.width / 2, 100);

    // Quote
    ctx.fillStyle = '#555';
    ctx.font = 'italic 28px "Noto Sans", sans-serif';
    ctx.textAlign = 'center';
    const quoteLines = wrapText(ctx, pageData.quote, canvas.width - 100, 28);
    let yPos = 250;
    quoteLines.forEach(line => {
        ctx.fillText(line, canvas.width / 2, yPos);
        yPos += 40;
    });

    // Source
    ctx.fillStyle = '#888';
    ctx.font = '18px "Noto Sans", sans-serif';
    ctx.fillText(pageData.source, canvas.width / 2, yPos + 30);

    // Theme name
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 36px "Playfair Display", serif';
    ctx.fillText(pageData.themeName, canvas.width / 2, canvas.height - 50);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

// Wrap text function
function wrapText(ctx, text, maxWidth, fontSize) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

// Update camera position
function updateCameraPosition() {
    const targetX = (currentMonthIndex - 6) * 2.2;
    camera.position.x = targetX;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Smooth camera movement
    const targetX = (currentMonthIndex - 6) * 2.2;
    camera.position.x += (targetX - camera.position.x) * 0.1;
    
    // Rotate pages for 3D flip effect
    calendarPages.forEach((page, index) => {
        const distance = Math.abs(index - currentMonthIndex);
        let targetRotation = 0;
        
        if (index < currentMonthIndex) {
            // Pages to the left - flip to show back
            targetRotation = -Math.PI / 2;
        } else if (index > currentMonthIndex) {
            // Pages to the right - flip to show back
            targetRotation = Math.PI / 2;
        } else {
            // Current page - show front
            targetRotation = 0;
        }
        
        page.rotation.y += (targetRotation - page.rotation.y) * 0.15;
        
        // Scale and position effect for depth
        const targetScale = (index === currentMonthIndex) ? 1.15 : Math.max(0.7, 1 - distance * 0.1);
        page.scale.x += (targetScale - page.scale.x) * 0.1;
        page.scale.y += (targetScale - page.scale.y) * 0.1;
        
        // Slight Z offset for 3D depth
        const targetZ = (index === currentMonthIndex) ? 0 : -distance * 0.3;
        page.position.z += (targetZ - page.position.z) * 0.1;
    });
    
    renderer.render(scene, camera);
}

// Window resize handler
function onWindowResize() {
    const container = document.getElementById('calendar-canvas');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Initialize event listeners
function initEventListeners() {
    // Language selector
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.dataset.lang;
            switchLanguage(lang);
        });
    });

    // Month navigation
    document.getElementById('prev-month').addEventListener('click', () => {
        if (currentMonthIndex > 0 && !isFlipping) {
            currentMonthIndex--;
            loadMonth(currentMonthIndex);
        }
    });

    document.getElementById('next-month').addEventListener('click', () => {
        if (currentMonthIndex < 11 && !isFlipping) {
            currentMonthIndex++;
            loadMonth(currentMonthIndex);
        }
    });

    // Month grid buttons
    document.querySelectorAll('.month-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const month = parseInt(e.target.dataset.month);
            if (month !== currentMonthIndex && !isFlipping) {
                currentMonthIndex = month;
                loadMonth(currentMonthIndex);
            }
        });
    });

    // Overlay close
    document.querySelector('.close-overlay').addEventListener('click', () => {
        closeOverlay();
    });
    
    // Close overlay when clicking outside
    document.getElementById('month-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'month-overlay') {
            closeOverlay();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentMonthIndex > 0 && !isFlipping) {
            currentMonthIndex--;
            loadMonth(currentMonthIndex);
        } else if (e.key === 'ArrowRight' && currentMonthIndex < 11 && !isFlipping) {
            currentMonthIndex++;
            loadMonth(currentMonthIndex);
        } else if (e.key === 'Escape') {
            closeOverlay();
        }
    });

    // Social share
    document.getElementById('share-facebook').addEventListener('click', shareOnFacebook);
    document.getElementById('share-twitter').addEventListener('click', shareOnTwitter);
    
    // Add native share button if supported
    if (navigator.share) {
        const shareContainer = document.querySelector('.social-share');
        const nativeShareBtn = document.createElement('button');
        nativeShareBtn.className = 'share-btn';
        nativeShareBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>';
        nativeShareBtn.title = 'Chia sẻ';
        nativeShareBtn.addEventListener('click', shareNative);
        shareContainer.appendChild(nativeShareBtn);
    }

    // Click on calendar canvas to open overlay
    document.getElementById('calendar-canvas').addEventListener('click', () => {
        openMonthOverlay(currentMonthIndex);
    });
}

// Switch language
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Reload current month with new language
    loadMonth(currentMonthIndex);
}

// Load month data
function loadMonth(monthIndex) {
    const monthData = calendarData[currentLanguage].months[monthIndex];
    
    // Update month name
    document.getElementById('current-month-name').textContent = monthData.name;
    
    // Update active month button
    document.querySelectorAll('.month-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index === monthIndex);
    });
    
    // Update navigation buttons
    document.getElementById('prev-month').disabled = monthIndex === 0;
    document.getElementById('next-month').disabled = monthIndex === 11;
    
    // Update page textures
    updatePageTextures();
}

// Update page textures
function updatePageTextures() {
    calendarPages.forEach((page, index) => {
        const pageData = calendarData[currentLanguage].months[index];
        const texture = createPageTexture(pageData, index);
        page.material.map = texture;
        page.material.needsUpdate = true;
    });
}

// Open month overlay
function openMonthOverlay(monthIndex) {
    const monthData = calendarData[currentLanguage].months[monthIndex];
    const overlay = document.getElementById('month-overlay');
    
    // Update overlay content
    document.getElementById('overlay-month-name').textContent = monthData.name;
    document.getElementById('quote-text').textContent = monthData.quote;
    document.getElementById('quote-source').textContent = monthData.source;
    
    // Create seasonal effect
    createSeasonalEffect(monthData.theme);
    
    // Load company images
    loadCompanyImages(monthData.images);
    
    // Generate calendar grid
    generateCalendarGrid(monthIndex);
    
    // Show overlay
    overlay.classList.add('active');
}

// Create seasonal effect
function createSeasonalEffect(theme) {
    const effectContainer = document.getElementById('seasonal-effect');
    effectContainer.innerHTML = '';
    effectContainer.className = 'seasonal-effect';
    
    switch(theme) {
        case 'cherry-blossom':
            effectContainer.classList.add('cherry-blossom-effect');
            for (let i = 0; i < 30; i++) {
                createCherryBlossom(effectContainer);
            }
            break;
        case 'plum-blossom':
            effectContainer.classList.add('plum-blossom-effect');
            for (let i = 0; i < 20; i++) {
                createPlumBlossom(effectContainer);
            }
            break;
        case 'lotus':
            effectContainer.style.background = 'linear-gradient(135deg, #FFB6C1 0%, #FFF8DC 100%)';
            effectContainer.innerHTML = '<div style="font-size: 100px; opacity: 0.3;">☸</div>';
            break;
        case 'snow':
            effectContainer.classList.add('snow-effect');
            for (let i = 0; i < 50; i++) {
                createSnowflake(effectContainer);
            }
            break;
        default:
            effectContainer.style.background = `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`;
    }
}

// Create cherry blossom
function createCherryBlossom(container) {
    const blossom = document.createElement('div');
    blossom.className = 'cherry-blossom';
    blossom.style.left = Math.random() * 100 + '%';
    blossom.style.animationDuration = (Math.random() * 3 + 2) + 's';
    blossom.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(blossom);
}

// Create plum blossom
function createPlumBlossom(container) {
    const blossom = document.createElement('div');
    blossom.className = 'plum-blossom';
    blossom.style.left = Math.random() * 100 + '%';
    blossom.style.top = Math.random() * 100 + '%';
    blossom.style.animationDuration = (Math.random() * 2 + 2) + 's';
    blossom.style.animationDelay = Math.random() * 1 + 's';
    container.appendChild(blossom);
}

// Create snowflake
function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.style.position = 'absolute';
    snowflake.style.width = Math.random() * 5 + 3 + 'px';
    snowflake.style.height = snowflake.style.width;
    snowflake.style.background = 'white';
    snowflake.style.borderRadius = '50%';
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.opacity = Math.random() * 0.5 + 0.5;
    snowflake.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
    snowflake.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(snowflake);
}

// Load company images with lazy loading and error handling
function loadCompanyImages(images) {
    const container = document.getElementById('company-images');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!images) {
        const noImageMsg = currentLanguage === 'vi' ? 'Không có hình ảnh cho tháng này' :
                          currentLanguage === 'en' ? 'No images for this month' :
                          '本月没有图片';
        container.innerHTML = `<p style="text-align: center; color: #999; padding: 20px;">${noImageMsg}</p>`;
        return;
    }
    
    const imageList = [];
    if (images.cover) imageList.push(images.cover);
    if (images.background) {
        if (Array.isArray(images.background)) {
            imageList.push(...images.background);
        } else {
            imageList.push(images.background);
        }
    }
    if (images.calendar && Array.isArray(images.calendar)) {
        imageList.push(...images.calendar);
    }
    
    if (imageList.length === 0) {
        const noImageMsg = currentLanguage === 'vi' ? 'Không có hình ảnh cho tháng này' :
                          currentLanguage === 'en' ? 'No images for this month' :
                          '本月没有图片';
        container.innerHTML = `<p style="text-align: center; color: #999; padding: 20px;">${noImageMsg}</p>`;
        return;
    }
    
    // Create image loader with Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });
    
    imageList.forEach((imagePath, index) => {
        if (imagePath.endsWith('.pdf')) return; // Skip PDF files
        
        const imgDiv = document.createElement('div');
        imgDiv.className = 'company-image';
        imgDiv.style.animationDelay = `${index * 0.1}s`;
        
        const img = document.createElement('img');
        img.dataset.src = imagePath;
        img.alt = currentLanguage === 'vi' ? 'Hình ảnh công ty' :
                  currentLanguage === 'en' ? 'Company Image' :
                  '公司图片';
        img.loading = 'lazy';
        img.classList.add('lazy');
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s';
        
        img.onload = () => {
            img.style.opacity = '1';
        };
        
        img.onerror = () => {
            imgDiv.style.display = 'none';
        };
        
        imgDiv.appendChild(img);
        container.appendChild(imgDiv);
        imageObserver.observe(img);
    });
}

// Generate calendar grid
function generateCalendarGrid(monthIndex) {
    const container = document.getElementById('calendar-grid');
    container.innerHTML = '';
    
    const year = getCurrentYear();
    const month = monthIndex;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    
    // Weekday headers
    const weekdays = currentLanguage === 'vi' ? ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'] :
                     currentLanguage === 'en' ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] :
                     ['日', '一', '二', '三', '四', '五', '六'];
    
    weekdays.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day weekday';
        dayDiv.textContent = day;
        container.appendChild(dayDiv);
    });
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'calendar-day';
        container.appendChild(emptyDiv);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.textContent = day;
        
        if (isCurrentMonth && day === today.getDate()) {
            dayDiv.classList.add('today');
        }
        
        container.appendChild(dayDiv);
    }
}

// Create particle background
function createParticleBackground() {
    const particles = document.createElement('div');
    particles.className = 'particles';
    document.body.appendChild(particles);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 100 + 50 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particles.appendChild(particle);
    }
}

// Close overlay function
function closeOverlay() {
    document.getElementById('month-overlay').classList.remove('active');
}

// Social sharing functions with Web Share API fallback
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const monthData = calendarData[currentLanguage].months[currentMonthIndex];
    const text = encodeURIComponent(`${monthData.name}: ${monthData.quote.substring(0, 100)}...`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
}

function shareOnTwitter() {
    const monthData = calendarData[currentLanguage].months[currentMonthIndex];
    const text = encodeURIComponent(`Lịch 2025 Phật Pháp - ${monthData.name}: ${monthData.quote.substring(0, 80)}...`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
}

// Native share function (if supported)
function shareNative() {
    if (navigator.share) {
        const monthData = calendarData[currentLanguage].months[currentMonthIndex];
        navigator.share({
            title: `Lịch 2025 Phật Pháp - ${monthData.name}`,
            text: monthData.quote,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    }
}

// Auto-update to current month on load
window.addEventListener('load', () => {
    currentMonthIndex = getCurrentMonth();
    loadMonth(currentMonthIndex);
});

