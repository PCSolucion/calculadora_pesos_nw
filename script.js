document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.c-weight');
    const combinationButtons = document.querySelectorAll('.combination-button');
    const lightBonus = document.querySelector('.c-weights-bonus-l');
    const mediumBonus = document.querySelector('.c-weights-bonus-m');
    const heavyBonus = document.querySelector('.c-weights-bonus-h');
    
    combinationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const combination = this.dataset.combination;
            clearSelections();
            if (combination === 'ligera') {
                setCombination(['4.7', '0', '1.5', '2.0', '4.7', null]);
            } else if (combination === 'ligera-rode') {
                setCombination(['1.5', '3.50001', '1.5', '2.0', '1.5', '2.7']);
            } else if (combination === 'ligera-sin-escudo') {
                setCombination(['1.5', '6.2', '1.5', '2.0', '1.5', null]);
            } else if (combination === 'ligera-lagrima') {
                setCombination(['1.5', '0', '1.5', '2.0', '1.5', '5.4']);
            } else if (combination === 'media-rode') {
                setCombination(['2.6', '3.5', '4.7', '3.500001', '4.7', '2.7']);
            } else if (combination === 'media-rode-pesopluma') {
                setCombination(['4.7', '0', '4.7', '6.3', '2.6', '2.7']);
            } else if (combination === 'media-pesopluma') {
                setCombination(['4.7', '0', '4.7', '6.3', '4.7', null]);
            } else if (combination === 'media-lagrima') {
                setCombination(['2.6', '6.2', '2.6', '3.500001', '2.6', '5.4']);
            } else if (combination === 'media-scutum') {
                setCombination(['1.5', '3.5', '1.5', '3.500001', '1.5', '11']);
            } else if (combination === 'media-scutum-pesopluma') {
                setCombination(['1.5', '0', '1.5', '6.3', '2.6', '11']);
            }
        });
    });

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

    function clearSelections() {
        buttons.forEach(button => {
            button.classList.remove('c-weight--active');
        });
        updateResult();
    }

    function setCombination(values) {
        const rows = document.querySelectorAll('.c-weights-table tr');
        values.forEach((value, index) => {
            if (value !== null) {
                const button = rows[index + 1].querySelector(`button[data-value="${value}"]`);
                if (button) {
                    button.classList.add('c-weight--active');
                }
            }
        });
        updateResult();
    }

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
        } else if ( totalWeight >= 13 && totalWeight < 23) {
            mediumBonus.classList.add('c-weights-bonus--active');
        } else {
            heavyBonus.classList.add('c-weights-bonus--active');
        }
    }

    updateResult();
});