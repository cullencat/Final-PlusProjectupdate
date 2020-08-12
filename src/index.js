function formatDate(timestamp) {
  let now = new Date(timestamp);
  let h1Element = document.querySelector("h1");

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

    h1Element.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}, ${currentHour}:${currentMinute}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  let tempElement = document.querySelector("#temp-now");
  let tempNow = Math.round(response.data.main.temp);
    tempElement.innerHTML = `${tempNow}°C`;
}

// celcius button

function displayCelciusTemp(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    let celciusTemp = response.main.data.temp;
    temperatureElement.innerHTML = Math.round(celciusTemp);

}

    let celciusLink = document.querySelector("#celcius-link");
      celciusLink.addEventListener("click", displayCelciusTemp);
      let celciusTemp = null;

// fahrenheit button

function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let celciusTemp = response.main.data.temp;
  let fahrenheitTemp = (celciusTemp*9) / 5 +32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
    let fahrenheitLink = document.querySelector("#fahrenheit-link");
      fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

// api data

let apiKey = "e6d85b345de0047406ef7a81579b2fba";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Dublin,ie&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayTemperature);




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

//

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += 

    ` <div class="col-2">
              <h3>
                ${formatHours(forecast.dt * 1000)}
              </h3>
              <img src="https://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png" />
              <div class="weather-forecast-temp">
                <strong>${Math.round(
                  forecast.main.temp_max
                )}°</strong>${Math.round(forecast.main.temp_min)}°
              </div>
            </div>`;
                }
}

// search city

function submitCity(city) {
  let apiKey = "e6d85b345de0047406ef7a81579b2fba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
      axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#entered-city");
  searchCity(city.value);
}

let city = document.querySelector("search-form");
city.addEventListener("submit", submitCity);

searchCity("#new-city");

// current location

function retrievePosition(position) {
  let apiKey = "e6d85b345de0047406ef7a81579b2fba";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
      axios.get(apiUrl).then(displayTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
      axios.get(`${apiUrl}`).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

//


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//

