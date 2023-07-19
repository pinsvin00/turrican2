import {CollisionData, PhysicsEntity} from "../Engine/GameEntity";
import {Color, RectangleCollider, Vector2} from "../Engine/utils";
import {ENEMY_TAG, FPS} from "../consts";
import {SpriteShape} from "../Engine/SpriteShape";
import {Sprite} from "../Engine/Sprite";
import {NORMAL_BULLET} from "../Sprites/BulletSprites";
import {EnergyBall} from "./EnergyBall";
import {BouncyBullet} from "./BouncyBullet";


export class BulletFactory {

    static createNormalBullet(position: Vector2, velocity: Vector2, deg: number) {
        const bullet = new Bullet(position, velocity);
        bullet.sprite.ptr = NORMAL_BULLET[0];
        bullet.sprite.rotation = deg;
    }

    static createEnergyBallBullet(position: Vector2, velocity: Vector2, deg: number) {
        const bullet = new EnergyBall(position, velocity);
    }

    static createBouncyBullet(position: Vector2, velocity: Vector2, deg: number) {
        const bullet = new BouncyBullet(position, velocity);
    }

}


export class Bullet extends PhysicsEntity {
    tag = "BULLET";
    sprite: SpriteShape;
    calculateGravity = false;
    normalCollisions = false;
    sprites: Array<Sprite> | null = null;

    damage = 10;

    bulletAnimCounter = 0;


    constructor(public position: Vector2, public velocity: Vector2) {
        super();
        this.sprite = new SpriteShape(
            this.position, new Vector2(20, 20), NORMAL_BULLET[0]
        )
        this.colliders.push(new RectangleCollider(
            this.position, new Vector2(20, 20)
        ))
    }


    onCollision(entity: PhysicsEntity, collisionData: CollisionData) {
        //super.onCollision(entity, collisionData);
        if(entity.tag === "ENEMY" || entity.tag === "PLAYER" || entity.tag === "BULLET" || entity.tag === "POWERUP"){

        }
        else {
            this.destroy();
        }


    }

    draw(ctx: CanvasRenderingContext2D) {
        this.sprite.draw(ctx);

        if(this.sprites !== null) {
            this.bulletAnimCounter += 1/FPS;

            this.sprite.ptr = this.sprites[this.bulletAnimCounter % this.sprites.length];
        }
    }

}
