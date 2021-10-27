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
  threshold: 0.05
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