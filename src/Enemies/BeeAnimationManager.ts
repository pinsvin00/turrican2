import {Game} from "../Game";
import {GameEntity} from "../Engine/GameEntity";
import {Bee} from "./Bee";
import {FPS} from "../consts";
import {BEE} from "../Sprites/EnemiesSprites";


export class BeeAnimationManager extends GameEntity {

    bee: Bee;

    counter = 0;

    staticObject = true;

    constructor(bee: Bee) {
        super();
        this.bee = bee;
    }


    getCurrentSprite() {
        return BEE[Math.round(this.counter) % BEE.length];
    }

    onFrame() {
        this.bee.shape.ptr = this.getCurrentSprite();
        this.counter += 20/FPS;
    }

}