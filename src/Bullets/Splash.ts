import {CollisionData, PhysicsEntity} from "../Engine/GameEntity";
import {Vector2} from "../Engine/utils";
import {FPS} from "../consts";
import {Rectangle} from "../Engine/Rectangle";
import {SpriteShape} from "../Engine/SpriteShape";
import {SPLASH_LEFT, SPLASH_RIGHT} from "../Sprites/BulletSprites";


export class Splash extends PhysicsEntity {
    velocity = new Vector2(1200/FPS,0 );

    leftSplash: SpriteShape;
    rightSplash: SpriteShape;

    constructor(public position : Vector2) {
        super();

        this.leftSplash = new SpriteShape(
            position.addCopy(new Vector2(-50, -400)),
            new Vector2(32, 600)
            , SPLASH_LEFT
        )

        this.rightSplash = new SpriteShape(
            position.addCopy(new Vector2(50, -400)),
            new Vector2(32, 600)
            , SPLASH_RIGHT
        )
    }

    onFrame() {

        this.rightSplash.position.x += this.velocity.x;
        this.leftSplash.position.x -= this.velocity.x;
    }

    onCollision(entity: PhysicsEntity, collisionData: CollisionData) {
        if(entity.tag === "ENEMY") {
            entity.destroy();
        }
    }

    draw(ctx : CanvasRenderingContext2D ) {
        this.leftSplash.draw(ctx);
        this.rightSplash.draw(ctx);
    }
}