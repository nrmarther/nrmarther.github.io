

var input = document.createTextNode(document.getElementById("favchap"));
var node = document.createElement("LI");
var butt = document.createElement("BUTTON");
var fullButt = butt.appendChild(document.createTextNode("Delete"));
var list = document.getElementsByClassName("list");


function addItem(input) {
    list.appendChild(node);
    node.appendChild(input);
    node.appendChild(fullButt);
};