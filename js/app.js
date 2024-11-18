document.addEventListener('DOMContentLoaded', function() {
    const energyProgress = document.querySelector('.energy-progress');
    const collectButton = document.querySelector('.collect-button');
    const balanceElement = document.querySelector('.menu-value');
    let balance = 0;

    function updateBalance(amount) {
        balance += amount;
        balanceElement.textContent = balance.toFixed(2) + ' ⭐';
    }

    function startEnergyProgress() {
        // Сбрасываем прогресс без анимации
        energyProgress.classList.remove('filling');
        energyProgress.classList.remove('filled');
        energyProgress.style.width = '0%';
        collectButton.disabled = true;

        // Добавляем небольшую задержку перед началом заполнения
        setTimeout(() => {
            // Добавляем класс для анимации заполнения
            energyProgress.classList.add('filling');
            energyProgress.style.width = '100%';

            // Когда энергия заполнена
            setTimeout(() => {
                energyProgress.classList.add('filled');
                collectButton.disabled = false;
            }, 5000); // 5 секунд на заполнение
        }, 50);
    }

    collectButton.addEventListener('click', function() {
        if (energyProgress.style.width === '100%') {
            updateBalance(10);
            startEnergyProgress();
        }
    });

    // Запускаем первоначальное заполнение
    startEnergyProgress();
});

function updateEnergyBar(value, max) {
    const energyProgress = document.querySelector('.energy-progress');
    const percentage = (value / max) * 100;

    energyProgress.style.width = `${percentage}%`;

    // Добавляем цветовую индикацию
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