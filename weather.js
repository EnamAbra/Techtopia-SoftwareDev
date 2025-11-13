const temp = document.getElementById("temperature");
const windspeed = document.getElementById("windspeed");
const weather = document.getElementById("weathercode");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const forecastDiv = document.getElementById("forecast");

fetch(
  "https://api.open-meteo.com/v1/forecast?latitude=5.8155&longitude=-0.1176&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&timezone=auto"
)
  .then((response) => response.json())
  .then((data) => {
    const daysArray = data.daily.time;
    const maxTemps = data.daily.temperature_2m_max;
    const minTemps = data.daily.temperature_2m_min;

    console.log(data);

    for (let i = 0; i < 7; i++) {
      const day = document.createElement("div");
      day.className = "days";
      const [year, month, dayNum] = daysArray[i].split("-");
      const date = new Date(Number(year), Number(month) - 1, Number(dayNum));

      // Format: Thursday, Nov 13
      const options = { weekday: "long", month: "short", day: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);

      day.innerHTML = `
         <h3>${date.toLocaleDateString(undefined, options)}</h3>;

  <p>Max: ${maxTemps[i]}°C</p>
  <p>Min: ${minTemps[i]}°C</p>`;

      forecastDiv.appendChild(day);
    }
  })

  .catch((error) => console.error(error));
