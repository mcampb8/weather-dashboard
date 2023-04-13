var todayDate = dayjs().format("YYYY-MM-DD");
function getData() {
  var saved = document.getElementById("city-search").value;
  console.log(saved);

  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + saved + "&APPID=2c539d28fae27ccabf480f3324f35f92&units=imperial", {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var coordinates = data.coord;
      var latitude = coordinates.lat;
      var longitude = coordinates.lon;
      console.log(latitude, longitude);
      getForecast(latitude, longitude);
    });
}
document.getElementById("myBtn").addEventListener("click", getData);
function getForecast(latitude, longitude) {
  fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=2c539d28fae27ccabf480f3324f35f92&units=imperial")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var forecastObjects = data.list;
      for (let index = 0; index < forecastObjects.length; index++) {
        const forecast = forecastObjects[index];
        if (forecast.dt_txt.includes("12:00")) {
          renderForecastCard(forecast);
          var city = data.city.name;
          console.log(city);
        }
      }

    })
}
function renderForecastCard(forecastData) {
  var weather = forecastData.weather;
  var weatherDesc = weather[0].description;
  var temp = Math.round(forecastData.main.temp);
  var date = forecastData.dt_txt;
  var wind = Math.round(forecastData.wind.speed);
  var humid = forecastData.main.humidity;
  console.log(humid);
}
