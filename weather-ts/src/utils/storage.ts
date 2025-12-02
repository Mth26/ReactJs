export function loadHistoryFromStorage(): string[] {
  try {
    const raw = localStorage.getItem('weatherHistory');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (e) {
    console.warn('Impossible de charger l\'historique depuis localStorage.', e);
    return [];
  }
}

export function saveHistoryToStorage(history: string[]): void {
  localStorage.setItem('weatherHistory', JSON.stringify(history));
}

export function addToHistory(city: string, history: string[], maxItems: number = 8): string[] {
  if (!city) return history;

  const alreadyIn = history.some(
    (existing) => existing.toLowerCase() === city.toLowerCase()
  );
  if (alreadyIn) return history;

  const newHistory = [city, ...history];

  if (newHistory.length > maxItems) {
    return newHistory.slice(0, maxItems);
  }

  return newHistory;
}
