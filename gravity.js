let ogBallWidth = 30;
let ogBallHeight = 30;

let ballWidth = ogBallWidth;
let ballHeight = ogBallHeight;

let xpos;
let ypos;

let xspeed = 0;
let yspeed = 0.1;

let gravity = 0.4;

let hasHitBottom = false;
let hasHitTop = false;
let hasHitLeft = false;
let hasHitRight = false;

let rectWidth = 15;
let rectHeight = 15;

let rectX;
let rectY;

let captured = true;

function setup()
{
  let canvas = createCanvas(windowWidth*0.9, windowHeight*0.9);
  canvas.position(windowWidth/2 - width/2, (windowHeight - height)/2);
  noStroke();

  xpos = width/2;
  ypos = height - ballHeight/2;
}

function draw()
{
  springBack();

  let ballColor = color(255, 145, 0);
  let rectColor = color(0, 255, 0);
  let back = color(0, 165, 255);
  background(back);

  yspeed += gravity;
  ypos += yspeed;
  xpos += xspeed;

  eatBall();

  if(captured)
  {
    rectX = random(0, width - rectWidth);
    rectY = random(0, height - rectHeight);
    captured = false;
  }

  bounceBottom();
  bounceTop();
  bounceLeft();
  bounceRight();

  fill(rectColor);
  rect(rectX, rectY, rectWidth)

  fill(ballColor);
  ellipse(xpos, ypos, ballWidth, ballHeight);
}

function keyPressed()
{
  if(keyCode === UP_ARROW)
  {
    yspeed = -8;
  }

  if(keyCode === LEFT_ARROW)
  {
    xspeed -= 2;
  }

  if(keyCode === RIGHT_ARROW)
  {
    xspeed += 2;
  }

  if(keyCode === RETURN)
  {
    xspeed = random(-10, 10);
    yspeed = random(-5, -20);
  }
}

function springBack()
{
  if(ypos < height - ballHeight/2 || ypos > ballHeight/2 || xpos < width - ballWidth/2 || xpos > ballWidth/2)
  {
    hasHitBottom = false;
    hasHitTop = false;
    hasHitLeft = false;
    hasHitRight = false;

    ballHeight = ogBallHeight;
    ballWidth = ogBallWidth;
  }
}

function bounceBottom()
{
  if(ypos + ballHeight/2 > height)
  {
    if(!hasHitBottom)
    {
      ballHeight *= 1 - (yspeed * .02);
      ballWidth *= 1 + (yspeed * .02);
    }
    hasHitBottom = true;
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
    if(!hasHitTop)
    {
      ballHeight *= 1 - (-yspeed * .02);
      ballWidth *= 1 + (-yspeed * .02);
    }
    hasHitTop = true;
    ypos = ballHeight/2;
    yspeed *= -0.6;
    xspeed *= 0.995;
  }
}

function bounceLeft()
{
  if(xpos < ballWidth/2)
  {
    if(!hasHitLeft)
    {
      ballHeight *= 1 + (-xspeed * .02);
      ballWidth *= 1 - (-xspeed * .02);
    }
    hasHitLeft = true;
    xpos = ballHeight/2;
    xspeed *= -0.6;
    yspeed *= 0.995;
  }
}

function bounceRight()
{
  if(xpos + ballWidth/2 > width)
  {
    if(!hasHitRight)
    {
      ballHeight *= 1 + (yspeed * .02);
      ballWidth *= 1 - (yspeed * .02);
    }
    hasHitRight = true;
    xpos = width - ballHeight/2;
    xspeed *= -0.6;
    yspeed *= 0.995;
  }
}

function eatBall()
{
  if(xpos + ballWidth/2 > rectX + rectWidth && xpos - ballWidth/2 < rectX && ypos + ballHeight/2 > rectY + rectHeight && ypos - ballHeight/2 < rectY)
  {
    captured = true;
    ogBallWidth *= 1.2;
    ogBallHeight *= 1.2;
  }
}
