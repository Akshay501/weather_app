const API_KEY = "333dd5afd2bf428c843130354261903";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

async function getWeather() {
  const cityInput = document.getElementById("city");
  const city = cityInput.value.trim();

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  clearPreviousResult();

  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    document.getElementById("cityName").textContent = data.location.name + ", " + data.location.country;
    document.getElementById("temperature").textContent = data.current.temp_c + "°C";
    document.getElementById("condition").textContent = data.current.condition.text;

    document.getElementById("result").classList.remove("hidden");
  } catch (err) {
    showError(err.message === "City not found" 
      ? "City not found – please check spelling" 
      : "Something went wrong. Try again.");
  }
}

function showError(message) {
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

function clearPreviousResult() {
  document.getElementById("result").classList.add("hidden");
  document.getElementById("error").classList.add("hidden");
  document.getElementById("city").value = document.getElementById("city").value.trim();
}

// Optional: load London when page opens
window.addEventListener("load", () => {
  document.getElementById("city").value = "London";
  getWeather();
});