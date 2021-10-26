function setup()
{
  let canvas = createCanvas(windowWidth*0.9, windowHeight*0.9);
  canvas.position((windowWidth - width)/2, (windowHeight - height)/2);
  strokeWeight(20);
  stroke(150);
}

function draw()
{
  let back = color(0, 165, 255);
  background(back);

  line(width/9, height - 40, width/3, height - 40);
}
