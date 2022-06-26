var searchCityForm = document.querySelector(".searchCityForm");
var searchCityInput = document.querySelector("#city");

var searchedCityContainer = document.querySelector(".searchedCityContainer");
var searchedCity = document.querySelector(".searchedCity");

var fiveDayForecastInfo = document.querySelector(".fiveDayForecastInfo");
var fiveDayContainer = document.querySelector(".fiveDayContainer");

var previousCity = document.querySelector(".searchHistory");

var cityArr = [];

// Function that runs when city is searched by user
var displayWeather = function (event) {
    event.preventDefault();
    var city = searchCityInput.value.trim();
    if (city) {
      geoCallFetch(city);
      geoFiveDayForecastFetch(city);
      cityArr.unshift({ city });
      searchCityInput.value = "";
    } else {
      alert("Please enter a City");
    }
    localSave()
    recentSearchHistory(city);
  };

var displayPreviousSearch = function(event){
    var city = event.target.getAttribute("previous-city-data")
    if(city){
        searchedCity(city);
        fiveDayForecast(city);
}
}
  
// API fetch functions
var geoCallFetch = function (city) {
  var apiKey = "23350d22c5f5ffb342616e39dd758278";
  var geoCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(geoCall).then(function (response) {
    response.json().then(function (data) {
      searchCityWeather(data, city);
    });
  });
};

// to be used to get UV index?
var geoLatLonFetch = function (lat, lon) {
  var apiKey = "23350d22c5f5ffb342616e39dd758278";
  var geoLatLonCall = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
  fetch(geoLatLonCall).then(function (response) {
    response.json().then(function (data) {
      searchedCityUvIndex(data);
    });
  });
};

var geoFiveDayForecastFetch = function (city) {
  var apiKey = "23350d22c5f5ffb342616e39dd758278";
  var geoFiveDayForecastCall = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(geoFiveDayForecastCall).then(function (response) {
    response.json().then(function (data) {
        FiveDayForecastInfo(data);
    });
  });
};


// Functions to append search results for city user searched
var searchCityWeather = function (weather, citySearch) {
  searchedCityContainer.textContent = "";
  searchedCity.textContent = citySearch;

  var todaysDate = document.createElement("span");
  todaysDate.textContent =
    " (" + moment(weather.dt.value).format("MMMM Do YYYY, h:mm:ss a") + ") ";
  searchedCity.appendChild(todaysDate);

  var cityWeatherIcon = document.createElement("img");
  cityWeatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  );
  searchedCity.appendChild(cityWeatherIcon);

  var cityTemperature = document.createElement("span");
  cityTemperature.textContent = "Temperature: " + weather.main.temp + " °F";
  cityTemperature.classList = "list-group-item";
  searchedCityContainer.appendChild(cityTemperature);

  var cityHumidity = document.createElement("span");
  cityHumidity.textContent = "Humidity: " + weather.main.humidity + " %";
  cityHumidity.classList = "list-group-item";
  searchedCityContainer.appendChild(cityHumidity);

  var cityWindSpeed = document.createElement("span");
  cityWindSpeed.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  cityWindSpeed.classList = "list-group-item";
  searchedCityContainer.appendChild(cityWindSpeed);

  var lat = weather.coord.lat;
  var lon = weather.coord.lon;
  geoLatLonFetch(lat, lon);
};

var searchedCityUvIndex = function (uvIndex) {
  var cityUvIndex = document.createElement("div");
  cityUvIndex.textContent = "Uv Index: ";
  cityUvIndex.classList = "list-group-item";

  cityUvIndexValue = document.createElement("span");
  cityUvIndexValue.textContent = uvIndex.value;

  if (uvIndex.value <= 2) {
    cityUvIndexValue.classList = "favorable";
  } else if (uvIndex.value > 2 && uvIndex.value <= 8) {
    cityUvIndexValue.classList = "moderate ";
  } else if (uvIndex.value > 8) {
    cityUvIndexValue.classList = "severe";
  }

  cityUvIndex.appendChild(cityUvIndexValue);
  searchedCityContainer.appendChild(cityUvIndex);
};

var FiveDayForecastInfo = function (weather) {
  fiveDayContainer.textContent = "";
  fiveDayForecastInfo.textContent = "Five Day Forecast";

  var fiveForecastList = weather.list;
  for (var i = 5; i < fiveForecastList.length; i = i + 8) {
    var dailyFiveDayForecast = fiveForecastList[i];

    var fiveDayForecastContainer = document.createElement("div");
    fiveDayForecastContainer.classList = "card";

    var dateOfForecast = document.createElement("h4");
    dateOfForecast.textContent = moment
      .unix(dailyFiveDayForecast.dt)
      .format("MMM D, YYYY");
    dateOfForecast.classList = "card-header text-center";
    fiveDayForecastContainer.appendChild(dateOfForecast);

    var fiveDayForecastWeatherIcon = document.createElement("img");
    fiveDayForecastWeatherIcon.classList = "card-body text-center";
    fiveDayForecastWeatherIcon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${dailyFiveDayForecast.weather[0].icon}@2x.png`
    );
    fiveDayForecastContainer.appendChild(fiveDayForecastWeatherIcon);

    var fiveDayForecastTemperature = document.createElement("span");
    fiveDayForecastTemperature.classList = "card-body text-center";
    fiveDayForecastTemperature.textContent =
      dailyFiveDayForecast.main.temp + " °F";
    fiveDayForecastContainer.appendChild(fiveDayForecastTemperature);

    var fiveDayForecastHumidity = document.createElement("span");
    fiveDayForecastHumidity.classList = "card-body text-center";
    fiveDayForecastHumidity.textContent = dailyFiveDayForecast.main.humidity + "  %";
    fiveDayForecastContainer.appendChild(fiveDayForecastHumidity);

    fiveDayContainer.appendChild(fiveDayForecastContainer);
  }
};

// recent searched city table
var recentSearchHistory = function(recentSearch){

    searchPreviousCity = document.createElement("button");
    searchPreviousCity.textContent = recentSearch;
    searchPreviousCity.classList = "d-flex border";
    searchPreviousCity.setAttribute("previous-city-data",recentSearch)
    searchPreviousCity.setAttribute("type", "submit");
    previousCity.prepend(searchPreviousCity);
}

// setup local storage
var localSave = function(){
    localStorage.setItem("cityArr", JSON.stringify(cityArr));
};

// 
searchCityForm.addEventListener("submit", displayWeather);
previousCity.addEventListener("click", displayPreviousSearch);

