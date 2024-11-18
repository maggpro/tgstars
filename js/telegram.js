let tg = window.Telegram.WebApp;

// Расширяем на весь экран
tg.expand();

// Принудительно устанавливаем темную тему
document.body.style.backgroundColor = '#0a0a0a';
document.documentElement.style.setProperty('--tg-theme-bg-color', '#0a0a0a');
document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', '#2a2a2a');
document.documentElement.style.setProperty('--tg-theme-text-color', '#ffffff');
document.documentElement.style.setProperty('--tg-theme-button-color', '#ffd700');
document.documentElement.style.setProperty('--tg-theme-button-text-color', '#ffffff');

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