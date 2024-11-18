document.addEventListener('DOMContentLoaded', function() {
    const energyControls = document.querySelector('.energy-controls');
    const collectButton = document.querySelector('.collect-button');
    const balanceElement = document.querySelector('.menu-value');
    let balance = 0;

    function createNewProgressBar() {
        // Удаляем старый progress bar если он есть
        const oldBar = document.querySelector('.energy-bar');
        if (oldBar) {
            oldBar.remove();
        }

        // Создаем новый progress bar
        const newBar = document.createElement('progress');
        newBar.className = 'energy-bar';
        newBar.max = 100;
        newBar.value = 0;

        // Вставляем новый progress bar перед кнопкой
        energyControls.insertBefore(newBar, collectButton);

        return newBar;
    }

    function updateBalance(amount) {
        balance += amount;
        balanceElement.textContent = balance.toFixed(2) + ' ⭐';
    }

    function vibrate() {
        try {
            window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
        } catch (error) {
            console.log('Haptic feedback error:', error);
        }
    }

    function startEnergyProgress() {
        const energyBar = createNewProgressBar();
        collectButton.disabled = true;

        // Начинаем заполнение
        setTimeout(() => {
            energyBar.value = 100;

            // Активируем кнопку через 5 секунд
            setTimeout(() => {
                collectButton.disabled = false;
            }, 5000);
        }, 50);
    }

    // Обработчик кнопки Собрать
    collectButton.addEventListener('click', () => {
        if (!collectButton.disabled) {
            vibrate();
            updateBalance(10);
            startEnergyProgress();
        }
    });

    // Запускаем первое заполнение
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