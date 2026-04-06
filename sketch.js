let lines = [
  "no words appear before me in the aftermath",
  "salt streams out my eyes and into my ears",
  "every single thing i touch becomes sick with sadness.",
  "'cause its all over now, all out to sea",

  "did some bird flap its wings over in Asia?",
  "did some force take you because i didn't pray?",
  "every single thing to come has turned into ashes.",
  "'cause it's all over now. it's not meant to be.",
  "so i'll say words i don't believe:",

  "goodbye, goodbye, goodbye,",
  "you were bigger than the whole sky.",
  "you were more than just a short time.",
  "and i've got a lot to pine about,",
  "i've got a lot to live without.",

  "i'm never going to meet",
  "what could've been,",
  "would've been,",
  "what should've been you.",

  "♡",
  "(taylor swift, bigger than the whole sky, 2022)."
];

let currentLine = 0;
let revealedText = [];

let button;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  textFont('Georgia');
  
//-------reveal button at top
  button = createButton('reveal');
  button.position(width / 2 - 40, 80);
  button.style('padding', '10px 20px');
  button.style('background-color', '#c799b0');
  button.style('border', 'none');
  button.style('border-radius', '8px');
  button.mousePressed(revealLine);
}

function draw() {
  let progress = currentLine / lines.length;

  //-------background goes from white to black
  let shade = 255 * (1 - progress);
  background(shade);

  //-------text goes from black to white
  let textShade = 40 + (215 * progress);
  fill(textShade);

  textSize(16);
  text("click to reveal the poem.", width / 2, 40);

  //----------draws poem lines
  let startY = 150;
  for (let i = 0; i < revealedText.length; i++) {
    text(revealedText[i], width / 2, startY + i * 28);
  }
}

function revealLine() {
  if (currentLine < lines.length) {
    revealedText.push(lines[currentLine]);
    currentLine++; //----------moves to next line next click
  } else {
    button.html("gone."); //----------button changes from reveal to gone
  }
}