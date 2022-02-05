let img;

let i = 0;

let list = 794;

function setup() {
  createCanvas(1280, 720);
}

function draw() {
  //background(0);

  if (mouseIsPressed) {
    i = int(map(mouseX, 0, width, 0, list));
  }else{
    i++;
    if(i >= list){
      i = list;
    }
  }
  
  loadImage('data/MAGMA_nostk/f'+ nf(i, 5) +'.png', img => {
    image(img, 0, 0, 1280, 720);
  }
  );
}
