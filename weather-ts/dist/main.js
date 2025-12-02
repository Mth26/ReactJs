var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getWeatherByCity, getWeatherByCoords, getForecast, getForecastByCoords } from './utils/api.js';
import { displayWeatherData, displayForecast, displayHistory, showLoader, hideLoader, hideElement } from './utils/dom.js';
import { loadHistoryFromStorage, saveHistoryToStorage, addToHistory } from './utils/storage.js';
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const loader = document.getElementById('loader');
const weatherCard = document.getElementById('weatherCard');
const cityName = document.getElementById('cityName');
const weatherEmoji = document.getElementById('weatherEmoji');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const historySection = document.getElementById('historySection');
const historyButtons = document.getElementById('historyButtons');
const forecastSection = document.getElementById('forecastSection');
const forecastCards = document.getElementById('forecastCards');
let searchHistory = loadHistoryFromStorage();
let isDarkMode = false;
function search(city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            showLoader(loader);
            hideElement(weatherCard);
            hideElement(forecastSection);
            const weatherData = yield getWeatherByCity(city);
            const forecastData = yield getForecast(city);
            hideLoader(loader);
            displayWeatherData(weatherData, {
                cityName,
                temperature,
                description,
                weatherEmoji,
                weatherCard
            });
            displayForecast(forecastData, forecastCards);
            forecastSection.classList.remove('hidden');
            searchHistory = addToHistory(weatherData.city, searchHistory);
            saveHistoryToStorage(searchHistory);
            renderHistory();
        }
        catch (error) {
            hideLoader(loader);
            alert('❌ Erreur : Ville non trouvée. Veuillez vérifier le nom de la ville.');
            if (error instanceof Error) {
                console.error('Erreur:', error.message);
            }
        }
    });
}
function toggleDarkMode() {
    weatherCard.classList.toggle('dark-mode');
    isDarkMode = !isDarkMode;
}
function renderHistory() {
    displayHistory(searchHistory, historySection, historyButtons, (city) => {
        cityInput.value = city;
        search(city);
    });
}
function searchByGeolocation() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!navigator.geolocation) {
            alert('❌ La géolocalisation n\'est pas supportée par votre navigateur.');
            return;
        }
        showLoader(loader);
        navigator.geolocation.getCurrentPosition((position) => __awaiter(this, void 0, void 0, function* () {
            const { latitude, longitude } = position.coords;
            try {
                const weatherData = yield getWeatherByCoords(latitude, longitude);
                const forecastData = yield getForecastByCoords(latitude, longitude);
                hideLoader(loader);
                displayWeatherData(weatherData, {
                    cityName,
                    temperature,
                    description,
                    weatherEmoji,
                    weatherCard
                });
                displayForecast(forecastData, forecastCards);
                forecastSection.classList.remove('hidden');
                searchHistory = addToHistory(weatherData.city, searchHistory);
                saveHistoryToStorage(searchHistory);
                renderHistory();
            }
            catch (error) {
                hideLoader(loader);
                alert('❌ Erreur lors de la récupération de votre position.');
                if (error instanceof Error) {
                    console.error('Erreur:', error.message);
                }
            }
        }), (error) => {
            hideLoader(loader);
            alert('❌ Impossible d\'accéder à votre position.');
            console.error('Erreur:', error);
        });
    });
}
function handleSearchClick() {
    const city = cityInput.value.trim();
    if (city) {
        search(city);
    }
    else {
        alert('⚠️ Veuillez entrer le nom d\'une ville.');
    }
}
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleSearchClick();
    }
}
function handleLocationClick() {
    searchByGeolocation();
}
function handleWeatherCardClick() {
    toggleDarkMode();
}
searchBtn.addEventListener('click', handleSearchClick);
cityInput.addEventListener('keyup', handleKeyPress);
locationBtn.addEventListener('click', handleLocationClick);
weatherCard.addEventListener('click', handleWeatherCardClick);
renderHistory();
//# sourceMappingURL=main.js.map