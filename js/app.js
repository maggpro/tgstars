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

    // Обработчики кнопок
    collectButton.addEventListener('click', function() {
        if (!collectButton.disabled) {
            vibrate();
            const reward = calculateReward();
            updateBalance(reward);
            startEnergyProgress();
        }
    });

    buyStarsButton.addEventListener('click', function() {
        vibrate();
        updateStarsCount(starsCount + 1);
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