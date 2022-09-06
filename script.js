"use script";

const HTML = [];

document.addEventListener("DOMContentLoaded", init);

//initialize
function init() {
  HTML.colorPicker = document.getElementById("color-picker"); //color input element
  HTML.hexSpan = document.querySelector(".hex-value"); //hex value will be displayed in this span element
  HTML.rgbSpan = document.querySelector(".rgb-value"); //rgb value will be displayed in this span element
  HTML.hslSpan = document.querySelector(".hsl-value"); //hsl value will be displayed in this span element
  HTML.selectedColor = document.querySelector(".selected-color"); //color box element
  HTML.interface = document.getElementById("interface"); //the interface
  HTML.colorPicker.addEventListener("input", selectColor);
}

//get the selected color
function selectColor() {
  const hexValue = this.value.substring(1);
  //console.log(hexValue);

  const rgbValue = convertToRGB(hexValue);
  //console.log(rgbValue);

  const hslValue = convertToHSL(rgbValue);
  //console.log(hslValue);

  displayValues(hexValue, rgbValue, hslValue);
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
    case min:
      h = 0;
      break;

    case r:
      h = 60 * (0 + (g - b) / (max - min));
      break;

    case g:
      h = 60 * (2 + (b - r) / (max - min));
      break;

    case b:
      h = 60 * (4 + (r - g) / (max - min));
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

  return { h, s, l };
}

function displayValues(hex, rgb, hsl) {
  HTML.hexSpan.textContent = `#${hex}`;
  HTML.rgbSpan.textContent = `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
  HTML.hslSpan.textContent = `hsl(${hsl.h}, ${hsl.s}, ${hsl.l})`;
  HTML.selectedColor.style.backgroundColor = `#${hex}`;
  HTML.interface.style.outlineColor = `#${hex}`;
}
