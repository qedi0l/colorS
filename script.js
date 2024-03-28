const uploadBox = document.querySelector(".upload-box");
const colorBlocks = document.querySelectorAll('.color-block, .main-block');
const option = document.querySelector('.option');
previewImg = uploadBox.querySelector("img");
fileInput = uploadBox.querySelector("input");
downloadBtn = document.querySelector(".download-btn");
colorPicker = document.querySelector(".pickers-box");
blockPart7 = document.querySelector(".part7");
var hColor='';
var eColor='';
var sColor='';
var Scheme = [];


const loadFile = (e) => {
  const file = e.target.files[0]; // getting first user selected file
  if(!file) return; // return if user hasn't selected any file
  previewImg.src = URL.createObjectURL(file); // passing selected file url to preview img src
  previewImg.addEventListener("load", () => { // once img loaded
    iconReupload = document.querySelector(".icon-reupload");
    subIconText = document.querySelector(".sub-icon-text");
    blockPart1 = document.querySelector(".part1");
    blockPart7 = document.querySelector(".part7");
    upButton = document.querySelector(".upload-button");

    previewImg.removeAttribute("hidden");
    colorPicker.setAttribute("style", "display: flex");
    iconReupload.removeAttribute("hidden");
    iconReupload.setAttribute("style", "display: flex");
    subIconText.setAttribute("hidden","");
    blockPart7.setAttribute("style", "left: 25px;");
    upButton.setAttribute("style", "display: none");

  });
  
}
fileInput.addEventListener("change", loadFile);

uploadBox.addEventListener("click", () => fileInput.click());

// Highlight Toolbar
function highlightToolbar() {
  var toolbar = document.getElementById("toolbar");
  toolbar.classList.add("highlighted");
  setTimeout(function() {
    toolbar.classList.remove("highlighted");
  }, 1000);
}

// Eye color picker
eyeColor = document.getElementById("eye-color");
eyeColor.addEventListener("change",(event)=>{
  eyeColorBox = document.querySelector(".eye-color-box");
  var color = event.target.value; // Get selected hex
  var colorContrast = contrastColor(color); // Get approximate contrast

  eyeColorBox.setAttribute("style", "background-color:"+color+";color: #"+colorContrast+";");
  eColor = color;

  if ((hColor && eColor && sColor)!='') updateColorBlockCodes(ColorScheme(eColor,sColor,hColor));
})

// Skin color picker
skinColor = document.getElementById("skin-color");
skinColor.addEventListener("change",(event)=>{
  skinColorBox = document.querySelector(".skin-color-box");
  var color = event.target.value; // Get selected hex
  var colorContrast = contrastColor(color); // Get approximate contrast

  skinColorBox.setAttribute("style", "background-color:"+color+";color: #"+colorContrast+";");;
  sColor=color;

  if ((hColor && eColor && sColor)!='') updateColorBlockCodes(ColorScheme(eColor,sColor,hColor));
})

// Hair color picker
hairColor = document.getElementById("hair-color");
hairColor.addEventListener("change",(event)=>{
  hairColorBox = document.querySelector(".hair-color-box");
  var color = event.target.value; // Get selected hex
  var colorContrast = contrastColor(color); // Get approximate contrast
 
  hairColorBox.setAttribute("style", "background-color:"+color+";color: #"+colorContrast+";");;
  hColor = color;
  
  if ((hColor && eColor && sColor)!='') updateColorBlockCodes(ColorScheme(eColor,sColor,hColor));
})

// Schemes gen
function triadicFromThree(color1,color2,color3){
  const HSLcolor1 = hexToHsl(color1);
  const HSLcolor2 = hexToHsl(color2);
  const HSLcolor3 = hexToHsl(color3);
  var h1 = HSLcolor1[0];
  var h2 = HSLcolor2[0];
  var h3 = HSLcolor3[0];

  var dif1 = Math.abs(h2 - h1);
  var dif2 = Math.abs(h1 - h3);
  var dif3 = Math.abs(h2 - h3);
  

  if(dif1<120){
    h1 += (120-dif1)/2;
    h2 += (120-dif1)/2;
  }else{
    h1 -= (120-dif1)/2;
    h2 -= (120-dif1)/2;
  }
  
  if(dif2<dif3){
    h1 += dif2/2;
    h2 += dif2/2;

    if (dif2<120){
      h1 += (120-dif2)/2;
      h3 += (120-dif2)/2;
      h2 += (120-dif2)/2;
    }else{
      h1 -= (120-dif2)/2;
      h3 -= (120-dif2)/2;
      h2 -= (120-dif2)/2;
    }
  
  }else{
    h1 += dif3/2;
    h2 += dif3/2;
    
    if (dif3<120){
      h1 += (120-dif3)/2;
      h2 += (120-dif3)/2;
      h3 += (120-dif3)*2;
    }else{
      h1 -= (120-dif3)/2;
      h2 -= (120-dif3)/2;
      h3 -= (120-dif3)*2;
    }
  }
  
  triada1 = HslToHex(h1%360,(hexToHsl(color1)[1]+20)%100,hexToHsl(color1)[2]);
  triada2 = HslToHex(h2%360,(hexToHsl(color2)[1])%100,hexToHsl(color2)[2]);
  triada3 = HslToHex(h3%360,(hexToHsl(color3)[1])%100,hexToHsl(color3)[2]);
  return [triada1,triada2,triada3];
}

function analogousForThree(color1,color2,color3){
  //const h1 = hexToHsl(color1)[0];
  //const h2 = hexToHsl(color2)[0];
  //const h3 = hexToHsl(color3)[0];
  const analogous = [analogousColors(color1),analogousColors(color2),analogousColors(color3)];
  
  return analogous;
}

function analogousColors(color){
  const hsl= hexToHsl(color);
  const h = hsl[0];
  const s = hsl[1];
  const l = hsl[2];
  
  analog1 = HslToHex((h-10)%360,s,l);
  analog2 = HslToHex((h+10)%360,s,l);

  return [analog1,analog2];
}

function complementaryColor(color){
  const hsl= hexToHsl(color);
  const h = hsl[0];
  const s = hsl[1];
  const l = hsl[2];
  const complementary = HslToHex((h + 180)%360, s, l);
  return complementary;
}

function monochromaticColor(color){
  const hsl= hexToHsl(color);
  const h = hsl[0];
  const s = hsl[1];
  const l = hsl[2];
  var monochromatic1;
  var monochromatic2;
  var monochromatic3;
  if (l<70){
    monochromatic1 = HslToHex(h,s,(l+10));
    monochromatic2 = HslToHex(h,s,(l+20));
    monochromatic3 = HslToHex(h,s,(l+30));
  }
  if (l<80){
    monochromatic1 = HslToHex(h,s,(l+10));
    monochromatic2 = HslToHex(h,s,(l+15));
    monochromatic3 = HslToHex(h,s,(l+20));
  }
  if (l<90){
    monochromatic1 = HslToHex(h,s,(l+3));
    monochromatic2 = HslToHex(h,s,(l+6));
    monochromatic3 = HslToHex(h,s,(l+10));
  }
  if (l>90){
    monochromatic1 = HslToHex(h,s,(l));
    monochromatic2 = HslToHex(h,s,(l));
    monochromatic3 = HslToHex(h,s,(l));
  }

  return [monochromatic1,monochromatic2,monochromatic3];
}
function cTriadic(color){
  const hsl= hexToHsl(color);
  const h = hsl[0];
  const s = hsl[1];
  const l = hsl[2];

  return [HslToHex((h+120)%360,s,l),
          HslToHex((h-120)%360,s,l)];
}

function cTriadicFromThree(eColor,hColor,sColor){
    return [cTriadic(eColor),cTriadic(hColor),cTriadic(sColor)];
}

function multipleMonochrome (eColor,hColor,sColor){
  return [monochromaticColor(eColor),monochromaticColor(hColor),monochromaticColor(sColor)]
}

function multipleAnalogous(eColor,hColor,sColor){
  return [monochromaticColor(eColor),monochromaticColor(hColor),monochromaticColor(sColor)]
}

function ColorScheme(eColor,hColor,sColor){
  const triada = triadicFromThree(eColor,hColor,sColor);
  const monochrom = multipleMonochrome(eColor,hColor,sColor);
  const complementar = [complementaryColor(eColor),complementaryColor(hColor),complementaryColor(sColor)];
  const analog = analogousForThree(eColor,hColor,sColor);
  const ctriadic = cTriadicFromThree(eColor,hColor,sColor);
  //triadicCode.textContent = "#" + getComputedStyle(triadic).backgroundColor.slice(4, -1).split(',').map(x => parseInt(x.trim()).toString(16).padStart(2, '0')).join('');
  Scheme = [triada, monochrom, complementar, analog, ctriadic];
  
  return [triada, monochrom, complementar, analog, ctriadic];
}


moveTriadicHueR = document.getElementById("triadic-move-hue-l");
moveTriadicHueR.addEventListener("click", function() {

  var Triada = Scheme[0];

  var triadic1 = Triada[0];
  var triadic2 = Triada[1];
  var triadic3 = Triada[2];

  triadic1 = hexToHsl(triadic1);
  triadic2 = hexToHsl(triadic2);
  triadic3 = hexToHsl(triadic3);

  var hue1 = (triadic1[0]-5)%360;
  var hue2 = (triadic2[0]-5)%360;
  var hue3 = (triadic3[0]-5)%360;
  
  triadic1 = HslToHex(hue1,triadic1[1],triadic1[2]);
  triadic2 = HslToHex(hue2,triadic2[1],triadic2[2]);
  triadic3 = HslToHex(hue3,triadic3[1],triadic3[2]);

  Triada = [triadic1,triadic2,triadic3];

  Scheme[0] = Triada;
  
  updateColorBlockCodes(Scheme);
});

moveTriadicHueR = document.getElementById("triadic-move-hue-r");
moveTriadicHueR.addEventListener("click", function() {

  var Triada = Scheme[0];

  var triadic1 = Triada[0];
  var triadic2 = Triada[1];
  var triadic3 = Triada[2];

  triadic1 = hexToHsl(triadic1);
  triadic2 = hexToHsl(triadic2);
  triadic3 = hexToHsl(triadic3);

  var hue1 = (triadic1[0]+5)%360;
  var hue2 = (triadic2[0]+5)%360;
  var hue3 = (triadic3[0]+5)%360;
  
  triadic1 = HslToHex(hue1,triadic1[1],triadic1[2]);
  triadic2 = HslToHex(hue2,triadic2[1],triadic2[2]);
  triadic3 = HslToHex(hue3,triadic3[1],triadic3[2]);

  Triada = [triadic1,triadic2,triadic3];

  Scheme[0] = Triada;
  
  updateColorBlockCodes(Scheme);
});

moveTriadicHueR = document.getElementById("complementary-move-hue-l");
moveTriadicHueR.addEventListener("click", function() {

  var Complementary = Scheme[2];

  var complementar1 = Complementary[0];
  var complementar2 = Complementary[1];
  var complementar3 = Complementary[2];

  complementar1 = hexToHsl(complementar1);
  complementar2 = hexToHsl(complementar2);
  complementar3 = hexToHsl(complementar3);

  var hue1 = (complementar1[0]-5)%360;
  var hue2 = (complementar2[0]-5)%360;
  var hue3 = (complementar3[0]-5)%360;
  
  complementar1 = HslToHex(hue1,complementar1[1],complementar1[2]);
  complementar2 = HslToHex(hue2,complementar2[1],complementar2[2]);
  complementar3 = HslToHex(hue3,complementar3[1],complementar3[2]);

  Complementary = [complementar1,complementar2,complementar3];

  console.log(Complementary);

  Scheme[2] = Complementary;
  
  updateColorBlockCodes(Scheme);
});

moveTriadicHueR = document.getElementById("complementary-move-hue-r");
moveTriadicHueR.addEventListener("click", function() {

  var Complementary = Scheme[2];

  var complementar1 = Complementary[0];
  var complementar2 = Complementary[1];
  var complementar3 = Complementary[2];

  complementar1 = hexToHsl(complementar1);
  complementar2 = hexToHsl(complementar2);
  complementar3 = hexToHsl(complementar3);

  var hue1 = (complementar1[0]+5)%360;
  var hue2 = (complementar2[0]+5)%360;
  var hue3 = (complementar3[0]+5)%360;
  
  complementar1 = HslToHex(hue1,complementar1[1],complementar1[2]);
  complementar2 = HslToHex(hue2,complementar2[1],complementar2[2]);
  complementar3 = HslToHex(hue3,complementar3[1],complementar3[2]);

  Complementary = [complementar1,complementar2,complementar3];

  Scheme[2] = Complementary;
  
  updateColorBlockCodes(Scheme);
});

// Add HEX values

var complementary = document.querySelector('.complementary');
var main = document.querySelector('.main-block');
var monochromatic = document.querySelector('.monochromatic');
var analogous = document.querySelector('.analogous');


const complementaryCode = document.querySelector('#complementary-code');
const mainCode = document.querySelector('#main-code');
const monochromaticCode = document.querySelector('#monochromatic-code');
const analogousCode = document.querySelector('#analogous-code');
const triadicCode = document.querySelector('#triadic-code');

function updateColorBlockCodes(schemes) {

  triada = schemes[0];
  
  const triadic1 = document.querySelector('.triadic1');
  const triadic2 = document.querySelector('.triadic2');
  const triadic3 = document.querySelector('.triadic3');

  triadic1.innerHTML = `<div class="color-block" style='background-color:`+ triada[0]+`'><div class="variant1" >`+ triada[0]+`</div></div>`;  
  triadic2.innerHTML = `<div class="color-block" style='background-color:`+ triada[1]+`'><div class="variant1" >`+ triada[1]+`</div></div>`;
  triadic3.innerHTML = `<div class="color-block" style='background-color:`+ triada[2]+`'><div class="variant1" >`+ triada[2]+`</div></div>`;


  monochromatic = schemes[1];
  //console.log(schemes[0][0][0]);
  const monochromatic1 = document.querySelector('.monochromatic1');
  const monochromatic2 = document.querySelector('.monochromatic2');
  const monochromatic3 = document.querySelector('.monochromatic3');

  monochromatic1.innerHTML = `<div class="color-block" style='background-color:`+ monochromatic[0][0]+`'><div class="variant1" >`+ monochromatic[0][0]+`</div></div><div class="color-block" style='background-color:`+ monochromatic[0][1]+`'><div class="variant2" >`+ monochromatic[0][1]+`</div></div><div class="color-block" style='background-color:`+ monochromatic[0][2]+`'><div class="variant3" >`+ monochromatic[0][2]+`</div></div>`;  
  monochromatic2.innerHTML = `<div class="color-block" style='background-color:`+ monochromatic[1][0]+`'><div class="variant1" >`+ monochromatic[1][0]+`</div></div><div class="color-block" style='background-color:`+ monochromatic[1][1]+`'><div class="variant2" >`+ monochromatic[1][1]+`</div></div><div class="color-block" style='background-color:`+ monochromatic[1][2]+`'><div class="variant3" >`+ monochromatic[1][2]+`</div></div>`;
  monochromatic3.innerHTML = `<div class="color-block" style='background-color:`+ monochromatic[2][0]+`'><div class="variant1" >`+ monochromatic[2][0]+`</div></div><div class="color-block" style='background-color:`+ monochromatic[2][1]+`'><div class="variant2" >`+ monochromatic[2][1]+`</div></div><div class="color-block" style='background-color:`+ monochromatic[2][2]+`'><div class="variant3" >`+ monochromatic[2][2]+`</div></div>`;

    
  complementary = schemes[2];

  const complementary1 = document.querySelector('.complementary1');
  const complementary2 = document.querySelector('.complementary2');
  const complementary3 = document.querySelector('.complementary3');

  complementary1.innerHTML = `<div class="color-block" style='background-color:`+ complementary[0]+`'><div class="variant1" >`+ complementary[0]+`</div></div>`;  
  complementary2.innerHTML = `<div class="color-block" style='background-color:`+ complementary[1]+`'><div class="variant1" >`+ complementary[1]+`</div></div>`;
  complementary3.innerHTML = `<div class="color-block" style='background-color:`+ complementary[2]+`'><div class="variant1" >`+ complementary[2]+`</div></div>`;  

  analog = schemes[3];
  
  const analog1 = document.querySelector('.analogous1');
  const analog2 = document.querySelector('.analogous2');
  const analog3 = document.querySelector('.analogous3');

  analog1.innerHTML = `<div class="color-block" style='background-color:`+ analog[0][0]+`'><div class="variant1" >`+ analog[0][0]+`</div></div><div class="color-block" style='background-color:`+ analog[0][1]+`'><div class="variant2" >`+ analog[0][1]+`</div></div>`;  
  analog2.innerHTML = `<div class="color-block" style='background-color:`+ analog[1][0]+`'><div class="variant1" >`+ analog[1][0]+`</div></div><div class="color-block" style='background-color:`+ analog[1][1]+`'><div class="variant2" >`+ analog[1][1]+`</div></div>`;
  analog3.innerHTML = `<div class="color-block" style='background-color:`+ analog[2][0]+`'><div class="variant1" >`+ analog[2][0]+`</div></div><div class="color-block" style='background-color:`+ analog[2][1]+`'><div class="variant2" >`+ analog[2][1]+`</div></div>`;
  
  cTriada = schemes[4];
  
  const ctriada1 = document.querySelector('.ctriadic1');
  const ctriada2 = document.querySelector('.ctriadic2');
  const ctriada3 = document.querySelector('.ctriadic3');

  ctriada1.innerHTML = `<div class="color-block" style='background-color:`+ cTriada[0][0]+`'><div class="variant1 column" >`+ cTriada[0][0]+`<div class="variant1">+</div></div></div><div class="color-block" style='background-color:`+ eColor +`'><div class="trts" >`+ 'Eye color'+`</div></div><div class="color-block" style='background-color:`+ cTriada[0][1]+`'><div class="variant2" >`+ cTriada[0][1]+`<div class="variant2 column">-</div></div></div>`;  
  ctriada2.innerHTML = `<div class="color-block" style='background-color:`+ cTriada[1][0]+`'><div class="variant1 column" >`+ cTriada[1][0]+`<div class="variant1">+</div></div></div><div class="color-block" style='background-color:`+ sColor +`'><div class="trts" >`+ 'Skin color'+`</div></div><div class="color-block" style='background-color:`+ cTriada[1][1]+`'><div class="variant2" >`+ cTriada[1][1]+`<div class="variant2 column">-</div></div></div>`;
  ctriada3.innerHTML = `<div class="color-block" style='background-color:`+ cTriada[2][0]+`'><div class="variant1 column" >`+ cTriada[2][0]+`<div class="variant1">+</div></div></div><div class="color-block" style='background-color:`+ hColor +`'><div class="trts" >`+ 'Hair color'+`</div></div><div class="color-block" style='background-color:`+ cTriada[2][1]+`'><div class="variant2" >`+ cTriada[2][1]+`<div class="variant2 column">-</div></div></div>`;  


  blockPart1.setAttribute("style", "display: flex");
}

// FAQ

const faqQuestions = document.querySelectorAll(".faq");
const faqAnswers = document.querySelectorAll(".faq-a");
const faqIcons = document.querySelectorAll(".faq-icon");

faqQuestions.forEach((faqQuestion, index) => {
  faqQuestion.addEventListener('click', () => {
    faqIcons[index].classList.toggle("expand");
    faqAnswers[index].classList.toggle("expand");
  });
});

// Colors operations
function InvertColor(color){
  hslColor = hexToHsl(color);
  var H = Math.abs(360 - hslColor[0]);
  var S = Math.abs(100 - hslColor[1]);
  var L = Math.abs(100 - hslColor[2]);
  return [H,S,L];
}

function contrastColor(color){
    return (luma(color.substr(1)) >= 165) ? '000' : 'fff';
}
function luma(color) {
    var rgb = (typeof color === 'string') ? hexToRGBArray(color) : color;
    return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]);
}

// Hex to RGB
function hexToRGBArray(color){
    color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);

    var rgb = [];
    for (var i = 0; i <= 2; i++)
        rgb[i] = parseInt(color.substr(i * 2, 2), 16);
    return rgb;
}

// Hex to HSL
function hexToHsl(hex) {
  const r = parseInt(hex.substring(1, 3), 16) / 255;
  const g = parseInt(hex.substring(3, 5), 16) / 255;
  const b = parseInt(hex.substring(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}
// HSL to Hex
function HslToHex(h,s,l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function combineColors(color1,color2){
  RGBcolor1 = hexToRGBArray(color1);
  RGBcolor2 = hexToRGBArray(color2);
  var R = (RGBcolor1[0]+RGBcolor2[0])/2
  var G = (RGBcolor1[1]+RGBcolor2[1])/2
  var B = (RGBcolor1[2]+RGBcolor2[2])/2
  return [R,G,B];
} 
