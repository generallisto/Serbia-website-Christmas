/* JavaScript Document

TemplateMo 605 Countdown - Сербская новогодняя версия с приколами

https://templatemo.com/tm-605-xmas-countdown

*/

// ===================== СЕРБСКИЕ НОВОГОДНИЕ ПРИКОЛЫ =====================

// 1. СЕРБСКИЙ НОВОГОДНИЙ СЧЁТЧИК-ПРИКОЛ
let rakijaCounter = 0;
let cevapiEaten = 0;

// Прикол с ракией (каждые 30 секунд)
function serbianRakijaCountdown() {
    setInterval(() => {
        rakijaCounter++;
        const rakijaElement = document.getElementById('rakija-counter');
        if (rakijaElement) {
            rakijaElement.textContent = rakijaCounter;
            
            // Приколы при разных значениях
            if (rakijaCounter === 3) {
                showToast("🍸 Уже 3 ракии! Может, хватит?");
            } else if (rakijaCounter === 5) {
                showToast("🍻 5 ракий! Теперь ты говоришь по-сербски!");
            } else if (rakijaCounter === 7) {
                showToast("🎵 7 ракий! Пора танцевать коло!");
                startSerbianDance();
            } else if (rakijaCounter === 10) {
                showToast("🎉 10 РАКИЙ! С Рождеством!");
                triggerFireworks();
            }
        }
    }, 30000); // Каждые 30 секунд
}

// 2. ПРИКОЛ С ČESNICA (новогодний пирог с монеткой)
function cesnicaCoinGame() {
    const cesnicaButton = document.getElementById('cesnica-btn');
    if (cesnicaButton) {
        cesnicaButton.addEventListener('click', () => {
            const fortunes = [
                "🎉 Тебе досталась монетка! Год будет богатым!",
                "🍀 Тебе повезёт в любви!",
                "🏔️ Поедешь в горы Сербии!",
                "💰 Найдёшь деньги на улице!",
                "🎶 Станешь звездой турбо-фолка!",
                "🥩 Будешь есть пршут каждый день!",
                "🇷🇸 Станешь почётным сербом!",
                "🎯 Попадёшь в цель во всём!"
            ];
            
            const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            
            // Анимация монетки
            const coin = document.createElement('div');
            coin.innerHTML = '🪙';
            coin.style.position = 'fixed';
            coin.style.fontSize = '50px';
            coin.style.zIndex = '9999';
            coin.style.left = Math.random() * window.innerWidth + 'px';
            coin.style.top = '-100px';
            coin.style.animation = 'coinFall 3s ease-out forwards';
            document.body.appendChild(coin);
            
            // Стиль для анимации
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes coinFall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    50% { transform: translateY(300px) rotate(180deg); opacity: 0.8; }
                    100% { transform: translateY(600px) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            // Показываем предсказание
            setTimeout(() => {
                showSerbianAlert("Česnica говорит:", randomFortune);
                coin.remove();
                style.remove();
            }, 1500);
        });
    }
}

// 3. ПРИКОЛ С БАДНЯКОМ (рождественское полено)
function badnjakFireEffect() {
    const fireBtn = document.getElementById('badnjak-btn');
    if (fireBtn) {
        fireBtn.addEventListener('click', () => {
            // Создаём эффект огня
            const fire = document.createElement('div');
            fire.innerHTML = '🔥';
            fire.style.position = 'fixed';
            fire.style.fontSize = '100px';
            fire.style.zIndex = '9999';
            fire.style.left = '50%';
            fire.style.top = '50%';
            fire.style.transform = 'translate(-50%, -50%)';
            fire.style.animation = 'fireEffect 2s ease-out forwards';
            document.body.appendChild(fire);
            
            // Звук огня (если разрешено)
            playFireSound();
            
            // Стиль для анимации
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes fireEffect {
                    0% { transform: translate(-50%, -50%) scale(0.1); opacity: 0; }
                    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            // Сообщение
            setTimeout(() => {
                showToast("🔥 Badnjak горит! Счастье в доме!");
                fire.remove();
                style.remove();
            }, 2000);
        });
    }
}

// 4. СЕРБСКИЙ ТАНЕЦ КОЛО (прикол при скролле)
function initSerbianDance() {
    let danceTriggered = false;
    
    window.addEventListener('scroll', () => {
        if (!danceTriggered && window.scrollY > window.innerHeight * 2) {
            danceTriggered = true;
            showToast("💃 Пора танцевать коло! Скролль дальше!");
        }
    });
}

function startSerbianDance() {
    const dancers = ['💃', '🕺', '💃', '🕺', '💃', '🕺'];
    dancers.forEach((dancer, index) => {
        setTimeout(() => {
            const danceElement = document.createElement('div');
            danceElement.innerHTML = dancer;
            danceElement.style.position = 'fixed';
            danceElement.style.fontSize = '40px';
            danceElement.style.zIndex = '9998';
            danceElement.style.left = (10 + index * 15) + '%';
            danceElement.style.bottom = '20px';
            danceElement.style.animation = `danceMove ${2 + index * 0.5}s infinite alternate`;
            danceElement.id = 'dancer-' + index;
            document.body.appendChild(danceElement);
        }, index * 200);
    });
    
    // Стиль для танца
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes danceMove {
            0% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-20px) rotate(10deg); }
            50% { transform: translateY(0) rotate(0deg); }
            75% { transform: translateY(-20px) rotate(-10deg); }
            100% { transform: translateY(0) rotate(0deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Убираем через 10 секунд
    setTimeout(() => {
        for (let i = 0; i < dancers.length; i++) {
            const dancer = document.getElementById('dancer-' + i);
            if (dancer) dancer.remove();
        }
        style.remove();
    }, 10000);
}

// 5. ПРИКОЛ С ТУРБО-ФОЛКОМ (случайное включение музыки)
function turboFolkSurprise() {
    const musicButton = document.getElementById('turbo-btn');
    if (musicButton) {
        musicButton.addEventListener('click', () => {
            const songs = [
                "🎵 Ако umrem sutra - Драгана Мирковић",
                "🎵 Ludača - Снежана Ђуришић",
                "🎵 Pogrešan broj - Индира Радић",
                "🎵 200 na sat - Аца Лукас",
                "🎵 Pozovi - Северина",
                "🎵 Ne volim te al' te želim - Лепа Брена"
            ];
            
            const randomSong = songs[Math.floor(Math.random() * songs.length)];
            
            // Эффект музыкальных нот
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const note = document.createElement('div');
                    note.innerHTML = '🎵';
                    note.style.position = 'fixed';
                    note.style.fontSize = '30px';
                    note.style.zIndex = '9997';
                    note.style.left = Math.random() * window.innerWidth + 'px';
                    note.style.top = Math.random() * window.innerHeight + 'px';
                    note.style.animation = 'noteFloat 2s ease-out forwards';
                    document.body.appendChild(note);
                    
                    setTimeout(() => note.remove(), 2000);
                }, i * 100);
            }
            
            showSerbianAlert("🎤 Турбо-фолк хит:", randomSong);
            
            // Стиль для нот
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes noteFloat {
                    0% { transform: scale(0.5) rotate(0deg); opacity: 0; }
                    50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
                    100% { transform: scale(0.5) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => style.remove(), 2000);
        });
    }
}

// 6. СЕРБСКИЙ ГАДАЛЬНЫЙ ПРИКОЛ (предсказания на год)
function serbianFortuneTeller() {
    const fortuneBtn = document.getElementById('fortune-btn');
    if (fortuneBtn) {
        fortuneBtn.addEventListener('click', () => {
            const fortunes = {
                "Пршут": "🍖 Тебя ждёт много вкусного пршута!",
                "Ракия": "🍸 Будет много поводов для ракии!",
                "Футбол": "⚽ Црвена Звезда или Партизан? Удача будет на твоей стороне!",
                "Горы": "🏔️ Поедешь в Копаоник или Златибор!",
                "Коло": "💃 Научишься танцевать сербское коло!",
                "Язык": "🗣️ Выучишь сербский язык!",
                "Деньги": "💰 Найдёшь монетку в česnica!",
                "Любовь": "❤️ Встретишь любовь в Сербии!"
            };
            
            const items = Object.keys(fortunes);
            const randomItem = items[Math.floor(Math.random() * items.length)];
            const fortune = fortunes[randomItem];
            
            // Анимация карты
            const card = document.createElement('div');
            card.innerHTML = `
                <div style="background: linear-gradient(135deg, #c6363c, #f8e71c); 
                           padding: 30px; border-radius: 20px; text-align: center;
                           box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
                    <div style="font-size: 60px; margin-bottom: 20px;">${randomItem === 'Пршут' ? '🍖' : 
                                      randomItem === 'Ракия' ? '🍸' : 
                                      randomItem === 'Футбол' ? '⚽' :
                                      randomItem === 'Горы' ? '🏔️' :
                                      randomItem === 'Коло' ? '💃' :
                                      randomItem === 'Язык' ? '🗣️' :
                                      randomItem === 'Деньги' ? '💰' : '❤️'}</div>
                    <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">${randomItem}</div>
                    <div style="font-size: 18px;">${fortune}</div>
                </div>
            `;
            
            card.style.position = 'fixed';
            card.style.zIndex = '10000';
            card.style.left = '50%';
            card.style.top = '50%';
            card.style.transform = 'translate(-50%, -50%) scale(0.1)';
            card.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            document.body.appendChild(card);
            
            setTimeout(() => {
                card.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);
            
            // Закрытие по клику
            card.addEventListener('click', () => {
                card.style.transform = 'translate(-50%, -50%) scale(0.1)';
                setTimeout(() => card.remove(), 500);
            });
        });
    }
}

// 7. ПРИКОЛ С ФЕЙЕРВЕРКАМИ В БЕЛГРАДЕ
function triggerFireworks() {
    // Создаём фейерверки
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.innerHTML = '🎆';
            firework.style.position = 'fixed';
            firework.style.fontSize = (20 + Math.random() * 40) + 'px';
            firework.style.zIndex = '9996';
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = Math.random() * window.innerHeight + 'px';
            firework.style.animation = `fireworkBoom ${1 + Math.random()}s ease-out forwards`;
            document.body.appendChild(firework);
            
            setTimeout(() => firework.remove(), 1000);
        }, i * 50);
    }
    
    // Стиль для фейерверков
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fireworkBoom {
            0% { transform: scale(0.1) rotate(0deg); opacity: 0; }
            50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
            100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        style.remove();
        showToast("🎇 С Новым годом! Как в Белграде!");
    }, 1000);
}

// 8. СЕРБСКИЙ ТАЙМЕР ДО НОВОГО ГОДА С ПРИКОЛАМИ
function serbianNewYearCountdown() {
    const newYear = new Date('December 31, 2025 23:59:59').getTime();
    
    function update() {
        const now = new Date().getTime();
        const distance = newYear - now;
        
        if (distance < 0) return;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Обновляем таймер
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        
        // ПРИКОЛЫ ВО ВРЕМЯ ОТСЧЁТА
        if (seconds % 30 === 0 && seconds !== 0) {
            const messages = [
                "⏰ Не забудь подготовить ракию!",
                "🎄 Česnica уже в печи?",
                "🔥 Badnjak готов к сжиганию?",
                "🍖 Пршут нарезан?",
                "💃 Готов танцевать коло?",
                "🎵 Включи турбо-фолк!"
            ];
            showToast(messages[Math.floor(Math.random() * messages.length)]);
        }
        
        // Особые приколы при определённом времени
        if (days === 7) {
            showToast("📅 Ровно неделя до Нового года! Готовь ракию!");
        } else if (days === 0 && hours === 1) {
            showToast("🚨 ЧАС ДО НОВОГО ГОДА! Включай музыку!");
        } else if (days === 0 && hours === 0 && minutes === 10) {
            showToast("⏳ 10 МИНУТ! Готовь фейерверки!");
            triggerFireworks();
        }
    }
    
    update();
    setInterval(update, 1000);
}

// ===================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====================

// Показ сербского тоста
function showToast(message) {
    // Убираем предыдущие тосты
    const oldToasts = document.querySelectorAll('.serbian-toast');
    oldToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = 'serbian-toast';
    toast.innerHTML = `
        <div style="background: linear-gradient(135deg, #c6363c, #f8e71c); 
                   color: white; padding: 15px 25px; border-radius: 50px;
                   font-weight: bold; box-shadow: 0 5px 20px rgba(198,54,60,0.3);
                   display: flex; align-items: center; gap: 10px;">
            <span>🇷🇸</span>
            <span>${message}</span>
        </div>
    `;
    
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.zIndex = '10000';
    toast.style.animation = 'toastIn 0.3s ease-out, toastOut 0.3s ease-in 2.7s';
    
    document.body.appendChild(toast);
    
    // Стили для анимации
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.innerHTML = `
            @keyframes toastIn {
                from { transform: translateX(-50%) translateY(-100px); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
            @keyframes toastOut {
                from { transform: translateX(-50%) translateY(0); opacity: 1; }
                to { transform: translateX(-50%) translateY(-100px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => toast.remove(), 3000);
}

// Сербское алерт-окно
function showSerbianAlert(title, message) {
    const alertBox = document.createElement('div');
    alertBox.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
                   background: rgba(0,0,0,0.5); z-index: 10000; 
                   display: flex; align-items: center; justify-content: center;">
            <div style="background: linear-gradient(135deg, #1a365d, #c6363c); 
                       padding: 30px; border-radius: 20px; max-width: 400px;
                       text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.4);">
                <div style="font-size: 40px; margin-bottom: 20px;">🇷🇸</div>
                <h3 style="color: #f8e71c; margin-bottom: 15px;">${title}</h3>
                <p style="color: white; font-size: 18px; margin-bottom: 25px;">${message}</p>
                <button style="background: #f8e71c; color: #1a365d; border: none;
                          padding: 12px 30px; border-radius: 50px; font-weight: bold;
                          cursor: pointer; font-size: 16px;">Srećno!</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(alertBox);
    
    // Закрытие по кнопке
    alertBox.querySelector('button').addEventListener('click', () => {
        alertBox.remove();
    });
}

// Звук огня (имитация)
function playFireSound() {
    // Создаём визуальный эффект звука
    const soundWave = document.createElement('div');
    soundWave.innerHTML = '🔊';
    soundWave.style.position = 'fixed';
    soundWave.style.fontSize = '30px';
    soundWave.style.zIndex = '9999';
    soundWave.style.right = '20px';
    soundWave.style.bottom = '20px';
    soundWave.style.animation = 'soundWave 1s ease-out forwards';
    document.body.appendChild(soundWave);
    
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes soundWave {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(3); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        soundWave.remove();
        style.remove();
    }, 1000);
}

// ===================== ИНИЦИАЛИЗАЦИЯ =====================

// Создание снежинок
function createSerbianSnow() {
   const container = document.getElementById('snowBackground');
   if (!container) return;

   for (let i = 0; i < 30; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake-bg';
      
      // Случайные сербские символы вместо обычных снежинок
      const symbols = ['❄', '🇷🇸', '✨', '🎄', '🌟', '🎅', '🎁', '🍖', '🍸'];
      snowflake.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      
      snowflake.style.left = Math.random() * 100 + '%';
      snowflake.style.animationDuration = (10 + Math.random() * 15) + 's';
      snowflake.style.animationDelay = Math.random() * 10 + 's';
      snowflake.style.fontSize = (1 + Math.random() * 2) + 'rem';
      snowflake.style.opacity = 0.2 + Math.random() * 0.4;
      
      container.appendChild(snowflake);
   }
}

// Навигация
function setupSerbianNavigation() {
   const toggle = document.getElementById('navToggle');
   const nav = document.getElementById('nav');
   
   if (!toggle || !nav) return;

   toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
      
      // Прикол при открытии меню
      if (nav.classList.contains('active')) {
         setTimeout(() => {
            showToast("🇷🇸 Dobrodošli! Добро пожаловать!");
         }, 300);
      }
   });

   nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
         toggle.classList.remove('active');
         nav.classList.remove('active');
         
         // Прикол при переходе по ссылке
         const linkText = link.textContent;
         showToast(`Идём на "${linkText}"! Срећно!`);
      });
   });
}

// Прокрутка
function handleSerbianScroll() {
   const header = document.getElementById('header');
   if (!header) return;
   
   if (window.scrollY > 50) {
      header.classList.add('scrolled');
   } else {
      header.classList.remove('scrolled');
   }
}

// Обновление списка желаний
function updateWishes() {
    const checkboxes = document.querySelectorAll('.wish-list input[type="checkbox"]');
    if (!checkboxes.length) return;
    
    const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
    const total = checkboxes.length;
    const counter = document.getElementById('wish-counter');
    
    if (!counter) return;
    
    const percentage = Math.round((completed / total) * 100);
    counter.textContent = `✅ Выполнено: ${completed}/${total} (${percentage}%)`;
    
    // Приколы при выполнении желаний
    if (completed === 1) {
        showToast("🎯 Первое желание выполнено! Так держать!");
    } else if (completed === total) {
        counter.innerHTML = '🎉 ВСЁ ВЫПОЛНЕНО! Ты готов к Новому Году в Сербии! 🇷🇸';
        counter.style.color = '#f8e71c';
        counter.style.fontWeight = 'bold';
        triggerFireworks();
    }
}

// Главная инициализация
document.addEventListener('DOMContentLoaded', () => {
   // Создаём снег
   createSerbianSnow();
   
   // Запускаем таймер с приколами
   serbianNewYearCountdown();
   
   // Настройка навигации
   setupSerbianNavigation();
   
   // Прикол с ракией
   serbianRakijaCountdown();
   
   // Инициализация приколов
   cesnicaCoinGame();
   badnjakFireEffect();
   initSerbianDance();
   turboFolkSurprise();
   serbianFortuneTeller();
   
   // Обработка скролла
   window.addEventListener('scroll', handleSerbianScroll);
   
   // Обновление желаний при загрузке
   updateWishes();
   
   // Прикол при загрузке страницы
   setTimeout(() => {
      showToast("🇷🇸 Dobrodošli u Srbiju! Добро пожаловать в Сербию!");
   }, 1000);
   
   // Случайный прикол каждые 2 минуты
   setInterval(() => {
      const jokes = [
         "Знаешь, почему сербы любят Новый год? Потому что можно есть пршут и пить ракию!",
         "Сербская мудрость: Лучшая česnica та, в которой нашёл монетку!",
         "В Сербии говорят: С Новым годом, с новым счастьем и новой ракией!",
         "Сербская традиция: Чем больше гостей, тем больше радости!",
         "Знаешь, как сербы празднуют? Громко, весело и с открытым сердцем!"
      ];
      showToast(jokes[Math.floor(Math.random() * jokes.length)]);
   }, 120000);
   
   // Приветствие в зависимости от времени суток
   const hour = new Date().getHours();
   let greeting;
   if (hour < 12) greeting = "Добро јутро! Доброе утро!";
   else if (hour < 18) greeting = "Добар дан! Добрый день!";
   else greeting = "Добро вече! Добрый вечер!";
   
   setTimeout(() => {
      showToast(`${greeting} Готовься к Новому году!`);
   }, 3000);
});

// Добавляем кнопки для приколов в HTML (если их нет)
function addSerbianButtons() {
    const buttonsHTML = `
        <div style="position: fixed; bottom: 20px; right: 20px; z-index: 1000; display: flex; gap: 10px; flex-direction: column;">
            <button id="cesnica-btn" style="background: linear-gradient(135deg, #c6363c, #f8e71c); 
                    border: none; color: white; padding: 10px 20px; border-radius: 50px; 
                    cursor: pointer; font-weight: bold; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
                🥮 Česnica
            </button>
            <button id="badnjak-btn" style="background: linear-gradient(135deg, #c6363c, #f8e71c); 
                    border: none; color: white; padding: 10px 20px; border-radius: 50px; 
                    cursor: pointer; font-weight: bold; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
                🔥 Badnjak
            </button>
            <button id="turbo-btn" style="background: linear-gradient(135deg, #c6363c, #f8e71c); 
                    border: none; color: white; padding: 10px 20px; border-radius: 50px; 
                    cursor: pointer; font-weight: bold; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
                🎵 Турбо-фолк
            </button>
            <button id="fortune-btn" style="background: linear-gradient(135deg, #c6363c, #f8e71c); 
                    border: none; color: white; padding: 10px 20px; border-radius: 50px; 
                    cursor: pointer; font-weight: bold; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
                🔮 Гадание
            </button>
        </div>
        <div id="rakija-counter" style="position: fixed; top: 20px; right: 20px; 
                background: rgba(198,54,60,0.8); color: white; padding: 10px 20px; 
                border-radius: 50px; font-weight: bold; z-index: 1000; display: none;">
            🍸 Ракии: <span>0</span>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', buttonsHTML);
    
    // Показываем счётчик ракии
    setTimeout(() => {
        const counter = document.getElementById('rakija-counter');
        if (counter) counter.style.display = 'block';
    }, 5000);
}

// Добавляем кнопки при полной загрузке
window.addEventListener('load', addSerbianButtons);
