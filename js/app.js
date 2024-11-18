document.addEventListener('DOMContentLoaded', function() {
    let balance = 0;
    let clickPower = 1;
    const balanceElement = document.querySelector('.balance-amount');
    const miningButton = document.getElementById('miningButton');

    miningButton.addEventListener('click', function() {
        balance += clickPower;
        balanceElement.textContent = `${balance} STARS`;

        // Анимация клика
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);

        // Создаем эффект всплывающих монет
        createFloatingCoin(event);
    });

    function createFloatingCoin(event) {
        const coin = document.createElement('div');
        coin.textContent = `+${clickPower}`;
        coin.style.cssText = `
            position: fixed;
            color: var(--gold-primary);
            font-weight: bold;
            pointer-events: none;
            animation: floatUp 1s ease-out;
            z-index: 1000;
        `;

        // Позиционируем относительно кнопки
        const rect = miningButton.getBoundingClientRect();
        coin.style.left = `${rect.left + rect.width/2}px`;
        coin.style.top = `${rect.top + rect.height/2}px`;

        document.body.appendChild(coin);

        setTimeout(() => {
            document.body.removeChild(coin);
        }, 1000);
    }
});