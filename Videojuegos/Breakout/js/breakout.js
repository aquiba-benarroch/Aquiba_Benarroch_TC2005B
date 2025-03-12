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
const paddleVelocity = 0.8;
let initialSpeed = 0.5;
let lives = 3;
let score = 0;


// Context of the Canvas
let ctx;

//Class for the breakout
class Ball extends GameObject {
    constructor(position, width, height, color, velocity) {
        super(position, width, height, color, "ball");
        this.inPlay = false;
        this.velocity = new Vec(0,0);
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

    assignPowerUp(type) {
        this.powerUp = type;
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

class PowerUp extends GameObject {
    constructor(position, width, height, color, type) {
        super(position, width, height, color, "powerUp");
        this.type = type;
        this.velocity = new Vec(0, 0.2); //Velocity
   }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
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
//Blocks
const blockHeight = 20; //We define the size of the blocks
const colors = ["#f54141", "#f5b041", "#f2f541", "#5af541", "#41f59e", "#41f5f5", "#4196f5"]; //We define the colors of the blocks

//PowerUps
const powerUps = []; //We create an array to store the powerUps

//We define the number of rows and blocks per row
const numRows = 7;
const numBlocksPerRow = 10; 

const availableWidth = canvasWidth - leftBar.width - rightBar.width; //We calculate the available width
const padding = 5; //We add a padding between the blocks

//To calculate the width of the blocks
const totalPadding = (numBlocksPerRow -1) * padding; //Total padding. We substract the padding of the last block
const blockWidth = (availableWidth - totalPadding) / numBlocksPerRow; //We calculate the width of the blocks

const blocks = [];
for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numBlocksPerRow; j++) {
        //We calculate the position of the blocks
        let x = (leftBar.width + j * (blockWidth + padding)); //Starting from the left 
        let y = topBar.height + i * (blockHeight + 5); //We add 5 to separate the blocks
        let color = colors[i]; //We get the color of the block
        let block = new Block(new Vec(x, y), blockWidth, blockHeight, color, "block");
        if (Math.random() < 0.2) { //20% chance to have a power-up
            let powerUpTypes = ["expandPaddle", "extraLife", "slowBall"];
            let randomType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
            block.assignPowerUp(randomType);
        }
        blocks.push(block);
    }
}

//Lives
let liveScore = new TextLabel(20, 15, "20px Ubuntu Mono", "white");
//Score
let scoreNum = new TextLabel(canvasWidth - 100, 15, "20px Ubuntu Mono", "white");

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
        else if(event.key == ' ' && !box.inPlay) {
            box.initVelocity();
            box.inPlay = true;
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

function activatePowerUp(powerUp) {
    switch (powerUp.type) {
        case "expandPaddle":
            paddle.width += 40; //We expand the paddle
            break;
        case "slowBall":
            box.velocity.y /= 1.5; //We slow the ball by 50%
            break;
        case "extraLife":
            lives++;  //We add a life
            break;
    }
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

    //Draw blocks
    for (let block of blocks) {
        block.draw(ctx);
    }
    //Draw liveScore
    liveScore.draw(ctx, `Lives: ${lives}`);

    //Draw score
    scoreNum.draw(ctx, `Score: ${score}`);
    // Display text to press space to play
    if (!box.inPlay) {
        ctx.font = "30px Fantasy";
        ctx.fillStyle = "white";
        ctx.fillText("Press Space to Play", canvasWidth / 2 - 100, canvasHeight / 1.5);
    }

    // Si se acaban las vidas
    if (lives == 0) {
        //We draw the bars
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        leftBar.draw(ctx);
        rightBar.draw(ctx);
        topBar.draw(ctx);
        bottomBar.draw(ctx);

        ctx.font = "100px Fantasy";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", canvasWidth / 2 - 225, canvasHeight / 2);
    }

    for (let i = 0; i < powerUps.length; i++) {
        let powerUp = powerUps[i];
        powerUp.update(deltaTime);
        powerUp.draw(ctx);

        //If the power-up is caught by the paddle
        if (boxOverlap(powerUp, paddle)) {
            activatePowerUp(powerUp);
            powerUps.splice(i, 1);
            i--; 
        }
        
        //If the power-up goes out of the screen
        if (powerUp.position.y > paddle.position.y + paddle.height) {
            powerUps.splice(i, 1);
            i--;
        }
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
        paddle.width = 150;
        paddle.update(0);
        powerUps.length = 0; // Clear all falling power-ups
        box.reset();
    }
    //Make the ball bounce in bars
    if (boxOverlap(box, leftBar) || boxOverlap(box, rightBar)) {
        box.velocity.x *= -1;
    }

    //Make the ball break the blocks
    for (let i = 0; i < blocks.length; i++) {  //We iterate over the blocks
        let block = blocks[i]; //We get the block
        if (boxOverlap(box, block)) {  
            if(Math.abs(box.velocity.y) >= 1.5){ //We lomit the velocity of the ball to 1.5
                box.velocity.y = -1.5;
            } else {
                box.velocity.y *= -1.05; //We make the ball bounce with a little more velocity
            } 
            if (block.powerUp) { //If the block has a power-up
                let powerUpColor;
                //We assign the color of the power-up
                switch (block.powerUp) {
                    case "expandPaddle":
                        powerUpColor = "blue";
                        break;
                    case "extraLife":
                        powerUpColor = "green";
                        break;
                    case "slowBall":
                        powerUpColor = "yellow";
                        break;
                }
                powerUps.push(new PowerUp(new Vec(block.position.x + block.width / 2, block.position.y), 20, 20, powerUpColor, block.powerUp));
            }
            blocks.splice(i, 1);  //We remove the block
            i--; //We decrease the index to avoid skipping the next element of block
            score++; //We add 1 to score
        }
    }

    //If the player wins
    if(blocks.length == 0) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        leftBar.draw(ctx);
        rightBar.draw(ctx);
        topBar.draw(ctx);
        bottomBar.draw(ctx);

        ctx.font = "100px Fantasy";
        ctx.fillStyle = "white";
        ctx.fillText("WINNER", canvasWidth / 2 - 150, canvasHeight / 2);
    }


    oldTime = newTime;

    requestAnimationFrame(drawScene);
}