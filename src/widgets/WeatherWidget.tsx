import React, { useState } from 'react';
import { CloudRain, Wind, Sun, Cloud, CloudLightning } from 'lucide-react';

const WEATHER_STATES = [
  { icon: Sun, color: 'text-yellow-400', condition: 'Sunny' },
  { icon: Cloud, color: 'text-gray-400', condition: 'Cloudy' },
  { icon: CloudRain, color: 'text-blue-400', condition: 'Rainy' },
  { icon: CloudLightning, color: 'text-purple-400', condition: 'Stormy' }
];

export const WeatherWidget: React.FC = () => {
  const [city, setCity] = useState('Mumbai');
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState(16); // stored in Celsius now
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [weatherState, setWeatherState] = useState(WEATHER_STATES[1]);
  const [wind, setWind] = useState(19); // km/h
  const [humidity, setHumidity] = useState(80);
  const [isLoading, setIsLoading] = useState(false);

  // Open-Meteo weather codes mapping
  const getWeatherState = (code: number) => {
    if (code === 0) return WEATHER_STATES[0]; // Sunny
    if (code >= 1 && code <= 3) return WEATHER_STATES[1]; // Cloudy
    if (code >= 45 && code <= 48) return WEATHER_STATES[1]; // Fog/Cloudy
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return WEATHER_STATES[2]; // Rain
    if (code >= 71 && code <= 77) return WEATHER_STATES[2]; // Snow
    if (code >= 95 && code <= 99) return WEATHER_STATES[3]; // Thunderstorm
    return WEATHER_STATES[1];
  };

  const fetchWeather = async (cityName: string) => {
    try {
      setIsLoading(true);
      // 1. Get Coordinates
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        setIsLoading(false);
        return; // City not found, keep old data
      }
      
      const { latitude, longitude, name } = geoData.results[0];
      setCity(name); // Normalize city name

      // 2. Get Weather
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`);
      const weatherData = await weatherRes.json();
      
      if (weatherData.current) {
        setTemp(Math.round(weatherData.current.temperature_2m)); // API returns Celsius by default
        setHumidity(weatherData.current.relative_humidity_2m);
        setWind(Math.round(weatherData.current.wind_speed_10m)); // km/h
        setWeatherState(getWeatherState(weatherData.current.weather_code));
      }
    } catch (err) {
      console.error("Failed to fetch weather", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch initial weather
  React.useEffect(() => {
    fetchWeather('Mumbai');
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      fetchWeather(city);
    }
  };

  const toggleUnit = () => setUnit(prev => prev === 'C' ? 'F' : 'C');

  const Icon = weatherState.icon;
  // Convert Celsius to Fahrenheit if unit is 'F'
  const displayTemp = unit === 'F' ? Math.round((temp * 9 / 5) + 32) : temp;
  // Convert km/h to mph if unit is 'F' (just to make it localized)
  const displayWind = unit === 'F' ? Math.round(wind * 0.621371) : wind;
  const windUnit = unit === 'F' ? 'mph' : 'km/h';

  return (
    <div className="w-64 p-5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-white shadow-xl relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div>
          {isEditing ? (
            <input 
              autoFocus
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => { setIsEditing(false); fetchWeather(city); }}
              className="text-sm font-medium text-gray-300 bg-black/50 border border-white/20 rounded px-1 outline-none w-28"
            />
          ) : (
            <h3 
              className="text-sm font-medium text-gray-300 cursor-pointer hover:text-white border-b border-transparent hover:border-white/50 inline-block transition-colors"
              onClick={() => setIsEditing(true)}
              title="Click to change city"
            >
              {city}
            </h3>
          )}
          <div className="flex items-start mt-1 cursor-pointer select-none" onClick={toggleUnit} title="Click to toggle C/F">
            <span className="text-3xl font-light">{displayTemp}</span>
            <span className="text-lg font-light text-gray-400 mt-1 ml-1">°{unit}</span>
          </div>
        </div>
        <Icon size={32} className={weatherState.color} />
      </div>
      <div className="text-sm text-gray-400">{weatherState.condition}</div>
      
      <div className="mt-4 pt-4 border-t border-white/10 flex gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <CloudRain size={12} /> {humidity}%
        </div>
        <div className="flex items-center gap-1">
          <Wind size={12} /> {displayWind} {windUnit}
        </div>
      </div>
    </div>
  );
};
