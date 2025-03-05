/*
Collection of classes that will be used in the games

Aquiba Yudah Benarroch Bittan
A01783710
*/
class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    //Methods
    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }
    minus(other) {
        return new Vec(this.x - other.x, this.y - other.y);
    }
    times(scalar) {
        return new Vec(this.x * scalar, this.y * scalar);
    }
    magnitude() {
        return Math.floor(Math.sqrt(this.x ** 2 + this.y ** 2));
    }
}

//Test the vector
/*
let a = new Vec(3,7);
let b = new Vec(-2, 5);
console.log("Plus: " , a.plus(b));
console.log("Minus: " , a.minus(b));
console.log("Times: " , a.times(3));
console.log("Magnitude: " , a.magnitude());
*/
class GameObject {
    constructor(position, width, height, color, type) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    //Empty template for all GameObjects to be able to update
    update() {

    }
}

class TextLabel {
    constructor(x, y, font, color) {
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
    }

    draw(ctx, text) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(text, this.x, this.y);
    }
}

//Detect a collision of two box objects
function boxOverlap(obj1, obj2) {
    return obj1.position.x + obj1.width > obj2.position.x && //
        obj1.position.x < obj2.position.x + obj2.width &&
        obj1.position.y + obj1.height > obj2.position.y &&
        obj1.position.y < obj2.position.y + obj2.height;
}