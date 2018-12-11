var cols, rows;
var scl = 20;
var w = 1200;
var h = 800;

var flying = 0;

var terrain = [];

function setup() {
  var canvas = createCanvas(1200, 300, WEBGL);
  canvas.parent('cover-sketch');
  cols = w / scl;
  rows = h/ scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function draw() {
  flying -= 0.05;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(30,30,30);
  stroke(100,100,100);
  strokeWeight(1.5);
  translate(0, 50);
  rotateX(PI/3);
  fill(30,30,30);
  
  translate(-w/2, -h/2);

  for (var y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }
}