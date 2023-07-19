import {Player} from "./player";
import {
    PLAYER_CROUCHING,
    PLAYER_FOCUS_SHOOTING,
    PLAYER_JUMPING,
    PLAYER_NORMAL_TUMBLE,
    PLAYER_RUNNING,
    PLAYER_STANDING
} from "../Sprites/PlayerSprites";
import {FrameCounter} from "../Engine/FrameCounter";
import {FPS} from "../consts";
import {GameEntity} from "../Engine/GameEntity";
import {Sprite} from "../Engine/Sprite";


export class PlayerAnimationManager extends GameEntity {
    runCounter = 0;
    staticObject = true;

    constructor(public player: Player) {
        super();
    }



    getAimingSprite() {
        let deg;
        if(this.player.aimingDeg > 0) {
            this.player.sprite.flip = false;
            deg = this.player.aimingDeg;
        }
        else {
            this.player.sprite.flip = true;
            deg = -this.player.aimingDeg;
        }

        const tick = Math.round( deg / 12 );
        return PLAYER_FOCUS_SHOOTING[15 - tick];
    }

    getRunningSprite() {
        return  PLAYER_RUNNING[
            Math.round(this.runCounter) % PLAYER_RUNNING.length
            ];
    }

    onFrame() {
        this.player.sprite.ptr = this.getCurrentSprite();
        if(this.player.isRunning) {
            this.runCounter += 27.0/FPS;
        }
        if(this.player.isTumbling) {
            this.player.sprite.rotation += 270/FPS;
        }
        else {
            this.player.sprite.rotation = 0;
        }

    }

    getCurrentSprite(): Sprite {
        if(this.player.isTumbling) {
            return PLAYER_NORMAL_TUMBLE;
        }
        else if(this.player.isCrouching) {
            return PLAYER_CROUCHING;
        }
        else if(!this.player.isGrounded){
            return PLAYER_JUMPING;
        }
        else if(this.player.isAiming) {
            return this.getAimingSprite();
        }
        else if(this.player.isRunning) {
            return this.getRunningSprite();
        }

        return PLAYER_STANDING;
    }


}