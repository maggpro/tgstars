document.addEventListener('DOMContentLoaded', function() {
    const energyBar = document.querySelector('.energy-bar');
    const collectButton = document.querySelector('.collect-button');
    const balanceElement = document.querySelector('.menu-value');
    let balance = 0;

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
        energyBar.value = 0;
        collectButton.disabled = true;

        requestAnimationFrame(() => {
            energyBar.value = 100;
        });

        setTimeout(() => {
            collectButton.disabled = false;
        }, 5000);
    }

    collectButton.addEventListener('click', function() {
        if (!collectButton.disabled) {
            vibrate();
            updateBalance(10);
            startEnergyProgress();
        }
    });

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