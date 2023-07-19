import {Color, Vector2} from "./utils";
import {IDrawable} from "./GameEntity";
import { Engine } from "./Engine";


export class Rectangle {
    position = Vector2.NULL_VEC();

    size = Vector2.NULL_VEC();
    origin = Vector2.NULL_VEC();

    constructor( position : Vector2 , size : Vector2) {
        this.position = position;
        this.size = size;
        this.origin = Vector2.NULL_VEC();
    }


    within(r: Rectangle) {
        return (r.left() <= this.left() &&
            r.right() >= this.right() &&
            r.top() <= this.top() &&
            r.bottom() >= this.bottom()
        );
    }

    top() {
        return this.position.y;
    }

    bottom() {
        return this.position.y - this.size.y;
    }

    left() {
        return this.position.x;
    }

    right() {
        return this.position.x + this.size.x;
    }
}
