var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = '0928d5a4a1a9de004e83a224de1ac392';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
export var WeatherCondition;
(function (WeatherCondition) {
    WeatherCondition["Clear"] = "Clear";
    WeatherCondition["Rain"] = "Rain";
    WeatherCondition["Drizzle"] = "Drizzle";
    WeatherCondition["Clouds"] = "Clouds";
    WeatherCondition["Snow"] = "Snow";
    WeatherCondition["Thunderstorm"] = "Thunderstorm";
    WeatherCondition["Mist"] = "Mist";
    WeatherCondition["Smoke"] = "Smoke";
    WeatherCondition["Haze"] = "Haze";
    WeatherCondition["Dust"] = "Dust";
    WeatherCondition["Fog"] = "Fog";
    WeatherCondition["Sand"] = "Sand";
    WeatherCondition["Ash"] = "Ash";
    WeatherCondition["Squall"] = "Squall";
    WeatherCondition["Tornado"] = "Tornado";
})(WeatherCondition || (WeatherCondition = {}));
function transformWeatherData(response) {
    const weatherInfo = response.weather[0];
    if (!weatherInfo) {
        throw new Error('Données météo invalides');
    }
    const weatherMain = weatherInfo.main;
    return {
        city: response.name,
        temperature: response.main.temp,
        weather: weatherMain
    };
}
export function getWeatherByCity(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=fr`;
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error('Ville non trouvée');
        }
        const data = yield response.json();
        return transformWeatherData(data);
    });
}
export function getWeatherByCoords(lat, lon) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`;
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error('Erreur de géolocalisation');
        }
        const data = yield response.json();
        return transformWeatherData(data);
    });
}
export function getForecast(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;
        const response = yield fetch(url);
        return yield response.json();
    });
}
export function getForecastByCoords(lat, lon) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`;
        const response = yield fetch(url);
        return yield response.json();
    });
}
//# sourceMappingURL=api.js.map