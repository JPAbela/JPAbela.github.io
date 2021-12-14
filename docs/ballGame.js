
let ogBallWidth = 30;
let ogBallHeight = 30;

let ballWidth = ogBallWidth;
let ballHeight = ogBallHeight;

let xpos;
let ypos;

let xspeed = 0;
let yspeed = 0.1;

let gravity = 0.4;

let rectWidth = 15;
let rectHeight = 15;

let rectX;
let rectY;

let captured = true;

let hasStarted = false;
let hasEnded = false;

let timer = 0;
let finTime = 0;

function setup()
{
  let canvas = createCanvas(windowWidth*0.9, windowHeight*0.9);
  canvas.position((windowWidth - width)/2, (windowHeight - height)/2);
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

  if(!hasStarted)
  {
    fill(color(0));
    textSize(50);
    text('Use the arrows to move the ball and eat the square. Try to get the lowest time possible.', width/2 - width/4, height/6, width/2, height/3)
  }

  if(hasStarted && !hasEnded)
  {
    fill(color(0));
    text('Time: ', 5, 5, 100, 50);
    text(timer, 130, 5, 100, 50);
    timer += 0.015;
    timer *= 100;
    timer = round(timer);
    timer /= 100;
  }

  if(hasEnded)
  {
    let textColor = color(0);
    fill(textColor);
    textSize(50);
    text('Good Job! Your time: ' + finTime, width/4, height/6, width/2, height/4);
    text('Press Enter to play again.', width/4, height/2, width/2, height/4);
  }

  if((ogBallWidth > width/2.5 && !hasEnded) || (ogBallHeight > height*.8 && !hasEnded))
  {
    hasEnded = true;
    ballWidth = 0;
    ogBallWidth = 0;
    ballHeight = 0;
    ogBallHeight = 0;
    rectWidth = 0;
    finTime = timer;
  }

  yspeed += gravity;
  ypos += yspeed;
  xpos += xspeed;

  eatRect();

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

function springBack()
{
  if(ypos <= height - ballHeight/2 || ypos >= ballHeight/2 || xpos <= width - ballWidth/2 || xpos >= ballWidth/2)
  {
    // hasHitBottom = false;
    // hasHitTop = false;
    // hasHitLeft = false;
    // hasHitRight = false;

    ballHeight = ogBallHeight;
    ballWidth = ogBallWidth;
  }
}

function keyPressed()
{
  if(keyCode === UP_ARROW || key === 'w')
  {
    yspeed = -8;
    hasStarted = true;
  }

  if(keyCode === LEFT_ARROW || key === 'a')
  {
    xspeed -= 2;
    hasStarted = true;
  }

  if(keyCode === RIGHT_ARROW || key === 'd')
  {
    xspeed += 2;
    hasStarted = true;
  }

  if(keyCode === ENTER && hasEnded)
  {
    hasEnded = false;
    hasStarted = false;

    ogBallWidth = 30;
    ogBallHeight = 30;
    rectWidth = 15;

    xpos = width/2;
    ypos = height - ballHeight/2;

    xspeed = 0;
    yspeed = 0;

    timer = 0;

    captured = true;
  }

  // if(keyCode === RETURN)
  // {
  //   xspeed = random(-10, 10);
  //   yspeed = random(-5, -20);
  // }
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

function eatRect()
{
  if(xpos + ballWidth/2 > rectX + rectWidth && xpos - ballWidth/2 < rectX && ypos + ballHeight/2 > rectY + rectHeight && ypos - ballHeight/2 < rectY)
  {
    captured = true;
    ogBallWidth *= 1.2;
    ogBallHeight *= 1.2;
  }
}
