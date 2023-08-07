// import config from "../config/config.js";



const API = "dde5618ee7504ff48e2220803230101";
const $locationInput = document.querySelector("#location-query");
const $locations = document.querySelector("#locations");
const $weatherWidget = document.querySelector("#weather-widget");
let active = false;

function weatherCard(weatherData) {
  const { current, location } = weatherData;
  const { name, region, country } = location;
  return `
<div class="card text-center" style="box-shadow: 5px 10px 18px #888888; width:300px;height:400px; font-family: ui-serif; border-radius:20px ;
">
  <div class="card-header">
    <h4>${name}, ${region}, ${country}</h4>
  </div>
  <div class="weather-condition">
    <div class="icon">
      <img
        src="http:${current.condition.icon}"
        alt="${current.condition.text}"
      />
    </div>
    <div>
      <h2 style="margin:20px;">${current.temp_c}°C</h2>
    </div>
  </div>
  <div class="card-body">
    <h4 class="card-title" style="margin:20px;">${current.condition.text}</h4>
    <p class="card-text" style="background-color: #007bff; border-radius:20px;">
        <img src="../icons/wind.svg" weigth="20px" height="20px" alt="Wind Icon" style="vertical-align: middle; margin-right: 5px;">
        Wind speed: ${current.wind_kph} km/h
    </p>
    <p class="card-text" style="background-color: #007bff; border-radius:20px;"> <img src="../icons/hymidity.svg" weigth="20px" height="20px" alt="Wind Icon" style="vertical-align: middle; margin-right: 5px;">Humidity: ${current.humidity}%</p>
  </div>
</div>
`;
}

function weatherCardHeader({ lat, lon, name, region }) {
  return `<li ><a style="font-size:15px;" href="#" data-lat="${lat}" data-lon="${lon}">${name}, ${region}</a></li>`;
}

// function dark() {
//   let e = document.body;
//   e.classList.toggle("dark-mode");
// }

$locationInput.addEventListener("input", async (e) => {
  const searchTerm = e.target.value;
  $locations.innerHTML = "";

  if (searchTerm.length >= 3) {
    const res = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${API}&q=${searchTerm}`
    );
    const locations = await res.json();
    const locationsHTML = weatherCardHeader(locations[0]);

    $locations.innerHTML = `<ul>${locationsHTML}</ul>`;
  }
});

$locations.addEventListener("click", async (e) => {
  e.preventDefault();
  
  if (e.target.tagName === "A") {
    $locations.innerHTML = "";
    $locationInput.value = e.target.innerText;
    const { dataset } = e.target;
    const query = `${dataset.lat},${dataset.lon}`;
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API}&q=${query}`
    );
    const weatherData = await res.json();

    $weatherWidget.innerHTML = weatherCard(weatherData);
    $locationInput.value = "";
  }
});

// Toggle button C/F
const toggleButtons = document.getElementsByClassName("toggle-button");

for (let i = 0; i < toggleButtons.length; i++) {
  toggleButtons[i].addEventListener("click", handleUnitChange);
}

function handleUnitChange(e) {
  const clickedElement = e.target;
  const hasUnitEnabled = clickedElement.classList.contains("unit-enabled");

  if (hasUnitEnabled) {
    return;
  }

  const clickedId = clickedElement.id;
  let newTempValue = undefined;
  let otherUnit = undefined;
  const currentTempValue = parseFloat(
    document.querySelector(".weather-condition h2").innerText
  );

  if (clickedId === "celsius-button") {
    otherUnit = document.getElementById("fahrenheit-button");
    // const newTemp = round(farToCelcius(currentTempValue), 1);
    const newTemp = farToCelcius(currentTempValue);
    newTempValue = `${newTemp}°C`;
  } else if (clickedId === "fahrenheit-button") {
    otherUnit = document.getElementById("celsius-button");
    // const newTemp = round(celciusToFar(currentTempValue), 1);
    const newTemp = celciusToFar(currentTempValue);
    newTempValue = `${newTemp}°F`;
  }

  document.querySelector(".weather-condition h2").innerText = newTempValue;
  clickedElement.classList.add("unit-enabled");
  otherUnit.classList.remove("unit-enabled");
}

const celciusToFar = (cDeg) => {
  return ((cDeg * 9) / 5 + 32).toFixed(1);
};

const farToCelcius = (fDeg) => {
  return (((fDeg - 32) * 5) / 9).toFixed(1);
};

// Background Day-Night
document.getElementById("btn_day_night").addEventListener("click", function () {
  document.getElementsByTagName("body")[0].classList.toggle("dark-theme");
});

// Date-Time

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function updateClock() {
  const now = new Date();
  const time = `${weekday[now.getDay()]} ${now.getDate()} ${month[now.getMonth()]} ${now.getFullYear()} "Clock: ${now.getHours()}:${formatTimeComponent(now.getMinutes())}:${formatTimeComponent(now.getSeconds())}"`;
  document.getElementById('date-time').textContent = time;
}

function formatTimeComponent(component) {
  return component.toString().padStart(2, '0');
}

// Initial call to update the clock
updateClock();

// Update the clock every second
setInterval(updateClock, 1000);
