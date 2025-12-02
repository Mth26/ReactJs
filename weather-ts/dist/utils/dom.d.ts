import type { WeatherData, ForecastResponse } from './api.js';
import { WeatherCondition } from './api.js';
export declare function getWeatherEmoji(weatherCondition: WeatherCondition | string): string;
export declare function updateBackground(weatherCondition: WeatherCondition | string, temp: number): void;
export declare function displayWeatherData(data: WeatherData, elements: {
    cityName: HTMLElement;
    temperature: HTMLElement;
    description: HTMLElement;
    weatherEmoji: HTMLElement;
    weatherCard: HTMLElement;
}): void;
export declare function displayForecast(data: ForecastResponse, forecastCards: HTMLElement): void;
export declare function displayHistory(history: string[], historySection: HTMLElement, historyButtons: HTMLElement, onCityClick: (city: string) => void): void;
export declare function showLoader(loader: HTMLElement): void;
export declare function hideLoader(loader: HTMLElement): void;
export declare function hideElement(element: HTMLElement): void;
export declare function showElement(element: HTMLElement): void;
//# sourceMappingURL=dom.d.ts.map