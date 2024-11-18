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
});