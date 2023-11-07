let flappy;
let pipes = [];
let backgroundImage;
let bluebird;
let pipeGreen;
let pipeGreenDown;

function preload() {
  backgroundImage = loadImage("./Images/background-night.png");
  bluebird = loadImage("./Images/bluebird-midflap.png");
  pipeGreen = loadImage("./Images/pipe-green.png");
  pipeGreenDown = loadImage("./Images/pipe-greenDown.png");
}

function setup() {
  createCanvas(288, 512);
  flappy = new Flappy(bluebird, 120, 150);
}

function draw() {
  background(backgroundImage);
  flappy.draw();
  flappy.gravity();

  
  if (frameCount % 100 === 0) {
    pipes.push(new Pipe());
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].draw();
    pipes[i].update();

    if (pipes[i].hits(flappy)) {
      
      console.log("Game Over");
      noLoop(); 
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    flappy.moveUp();
  }
}

class Flappy {
  constructor(image, x, y) {
    this.flappyImage = image;
    this.x = x;
    this.y = y;
    this.width = image.width;
    this.height = image.height;
    this.velocity = 0;
    this.gravityValue = 0.3;
  }
  draw() {
    image(this.flappyImage, this.x, this.y);
  }

  moveUp() {
    this.velocity = -5; 
    this.y += this.velocity;
  }

  gravity() {
    this.velocity += this.gravityValue;
    this.y += this.velocity;
  }
}

class Pipe {
  constructor() {
    this.spacing = 125; 
    this.top = random(height / 2);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 52; 
    this.speed = 2;
  }

  draw() {
    
    image(pipeGreenDown, this.x, 0, this.w, this.top);

    
    image(pipeGreen, this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -this.w;
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }
}
