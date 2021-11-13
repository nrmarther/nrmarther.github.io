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

//request json for town info
const requestURL = '../script/towndata.json';

fetch(requestURL)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
        throw new ERROR('Network response was not ok');
    })
    .then(function(jsonObject) {
        console.table(jsonObject); // temporary checking for valid response and data parsing
        const towns = jsonObject['towns'];


        for (let i = 0; i < towns.length; i++) {
            let name = towns[i].name;
            name = String(name);
            //check for any of the relevant cities
            if (name == 'Preston' ||
                name == 'Fish Haven' ||
                name == 'Soda Springs') {
                //create section element with class of 'card'
                let card = document.createElement('section');
                card.classList.add('card');
                //create div element with class of 'data'
                let data = document.createElement('div');
                data.classList.add('data');
                //create different elements
                let h2 = document.createElement('h2');
                let cp = document.createElement('p');
                let ar = document.createElement('p');
                let index = document.createElement('p');
                let image = document.createElement('img');

                // add appropriate content to elements
                h2.textContent = towns[i].name;
                index.textContent = towns[i].motto;
                cp.textContent = 'Current Population: ' + towns[i].currentPopulation;
                ar.textContent = 'Average Rain Fall: ' + towns[i].averageRainfall;
                image.setAttribute('src', towns[i].photo);
                image.setAttribute('alt', towns[i].name + ' photo');

                //add elements to have correct children
                card.appendChild(data)
                data.appendChild(h2);
                data.appendChild(index);
                data.appendChild(cp);
                data.appendChild(ar);
                card.appendChild(image);

                document.querySelector('.cards').appendChild(card);
            }
        }
    })
    .catch(function(error) {
        console.log('Fetch error: ', error.message);
    })

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