//globais

let img;

function preload() {
  //arquivos .csv
  points = loadTable("data/pointsMagma.csv", "csv", "header");
  //pointsM = loadTable("data/pointsM.csv", "csv", "header");
  //pointsObl = loadTable("data/pointsObl.csv", "csv", "header");
}

function setup() {
  createCanvas(1280, 720);


}

function draw() {
  //background(0);
  
  let i = int(map(mouseX,0,width,0,1400));
  
  nf(i,5) 
  
  //translate(-width/2,-height/2);
  
  loadImage('data/MAGMA_nostk/f'+ nf(i,5) +'.png', img => {
    image(img, 0, 0,1280,720);
  });
 

}
