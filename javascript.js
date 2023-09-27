function getWeatherData(location){
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=0a20986311ac459fad272918232409&q=${location}&days=3`)
        .then((response) => {
            console.log(response.ok);
            console.log(response);
            if(!response.ok && location === ""){
                throw new Error("Please type the name of a city in the search bar");
            } else if (!response.ok) {
                throw new Error("We're having some network issues. Please try again later. Sorry!");
            } else {
                return response.json();
            }
        })
        .then((response) => {
            console.log(response);
            console.log(response.location.name);
            weatherData = response;
            console.log(weatherData);
            city.innerText = weatherData.location.name;
            weekday.innerText = getWeekday(weatherData.location.localtime);
            date.innerText = getDate(weatherData.location.localtime);
            temperature.innerText = weatherData.current.temp_c+"°";
            weatherConditionIcon.setAttribute("src", `img/icons/${getIcon(weatherData.current.condition.icon)}`);
            weatherConditionDescription.innerText = weatherData.current.condition.text;
            updateFontColour(weatherData.current.is_day);
            getBackgroundImage(weatherData.current.condition.code, weatherData.current.is_day);
        })
        .catch(function (error) {
            alert(error.message);
         })
}

function getWeekday(timestamp){
    const date = new Date(timestamp);
    const options = { weekday: 'long'};
    return date.toLocaleDateString(undefined, options);
}

function getDate(timestamp){
    const date = new Date(timestamp);
    const options = {year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

function getIcon(string){
    const lastSlashIndex = string.lastIndexOf('/');
    const secondToLastSlashIndex = string.lastIndexOf('/', lastSlashIndex - 1);
    const desiredPart = string.slice(secondToLastSlashIndex + 1);   
    return desiredPart;
}

function getBackgroundImage(conditionCode, dayOrNight){
    const weatherCodes = {
        clear: [1000],
        rain: [1063, 1072, 1087, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1273, 1276],
        clouds: [1003, 1006, 1009],
        snow: [1066, 1069, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282],
        fog: [1030, 1135, 1147]
    };
    let conditionKey;
    for (let key in weatherCodes){
        if(weatherCodes[key].includes(conditionCode)){
            conditionKey = key;
        }
    }

    if(dayOrNight==1){
        background.style.setProperty("background", `url(img/bkg/day/${conditionKey}.jpg) no-repeat center center fixed`);
    } else {
        background.style.setProperty("background", `url(img/bkg/night/${conditionKey}.jpg) no-repeat center center fixed`);
    }
}

function updateFontColour(dayOrNight) {
    if(dayOrNight==1){
        r.style.setProperty("--text-color", "black");
        r.style.setProperty("--footer-gradient", "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5))");
        weatherConditionIcon.style.setProperty("filter", "grayscale(100%) contrast(200%) invert(100%)");
    } else {
        r.style.setProperty("--text-color", "white");
        r.style.setProperty("--footer-gradient", "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))");
        weatherConditionIcon.style.setProperty("filter", "grayscale(100%) contrast(200%)");
    }
}

//Weather data
let weatherData;

const defaultLocation = "Sibiu";

const weatherConditions = [
	{
		"code" : 1000,
		"day" : "Sunny",
		"night" : "Clear",
		"icon" : 113
	},
	{
		"code" : 1003,
		"day" : "Partly cloudy",
		"night" : "Partly cloudy",
		"icon" : 116
	},
	{
		"code" : 1006,
		"day" : "Cloudy",
		"night" : "Cloudy",
		"icon" : 119
	},
	{
		"code" : 1009,
		"day" : "Overcast",
		"night" : "Overcast",
		"icon" : 122
	},
	{
		"code" : 1030,
		"day" : "Mist",
		"night" : "Mist",
		"icon" : 143
	},
	{
		"code" : 1063,
		"day" : "Patchy rain possible",
		"night" : "Patchy rain possible",
		"icon" : 176
	},
	{
		"code" : 1066,
		"day" : "Patchy snow possible",
		"night" : "Patchy snow possible",
		"icon" : 179
	},
	{
		"code" : 1069,
		"day" : "Patchy sleet possible",
		"night" : "Patchy sleet possible",
		"icon" : 182
	},
	{
		"code" : 1072,
		"day" : "Patchy freezing drizzle possible",
		"night" : "Patchy freezing drizzle possible",
		"icon" : 185
	},
	{
		"code" : 1087,
		"day" : "Thundery outbreaks possible",
		"night" : "Thundery outbreaks possible",
		"icon" : 200
	},
	{
		"code" : 1114,
		"day" : "Blowing snow",
		"night" : "Blowing snow",
		"icon" : 227
	},
	{
		"code" : 1117,
		"day" : "Blizzard",
		"night" : "Blizzard",
		"icon" : 230
	},
	{
		"code" : 1135,
		"day" : "Fog",
		"night" : "Fog",
		"icon" : 248
	},
	{
		"code" : 1147,
		"day" : "Freezing fog",
		"night" : "Freezing fog",
		"icon" : 260
	},
	{
		"code" : 1150,
		"day" : "Patchy light drizzle",
		"night" : "Patchy light drizzle",
		"icon" : 263
	},
	{
		"code" : 1153,
		"day" : "Light drizzle",
		"night" : "Light drizzle",
		"icon" : 266
	},
	{
		"code" : 1168,
		"day" : "Freezing drizzle",
		"night" : "Freezing drizzle",
		"icon" : 281
	},
	{
		"code" : 1171,
		"day" : "Heavy freezing drizzle",
		"night" : "Heavy freezing drizzle",
		"icon" : 284
	},
	{
		"code" : 1180,
		"day" : "Patchy light rain",
		"night" : "Patchy light rain",
		"icon" : 293
	},
	{
		"code" : 1183,
		"day" : "Light rain",
		"night" : "Light rain",
		"icon" : 296
	},
	{
		"code" : 1186,
		"day" : "Moderate rain at times",
		"night" : "Moderate rain at times",
		"icon" : 299
	},
	{
		"code" : 1189,
		"day" : "Moderate rain",
		"night" : "Moderate rain",
		"icon" : 302
	},
	{
		"code" : 1192,
		"day" : "Heavy rain at times",
		"night" : "Heavy rain at times",
		"icon" : 305
	},
	{
		"code" : 1195,
		"day" : "Heavy rain",
		"night" : "Heavy rain",
		"icon" : 308
	},
	{
		"code" : 1198,
		"day" : "Light freezing rain",
		"night" : "Light freezing rain",
		"icon" : 311
	},
	{
		"code" : 1201,
		"day" : "Moderate or heavy freezing rain",
		"night" : "Moderate or heavy freezing rain",
		"icon" : 314
	},
	{
		"code" : 1204,
		"day" : "Light sleet",
		"night" : "Light sleet",
		"icon" : 317
	},
	{
		"code" : 1207,
		"day" : "Moderate or heavy sleet",
		"night" : "Moderate or heavy sleet",
		"icon" : 320
	},
	{
		"code" : 1210,
		"day" : "Patchy light snow",
		"night" : "Patchy light snow",
		"icon" : 323
	},
	{
		"code" : 1213,
		"day" : "Light snow",
		"night" : "Light snow",
		"icon" : 326
	},
	{
		"code" : 1216,
		"day" : "Patchy moderate snow",
		"night" : "Patchy moderate snow",
		"icon" : 329
	},
	{
		"code" : 1219,
		"day" : "Moderate snow",
		"night" : "Moderate snow",
		"icon" : 332
	},
	{
		"code" : 1222,
		"day" : "Patchy heavy snow",
		"night" : "Patchy heavy snow",
		"icon" : 335
	},
	{
		"code" : 1225,
		"day" : "Heavy snow",
		"night" : "Heavy snow",
		"icon" : 338
	},
	{
		"code" : 1237,
		"day" : "Ice pellets",
		"night" : "Ice pellets",
		"icon" : 350
	},
	{
		"code" : 1240,
		"day" : "Light rain shower",
		"night" : "Light rain shower",
		"icon" : 353
	},
	{
		"code" : 1243,
		"day" : "Moderate or heavy rain shower",
		"night" : "Moderate or heavy rain shower",
		"icon" : 356
	},
	{
		"code" : 1246,
		"day" : "Torrential rain shower",
		"night" : "Torrential rain shower",
		"icon" : 359
	},
	{
		"code" : 1249,
		"day" : "Light sleet showers",
		"night" : "Light sleet showers",
		"icon" : 362
	},
	{
		"code" : 1252,
		"day" : "Moderate or heavy sleet showers",
		"night" : "Moderate or heavy sleet showers",
		"icon" : 365
	},
	{
		"code" : 1255,
		"day" : "Light snow showers",
		"night" : "Light snow showers",
		"icon" : 368
	},
	{
		"code" : 1258,
		"day" : "Moderate or heavy snow showers",
		"night" : "Moderate or heavy snow showers",
		"icon" : 371
	},
	{
		"code" : 1261,
		"day" : "Light showers of ice pellets",
		"night" : "Light showers of ice pellets",
		"icon" : 374
	},
	{
		"code" : 1264,
		"day" : "Moderate or heavy showers of ice pellets",
		"night" : "Moderate or heavy showers of ice pellets",
		"icon" : 377
	},
	{
		"code" : 1273,
		"day" : "Patchy light rain with thunder",
		"night" : "Patchy light rain with thunder",
		"icon" : 386
	},
	{
		"code" : 1276,
		"day" : "Moderate or heavy rain with thunder",
		"night" : "Moderate or heavy rain with thunder",
		"icon" : 389
	},
	{
		"code" : 1279,
		"day" : "Patchy light snow with thunder",
		"night" : "Patchy light snow with thunder",
		"icon" : 392
	},
	{
		"code" : 1282,
		"day" : "Moderate or heavy snow with thunder",
		"night" : "Moderate or heavy snow with thunder",
		"icon" : 395
	}
]

const background = document.querySelector("body");
const search = document.getElementById("search-form");
const userInput = document.getElementById("user-input");
const city = document.getElementById("city");
const weekday = document.getElementById("weekday");
const date = document.getElementById("date");
const temperature = document.getElementById("temperature");
const weatherConditionIcon = document.getElementById("weather-condition-icon");
const weatherConditionDescription = document.getElementById("weather-condition-description");
const r = document.querySelector(":root");

getWeatherData(defaultLocation);
search.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(typeof(userInput.value));
    getWeatherData(userInput.value);
    userInput.value="";
})
