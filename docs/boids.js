// Size of canvas. These get updated to fill the whole browser.
let width = 150;
let height = 150;

const quantity = 200;
const fov = 100;
const hawkFov = 600;
const minimumDistance = 20;
const matchFactor = 0.05; // Adjust by this % of average velocity
const centerFactor = 0.005; // adjust velocity by this %
const minHawkDistance = 150;

let visualRange = fov;
let hawkVisualRange = hawkFov;
let minDistance = minimumDistance;
let numBoids = quantity;
let matchingFactor = matchFactor;
let centeringFactor = centerFactor;

let hawk = {};
let hawkReleased = false;
var boids = [];

function initBoids(numBoids = quantity) {
  for (var i = 0; i < numBoids; i += 1) {
    boids[boids.length] = {
      x: Math.random() * width,
      y: Math.random() * height,
      dx: Math.random() * 10 - 5,
      dy: Math.random() * 10 - 5,
      history: [],
    };
  }
}

function initHawk() {
  hawk = {
    x: Math.random() * width,
    y: Math.random() * height,
    dx: Math.random() * 10 - 5,
    dy: Math.random() * 10 - 5,
    history: [],
  };
}

function distance(boid1, boid2) {
  return Math.sqrt(
    (boid1.x - boid2.x) * (boid1.x - boid2.x) +
      (boid1.y - boid2.y) * (boid1.y - boid2.y),
  );
}

// TODO: This is naive and inefficient.
function nClosestBoids(boid, n) {
  // Make a copy
  const sorted = boids.slice();
  // Sort the copy by distance from `boid`
  sorted.sort((a, b) => distance(boid, a) - distance(boid, b));
  // Return the `n` closest
  return sorted.slice(1, n + 1);
}

// Called initially and whenever the window resizes to update the canvas
// size and width/height variables.
function sizeCanvas() {
  const canvas = document.getElementById("boids");
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

// Constrain a boid to within the window. If it gets too close to an edge,
// nudge it back in and reverse its direction.
function keepWithinBounds(boid) {
  const margin = 200;
  const turnFactor = 1;

  if (boid.x < margin) {
    boid.dx += turnFactor;
  }
  if (boid.x > width - margin) {
    boid.dx -= turnFactor
  }
  if (boid.y < margin) {
    boid.dy += turnFactor;
  }
  if (boid.y > height - margin) {
    boid.dy -= turnFactor;
  }
}

// Find the center of mass of the other boids and adjust velocity slightly to
// point towards the center of mass.
function flyTowardsCenter(boid) {

  let centerX = 0;
  let centerY = 0;
  let numNeighbors = 0;

  for (let otherBoid of boids) {
    if (distance(boid, otherBoid) < visualRange) {
      centerX += otherBoid.x;
      centerY += otherBoid.y;
      numNeighbors += 1;
    }
  }

  if (numNeighbors) {
    centerX = centerX / numNeighbors;
    centerY = centerY / numNeighbors;

    boid.dx += (centerX - boid.x) * centeringFactor;
    boid.dy += (centerY - boid.y) * centeringFactor;
  }
}

function hawkFlyTowardsCenter(boid) {

  let centerX = 0;
  let centerY = 0;
  let numNeighbors = 0;

  for (let otherBoid of boids) {
    if (distance(boid, otherBoid) < hawkVisualRange) {
      centerX += otherBoid.x;
      centerY += otherBoid.y;
      numNeighbors += 1;
    }
  }

  if (numNeighbors) {
    centerX = centerX / numNeighbors;
    centerY = centerY / numNeighbors;

    boid.dx += (centerX - boid.x) * (centeringFactor * 3);
    boid.dy += (centerY - boid.y) * (centeringFactor * 3);
  }
}

// Move away from other boids that are too close to avoid colliding
function avoidOthers(boid) {
  const avoidFactor = 0.05; // Adjust velocity by this %
  let moveX = 0;
  let moveY = 0;
  for (let otherBoid of boids) {
    if (otherBoid !== boid) {
      if (distance(boid, otherBoid) < minDistance) {
        moveX += boid.x - otherBoid.x;
        moveY += boid.y - otherBoid.y;
      }
    }
  }

  boid.dx += moveX * avoidFactor;
  boid.dy += moveY * avoidFactor;
}

function avoidHawk(boid) {
  const avoidFactor = 0.05; // Adjust velocity by this %
  let moveX = 0;
  let moveY = 0;
  if (distance(boid, hawk) < minHawkDistance) {
    moveX += boid.x - hawk.x;
    moveY += boid.y - hawk.y;
  }

  boid.dx += moveX * avoidFactor;
  boid.dy += moveY * avoidFactor;
}

// Find the average velocity (speed and direction) of the other boids and
// adjust velocity slightly to match.
function matchVelocity(boid) {
  let avgDX = 0;
  let avgDY = 0;
  let numNeighbors = 0;

  for (let otherBoid of boids) {
    if (distance(boid, otherBoid) < visualRange) {
      avgDX += otherBoid.dx;
      avgDY += otherBoid.dy;
      numNeighbors += 1;
    }
  }

  if (numNeighbors) {
    avgDX = avgDX / numNeighbors;
    avgDY = avgDY / numNeighbors;

    boid.dx += (avgDX - boid.dx) * matchingFactor;
    boid.dy += (avgDY - boid.dy) * matchingFactor;
  }
}

function hawkMatchVelocity(boid) {
  let avgDX = 0;
  let avgDY = 0;
  let numNeighbors = 0;

  for (let otherBoid of boids) {
    if (distance(boid, otherBoid) < hawkVisualRange) {
      avgDX += otherBoid.dx;
      avgDY += otherBoid.dy;
      numNeighbors += 1;
    }
  }

  if (numNeighbors) {
    avgDX = avgDX / numNeighbors;
    avgDY = avgDY / numNeighbors;

    boid.dx += (avgDX - boid.dx) * matchingFactor;
    boid.dy += (avgDY - boid.dy) * matchingFactor;
  }
}

// Speed will naturally vary in flocking behavior, but real animals can't go
// arbitrarily fast.
function limitSpeed(boid) {
  const speedLimit = 15;

  const speed = Math.sqrt(boid.dx * boid.dx + boid.dy * boid.dy);
  if (speed > speedLimit) {
    boid.dx = (boid.dx / speed) * speedLimit;
    boid.dy = (boid.dy / speed) * speedLimit;
  }
}

const DRAW_TRAIL = false;

function drawBoid(ctx, boid) {
  const angle = Math.atan2(boid.dy, boid.dx);
  ctx.translate(boid.x, boid.y);
  ctx.rotate(angle);
  ctx.translate(-boid.x, -boid.y);
  ctx.fillStyle = "#558cf4";
  ctx.beginPath();
  ctx.moveTo(boid.x, boid.y);
  ctx.lineTo(boid.x - 15, boid.y + 5);
  ctx.lineTo(boid.x - 15, boid.y - 5);
  ctx.lineTo(boid.x, boid.y);
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  if (DRAW_TRAIL) {
    ctx.strokeStyle = "#558cf466";
    ctx.beginPath();
    ctx.moveTo(boid.history[0][0], boid.history[0][1]);
    for (const point of boid.history) {
      ctx.lineTo(point[0], point[1]);
    }
    ctx.stroke();
  }
}

function drawHawk(ctx, hawk) {
  const angle = Math.atan2(hawk.dy, hawk.dx);
  ctx.translate(hawk.x, hawk.y);
  ctx.rotate(angle);
  ctx.translate(-hawk.x, -hawk.y);
  ctx.fillStyle = "#F3223E";
  ctx.beginPath();
  ctx.moveTo(hawk.x, hawk.y);
  ctx.lineTo(hawk.x - 100, hawk.y + 25);
  ctx.lineTo(hawk.x - 100, hawk.y - 25);
  ctx.lineTo(hawk.x, hawk.y);
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  if (DRAW_TRAIL) {
    ctx.strokeStyle = "#558cf466";
    ctx.beginPath();
    ctx.moveTo(hawk.history[0][0], hawk.history[0][1]);
    for (const point of hawk.history) {
      ctx.lineTo(point[0], point[1]);
    }
    ctx.stroke();
  }
}

// Main animation loop
function animationLoop() {
  // Update each boid
  for (let boid of boids) {
    // Update the velocities according to each rule
    flyTowardsCenter(boid);
    avoidOthers(boid);
    avoidHawk(boid);
    matchVelocity(boid);
    limitSpeed(boid);
    keepWithinBounds(boid);

    // Update the position based on the current velocity
    boid.x += boid.dx;
    boid.y += boid.dy;
    boid.history.push([boid.x, boid.y])
    boid.history = boid.history.slice(-50);
  }

  if(hawkReleased) {
    // Update the velocities according to each rule
    hawkFlyTowardsCenter(hawk);
    avoidOthers(hawk);
    hawkMatchVelocity(hawk);
    limitSpeed(hawk);
    keepWithinBounds(hawk);

    // Update the position based on the current velocity
    hawk.x += hawk.dx;
    hawk.y += hawk.dy;
    hawk.history.push([hawk.x, hawk.y]);
    hawk.history = hawk.history.slice(-50);
  }

  // Clear the canvas and redraw all the boids in their current positions
  const ctx = document.getElementById("boids").getContext("2d");
  ctx.clearRect(0, 0, width, height);
  for (let boid of boids) {
    drawBoid(ctx, boid);
  }
  if(hawkReleased) {
    drawHawk(ctx, hawk);
  }

  // Schedule the next frame
  window.requestAnimationFrame(animationLoop);
}

window.onload = () => {
  // Make sure the canvas always fills the whole window
  window.addEventListener("resize", sizeCanvas, false);
  sizeCanvas();

  // Randomly draw Boids
  initBoids();

  // Schedule the main animation loop
  window.requestAnimationFrame(animationLoop);

  function restart() {
    boids = [];
    hawk = {};
    hawkReleased = false;
    visualRange = fov;
    hawkVisualRange = hawkFov;
    minDistance = minimumDistance;
    numBoids = quantity;
    matchingFactor = matchFactor;
    centeringFactor = centerFactor;
    document.getElementById("fov").innerText = "Field of Vision: " + visualRange/10;
    document.getElementById("avoid").innerText = "Avoidance: " + minDistance/2;
    document.getElementById("num").innerText = "Number of Boids: " + numBoids/20;
    document.getElementById("match").innerText = "Match Speed: " + Math.round(matchingFactor * 200);
    document.getElementById("center").innerText = "Fly to Center: " + Math.round(centeringFactor * 2000);
    document.getElementById("hawk").innerText = "Release the Hawk";
    initBoids();
  };

  function fovUp() {
    if(visualRange <= 190) {
      visualRange += 10;
      hawkVisualRange += 60
      document.getElementById("fov").innerText = "Field of Vision: " + visualRange/10;
    }
  };

  function fovDown() {
    if(visualRange >= 10) {
      visualRange -= 10;
      hawkVisualRange -= 60;
      document.getElementById("fov").innerText = "Field of Vision: " + visualRange/10;
    };
  };

  function avoidUp() {
    if(minDistance <= 38) {
      minDistance += 2;
      document.getElementById("avoid").innerText = "Avoidance: " + minDistance/2;
    };
  };

  function avoidDown() {
    if(minDistance >= 2) {
      minDistance -= 2;
      document.getElementById("avoid").innerText = "Avoidance: " + minDistance/2;
    };
  };

  function numUp() {
    if(numBoids <= 380) {
      numBoids += 20;
      document.getElementById("num").innerText = "Number of Boids: " + numBoids/20;
      initBoids(20);
    };
  };

  function numDown() {
    if(numBoids >= 20) {
      numBoids -= 20;
      document.getElementById("num").innerText = "Number of Boids: " + numBoids/20;
      for(var i = 1; i < 20; i++)
      {
        boids.pop();
      }

    };
  };

  function matchUp() {
    if(matchingFactor <= 0.1) {
      matchingFactor += 0.005;
      document.getElementById("match").innerText = "Match Speed: " + Math.round(matchingFactor * 200);
    };
  };

  function matchDown() {
    if(matchingFactor >= 0.005) {
      matchingFactor -= 0.005;
      document.getElementById("match").innerText = "Match Speed: " + Math.round(matchingFactor * 200);
    };
  };

  function centerUp() {
    if(centeringFactor <= 0.1) {
      centeringFactor += 0.0005;
      document.getElementById("center").innerText = "Fly to Center: " + Math.round(centeringFactor * 2000);
    };
  };

  function centerDown() {
    if(centeringFactor >= 0.0005) {
      centeringFactor -= 0.0005;
      document.getElementById("center").innerText = "Fly to Center: " + Math.round(centeringFactor * 2000);
    };
  };

  function releaseHawk() {
    if(hawkReleased) {
      document.getElementById("hawk").innerText = "Release the Hawk";
      hawk = {};
      hawkReleased = false;
    }
    else {
      document.getElementById("hawk").innerText = "Remove the Hawk";
      initHawk();
      hawkReleased = true;
    }
  }

  // Add ability to Restart
  document.getElementById("restart").addEventListener("click", restart);

  document.getElementById("fovUp").addEventListener("click", fovUp);
  document.getElementById("fovDown").addEventListener("click", fovDown);

  document.getElementById("avoidUp").addEventListener("click", avoidUp);
  document.getElementById("avoidDown").addEventListener("click", avoidDown);

  document.getElementById("numUp").addEventListener("click", numUp);
  document.getElementById("numDown").addEventListener("click", numDown);

  document.getElementById("matchUp").addEventListener("click", matchUp);
  document.getElementById("matchDown").addEventListener("click", matchDown);

  document.getElementById("centerUp").addEventListener("click", centerUp);
  document.getElementById("centerDown").addEventListener("click", centerDown);

  document.getElementById("hawk").addEventListener("click", releaseHawk);
};
