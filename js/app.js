document.addEventListener('DOMContentLoaded', function() {
    const miningButton = document.querySelector('.mining-button');
    const statusBadge = document.querySelector('.status-badge');
    let isMining = false;

    miningButton.addEventListener('click', function() {
        isMining = !isMining;
        if (isMining) {
            miningButton.textContent = 'Остановить майнинг';
            statusBadge.textContent = 'Активен';
            statusBadge.style.background = '#98FB98';
        } else {
            miningButton.textContent = 'Начать майнинг';
            statusBadge.textContent = 'Ожидание';
            statusBadge.style.background = '#FFE4B5';
        }

        // Добавляем звезды обратно после изменения текста
        miningButton.insertAdjacentHTML('afterbegin', '⭐ ');
        miningButton.insertAdjacentHTML('beforeend', ' ⭐');
    });
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