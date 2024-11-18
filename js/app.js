document.addEventListener('DOMContentLoaded', function() {
    // Открываем Web App на весь экран
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }

    // Инициализация элементов
    const energyControls = document.querySelector('.energy-controls');
    const collectButton = document.querySelector('.collect-button');
    const balanceElement = document.querySelector('.menu-value');
    const starsCountElement = document.querySelector('.stars-count');
    const miningRateElement = document.querySelector('.mining-rate');
    const buyStarsButton = document.querySelector('.buy-stars-button');

    // Начальные значения
    let balance = 0;
    let starsCount = 0; // количество звезд мощности

    function calculateReward() {
        const baseReward = 0.0001; // базовая награда
        const powerBonus = starsCount / 5; // бонус от звезд мощности
        const totalReward = (baseReward + powerBonus) / 10000; // делим на 10000
        return totalReward;
    }

    function formatBalance(value) {
        // Всегда используем 8 знаков после запятой
        return value.toFixed(8) + ' $STARS';
    }

    function updateBalance(amount) {
        balance += amount;
        balanceElement.textContent = formatBalance(balance);
    }

    function updateStarsCount(count) {
        starsCount = count;
        starsCountElement.textContent = `${count} ⭐`;
        // Обновляем отображение скорости добычи
        const miningRate = calculateReward();
        miningRateElement.textContent = formatBalance(miningRate);
    }

    function createNewProgressBar() {
        // Удаляем старый прогресс бар
        const oldBars = energyControls.querySelectorAll('.energy-bar');
        oldBars.forEach(bar => bar.remove());

        // Создаем новый прогресс бар
        const newBar = document.createElement('progress');
        newBar.className = 'energy-bar';
        newBar.setAttribute('max', '100');
        newBar.setAttribute('value', '0');

        // Вставляем новый прогресс бар
        energyControls.insertBefore(newBar, collectButton);

        return newBar;
    }

    function startEnergyProgress() {
        const energyBar = createNewProgressBar();
        collectButton.disabled = true;

        // Форсируем перерисовку
        void energyBar.offsetWidth;

        // Запускаем анимацию заполнения
        requestAnimationFrame(() => {
            energyBar.value = 100;
        });

        // Активируем кнопку через 5 секунд
        setTimeout(() => {
            collectButton.disabled = false;
        }, 5000);
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

    // Обработчик кнопки Собрать
    collectButton.addEventListener('click', () => {
        if (!collectButton.disabled) {
            vibrate();
            const reward = calculateReward();
            updateBalance(reward);
            startEnergyProgress();
        }
    });

    // Обработчик кнопки покупки звезд (временно для теста)
    buyStarsButton.addEventListener('click', () => {
        vibrate();
        updateStarsCount(starsCount + 1);
    });

    // Инициализация начальных значений
    updateBalance(0);
    updateStarsCount(0);

    // Запускаем первое заполнение энергии
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