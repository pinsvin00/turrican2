
export function radians(degrees: number) { return degrees * Math.PI / 180; }

export class Vector2 {
    x : number;
    y : number;

    constructor(x : number, y: number) {
        this.x = x;
        this.y = y;
    }

    addCopy(v : Vector2) {
        return new Vector2(v.x + this.x, v.y + this.y);
    }

    subCopy(v : Vector2) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    mulCopy (factor : number) {
        return new Vector2(this.x * factor, this.y * factor);
    }

    divCopy (factor : number) {
        return this.mulCopy(1/factor);
    }

    copy() {
        return new Vector2(this.x, this.y);
    }

    add(v : Vector2) {
        this.x += v.x;
        this.y += v.y;
    }

    sub(v : Vector2) {
        this.x -= v.x;
        this.y -= v.y;
    }

    mul (factor : number) {
        this.x *= factor;
        this.y *= factor;
    }

    div (factor : number) {
        this.mul(1/factor);
    }



    static NULL_VEC() {
        return new Vector2(0,0);
    }

    static LEFT(factor: number = 1) {
        return new Vector2(-1 * factor, 0);
    }


    static RIGHT(factor: number = 1) {
        return new Vector2(1*factor, 0);
    }


    static UP(factor: number = 1) {
        return new Vector2(0, -1*factor);
    }


    static DOWN(factor: number = 1) {
        return new Vector2(0, 1*factor);
    }
}

export class RectangleCollider {
    //The position of rectangle is its left top vert

    position: Vector2;
    size : Vector2;
    origin = Vector2.NULL_VEC();

    constructor(position: Vector2, size: Vector2) {
        this.position = position;
        this.size = size;
    }


    getVertices() {
        return [
            this.position,
            this.position.addCopy( new Vector2(this.size.x, 0).addCopy(this.position) ),
            this.position.addCopy( new Vector2(this.size.x, this.size.y).addCopy(this.position) ),
            this.position.addCopy( new Vector2(0, this.size.y).addCopy(this.position) )
        ]
    }

    top() {
        return this.position.y;
    }

    bottom() {
        return this.position.y + this.size.y;
    }

    left() {
        return this.position.x;
    }

    right() {
        return this.position.x + this.size.x;
    }

    isColliding(r : RectangleCollider) {

        const a = this;
        const b = r;

        return (
                a.left() <= b.right() && a.right() >= b.left()) &&
            a.bottom() >= b.top() && a.top() <= b.bottom()
    }

}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function clamp(num: number, min: number, max: number) {
    return num <= min
        ? min
        : num >= max
            ? max
            : num
}

export function distance(v1: Vector2, v2: Vector2) {
    return Math.sqrt ( (v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2 )
}


export class Color {
    r: number;
    g: number;
    b: number;

    constructor(r : number, g : number, b : number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    toString() {
        const r = this.r;
        const g = this.g;
        const b  = this.b;
        return `rgb(${r}, ${g}, ${b})`
    }

    static red() {
        return new Color(255, 0, 0);
    }
}