let img;
let i = 0;

let list = 754;
let free = true;


function setup() {
  createCanvas(1280, 720);

  frameRate(24);
}

function draw() {
  //background(0);
  
  //loop
  if (free) {
    i++;
    if (i > list) {
      free = false;
    }
  }
  if (!free) {
    i--;
    if (i < 5) {
      free = true;
    }
  }


  loadImage('data/MAGMA_nostk/f'+ nf(i, 5) +'.png', img => {
    image(img, 0, 0, 1280, 720);
  }
  );
}
