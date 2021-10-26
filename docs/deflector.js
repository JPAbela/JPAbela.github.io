function setup()
{
  let canvas = createCanvas(windowWidth*0.9, windowHeight*0.9);
  canvas.position((windowWidth - width)/2, (windowHeight - height)/2);
  strokeWeight(5);
  stroke(150);
}

function draw()
{
  let back = color(0, 165, 255);
  background(back);

  line(width/10, height - 10, width/4, height - 10);
}
