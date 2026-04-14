let lines = [
  "no words appear before me in the aftermath",
  "salt streams out my eyes and into my ears",
  "every single thing i touch becomes sick with sadness.",
  "'cause its all over now, all out to sea.",
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
let lineData = [];
let fallingLetters = [];
let button;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Georgia');
  
//----------button at the middle top
  button = createButton('reveal');
  button.position(width / 2 - 40, 80);
  button.style('padding', '10px 20px');
  button.style('background-color', '#c799b0');
  button.style('border', 'none');
  button.style('border-radius', '8px');
  button.mousePressed(revealLine);
}

//---------how far through the poem we are
function draw() {
  let progress = currentLine / lines.length;
  
//---------background will get darker with every line
  background(255 * (1 - progress));
  let textShade = 40 + (215 * progress);
  textSize(16);
  fill(textShade);
  
//---------button is in the middle top
  textAlign(CENTER);
  text("slowly click to reveal the poem.", width / 2, 40);

//----------poem starts showing downwards
  let startY = 150;
  
//----------loop every shown line/draw it each frame
  for (let i = 0; i < revealedText.length; i++) {

//----------stored data object/how long since sketch started. tells p5 when specific line was clicked
    let data = lineData[i];
    
//----------t: how long ago specific line first showed, controls timing+its animation
    let t = millis() - data.time;
    let x = width / 2;
    let y = startY + i * 28;
    let lineText = data.text;

    //----------first line fades away
    if (lineText === "no words appear before me in the aftermath") {

      let alpha = 255;

      if (t > 2000) {
        let fade = constrain((t - 2000) / 2000, 0, 1);
        alpha = 255 * (1 - fade);
      }

      fill(textShade, alpha);
      textAlign(CENTER);
      text(lineText, x, y);
    }
    
//----------second text dissapates 
    else if (lineText === "salt streams out my eyes and into my ears") {
      let blurStart = 2500;
      let blurEnd = 4500;
      let blurAmount = 0;

//---------pre 2.5s no blur. after 2.5s blur starts
      if (t > blurStart) {
        let amt = constrain((t - blurStart) / (blurEnd - blurStart), 0, 1);
        blurAmount = lerp(0, 8, amt);
      }
      
      drawingContext.filter = `blur(${blurAmount}px)`;
      fill(textShade);
      textAlign(CENTER);
      text(lineText, x, y);
      drawingContext.filter = "none";
    }

    else if (lineText === "every single thing i touch becomes sick with sadness.") {
      let base= "every single thing i touch becomes sick with ";
      let word = "sadness";
      textAlign(LEFT);
      let fullWidth = textWidth(base + word);
      let startX = width / 2 - fullWidth / 2;

      fill(textShade);
      text(base, startX, y);
      let sadnessX = startX + textWidth(base);
      text(word, sadnessX, y);
 

      if (!data.spawned) {
        for (let i = 0; i < word.length; i++) {
//----------line three letters falling's location
          fallingLetters.push({
            char: word[i],
            x: sadnessX + i * 9,
            y: y,
            vx: random(-0.2, 0.2),
            vy: 0,
            alpha: 255,
            startFallTime: millis() + 2500
          });
        }
        data.spawned = true;
      }
      textAlign(CENTER);
    }
    
//----------fourth line will have wave
    else if (lineText === "'cause its all over now, all out to sea.") {
      textAlign(LEFT);
      let waveDelay = 2000;
      let waveAmount = 0;
      
//----------wait before showing wave
      if (t > waveDelay) {
        let amt = constrain((t - waveDelay) / 4000, 0, 1);
        waveAmount = lerp(0, 6, amt);
      }

      let fullWidth = textWidth(lineText);
      let startX = width / 2 - fullWidth / 2;

      let currentX = startX;

      for (let i = 0; i < lineText.length; i++) {
        let char = lineText[i];
        
//----------smooth ocean wave
        let offsetY = sin(frameCount * 0.03 + i * 0.5) * waveAmount;
        fill(textShade);
        text(char, currentX, y + offsetY);
        currentX += textWidth(char);
      }

      textAlign(CENTER);
    }

//----------default lines
    else {
      fill(textShade);
      textAlign(CENTER);
      text(lineText, x, y);

      if (i === 4) {
        let strikeStart = 2500;
        let strikeEnd = 4000;

        if (t > strikeStart) {
          let amt = constrain((t - strikeStart) / (strikeEnd - strikeStart), 0, 1);
          let w = textWidth(lineText);
          let startX = x - w / 2;

          stroke(0);
          strokeWeight(1.5);

          for (let j = 0; j < 3; j++) {
            let yOffset = random(-2, 2);
            let jitter = random(-5, 5);
            line(startX + jitter, y + yOffset, startX + w * amt + jitter, y + yOffset);
          }

          noStroke();
        }
      }
    }
  }
  
//----------l.startFall=when letter is allowed to start falling 
  for (let l of fallingLetters) {
    if (millis() > l.startFallTime) {
      
//---------vy=speed going down page, + 0.05 each frame=to make faster as it falls
      l.vy += 0.05;
      
//----------vx=speed going across page, small value from before (-0.2, 0.2), l.vy=updates up/down position using realistic fall
      l.x += l.vx;
      l.y += l.vy;
    }

//----------word slowly disappears as falling down 
    l.alpha -= 1.0;
    fill(textShade, l.alpha);
    text(l.char, l.x, l.y);
  }
}

//----------every click triggers the chunk. lineslength=total # of lines
function revealLine() {
  if (currentLine < lines.length) {
    revealedText.push(lines[currentLine]);

    lineData.push({
      text: lines[currentLine],
      time: millis(),
      spawned: false
    });
    currentLine++;
  } else {
    button.html("gone.");
  }
}