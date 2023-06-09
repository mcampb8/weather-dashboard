var city = "";
function getData() {
  var saved = document.getElementById("city-search").value;
  // for(var i =1;i<=5;i++){
  //  document.getElementById("card" +i).innerHTML = saved;
  // }

  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + saved + "&APPID=2c539d28fae27ccabf480f3324f35f92&units=imperial", {
    method: 'GET', //GETis the default.
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
          city = data.city.name;
          console.log(city);
          renderForecastCard(forecast);
        }
      }

    })
}
function renderForecastCard(forecastData) {
  console.log(forecastData);
  var weather = forecastData.weather;
  var weatherDesc = weather[0].description;
  console.log(weatherDesc);
  // document.getElementById("weather").textContent = weatherDesc;
  var temp = Math.round(forecastData.main.temp);
  var date = dayjs(forecastData.dt_txt).format("dddd, MMMM DD");
  var wind = Math.round(forecastData.wind.speed);
  var humid = forecastData.main.humidity;
  var image = document.createElement("img");
  if(weatherDesc.includes("cloud") ){
    image.src ="/Users/michaelcampbell/code/weather-dashboard/cloud.png";
  }
  if(weatherDesc.includes("sun")||weatherDesc.includes("clear")){
    image.src ="/Users/michaelcampbell/code/weather-dashboard/sun.png"
  }
  if(weatherDesc.includes("rain")){
    image.src = '/Users/michaelcampbell/code/weather-dashboard/rain.png'
  }
  if(weatherDesc.includes('snow')){
    image.src = "/Users/michaelcampbell/code/weather-dashboard/snow.png"
  }
  image.setAttribute('alt', "weather image");
  var cardBody = document.createElement("div");
  var cardTitle = document.createElement("h5");
  var humidity = document.createElement("p");
  var temperature = document.createElement("p");
  var windSpeed = document.createElement("p");
  humidity.textContent = "Humidity: " + humid + " %";
  temperature.textContent = "Temperature: " + temp + " °F";
  windSpeed.textContent = "Wind Speed: " + wind + " MPH";
  cardTitle.textContent = city;
  cardTitle.classList.add("card-title");
  cardBody.append(cardTitle);
  cardBody.append(image);
  cardBody.append(date);
  cardBody.append(temperature);
  cardBody.append(humidity);
  cardBody.append(windSpeed);
  
  cardBody.classList.add("card-body");
  var cardText = document.createElement("p");
  var forecastCard = document.createElement("div");
  forecastCard.classList.add("card");
  forecastCard.append(cardBody);
  var container = document.getElementById("forecast-cards");
  container.append(forecastCard);
}
