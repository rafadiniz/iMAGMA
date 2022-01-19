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
let amp2 = 40;

let i;

let ti = 0;
let rot = 40;

function preload() {
  //arquivos .csv
  points = loadTable("data/pointsMagma.csv", "csv", "header");
  pointsM = loadTable("data/pointsM.csv", "csv", "header");
  pointsObl = loadTable("data/pointsObl.csv", "csv", "header");
}

function setup() {
  createCanvas(1280, 720, WEBGL);

  frameRate(24);

  i = 0;
  //acessando os pontos do .csv
  while (i < points.getRowCount()) {

    x = points.get(i, 'x');
    y = points.get(i, 'y');

    posx[i] = noise(i * 0.13) * 300;
    posy[i] = sin(i * 0.17) * 400;

    posx2[i] = x * 0.4;
    posy2[i] = y * 0.4;

    i++;
  }

  //zel = points.getRowCount();
  sizef = points.getRowCount();

  smooth();

  //botões
  button = createButton("MAGMA");
  button.position(width/2, 80);
  button.mousePressed(MAGMA);

  button2 = createButton('M');
  button2.position(width/2+80, 80);
  button2.mousePressed(M);

  button3 = createButton('Obl');
  button3.position(width/2+120, 80);
  button3.mousePressed(Obl);
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

  amp1 -= 0.006;
  if (amp1 <= 0) {
    amp1 = 0;
  }

  amp2 -= 0.06;
  if (amp2 <= 0) {
    amp2 = 0;
    //exit();
  }

  //atualizando os pontos
  for (let i = 0; i < sizef; i++) {
    posx[i] += sin(i * 0.13 + th) * amp1;
    posy[i] += cos(i * 0.1 + th) * amp1;
  }


  //shape vertex
  beginShape();
  for (let i = 0; i < sizef; i++) {

    //interação do mouse com os pontos
    if (mouseIsPressed) {
      if (dist(posx[i], posy[i], (mouseX-width/2)+cos(i*0.1)*10, (mouseY-height/2)+sin(i*0.1)*10) < 80) {
        if (mouseX - width / 2 > posx[i]) {
          posx[i] -= 4;
        } else {
          posx[i] += 4;
        }
        if (mouseY - height / 2 > posy[i]) {
          posy[i] -= 4;
        } else {
          posy[i] += 4;
        }
      }
    }

    //INTERPOLAÇÃO DE ARRAYS
    //obtendo a diferença e testando
    if (posx[i] - posx2[i] > 0) {
      //se a diferença for maior que 0 a posição 1 decrementa
      posx[i] -= 2.5;
      //quando a posição 1 decresce até a posição 2, permanece nesta
      if (posx[i] <= posx2[i]) {
        posx[i] = posx2[i];
      }
    } else {
      //se a diferença for menor que 0 a posição 1 incrementa
      posx[i] += 2.3;
      //quando a posição 1 alcança a posição 2, permanece nesta
      if (posx[i] >= posx2[i]) {
        posx[i] = posx2[i];
      }
    }
    if (posy[i] - posy2[i] > 0) {
      posy[i] -= 2.1;
      if (posy[i] <= posy2[i]) {
        posy[i] = posy2[i];
      }
    } else {
      posy[i] += 2.7;
      if (posy[i] >= posy2[i]) {
        posy[i] = posy2[i];
      }
    }

    //efeitos nos posntos
    let cx = cos(posx[i]*0.013+ti)*40;
    let ny = map(noise(posy[i]*0.01+ti), 0, 1, -1, 1)*40;

    fill(127 + tan(posy[i] * 0.2 + ti) * 127);
    vertex(posx[i]+cx, posy[i]+ny);
  }
  endShape();
}

//ação dos botões: transição entre formas
function MAGMA() {

  sizef = points.getRowCount();
  i = 0;
  while (i < points.getRowCount()) {
    posx[i] = posx2[i];
    posy[i] = posy2[i];

    x = points.get(i, 'x');
    y = points.get(i, 'y');

    posx2[i] = x * 0.6;
    posy2[i] = y * 0.6;

    i++;
  }
}

function M() {

  sizef = pointsM.getRowCount();
  i = 0;
  while (i < pointsM.getRowCount()) {
    posx[i] = posx2[i];
    posy[i] = posy2[i];

    x = pointsM.get(i, 'x');
    y = pointsM.get(i, 'y');

    posx2[i] = x * 0.4;
    posy2[i] = y * 0.4;

    i++;
  }
}

function Obl() {

  sizef = pointsObl.getRowCount();
  i = 0;
  while (i < pointsObl.getRowCount()) {
    posx[i] = posx2[i];
    posy[i] = posy2[i];

    x = pointsObl.get(i, 'x');
    y = pointsObl.get(i, 'y');

    posx2[i] = x * 0.5;
    posy2[i] = y * 0.5;

    i++;
  }
}
