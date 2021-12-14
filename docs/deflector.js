let ogBallWidth = 30;
let ogBallHeight = 30;

let ballWidth = ogBallWidth;
let ballHeight = ogBallHeight;

let xpos;
let ypos;

let xspeed = 0;
let yspeed = 0.1;

let gravity = 0.4;

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

  xposleft = width/9;
  yposleft = height - 40;

  xposright = width/3;
  yposright = height - 40;

  lineLength = (2/9) * width;

  xpos = (5/18) * width;
  ypos = ogBallHeight/2;
}

function draw()
{
  // frameRate(2);
  springBack();

  let back = color(0, 165, 255);
  background(back);
  let ballColor = color(255, 145, 0);

  strokeWeight(20);
  stroke(150);
  line(findXpos(angle), findYpos(angle), xposright, yposright);

  yspeed += gravity;
  ypos += yspeed;
  xpos += xspeed;

  bounceBottom();
  bounceTop();
  bounceLeft();
  bounceRight();
  bounceRamp();

  noStroke();
  fill(ballColor);
  ellipse(xpos, ypos, ballWidth, ballHeight);
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


function keyPressed()
{
  if(keyCode === UP_ARROW && angle < HALF_PI)
  {
    angle += .05 * QUARTER_PI;
  }

  else if(keyCode === DOWN_ARROW && angle > 0)
  {
    angle -= .05 * QUARTER_PI;
  }
}

function springBack()
{
  if(ypos <= height - ballHeight/2 || ypos >= ballHeight/2 || xpos <= width - ballWidth/2 || xpos >= ballWidth/2)
  {
    ballHeight = ogBallHeight;
    ballWidth = ogBallWidth;
  }
}

function bounceBottom()
{
  if(ypos + ballHeight/2 > height)
  {
    ballHeight *= 1 - (yspeed * .001);
    ballWidth *= 1 + (yspeed * .001);
    // hasHitBottom = true;
    ypos = height - ballHeight/2;
    yspeed *= -0.6;
    xspeed *= 0.995;
  }
  if(ypos + ballHeight/2 === height)
  {
    xspeed *= 0.995;
  }
}

function bounceTop()
{
  if(ypos < ballHeight/2)
  {
    ballHeight *= 1 - (-yspeed * .001);
    ballWidth *= 1 + (-yspeed * .001);
    // hasHitTop = true;
    ypos = ballHeight/2;
    yspeed *= -0.6;
    xspeed *= 0.995;
  }
}

function bounceLeft()
{
  if(xpos < ballWidth/2)
  {
    ballHeight *= 1 + (-xspeed * .001);
    ballWidth *= 1 - (-xspeed * .001);
    // hasHitLeft = true;
    xpos = ballHeight/2;
    xspeed *= -0.6;
    yspeed *= 0.995;
  }
}

function bounceRight()
{
  if(xpos + ballWidth/2 > width)
  {
    ballHeight *= 1 + (yspeed * .001);
    ballWidth *= 1 - (yspeed * .001);
    // hasHitRight = true;
    xpos = width - ballHeight/2;
    xspeed *= -0.6;
    yspeed *= 0.995;
  }
}

function bounceRamp()
{
  let y = yposright - ypos;
  let x = xposright - xpos;
  if(round(y/sqrt(pow(y, 2) + pow(x, 2)), 1) < round(sin(angle), 1))
  {
    yspeed *= -0.6;
  }
}

//  use the law of reflection for ball bounce
