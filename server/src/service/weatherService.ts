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
    this.apiKey = process.env.API_KEY || '134dfe02c5ccec64a346eebe85ac7b40';
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
    
    // Extract the list from the response
    const weatherList = data.list;
    
    // Get one entry per day (every 8th item since data is in 3-hour intervals)
    const dailyForecasts = weatherList.filter((_: any, i: number) => i % 8 === 0).slice(0, 6);
    
    // Map the data to our Weather interface format
    return dailyForecasts.map((item: any) => ({
      date: new Date(item.dt * 1000).toLocaleDateString(),
      temp: Math.round(item.main.temp),
      humidity: item.main.humidity,
      windSpeed: Math.round(item.wind.speed),
      description: item.weather[0].description,
      icon: `https://openweathermap.org/img/w/${item.weather[0].icon}.png`,
      cityName: city
    }));
  }
}

export default new WeatherService();
