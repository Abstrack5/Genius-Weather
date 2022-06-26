var searchCityForm = document.querySelector(".searchCityForm");
var searchCityInput = document.querySelector("#city");

var searchedCityContainer = document.querySelector(".searchedCityContainer");
var searchedCity = document.querySelector(".searchedCity");

var fiveDayForecastInfo = document.querySelector(".fiveDayForecastInfo");
var fiveDayContainer = document.querySelector(".fiveDayContainer");

var cityInputName = searchCityInput.value.trim();
var cityArr = [];

var geoCallFetch = function () {
  var geoCall = `https://api.openweathermap.org/data/2.5/onecall?q=${city}&units=imperial&appid=${apiKey}`;
  var apiKey = "844421298d794574c100e3409cee0499";

  fetch(geoCall).then(function (response) {
    response.json().then(function (data) {
        searchCityWeather(data, city);
    });
  });
};

var displayWeather = function (event) {
  event.preventDefault();
  if (city) {
    geoCallFetch(city);
    searchCityInput.value = "";
  } else {
    alert("Please enter a city name");
  }
};

var searchCityWeather = function (weather, citySearch) {
  searchedCityContainer.textContent = "";
  searchedCity.textContent = citySearch;

  var todaysDate = document.createElement("span");
  todaysDate.textContent =
    " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
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
};

searchCityForm.addEventListener("submit", displayWeather);
