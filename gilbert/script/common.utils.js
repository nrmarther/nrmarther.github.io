//-------------------------------------------------------------- GENERAL ----------------------------------------------------------------
export function menubar()  {
    //menu bar navigation
    const hambutton = document.querySelector('.ham');
    const mainnav = document.querySelector('.navigation')

    hambutton.addEventListener('click', () => {mainnav.classList.toggle('responsive')}, false);
}


// To solve the mid resizing issue with responsive class on
window.onresize = () => {if (window.innerWidth > 760) mainnav.classList.remove('responsive')};


export function footer() {
    //get the copyright year in the footer
    let d = new Date(document.lastModified);
    document.getElementById('year').innerHTML = d.getUTCFullYear();


    //string version of days and months
    const months = ["January", "February", "March", "April", "May",
                "June", "July", "August", "September", "October",
                "November", "December"];

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
                "Thursday", "Friday", "Saturday"];


    //setting day, month, and year of last updated as variables
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    //formatting last updated time
    let lastUpdated = `${day}, ${d.getDate()} ${month} ${year}`;

    //put the last updated date into footer
    document.getElementById('modified').innerHTML = lastUpdated;
}

export function hideForecast() {
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
}

export function upcoming (townName) {
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
            console.log(towns.length)
            for (let i = 0; i < towns.length; i++) {
                console.log(i);
                console.log(towns[i].name);
                let name = towns[i].name;
                name = String(name);
                //check for fish haven
                if (name == townName) {
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
}

export function weatherinfo(summary, day) {   
    const summaryURL = summary;
    fetch(summaryURL)
    .then((response) => response.json())
    .then((jsObject) => {
        //info for hero summary
        document.querySelector('#climate').textContent = jsObject.weather[0].main;            //climate
        document.querySelector('#curTemp').textContent = parseInt(jsObject.main.temp);        //current temp
        document.querySelector('#humidity').textContent = parseInt(jsObject.main.humidity);   //humidity
        document.querySelector('#curSpeed').textContent = parseInt(jsObject.wind.speed);      //wind speed

        // ------ Calculate the Windchill ------
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
    const dayURL = day;
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
}
