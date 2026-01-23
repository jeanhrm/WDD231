const apiKey = "5229e0ad53d0db3aaea4a7168b4a58a9";
const lat = -12.7826;
const lon = -74.9726;

const tempEl = document.querySelector("#current-temp");
const descEl = document.querySelector("#weather-desc");
const forecastEl = document.querySelector("#forecast");

const urlCurrent = `https://api.openweathermap.org/data/3.0/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
const urlForecast = `https://api.openweathermap.org/data/3.0/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

function toTitleCase(str) {
  return str.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
}

async function getWeather() {
  try {
    const res1 = await fetch(urlCurrent);
    if (!res1.ok) throw new Error("Current weather request failed");
    const data1 = await res1.json();

    tempEl.textContent = Math.round(data1.main.temp);
    descEl.textContent = toTitleCase(data1.weather[0].description);

    const res2 = await fetch(urlForecast);
    if (!res2.ok) throw new Error("Forecast request failed");
    const data2 = await res2.json();

    const daily = data2.list
      .filter(item => item.dt_txt.includes("12:00:00"))
      .slice(0, 3);

    forecastEl.innerHTML = "";
    daily.forEach(item => {
      const date = new Date(item.dt * 1000);
      const label = date.toLocaleDateString("en-US", { weekday: "short" });
      const li = document.createElement("li");
      li.textContent = `${label}: ${Math.round(item.main.temp)}°F`;
      forecastEl.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    descEl.textContent = "Weather unavailable";
  }
}

getWeather();
