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