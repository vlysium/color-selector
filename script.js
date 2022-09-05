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
  //console.log(hexValue);

  let rgbValue = convertToRGB(hexValue.substring(hexValue.length - 6));
  console.log(rgbValue);
}

//converts the color to rgb values
function convertToRGB(hex) {
  //console.log(hex);
  let red = parseInt("0x" + hex.substring(0, 2));
  let green = parseInt("0x" + hex.substring(2, 4));
  let blue = parseInt("0x" + hex.substring(4, 6));

  let rgb = `${red}, ${green}, ${blue}`;

  return rgb;
}
