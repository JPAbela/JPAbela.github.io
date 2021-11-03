let xposleft;
let yposleft;

let xposright;
let yposright;

let lineLength;

let angle = 0;

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

  lineLength = (2/9) * width;
}

function draw()
{
  let back = color(0, 165, 255);
  background(back);

  line(findXpos(angle), findYpos(angle), xposright, yposright);
}

function findXpos(angle)
{
  xdist = lineLength * cos(angle);
  return width/3 - xdist;
}

function findYpos(angle)
{
  yheight = lineLength * sin(angle);
  return (height - 40) - yheight;
}

// function findAngle(height)
// {
//   return asin(height/lineLength)
// }

function keyPressed()
{
  if(keyCode === UP_ARROW)
  {
    angle += .05 * QUARTER_PI;
  }

  else if(keyCode === DOWN_ARROW)
  {
    angle -= .05 * QUARTER_PI;
  }
}
