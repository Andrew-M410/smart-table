import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison([
        rules.skipEmptyTargetValues,
        rules.searchMultipleFields(
            searchField,
            ["date", "customer", "seller"],
            false,
        ),
    ]);

    // @todo: #5.2 — применить компаратор
    return (data, state) => {
        const value = state[searchField];
        if (!value) return data; // если поле пустое, возвращаем все строки
        return data.filter((row) => compare(row, state));
    };
}