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
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
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
