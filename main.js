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
    // Dibuja el círculo con relleno y borde como los del sketch
    background(255);
    stroke('#e44385');      // borde igual que en el sketch
    strokeWeight(2);
    fill('#dab6e9');        // relleno igual que en el sketch
    ellipse(width / 2, height / 2, 80);

    // Texto en tipografía mono y color del borde
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
  rotate(frameCount / 50.0);
  star(0, 0, 80, max(width, height) * 2, 40); // 🔺 Escalado dinámico aquí
  pop();

  push();
  translate(width * 0.5, height * 0.5);
  rotate(frameCount / 50.0);
  star(0, 0, 80, size, cant);
  pop();

  push();
  translate(width * 0.5, height * 0.5);
  rotate(frameCount / 50.0);
  star(0, 0, 80, cant, 40);
  pop();
}

function mousePressed() {
  if (!micStarted) {
    let d = dist(mouseX, mouseY, width / 2, height / 2);
    if (d < 40) { // radio del círculo es 80, entonces 40
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
