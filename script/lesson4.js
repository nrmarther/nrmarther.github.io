const hambutton = document.querySelector('.ham');
const mainnav = document.querySelector('.navigation')

hambutton.addEventListener('click', () => {mainnav.classList.toggle('responsive')}, false);

// footer year and last updated
document.getElementById('modified').innerHTML = document.lastModified;
let date = new Date();
document.getElementById('year').innerHTML = date.getUTCFullYear();