import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {                                         // Получаем ключи из объекта и Перебираем по именам
        elements[elementName].append(...Object.values(indexes[elementName]).map(name => {   // в каждый элемент добавляем опции // формируем массив имён, значений опций // используйте name как значение и текстовое содержимое
            // @todo: создать и вернуть тег опции
            const elemTag = document.createElement('option');
            elemTag.textContent = name;
            elemTag.value = name;
            return elemTag;
        }))
     })
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        const applyFiltering = (query, state, action) => {
            if (action && action.name == 'clear') {
                const parent = action.parentElement;
                const input = parent.querySelector('input');
                const field = action.dataset.field;
                input.value = '';
                state[field] = '';
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}