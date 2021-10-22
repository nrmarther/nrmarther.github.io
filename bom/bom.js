// var list = document.getElementById("list");
// var node = document.createElement("li");
// var rawInput = document.getElementById("favchap").value;
// var input = document.createTextNode(rawInput);
// var delButton = document.createElement("button");
// delButton.innerHTML = "Delete";

function addItem() {
    var list = document.getElementById("list");
    var node = document.createElement("li");
    var rawInput = document.getElementById("favchap").value;
    var input = document.createTextNode(rawInput);
    var delButton = document.createElement("button");
    delButton.innerHTML = "Delete";
    delButton.className = "delButton";
    input.className= "favScrip"

    if (input == " ") {
        console.log("please input your favorite Book of Mormon Scripture");
    }
    else {
        list.appendChild(node);
        node.appendChild(input);
        node.appendChild(delButton);
    }
};

//delete button 
var delButton = document.getElementsByClassName("delButton");
var input = document.getElementsByClassName("favScrip");
delButton.onclick='input.remove()';
delButton.onclick='delButton.remove()';




//last updated function
let d = new Date(document.lastModified);

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