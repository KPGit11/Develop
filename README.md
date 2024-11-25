# Weather Dashboard

## Description
A dynamic weather application that allows travelers to view weather conditions for multiple cities. Built with Express.js backend and vanilla TypeScript frontend, this app leverages the OpenWeather API to provide current conditions and 5-day forecasts.

## Features
- Search for any city's weather
- View current weather conditions including:
  - Temperature
  - Humidity
  - Wind Speed
  - Weather Description with Icon
- 5-day weather forecast
- Search history functionality
- Ability to delete cities from search history

## Technologies Used
- TypeScript
- Express.js
- Node.js
- OpenWeather API
- File System for Data Persistence

## Installation
1. Clone the repository
2. Install dependencies with \`npm install\`
3. Create \`.env\` file with your OpenWeather API key
4. Run \`npm start\` to launch the server
5. Access the application at \`localhost:3001\`

## API Endpoints
- \`POST /api/weather\` - Get weather data for a city
- \`GET /api/weather/history\` - Retrieve search history
- \`DELETE /api/weather/history/:id\` - Remove city from history

## Usage
Simply enter a city name in the search bar to view current weather conditions and forecast. Previously searched cities are saved and can be quickly accessed from the history panel.
