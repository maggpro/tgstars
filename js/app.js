document.addEventListener('DOMContentLoaded', function() {
    // Инициализация элементов для энергии
    const energyControls = document.querySelector('.energy-controls');
    const collectButton = document.querySelector('.collect-button');
    const balanceElement = document.querySelector('.menu-value');
    let balance = 0;

    // Инициализация профиля пользователя
    function initUserProfile() {
        const userNameElement = document.getElementById('userName');
        const userIdElement = document.getElementById('userId');
        const userAvatarElement = document.getElementById('userAvatar');

        // Получаем данные пользователя из Telegram WebApp
        const tg = window.Telegram.WebApp;

        if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
            const user = tg.initDataUnsafe.user;

            // Формируем имя пользователя
            const displayName = user.username ||
                              (user.first_name && user.last_name ?
                               `${user.first_name} ${user.last_name}` :
                               user.first_name || `User ${user.id}`);

            // Устанавливаем имя и ID
            userNameElement.textContent = displayName;
            userIdElement.textContent = `ID: ${user.id}`;

            // Создаем аватар
            const initials = displayName
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase();

            // Создаем canvas для аватара
            const canvas = document.createElement('canvas');
            canvas.width = 84;
            canvas.height = 84;
            const ctx = canvas.getContext('2d');

            // Рисуем круглый фон
            ctx.fillStyle = '#7B68EE';
            ctx.beginPath();
            ctx.arc(42, 42, 42, 0, Math.PI * 2);
            ctx.fill();

            // Добавляем инициалы
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(initials, 42, 42);

            // Устанавливаем аватар
            userAvatarElement.src = canvas.toDataURL();

        } else {
            // Если данные пользователя недоступны
            userNameElement.textContent = 'User';
            userIdElement.textContent = 'ID: 0';

            // Создаем дефолтный аватар
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
            ctx.fillText('U', 42, 42);

            userAvatarElement.src = canvas.toDataURL();
        }
    }

    function createNewProgressBar() {
        const oldBars = energyControls.querySelectorAll('.energy-bar');
        oldBars.forEach(bar => bar.remove());

        const newBar = document.createElement('progress');
        newBar.className = 'energy-bar';
        newBar.setAttribute('max', '100');
        newBar.setAttribute('value', '0');

        if (energyControls.firstChild) {
            energyControls.insertBefore(newBar, energyControls.firstChild);
        } else {
            energyControls.appendChild(newBar);
        }

        return newBar;
    }

    function updateBalance(amount) {
        balance += amount;
        balanceElement.textContent = balance.toFixed(2) + ' ⭐';
    }

    function vibrate() {
        if (window.Telegram && window.Telegram.WebApp) {
            try {
                window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
            } catch (e1) {
                try {
                    window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
                } catch (e2) {
                    try {
                        window.Telegram.WebApp.HapticFeedback.selectionChanged();
                    } catch (e3) {
                        console.log('Haptic feedback not available');
                    }
                }
            }
        }
    }

    function startEnergyProgress() {
        const energyBar = createNewProgressBar();
        collectButton.disabled = true;

        void energyBar.offsetWidth;

        requestAnimationFrame(() => {
            setTimeout(() => {
                energyBar.value = 100;

                setTimeout(() => {
                    collectButton.disabled = false;
                }, 5000);
            }, 50);
        });
    }

    collectButton.addEventListener('click', () => {
        if (!collectButton.disabled) {
            vibrate();
            updateBalance(10);
            startEnergyProgress();
        }
    });

    // Инициализация
    initUserProfile(); // Инициализируем профиль
    startEnergyProgress(); // Запускаем энергию
});

function updateEnergyBar(value, max) {
    const energyProgress = document.querySelector('.energy-progress');
    const percentage = (value / max) * 100;

    energyProgress.style.width = `${percentage}%`;

    if (percentage < 20) {
        energyProgress.style.backgroundColor = '#FF6B6B';
    } else if (percentage < 50) {
        energyProgress.style.backgroundColor = '#FFD93D';
    } else {
        energyProgress.style.backgroundColor = '#98FB98';
    }
}

// Пример использования:
updateEnergyBar(30, 100);