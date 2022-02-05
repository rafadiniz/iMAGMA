let img;
let i = 0;
let list = 794;

let press = false;

function setup() {
  createCanvas(1280, 720);

  frameRate(24);
}

function draw() {
  //background(0);

  if (press) {
    i-=4;
    if(i <= 30){
      i = 30;
    }
  } else {
    i+=4;
    if (i >= list) {
      i = list;
    }
  }

  loadImage('data/MAGMA_nostk/f'+ nf(i, 5) +'.png', img => {
    image(img, 0, 0, 1280, 720);
  }
  );
}


function mousePressed(){
  press =! press;
}
