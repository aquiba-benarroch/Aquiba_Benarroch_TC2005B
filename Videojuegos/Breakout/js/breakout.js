/*
Implementation of the game of Pong

Aquiba Yudah Benarroch Bittan
A01783710
25/02/25
*/

"Use strict"

// Global variables
const canvasWidth = 900;
const canvasHeight = 700;

let oldTime;
const paddleVelocity = 0.5;
let initialSpeed = 0.5;
let lives = 3;


// Context of the Canvas
let ctx;

//Class for the breakout
class Ball extends GameObject {
    constructor(position, width, height, color, velocity) {
        super(position, width, height, color, "ball");
        this.initVelocity();
        this.inPlay = false;
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    initVelocity() {
        this.position = new Vec(canvasWidth / 2, canvasHeight / 2);
        let angle = Math.random() * (Math.PI / 2) + (Math.PI / 4);
        this.velocity = new Vec(Math.cos(angle), Math.sin(angle)).times(initialSpeed);
    }

    reset() {
        this.inPlay = false;
        this.position = new Vec(canvasWidth / 2, canvasHeight / 2);
        this.velocity = new Vec(0, 0);
    }
}

class Paddle extends GameObject {
    constructor(position, width, height, color, velocity) {
        super(position, width, height, color, "paddle");
        this.velocity = new Vec(0, 0);
    }
    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));

        //Collision between the paddles and the bars
        if (this.position.x <= 20) {
            this.position.x = 20;
        }
        else if (this.position.x >= canvasWidth - 20 - this.width) {
            this.position.x = canvasWidth - 20 - this.width;
        }
    }
}

//Class for blocks
class Block extends GameObject {
    constructor(position, width, height, color, type) {
        super(position, width, height, color, "block");
    }
}

class Game {
    constructor(state) {
        this.state

        this.initObjects();

        this.setEventListeners();

        this.liveScore = new TextLabel(canvasWidth + 40, canvasHeight / 2, "20px Ubuntu Mono", "white");
    }

    update(deltaTime) {
        for(let actor of this.actors) {
            actor.update(deltaTime);
        }
    }
}


//Objects to represent elements of the game
//Ball
const box = new Ball(new Vec(canvasWidth / 2, canvasHeight / 2), 20, 20, "white", new Vec(0, 0));
//Paddle
const paddle = new Paddle(new Vec(canvasWidth / 2, canvasHeight - 80), 150, 20, "white");
//Bars
const topBar = new GameObject(new Vec(0, 0), canvasWidth, 20, "grey", "obstacle");
const bottomBar = new GameObject(new Vec(0, canvasHeight - 20), canvasWidth, 20, "grey", "obstacle");
//Bars
const leftBar = new GameObject(new Vec(0, 0), 20, canvasHeight, "grey", "obstacle");
const rightBar = new GameObject(new Vec(canvasWidth - 20, 0), 20, canvasHeight -20, "grey", "obstacle");
//Lives
let liveScore = new TextLabel(20, 15, "20px Ubuntu Mono", "white");


function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    createEventListeners();

    drawScene(0);
}

function createEventListeners() {
    // Add an event listener to the key press event
    window.addEventListener('keydown', (event) => {
        if (event.key == 'd' || event.code == 'ArrowRight') {
            paddle.velocity = new Vec(paddleVelocity, 0);
        }
        else if (event.key == 'a' || event.code == 'ArrowLeft') {
            paddle.velocity = new Vec(-paddleVelocity, 0);
        }
        else if(event.key == ' ') {
            box.initVelocity();
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.key == 'd' || event.key == 'a') {
           paddle.velocity = new Vec(0, 0);
        }
        else if (event.code == 'ArrowRight' || event.code == 'ArrowLeft') {
            paddle.velocity = new Vec(0, 0);
        }
    });
}

function drawScene(newTime) {
    if (oldTime == undefined) {
        oldTime = newTime;
    }

    let deltaTime = newTime - oldTime;

    //Ckean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);


    //Draw a square
    box.draw(ctx);
    paddle.draw(ctx);
    
    leftBar.draw(ctx);
    rightBar.draw(ctx);

    topBar.draw(ctx);
    bottomBar.draw(ctx);

    //Draw liveScore
    liveScore.draw(ctx, `Lives: ${lives}`);

    //Si se acaban las vidas
    if (lives == 0) {
        //Dibujar todo de nuevo
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        leftBar.draw(ctx);
        rightBar.draw(ctx);
        topBar.draw(ctx);
        bottomBar.draw(ctx);

        ctx.font = "100px Fantasy";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", canvasWidth / 2 - 225, canvasHeight / 2);
    }

    //Update the properties of the object
    box.update(deltaTime);
    paddle.update(deltaTime);

    //Make the ball bounce on paddle
    if (boxOverlap(box, paddle)) {
        box.velocity.y *= -1;
    }
    //Make the ball bounce in borders
    if (boxOverlap(box, topBar)) {
        box.velocity.y *= -1;
    }
    else if (boxOverlap(box, bottomBar)) {
        lives--;
        box.reset();
    }
    //Make the ball bounce in bars
    if (boxOverlap(box, leftBar) || boxOverlap(box, rightBar)) {
        box.velocity.x *= -1;
    }

    oldTime = newTime;

    requestAnimationFrame(drawScene);
}