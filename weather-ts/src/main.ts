import { getWeatherByCity, getWeatherByCoords, getForecast, getForecastByCoords } from './utils/api.js';
import type { WeatherData, ForecastResponse } from './utils/api.js';
import { displayWeatherData, displayForecast, displayHistory, showLoader, hideLoader, hideElement } from './utils/dom.js';
import { loadHistoryFromStorage, saveHistoryToStorage, addToHistory } from './utils/storage.js';

const cityInput = document.getElementById('cityInput') as HTMLInputElement;
const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;
const locationBtn = document.getElementById('locationBtn') as HTMLButtonElement;
const loader = document.getElementById('loader') as HTMLElement;
const weatherCard = document.getElementById('weatherCard') as HTMLElement;
const cityName = document.getElementById('cityName') as HTMLElement;
const weatherEmoji = document.getElementById('weatherEmoji') as HTMLElement;
const temperature = document.getElementById('temperature') as HTMLElement;
const description = document.getElementById('description') as HTMLElement;
const historySection = document.getElementById('historySection') as HTMLElement;
const historyButtons = document.getElementById('historyButtons') as HTMLElement;
const forecastSection = document.getElementById('forecastSection') as HTMLElement;
const forecastCards = document.getElementById('forecastCards') as HTMLElement;

let searchHistory: string[] = loadHistoryFromStorage();
let isDarkMode: boolean = false;

async function search(city: string): Promise<void> {
  try {
    showLoader(loader);
    hideElement(weatherCard);
    hideElement(forecastSection);
    
    const weatherData = await getWeatherByCity(city);
    const forecastData = await getForecast(city);
    
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
    
  } catch (error: unknown) {
    hideLoader(loader);
    alert('❌ Erreur : Ville non trouvée. Veuillez vérifier le nom de la ville.');
    if (error instanceof Error) {
      console.error('Erreur:', error.message);
    }
  }
}

function toggleDarkMode(): void {
  weatherCard.classList.toggle('dark-mode');
  isDarkMode = !isDarkMode;
}

function renderHistory(): void {
  displayHistory(searchHistory, historySection, historyButtons, (city) => {
    cityInput.value = city;
    search(city);
  });
}

async function searchByGeolocation(): Promise<void> {
  if (!navigator.geolocation) {
    alert('❌ La géolocalisation n\'est pas supportée par votre navigateur.');
    return;
  }
  
  showLoader(loader);
  
  navigator.geolocation.getCurrentPosition(
    async (position: GeolocationPosition): Promise<void> => {
      const { latitude, longitude } = position.coords;
      
      try {
        const weatherData = await getWeatherByCoords(latitude, longitude);
        const forecastData = await getForecastByCoords(latitude, longitude);
        
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
        
      } catch (error: unknown) {
        hideLoader(loader);
        alert('❌ Erreur lors de la récupération de votre position.');
        if (error instanceof Error) {
          console.error('Erreur:', error.message);
        }
      }
    },
    (error: GeolocationPositionError): void => {
      hideLoader(loader);
      alert('❌ Impossible d\'accéder à votre position.');
      console.error('Erreur:', error);
    }
  );
}

function handleSearchClick(): void {
  const city = cityInput.value.trim();
  if (city) {
    search(city);
  } else {
    alert('⚠️ Veuillez entrer le nom d\'une ville.');
  }
}

function handleKeyPress(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    handleSearchClick();
  }
}

function handleLocationClick(): void {
  searchByGeolocation();
}

function handleWeatherCardClick(): void {
  toggleDarkMode();
}

searchBtn.addEventListener('click', handleSearchClick);
cityInput.addEventListener('keyup', handleKeyPress);
locationBtn.addEventListener('click', handleLocationClick);
weatherCard.addEventListener('click', handleWeatherCardClick);

renderHistory();