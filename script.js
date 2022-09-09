"use script";

const HTML = []; //array of variables

document.addEventListener("DOMContentLoaded", init);

//initialize
function init() {
  HTML.colorPicker = document.getElementById("color-picker"); //color input element

  HTML.primaryInterface = document.querySelector("#primary-interface"); //the primary interface
  HTML.primaryHexSpan = HTML.primaryInterface.querySelector(".hex-value"); //primary hex value
  HTML.primaryRGBSpan = HTML.primaryInterface.querySelector(".rgb-value"); //primary rgb value
  HTML.primaryHSLSpan = HTML.primaryInterface.querySelector(".hsl-value"); //primary hsl value
  HTML.primarySelectedColor = HTML.primaryInterface.querySelector(".selected-color"); //primary color square element

  HTML.secondaryInterface = document.querySelectorAll(".secondary-interface"); //secondary interfaces

  HTML.radioButtons = document.querySelectorAll(".harmony input"); //radio buttons for harmonies
  HTML.selectedHarmony = "analogous"; //variable for harmony mode, analogous is default
  document.querySelector(".default").checked = true; //auto-check analogous

  HTML.colorPicker.addEventListener("input", selectColor);
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

  colorElements(hslValue, HTML.primarySelectedColor, HTML.primaryInterface);

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

//converts the hsl value to hex values
function convertToHex(hsl) {
  const h = hsl.h;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return r.toString(16) + g.toString(16) + b.toString(16);
}

//display the values in the document
function displayValues(hex, rgb, hsl, hexSpan, rgbSpan, hslSpan) {
  hexSpan.textContent = `#${hex}`;
  rgbSpan.textContent = `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
  hslSpan.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

//color the square and outline of the interface
function colorElements(hsl, selectedColor, interface) {
  selectedColor.style.backgroundColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  interface.style.outlineColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

//change the harmony mode to the selected radio button
function harmonyMode() {
  HTML.selectedHarmony = this.value;
}

//find harmonies
function harmony(hsl) {
  HTML.secondaryInterface.forEach((interface) => {
    //console.log(interface);
    const hexSpan = interface.querySelector(".hex-value");
    const rgbSpan = interface.querySelector(".rgb-value");
    const hslSpan = interface.querySelector(".hsl-value");
    const colorSquare = interface.querySelector(".selected-color");
    const weight = interface.dataset.weight;

    let hslShifted, hexShifted, rgbShifted;

    switch (HTML.selectedHarmony) {
      case "analogous":
        hslShifted = analogous(hsl, weight);
        break;
      case "monochromatic":
        hslShifted = monochromatic(hsl, weight);
        break;
      case "triad":
        hslShifted = triad(hsl, weight);
        break;
      case "complementary":
        hslShifted = complementary(hsl, weight);
        break;
      case "compound":
        hslShifted = compound(hsl, weight);
        break;
      case "shades":
        hslShifted = shades(hsl, weight);
        break;
    }

    const hslShiftedAdjusted = degreesLimit(hslShifted);

    hexShifted = convertToHex(hslShiftedAdjusted);
    rgbShifted = convertToRGB(hexShifted);

    displayValues(hexShifted, rgbShifted, hslShiftedAdjusted, hexSpan, rgbSpan, hslSpan);
    colorElements(hslShiftedAdjusted, colorSquare, interface);
  });
}

//shift hue by +-8 and +-16 degrees
function analogous(hsl, weight) {
  const h = 8 * weight + hsl.h;
  const s = hsl.s;
  const l = hsl.l;

  return { h, s, l };
}

//shift saturation by +-20 or luminance by +-16
function monochromatic(hsl, weight) {
  let h, s, l;

  switch (weight) {
    case "-2":
      h = hsl.h;
      s = hsl.s;
      l = hsl.l - 16;
      break;

    case "-1":
      h = hsl.h;
      s = hsl.s + 20;
      l = hsl.l;
      break;

    case "1":
      h = hsl.h;
      s = hsl.s - 20;
      l = hsl.l;
      break;

    case "2":
      h = hsl.h;
      s = hsl.s;
      l = hsl.l + 16;
      break;
  }

  return { h, s, l };
}

//shift hue by +-120 and +-240 degrees, and luminance by +-10 and +-20
function triad(hsl, weight) {
  const h = 120 * weight + hsl.h;
  const s = hsl.s;
  const l = 10 * weight + hsl.l;

  return { h, s, l };
}

//shift hue by +-180 and +-360 degrees, and luminance by either -10, 0, +20 or +30
function complementary(hsl, weight) {
  const h = 180 * weight + hsl.h;
  const s = hsl.s;
  const l = 10 * weight + hsl.l + 10;

  return { h, s, l };
}

//shift hue by +195, +180, +15 and +30 degrees
function compound(hsl, weight) {
  let h, s, l;

  switch (weight) {
    case "-2":
      h = hsl.h + 195;
      s = hsl.s;
      l = hsl.l;
      break;

    case "-1":
      h = hsl.h + 180;
      s = hsl.s;
      l = hsl.l;
      break;

    case "1":
      h = hsl.h + 15;
      s = hsl.s;
      l = hsl.l;
      break;

    case "2":
      h = hsl.h + 30;
      s = hsl.s;
      l = hsl.l;
      break;
  }

  return { h, s, l };
}

//shift luminance by 10 and 20
function shades(hsl, weight) {
  const h = hsl.h;
  const s = hsl.s;
  const l = 10 * weight + hsl.l;

  return { h, s, l };
}

//adjust the hue if it's smaller than 0 degrees or greater than 360 degrees,
//so the convertion of hsl to hex/rgb is using and displaying the correct values
function degreesLimit(hsl) {
  const h = hsl.h < 0 ? hsl.h + 360 : hsl.h > 360 ? hsl.h - 360 : hsl.h;
  const s = hsl.s;
  const l = hsl.l;

  return { h, s, l };
}
