let xposleft;
let yposleft;

function setup()
{
  let canvas = createCanvas(windowWidth*0.9, windowHeight*0.9);
  canvas.position((windowWidth - width)/2, (windowHeight - height)/2);
  strokeWeight(20);
  stroke(150);

  xposleft = width/9;
  yposleft = height - 40;
}

function draw()
{
  let back = color(0, 165, 255);
  background(back);

  // rotate(-PI/4);
  line(xposleft, yposleft, width/3, height - 40);
}
