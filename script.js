// script.js

// Function to fetch weather based on location input
function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        getWeatherData(location);
    } else {
        alert('Please enter a location.');
    }
}

// Function to fetch weather data using the OpenWeatherMap API
function getWeatherData(location) {
    const apiKey = 'c023201ab73247f3514bb793ca161384'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeatherData(data);
            } else {
                document.getElementById('weatherInfo').innerHTML = `<p>Location not found. Please try again.</p>`;
            }
        })
        .catch(error => {
            document.getElementById('weatherInfo').innerHTML = `<p>Error fetching data. Please try again later.</p>`;
        });
}

// Function to display fetched weather data
function displayWeatherData(data) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    const { name, main, weather } = data;

    weatherInfoDiv.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
    `;
}

// Fetch weather data based on user's current location
function fetchWeatherByCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = 'c023201ab73247f3514bb793ca161384'; // Replace with your OpenWeatherMap API key
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => response.json())
                .then(data => displayWeatherData(data))
                .catch(error => {
                    document.getElementById('weatherInfo').innerHTML = `<p>Error fetching data. Please try again later.</p>`;
                });
        }, () => {
            document.getElementById('weatherInfo').innerHTML = `<p>Unable to retrieve your location.</p>`;
        });
    } else {
        document.getElementById('weatherInfo').innerHTML = `<p>Geolocation is not supported by your browser.</p>`;
    }
}

// Call this function when the page loads to get weather based on user's location
fetchWeatherByCurrentLocation();
