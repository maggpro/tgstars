let tg = window.Telegram.WebApp;

// Расширяем на весь экран
tg.expand();

// Устанавливаем основную тему
tg.setHeaderColor('secondary_bg_color');

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, что приложение запущено в Telegram
    if (tg.initDataUnsafe.query_id) {
        console.log('Telegram Web App успешно инициализирован');
    }
});