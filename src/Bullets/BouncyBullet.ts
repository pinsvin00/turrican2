import {CollisionData, PhysicsEntity} from "../Engine/GameEntity";
import {SpriteShape} from "../Engine/SpriteShape";
import {Sprite} from "../Engine/Sprite";
import {radians, RectangleCollider, Vector2} from "../Engine/utils";
import {BOUNCY_BIG, NORMAL_BULLET} from "../Sprites/BulletSprites";
import {SmallerBouncyBullet} from "./SmallerBouncyBullet";
import {FPS} from "../consts";


export class BouncyBullet extends PhysicsEntity {
    tag = "BULLET";
    sprite: SpriteShape;
    calculateGravity = false;
    normalCollisions = false;
    damage = 20;

    constructor(public position: Vector2, public velocity: Vector2) {
        super();
        this.sprite = new SpriteShape(
            this.position, new Vector2(20, 20), BOUNCY_BIG
        )
        this.colliders.push(new RectangleCollider(
            this.position, new Vector2(20, 20)
        ))
    }


    onCollision(entity: PhysicsEntity, collisionData: CollisionData) {
        //super.onCollision(entity, collisionData);
        if(entity.tag === "PLAYER"  || entity.tag === "BULLET") {

        }
        else {
            const dir = this.velocity.x > 0 ?  -180 : 0;
            const dirx = this.velocity.x > 0 ?  -1 : 1;

            const v1 = new Vector2(450/FPS * Math.cos(radians(30 + dir)), 450/FPS * Math.sin(30))
            const v2 = new Vector2(450/FPS * Math.cos(radians(-30 + dir)), 450/FPS * Math.sin(-30))
            const v3 = new Vector2(450/FPS * dirx, 0)

            new SmallerBouncyBullet(this.position.subCopy(this.velocity), v1 );
            new SmallerBouncyBullet(this.position.subCopy(this.velocity), v2 );
            new SmallerBouncyBullet(this.position.subCopy(this.velocity), v3 );
            this.destroy();
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.sprite.draw(ctx);
    }

}
