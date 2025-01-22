const apiKey ="d65dab6fef86e0ecc4bb633958fc0838";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const search = document.querySelector(".myNav input");
const searchbtn = document.querySelector(".myNav button");

async function checkWeather(city) {
    const response = await fetch(apiUrl+city+`&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=`${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").innerHTML=`${data.main.humidity}%`;
    document.querySelector(".Wind").innerHTML=`${data.wind.speed} km/h`;
    
}
searchbtn.addEventListener("click", ()=>{
    checkWeather(search.value);
});


