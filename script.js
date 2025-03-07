// Variable global para almacenar los textos originales
const originalTexts = new Map();

// Función para traducir el texto
function translateText(text, lang) {
    if (!translations[lang] || !translations[lang][text]) {
        console.log(`No translation found for "${text}" in ${lang}`);
        return text;
    }
    return translations[lang][text];
}

// Función para actualizar todos los textos traducibles
function updateTranslations(lang) {
    console.log(`Updating translations to ${lang}`);
    
    // Actualizar títulos de la tabla
    document.querySelectorAll('.c-weights-table th').forEach(th => {
        const originalText = originalTexts.get(th);
        if (originalText) {
            th.textContent = translateText(originalText, lang);
        }
    });

    // Actualizar botones de combinación
    document.querySelectorAll('.combination-button').forEach(button => {
        const originalText = originalTexts.get(button);
        if (originalText) {
            button.textContent = translateText(originalText, lang);
        }
    });

    // Actualizar títulos de bonificaciones
    document.querySelectorAll('.c-weights-bonus h3').forEach(h3 => {
        const originalText = originalTexts.get(h3);
        if (originalText) {
            h3.textContent = translateText(originalText, lang);
        }
    });

    // Actualizar título de peso total
    const totalWeightTitle = document.querySelector('.total-weight h3');
    if (totalWeightTitle) {
        const originalText = originalTexts.get(totalWeightTitle);
        if (originalText) {
            totalWeightTitle.textContent = translateText(originalText, lang);
        }
    }

    // Actualizar textos de bonificaciones
    document.querySelectorAll('.c-weights-bonus li').forEach(li => {
        const originalText = originalTexts.get(li);
        if (originalText) {
            li.textContent = translateText(originalText, lang);
        }
    });

    // Actualizar elementos con data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (key) {
            element.textContent = translateText(key, lang);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.c-weight');
    const combinationButtons = document.querySelectorAll('.combination-button');
    const lightBonus = document.querySelector('.c-weights-bonus-l');
    const mediumBonus = document.querySelector('.c-weights-bonus-m');
    const heavyBonus = document.querySelector('.c-weights-bonus-h');
    const totalValue = document.querySelector('.total-value');
    const weightBar = document.querySelector('.weight-bar');
    
    // Inicializar el selector de idiomas
    const languageButtons = document.querySelectorAll('.language-btn');
    let currentLang = 'es'; // Mantener registro del idioma actual
    
    // Establecer español como idioma por defecto
    languageButtons[0].classList.add('active');
    
    // Guardar textos originales de la tabla
    document.querySelectorAll('.c-weights-table th').forEach(th => {
        originalTexts.set(th, th.textContent.trim());
    });
    
    // Guardar textos originales de los botones de combinación
    document.querySelectorAll('.combination-button').forEach(button => {
        originalTexts.set(button, button.textContent.trim());
    });
    
    // Guardar textos originales de los títulos de bonificaciones
    document.querySelectorAll('.c-weights-bonus h3').forEach(h3 => {
        originalTexts.set(h3, h3.textContent.trim());
    });
    
    // Guardar texto original del título de peso total
    const totalWeightTitle = document.querySelector('.total-weight h3');
    if (totalWeightTitle) {
        originalTexts.set(totalWeightTitle, 'Peso Total');
    }
    
    // Guardar textos originales de las bonificaciones
    document.querySelectorAll('.c-weights-bonus li').forEach(li => {
        originalTexts.set(li, li.textContent.trim());
    });
    
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            languageButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir clase active al botón clickeado
            button.classList.add('active');
            
            // Obtener el idioma seleccionado
            currentLang = button.getAttribute('data-lang');
            // Actualizar las traducciones
            updateTranslations(currentLang);
        });
    });
    
    combinationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover la clase active de todos los botones
            combinationButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar la clase active al botón clickeado
            this.classList.add('active');
            
            const combination = this.dataset.combination;
            clearSelections();
            if (combination === 'ligera-normal') {
                setCombination(['1.5', '6.2', '1.5', '2.0', '1.5', null]);
            } else if (combination === 'ligera') {
                setCombination(['4.7', '0', '1.5', '2.0', '4.7', null]);
            } else if (combination === 'ligera-rode') {
                setCombination(['1.5', '3.50001', '1.5', '2.0', '1.5', '2.7']);
            } else if (combination === 'ligera-sin-escudo') {
                setCombination(['1.5', '6.2', '1.5', '2.0', '1.5', null]);
            } else if (combination === 'ligera-lagrima') {
                setCombination(['1.5', '0', '1.5', '2.0', '1.5', '5.4']);
            } else if (combination === 'media-rode') {
                setCombination(['2.6', '3.50001', '4.7', '3.500001', '4.7', '2.7']);
            } else if (combination === 'media-rode-pesopluma') {
                setCombination(['4.7', '0', '4.7', '6.3', '2.6', '2.7']);
            } else if (combination === 'media-pesopluma') {
                setCombination(['4.7', '0', '4.7', '6.3', '4.7', null]);
            } else if (combination === 'media-lagrima') {
                setCombination(['2.6', '6.2', '2.6', '3.500001', '2.6', '5.4']);
            } else if (combination === 'media-scutum') {
                setCombination(['1.5', '3.50001', '1.5', '3.500001', '1.5', '11']);
            } else if (combination === 'media-scutum-pesopluma') {
                setCombination(['1.5', '0', '1.5', '6.3', '2.6', '11']);
            }
        });
    });

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover la clase active de todos los botones de combinación
            combinationButtons.forEach(btn => btn.classList.remove('active'));
            
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

        totalValue.textContent = totalWeight.toFixed(1);
        
        // Actualizar la barra de progreso
        const maxWeight = 42.4;
        const percentage = Math.min((totalWeight / maxWeight) * 100, 100);
        weightBar.style.width = `${percentage}%`;

        // Actualizar el color de la barra según el peso
        if (totalWeight <= 12.9) {
            weightBar.style.background = 'hsl(142.1 76.2% 36.3%)';
        } else if (totalWeight < 23) {
            weightBar.style.background = 'hsl(32 100% 50%)';
        } else {
            weightBar.style.background = 'hsl(16 100% 50%)';
        }
        
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