const apiKey = "TU_API_KEY";
const lat = 13.4833;   // San Miguel aprox
const lon = -88.1833;

const tempEl = document.querySelector("#current-temp");
const descEl = document.querySelector("#weather-desc");
const forecastEl = document.querySelector("#forecast");

const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

function toTitleCase(str) {
  return str.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
}

async function getWeather() {
  try {
    // current
    const res1 = await fetch(urlCurrent);
    if (!res1.ok) throw new Error("Current weather request failed");
    const data1 = await res1.json();

    tempEl.textContent = Math.round(data1.main.temp);
    descEl.textContent = toTitleCase(data1.weather[0].description);

    // forecast (3 days)
    const res2 = await fetch(urlForecast);
    if (!res2.ok) throw new Error("Forecast request failed");
    const data2 = await res2.json();

    // Tomar 1 item por día alrededor de las 12:00 (12:00:00)
    const daily = data2.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    forecastEl.innerHTML = "";
    daily.forEach(item => {
      const date = new Date(item.dt * 1000);
      const label = date.toLocaleDateString("en-US", { weekday: "short" }); // e.g., Mon
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
