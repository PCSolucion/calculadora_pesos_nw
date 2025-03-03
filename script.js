document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.c-weight');
    const lightBonus = document.querySelector('.c-weights-bonus-l');
    const mediumBonus = document.querySelector('.c-weights-bonus-m');
    const heavyBonus = document.querySelector('.c-weights-bonus-h');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const activeButton = row.querySelector('.c-weight--active');
            if (this.classList.contains('c-weight--active')) {
                this.classList.remove('c-weight--active');
            } else {
                if (activeButton) {
                    activeButton.classList.remove('c-weight--active');
                }
                this.classList.add('c-weight--active');
            }
            updateResult();
        });
    });

    function updateResult() {
        let totalWeight = 0;
        buttons.forEach(button => {
            if (button.classList.contains('c-weight--active')) {
                totalWeight += parseFloat(button.dataset.value);
            }
        });

        updateBonuses(totalWeight);
    }

    function updateBonuses(totalWeight) {
        lightBonus.classList.remove('c-weights-bonus--active');
        mediumBonus.classList.remove('c-weights-bonus--active');
        heavyBonus.classList.remove('c-weights-bonus--active');

        if (totalWeight < 13) {
            lightBonus.classList.add('c-weights-bonus--active');
        } else if (totalWeight >= 13 && totalWeight < 23) {
            mediumBonus.classList.add('c-weights-bonus--active');
        } else {
            heavyBonus.classList.add('c-weights-bonus--active');
        }
    }

    updateResult();
});