interface Coordinates {
  lat: number;
  lon: number;
}

interface Weather {
  date: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

class WeatherService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || 'https://api.openweathermap.org/data/2.5';
    this.apiKey = process.env.API_KEY || '';
  }

  private buildGeocodeQuery(city: string): string {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
  }

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
  }

  private async fetchLocationData(city: string): Promise<Coordinates> {
    const response = await fetch(this.buildGeocodeQuery(city));
    const data = await response.json();
    if (!data[0]) throw new Error('City not found');
    return { lat: data[0].lat, lon: data[0].lon };
  }

  async getWeatherForCity(city: string): Promise<Weather[]> {
    const coordinates = await this.fetchLocationData(city);
    const response = await fetch(this.buildWeatherQuery(coordinates));
    const data = await response.json();
    
    // Process and return weather data
    const weatherList = data.list;
    return weatherList.map((item: any) => ({
      date: new Date(item.dt * 1000).toLocaleDateString(),
      temp: item.main.temp,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      description: item.weather[0].description,
      icon: `https://openweathermap.org/img/w/${item.weather[0].icon}.png`
    }));
  }
}

export default new WeatherService();
