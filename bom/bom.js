var list = document.getElementById("list");
var node = document.createElement("li");
var rawInput = document.getElementById("favchap").value;
var input = document.createTextNode(rawInput);
var delButton = document.createElement("button");
delButton.innerHTML = "Delete";

function addItem() {
    console.log("raw input = " + rawInput);
    if (input == " ") {
        console.log("please input your favorite Book of Mormon Scripture");
    }
    else {
        console.log("raw input = " + rawInput);
        list.appendChild(node);
        node.appendChild(input);
        node.appendChild(delButton);
    }
}

function addItem();