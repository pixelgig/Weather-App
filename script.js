const apiKey = "8ddb056334b8e285e5450dd8e5a4b98b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

// Function to map weather conditions to image URLs
function getWeatherIcon(weatherCondition) {
    // Add your logic to map weather conditions to corresponding image URLs
    // For demonstration purposes, I'm using placeholder URLs
    switch (weatherCondition) {
        case 'Clear':
            return 'img/clear.png';
        case 'Clouds':
            return 'img/cloudy.png';
        case 'Rain':
            return 'img/rainy.png';
            case 'Snow':
                return 'img/snow.png';
        default:
            return 'img/unknown.png';
    }
}

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon
        const weatherCondition = data.weather[0].main;
        const weatherIconUrl = getWeatherIcon(weatherCondition);
        weatherIcon.setAttribute('src', weatherIconUrl);
        weatherIcon.setAttribute('alt', weatherCondition);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Weather data not found. Please try again.');
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
    searchBox.value = ''; // Clear input field after search
});
