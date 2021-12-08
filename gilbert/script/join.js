//---------------------------------GENERAL------------------------------
//menu bar navigation
const hambutton = document.querySelector('.ham');
const mainnav = document.querySelector('.navigation')

hambutton.addEventListener('click', () => {mainnav.classList.toggle('responsive')}, false);



// To solve the mid resizing issue with responsive class on
window.onresize = () => {if (window.innerWidth > 760) mainnav.classList.remove('responsive')};


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

//displays input for severity slider
function adjustRating(rating) {
    document.getElementById("ratingvalue").innerHTML = rating;
}

//return to home page from thank you page
document.getElementsByClassName("return")[0].onclick = function () {
    location.href = "../index.html";
};