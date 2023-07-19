import {DOWN_KEY, FIRE_BUTTON, FPS, LEFT_KEY, RIGHT_KEY, SPLASH_BUTTON, TUMBLE_BUTTON, UP_KEY} from "../consts";
import {Vector2} from "../Engine/utils";
import {Player} from "./player";
import {Splash} from "../Bullets/Splash";

export class PlayerController {
    player : Player;

    leftPressed = false;
    rightPressed = false;
    upPressed = false;
    downPressed = false;
    tumblePressed = false;
    firePressed = false;



    handleTumbleMovement() {
        let dir = this.player.direction;
        this.player.position.add(dir.mulCopy(100/FPS));
    }

    keyPressed(key: String) {
        if(key === LEFT_KEY && !this.downPressed) {
            this.leftPressed = this.player.isRunning = true;
        }
        else if(key === RIGHT_KEY && !this.downPressed) {
            this.rightPressed = this.player.isRunning = true;
        }
        else if(key === UP_KEY && !this.downPressed) {
            this.upPressed = true;
        }
        else if(key === DOWN_KEY) {
            this.downPressed = true;
            this.player.isCrouching = true;
            this.player.changeToSmall();
        }
        else if(key === FIRE_BUTTON) {
            this.firePressed = true;
            this.player.fire();
        }
        else if(key === SPLASH_BUTTON) {
            if(this.player.splashes > 0) {
                this.player.splashes -= 1;
                new Splash(this.player.position);
            }
        }
        else if(key === TUMBLE_BUTTON) {
            this.tumblePressed = this.player.isTumbling = true;
            this.player.changeToSmall();
        }
    }

    keyReleased(key: String) {
        if(key === LEFT_KEY && !this.downPressed) {
            this.leftPressed = this.player.isRunning = false;
        }
        else if(key === RIGHT_KEY && !this.downPressed) {
            this.rightPressed = this.player.isRunning = false;
        }
        else if(key === UP_KEY && !this.downPressed) {
            this.upPressed = false;
        }
        else if(key === DOWN_KEY) {
            this.downPressed = false;
            this.player.isCrouching = false;
            this.player.changeToNormal();
        }
        else if(key === FIRE_BUTTON) {
            this.firePressed = false;
            this.player.isAiming = false;
            this.player.aimingDeg = this.player.direction.x === 1 ? 90 : -90;
            this.player.aimModeCounter.reset();

        }
        else if(key === TUMBLE_BUTTON) {
            this.tumblePressed = this.player.isTumbling = false;
            this.player.changeToNormal();
        }

    }


    jump() {
        const player = this.player;
        if(this.player.jumpPower > 0) {
            player.velocity.y  = -player.jumpVelocity;
            player.jumpPower -= 90/FPS;

            player.isGrounded = false;
        }
    }
    moveX(dir : Vector2) {
        this.player.velocity.x = this.player.standardVelocity * dir.x;
        this.player.sprite.flip = dir.x === -1;
        this.player.direction = dir;
    }



    constructor(player : Player) {
        this.player = player;
    }

    handleAimingInput() {
        if(this.rightPressed) {
            this.player.aimingDeg = (this.player.aimingDeg + 240/FPS);
            if(this.player.aimingDeg > 180) {
                this.player.aimingDeg = -180;
            }
        }
        else if(this.leftPressed) {
            this.player.aimingDeg = this.player.aimingDeg - 240/FPS;
            if(this.player.aimingDeg < -180) {
                this.player.aimingDeg = 180 - 30/FPS;
            }
        }

        if(this.player.canFire){
            this.player.fire();
            this.player.canFire = false;
        }
    }

    handleMovingInput() {

        if(this.rightPressed) {
            this.moveX(Vector2.RIGHT());
        }
        if(this.leftPressed) {
            this.moveX(Vector2.LEFT());
        }
        if(this.upPressed){
            this.jump();
        }
    }
}
