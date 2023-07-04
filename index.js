function getWeatherData(query) {
  // api key for weather api
  const apiKey = "API KEY HERE";

  // url to fetch api data
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`;

  // fetch weather data
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      const cityName = data.location.name;
      const weatherType = data.current.condition.text;
      const weatherImgIcon = data.current.condition.icon;
      const currentTemperature = data.current.temp_c;
      const feelsLikeTemperature = data.current.feelslike_c;

      document.getElementById("city-name").textContent = cityName;
      document.getElementById("weather-text").textContent = weatherType;
      document.getElementById("weather-icon").src = weatherImgIcon;
      document.getElementById(
        "weather-temp"
      ).textContent = `Current Temperature: ${currentTemperature} Celsius`;
      document.getElementById(
        "weather-feel"
      ).textContent = `Feels Like: ${feelsLikeTemperature} Celsius`;
    })
    .catch((error) => {
      console.log(error);
    });
}

// get the user location from the browser location
navigator.geolocation.getCurrentPosition(success, error);

// success callback
function success(position) {
  // parsing the position from location
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  // set the query param to the location coordinates
  const query = `${lat},${lon}`;

  // call the getWeatherData function with the location coordinates
  getWeatherData(query);
}

// error callback
function error(error) {
  console.log(error);
}

// adding event listener to search button
document.getElementById("search-button").addEventListener("click", function () {
  const cityInput = document.getElementById("city-input").value;
  getWeatherData(cityInput);
});
