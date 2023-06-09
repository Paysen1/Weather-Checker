var apiKeyWeather = "8656f286dd465ba0fd313894274d002c";

// Function to get the forecast for a specific location
async function getWeatherForecast(city) {
  try {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKeyWeather}`;

    const response = await fetch(forecastUrl);
    const data = await response.json();

    // Today's forecast
    console.log("Today's Forecast:");
    console.log(data.list[0]);

    // Next 5 days' forecast
    console.log("Next 5 Days' Forecast:");
    for (let i = 1; i <= 5; i++) {
      console.log(data.list[i]);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

const city = "London"; 
getWeatherForecast(city);


