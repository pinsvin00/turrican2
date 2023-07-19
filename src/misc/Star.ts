import {CollisionData, PhysicsEntity} from "../Engine/GameEntity";
import {radians, Vector2} from "../Engine/utils";
import {Player} from "../Player/player";
import {FPS} from "../consts";
import {SpriteShape} from "../Engine/SpriteShape";
import {GREEN_PICKUP} from "../Sprites/MiscSprites";


export class Star extends PhysicsEntity{

    basePosition = Vector2.NULL_VEC();
    sinCounter = 0;

    sprite: SpriteShape;

    constructor(public position: Vector2) {
        super();
        this.basePosition = position.addCopy(Vector2.NULL_VEC());
        this.sprite = new SpriteShape(
            this.position,
            new Vector2(30, 30),
            GREEN_PICKUP,
        )
    }

    onCollision(entity: PhysicsEntity, collisionData: CollisionData) {
        if(entity.tag === "PLAYER") {
            const player = entity as Player;
            player.stars += 1;
            this.destroy();
        }
    }

    onFrame() {
        this.sinCounter += 30/FPS;

        this.position.y = this.basePosition.y + Math.sin(radians(this.sinCounter));
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.sprite.draw(ctx);
    }

}