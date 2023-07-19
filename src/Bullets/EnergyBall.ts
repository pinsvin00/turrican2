import {CollisionData, GameEntity, PhysicsEntity} from "../Engine/GameEntity";
import {SpriteShape} from "../Engine/SpriteShape";
import {Sprite} from "../Engine/Sprite";
import {radians, RectangleCollider, Vector2} from "../Engine/utils";
import {BOUNCY_BIG, ENERGY_BALLS} from "../Sprites/BulletSprites";
import {FPS} from "../consts";
import {SmallerBouncyBullet} from "./SmallerBouncyBullet";
import {FrameCounter} from "../Engine/FrameCounter";



class EnergyBallAnimationManager extends GameEntity {

    counter = 0;
    staticObject  = true;

    getCurrentSprite() {
        return ENERGY_BALLS[Math.round(this.counter) % ENERGY_BALLS.length ];
    }

    constructor(public energyBall: EnergyBall) {
        super();
    }

    onFrame() {
        this.energyBall.sprite.ptr = this.getCurrentSprite();

        this.counter += 20/FPS;
    }

}

export class EnergyBall extends PhysicsEntity {
    tag = "BULLET";
    sprite: SpriteShape;
    calculateGravity = false;
    sprites: Array<Sprite>;
    normalCollisions = false;

    damage = 30;

    constructor(public position: Vector2, public velocity: Vector2) {
        super();
        this.sprites = ENERGY_BALLS;
        this.sprite = new SpriteShape(
            this.position, new Vector2(40, 40), ENERGY_BALLS[0]
        )
        this.colliders.push(new RectangleCollider(
            this.position, new Vector2(40, 40)
        ))

        new EnergyBallAnimationManager(this)
    }


    onCollision(entity: PhysicsEntity, collisionData: CollisionData) {
        super.onCollision(entity, collisionData);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.sprite.draw(ctx);
    }

}
