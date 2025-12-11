// Полностью многофункциональный длинный JavaScript-код для современного сайта

// Обертка для выполнения кода после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // Переменные и константы
    // =========================
    const body = document.body;
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const menuToggle = document.getElementById('menu-toggle');
    const sections = document.querySelectorAll('section');
    const scrollBtn = document.getElementById('scrollToTop');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const lazyImages = document.querySelectorAll('img[data-src]');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const burger = document.querySelector('.burger');
    const dropdowns = document.querySelectorAll('.dropdown');

    // =========================
    // Мобильное меню (бургер)
    // =========================
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
    }

    // =========================
    // Плавное прокручивание по ссылкам
    // =========================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetID = link.getAttribute('href');
            document.querySelector(targetID).scrollIntoView({ behavior: 'smooth' });
            // Закрыть меню на мобильных
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    });

    // =========================
    // Кнопка "Наверх" с появлением
    // =========================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
        // Анимация шапки при прокрутке
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        // Lazy load элементов
        lazyLoad();
        // Анимация элементов
        animateOnScroll();
    });

    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =========================
    // Lazy load изображений (замена src)
    // =========================
    function lazyLoad() {
        lazyImages.forEach(img => {
            if (img.getAttribute('data-src') && isInViewport(img)) {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
            }
        });
    }

    // Проверка в viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight && rect.bottom > 0
        );
    }

    // =========================
    // Анимация элементов при скролле
    // =========================
    function animateOnScroll() {
        animatedElements.forEach(el => {
            if (isInViewport(el) && !el.classList.contains('animated')) {
                el.classList.add('animated', 'fade-in');
            }
        });
    }

    // =========================
    // Модальные окна
    // =========================
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalID = trigger.getAttribute('data-modal');
            const modal = document.querySelector(`#${modalID}`);
            if (modal) {
                modal.classList.add('open');
                body.classList.add('no-scroll');
            }
        });
    });

    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.classList.remove('open');
            body.classList.remove('no-scroll');
        });
    });

    // Закрытие по клику вне модального окна
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (modal.classList.contains('open') && e.target === modal) {
                modal.classList.remove('open');
                body.classList.remove('no-scroll');
            }
        });
    });

    // =========================
    // Вкладки (Tabs)
    // =========================
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Удалить активный класс у всех вкладок
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Показать соответствующий контент
            const target = tab.getAttribute('data-target');
            tabContents.forEach(content => {
                if (content.id === target) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // =========================
    // Аккордеон или раскрывающиеся секции
    // =========================
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            header.classList.toggle('active');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // =========================
    // Эффекты для элементов при входе (например, появление)
    // =========================
    function addScrollAnimations() {
        document.querySelectorAll('.scroll-animate').forEach(elem => {
            if (isInViewport(elem) && !elem.classList.contains('animated')) {
                elem.classList.add('animated', 'fade-in-up');
            }
        });
    }

    // Запуск при загрузке
    addScrollAnimations();

    // =========================
    // Обработка dropdown меню
    // =========================
    dropdowns.forEach(dd => {
        dd.addEventListener('mouseenter', () => {
            dd.classList.add('open');
        });
        dd.addEventListener('mouseleave', () => {
            dd.classList.remove('open');
        });
    });

    // =========================
    // Обработка формы (отправка, валидация)
    // =========================
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Простая валидация
            let valid = true;
            form.querySelectorAll('input, textarea').forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.classList.add('invalid');
                } else {
                    input.classList.remove('invalid');
                }
            });
            if (valid) {
                // Отправка формы
                fetch(form.action, {
                    method: form.method,
                    body: new FormData(form),
                })
                .then(response => response.json())
                .then(data => {
                    alert('Форма успешно отправлена!');
                    form.reset();
                })
                .catch(() => {
                    alert('Ошибка отправки формы');
                });
            }
        });
    });

    // =========================
    // Обработка события resize
    // =========================
    window.addEventListener('resize', () => {
        // Можно реализовать адаптивные функции
        console.log('Resize event:', window.innerWidth);
    });

    // =========================
    // Дополнительные функции
    // =========================
    function smoothScrollTo(targetSelector) {
        document.querySelector(targetSelector).scrollIntoView({ behavior: 'smooth' });
    }

    // =========================
    // Инициализация всех функций
    // =========================
    // Можно вызвать функции один раз при загрузке, если нужно
    lazyLoad();
    animateOnScroll();
});
