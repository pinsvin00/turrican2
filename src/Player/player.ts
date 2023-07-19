import {canvasSize, FPS} from "../consts";
import {radians, RectangleCollider, Vector2} from "../Engine/utils";
import {CollisionData, IDrawable, PhysicsEntity} from "../Engine/GameEntity";
import {BulletFactory} from "../Bullets/Bullet";
import {SpriteShape} from "../Engine/SpriteShape";
import {PLAYER_JUMPING} from "../Sprites/PlayerSprites";
import {FrameCounter} from "../Engine/FrameCounter";
import {PlayerAnimationManager} from "./PlayerAnimationManager";
import {PlayerController} from "./PlayerController";
import {POWERUP_TYPE} from "../misc/PowerUp";
import {Engine} from "../Engine/Engine";


export class Player extends PhysicsEntity implements IDrawable {
    controller : PlayerController;
    tag = "PLAYER";
    _ = new PlayerAnimationManager(this);
    direction: Vector2 = Vector2.RIGHT();

    health = 100;
    score = 0;

    damageGuard = true;
    currentPowerUp = POWERUP_TYPE.BOUNCY_SHOTS;

    jumpPower = 30;

    lives  = 3;
    splashes = 2;
    stars = 0;
    isCrouching = false;

    aimingDeg = 0;
    standardVelocity = 400.0/FPS;

    jumpVelocity = 400.0/FPS;

    position = canvasSize.divCopy(2);


    canFire = true

    isGrounded = false;
    isAiming = false;
    isTumbling = false;
    isRunning = false;

    aimModeCounter = new FrameCounter(20,
        () => {
            return this.controller.firePressed && this.isGrounded
        },
        () => {
            if(!this.isAiming) {
                this.isAiming = true;
                this.aimingDeg = this.direction.x === -1 ? -90 : 90;
                this.aimModeCounter.reset();
            }

        },

    );

    damageGuardCounter = new FrameCounter(3 * FPS,
        () => this.damageGuard,
        () => {
            this.damageGuard = false;
            this.damageGuardCounter.reset();
        }
    )

    fireCounter = new FrameCounter(10,
        () => true,
        () => {
            this.canFire = true;
            this.fireCounter.reset();
        }
    )

    normalSize = new Vector2(50, 75);
    smallSize = new Vector2(50, 50);
    sprite = new SpriteShape(
        Vector2.NULL_VEC(), this.normalSize, PLAYER_JUMPING
    );

    constructor() {
        super();

        this.colliders.push(
            new RectangleCollider(this.position,  this.normalSize)
        )

        this.controller = new PlayerController(this);

    }

    changeToSmall() {
        this.colliders[0].size = this.smallSize;
        this.sprite.size = this.smallSize;
        this.position.y += 25;
    }

    changeToNormal() {
        this.colliders[0].size = this.normalSize;
        this.sprite.size = this.normalSize;

        this.position.y -= 25;
    }


    fire() {
        if(!this.canFire) return;
        if(this.isAiming)  {
            const circle = new Vector2( Math.sin(radians(this.aimingDeg)), Math.cos( radians(this.aimingDeg)));

            const velocity = new Vector2( Math.sin(radians(this.aimingDeg)), Math.cos( radians(this.aimingDeg)));
            velocity.mul(1560/FPS);

            circle.mul(50);
            circle.add(this.position);
            circle.y += 20;

            BulletFactory.createNormalBullet(circle, velocity, 270 - this.aimingDeg);


        }
        else {
            const position = this.position.addCopy( this.direction.mulCopy(30) );
            if(!this.isCrouching) {
                position.y += 25;
            }

            const velocity = this.direction.mulCopy(1560/FPS);
            if(this.currentPowerUp === POWERUP_TYPE.NORMAL_SHOT) {
                BulletFactory.createNormalBullet(position, velocity, 0);
            }
            else if(this.currentPowerUp === POWERUP_TYPE.BOUNCY_SHOTS) {
                BulletFactory.createBouncyBullet(position, velocity, 0);
            }
            else if(this.currentPowerUp === POWERUP_TYPE.RAY_SHOTS) {
                BulletFactory.createEnergyBallBullet(position, velocity, 0);
            }
            else if(this.currentPowerUp === POWERUP_TYPE.ROCKET_SHOTS) {
                BulletFactory.createNormalBullet(position, velocity, 0);
            }
        }

        const audio = new Audio('res/shot.mp3');
        audio.volume = 0.5;
        audio.play();
        this.canFire = false;

    }

    onCollision(entity: PhysicsEntity, collisionData: CollisionData) {
        super.onCollision(entity, collisionData);
        if(entity.tag === "GROUND") {
            this.isGrounded =true;
        }
        if(this.isGrounded) {
            this.jumpPower = 30;
        }

    }


    onFrame() {
        super.onFrame();
        this.velocity.x = Math.round(this.velocity.x / 2.25 );

        if(this.health <= 0) {
            this.lives --;
            this.health = 100;
        }

        if(this.lives === 0) {
            window.alert("GAME OVER");

            Engine.freeze  = true;
            window.location.reload();
        }

        if(!this.isAiming) {
            this.controller.handleMovingInput();
        } else {
            this.controller.handleAimingInput();
        }

        if(this.controller.tumblePressed) {
            this.controller.handleTumbleMovement();

        }

    }


    draw(ctx : CanvasRenderingContext2D): void {
        this.sprite.origin = this.position;
        this.sprite.draw(ctx);

    }
}