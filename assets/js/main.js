
var searchCityForm = document.querySelector(".searchCityForm");
var searchCityInput = document.querySelector("#city");

var searchedCityContainer = document.querySelector(".searchedCityContainer");
var searchedCity = document.querySelector(".searchedCity");

var fiveDayForecastInfo = document.querySelector(".fiveDayForecastInfo");
var fiveDayForecastInfo = document.querySelector(".fiveDayForecastInfo");

var geoCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
var apiKey = "844421298d794574c100e3409cee0499"

var cityInputName = searchCityInput.value.trim();
var cityArr = [];


var geoCallFetch = function() {
    fetch(geoCall)
    .then(function(response) {
        response.json().then(function(data){
            console.log(data);
        });
    });
};


var displayWeather = function(event){
    event.preventDefault();
    if(cityInputName){
        geoCallFetch(cityInputName)
    } else {
        alert("Please enter a city name");
    }
};





searchCityForm.addEventListener("submit", displayWeather)