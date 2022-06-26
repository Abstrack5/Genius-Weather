var searchCityForm = document.querySelector(".searchCityForm");
var searchCityInput = document.querySelector("#city");

var searchedCityContainer = document.querySelector(".searchedCityContainer");
var searchedCity = document.querySelector(".searchedCity");

var fiveDayForecastInfo = document.querySelector(".fiveDayForecastInfo");
var fiveDayContainer = document.querySelector(".fiveDayContainer");

var cityArr = [];


var geoCallFetch = function(city){
    var apiKey = "23350d22c5f5ffb342616e39dd758278"
    var geoCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(geoCall)
    .then(function(response){
        response.json().then(function(data){
            searchCityWeather(data, city);
        });
    });
};

// to be used to get UV index?
var searchCityUvIndex = function(lat,lon){
    var apiKey = "23350d22c5f5ffb342616e39dd758278"
    var geoLatLonCall = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(geoLatLonCall)
    .then(function(response){
        response.json().then(function(data){
           console.log(data)
        });
    });
    console.log(lat);
    console.log(lon);
};


var displayWeather = function(event){
    event.preventDefault();
    var city = searchCityInput.value.trim();
    if(city){
        geoCallFetch(city);
        cityArr.unshift({city});
        searchCityInput.value = "";
    } else{
        alert("Please enter a City");
    }
}

var searchCityWeather = function (weather, citySearch) {
  searchedCityContainer.textContent = "";
  searchedCity.textContent = citySearch;

  var todaysDate = document.createElement("span");
  todaysDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
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
