let inputWord;
let generateButton;
let title;
let colorChoices = [];
let elements = [];
let selectedColor;

const marginX = 50;    // marge horizontale
const marginTop = 50;  // marge verticale

function setup() {
  createCanvas(windowWidth, windowHeight);

// --- Titre ---
title = createP("Let’s make a moodboard"); //
title.style("font-family", "Manrope");
title.position(marginX, marginTop);
title.style("font-size", "40px");
title.style("color", "white");
title.style("font-weight", "bold");
title.style("margin", "0");
title.style("padding", "6px 12px");
title.style("border-radius", "12px");

  // --- Barre de recherche ---
  inputWord = createInput("");
  inputWord.position(marginX, marginTop + 60); // sous le titre
  inputWord.size(350, 50);
  inputWord.attribute("placeholder", "Type a word…");
  inputWord.style("padding", "10px 15px");
  inputWord.style("font-size", "18px");
  inputWord.style("border-radius", "15px");
  inputWord.style("border", "none");
  inputWord.style("outline", "none");
  inputWord.style("background", "rgba(255,255,255,0.15)");
  inputWord.style("backdrop-filter", "blur(10px)");
  inputWord.style("color", "white");

  // --- Palette de couleurs ---
  let palette = ["#FF5757", "#FFB84E", "#FFE857", "#57FFA5", "#57B1FF", "#AC57FF"];
  let xStart = marginX;
  for (let col of palette) {
    colorChoices.push({
      col,
      x: xStart,
      y: marginTop + 180, // espacement augmenté sous la barre
      size: 50
    });
    xStart += 60;
  }
  selectedColor = color(palette[0]);

  // --- Bouton Générer ---
  generateButton = createButton("Generate");
  generateButton.size(180, 55);
  generateButton.position(marginX, windowHeight - 100);
  generateButton.mousePressed(addElement);

  generateButton.style("font-size", "20px");
  generateButton.style("border-radius", "18px");
  generateButton.style("border", "1px solid rgba(255,255,255,0.35)");
  generateButton.style("background", "rgba(255,255,255,0.15)");
  generateButton.style("backdrop-filter", "blur(12px)");
  generateButton.style("-webkit-backdrop-filter", "blur(12px)");
  generateButton.style("color", "white");
  generateButton.style("cursor", "pointer");
  generateButton.style("box-shadow", "0px 4px 25px rgba(255,255,255,0.2)");
  generateButton.style("transition", "0.25s");

  generateButton.mouseOver(() => {
    generateButton.style("background", "rgba(255,255,255,0.25)");
    generateButton.style("box-shadow", "0px 6px 30px rgba(255,255,255,0.35)");
  });
  generateButton.mouseOut(() => {
    generateButton.style("background", "rgba(255,255,255,0.15)");
    generateButton.style("box-shadow", "0px 4px 25px rgba(255,255,255,0.2)");
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generateButton.position(marginX, windowHeight - 100);
}

function mousePressed() {
  for (let c of colorChoices) {
    let d = dist(mouseX, mouseY, c.x + c.size/2, c.y + c.size/2);
    if (d < c.size/2) {
      selectedColor = color(c.col);
    }
  }
}

function addElement() {
  let word = inputWord.value();
  if (word === "") return;
  
  let x = random(200, width - 200);
  let y = random(200, height - 200);
  let w = random(120, 200);
  let h = random(120, 200);

  elements.push({ word, col: selectedColor, x, y, w, h });
}

function draw() {
  background(0);

  // Label palette
  fill(255);

  // Affichage palette
  for (let c of colorChoices) {
    fill(c.col);
    circle(c.x + c.size/2, c.y + c.size/2, c.size);

    if (selectedColor.toString() === color(c.col).toString()) {
      stroke(255);
      strokeWeight(3);
      noFill();
      circle(c.x + c.size/2, c.y + c.size/2, c.size + 8);
      noStroke();
    }
  }

  // Moodboard elements
  for (let el of elements) {
    fill(el.col);
    rect(el.x, el.y, el.w, el.h, 10);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(el.word, el.x + el.w/2, el.y + el.h/2);
  }
}

  





