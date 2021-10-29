let xposleft;
let yposleft;

let xposright;
let yposright;

let lineLength;

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

  line(findXpos(yposleft), yposleft, xposright, yposright);
}

function findXpos(ypos)
{
  xpos = xposright - sqrt(pow(lineLength, 2) - pow((yposright - yposleft), 2));
  return xpos;
}

function keyPressed()
{
  if(keyCode === UP_ARROW)
  {
    yposleft -= 10;
  }

  else if(keyCode === DOWN_ARROW)
  {
    yposleft += 10;
  }
}
