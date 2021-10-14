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
var delButton = document.getElementsByClassName("delButton");
var input = document.getElementsByClassName("favScrip");
delButton.onclick='input.remove()';
delButton.onclick='delButton.remove()';