function formatDate(timestamp) {
  let now = new Date(timestamp);
  let h1 = document.querySelector("h1");

  let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"];


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

  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentYear = now.getFullYear();
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();
      if (currentMinute < 10) {
          currentMinute = `0${currentMinute}`;
      }

    h1.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}, ${currentHour}:${currentMinute}`;
}

function displayWeatherCondition(response) {
  let tempElement = document.querySelector("#temp-now");
  let tempNow = Math.round(response.data.main.temp);
    tempElement.innerHTML = `${tempNow}°C`;
}

// fahrenheit button

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

// celcius button

function displayCelciusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemp);

}

// search city

function searchCity(city) {
  let apiKey = "e6d85b345de0047406ef7a81579b2fba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

   // apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    //  axios.get(apiUrl).then(displayForecast);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#entered-city");
  searchCity(city.value);
}

// current location

function retrievePosition(position) {
  let apiKey = "e6d85b345de0047406ef7a81579b2fba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

//

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temp-now");
      temperatureElement.innerHTML = Math.round(response.data.main.temp_min);
  let cityElement = document.querySelector("#new-city");
      cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
      descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
      humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind-speed");
      windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
      dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
      iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  let forecastIconElement = document.querySelector(".forecast-icon")
      forecastIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  

  celciusTemp = response.main.data.temp;
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", submit);


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemp);

let celciusTemp = null;

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Dublin");
