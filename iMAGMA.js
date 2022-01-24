//globais
let points;
let pointsM;
let pointsObl;

let move = true;
let alpha = 150;

let sizel = 0;
let sizef = 0;

let posx = [];
let posy = [];

let velx = [];
let vely = [];

let posx2 = [];
let posy2 = [];

let th = 0;

let amp2 = 0;

let ti = 0;
let tx = 0;
let ty = 0;
let rot = 40;

function preload() {
  //arquivos .csv
  points = loadTable("data/pointsMagma.csv", "csv", "header");
  //pointsM = loadTable("data/pointsM.csv", "csv", "header");
  //pointsObl = loadTable("data/pointsObl.csv", "csv", "header");
}

function setup() {
  createCanvas(1280, 720, WEBGL);

  frameRate(24);

  //acessando os pontos do .csv
  for (var i = 0; i < points.getRowCount(); i++) {

    x = points.get(i, 'x');
    y = points.get(i, 'y');

    posx[i] = x * 0.6;
    posy[i] = y * 0.6;

    velx[i] = noise(i * 0.01) * 40;
    vely[i] = noise(i * 0.03) * 40;


    posx2[i] = x * 0.6;
    posy2[i] = y * 0.6;
  }

  //zel = points.getRowCount();
  sizef = points.getRowCount();

  smooth();
}

function draw() {
  background(240);

  ti += 0.01;
  tx += 0.01;
  ty += 0.017;

  //sizel+=8;
  //if (sizel >= points.getRowCount()) {
  //  sizel = points.getRowCount();
  //  sizef+=8;
  //  if (sizef >= points.getRowCount()) {
  //    sizef = points.getRowCount();
  //  }
  //}

  //estruturas para gerarem movimento/distorções nos pontos
  th += 0.04;

  //amp1 -= 0.006;
  //if (amp1 <= 0) {
  //  amp1 = 0;
  //}

  //atualizando os pontos
  for (let i = 0; i < sizef; i++) {
    posx[i] += map(noise(i * 0.09), 0, 1, -1, 1) * 3;
    posy[i] += sin(i * 0.13) * 3;

    if (posx[i] < -width / 2.3) {
      posx[i] = -width / 2.3 + noise(i * 0.17 + th) * 80;
    }
    if (posx[i] > width / 2.3) {
      posx[i] = width / 2.3 + noise(i * 0.14 + th) * 80;
    }
    if (posy[i] < -height / 3) {
      posy[i] = -height / 3 + sin(i * 0.13 + th) * 80;
    }
    if (posy[i] > height / 3) {
      posy[i] = height / 3 + sin(i * 0.17 + th) * 80;
    }

    if (mouseIsPressed) {
      if (dist(posx[i], posy[i], mouseX - width / 2, mouseY - height / 2) < 20) {
        amp2 -= 0.9;
        if (amp2 <= 3) {
          amp2 = 3;
        }
      }
    } else {
      amp2 += 0.01;
      if(amp2 >= 200){
        amp2 = 200;
      }

    }

    //if (dist(posx[i], posy[i], mouseX-width/2, mouseY-height/2) < 120) {
    //  alpha = 255;
    //} else {
    //  alpha = 0;
    //}
  }


  //shape vertex
  beginShape();
  for (let i = 0; i < sizef; i++) {

    //interação do mouse com os pontos
    //if (mouseIsPressed) {
    //  if (dist(posx[i], posy[i], (mouseX-width/2)+cos(i*0.1)*10, (mouseY-height/2)+sin(i*0.1)*10) < 80) {
    //    if (mouseX - width / 2 > posx[i]) {
    //      posx[i] -= 4;
    //    } else {
    //      posx[i] += 4;
    //    }
    //    if (mouseY - height / 2 > posy[i]) {
    //      posy[i] -= 4;
    //    } else {
    //      posy[i] += 4;
    //    }


    //  }
    //}

    if (mouseX > width / 2 - 450 && mouseX < width / 2 + 450 && mouseY > height / 2 - 120 && mouseY < height / 2 + 120) {
      alpha = 255;
    } else {
      alpha = 0;
    }


    //INTERPOLAÇÃO DE ARRAYS
    //obtendo a diferença e testando
    if (posx[i] - posx2[i] > 0) {
      //se a diferença for maior que 0 a posição 1 decrementa
      posx[i] -= velx[i];
      //quando a posição 1 decresce até a posição 2, permanece nesta
      if (posx[i] <= posx2[i]) {
        posx[i] = posx2[i];
      }
    } else {
      //se a diferença for menor que 0 a posição 1 incrementa
      posx[i] += velx[i];
      //quando a posição 1 alcança a posição 2, permanece nesta
      if (posx[i] >= posx2[i]) {
        posx[i] = posx2[i];
      }
    }
    if (posy[i] - posy2[i] > 0) {
      posy[i] -= vely[i];
      if (posy[i] <= posy2[i]) {
        posy[i] = posy2[i];
      }
    } else {
      posy[i] += vely[i];
      if (posy[i] >= posy2[i]) {
        posy[i] = posy2[i];
      }
    }


    //efeitos nos posntos
    let nx = map(noise(posx[i] * 0.02 + tx), 0, 1, -1, 1) * amp2;
    let sy = map(noise(posy[i] * 0.027 + ty), 0, 1, -1, 1) * amp2;

    stroke(alpha, 200);
    fill(127 + tan(posy[i] * 0.2 + ti) * 127);
    vertex(posx[i] + nx, posy[i] + sy);
  }
  endShape();
}
