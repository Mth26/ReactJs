import type { WeatherData, ForecastResponse } from './api.js';
import { WeatherCondition } from './api.js';

interface WeatherEmojiMap {
  [key: string]: string;
}

const weatherToEmoji: WeatherEmojiMap = {
  'clear sky': '☀️',
  'few clouds': '🌤️',
  'scattered clouds': '⛅',
  'broken clouds': '☁️',
  'overcast clouds': '☁️',
  'shower rain': '🌧️',
  'rain': '🌧️',
  'light rain': '🌦️',
  'moderate rain': '🌧️',
  'heavy intensity rain': '⛈️',
  'thunderstorm': '⛈️',
  'snow': '❄️',
  'light snow': '🌨️',
  'heavy snow': '❄️',
  'mist': '🌫️',
  'fog': '🌫️',
  'haze': '🌫️',
  'smoke': '🌫️',
  'dust': '🌫️'
};

export function getWeatherEmoji(weatherCondition: WeatherCondition | string): string {
  if (typeof weatherCondition === 'string') {
    const lowerDesc = weatherCondition.toLowerCase();
    
    if (weatherToEmoji[lowerDesc]) {
      return weatherToEmoji[lowerDesc];
    }
    
    if (lowerDesc.includes('clear')) return '☀️';
    if (lowerDesc.includes('cloud')) return '☁️';
    if (lowerDesc.includes('rain')) return '🌧️';
    if (lowerDesc.includes('thunder') || lowerDesc.includes('storm')) return '⛈️';
    if (lowerDesc.includes('snow')) return '❄️';
    if (lowerDesc.includes('mist') || lowerDesc.includes('fog')) return '🌫️';
    
    return '🌤️';
  }

  switch(weatherCondition) {
    case WeatherCondition.Clear:
      return '☀️';
    case WeatherCondition.Clouds:
      return '☁️';
    case WeatherCondition.Rain:
    case WeatherCondition.Drizzle:
      return '🌧️';git 
    case WeatherCondition.Thunderstorm:
      return '⛈️';
    case WeatherCondition.Snow:
      return '❄️';
    case WeatherCondition.Mist:
    case WeatherCondition.Fog:
    case WeatherCondition.Haze:
    case WeatherCondition.Smoke:
    case WeatherCondition.Dust:
      return '🌫️';
    default:
      return '🌤️';
  }
}

export function updateBackground(weatherCondition: WeatherCondition | string, temp: number): void {
  const body = document.body;
  body.classList.remove('cold', 'cool', 'warm');
  
  let weatherMain: string;
  if (typeof weatherCondition === 'string') {
    weatherMain = weatherCondition.toLowerCase();
  } else {
    weatherMain = String(weatherCondition).toLowerCase();
  }
  
  switch(weatherMain) {
    case 'clear':
      body.style.background = 'linear-gradient(135deg, #FDB99B, #F9A825, #FFD54F)';
      break;
      
    case 'clouds':
      if (temp > 20) {
        body.style.background = 'linear-gradient(135deg, #B0BEC5, #90A4AE)';
      } else {
        body.style.background = 'linear-gradient(135deg, #CFD8DC, #90A4AE, #78909C)';
      }
      break;
      
    case 'rain':
    case 'drizzle':
      body.style.background = 'linear-gradient(135deg, #546E7A, #455A64, #37474F)';
      break;
      
    case 'thunderstorm':
      body.style.background = 'linear-gradient(135deg, #37474F, #263238, #1C2833)';
      break;
      
    case 'snow':
      body.style.background = 'linear-gradient(135deg, #E3F2FD, #BBDEFB, #90CAF9)';
      break;
      
    case 'mist':
    case 'fog':
    case 'haze':
      body.style.background = 'linear-gradient(135deg, #ECEFF1, #CFD8DC, #B0BEC5)';
      break;
      
    default:
      if (temp < 0) {
        body.style.background = 'linear-gradient(135deg, #74b9ff, #0984e3)';
      } else if (temp >= 0 && temp < 20) {
        body.style.background = 'linear-gradient(135deg, #ddd, #bbb)';
      } else {
        body.style.background = 'linear-gradient(135deg, #fdcb6e, #e17055)';
      }
  }
}

export function displayWeatherData(
  data: WeatherData,
  elements: {
    cityName: HTMLElement;
    temperature: HTMLElement;
    description: HTMLElement;
    weatherEmoji: HTMLElement;
    weatherCard: HTMLElement;
  }
): void {
  const temp = Math.round(data.temperature);
  const emoji = getWeatherEmoji(data.weather);
  
  elements.cityName.textContent = data.city;
  elements.temperature.textContent = `${temp}°C`;
  elements.description.textContent = data.weather;
  elements.weatherEmoji.textContent = emoji;
  
  elements.weatherCard.classList.remove('hidden');
  elements.weatherCard.classList.add('show');
  
  updateBackground(data.weather, temp);
}

export function displayForecast(
  data: ForecastResponse,
  forecastCards: HTMLElement
): void {
  forecastCards.innerHTML = '';
  
  const dailyForecasts = data.list.filter(item => {
    const date = new Date(item.dt * 1000);
    return date.getHours() === 12;
  }).slice(0, 5);
  
  dailyForecasts.forEach(forecast => {
    const date = new Date(forecast.dt * 1000);
    const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });
    const temp = Math.round(forecast.main.temp);
    const weatherInfo = forecast.weather[0];
    if (!weatherInfo) return;
    const emoji = getWeatherEmoji(weatherInfo.description);
    
    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
      <div class="forecast-day">${dayName}</div>
      <div class="forecast-emoji">${emoji}</div>
      <div class="forecast-temp">${temp}°C</div>
    `;
    
    forecastCards.appendChild(card);
  });
}

export function displayHistory(
  history: string[],
  historySection: HTMLElement,
  historyButtons: HTMLElement,
  onCityClick: (city: string) => void
): void {
  if (history.length === 0) {
    historySection.classList.add('hidden');
    return;
  }
  
  historySection.classList.remove('hidden');
  historyButtons.innerHTML = '';
  
  history.forEach((city: string) => {
    const btn = document.createElement('button');
    btn.className = 'history-btn';
    btn.textContent = city;
    btn.addEventListener('click', () => onCityClick(city));
    historyButtons.appendChild(btn);
  });
}

export function showLoader(loader: HTMLElement): void {
  loader.classList.remove('hidden');
}

export function hideLoader(loader: HTMLElement): void {
  loader.classList.add('hidden');
}

export function hideElement(element: HTMLElement): void {
  element.classList.add('hidden');
}

export function showElement(element: HTMLElement): void {
  element.classList.remove('hidden');
}
