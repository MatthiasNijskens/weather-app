const api = {
    key: "2991fd14ab886823c38f7719497f8111",
    base: "https://api.openweathermap.org/data/2.5/"
}

const iconValue = {
    clear_sky : 'clear sky',
    partly_cloudy : 'few clouds',
    cloudy : 'scattered clouds',
    broken_clouds : 'broken clouds' , 
    overcast_clouds : 'overcast clouds',
    shower_rain : 'shower rain',
    rain : 'rain',
    thunder : 'thunderstorm',
    snow : 'snow',
    mist : 'mist'
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
    
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>°C</span>`;

    let icon = document.getElementById('weathericon');
    icon.src = getIcon(weather.weather[0].description);

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
    getOneCall(weather);
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}

//fetch onecall api data
function getOneCall (data) {
    console.log(data)
    let lat = data.coord.lat;
    let lon = data.coord.lon;

    fetch(`${api.base}onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,hourly,minutely&appid=${api.key}`)
    .then(forecast => {
        return forecast.json();
    }).then(displayForecast);

}

function displayForecast(forecast) {
    
}
//render weekly forecast
// function displayForecast(forecast) {
//     let resultsHTML = "<tr><th>Day</th><th>Conditions</th><th>Hi</th>Lo</th></tr>"
    
//     rowCount = forecast.data.length;
//     if (rowCount > 5){
//         rowCount = 5;
//     }

//     for (i=0;i<rowCount;i++){
//         let ts = new Date(forecast.data[i].time * 1000)
        
//         let dayTime = days[ts.getDay()]
//         let summary = forecast.weather[0].summary
//     }
// }

//render correct icon
function getIcon(icon) {
    switch(icon) {
        case iconValue.clear_sky:
            return "sunny.png";
        case iconValue.partly_cloudy:
            return "cloudy.png";
        case iconValue.cloudy:
            return "scatteredclouds.png";
        case iconValue.broken_clouds:
            return "http://openweathermap.org/img/wn/04d@2x.png";
        case iconValue.overcast_clouds:
            return "http://openweathermap.org/img/wn/04d@2x.png";
        case iconValue.shower_rain:
            return "http://openweathermap.org/img/wn/09d@2x.png";
        case iconValue.rain:
            return "rain.png";
        case iconValue.thunder:
            return "http://openweathermap.org/img/wn/11d@2x.png";
        case iconValue.snow:
            return "http://openweathermap.org/img/wn/13d@2x.png";
        case iconValue.mist:
            return "http://openweathermap.org/img/wn/50d@2x.png";
    }
}