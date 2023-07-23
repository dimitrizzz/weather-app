
  const API = "dde5618ee7504ff48e2220803230101";
  const $locationInput = document.querySelector("#location-query");
  const $locations = document.querySelector("#locations");
  const $weatherWidget = document.querySelector("#weather-widget");
  let active = false;

  function dark() {
    let e = document.body;
    e.classList.toggle("dark-mode");
  }

  $locationInput.addEventListener("input", async (e) => {
    const searchTerm = e.target.value;
    $locations.innerHTML = "";

    if (searchTerm.length >= 3) {
      const res = await fetch(
        `http://api.weatherapi.com/v1/search.json?key=${API}&q=${searchTerm}`
      );
      const locations = await res.json();
      const locationsHTML = locations
        .map(({ lat, lon, name, region }) => {
          return `<li><a href="#" data-lat="${lat}" data-lon="${lon}">${name}, ${region}</a></li>`;
        })
        .join("");

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
      const { current, location } = weatherData;
      const weatherCard = `
        <div class="card text-center">
          <div class="card-header">
            <h4>${location.name}, ${location.region}, ${location.country}</h4>
          </div>
          <div class="weather-condition">
            <div class="icon">
              <img
                src="http:${current.condition.icon}"
                alt="${current.condition.text}"
              />
            </div>
            <div>
              <h2>${current.temp_c}°C</h2>
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title">${current.condition.text}</h5>
            <p class="card-text">Humidity: ${current.humidity}%</p>
          </div>
        </div>
      `;

      $weatherWidget.innerHTML = weatherCard;
    }
  });

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
      const newTemp = round(farToCelcius(currentTempValue), 1);
      newTempValue = `${newTemp}°C`;
    } else if (clickedId === "fahrenheit-button") {
      otherUnit = document.getElementById("celsius-button");
      const newTemp = round(celciusToFar(currentTempValue), 1);
      newTempValue = `${newTemp}°F`;
    }

    document.querySelector(".weather-condition h2").innerText = newTempValue;
    clickedElement.classList.add("unit-enabled");
    otherUnit.classList.remove("unit-enabled");
  }

  const celciusToFar = (cDeg) => {
    return cDeg * 9/5 + 32;
  };

  const farToCelcius = (fDeg) => {
    return (fDeg - 32) * 5/9;
  };

  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }


  document.getElementById("btn_day_night").addEventListener("click", function(){
    document.getElementsByTagName("body")[0].classList.toggle("dark-theme");
  });
  
