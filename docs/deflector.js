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
let targetLength = 50;
let targetStart;

let angle = 0;

let released;

let speedCheck = false;

// let hasBounced = false;

let started = false;

let done = false;

let tries;

let message;

function setup()
{
  let canvas = createCanvas(windowWidth, windowHeight);
  // canvas.position((windowWidth - width)/2, (windowHeight - height)/2);
  canvas.position(0,0);

  xposright = width/3;
  yposright = height - 10;

  lineLength = (2/9) * width;
  targetStart = xposright + 100 + random(width - (150 + xposright));


  xpos = findXpos(angle) + (xposright - findXpos(angle))/2;
  ypos = ogBallHeight/2;

  released = false;

  tries = 0;
}

function draw()
{
  frameRate();

  if(!started)
  {
    xpos = findXpos(angle) + (xposright - findXpos(angle))/2;
    ypos = ogBallHeight/2;
  }

  if(!done)
  {
    springBack();
  }

  let back = color(0, 165, 255);
  background(back);
  let ballColor = color(255, 145, 0);

  strokeWeight(20);
  stroke(150);
  line(findXpos(angle), findYpos(angle), xposright, yposright);
  strokeWeight(10);
  stroke(255);
  line(targetStart, height - 5, targetStart + targetLength, height - 5);

  if(released)
  {
    yspeed += gravity;
  }

  bounceRamp();
  bounceBottom();
  // bounceTop();
  // bounceLeft();
  exitRight();


  ypos += yspeed;
  if(xspeed > -.3 && xspeed < .3)
  {
    xspeed = 0;
  }
  xpos += xspeed;

  if(speedCheck)
  {
    console.log(yspeed);
  }

  noStroke();
  fill(ballColor);
  ellipse(xpos, ypos, ballWidth, ballHeight);

  if(done)
  {
    fill(color(0));
    textSize(30);
    if(tries == 1)
    {
      message = "Wow! you got it in 1 try!";
    }
    else
    {
      message = "Good job! you got it in " + tries + " tries.";
    }
    text(message, 700, 500);
  }
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
  started = true;
  if(keyCode === UP_ARROW && angle < HALF_PI - QUARTER_PI/2)
  {
    angle += .05 * QUARTER_PI;
    if(findXpos(angle) > xpos)
    {
      xpos = findXpos(angle);
    }
  }
  else if(keyCode === DOWN_ARROW && angle > 0)
  {
    angle -= .05 * QUARTER_PI;
  }
  else if(keyCode === ENTER)
  {
    released = true;
  }
  else if(keyCode === LEFT_ARROW)
  {
    if(!released && xpos > findXpos(angle) + 10)
    {
      xpos -= 10;
    }
  }
  else if(keyCode === RIGHT_ARROW)
  {
    if(!released && xpos < xposright - 10)
    {
      xpos += 10;
    }
  }
  else if(keyCode === OPTION)
  {
    if(speedCheck)
    {
      speedCheck = false;
    }
    else
    {
      speedCheck = true;
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
    if(xpos > targetStart && xpos < targetStart + targetLength)
    {
      ballHeight = 0;
      ballWidth = 0;
      xspeed = 0;
      yspeed = 0;
      totSpeed = 0;
      if(!done)
      {
        tries ++;
      }
      done = true;
    }
    ballHeight *= 1 - (yspeed * .001);
    ballWidth *= 1 + (yspeed * .001);
    // hasHitBottom = true;
    ypos = height - ballHeight/2;
    yspeed *= -0.65;
    xspeed *= 0.9;
  }
  if(ypos + ballHeight/2 === height)
  {
    if(xpos > targetStart && xpos < targetStart + targetLength)
    {
      ballHeight = 0;
      ballWidth = 0;
      xspeed = 0;
      yspeed = 0;
      totSpeed = 0;
      if(!done)
      {
        tries ++;
      }
      done = true;
    }
    xspeed *= 0.98;
  }
  if((ypos > height - (ballHeight * .6)) && (yspeed > -1.5 && yspeed < 2.31))
  {
    ypos = height - ballHeight/2;
    yspeed = 0;
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

function exitRight()
{
  if(xpos + ballWidth/2 > width)
  {
    xspeed = 0;
    yspeed = 0;
    totSpeed = 0;
    released = false;
    started = false;
    tries ++;
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
  if(xpos >= findXpos(angle) && xpos <= xposright)
  {
    if(ypos >= yval - (ballHeight/2 + 10) || ypos + yspeed > yval - (ballHeight/2 - 10))
    {
      ypos = yval - (ballHeight/2  + 10);
      // if(hasBounced){
      //   totSpeed = .65 * yspeed;
      // }
      // else{
        totSpeed = .8 * yspeed;
      //   hasBounced = true;
      // }
      yspeed = -1 * totSpeed * sin(HALF_PI - (2 * angle));
      xspeed = totSpeed * cos(HALF_PI - (2 * angle));
    }
    if((ypos > yval - (ballHeight * .6 + 10)) && (yspeed > -3.8 && yspeed < 4.07))
    {
      ypos = yval - (ballHeight/2 + 10);
      yspeed = 0;
    }
  }
}

function restart()
{
  location.reload();
}

document.getElementById("restart").addEventListener("click", restart);

//  use the law of reflection for ball bounce
