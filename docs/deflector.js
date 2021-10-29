let xposleft;
let yposleft;

let xposright;
let yposright;

function setup()
{
  let canvas = createCanvas(windowWidth*0.9, windowHeight*0.9);
  canvas.position((windowWidth - width)/2, (windowHeight - height)/2);
  strokeWeight(20);
  stroke(150);

  xposleft = width/9;
  yposleft = height - 40;

  xposright = width/3;
  yposright = height - 40;
}

function draw()
{
  let back = color(0, 165, 255);
  background(back);

  line(xposleft, yposleft, xposright, yposright);
}
