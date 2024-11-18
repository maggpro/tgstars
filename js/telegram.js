let tg = window.Telegram.WebApp;

// Расширяем на весь экран
tg.expand();

// Устанавливаем тему
document.documentElement.style.setProperty('--tg-theme-bg-color', tg.backgroundColor);
document.documentElement.style.setProperty('--tg-theme-text-color', tg.textColor);
document.documentElement.style.setProperty('--tg-theme-button-color', tg.buttonColor);
document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.buttonTextColor);

// Принудительно устанавливаем темную тему
if (tg.colorScheme !== 'dark') {
    document.body.style.backgroundColor = '#0a0a0a';
    document.documentElement.style.setProperty('--tg-theme-bg-color', '#0a0a0a');
    document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', '#2a2a2a');
    document.documentElement.style.setProperty('--tg-theme-text-color', '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-button-color', '#ffd700');
    document.documentElement.style.setProperty('--tg-theme-button-text-color', '#ffffff');
}

// Добавляем класс темной темы к body
document.body.classList.add('dark-theme');

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Предотвращаем масштабирование
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    // Улучшенная обработка кликов для меню
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        // Добавляем обработчики и для клика, и для тача
        ['click', 'touchend'].forEach(eventType => {
            item.addEventListener(eventType, function(e) {
                e.preventDefault(); // Предотвращаем стандартное поведение

                // Убираем активный класс у всех элементов
                menuItems.forEach(i => {
                    i.classList.remove('active');
                    i.style.color = 'rgba(255, 255, 255, 0.7)';
                });

                // Добавляем активный класс текущему элементу
                this.classList.add('active');
                this.style.color = '#ffd700';

                // Здесь добавьте логику переключения страниц
                const page = this.dataset.page;
                switchPage(page);
            }, { passive: false });
        });
    });
});

// Функция переключения страниц (добавьте свою логику)
function switchPage(page) {
    console.log('Переключение на страницу:', page);
    // Добавьте здесь логику переключения контента
}

// Дополнительные обработчики для предотвращения масштабирования
document.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

// Предотвращаем двойной тап
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Проверяем, что приложение запущено в Telegram
if (tg.initDataUnsafe.query_id) {
    console.log('Telegram Web App успешно инициализирован');
}

// Принудительно устанавливаем темный фон для меню
const bottomMenu = document.querySelector('.bottom-menu');
bottomMenu.style.backgroundColor = '#1c1c1c';

// Если меню все еще светлое, добавляем дополнительный слой
const forceBackground = document.createElement('div');
forceBackground.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 45px;
    background-color: #1c1c1c !important;
    z-index: 999;
`;
document.body.appendChild(forceBackground);

// Принудительно устанавливаем стили
const styleOverride = document.createElement('style');
styleOverride.innerHTML = `
    .menu-item.active,
    .menu-item.active * {
        color: #ffd700 !important;
        background: none !important;
        border: none !important;
    }

    .menu-item:not(.active),
    .menu-item:not(.active) * {
        color: rgba(255, 255, 255, 0.7) !important;
        background: none !important;
        border: none !important;
    }

    /* Отключаем стандартные стили Telegram */
    button.button-color {
        background: none !important;
        color: inherit !important;
    }
`;
document.head.appendChild(styleOverride);