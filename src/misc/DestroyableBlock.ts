import {CollisionData, GameEntity, PhysicsEntity} from "../Engine/GameEntity";
import {Vector2} from "../Engine/utils";
import {Sprite} from "../Engine/Sprite";
import {SpriteShape} from "../Engine/SpriteShape";
import {PowerUp, POWERUP_TYPE} from "./PowerUp";


export class DestroyableBlock extends PhysicsEntity {
    health: number = 40;
    sprite: SpriteShape;

    constructor(public position: Vector2, public size: Vector2,texture : Sprite) {
        super();

        this.sprite = new SpriteShape(
            position,
            size,
            texture
        );
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);

        this.sprite.draw(ctx);
    }





    onCollision(entity: PhysicsEntity, collisionData: CollisionData) {
        if(entity.tag === "BULLET"){
            const type = POWERUP_TYPE.BOUNCY_SHOTS;
            new PowerUp(this.position, type);
        }
    }
}