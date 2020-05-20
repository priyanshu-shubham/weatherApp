// api key : 82005d27a116c2880c8f0fcb866998a0

//Select Elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//App Data
const weather= {};

weather.temperature={
  unit : "celcius"
}

//App Const and Variables
const KELVIN = 273;
//API key
const key= "82005d27a116c2880c8f0fcb866998a0";

//Checking if browser supports Geolocation
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
  notificationElement.style.display = "block";
  notificationElement.innerHTML="<p>Browser doesn't Support Geolocation </p>";
}

//set User's postion
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude= position.coords.longitude;

  getWeather(latitude, longitude);
}

// SHOW ERror;
function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML=`<p>${error.message} </p>`;
}

// Getting weather from API
function getWeather(latitude, longitude){
  let api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function(data){
      weather.temperature.value=Math.floor(data.main.temp - KELVIN)
      weather.description= data.weather[0].description;
      weather.iconId= data.weather[0].icon;
      weather.city= data.name;
      weather.country= data.sys.country;
    })
    .then(function(){
      displayWeather();
    })
}

//DISPLAY WEATHER TO UI
function displayWeather() {
  iconElement.innerHTML=`<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML=weather.description;
  locationElement.innerHTML=`${weather.city}, ${weather.country}`;
}

//C to F
function cToF(temperature) {
  return (temperature*9/5) + 32;
}

tempElement.addEventListener("click", function(){
  if(weather.temperature.value===undefined) return;

  if(weather.temperature.unit=="celcius"){
    let far=cToF(weather.temperature.value);
    far=Math.floor(far);

    tempElement.innerHTML=`${far}°<span>F</span>`;
    weather.temperature.unit="farenheit";
  }else{
    tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit="celcius";
  }
});
