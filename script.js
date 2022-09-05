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
  const hexValue = this.value.substring(this.value.length - 6);
  //console.log(hexValue);

  const rgbValue = convertToRGB(hexValue);
  //console.log(rgbValue);

  let hslValue = convertToHSL(hexValue);
  console.log(hslValue);
}

//converts the hex value to rgb values
function convertToRGB(hex) {
  //console.log(hex);
  const red = parseInt("0x" + hex.substring(0, 2));
  const green = parseInt("0x" + hex.substring(2, 4));
  const blue = parseInt("0x" + hex.substring(4, 6));

  const rgb = `${red}, ${green}, ${blue}`;

  return rgb;
}

//converts the hex value to hsl values
function convertToHSL(hex) {
  const red = parseInt("0x" + hex.substring(0, 2)) / 255;
  const green = parseInt("0x" + hex.substring(2, 4)) / 255;
  const blue = parseInt("0x" + hex.substring(4, 6)) / 255;

  let h, s, l;

  const min = Math.min(red, green, blue);
  const max = Math.max(red, green, blue);

  switch (max) {
    case min:
      h = 0;
      break;

    case red:
      h = 60 * (0 + (green - blue) / (max - min));
      break;

    case green:
      h = 60 * (2 + (blue - red) / (max - min));
      break;

    case blue:
      h = 60 * (4 + (red - green) / (max - min));
      break;
  }

  if (h < 0) {
    h = h + 360;
  }

  //calculate luminance/brightness
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

  const hsl = `${h}, ${s}, ${l}`;

  return hsl;
}
