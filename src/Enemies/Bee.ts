import {Enemy} from "./enemy";
import {CollisionData, PhysicsEntity} from "../Engine/GameEntity";
import {SpriteShape} from "../Engine/SpriteShape";
import {BEE} from "../Sprites/EnemiesSprites";
import {RectangleCollider, Vector2} from "../Engine/utils";
import {FPS} from "../consts";
import {BeeAnimationManager} from "./BeeAnimationManager";


export class Bee extends Enemy {

    shape: SpriteShape;

    _ = new BeeAnimationManager(this);

    calculateGravity = false;

    constructor(public position: Vector2, public destination: Vector2) {
        super();
        this.shape = new SpriteShape(
            this.position,
            new Vector2(30,30),
            BEE[0]
        )

        this.colliders.push(new RectangleCollider(
            this.position,
            new Vector2(30,30)
        ))

    }


    onCollision(entity: PhysicsEntity, collisionData: CollisionData) {
        super.onCollision(entity, collisionData);

    }

    onFrame() {
        const dir = this.destination.x > this.position.x ? Vector2.RIGHT() : Vector2.LEFT();

        this.velocity = dir.mulCopy(200/FPS);

        super.onFrame();
    }

    draw(ctx : CanvasRenderingContext2D) {
        this.shape.draw(ctx);
    }
}