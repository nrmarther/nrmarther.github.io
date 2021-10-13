//menu bar navigation
const hambutton = document.querySelector('.ham');
const mainnav = document.querySelector('.navigation')

hambutton.addEventListener('click', () => {mainnav.classList.toggle('responsive')}, false);



// To solve the mid resizing issue with responsive class on
window.onresize = () => {if (window.innerWidth > 760) mainnav.classList.remove('responsive')};



//do not show the 5 day forecast in mobile view
var media = window.matchMedia("(max-width: 37.4em)");

function del5Day(media) {
    if (media.matches) {
        document.getElementsByClassName("content_box")[1].style.display = "none";
    }
    else {
        document.getElementsByClassName("content_box")[1].style.display = "block";
    }
}

del5Day(media);
media.addListener(del5Day);



//show pancake's in park banner on friday's
var date = new Date();
var day = date.getDay();
function banner() {
    if (day == 5) {
        document.getElementById("banner").style.display = "block";
    }
    else {
        document.getElementById("banner").style.display = "none";
    }
}
banner();



// footer year and last updated
let d = new Date(document.lastModified);
document.getElementById('year').innerHTML = d.getUTCFullYear();


let months = ["January", "February", "March", "April", "May",
              "June", "July", "August", "September", "October",
              "November", "December"];

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
            "Thursday", "Friday", "Saturday"];


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