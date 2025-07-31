let mic;
let micStarted = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  background(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  textFont('monospace'); // fuente mono
}

function draw() {
  if (!micStarted) {
    // Círculo inicial como estaba
    background(255);
    stroke('#e44385');
    strokeWeight(2);
    fill('#dab6e9');
    ellipse(width / 2, height / 2, 80);
    noStroke();
    fill('#e44385');
    text('click', width / 2, height / 2);
    return;
  }

  background(255, 10); // fondo blanco con efecto trail

  let volume = mic.getLevel();

  let count = map(volume, 0, 1, 0, 500);
  let cant = map(volume, 0, 1, 1, 200);
  let size = map(volume, 0, 1, 0, height / 2);
  let strokew = map(volume, 0, 1, 1, 5);
  let colorr = map(volume, 0, 1, 20, 100);
  let colorg = map(volume, 0, 1, 40, 150);
  let colorb = map(volume, 0, 1, 15, 60);

  fill('#dab6e9');
  strokeWeight(strokew);
  stroke('#e44385');

  for (let i = 0; i < count; i++) {
    circle(random(width), random(height), size);
  }

  push();
  translate(width * 0.5, height * 0.5);
  rotate(frameCount / 100.0);
  noFill();
  stroke(228, 67, 133, 50); // rosa con transparencia
  strokeWeight(2);
  star(0, 0, height * 0.2, max(width, height) * 1.2, 100); // grande y abierto
  pop();

  push();
  translate(width * 0.5, height * 0.5);
  rotate(frameCount / 60.0);
  noFill();
  stroke(218, 182, 233, 30); // violeta claro con transparencia
  strokeWeight(1);
  star(0, 0, height * 0.15, size * 2, cant);
  pop();

  push();
  translate(width * 0.5, height * 0.5);
  rotate(-frameCount / 80.0);
  noFill();
  stroke(228, 67, 133, 30); // rosa claro
  strokeWeight(1);
  star(0, 0, height * 0.1, cant * 1.5, 60);
  pop();
}

function mousePressed() {
  if (!micStarted) {
    let d = dist(mouseX, mouseY, width / 2, height / 2);
    if (d < 40) {
      userStartAudio().then(() => {
        mic = new p5.AudioIn();
        mic.start();
        micStarted = true;
      });
    }
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
