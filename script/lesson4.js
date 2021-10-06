const hambutton = document.querySelector('.ham');
const mainnav = document.querySelector('.navigation')

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('responsive')}, false);

// To solve the mid resizing issue with responsive class on
window.onresize = () => {
    if (window.innerWidth > 760)
         mainnav.classList.remove('responsive')
};

// footer year and last updated
document.getElementById('modified').innerHTML = document.lastModified;
let date = new Date();
document.getElementById('year').innerHTML = date.getUTCFullYear();