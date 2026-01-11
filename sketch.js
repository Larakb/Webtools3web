let colorImages = {};
let inputWord;
let generateButton;
let title;
let colorChoices = [];
let elements = [];
let selectedColor;

const marginX = 50;
const marginTop = 50;

function preload() {
  colorImages = {
    "#FF5757": loadImage("images/rouge.jpg"),
    "#FFB84E": loadImage("images/orange.jpg"),
    "#57FFA5": loadImage("images/vert.jpg"),
    "#57B1FF": loadImage("images/bleu.jpg")
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // --- Titre ---
  title = createP("Let’s make a moodboard");
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
  inputWord.position(marginX, marginTop + 100);
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
  let palette = ["#FF5757", "#FFB84E", "#57FFA5", "#57B1FF"];
  let xStart = marginX;

  for (let col of palette) {
    colorChoices.push({
      col,
      x: xStart,
      y: marginTop + 210,
      size: 50
    });
    xStart += 60;
  }

  selectedColor = color(palette[0]);

  // --- Bouton Generate ---
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
    let d = dist(mouseX, mouseY, c.x + c.size / 2, c.y + c.size / 2);
    if (d < c.size / 2) {
      selectedColor = color(c.col);
    }
  }
}

function addElement() {
  let word = inputWord.value();
  if (word === "") return;

  // Taille
  let w = random(720, 600);
  let h = random(720, 600);

  // Position centrée
  let x = width / 2 - w / 2;
  let y = height / 2 - h / 2;

  let colStr =
    "#" +
    hex(red(selectedColor), 2) +
    hex(green(selectedColor), 2) +
    hex(blue(selectedColor), 2);

  colStr = colStr.toUpperCase();

  let img = colorImages[colStr];

  elements.push({
    word,
    img,
    x,
    y,
    w,
    h
  });
}

function draw() {
  background(0);

  // Palette
  for (let c of colorChoices) {
    fill(c.col);
    circle(c.x + c.size / 2, c.y + c.size / 2, c.size);

    if (selectedColor.toString() === color(c.col).toString()) {
      stroke(255);
      strokeWeight(3);
      noFill();
      circle(c.x + c.size / 2, c.y + c.size / 2, c.size + 8);
      noStroke();
    }
  }

  // Moodboard
  for (let el of elements) {
    if (el.img) {
      image(el.img, el.x, el.y, el.w, el.h);
    } else {
      fill(255);
      rect(el.x, el.y, el.w, el.h, 10);
    }

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(70);
    text(el.word, el.x + el.w / 2, el.y + el.h / 2);
  }
}
