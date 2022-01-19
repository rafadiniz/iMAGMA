//globais
let points;
let pointsM;
let pointsObl;

let sizel = 0;
let sizef = 0;

let posx = [];
let posy = [];

let posx2 = [];
let posy2 = [];

let th = 0;

let amp1 = 6;

let i;

let ti = 0;
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

  i = 0;
  //acessando os pontos do .csv
  while (i < points.getRowCount()) {

    x = points.get(i, 'x');
    y = points.get(i, 'y');

    posx[i] = x * 0.6;
    posy[i] = y * 0.6;

    posx2[i] = x * 0.6;
    posy2[i] = y * 0.6;

    i++;
  }

  //zel = points.getRowCount();
  sizef = points.getRowCount();

  smooth();

}

function draw() {
  background(240);

  ti += 0.01;

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

    if (posx[i] < -width/2) {
      posx[i] = -width/2;
    }
    if (posx[i] > width/2) {
      posx[i] = width/2;
    }
    if (posy[i] < -height/2) {
      posy[i] = -height/2;
    }
    if (posy[i] > height/2) {
      posy[i] = height/2;
    }
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

    if (mouseIsPressed) {
      //INTERPOLAÇÃO DE ARRAYS
      //obtendo a diferença e testando
      if (posx[i] - posx2[i] > 0) {
        //se a diferença for maior que 0 a posição 1 decrementa
        posx[i] -= 40.5;
        //quando a posição 1 decresce até a posição 2, permanece nesta
        if (posx[i] <= posx2[i]) {
          posx[i] = posx2[i];
        }
      } else {
        //se a diferença for menor que 0 a posição 1 incrementa
        posx[i] += 40.3;
        //quando a posição 1 alcança a posição 2, permanece nesta
        if (posx[i] >= posx2[i]) {
          posx[i] = posx2[i];
        }
      }
      if (posy[i] - posy2[i] > 0) {
        posy[i] -= 40.1;
        if (posy[i] <= posy2[i]) {
          posy[i] = posy2[i];
        }
      } else {
        posy[i] += 40.7;
        if (posy[i] >= posy2[i]) {
          posy[i] = posy2[i];
        }
      }
    }

    //efeitos nos posntos
    //let cx = cos(posx[i]*0.013+ti)*40;
    //let ny = map(noise(posy[i]*0.01+ti), 0, 1, -1, 1)*40;

    fill(127 + tan(posy[i] * 0.2 + ti) * 127);
    vertex(posx[i], posy[i]);
  }
  endShape();
}
