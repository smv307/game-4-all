let rabbit1, rabbit2;
let finishLine;
let grass;
let redRabbit;
let purpleRabbit;
let finishLineImage

function preload(){
  grass = loadImage("games/rabbit-race/grass-field.webp");
  redRabbit = loadImage("games/rabbit-race/rabbit-red.png");
  purpleRabbit = loadImage("games/rabbit-race/rabbit-purple.png");
  finishLineImage = loadImage("games/rabbit-race/finish-line.webp")
}

function setup() {
  createCanvas(600, 600);
  rabbit1 = new Rabbit(100, 200, purpleRabbit); // Purple rabbit
  rabbit2 = new Rabbit(100, 400, redRabbit);    // Red rabbit
  finishLine = width - 50;
}

function draw() {
  background(grass);

  // Draw the finish line
  stroke("#000000");
  strokeWeight(10);
  image(finishLineImage, finishLine - 10, 0, 20, height);

  // Update and display the rabbits
  strokeWeight(0);
  rabbit1.update();
  rabbit2.update();
  
  rabbit1.display();
  rabbit2.display();

  // Check for winner
  if (rabbit1.x >= finishLine) {
    textSize(50);
    fill(138, 66, 189);
    text("Purple Rabbit Wins!", 100, height / 2);
    setTimeout(restartGame, 2000); // Restart game after 2 seconds
    noLoop(); // Stop the game
  } else if (rabbit2.x >= finishLine) {
    textSize(50);
    fill(219, 127, 46);
    text("Red Rabbit Wins!", 100, height / 2);
    setTimeout(restartGame, 2000); // Restart game after 2 seconds
    noLoop(); // Stop the game
  }
}

// Rabbit class for the racing rabbits
class Rabbit {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.speed = 0;
  }

  update() {
    this.x += this.speed;
  }

  display() {
    image(this.img, this.x, this.y, 90, 90); // Display the rabbit image
  }
}

// Key press events to control the rabbits
function keyPressed() {
  if (key === '1') {
    rabbit1.speed = 5; // Move purple rabbit
  } else if (key === '2') {
    rabbit2.speed = 5; // Move red rabbit
  }
}

function keyReleased() {
  if (key === '1') {
    rabbit1.speed = 0; // Stop purple rabbit
  } else if (key === '2') {
    rabbit2.speed = 0; // Stop red rabbit
  }
}

// Function to restart the game
function restartGame() {
  rabbit1.x = 100;
  rabbit2.x = 100;
  rabbit1.speed = 0;
  rabbit2.speed = 0;
  loop(); // Restart the game loop
}
