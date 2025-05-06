let orangeX, orangeY;
let capyX, capyY;
const speed = 5;
const targetRadius = 60; 
const capyRadius = 50;
let orange, capy, water;

function preload() {
  orange = loadImage("games/capybara-orange/orange.png");
  capy = loadImage("games/capybara-orange/capy.png");
  water = loadImage("games/capybara-orange/water.png");
}

function setup() {
  createCanvas(600, 600);
  resetPositions();
}

function draw() {
  background(water);

  // Draw the target orange
  drawTarget(orangeX, orangeY);

  // Draw the moving capybara
  image(capy, capyX - 60, capyY - 85, 100, 150);

  // Move the capybara towards the target when spacebar is pressed
  if (keyIsDown(49)) {
    moveCapybara();
  }

  // Check if the capybara has reached the target
  if (dist(capyX, capyY, orangeX, orangeY) < targetRadius + capyRadius) {
    background(water);
    resetPositions();
  }
}

function drawTarget(x, y) {
  image(orange, x - 50, y - 50, 70, 70);
}

function moveCapybara() {
  if (capyX < orangeX) capyX += speed;
  if (capyX > orangeX) capyX -= speed;
  if (capyY < orangeY) capyY += speed;
  if (capyY > orangeY) capyY -= speed;
}

function resetPositions() {
  orangeX = random(70, 520);
  orangeY = random(70, 520);

  // Randomly decide the capybara's position relative to the target
  const direction = floor(random(4)); // 0 = top, 1 = bottom, 2 = left, 3 = right

  switch (direction) {
    case 0: // Above the target
      capyX = orangeX;
      capyY = 60;
      break;
    case 1: // Below the target
      capyX = orangeX;
      capyY = height - 60;
      break;
    case 2: // Left of the target
      capyX = 60;
      capyY = orangeY;
      break;
    case 3: // Right of the target
      capyX = width - 60;
      capyY = orangeY;
      break;
  }
}
