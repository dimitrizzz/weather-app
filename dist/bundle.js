/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (() => {

eval("// import config from \"./config/config.js\";\r\n\r\n\r\n\r\nconst API = \"dde5618ee7504ff48e2220803230101\";\r\nconst $locationInput = document.querySelector(\"#location-query\");\r\nconst $locations = document.querySelector(\"#locations\");\r\nconst $weatherWidget = document.querySelector(\"#weather-widget\");\r\nlet active = false;\r\n\r\nfunction weatherCard(weatherData) {\r\n  const { current, location } = weatherData;\r\n  const { name, region, country } = location;\r\n  return `\r\n<div class=\"card text-center\" style=\"box-shadow: 5px 10px 18px #888888; width:300px;height:400px; font-family: ui-serif; border-radius:20px ;\r\n\">\r\n  <div class=\"card-header\">\r\n    <h4>${name}, ${region}, ${country}</h4>\r\n  </div>\r\n  <div class=\"weather-condition\">\r\n    <div class=\"icon\">\r\n      <img\r\n        src=\"http:${current.condition.icon}\"\r\n        alt=\"${current.condition.text}\"\r\n      />\r\n    </div>\r\n    <div>\r\n      <h2 style=\"margin:20px;\">${current.temp_c}°C</h2>\r\n    </div>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <h4 class=\"card-title\" style=\"margin:20px;\">${current.condition.text}</h4>\r\n    <p class=\"card-text\" style=\"background-color: #007bff; border-radius:20px;\">\r\n        <img src=\"icons/wind.svg\" weigth=\"20px\" height=\"20px\" alt=\"Wind Icon\" style=\"vertical-align: middle; margin-right: 5px;\">\r\n        Wind speed: ${current.wind_kph} km/h\r\n    </p>\r\n    <p class=\"card-text\" style=\"background-color: #007bff; border-radius:20px;\"> <img src=\"icons/hymidity.svg\" weigth=\"20px\" height=\"20px\" alt=\"Wind Icon\" style=\"vertical-align: middle; margin-right: 5px;\">Humidity: ${current.humidity}%</p>\r\n  </div>\r\n</div>\r\n`;\r\n}\r\n\r\nfunction weatherCardHeader({ lat, lon, name, region }) {\r\n  return `<li ><a style=\"font-size:15px;\" href=\"#\" data-lat=\"${lat}\" data-lon=\"${lon}\">${name}, ${region}</a></li>`;\r\n}\r\n\r\n// function dark() {\r\n//   let e = document.body;\r\n//   e.classList.toggle(\"dark-mode\");\r\n// }\r\n\r\n$locationInput.addEventListener(\"input\", async (e) => {\r\n  const searchTerm = e.target.value;\r\n  $locations.innerHTML = \"\";\r\n\r\n  if (searchTerm.length >= 3) {\r\n    const res = await fetch(\r\n      `http://api.weatherapi.com/v1/search.json?key=${API}&q=${searchTerm}`\r\n    );\r\n    const locations = await res.json();\r\n    const locationsHTML = weatherCardHeader(locations[0]);\r\n\r\n    $locations.innerHTML = `<ul>${locationsHTML}</ul>`;\r\n  }\r\n});\r\n\r\n$locations.addEventListener(\"click\", async (e) => {\r\n  e.preventDefault();\r\n  \r\n  if (e.target.tagName === \"A\") {\r\n    $locations.innerHTML = \"\";\r\n    $locationInput.value = e.target.innerText;\r\n    const { dataset } = e.target;\r\n    const query = `${dataset.lat},${dataset.lon}`;\r\n    const res = await fetch(\r\n      `http://api.weatherapi.com/v1/current.json?key=${API}&q=${query}`\r\n    );\r\n    const weatherData = await res.json();\r\n\r\n    $weatherWidget.innerHTML = weatherCard(weatherData);\r\n    $locationInput.value = \"\";\r\n  }\r\n});\r\n\r\n// Toggle button C/F\r\nconst toggleButtons = document.getElementsByClassName(\"toggle-button\");\r\n\r\nfor (let i = 0; i < toggleButtons.length; i++) {\r\n  toggleButtons[i].addEventListener(\"click\", handleUnitChange);\r\n}\r\n\r\nfunction handleUnitChange(e) {\r\n  const clickedElement = e.target;\r\n  const hasUnitEnabled = clickedElement.classList.contains(\"unit-enabled\");\r\n\r\n  if (hasUnitEnabled) {\r\n    return;\r\n  }\r\n\r\n  const clickedId = clickedElement.id;\r\n  let newTempValue = undefined;\r\n  let otherUnit = undefined;\r\n  const currentTempValue = parseFloat(\r\n    document.querySelector(\".weather-condition h2\").innerText\r\n  );\r\n\r\n  if (clickedId === \"celsius-button\") {\r\n    otherUnit = document.getElementById(\"fahrenheit-button\");\r\n    // const newTemp = round(farToCelcius(currentTempValue), 1);\r\n    const newTemp = farToCelcius(currentTempValue);\r\n    newTempValue = `${newTemp}°C`;\r\n  } else if (clickedId === \"fahrenheit-button\") {\r\n    otherUnit = document.getElementById(\"celsius-button\");\r\n    // const newTemp = round(celciusToFar(currentTempValue), 1);\r\n    const newTemp = celciusToFar(currentTempValue);\r\n    newTempValue = `${newTemp}°F`;\r\n  }\r\n\r\n  document.querySelector(\".weather-condition h2\").innerText = newTempValue;\r\n  clickedElement.classList.add(\"unit-enabled\");\r\n  otherUnit.classList.remove(\"unit-enabled\");\r\n}\r\n\r\nconst celciusToFar = (cDeg) => {\r\n  return ((cDeg * 9) / 5 + 32).toFixed(1);\r\n};\r\n\r\nconst farToCelcius = (fDeg) => {\r\n  return (((fDeg - 32) * 5) / 9).toFixed(1);\r\n};\r\n\r\n// Background Day-Night\r\ndocument.getElementById(\"btn_day_night\").addEventListener(\"click\", function () {\r\n  document.getElementsByTagName(\"body\")[0].classList.toggle(\"dark-theme\");\r\n});\r\n\r\n// Date-Time\r\n\r\nconst weekday = [\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"];\r\nconst month = [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"October\", \"November\", \"December\"];\r\n\r\nfunction updateClock() {\r\n  const now = new Date();\r\n  const time = `${weekday[now.getDay()]} ${now.getDate()} ${month[now.getMonth()]} ${now.getFullYear()} \"Clock: ${now.getHours()}:${formatTimeComponent(now.getMinutes())}:${formatTimeComponent(now.getSeconds())}\"`;\r\n  document.getElementById('date-time').textContent = time;\r\n}\r\n\r\nfunction formatTimeComponent(component) {\r\n  return component.toString().padStart(2, '0');\r\n}\r\n\r\n// Initial call to update the clock\r\nupdateClock();\r\n\r\n// Update the clock every second\r\nsetInterval(updateClock, 1000);\r\n\n\n//# sourceURL=webpack://weather-app/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/main.js"]();
/******/ 	
/******/ })()
;