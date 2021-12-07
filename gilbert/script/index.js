//---------------------------------GENERAL------------------------------
//menu bar navigation
const hambutton = document.querySelector('.ham');
const mainnav = document.querySelector('.navigation')

hambutton.addEventListener('click', () => { mainnav.classList.toggle('responsive') }, false);



// To solve the mid resizing issue with responsive class on
window.onresize = () => { if (window.innerWidth > 760) mainnav.classList.remove('responsive') };

// footer year and last updated
let d = new Date(document.lastModified);
document.getElementById('year').innerHTML = d.getUTCFullYear();


let months = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October",
    "November", "December"
];

let days = ["Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
];


day = days[d.getDay()];
let month = months[d.getMonth()];
let year = d.getFullYear();

let lastUpdated = `${day}, ${d.getDate()} ${month} ${year}`;

document.getElementById('modified').innerHTML = lastUpdated;



function lastSave() {
    const isoString = new Date(document.lastModified).toISOString();
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long"
    };
    console.log(isoString);
    const date = new Date(isoString);
    const upDate = new Intl.DateTimeFormat("en-US", options)
};

//lazy load images
let imagesToLoad = document.querySelectorAll("img[data-src]");

const imgOptions = {
    threshold: 0.1
}
const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute("data-src"));
    image.onload = () => {
        image.removeAttribute('data-src');
    };
};

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
            }
        });
    }, imgOptions);

    imagesToLoad.forEach((img) => {
        observer.observe(img);
    });
} else {
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}

//go to join page
document.getElementsByClassName("submitBtn")[0].onclick = function () {
    location.href = "pages/join.html";
};

//info for 3 day forecast
var date = new Date();
var day = date.getDay();
const dayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.36&lon=-111.80&exclude=hourly,minutely&units=imperial&appid=3a650560bc5a3c6957162bcafca53e0b";
fetch(dayURL)
.then((response) => response.json())
.then((jsObject) => {
  console.log(jsObject);
  
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
      var imagesrc = 'https://openweathermap.org/img/w/' + jsObject.daily[i].weather[0].icon + '.png';  // weather icon
      var desc = jsObject.daily[i].weather[0].description;  // note how we reference the weather array
      dayarr[i].textContent = days[newday];
      temparr[i].textContent = parseInt(jsObject.daily[i].temp.day) + 'ºF';
      climatearr[i].setAttribute('src', imagesrc);
      climatearr[i].setAttribute('alt', desc);
  }
  

});