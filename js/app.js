document.addEventListener('DOMContentLoaded', function() {
    // Открываем Web App на весь экран
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
        window.Telegram.WebApp.setHeaderColor('#0a0a0a');
        window.Telegram.WebApp.setBackgroundColor('#0a0a0a');
    }

    // Инициализация элементов
    const energyControls = document.querySelector('.energy-controls');
    const collectButton = document.querySelector('.collect-button');
    const balanceElement = document.querySelector('.menu-value');
    const starsCountElement = document.querySelector('.stars-count');
    const miningRateElement = document.querySelector('.mining-rate');
    const buyStarsButton = document.querySelector('.buy-stars-button');

    let balance = 0;
    let starsCount = 0;

    function createNewProgressBar() {
        const oldBars = energyControls.querySelectorAll('.energy-bar');
        oldBars.forEach(bar => bar.remove());

        const newBar = document.createElement('progress');
        newBar.className = 'energy-bar';
        newBar.max = 100;
        newBar.value = 0;

        energyControls.insertBefore(newBar, collectButton);
        return newBar;
    }

    function startEnergyProgress() {
        const energyBar = createNewProgressBar();
        collectButton.disabled = true;

        // Принудительная перерисовка
        void energyBar.offsetWidth;

        // Запускаем заполнение
        setTimeout(() => {
            energyBar.value = 100;
        }, 50);

        // Активируем кнопку через 5 секунд
        setTimeout(() => {
            collectButton.disabled = false;
        }, 5000);
    }

    function calculateReward() {
        const baseReward = 0.0001;
        const powerBonus = starsCount / 5;
        return (baseReward + powerBonus) / 10000;
    }

    function formatBalance(value) {
        return value.toFixed(8) + ' $STARS';
    }

    function updateBalance(amount) {
        balance += amount;
        balanceElement.textContent = formatBalance(balance);
    }

    function updateStarsCount(count) {
        starsCount = count;
        starsCountElement.textContent = `${count} ⭐`;
        const miningRate = calculateReward();
        miningRateElement.textContent = formatBalance(miningRate);
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

    // Функция для покупки звезд через Telegram
    async function buyStars() {
        try {
            // Создаем ссылку для покупки с указанием количества
            const amount = 100; // 100 Telegram Stars

            // Пытаемся открыть окно покупки
            const result = await window.Telegram.WebApp.showPopup({
                title: 'Покупка звезд',
                message: `Вы хотите купить ${amount} Telegram Stars?`,
                buttons: [
                    {type: 'ok', text: 'Купить'},
                    {type: 'cancel', text: 'Отмена'}
                ]
            });

            if (result === 'ok') {
                // Если пользователь подтвердил покупку
                try {
                    // Пытаемся совершить покупку
                    await window.Telegram.WebApp.openInvoice('telegram_stars_100');

                    // Если покупка успешна, начисляем звезды мощности
                    updateStarsCount(starsCount + amount);

                    // Показываем сообщение об успехе
                    window.Telegram.WebApp.showPopup({
                        title: 'Успешно!',
                        message: `Добавлено ${amount} звезд мощности!`,
                        buttons: [{type: 'ok', text: 'OK'}]
                    });
                } catch (e) {
                    // Если произошла ошибка при покупке
                    console.error('Ошибка при покупке:', e);
                    window.Telegram.WebApp.showPopup({
                        title: 'Ошибка',
                        message: 'Не удалось совершить покупку. Попробуйте позже.',
                        buttons: [{type: 'ok', text: 'OK'}]
                    });
                }
            }
        } catch (e) {
            console.error('Ошибка:', e);
        }
    }

    // Обработчики кнопок
    collectButton.addEventListener('click', function() {
        if (!collectButton.disabled) {
            vibrate();
            const reward = calculateReward();
            updateBalance(reward);
            startEnergyProgress();
        }
    });

    buyStarsButton.addEventListener('click', async () => {
        vibrate();
        await buyStars();
    });

    // Инициализация
    updateBalance(0);
    updateStarsCount(0);
    startEnergyProgress();
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