
const WEATHER_API = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Philippines?unitGroup=us&include=events%2Cdays%2Chours%2Ccurrent&key=7G3F9VHGN3NCZM5E6G2QMP3SS&contentType=json";

let city = document.getElementById("city");
let temp = document.getElementById("temperature");
let time = document.getElementById("time");
let conditions = document.getElementById("conditions");
let wind = document.getElementById("wind");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");
let feltlike = document.getElementById("feltlike");
let image_weather = document.getElementById("image_weather");

fetch(WEATHER_API, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    }
})
.then(res => res.json())
.then(data => {
    console.log(data);
    city.textContent = data.address;
    

    let currentTime = data.currentConditions.datetime;
    let [hour,minute,second] = currentTime.split(':')
    let suffix = hour >=12 ? "PM":"AM"
    hour = hour % 12 || 12

    time.textContent = `${hour}:${minute}:${second} ${suffix}`
            


    temp.textContent = `${((data.currentConditions.temp - 32) * 5 / 9).toFixed(1)}°C`;
    conditions.textContent = data.currentConditions.conditions;

    wind.textContent = `Wind: ${data.currentConditions.winddir}° at ${data.currentConditions.windspeed} mph`;
    
    sunrise.textContent = new Date(data.currentConditions.sunriseEpoch * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sunset.textContent = new Date(data.currentConditions.sunsetEpoch * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    feltlike.textContent = `${((data.currentConditions.feelslike - 32) * 5 / 9).toFixed(1)}°C`;

   
    image_weather.src = data.currentConditions.icon.includes("rain") ? "rain.png" : "sun.png";
})
.catch(error => {
    console.log(error);
});
