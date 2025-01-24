const apiKey = "d65dab6fef86e0ecc4bb633958fc0838";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const search = document.querySelector(".myNav input");
const searchbtn = document.querySelector(".myNav button");
const animatedimg = document.querySelector("#animatedimg");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  console.log(data);
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
  document.querySelector(".Wind").innerHTML = `${data.wind.speed} km/h`;

  if (data.weather[0].main == "Clouds") {
    animatedimg.src = "imgs/cloudy-day-1.svg";
  } else if (data.weather[0].main == "Clear") {
    animatedimg.src = "imgs/day.svg";
  } else if (data.weather[0].main == "Rain") {
    animatedimg.src = "imgs/rainy-1.svg";
  } else if (data.weather[0].main == "Drizzle") {
    animatedimg.src = "imgs/cloudy-day-3.svg";
  } else if (data.weather[0].main == "Mist") {
    animatedimg.src = "imgs/cloudy-day-2.svg";
  }

  document.querySelector("#topElement").style.display = "block";
}
searchbtn.addEventListener("click", () => {
  checkWeather(search.value);
});

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const forecastSection = document.querySelector(".mysectiontoo");

  // Function to fetch weather data
  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found!");
      }
      const data = await response.json();
      updateForecast(data);
    } catch (error) {
      alert(error.message);
    }
  };

  // Function to update the forecast in the bottom section
  const updateForecast = (data) => {
    // Filter the list for one entry per day (skipping the first day)
    const forecast = data.list.filter((_, index) => index % 8 === 0).slice(1);

    forecastSection.innerHTML = forecast
      .map((day) => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        return `
          <div class="otherDays">
              <h1 class="daysName">${dayName}</h1>
              <div>
                  <h3>Condition:</h3>
                  <img src="${getWeatherIcon(
                    day.weather[0].icon
                  )}" alt="Weather Icon">
              </div>
              <div class="temptoo">
                  <p>Temperature:</p>
                  <p>${day.main.temp}°C</p>
              </div>
          </div>
        `;
      })
      .join("");
  };

  // Function to get weather icon URL
  const getWeatherIcon = (iconCode) =>
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  // Event listener for search button
  searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
      fetchWeatherData(city);
    } else {
      alert("Please enter a city name.");
    }
  });
});
