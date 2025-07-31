let mic

function setup() {
  createCanvas(windowWidth, windowHeight)

  // se inicializa el micrófono
  mic = new p5.AudioIn()
  mic.start()
  colorMode(RGB)

}

function draw() {
 
  

  // se obtiene el volumen del audio obtenido por el micro
  let volume = mic.getLevel()

  let fond = map (volume,0,1,0,255)
  // se mapea el volumen a la cantidad de círculos
  let count = map(volume, 0, 1, 0, 500)

  let cant = map(volume,0,1,1,200)
  // se mapea el volumen al tamaño de los círculos
  let size = map(volume, 0, 1, 0, height / 2)

  let sizem = map(volume, 0 ,1 ,800 , 1200)

  let inven = map(volume,0,1.5,0,100)

  let strokew = map (volume, 0 , 1 , 1 ,5)
  let colorr = map (volume, 0 , 0 , 20 , 100)
  let colorg = map (volume, 0 , 1 , 40 , 150)
  let colorb = map (volume, 0 , 1 , 15 , 60)

  console.log(volume)

  let c = color(colorr, colorg, colorb)


 // noStroke();
//fill(colorr,colorg,colorb);
//for (let i = 0; i < 100; i++) {
//for (let j = 0; j < 100; j++) {
 //stroke(i, j, 0);
 //  point(1920, 1080);
 // }
//}

 // fill(colorr,colorg,colorb)

 fill('#dab6e9');
 strokeWeight(strokew)
 stroke('#e44385')
  
  for (let i = 0; i < count; i++) {
   // fill('blue')
    circle(random(width), random(height), size)
  }

  push();
  translate(width * 0.5, height * 0.5);
  rotate(frameCount / 50.0);
  star(0, 0, 80, 1000, 40);
  pop();

  //el segundo que es tamaño
  
  push();
  translate(width * 0.5, height * 0.5);
  rotate(frameCount / 50.0);
  star(0, 0, 80, size, cant);
  pop();
// relleno para gradient

  push();
  translate(width * 0.5, height * 0.5);
  rotate(frameCount / 50.0);
  star(0, 0, 80, cant, 40);
  pop();


 
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



// acomoda el canvas cuando se redimensiona la ventana
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
