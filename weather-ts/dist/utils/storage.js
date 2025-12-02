export function loadHistoryFromStorage() {
    try {
        const raw = localStorage.getItem('weatherHistory');
        if (!raw)
            return [];
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
            return parsed;
        }
        return [];
    }
    catch (e) {
        console.warn('Impossible de charger l\'historique depuis localStorage.', e);
        return [];
    }
}
export function saveHistoryToStorage(history) {
    localStorage.setItem('weatherHistory', JSON.stringify(history));
}
export function addToHistory(city, history, maxItems = 8) {
    if (!city)
        return history;
    const alreadyIn = history.some((existing) => existing.toLowerCase() === city.toLowerCase());
    if (alreadyIn)
        return history;
    const newHistory = [city, ...history];
    if (newHistory.length > maxItems) {
        return newHistory.slice(0, maxItems);
    }
    return newHistory;
}
//# sourceMappingURL=storage.js.map