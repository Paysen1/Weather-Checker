var apiKeyWeather = "8656f286dd465ba0fd313894274d002c";
var weatherToday = document.querySelector("#weatherToday");
var weatherOne = document.querySelector("#weatherOne");
var weatherTwo = document.querySelector("#weatherTwo");
var weatherThree = document.querySelector("#weatherThree");
var weatherFour = document.querySelector("#weatherFour");
var weatherFive = document.querySelector("#weatherFive");
var DateToday = document.querySelector("#Today");
var Date1 = document.querySelector("#Date1");
var Date2 = document.querySelector("#Date2");
var Date3 = document.querySelector("#Date3");
var Date4 = document.querySelector("#Date4");
var Date5 = document.querySelector("#Date5");
var SearchBtn = document.querySelector("#btn");
var SearchInput = document.querySelector("#search-input");

// Function to clear all of the previous forcast elements.
function clearForecast() {
  weatherToday.textContent = "";
  weatherOne.textContent = "";
  weatherTwo.textContent = "";
  weatherThree.textContent = "";
  weatherFour.textContent = "";
  weatherFive.textContent = "";
  DateToday.textContent = "";
  Date1.textContent = "";
  Date2.textContent = "";
  Date3.textContent = "";
  Date4.textContent = "";
  Date5.textContent = "";
}

// Function to get the forecast for a specific location
async function getWeatherForecast(city) {
  try {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKeyWeather}`;

    const response = await fetch(forecastUrl);
    const data = await response.json();

    // Today's forecast
    console.log("Today's Forecast:");
    console.log(data.list[0]);
    weatherToday.textContent = `Temperature: ${data.list[0].main.temp}°C, Clouds: ${data.list[0].clouds.all}%`;
    
    DateToday.textContent = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
        const todayHumidityElement = document.createElement('span');
    todayHumidityElement.textContent = `Humidity: ${data.list[0].main.humidity}%`;

    // Create weather icon element for today's forecast
    const todayIconElement = document.createElement('img');
    const todayIconUrl = `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
    todayIconElement.src = todayIconUrl;
    todayIconElement.alt = data.list[0].weather[0].description;

    // Append humidity and weather icon to today's forecast box
    weatherToday.appendChild(todayHumidityElement);
    weatherToday.appendChild(todayIconElement);

    // Next 5 days forecast
    console.log("Next 5 Days' Forecast:");
    for (let i = 0; i < 5; i++) {
      console.log(data.list[i]);
      const forecastBox = document.createElement('div');
      forecastBox.classList.add('weather-box');
      const date = new Date();
      date.setDate(date.getDate() + i + 1);
      forecastBox.textContent = `Temperature: ${data.list[i].main.temp}°C, Clouds: ${data.list[i].clouds.all}%`;
      const humidityElement = document.createElement('span');
      humidityElement.textContent = `Humidity: ${data.list[i].main.humidity}%`;
  
  // Create weather icon
      const iconElement = document.createElement('img');
      const iconUrl = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
      iconElement.src = iconUrl;
      iconElement.alt = data.list[i].weather[0].description;

  // Append humidity and weather icon to forecast box
      forecastBox.appendChild(humidityElement);
      forecastBox.appendChild(iconElement);

      switch (i) {
        case 0:
          weatherOne.appendChild(forecastBox);
          Date1.textContent = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          });
          break;
        case 1:
          weatherTwo.appendChild(forecastBox);
          Date2.textContent = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          });
          break;
        case 2:
          weatherThree.appendChild(forecastBox);
          Date3.textContent = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          });
          break;
        case 3:
          weatherFour.appendChild(forecastBox);
          Date4.textContent = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          });
          break;
        case 4:
          weatherFive.appendChild(forecastBox);
          Date5.textContent = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          });
          break;
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Saving the previous searches to local storage and placing them below the search button
function saveSearchHistory(city) {
  let searchHistory = localStorage.getItem('searchHistory');
  if (!searchHistory) {
    searchHistory = [];
  } else {
    searchHistory = JSON.parse(searchHistory);
  }

  // Remove the oldest search if the history exceeds 5 entries
  if (searchHistory.length >= 5) {
    searchHistory.shift();
  }

  // Add the new search to the history
  searchHistory.push(city);

  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function updateSearchHistoryUI() {
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
  const searchHistoryContainer = document.querySelector("#searchHistory");
  searchHistoryContainer.innerHTML = "";

  // Adding the responces back into the code as buttons 
  if (searchHistory && searchHistory.length > 0) {
    for (let i = searchHistory.length - 1; i >= 0; i--) {
      const searchItem = document.createElement('button'); 
      searchItem.setAttribute('type', 'button'); 
      searchItem.classList.add('search-history-item');
      searchItem.textContent = searchHistory[i];
      searchItem.addEventListener("click", function () {
        SearchInput.value = searchHistory[i]; 
      });
      searchHistoryContainer.appendChild(searchItem);
    }
  }
}


// Event listener for the search button
SearchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const city = SearchInput.value.trim();
  if (city) {
    clearForecast();
    getWeatherForecast(city);
    saveSearchHistory(city);
    updateSearchHistoryUI();
  }
});
window.addEventListener('load', updateSearchHistoryUI);
