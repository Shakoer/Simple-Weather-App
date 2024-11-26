const weatherForm = document.querySelector(".weather-form");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");
const apiKey = "// your own api key";

weatherForm.addEventListener("submit", async event => {
  event.preventDefault();
  console.log("Submit event fired");
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error.message);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }]
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDis = document.createElement("p");
  const humidityDis = document.createElement("p");
  const desc = document.createElement("p");
  const emoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDis.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDis.textContent = `Humidity: ${humidity}`;
  desc.textContent = description;
  emoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDis.classList.add("temp");
  humidityDis.classList.add("humidity");
  desc.classList.add("desc");
  emoji.classList.add("emoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDis);
  card.appendChild(humidityDis);
  card.appendChild(desc);
  card.appendChild(emoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      return "️🌦️";
    case weatherId >= 500 && weatherId < 600:
      return "️🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "️🌨️";
    case weatherId >= 700 && weatherId < 800:
      return "️༄";
    case weatherId === 800:
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      return "️☁";
    default:
      return "?";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("error");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}