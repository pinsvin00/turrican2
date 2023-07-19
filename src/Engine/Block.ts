import { PhysicsEntity, GameEntity} from "./GameEntity";
import {Color, RectangleCollider, Vector2} from "./utils";
import {SpriteShape} from "./SpriteShape";
import {PLAYER_STANDING} from "../Sprites/PlayerSprites";
import {BLOCKS} from "../Sprites/EnemiesSprites";

export class Block extends PhysicsEntity {

    tag = "GROUND";
    calculateGravity = false;
    shape: SpriteShape;

    constructor(position: Vector2, size: Vector2) {
        super();

        this.position = position;

        this.shape = new SpriteShape(position, size, BLOCKS);
        this.colliders.push(new RectangleCollider(position, size));

    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        this.shape.draw(ctx);
    }


}