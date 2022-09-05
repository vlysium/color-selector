"use script";

const HTML = [];

document.addEventListener("DOMContentLoaded", init);

//initialize
function init() {
  HTML.colorPicker = document.getElementById("color-picker"); //color input element
  HTML.colorPicker.addEventListener("input", selectColor);
}

//get the selected color
function selectColor() {
  let hexValue = this.value;
  console.log(hexValue);
}
