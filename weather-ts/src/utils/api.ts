const API_KEY: string = '0928d5a4a1a9de004e83a224de1ac392';
const API_URL: string = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL: string = 'https://api.openweathermap.org/data/2.5/forecast';

export enum WeatherCondition {
  Clear = "Clear",
  Rain = "Rain",
  Drizzle = "Drizzle",
  Clouds = "Clouds",
  Snow = "Snow",
  Thunderstorm = "Thunderstorm",
  Mist = "Mist",
  Smoke = "Smoke",
  Haze = "Haze",
  Dust = "Dust",
  Fog = "Fog",
  Sand = "Sand",
  Ash = "Ash",
  Squall = "Squall",
  Tornado = "Tornado"
}

export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
}

export interface WeatherData {
  city: string;
  temperature: number;
  weather: WeatherCondition;
}

export interface ForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      description: string;
    }>;
  }>;
}

function transformWeatherData(response: WeatherResponse): WeatherData {
  const weatherInfo = response.weather[0];
  if (!weatherInfo) {
    throw new Error('Données météo invalides');
  }
  
  const weatherMain = weatherInfo.main as WeatherCondition;
  
  return {
    city: response.name,
    temperature: response.main.temp,
    weather: weatherMain
  };
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=fr`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Ville non trouvée');
  }
  
  const data: WeatherResponse = await response.json();
  
  return transformWeatherData(data);
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const url = `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Erreur de géolocalisation');
  }
  
  const data: WeatherResponse = await response.json();
  
  return transformWeatherData(data);
}

export async function getForecast(city: string): Promise<ForecastResponse> {
  const url = `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;
  const response = await fetch(url);
  return await response.json();
}

export async function getForecastByCoords(lat: number, lon: number): Promise<ForecastResponse> {
  const url = `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`;
  const response = await fetch(url);
  return await response.json();
}
