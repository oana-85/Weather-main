let now = new Date();

let weekday = document.querySelector("#date-time.col-6.h1");

let date = now.getDate();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];
weekday.innerHTML = `${day}, </br> ${date} ${month} ${year}`;

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
//time//
let time = document.querySelector("#time");
time.innerHTML = `${hours}:${minutes}`;

function searchInput(event) {
  event.preventDefault();
  let currentPlace = document.querySelector("#place");
  let inputCity = document.querySelector("#search-text-input");
  currentPlace.innerHTML = inputCity.value;
}
let enteredPlace = document.querySelector("#search");
enteredPlace.addEventListener("submit", searchInput);

function displayWeather(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp);
    document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
    document.querySelector(".icon");
    document.setAttribute("src", getIcon(response.data.weather[0].icon));
}

function getIcon(icon){

let iconElement = "";

  if(icon==="01d" || icon==="01n"){
    iconElement = "media/animated/day.svg";// day/night, clear sky
  } else if(icon==="02d"){
    iconElement = "media/animated/cloudy-day-1.svg";//cloudy day
  }else if(icon==="02n"){
  iconElement = "media/animated/cloudy-night-1.svg";//cloudy night
  }else if(icon==="03d"){
    iconElement = "media/animated/cloudy.svg"; //scattered clouds
  }else if(icon==="03n"){
    iconElement = "media/animated/cloudy.svg";//scattered clouds
  }else if(icon==="04d"){
    iconElement = "media/animated/cloudy.svg";//broken clouds
  }else if(icon==="04n"){
    iconElement = "media/animated/cloudy.svg";//broken clouds
  }else if(icon==="09d"){
    iconElement = "media/animated/rainy-1.svg";//shower rain
  }else if(icon==="09n"){
    iconElement = "media/animated/rainy-5.svg";//shower rain
  }else if(icon==="10d"){
    iconElement = "media/animated/rainy-4.svg"; //rain
  }else if("10n"){
    iconElement = "media/animated/rainy-7.svg";//rain
  }else if(icon==="11d"){
    iconElement = "media/animated/thunder.svg";//thunder
  }else if(icon==="11n"){
    iconElement = "media/animated/thunder.svg";//thunder
  }else if(icon==="13d"){
    iconElement = "media/animated/snowy-1.svg";//snow
  }else if(icon==="13n"){
    iconElement = "media/animated/snowy-6.svg";//snow
  }
return iconElement();
}

function searchPlace(city) {
  let units = "metric";
  let apiKey = "9d3ea23f6bf145bbb0d156ccb1b96e37";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let place = document.querySelector("#search-text-input").value;
  searchPlace(place);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9d3ea23f6bf145bbb0d156ccb1b96e37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchPlace("Arbroath");
