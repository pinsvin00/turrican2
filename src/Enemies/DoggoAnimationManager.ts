import {Doggo} from "./Doggo";
import {GameEntity} from "../Engine/GameEntity";
import {FrameCounter} from "../Engine/FrameCounter";
import {DOGGO_1, DOGGO_1_SLEEP} from "../Sprites/EnemiesSprites";
import {FPS} from "../consts";
import {Sprite} from "../Engine/Sprite";


export class DoggoAnimationManager extends GameEntity {
    constructor(public doggo : Doggo) {
        super();
    }
    staticObject = true;

    animationCounter = 0;

    getCurrentSprite(): Sprite {
        if(this.doggo.isAwake) {
            return DOGGO_1[Math.round(this.animationCounter) % DOGGO_1.length]
        }

        return DOGGO_1_SLEEP;
    }

    onFrame() {
        this.doggo.sprite.ptr = this.getCurrentSprite();
        this.animationCounter += 10/FPS;
    }

}