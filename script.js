"use script";

const HTML = []; //array of variables

document.addEventListener("DOMContentLoaded", init);

//initialize
function init() {
  HTML.colorPicker = document.getElementById("color-picker"); //color input element
  HTML.primaryHexSpan = document.querySelector("#primary-interface .hex-value"); //primary hex value
  HTML.secondaryHexSpan = document.querySelectorAll(".secondary-interface .hex-value"); //secondary hex values
  HTML.primaryRGBSpan = document.querySelector("#primary-interface .rgb-value"); //primary rgb value
  HTML.secondaryRGBSpan = document.querySelectorAll(".secondary-interface .rgb-value"); //secondary rgb values
  HTML.primaryHSLSpan = document.querySelector("#primary-interface .hsl-value"); //primary hsl value
  HTML.secondaryHSLSpan = document.querySelectorAll(".secondary-interface .hsl-value"); //secondary hsl values
  HTML.primarySelectedColor = document.querySelector("#primary-interface .selected-color"); //primary color square element
  HTML.secondarySelectedColor = document.querySelector(".secondary-interface .selected-color"); //secondary color square element
  HTML.primaryInterface = document.querySelector("#primary-interface"); //the primary interface
  HTML.colorPicker.addEventListener("input", selectColor);
  HTML.radioButtons = document.querySelectorAll(".harmony input"); //radio buttons for harmonies
  HTML.selectedHarmony = "analogous"; //variable for harmony mode, default is "analogous"
  HTML.radioButtons.forEach((button) => button.addEventListener("input", harmonyMode));
}

//get the selected color
function selectColor() {
  const hexValue = this.value.substring(1);
  //console.log(hexValue);

  const rgbValue = convertToRGB(hexValue);
  //console.log(rgbValue);

  const hslValue = convertToHSL(rgbValue);
  //console.log(hslValue);

  displayValues(hexValue, rgbValue, hslValue, HTML.primaryHexSpan, HTML.primaryRGBSpan, HTML.primaryHSLSpan);

  colorElements(hexValue, HTML.primarySelectedColor, HTML.primaryInterface);

  harmony(hslValue);
}

//converts the hex value to rgb values
function convertToRGB(hex) {
  //console.log(hex);
  const red = parseInt("0x" + hex.substring(0, 2));
  const green = parseInt("0x" + hex.substring(2, 4));
  const blue = parseInt("0x" + hex.substring(4, 6));

  return { red, green, blue };
}

//converts the hex value to hsl values
function convertToHSL(rgb) {
  const r = rgb.red / 255;
  const g = rgb.green / 255;
  const b = rgb.blue / 255;

  //hue, saturation, luminance
  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  switch (max) {
    //if max === min
    case min:
      h = 0;
      break;

    //if max === r
    case r:
      h = 60 * (0 + (g - b) / (max - min));
      break;

    //if max === g
    case g:
      h = 60 * (2 + (b - r) / (max - min));
      break;

    //if max === b
    case b:
      h = 60 * (4 + (r - g) / (max - min));
      break;
  }

  //cycle between 0 to 360 degrees
  if (h < 0) {
    h = h + 360;
  }

  //calculate luminance
  l = (min + max) / 2;

  //calculate saturation
  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }

  //convert value to percent
  s *= 100;
  l *= 100;

  //round values
  h = Math.round(h);
  s = Math.round(s);
  l = Math.round(l);

  return { h, s, l };
}

//display the values in the document
function displayValues(hex, rgb, hsl, hexSpan, rgbSpan, hslSpan) {
  hexSpan.textContent = `#${hex}`;
  rgbSpan.textContent = `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
  hslSpan.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

//color the square and outline of the interface
function colorElements(hex, selectedColor, interface) {
  selectedColor.style.backgroundColor = `#${hex}`;
  interface.style.outlineColor = `#${hex}`;
}

//change the harmony mode to the selected radio button
function harmonyMode() {
  HTML.selectedHarmony = this.value;
}

function harmony(mainColor) {
  switch (HTML.selectedHarmony) {
    case "analogous":
      break;
    case "monochromatic":
      break;
    case "triad":
      break;
    case "complementary":
      break;
    case "compound":
      break;
    case "shades":
      break;
  }
}
