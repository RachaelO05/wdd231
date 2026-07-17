const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const section = document.querySelector('#weather');

const lat = '-26.206256128437456';
const lon = '28.03310207475888';
const key = '5c6512ec82cc1790b10687b4c5f86f0b'

const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;

async function apiFetch() {
    try {
        const response1 = await fetch(currentURL);
        const response2 = await fetch(forecastURL);
        if (response1.ok) {
            const data = await response1.json();
            displayCurrentWeather(data);
        }
        else {
            throw Error(await response1.text());
        }

        if (response2.ok) {
            const data = await response2.json();
            displayForecast(data.list);
        }
        else {
            throw Error(await response2.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayCurrentWeather(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
};

function displayForecast(data) {
    const forecastContainer = document.querySelector('#forecast');

    const dailyForecast = data.filter(forecast => forecast.dt_txt.includes("12:00:00"));

    dailyForecast.slice(0, 3).forEach((forecast) => {
        const div = document.createElement('div');

        const date = new Date(forecast.dt_txt);

        const p = document.createElement('p');
        const image = document.createElement('img');

        const iconsrc = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        let desc = forecast.weather[0].description;
        image.src = iconsrc;
        image.alt = desc;
        

        p.textContent = `${date.toLocaleDateString("en-ZA", { weekday: "long" })}: ${Math.round(forecast.main.temp)}°C`;

        div.appendChild(p);
        div.appendChild(image);

        forecastContainer.appendChild(div);
    });
}
