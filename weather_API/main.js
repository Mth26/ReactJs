const API_KEY = '0928d5a4a1a9de004e83a224de1ac392';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

//DOM
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

let searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];

const weatherToEmoji = {
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



function updateBackground(weatherMain, temp) {
  const body = document.body;
  body.classList.remove('cold', 'cool', 'warm');
  
  switch(weatherMain.toLowerCase()) { //priorité
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


function getWeatherEmoji(description) {
  const lowerDesc = description.toLowerCase();
  
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

async function getWeather(city) {
  try {
    loader.classList.remove('hidden');
    weatherCard.classList.add('hidden');
    forecastSection.classList.add('hidden');
    
    const response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
    );
    
    if (!response.ok) {
      throw new Error('Ville non trouvée');
    }
    
    const data = await response.json();
    
    const forecastResponse = await fetch(
      `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
    );
    
    const forecastData = await forecastResponse.json();
    
    loader.classList.add('hidden');
    
    displayWeather(data);
    displayForecast(forecastData);
    
    addToHistory(city);
    
  } catch (error) {
    loader.classList.add('hidden');
    alert('❌ Erreur : Ville non trouvée. Veuillez vérifier le nom de la ville.');
    console.error('Erreur:', error);
  }
}

function displayWeather(data) {
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  const emoji = getWeatherEmoji(desc);
  const weatherMain = data.weather[0].main;
  
  cityName.textContent = data.name;
  temperature.textContent = `${temp}°C`;
  description.textContent = desc;
  weatherEmoji.textContent = emoji;
  
  weatherCard.classList.remove('hidden');
  weatherCard.classList.add('show');
  
  updateBackground(weatherMain, temp);
}

function displayForecast(data) {
  forecastCards.innerHTML = '';
  
  const dailyForecasts = data.list.filter(item => {
    const date = new Date(item.dt * 1000);
    return date.getHours() === 12;
  }).slice(0, 5); // 5 premiers jours
  
  dailyForecasts.forEach(forecast => {
    const date = new Date(forecast.dt * 1000);
    const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });
    const temp = Math.round(forecast.main.temp);
    const emoji = getWeatherEmoji(forecast.weather[0].description);
    
    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
      <div class="forecast-day">${dayName}</div>
      <div class="forecast-emoji">${emoji}</div>
      <div class="forecast-temp">${temp}°C</div>
    `;
    
    forecastCards.appendChild(card);
  });
  
  forecastSection.classList.remove('hidden');
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    alert('❌ La géolocalisation n\'est pas supportée par votre navigateur.');
    return;
  }
  
  loader.classList.remove('hidden');
  
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      
      try {
        const response = await fetch(
          `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=fr`
        );
        
        if (!response.ok) {
          throw new Error('Erreur de géolocalisation');
        }
        
        const data = await response.json();
        
        const forecastResponse = await fetch(
          `${FORECAST_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=fr`
        );
        
        const forecastData = await forecastResponse.json();
        
        loader.classList.add('hidden');
        displayWeather(data);
        displayForecast(forecastData);
        addToHistory(data.name);
        
      } catch (error) {
        loader.classList.add('hidden');
        alert('❌ Erreur lors de la récupération de votre position.');
        console.error('Erreur:', error);
      }
    },
    (error) => {
      loader.classList.add('hidden');
      alert('❌ Impossible d\'accéder à votre position.');
      console.error('Erreur:', error);
    }
  );
}

function addToHistory(city) {
  if (!searchHistory.includes(city)) {
    searchHistory.unshift(city);
    
    // que 5 villes et pas de doublons. 

    if (searchHistory.length > 5) {
      searchHistory.pop();
    }
    localStorage.setItem('weatherHistory', JSON.stringify(searchHistory)); // "sauvergarder"
    
    displayHistory();
  }
}

function displayHistory() {
  if (searchHistory.length === 0) {
    historySection.classList.add('hidden');
    return;
  }
  
  historySection.classList.remove('hidden');
  historyButtons.innerHTML = '';
  
  searchHistory.forEach(city => {
    const btn = document.createElement('button');
    btn.className = 'history-btn';
    btn.textContent = city;
    btn.addEventListener('click', () => {
      cityInput.value = city;
      getWeather(city);
    });
    historyButtons.appendChild(btn);
  });
}


searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    console.log(`🔍 Recherche de : ${city}`);
    getWeather(city);
  } else {
    alert('⚠️ Veuillez entrer le nom d\'une ville.');
  }
});

cityInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const city = cityInput.value.trim();
    if (city) {
      console.log(`🔍 Recherche de : ${city}`);
      getWeather(city);
    }
  }
});

locationBtn.addEventListener('click', () => {
  console.log('🌍 Récupération de la position...');
  getWeatherByLocation();
});

displayHistory();