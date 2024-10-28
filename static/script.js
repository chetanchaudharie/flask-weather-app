// Your WeatherAPI Key
const apiKey = '7c25ec62a64642f890c212221242810'; // Replace with your actual API key

// Set the default background on load
document.addEventListener('DOMContentLoaded', () => {
  changeBackground('default');
});

document.getElementById('checkWeatherBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value;
  if (city) {
    getWeather(city);
  } else {
    alert('Please enter a city name');
  }
});

// Fetch weather data from WeatherAPI
async function getWeather(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
    // Set background to default if there's an error
    changeBackground('default');
  }
}

// Display weather information and change the background image
function displayWeather(data) {
  const condition = data.current.condition.text.toLowerCase(); // Get weather condition text in lowercase

  // Update HTML content dynamically
  document.getElementById('cityName').textContent = `City: ${data.location.name}`;
  document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c}°C`;
  document.getElementById('weatherDescription').textContent = `Condition: ${data.current.condition.text}`;

  // Change background based on condition
  changeBackground(condition);
}

// Function to change the background image
function changeBackground(condition) {
  const body = document.body;
  body.style.transition = 'background 1s ease-in-out'; // Smooth transition

  let imageUrl = 'static/default.jpg'; // Default background

  // Mapping conditions to images
  if (condition === 'default') {
    // If the condition is default, use the default image
    imageUrl = 'static/default.jpg';
  } else if (condition.includes('clear') || condition.includes('sunny')) {
    imageUrl = 'static/clear.jpg';
  } else if (condition.includes('cloudy') || condition.includes('overcast')) {
    imageUrl = 'static/cloudy.jpg';
  } else if (condition.includes('rain')) {
    imageUrl = 'static/rainy.jpg';
  } else if (condition.includes('snow')) {
    imageUrl = 'static/snow.jpg';
  } else if (condition.includes('sleet') || condition.includes('ice')) {
    imageUrl = 'static/sleet.jpg';
  } else if (condition.includes('thunderstorm')) {
    imageUrl = 'static/thunderstorm.jpg';
  } else if (condition.includes('wind')) {
    imageUrl = 'static/windy.jpg';
  } else if (condition.includes('fog') || condition.includes('mist')) {
    imageUrl = 'static/foggy.jpg';
  } else if (condition.includes('haze') || condition.includes('smoke')) {
    imageUrl = 'static/haze.jpg';
  } else if (condition.includes('dust') || condition.includes('sandstorm')) {
    imageUrl = 'static/sandstorm.jpg';
  } else if (condition.includes('hurricane') || condition.includes('tornado') ||
             condition.includes('heatwave') || condition.includes('coldwave')) {
    imageUrl = 'static/extreme.jpg';
  }

  // Set the new background image
  body.style.backgroundImage = `url(${imageUrl})`;
  body.style.backgroundSize = 'cover';
  body.style.backgroundPosition = 'center';
  body.style.backgroundRepeat = 'no-repeat';
}

// Calling showTime function at every second
setInterval(showTime, 1000);

// Defining showTime funcion
function showTime() {
    // Getting current time and date
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = "AM";

    // Setting time for 12 Hrs format
    if (hour >= 12) {
        if (hour > 12) hour -= 12;
        am_pm = "PM";
    } else if (hour == 0) {
        hr = 12;
        am_pm = "AM";
    }

    hour =
        hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime =
        hour +
        ":" +
        min +
        ":" +
        sec +
        am_pm;

    // Displaying the time
    document.getElementById(
        "clock"
    ).innerHTML = currentTime;
}

showTime();
