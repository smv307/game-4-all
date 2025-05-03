let players = []; // Array to store player positions
let ball; // Object to store the ball's position and target
let maxPlayers = 4; // Max players allowed
let keys = ['1', '2', '3', '4']; // Keys for each player
let catImages = []; // Array to hold cat images
let yarnImage; // Image for the yarn

function preload() {
  // Load images
  catImages.push(loadImage('games/yarn-toss/cat-1.png'));
  catImages.push(loadImage('games/yarn-toss/cat-2.png'));
  catImages.push(loadImage('games/yarn-toss/cat-3.png'));
  catImages.push(loadImage('games/yarn-toss/cat-4.png'));
  yarnImage = loadImage('games/yarn-toss/yarn.png');
}

function setup() {
  createCanvas(600, 600);

  // Initialize two players
  initializePlayers(2);

  // Initialize the ball in the first player's position
  ball = {
    position: players[0].copy(),
    target: -1, // No target initially
    speed: 5
  };
}

function draw() {
  background('rgb(235,227,218)');
  // Draw grid background first
  drawGrid();

  // Draw players
  for (let i = 0; i < players.length; i++) {
    imageMode(CENTER);
    image(catImages[i % catImages.length], players[i].x, players[i].y, 100, 100);
    textAlign(CENTER, CENTER);
    fill(255);
  }

  // Draw the ball
  imageMode(CENTER);
  image(yarnImage, ball.position.x, ball.position.y, 40, 40);

  // Move the ball toward the target player
  if (ball.target !== -1) {
    let targetPos = players[ball.target];
    let direction = p5.Vector.sub(targetPos, ball.position);

    if (direction.mag() > ball.speed) {
      direction.setMag(ball.speed);
      ball.position.add(direction);
    } else {
      ball.position.set(targetPos);
      ball.target = -1; // Reset target after reaching
    }
  }
}

function keyPressed() {
  // Add a new player on space bar if not exceeding maxPlayers
  if (key === ' ' && players.length < maxPlayers) {
    initializePlayers(players.length + 1);
    return;
  }

  // Check if the pressed key matches any player's key
  for (let i = 0; i < players.length; i++) {
    if (key.toUpperCase() === keys[i]) {
      // Check if the ball is near the player
      let playerPos = players[i];
      let distance = dist(ball.position.x, ball.position.y, playerPos.x, playerPos.y);

      if (distance < 30) { // You can adjust this value based on how close the ball should be
        ball.target = (i + 1) % players.length; // Pass to the next player
      }
      break;
    }
  }
}

function initializePlayers(count) {
  players = [];
  for (let i = 0; i < count; i++) {
    let angle = (TWO_PI / count) * i;
    let x = width / 2 + cos(angle) * 200;
    let y = height / 2 + sin(angle) * 200;
    players.push(createVector(x, y));
  }
}

// Function to draw the grid
function drawGrid() {
  stroke('rgb(212,200,189)'); // Light gray for grid lines
  strokeWeight(2);

  // Draw horizontal lines
  for (let y = 0; y < height; y += 40) {
    line(0, y, width, y);
  }

  // Draw vertical lines
  for (let x = 0; x < width; x += 40) {
    line(x, 0, x, height);
  }
}
