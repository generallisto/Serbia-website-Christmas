/* ===== JAVASCRIPT ДЛЯ САЙТА "СЕРБИЯ" ===== */
/* Интерактивность, анимации и специальные эффекты */

// ===== ОСНОВНОЙ МОДУЛЬ =====
const SerbiaWebsite = (() => {
  // Конфигурация
  const config = {
    animationSpeed: 0.3,
    scrollOffset: 80,
    lazyLoadThreshold: 0.1,
    parallaxIntensity: 0.3,
    imageLoadDelay: 100
  };

  // Состояние приложения
  const state = {
    isMobile: false,
    isScrolled: false,
    currentSection: 'home',
    imagesLoaded: 0,
    totalImages: 0,
    lastScrollY: 0,
    scrollDirection: 'down'
  };

  // DOM элементы
  const elements = {
    navbar: null,
    mobileToggle: null,
    navLinks: null,
    heroBackground: null,
    cards: [],
    galleryItems: [],
    natureCards: [],
    foodCards: [],
    lazyImages: [],
    sections: []
  };

  // ===== ИНИЦИАЛИЗАЦИЯ =====
  function init() {
    console.log('%c🇷🇸 СЕРБИЯ | Сайт инициализирован', 'color: #c8102e; font-size: 14px; font-weight: bold;');
    
    cacheElements();
    setupEventListeners();
    detectMobile();
    setupIntersectionObservers();
    setupParallax();
    setupImageLoader();
    setupScrollEffects();
    setupCustomCursor();
    setupSerbianEffects();
    
    // Анимация загрузки
    setTimeout(() => {
      document.body.classList.add('loaded');
      startPageAnimations();
    }, 500);
  }

  // Кэширование элементов
  function cacheElements() {
    elements.navbar = document.getElementById('navbar');
    elements.mobileToggle = document.getElementById('mobileToggle');
    elements.navLinks = document.getElementById('navLinks');
    elements.heroBackground = document.querySelector('.hero-background');
    
    elements.cards = document.querySelectorAll('.card');
    elements.galleryItems = document.querySelectorAll('.gallery-item');
    elements.natureCards = document.querySelectorAll('.nature-card');
    elements.foodCards = document.querySelectorAll('.food-card');
    elements.lazyImages = document.querySelectorAll('img[data-src]');
    elements.sections = document.querySelectorAll('section[id]');
    
    // Счётчик изображений
    state.totalImages = document.querySelectorAll('img').length;
  }

  // ===== СОБЫТИЯ =====
  function setupEventListeners() {
    // Мобильное меню
    if (elements.mobileToggle) {
      elements.mobileToggle.addEventListener('click', toggleMobileMenu);
    }

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
      if (!elements.navLinks.contains(e.target) && !elements.mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', smoothScroll);
    });

    // События скролла
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Загрузка изображений
    window.addEventListener('load', handlePageLoad);
  }

  // ===== МОБИЛЬНОЕ МЕНЮ =====
  function toggleMobileMenu() {
    elements.navLinks.classList.toggle('active');
    const icon = elements.mobileToggle.querySelector('i');
    
    if (elements.navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
      document.body.style.overflow = 'hidden';
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
      document.body.style.overflow = '';
    }
  }

  function closeMobileMenu() {
    elements.navLinks.classList.remove('active');
    const icon = elements.mobileToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    document.body.style.overflow = '';
  }

  // ===== ПЛАВНАЯ ПРОКРУТКА =====
  function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    // Обновляем активную ссылку
    updateActiveNavLink(targetId);
    
    // Прокрутка
    const targetPosition = targetElement.offsetTop - config.scrollOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime = null;
    
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
    
    // Функция плавности
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
    closeMobileMenu();
  }

  // Обновление активной ссылки в навигации
  function updateActiveNavLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === targetId) {
        link.classList.add('active');
      }
    });
    
    state.currentSection = targetId.substring(1);
  }

  // ===== ОБРАБОТКА СКРОЛЛА =====
  function handleScroll() {
    const currentScrollY = window.pageYOffset;
    
    // Определяем направление скролла
    state.scrollDirection = currentScrollY > state.lastScrollY ? 'down' : 'up';
    state.lastScrollY = currentScrollY;
    
    // Эффект навигации при скролле
    if (currentScrollY > 100) {
      if (!state.isScrolled) {
        state.isScrolled = true;
        elements.navbar.classList.add('scrolled');
      }
    } else {
      if (state.isScrolled) {
        state.isScrolled = false;
        elements.navbar.classList.remove('scrolled');
      }
    }
    
    // Обновление активного раздела
    updateActiveSectionOnScroll();
    
    // Параллакс эффекты
    updateParallax();
    
    // Эффекты при скролле
    applyScrollEffects(currentScrollY);
  }

  // Обновление активного раздела при скролле
  function updateActiveSectionOnScroll() {
    let currentSection = 'home';
    
    elements.sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });
    
    if (state.currentSection !== currentSection) {
      state.currentSection = currentSection;
      updateActiveNavLink(`#${currentSection}`);
    }
  }

  // ===== АНИМАЦИИ ПРИ СКРОЛЛЕ =====
  function applyScrollEffects(scrollY) {
    // Эффект появления элементов
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = '1';
        element.style.transform = 'translate(0, 0)';
      }
    });
    
    // Параллакс для героя
    if (elements.heroBackground && scrollY < window.innerHeight) {
      const scrolled = scrollY * config.parallaxIntensity;
      elements.heroBackground.style.transform = `translateY(${scrolled}px)`;
    }
    
    // Анимация карточек при скролле
    animateCardsOnScroll();
  }

  // Анимация карточек
  function animateCardsOnScroll() {
    elements.cards.forEach((card, index) => {
      const cardTop = card.getBoundingClientRect().top;
      const cardVisible = 200;
      
      if (cardTop < window.innerHeight - cardVisible) {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }

  // ===== ИНТЕРСЕКШН ОБСЕРВЕРЫ =====
  function setupIntersectionObservers() {
    // Для ленивой загрузки изображений
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          lazyImageObserver.unobserve(img);
          state.imagesLoaded++;
          updateProgress();
        }
      });
    }, { threshold: config.lazyLoadThreshold });
    
    // Для анимации элементов
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          
          // Специальные эффекты для разных типов элементов
          if (entry.target.classList.contains('card')) {
            animateCard(entry.target);
          } else if (entry.target.classList.contains('gallery-item')) {
            animateGalleryItem(entry.target);
          }
        }
      });
    }, { threshold: 0.2 });
    
    // Наблюдаем за элементами
    document.querySelectorAll('.card, .gallery-item, .nature-card, .food-card').forEach(el => {
      animationObserver.observe(el);
    });
  }

  // ===== ПАРАЛЛАКС ЭФФЕКТЫ =====
  function setupParallax() {
    // Инициализация параллакса для фоновых элементов
    document.querySelectorAll('.parallax').forEach(element => {
      element.style.transform = 'translateZ(0)';
    });
  }

  function updateParallax() {
    const scrolled = window.pageYOffset;
    
    document.querySelectorAll('.parallax').forEach(element => {
      const speed = element.dataset.speed || config.parallaxIntensity;
      const yPos = -(scrolled * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  }

  // ===== ЗАГРУЗКА ИЗОБРАЖЕНИЙ =====
  function setupImageLoader() {
    if (elements.lazyImages.length > 0) {
      elements.lazyImages.forEach(img => {
        img.classList.add('lazy-load');
        state.totalImages++;
      });
    }
    
    // Предзагрузка критических изображений
    preloadCriticalImages();
  }

  function preloadCriticalImages() {
    const criticalImages = [
      'setbia-main.jpg',
      'belgrade-fortress.jpg',
      'tara-national-park.jpg'
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        state.imagesLoaded++;
        updateProgress();
      };
    });
  }

  function updateProgress() {
    const progress = (state.imagesLoaded / state.totalImages) * 100;
    
    // Можно добавить индикатор загрузки
    if (progress === 100) {
      console.log('%c✅ Все изображения загружены', 'color: #4CAF50; font-weight: bold;');
    }
  }

  // ===== АНИМАЦИИ ЭЛЕМЕНТОВ =====
  function animateCard(card) {
    card.style.transition = `all ${config.animationSpeed}s cubic-bezier(0.175, 0.885, 0.32, 1.1)`;
    
    // Случайная небольшая задержка для естественного вида
    const delay = Math.random() * 0.3;
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
      
      // Анимация иконки
      const icon = card.querySelector('.card-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
          icon.style.transform = 'scale(1) rotate(0)';
        }, 300);
      }
    }, delay * 1000);
  }

  function animateGalleryItem(item) {
    const img = item.querySelector('img');
    const overlay = item.querySelector('.gallery-overlay');
    
    if (img) {
      img.style.transition = `transform ${config.animationSpeed * 2}s ease`;
    }
    
    if (overlay) {
      overlay.style.transition = `opacity ${config.animationSpeed}s ease`;
      setTimeout(() => {
        overlay.style.opacity = '0.8';
      }, 200);
    }
  }

  // ===== СПЕЦИАЛЬНЫЕ ЭФФЕКТЫ ДЛЯ СЕРБСКОЙ ТЕМЫ =====
  function setupSerbianEffects() {
    // Эффект традиционного орнамента при наведении
    setupOrnamentEffects();
    
    // Анимация флага Сербии
    setupFlagAnimation();
    
    // Интерактивная карта Сербии (упрощённая)
    setupInteractiveMap();
    
    // Галерея с эффектом монастырской фрески
    setupFrescoGallery();
  }

  function setupOrnamentEffects() {
    // Добавляем эффект орнамента при наведении на заголовки
    document.querySelectorAll('h1, h2, h3').forEach(heading => {
      heading.addEventListener('mouseenter', function() {
        this.style.backgroundImage = 
          `linear-gradient(135deg, 
            var(--serbian-blue) 0%, 
            var(--serbian-red) 50%, 
            var(--serbian-gold) 100%)`;
        this.style.webkitBackgroundClip = 'text';
        this.style.backgroundClip = 'text';
        this.style.webkitTextFillColor = 'transparent';
      });
      
      heading.addEventListener('mouseleave', function() {
        setTimeout(() => {
          if (this.tagName === 'H1') {
            this.style.backgroundImage = 
              `linear-gradient(135deg, 
                var(--serbian-blue) 0%, 
                var(--serbian-red) 100%)`;
          } else {
            this.style.backgroundImage = '';
            this.style.webkitTextFillColor = '';
            this.style.color = '';
          }
        }, 300);
      });
    });
  }

  function setupFlagAnimation() {
    // Анимация цветов флага в шапке
    const logo = document.querySelector('.logo');
    if (logo) {
      let colorIndex = 0;
      const flagColors = ['#0c2e60', '#c8102e', '#f8c300', '#ffffff'];
      
      logo.addEventListener('click', function(e) {
        e.preventDefault();
        colorIndex = (colorIndex + 1) % flagColors.length;
        
        // Плавное изменение цвета
        this.style.transition = 'color 0.5s ease';
        this.style.color = flagColors[colorIndex];
        
        // Возврат к исходному цвету
        setTimeout(() => {
          this.style.color = '';
        }, 1000);
        
        // Прокрутка наверх
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  function setupInteractiveMap() {
    // Упрощённая интерактивная карта регионов Сербии
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;
    
    const regions = [
      { name: 'Белград', color: '#c8102e', description: 'Столица Сербии' },
      { name: 'Воеводина', color: '#0c2e60', description: 'Автономный край' },
      { name: 'Шумадия', color: '#f8c300', description: 'Исторический регион' },
      { name: 'Рашка', color: '#8b4513', description: 'Земля монастырей' }
    ];
    
    regions.forEach(region => {
      const regionElement = document.createElement('div');
      regionElement.className = 'map-region';
      regionElement.innerHTML = `
        <div class="region-dot" style="background-color: ${region.color}"></div>
        <div class="region-info">
          <h4>${region.name}</h4>
          <p>${region.description}</p>
        </div>
      `;
      
      regionElement.addEventListener('click', () => {
        showRegionInfo(region);
      });
      
      mapContainer.appendChild(regionElement);
    });
  }

  function showRegionInfo(region) {
    // Показываем информацию о регионе
    const infoBox = document.createElement('div');
    infoBox.className = 'region-info-box';
    infoBox.innerHTML = `
      <h3>${region.name}</h3>
      <p>${region.description}</p>
      <button class="btn btn-primary close-info">Закрыть</button>
    `;
    
    infoBox.style.position = 'fixed';
    infoBox.style.top = '50%';
    infoBox.style.left = '50%';
    infoBox.style.transform = 'translate(-50%, -50%)';
    infoBox.style.zIndex = '2000';
    infoBox.style.padding = '2rem';
    infoBox.style.background = 'white';
    infoBox.style.borderRadius = 'var(--radius-medium)';
    infoBox.style.boxShadow = 'var(--shadow-hard)';
    
    document.body.appendChild(infoBox);
    
    infoBox.querySelector('.close-info').addEventListener('click', () => {
      document.body.removeChild(infoBox);
    });
  }

  function setupFrescoGallery() {
    // Эффект старинной фрески для галереи
    elements.galleryItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        const img = this.querySelector('img');
        if (img) {
          img.style.filter = 'sepia(0.3) contrast(1.1) brightness(0.95)';
          img.style.transition = 'filter 0.5s ease';
        }
      });
      
      item.addEventListener('mouseleave', function() {
        const img = this.querySelector('img');
        if (img) {
          img.style.filter = '';
        }
      });
    });
  }

  // ===== КАСТОМНЫЙ КУРСОР =====
  function setupCustomCursor() {
    // Только для десктопа
    if (state.isMobile) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Второй курсор для эффекта
    const cursor2 = document.createElement('div');
    cursor2.className = 'custom-cursor-2';
    document.body.appendChild(cursor2);
    
    // Стили для курсоров
    const style = document.createElement('style');
    style.textContent = `
      .custom-cursor {
        position: fixed;
        width: 8px;
        height: 8px;
        background-color: var(--serbian-red);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
      }
      
      .custom-cursor-2 {
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid var(--serbian-blue);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.2s ease;
        mix-blend-mode: difference;
      }
      
      .custom-cursor.hover {
        transform: scale(1.5);
        background-color: var(--serbian-gold);
      }
      
      .custom-cursor-2.hover {
        transform: scale(0.8);
        border-color: var(--serbian-gold);
      }
    `;
    document.head.appendChild(style);
    
    // Движение курсора
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      cursor2.style.left = e.clientX + 'px';
      cursor2.style.top = e.clientY + 'px';
    });
    
    // Эффекты при наведении
    const hoverElements = document.querySelectorAll('a, button, .card, .gallery-item');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursor2.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursor2.classList.remove('hover');
      });
    });
    
    // Скрыть системный курсор
    document.body.style.cursor = 'none';
  }

  // ===== АНИМАЦИИ ЗАГРУЗКИ СТРАНИЦЫ =====
  function startPageAnimations() {
    // Последовательная анимация элементов
    const elementsToAnimate = [
      ...document.querySelectorAll('.hero-content > *'),
      ...document.querySelectorAll('.section-title'),
      ...document.querySelectorAll('.lead')
    ];
    
    elementsToAnimate.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animated');
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 100);
    });
    
    // Запускаем анимацию волны для заголовка
    animateTitleWave();
  }

  function animateTitleWave() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    
    const text = title.textContent;
    title.innerHTML = '';
    
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.transition = `all 0.5s ease ${index * 0.05}s`;
      
      title.appendChild(span);
      
      setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      }, 500 + (index * 50));
    });
  }

  // ===== ОБРАБОТКА РЕСАЙЗА =====
  function handleResize() {
    detectMobile();
    
    // Переинициализация некоторых эффектов при изменении размера
    if (state.isMobile) {
      document.body.style.cursor = '';
      const customCursor = document.querySelector('.custom-cursor');
      if (customCursor) customCursor.remove();
    }
  }

  function detectMobile() {
    state.isMobile = window.innerWidth <= 768;
  }

  // ===== ЗАГРУЗКА СТРАНИЦЫ =====
  function handlePageLoad() {
    console.log('%c🚀 Страница полностью загружена', 'color: #0c2e60; font-weight: bold;');
    
    // Анимация прогресса загрузки
    const progressBar = document.createElement('div');
    progressBar.className = 'loading-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(to right, var(--serbian-blue), var(--serbian-red))';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.3s ease';
    
    document.body.appendChild(progressBar);
    
    // Симуляция прогресса
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      progressBar.style.width = `${progress}%`;
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          progressBar.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(progressBar);
          }, 300);
        }, 300);
      }
    }, 50);
  }

  // ===== ПУБЛИЧНЫЕ МЕТОДЫ =====
  return {
    init,
    toggleMobileMenu,
    closeMobileMenu,
    smoothScroll,
    getState: () => state,
    getConfig: () => config
  };
})();

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ =====
// Инициализация при полной загрузке DOM
document.addEventListener('DOMContentLoaded', SerbiaWebsite.init);

// Экспорт для глобального доступа (для отладки)
window.SerbiaWebsite = SerbiaWebsite;

// ===== ДОПОЛНИТЕЛЬНЫЕ ЭФФЕКТЫ =====
// Эффект частиц для фона (опционально)
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  particlesContainer.style.position = 'fixed';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.pointerEvents = 'none';
  particlesContainer.style.zIndex = '-1';
  
  document.body.appendChild(particlesContainer);
  
  // Цвета частиц в стиле Сербии
  const particleColors = [
    'rgba(12, 46, 96, 0.1)',
    'rgba(200, 16, 46, 0.1)',
    'rgba(248, 195, 0, 0.1)',
    'rgba(139, 69, 19, 0.1)'
  ];
  
  // Создаём частицы
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Случайные параметры
    const size = Math.random() * 10 + 5;
    const color = particleColors[Math.floor(Math.random() * particleColors.length)];
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color;
    particle.style.borderRadius = '50%';
    particle.style.left = `${x}vw`;
    particle.style.top = `${y}vh`;
    particle.style.opacity = '0.3';
    particle.style.animation = `float ${duration}s infinite ease-in-out`;
    
    particlesContainer.appendChild(particle);
  }
  
  // Добавляем анимацию
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) rotate(0deg);
      }
      25% {
        transform: translate(10px, -10px) rotate(90deg);
      }
      50% {
        transform: translate(0, -20px) rotate(180deg);
      }
      75% {
        transform: translate(-10px, -10px) rotate(270deg);
      }
    }
  `;
  document.head.appendChild(style);
}

// Инициализация частиц при полной загрузке
window.addEventListener('load', () => {
  // Можно включить или отключить этот эффект
  // createParticles();
});

// ===== КОНТЕКСТНОЕ МЕНЮ С СЕРБСКОЙ ТЕМОЙ =====
document.addEventListener('contextmenu', (e) => {
  // Создаём кастомное контекстное меню
  e.preventDefault();
  
  const customMenu = document.createElement('div');
  customMenu.className = 'serbian-context-menu';
  customMenu.innerHTML = `
    <div class="menu-item" data-action="home">🏠 На главную</div>
    <div class="menu-item" data-action="nature">🏔️ Природа</div>
    <div class="menu-item" data-action="cuisine">🍴 Кухня</div>
    <div class="divider"></div>
    <div class="menu-item" data-action="share">📤 Поделиться</div>
  `;
  
  customMenu.style.position = 'fixed';
  customMenu.style.left = `${e.clientX}px`;
  customMenu.style.top = `${e.clientY}px`;
  customMenu.style.background = 'white';
  customMenu.style.borderRadius = 'var(--radius-small)';
  customMenu.style.boxShadow = 'var(--shadow-hard)';
  customMenu.style.zIndex = '10000';
  customMenu.style.padding = '0.5rem 0';
  customMenu.style.minWidth = '150px';
  
  document.body.appendChild(customMenu);
  
  // Обработчики для пунктов меню
  customMenu.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      handleContextMenuAction(action);
      document.body.removeChild(customMenu);
    });
    
    item.style.padding = '0.5rem 1rem';
    item.style.cursor = 'pointer';
    item.style.transition = 'background 0.2s ease';
    
    item.addEventListener('mouseenter', () => {
      item.style.background = 'var(--serbian-white)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.background = 'white';
    });
  });
  
  // Закрытие меню при клике вне его
  setTimeout(() => {
    document.addEventListener('click', closeCustomMenu);
  }, 10);
  
  function closeCustomMenu() {
    if (document.body.contains(customMenu)) {
      document.body.removeChild(customMenu);
    }
    document.removeEventListener('click', closeCustomMenu);
  }
  
  function handleContextMenuAction(action) {
    switch(action) {
      case 'home':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'nature':
        const natureSection = document.getElementById('nature');
        if (natureSection) {
          window.scrollTo({
            top: natureSection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
        break;
      case 'cuisine':
        const cuisineSection = document.getElementById('cuisine');
        if (cuisineSection) {
          window.scrollTo({
            top: cuisineSection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: 'Сербия - Душа Балкан',
            text: 'Откройте для себя удивительную Сербию!',
            url: window.location.href
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
          alert('Ссылка скопирована в буфер обмена!');
        }
        break;
    }
  }
});

// ===== КЛАВИАТУРНЫЕ СОЧЕТАНИЯ =====
document.addEventListener('keydown', (e) => {
  // Alt + S - прокрутка к началу (Сербия)
  if (e.altKey && e.key === 's') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Alt + N - природа
  if (e.altKey && e.key === 'n') {
    e.preventDefault();
    const natureSection = document.getElementById('nature');
    if (natureSection) {
      window.scrollTo({
        top: natureSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  }
  
  // Alt + K - кухня
  if (e.altKey && e.key === 'k') {
    e.preventDefault();
    const cuisineSection = document.getElementById('cuisine');
    if (cuisineSection) {
      window.scrollTo({
        top: cuisineSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  }
  
  // Escape - закрытие меню
  if (e.key === 'Escape') {
    SerbiaWebsite.closeMobileMenu();
    
    // Закрытие кастомных меню
    const customMenu = document.querySelector('.serbian-context-menu');
    if (customMenu) {
      document.body.removeChild(customMenu);
    }
  }
});

// ===== ОПТИМИЗАЦИЯ ПРОИЗВОДИТЕЛЬНОСТИ =====
// Отложенная загрузка не критичных ресурсов
function loadDeferredResources() {
  // Загружаем дополнительные шрифты
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap';
  link.onload = () => {
    console.log('Дополнительные шрифты загружены');
  };
  document.head.appendChild(link);
  
  // Предзагрузка изображений для следующей страницы
  const preloadImages = [
    'manastir-raca.jpg',
    'culture-festival.jpg',
    'culture-music.jpg'
  ];
  
  preloadImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Запускаем через 3 секунды после загрузки
setTimeout(loadDeferredResources, 3000);

// ===== ИНФОРМАЦИЯ О ПРОЕКТЕ =====
console.log(`
%c🇷🇸 СЕРБИЯ - ДУША БАЛКАН %c
%cВерсия: 1.0.0
Дата: ${new Date().toLocaleDateString()}
Автор: Современный веб-дизайн
Стиль: Этно-минимализм + Урбанизм

Управление:
• Alt+S - На главную
• Alt+N - Природа
• Alt+K - Кухня
• Escape - Закрыть меню

Наслаждайтесь путешествием по Сербии!
`, 
'background: linear-gradient(135deg, #0c2e60, #c8102e); color: white; padding: 10px; border-radius: 5px; font-size: 16px;',
'',
'color: #666; line-height: 1.5;'
);

// Экспорт для использования в консоли
window.debugSerbia = {
  reloadImages: () => {
    document.querySelectorAll('img').forEach(img => {
      const src = img.src;
      img.src = '';
      img.src = src;
    });
    console.log('Изображения перезагружены');
  },
  showStats: () => {
    const stats = SerbiaWebsite.getState();
    console.table(stats);
  },
  toggleEffects: () => {
    document.body.classList.toggle('no-effects');
    console.log('Эффекты ' + (document.body.classList.contains('no-effects') ? 'отключены' : 'включены'));
  }
};