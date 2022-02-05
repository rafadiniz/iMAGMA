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
    i += 4;
    if (i > list) {
      free = false;
    }
  }
  if (!free) {
    i -= 1;
    if (i < 600) {
      free = true;
    }
  }


  loadImage('data/MAGMA_nostk/f'+ nf(i, 5) +'.png', img => {
    image(img, 0, 0, 1280, 720);
  }
  );
}
