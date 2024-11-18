let tg = window.Telegram.WebApp;

// Принудительно устанавливаем темную тему
tg.setThemeParams({
    bg_color: '#0a0a0a',
    secondary_bg_color: '#2a2a2a',
    text_color: '#ffffff',
    hint_color: '#999999',
    link_color: '#ffd700',
    button_color: '#ffd700',
    button_text_color: '#000000'
});

// Расширяем на весь экран
tg.expand();

// Устанавливаем цвет хедера и фона
tg.setHeaderColor('#0a0a0a');
tg.setBackgroundColor('#0a0a0a');

// Скрываем стандартные кнопки
tg.MainButton.hide();
tg.BackButton.hide();

// Принудительно устанавливаем CSS переменные
document.documentElement.style.cssText = `
    --tg-theme-bg-color: #0a0a0a !important;
    --tg-theme-secondary-bg-color: #2a2a2a !important;
    --tg-theme-text-color: #ffffff !important;
    --tg-theme-hint-color: #999999 !important;
    --tg-theme-link-color: #ffd700 !important;
    --tg-theme-button-color: #ffd700 !important;
    --tg-theme-button-text-color: #000000 !important;
`;

// Устанавливаем цвет фона для body
document.body.style.backgroundColor = '#0a0a0a';

// Инициализация профиля
document.addEventListener('DOMContentLoaded', function() {
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    if (user) {
        const displayName = user.username ||
                          (user.first_name && user.last_name ?
                           `${user.first_name} ${user.last_name}` :
                           (user.first_name || `User ${user.id}`));

        document.getElementById('userName').textContent = displayName;
        document.getElementById('userId').textContent = `ID: ${user.id}`;

        // Генерация аватара
        const initials = displayName
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();

        const canvas = document.createElement('canvas');
        canvas.width = 84;
        canvas.height = 84;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#7B68EE';
        ctx.beginPath();
        ctx.arc(42, 42, 42, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(initials, 42, 42);

        document.getElementById('userAvatar').src = canvas.toDataURL();
    }
});