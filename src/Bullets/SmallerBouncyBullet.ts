import {CollisionData, PhysicsEntity} from "../Engine/GameEntity";
import {SpriteShape} from "../Engine/SpriteShape";
import {Sprite} from "../Engine/Sprite";
import {RectangleCollider, Vector2} from "../Engine/utils";
import {BOUNCY_SMALL, NORMAL_BULLET} from "../Sprites/BulletSprites";

export class SmallerBouncyBullet extends PhysicsEntity {
    tag = "BULLET";
    sprite: SpriteShape;
    calculateGravity = false;
    damage = 50;
    normalCollisions = false;

    constructor(public position: Vector2, public velocity: Vector2) {
        super();
        this.sprite = new SpriteShape(
            this.position, new Vector2(7, 7), BOUNCY_SMALL
        )
        this.colliders.push(new RectangleCollider(
            this.position, new Vector2(7, 7)
        ))
    }


    onCollision(entity: PhysicsEntity, collisionData: CollisionData) {
        if(entity.tag === "PLAYER" || entity.tag === "BULLET") {
        }
        else {
            this.destroy();
        }


    }

    draw(ctx: CanvasRenderingContext2D) {
        this.sprite.draw(ctx);
    }

}
