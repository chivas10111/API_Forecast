
const searchBar = document.querySelector("#searchBar");
const currentResult = document.querySelector("#currentResult");
const forecastResult = document.querySelector("#forecastResult");
const notFound = document.querySelector("#notFound");
const form = document.querySelector("form");


form.addEventListener("submit", e => {
    e.preventDefault();

    let currentValue = searchBar.value;
    handleSearch(currentValue);

    searchBar.value = "";
});

handleSearch = (query = "Vietnam") => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=74d5fa835af74e8195231518230802 &q=${query}&days=5&aqi=yes&alerts=no`)
            .then(res=>res.json())
            .then(data=> {
                currentResult.innerHTML = `<br><div class="card" style="display: flex; justify-content: center; align-items: center;">
                                            <h1>${data.current.temp_c}°C <img src = "${data.current.condition.icon}" alt="img_weather" style="width: 100px;"></h1>
                                            <h3>${data.location.name} <i class="fa-solid fa-location-dot"></i></h3>
                                            <p>${data.current.condition.text}</p>
                                            <p><i class="fa-solid fa-droplet"></i> ${data.current.humidity}%</p>
                                            <p>${data.location.localtime}</p></div>`;

                data.forecast.forecastday.forEach((items) => {
                    cardForecast = document.createElement("div");
                    cardForecast.style.cssText = `
                        background-image: url("https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.15752-9/330829094_1250953362165214_8084994519594641305_n.png?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_ohc=56QI8pz2BTAAX-GWt7I&_nc_ht=scontent.fsgn5-5.fna&oh=03_AdSS36y1HJPx_f81Zh_B7rxhyQVzBHtu7BfcnjsVRttlMg&oe=641317D6");
                        border-radius: 30px;
                        box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2);
                        font-size: 15px;
                        color: white;  
                    `
                    cardForecast.innerHTML = `<div class="grid-item">
                    <h1>${items.day.avgtemp_c}°C <img src = "${items.day.condition.icon}" alt="img_weather" style="width: 100px;"></h1>
                    <p>${items.day.condition.text}</p>
                    <p><i class="fa-solid fa-droplet"></i> ${items.day.avghumidity}%</p>
                    <p>${items.date}</p></div>`;
                
                    forecastResult.appendChild(cardForecast);
                })

            })

            .catch((error) => {
                notFound.style.cssText = `
                    background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9kYvneZq22IX1CbTcbFSiK0IaWsd_kGhiZw&usqp=CAU");
                    height: 200px;
                    width: 100%;
                `
                notFound.innerHTML = `<p style="color: white; text-align: center; font-size: 20px">No weather forecast results of "${query}"</p>`;
            });
}

handleSearch("ho chi minh");





