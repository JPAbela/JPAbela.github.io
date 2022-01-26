let ogBallWidth = 30;
let ogBallHeight = 30;

let ballWidth = ogBallWidth;
let ballHeight = ogBallHeight;

let xpos;
let ypos;

let xspeed = 0;
let yspeed = 0;

let gravity = .6;

let xposright;
let yposright;

let lineLength;

let angle = 0;

let released;

function setup()
{
  let canvas = createCanvas(windowWidth*0.9, windowHeight*0.9);
  canvas.position((windowWidth - width)/2, (windowHeight - height)/2);

  xposright = width/3;
  yposright = height - 40;

  lineLength = (2/9) * width;

  xpos = findXpos(angle) + (xposright - findXpos(angle))/2;
  ypos = ogBallHeight/2;

  released = false;
}

function draw()
{
  frameRate();
  springBack();

  let back = color(0, 165, 255);
  background(back);
  let ballColor = color(255, 145, 0);

  strokeWeight(20);
  stroke(150);
  line(findXpos(angle), findYpos(angle), xposright, yposright);

  if(released)
  {
    yspeed += gravity;
  }

  bounceRamp();
  bounceBottom();
  bounceTop();
  bounceLeft();
  bounceRight();

  if((ypos > height - (ballHeight * .6)) && (yspeed > -.8 && yspeed < .8))
  {
    ypos = height - ballHeight/2;
    yspeed = 0;
  }
  ypos += yspeed;
  if(xspeed > -.6 && xspeed < .6)
  {
    xspeed = 0;
  }
  xpos += xspeed;

  noStroke();
  fill(ballColor);
  ellipse(xpos, ypos, ballWidth, ballHeight);
}

function findXpos(angle)
{
  xdist = lineLength * cos(angle);
  return xposright - xdist;
}

function findYpos(angle)
{
  yheight = lineLength * sin(angle);
  return yposright - yheight;
}


function keyPressed()
{
  if(keyCode === UP_ARROW && angle < HALF_PI - QUARTER_PI/2)
  {
    angle += .05 * QUARTER_PI;
  }
  else if(keyCode === DOWN_ARROW && angle > 0)
  {
    angle -= .05 * QUARTER_PI;
  }
  else if(keyCode === ENTER)
  {
    released = true;
    console.log(ypos);
    console.log(height - ballHeight/2);
  }
  else if(keyCode === LEFT_ARROW)
  {
    if(!released && xpos > findXpos(angle))
    {
      xpos -= 5;
    }
  }
  else if(keyCode === RIGHT_ARROW)
  {
    if(!released && xpos < xposright)
    {
      xpos += 5;
    }
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
    yspeed *= -0.65;
    xspeed *= 0.9;
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
    yspeed *= -0.65;
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
    xspeed *= -0.65;
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
    xspeed *= -0.65;
    yspeed *= 0.995;
  }
}

// function bounceRamp()
// {
//   let y = yposright - ypos;
//   let x = xposright - xpos;
//   console.log(atan(y/x));
//   console.log(angle);
//   line(xposright - x, yposright - y, xposright, yposright);
//   line(xpos, yposright - y, xpos, yposright);
//   line(xpos, yposright, xposright, yposright);
//   if(round(atan(y/x), 7) <= round(angle, 7))
//   {
//     // console.log(y/x);
//     // console.log(atan(y/x));
//     // console.log(angle);
//     yspeed *= -.6;
//   }
//
//   if(atan(y/x) == 0)
//   {
//     yspeed *= -.6;
//   }
// }

function yVal()
{
  let x = xposright - xpos;
  let y = x * tan(angle);
  yval = yposright - y;
  return yval;
}

function bounceRamp()
{
  yval = yVal();
  if(xpos >= findXpos(angle) && xpos <= xposright && (ypos >= yval || ypos + yspeed > yval))
  {
    ypos = yval - 1;
    totSpeed = .65 * yspeed;
    yspeed = -1 * totSpeed * sin(HALF_PI - (2 * angle));
    console.log(yspeed);
    xspeed = totSpeed * cos(HALF_PI - (2 * angle));
    console.log(xspeed);
  }
}

//  use the law of reflection for ball bounce
