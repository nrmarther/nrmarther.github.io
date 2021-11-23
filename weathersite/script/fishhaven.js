//-------------------------------------------------------------- GENERAL ----------------------------------------------------------------
//menu bar navigation
const hambutton = document.querySelector('.ham');
const mainnav = document.querySelector('.navigation')

hambutton.addEventListener('click', () => {mainnav.classList.toggle('responsive')}, false);



// To solve the mid resizing issue with responsive class on
window.onresize = () => {if (window.innerWidth > 760) mainnav.classList.remove('responsive')};

// footer year and last updated
let d = new Date(document.lastModified);
document.getElementById('year').innerHTML = d.getUTCFullYear();


const months = ["January", "February", "March", "April", "May",
              "June", "July", "August", "September", "October",
              "November", "December"];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
            "Thursday", "Friday", "Saturday"];


day = days[d.getDay()];
let month = months[d.getMonth()];
let year = d.getFullYear();

let lastUpdated = `${day}, ${d.getDate()} ${month} ${year}`;

document.getElementById('modified').innerHTML = lastUpdated;

//---------------------------------------------------------- FISH HAVEN PAGE ------------------------------------------------------------

//do not show the 5 day forecast in mobile view
var media = window.matchMedia("(max-width: 625px)");

function del5Day(media) {
    if (media.matches) {
        document.getElementsByClassName("content_box")[0].style.display = "none";
    }
    else {
        document.getElementsByClassName("content_box")[0].style.display = "block";
    }
}
del5Day(media);
media.addListener(del5Day);

// --------------------------------- upcoming events ----------------------------------
const requestURL = '../script/towndata.json';

fetch(requestURL)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
        throw new ERROR('Network response was not ok');
    })
    .then(function(jsonObject) {
        const towns = jsonObject['towns'];
        for (let i = 0; i < towns.length; i++) {
            let name = String(towns[i].name);
            //check for fish haven
            if (name == "Fish Haven") {
                let town = towns[i];
                let events = town.events;
                for (j=0; j < events.length; j++) {
                    let li = document.createElement("li")
                    li.textContent = events[j];

                    document.querySelector("#events").appendChild(li)
                }
            }
        }
    })

// ---------------------------- grab weather summary info -----------------------------
const summaryURL = "https://api.openweathermap.org/data/2.5/weather?id=5585010&units=imperial&appid=3a650560bc5a3c6957162bcafca53e0b";
fetch(summaryURL)
  .then((response) => response.json())
  .then((jsObject) => {
    //info for hero summary
    document.querySelector('#climate').textContent = jsObject.weather[0].main;  //climate
    document.querySelector('#curTemp').textContent = parseInt(jsObject.main.temp);        //current temp
    document.querySelector('#humidity').textContent = parseInt(jsObject.main.humidity);   //humidity
    document.querySelector('#curSpeed').textContent = parseInt(jsObject.wind.speed);      //wind speed

    // -------------------- Calculate the Windchill -----------------------------------
        let temp = jsObject.main.temp;
        let speed = jsObject.wind.speed;

        buildWC(speed, temp);

        function buildWC(speed, temp) {
            let wcTemp = document.getElementById('windchill');
        
            // Compute the windchill
            let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
            // Round the answer down to integer
            wc = Math.floor(wc);
            // If chill is greater than temp, return the temp
            wc = (wc > temp) ? temp : wc;
            // Display the windchill
            wc = wc+'°F';
            wcTemp.innerHTML = wc;
            }
  });

  //info for 5 day forecast
  const dayURL = "https://api.openweathermap.org/data/2.5/forecast?id=5585010&cnt=5&units=imperial&appid=3a650560bc5a3c6957162bcafca53e0b";
  fetch(dayURL)
  .then((response) => response.json())
  .then((jsObject) => {
    const daysarr = document.getElementsByClassName('days');
    const dayarr = document.getElementsByClassName('day');
    const temparr = document.getElementsByClassName('dailyTemp');
    const climatearr = document.getElementsByClassName('climate');
    for (i=0; i < daysarr.length; i++) {
        //loop ensures day cannot exceed 7
        var newday= day + i
        if (newday >= 7) {
            newday %= 7
        }
        var imagesrc = 'https://openweathermap.org/img/w/' + jsObject.list[i].weather[0].icon + '.png';  // weather icon
        var desc = jsObject.list[i].weather[0].description;  // note how we reference the weather array
        dayarr[i].textContent = days[newday];
        temparr[i].textContent = parseInt(jsObject.list[i].main.temp) + 'ºF';
        climatearr[i].setAttribute('src', imagesrc);
        climatearr[i].setAttribute('alt', desc);
    }  
  });

