export declare enum WeatherCondition {
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
export declare function getWeatherByCity(city: string): Promise<WeatherData>;
export declare function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData>;
export declare function getForecast(city: string): Promise<ForecastResponse>;
export declare function getForecastByCoords(lat: number, lon: number): Promise<ForecastResponse>;
//# sourceMappingURL=api.d.ts.map