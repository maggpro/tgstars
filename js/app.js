document.addEventListener('DOMContentLoaded', function() {
    const energyProgress = document.querySelector('.energy-progress');
    const collectButton = document.querySelector('.collect-button');
    const balanceElement = document.querySelector('.menu-value'); // элемент с балансом
    let balance = 0;

    function updateBalance(amount) {
        balance += amount;
        balanceElement.textContent = balance.toFixed(2) + ' ⭐';
    }

    function startEnergyProgress() {
        // Сбрасываем прогресс
        energyProgress.style.width = '0%';
        energyProgress.classList.remove('filled');
        collectButton.disabled = true;

        // Запускаем анимацию заполнения
        setTimeout(() => {
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
            // Перезапускаем прогресс сразу после нажатия
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