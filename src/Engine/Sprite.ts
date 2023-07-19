import {Vector2} from "./utils";
import {IDrawable} from "./GameEntity";


//37, 45

export class SpriteBase {
    image : HTMLImageElement;
    elementSize: Vector2;

    constructor(image: HTMLImageElement, elementSize: Vector2) {
        this.image = image;
        this.elementSize = elementSize;

    }

}

export class Sprite {

    flip = false;

    position: Vector2;
    size: Vector2;


    constructor(position: Vector2, size: Vector2, public base: SpriteBase) {
        this.position = position;
        this.size = size;
    }




}