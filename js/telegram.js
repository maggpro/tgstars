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
    // Блокируем все жесты масштабирования
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    // Блокируем двойное нажатие
    document.addEventListener('dblclick', function(e) {
        e.preventDefault();
    }, { passive: false });

    // Блокируем жест щипка
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('gesturechange', function(e) {
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('gestureend', function(e) {
        e.preventDefault();
    }, { passive: false });

    // Предотвращаем любые действия масштабирования
    window.addEventListener('resize', function(e) {
        if (document.visualViewport.scale !== 1) {
            document.visualViewport.scale = 1;
        }
    });

    // Сброс масштаба при загрузке
    if (typeof window.visualViewport !== 'undefined') {
        window.visualViewport.scale = 1;
    }

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

    initUserProfile();
});

// Функция переключения страниц (добавьте свою логику)
function switchPage(page) {
    console.log('Переключение на страницу:', page);
    // Добавьте здесь логику переключения контента
}

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

// Добавьте эту функцию после инициализации tg
function initUserProfile() {
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    const userNameElement = document.getElementById('userName');
    const userIdElement = document.getElementById('userId');
    const userAvatarElement = document.getElementById('userAvatar');

    if (user) {
        // Устанавливаем имя пользователя
        const displayName = user.username ||
                          (user.first_name && user.last_name ?
                           `${user.first_name} ${user.last_name}` :
                           (user.first_name || `User ${user.id}`));

        userNameElement.textContent = displayName;
        userIdElement.textContent = `ID: ${user.id}`;

        // Если есть фото профиля
        if (user.photo_url) {
            userAvatarElement.src = user.photo_url;
        } else {
            // Если фото нет, генерируем инициалы для аватара
            const initials = displayName
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase();

            // Создаем canvas для отрисовки аватара с инициалами
            const canvas = document.createElement('canvas');
            canvas.width = 100;
            canvas.height = 100;
            const ctx = canvas.getContext('2d');

            // Рисуем круглый фон
            ctx.fillStyle = '#7B68EE';
            ctx.beginPath();
            ctx.arc(50, 50, 50, 0, Math.PI * 2);
            ctx.fill();

            // Добавляем инициалы
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '32px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(initials, 50, 50);

            // Устанавливаем созданное изображение как аватар
            userAvatarElement.src = canvas.toDataURL();
        }
    }
}