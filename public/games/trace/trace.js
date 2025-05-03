let eraser;
let path = [];
let pathLength = 50;
let minStepSize = 100; // Minimum step size 
let maxStepSize = 200; // Maximum step size 
let isWin = false;

function setup() {
  createCanvas(600, 600);
  eraser = new Eraser();

  // Start from a random position
  let currentPosition = createVector(100, height - 50);
  path.push(currentPosition);
  
  // Generate a simplified path
  generatePath(currentPosition);
}

function draw() {
  background("#FFFFFF22");
 

  // Draw the traveled path
  noFill();


  // Draw the untraveled path
  stroke('rgb(88,88,88)'); // Default color
  strokeWeight(20); // Default thickness
  beginShape();
  for (let i = eraser.index; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  // Move the eraser
  eraser.update();
  eraser.display();

  // Check if the eraser has reached the top of the screen (last point in path)
  if (eraser.x >= 600) {
    resetGame();
  }
}

function generatePath(currentPosition) {
  path = [];
  path.push(currentPosition);

  // Calculate the maximum x-coordinate (7/8 of canvas width)
  let maxX = width * 2

  let movingRight = true; // Start by moving right

  // Generate path while the eraser is not at the top
  while (currentPosition.y > 0 || currentPosition.x < maxX) {
    // Choose a random step size within the defined range
    let stepSize = random(minStepSize, maxStepSize);

    if (movingRight) {
      // Move right if not at the max X
      let newX = min(currentPosition.x + stepSize, maxX);
      currentPosition = createVector(newX, currentPosition.y);
    } else {
      // Move up if not at the top
      let newY = max(currentPosition.y - stepSize, 0);
      currentPosition = createVector(currentPosition.x, newY);
    }
    path.push(currentPosition);
    movingRight = !movingRight; // Alternate direction
  }

  // Ensure the path ends at the top (y = 0)
  path[path.length - 1] = createVector(path[path.length - 1].x, 0);
}

function resetGame() {
  isWin = false;  // Reset win state
  eraser.x = 100;
  eraser.y = height - 50;
  eraser.index = 0;
  
  // Generate a new path
  let currentPosition = createVector(100, height - 50);
  generatePath(currentPosition);
}

class Eraser {
  constructor() {
    this.x = 100;
    this.y = height - 50;
    this.radius = 30;
    this.speed = 3;
    this.index = 0;
  }

  update() {
    // Move the eraser based on key presses
    let nextPoint = path[this.index + 1];
    
    if (nextPoint) {
      // Move horizontally or vertically towards the next point
      if (keyIsDown(49) && nextPoint.x > this.x) {
        this.moveToNextPoint(nextPoint, 'x');
      }
      if (keyIsDown(50) && nextPoint.y < this.y) {
        this.moveToNextPoint(nextPoint, 'y');
      }
    }
  }

  moveToNextPoint(nextPoint, axis) {
    let target = nextPoint[axis];
    let current = this[axis];
    let speed = this.speed;

    // Move the eraser towards the next point along the specified axis
    if (abs(target - current) > speed) {
      this[axis] += (target > current) ? speed : -speed;
    } else {
      this[axis] = target;  // Snap to the target when close enough
      this.index++;  // Move to the next point
    }
  }

  display() {
    fill("rgb(215,51,51)");
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }
}
