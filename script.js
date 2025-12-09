/* ===== MODERN JS FOR SERBIA SITE ===== */
/* Glass effects, particles, parallax, animations */

// ===== CONFIGURATION =====
const CONFIG = {
    // Performance
    throttleDelay: 16, // ~60fps
    lazyLoadThreshold: 0.1,
    
    // Effects
    parallaxIntensity: 0.15,
    mouseTrailLength: 20,
    particleCount: 30,
    
    // Glass morphism
    glassBlur: '10px',
    glassOpacity: 0.15,
    
    // Animations
    animationDuration: 800,
    staggerDelay: 100
};

// ===== STATE =====
const STATE = {
    isMobile: false,
    scrollY: 0,
    mouseX: 0,
    mouseY: 0,
    mouseTrail: [],
    isScrolling: false,
    scrollTimeout: null,
    loadedImages: new Set(),
    totalImages: 0
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🇷🇸 SERBIA • Modern Experience', 
        'background: linear-gradient(135deg, #8b5cf6, #10b981); color: white; padding: 10px; border-radius: 5px; font-size: 14px;');
    
    init();
});

async function init() {
    detectDevice();
    createLoadingScreen();
    
    // Initialize modules
    await Promise.all([
        initNavigation(),
        initGlassEffects(),
        initParallax(),
        initParticles(),
        initLazyLoad(),
        initSmoothScrolling(),
        initImageReveal(),
        initMouseEffects(),
        initScrollAnimations(),
        initPageTransitions()
    ]);
    
    // Start effects
    startMouseTrail();
    startParallax();
    startParticleSystem();
    
    // Finalize
    setTimeout(() => {
        removeLoadingScreen();
        initPageIntro();
    }, 1000);
    
    // Event listeners
    setupEventListeners();
}

// ===== LOADING SCREEN =====
function createLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'serbia-loader';
    loader.innerHTML = `
        <div class="loader-glass">
            <div class="loader-logo">
                <div class="loader-dot"></div>
                <div class="loader-text">СЕРБИЯ</div>
            </div>
            <div class="loader-progress">
                <div class="loader-bar"></div>
            </div>
            <div class="loader-hint">Загружаем магию Балкан...</div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        #serbia-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0a0a0a 0%, #151515 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            backdrop-filter: blur(20px);
        }
        
        .loader-glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(${CONFIG.glassBlur});
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 40px;
            text-align: center;
            min-width: 300px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .loader-logo {
            margin-bottom: 30px;
        }
        
        .loader-dot {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #8b5cf6, #10b981);
            border-radius: 50%;
            margin: 0 auto 15px;
            animation: pulse 2s infinite;
        }
        
        .loader-text {
            font-size: 24px;
            font-weight: 700;
            background: linear-gradient(135deg, #8b5cf6, #10b981);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .loader-progress {
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            overflow: hidden;
            margin: 20px 0;
        }
        
        .loader-bar {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #8b5cf6, #10b981);
            border-radius: 2px;
            transition: width 0.3s ease;
        }
        
        .loader-hint {
            color: rgba(255, 255, 255, 0.5);
            font-size: 14px;
            margin-top: 20px;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
    `;
    document.head.appendChild(style);
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
        }
        loader.querySelector('.loader-bar').style.width = `${progress}%`;
    }, 100);
}

function removeLoadingScreen() {
    const loader = document.getElementById('serbia-loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => loader.remove(), 500);
    }
}

// ===== GLASS MORPHISM EFFECTS =====
function initGlassEffects() {
    // Add glass effect to cards on hover
    document.querySelectorAll('.card, .food-card').forEach(card => {
        card.style.transition = 'all 0.3s ease';
        
        card.addEventListener('mouseenter', () => {
            card.style.backdropFilter = `blur(${CONFIG.glassBlur})`;
            card.style.backgroundColor = `rgba(255, 255, 255, ${CONFIG.glassOpacity})`;
            card.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.backdropFilter = 'none';
            card.style.backgroundColor = '';
            card.style.borderColor = '';
        });
    });
    
    // Add glass effect to navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.backdropFilter = `blur(${CONFIG.glassBlur})`;
        navbar.style.backgroundColor = `rgba(21, 21, 21, 0.8)`;
    }
    
    // Create floating glass elements
    createFloatingGlass();
}

function createFloatingGlass() {
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-glass';
    floatingContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(floatingContainer);
    
    // Create floating glass shapes
    const shapes = [
        { size: '200px', x: '10%', y: '20%', color: 'rgba(139, 92, 246, 0.1)' },
        { size: '300px', x: '80%', y: '40%', color: 'rgba(16, 185, 129, 0.1)' },
        { size: '150px', x: '30%', y: '70%', color: 'rgba(245, 158, 11, 0.1)' },
        { size: '250px', x: '70%', y: '10%', color: 'rgba(139, 92, 246, 0.05)' }
    ];
    
    shapes.forEach((shape, i) => {
        const el = document.createElement('div');
        el.className = 'glass-shape';
        el.style.cssText = `
            position: absolute;
            width: ${shape.size};
            height: ${shape.size};
            background: ${shape.color};
            backdrop-filter: blur(40px);
            border-radius: 50%;
            left: ${shape.x};
            top: ${shape.y};
            filter: blur(40px);
            opacity: 0.5;
            animation: float${i} 20s infinite ease-in-out;
        `;
        
        // Add unique animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float${i} {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                }
                33% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(120deg);
                }
                66% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(240deg);
                }
            }
        `;
        document.head.appendChild(style);
        
        floatingContainer.appendChild(el);
    });
}

// ===== PARALLAX EFFECTS =====
function initParallax() {
    // Add data attributes for parallax elements
    document.querySelectorAll('.nature-card, .gallery-item').forEach((el, i) => {
        el.setAttribute('data-parallax', 'true');
        el.setAttribute('data-depth', (0.1 + i * 0.05).toFixed(2));
    });
    
    // Hero title parallax
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.setAttribute('data-parallax', 'true');
        heroTitle.setAttribute('data-depth', '0.3');
    }
}

function startParallax() {
    if (STATE.isMobile) return;
    
    let ticking = false;
    
    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        
        document.querySelectorAll('[data-parallax="true"]').forEach(el => {
            const depth = parseFloat(el.getAttribute('data-depth') || CONFIG.parallaxIntensity);
            const movement = -(scrolled * depth);
            el.style.transform = `translate3d(0, ${movement}px, 0)`;
        });
        
        // Mouse parallax for hero
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const xMovement = (STATE.mouseX / window.innerWidth - 0.5) * 20;
            const yMovement = (STATE.mouseY / window.innerHeight - 0.5) * 20;
            heroContent.style.transform = `translate3d(${xMovement}px, ${yMovement}px, 0)`;
        }
        
        ticking = false;
    };
    
    const requestTick = () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', requestTick);
    window.addEventListener('mousemove', requestTick);
}

// ===== PARTICLE SYSTEM =====
function initParticles() {
    if (STATE.isMobile) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    STATE.particleContainer = particleContainer;
}

function startParticleSystem() {
    if (STATE.isMobile || !STATE.particleContainer) return;
    
    const colors = [
        'rgba(139, 92, 246, 0.5)',
        'rgba(16, 185, 129, 0.5)',
        'rgba(245, 158, 11, 0.5)',
        'rgba(255, 255, 255, 0.3)'
    ];
    
    // Create particles
    for (let i = 0; i < CONFIG.particleCount; i++) {
        createParticle(i);
    }
    
    function createParticle(index) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${x}vw;
            top: ${y}vh;
            opacity: 0.7;
            filter: blur(1px);
            animation: particleFloat ${duration}s infinite ease-in-out ${delay}s;
        `;
        
        STATE.particleContainer.appendChild(particle);
        
        // Add animation
        if (!document.querySelector('#particle-animations')) {
            const style = document.createElement('style');
            style.id = 'particle-animations';
            style.textContent = `
                @keyframes particleFloat {
                    0%, 100% {
                        transform: translate(0, 0) rotate(0deg);
                        opacity: 0.7;
                    }
                    25% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
                        opacity: 0.4;
                    }
                    50% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
                        opacity: 0.7;
                    }
                    75% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
                        opacity: 0.4;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Restart animation when complete
        particle.addEventListener('animationiteration', () => {
            // Occasionally change particle properties
            if (Math.random() > 0.7) {
                particle.style.left = `${Math.random() * 100}vw`;
                particle.style.top = `${Math.random() * 100}vh`;
            }
        });
    }
}

// ===== MOUSE EFFECTS =====
function initMouseEffects() {
    if (STATE.isMobile) return;
    
    // Custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #8b5cf6;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease, width 0.3s ease, height 0.3s ease;
    `;
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #10b981;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        mix-blend-mode: difference;
        transition: transform 0.2s ease;
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    document.body.style.cursor = 'none';
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX - 10}px`;
        cursor.style.top = `${e.clientY - 10}px`;
        cursorDot.style.left = `${e.clientX - 2}px`;
        cursorDot.style.top = `${e.clientY - 2}px`;
        
        // Update mouse trail
        STATE.mouseTrail.push({ x: e.clientX, y: e.clientY });
        if (STATE.mouseTrail.length > CONFIG.mouseTrailLength) {
            STATE.mouseTrail.shift();
        }
        
        STATE.mouseX = e.clientX;
        STATE.mouseY = e.clientY;
    });
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .card, .gallery-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = '#10b981';
            cursorDot.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = '#8b5cf6';
            cursorDot.style.transform = 'scale(1)';
        });
    });
    
    // Click effect
    document.addEventListener('click', (e) => {
        createRipple(e.clientX, e.clientY);
    });
}

function startMouseTrail() {
    if (STATE.isMobile) return;
    
    const trailContainer = document.createElement('div');
    trailContainer.className = 'mouse-trail';
    trailContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9997;
    `;
    
    document.body.appendChild(trailContainer);
    
    // Create trail dots
    const trailDots = [];
    for (let i = 0; i < CONFIG.mouseTrailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #8b5cf6, #10b981);
            border-radius: 50%;
            opacity: 0;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease, transform 0.3s ease;
        `;
        trailContainer.appendChild(dot);
        trailDots.push(dot);
    }
    
    // Update trail animation
    function updateTrail() {
        STATE.mouseTrail.forEach((pos, i) => {
            const dot = trailDots[i];
            if (dot) {
                const opacity = (i / STATE.mouseTrail.length) * 0.5;
                const scale = 1 - (i / STATE.mouseTrail.length) * 0.5;
                
                dot.style.left = `${pos.x}px`;
                dot.style.top = `${pos.y}px`;
                dot.style.opacity = opacity;
                dot.style.transform = `translate(-50%, -50%) scale(${scale})`;
            }
        });
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: fixed;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        left: ${x - 50}px;
        top: ${y - 50}px;
        pointer-events: none;
        z-index: 9996;
        transform: scale(0);
        animation: rippleExpand 0.6s ease-out;
    `;
    
    document.body.appendChild(ripple);
    
    // Add animation
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes rippleExpand {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove after animation
    setTimeout(() => ripple.remove(), 600);
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                smoothScrollTo(target);
                
                // Update URL without page reload
                history.pushState(null, null, href);
            }
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) smoothScrollTo(target);
        }
    });
}

function smoothScrollTo(target) {
    const start = window.pageYOffset;
    const targetPos = target.getBoundingClientRect().top + start - 80;
    const distance = targetPos - start;
    const duration = 1000;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function
        const ease = easeOutQuart(progress);
        window.scrollTo(0, start + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
    
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
}

// ===== IMAGE REVEAL EFFECTS =====
function initImageReveal() {
    // Count images
    STATE.totalImages = document.querySelectorAll('img').length;
    
    // Add reveal effect to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        img.addEventListener('load', () => {
            STATE.loadedImages.add(img.src);
            revealImage(img);
            updateProgress();
        });
        
        // Fallback for cached images
        if (img.complete) {
            img.dispatchEvent(new Event('load'));
        }
    });
}

function revealImage(img) {
    // Random delay for staggered reveal
    const delay = Math.random() * 300;
    
    setTimeout(() => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
        
        // Add subtle float animation
        if (img.closest('.nature-card, .gallery-item')) {
            img.style.transition += ', transform 3s ease-in-out';
            setTimeout(() => {
                img.style.transform = 'scale(1.02)';
            }, delay + 100);
        }
    }, delay);
}

function updateProgress() {
    const progress = (STATE.loadedImages.size / STATE.totalImages) * 100;
    
    // Update loader if exists
    const loaderBar = document.querySelector('.loader-bar');
    if (loaderBar) {
        loaderBar.style.width = `${progress}%`;
    }
    
    if (progress === 100) {
        console.log('✨ Все изображения загружены');
        document.body.classList.add('images-loaded');
    }
}

// ===== LAZY LOADING =====
function initLazyLoad() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px',
        threshold: CONFIG.lazyLoadThreshold
    });
    
    // Observe all images
    document.querySelectorAll('img').forEach(img => {
        if (img.dataset.src) {
            observer.observe(img);
        }
    });
    
    // Observe other elements
    document.querySelectorAll('.card, .section').forEach(el => {
        observer.observe(el);
    });
}

function loadImage(img) {
    if (img.dataset.src) {
        const src = img.dataset.src;
        img.src = src;
        delete img.dataset.src;
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add different animations based on element type
                if (element.classList.contains('card')) {
                    animateCard(element);
                } else if (element.classList.contains('nature-card')) {
                    animateNatureCard(element);
                } else if (element.classList.contains('gallery-item')) {
                    animateGalleryItem(element);
                } else if (element.tagName === 'SECTION') {
                    animateSection(element);
                }
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all animatable elements
    document.querySelectorAll('.card, .nature-card, .gallery-item, section').forEach(el => {
        observer.observe(el);
    });
}

function animateCard(card) {
    const delay = Array.from(document.querySelectorAll('.card')).indexOf(card) * 100;
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) rotateX(0)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }, delay);
}

function animateNatureCard(card) {
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
    card.style.transition = 'all 0.8s ease';
    
    // Add floating effect
    card.style.animation = 'floatCard 6s ease-in-out infinite';
    
    if (!document.querySelector('#float-animation')) {
        const style = document.createElement('style');
        style.id = 'float-animation';
        style.textContent = `
            @keyframes floatCard {
                0%, 100% {
                    transform: translateY(0) scale(1);
                }
                50% {
                    transform: translateY(-10px) scale(1.02);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function animateGalleryItem(item) {
    const index = Array.from(document.querySelectorAll('.gallery-item')).indexOf(item);
    const delay = index * 50;
    
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
        
        // Add wave effect
        item.style.transition = `
            opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms,
            transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms
        `;
    }, delay);
}

function animateSection(section) {
    section.style.opacity = '1';
    section.style.transform = 'translateY(0)';
}

// ===== PAGE TRANSITIONS =====
function initPageTransitions() {
    // Add transition styles
    const style = document.createElement('style');
    style.textContent = `
        .page-transition {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0a0a0a, #151515);
            z-index: 9998;
            transform: translateY(100%);
        }
        
        .transition-active {
            transform: translateY(0);
            transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
        }
        
        .transition-exit {
            transform: translateY(-100%);
            transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1) 0.1s;
        }
    `;
    document.head.appendChild(style);
}

// ===== PAGE INTRO ANIMATION =====
function initPageIntro() {
    // Animate hero elements
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.btn-group');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        heroTitle.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
            
            // Text character animation
            animateText(heroTitle);
        }, 300);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 600);
    }
    
    if (heroButtons) {
        setTimeout(() => {
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 900);
    }
    
    // Animate logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.animation = 'logoIntro 1s ease-out';
        
        if (!document.querySelector('#logo-animation')) {
            const style = document.createElement('style');
            style.id = 'logo-animation';
            style.textContent = `
                @keyframes logoIntro {
                    0% {
                        transform: translateY(-20px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

function animateText(element) {
    const text = element.textContent;
    element.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `all 0.3s ease ${i * 0.05}s`;
        
        element.appendChild(span);
        
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        }, 100 + i * 30);
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
            
            // Add glass effect to mobile menu
            if (navLinks.classList.contains('active')) {
                navLinks.style.backdropFilter = `blur(${CONFIG.glassBlur})`;
                navLinks.style.backgroundColor = `rgba(21, 21, 21, 0.95)`;
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.textContent = '☰';
                document.body.style.overflow = '';
            });
        });
        
        // Close menu on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.textContent = '☰';
                document.body.style.overflow = '';
            }
        });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', throttle(() => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, CONFIG.throttleDelay));
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Throttled scroll handler
    window.addEventListener('scroll', throttle(() => {
        STATE.scrollY = window.pageYOffset;
        
        // Update navbar
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (STATE.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Update scroll state
        STATE.isScrolling = true;
        clearTimeout(STATE.scrollTimeout);
        STATE.scrollTimeout = setTimeout(() => {
            STATE.isScrolling = false;
        }, 100);
    }, CONFIG.throttleDelay));
    
    // Resize handler
    window.addEventListener('resize', throttle(() => {
        detectDevice();
    }, 200));
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Space to scroll down
        if (e.code === 'Space' && !e.target.matches('input, textarea, select')) {
            e.preventDefault();
            window.scrollBy({
                top: window.innerHeight * 0.8,
                behavior: 'smooth'
            });
        }
        
        // Arrow keys navigation
        if (e.code === 'ArrowDown') {
            e.preventDefault();
            window.scrollBy({ top: 100, behavior: 'smooth' });
        } else if (e.code === 'ArrowUp') {
            e.preventDefault();
            window.scrollBy({ top: -100, behavior: 'smooth' });
        }
        
        // Ctrl/Cmd + K to focus search (if any)
        if ((e.ctrlKey || e.metaKey) && e.code === 'KeyK') {
            e.preventDefault();
            // Could add search functionality here
        }
    });
    
    // Context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        
        // Create custom context menu
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.innerHTML = `
            <div class="menu-item" data-action="scroll-top">⬆️ Наверх</div>
            <div class="menu-item" data-action="scroll-bottom">⬇️ Вниз</div>
            <div class="divider"></div>
            <div class="menu-item" data-action="reload">🔄 Обновить</div>
        `;
        
        menu.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            background: rgba(30, 30, 30, 0.95);
            backdrop-filter: blur(${CONFIG.glassBlur});
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 8px 0;
            min-width: 180px;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(menu);
        
        // Menu item styles
        const style = document.createElement('style');
        style.textContent = `
            .menu-item {
                padding: 10px 16px;
                color: #f0f0f0;
                cursor: pointer;
                font-size: 14px;
                transition: background 0.2s ease;
            }
            .menu-item:hover {
                background: rgba(139, 92, 246, 0.2);
            }
            .divider {
                height: 1px;
                background: rgba(255, 255, 255, 0.1);
                margin: 8px 0;
            }
        `;
        document.head.appendChild(style);
        
        // Handle menu actions
        menu.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                
                switch(action) {
                    case 'scroll-top':
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        break;
                    case 'scroll-bottom':
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                        break;
                    case 'reload':
                        location.reload();
                        break;
                }
                
                menu.remove();
            });
        });
        
        // Remove menu on click outside
        setTimeout(() => {
            document.addEventListener('click', function removeMenu(e) {
                if (!menu.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', removeMenu);
                }
            });
        }, 10);
    });
}

// ===== UTILITY FUNCTIONS =====
function detectDevice() {
    STATE.isMobile = window.innerWidth <= 768;
    
    // Update body class
    if (STATE.isMobile) {
        document.body.classList.add('is-mobile');
        document.body.classList.remove('is-desktop');
    } else {
        document.body.classList.add('is-desktop');
        document.body.classList.remove('is-mobile');
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== DEBUG MODE =====
// Add debug controls (hold Shift + D)
let debugKeys = [];
document.addEventListener('keydown', (e) => {
    debugKeys.push(e.key);
    if (debugKeys.length > 2) debugKeys.shift();
    
    if (debugKeys.join('') === 'ShiftD') {
        toggleDebugMode();
        debugKeys = [];
    }
});

function toggleDebugMode() {
    document.body.classList.toggle('debug-mode');
    
    // Add debug info
    if (document.body.classList.contains('debug-mode')) {
        const debugPanel = document.createElement('div');
        debugPanel.id = 'debug-panel';
        debugPanel.innerHTML = `
            <div class="debug-info">
                <div>Scroll: ${Math.round(STATE.scrollY)}px</div>
                <div>Images: ${STATE.loadedImages.size}/${STATE.totalImages}</div>
                <div>Mobile: ${STATE.isMobile}</div>
                <div>FPS: <span id="fps-counter">60</span></div>
            </div>
        `;
        
        debugPanel.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: #10b981;
            padding: 15px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            border: 1px solid #10b981;
        `;
        
        document.body.appendChild(debugPanel);
        
        // FPS counter
        let frameCount = 0;
        let lastTime = performance.now();
        
        function updateFPS() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                const fpsCounter = document.getElementById('fps-counter');
                if (fpsCounter) fpsCounter.textContent = fps;
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(updateFPS);
        }
        
        updateFPS();
        
        // Update debug info
        setInterval(() => {
            const info = debugPanel.querySelector('.debug-info');
            if (info) {
                info.innerHTML = `
                    <div>Scroll: ${Math.round(STATE.scrollY)}px</div>
                    <div>Images: ${STATE.loadedImages.size}/${STATE.totalImages}</div>
                    <div>Mobile: ${STATE.isMobile}</div>
                    <div>FPS: <span id="fps-counter">60</span></div>
                    <div>Trail: ${STATE.mouseTrail.length}</div>
                `;
            }
        }, 500);
    } else {
        const debugPanel = document.getElementById('debug-panel');
        if (debugPanel) debugPanel.remove();
    }
}

// ===== EXPORT FOR CONSOLE DEBUGGING =====
window.Serbia = {
    version: '1.0.0',
    config: CONFIG,
    state: STATE,
    reloadEffects: () => {
        // Clear existing effects
        document.querySelectorAll('.particles, .floating-glass, .mouse-trail').forEach(el => el.remove());
        
        // Reinitialize
        initGlassEffects();
        startParticleSystem();
        startMouseTrail();
        
        console.log('✨ Эффекты перезагружены');
    },
    toggleEffects: (type) => {
        switch(type) {
            case 'particles':
                const particles = document.querySelector('.particles');
                if (particles) {
                    particles.style.display = particles.style.display === 'none' ? '' : 'none';
                }
                break;
            case 'trail':
                const trail = document.querySelector('.mouse-trail');
                if (trail) {
                    trail.style.display = trail.style.display === 'none' ? '' : 'none';
                }
                break;
            case 'glass':
                document.body.classList.toggle('no-glass');
                break;
        }
    },
    stats: () => {
        return {
            loaded: STATE.loadedImages.size,
            total: STATE.totalImages,
            progress: `${Math.round((STATE.loadedImages.size / STATE.totalImages) * 100)}%`,
            scroll: STATE.scrollY,
            mobile: STATE.isMobile
        };
    }
};

// Console greeting
console.log(`
%c
   _____                       _       
  / ____|                     (_)      
 | (___   ___ _ __ _   _ _ __  _  ___  
  \\___ \\ / __| '__| | | | '_ \\| |/ _ \\ 
  ____) | (__| |  | |_| | |_) | | (_) |
 |_____/ \\___|_|   \\__, | .__/|_|\\___/ 
                    __/ | |            
                   |___/|_|            

Modern JavaScript Experience for Serbia
`, 'color: #8b5cf6; font-family: monospace;');

console.log('🚀 Доступные команды:');
console.log('- Serbia.reloadEffects() - Перезагрузить эффекты');
console.log('- Serbia.toggleEffects("particles"/"trail"/"glass") - Включить/выключить эффекты');
console.log('- Serbia.stats() - Статистика загрузки');
