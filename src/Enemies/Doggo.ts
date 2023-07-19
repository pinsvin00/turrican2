import {Enemy} from "./enemy";
import {Player} from "../Player/player";
import {distance, RectangleCollider, Vector2} from "../Engine/utils";
import {FPS} from "../consts";
import {SpriteShape} from "../Engine/SpriteShape";
import {DoggoAnimationManager} from "./DoggoAnimationManager";
import {DOGGO_1_SLEEP} from "../Sprites/EnemiesSprites";
import {CollisionData, PhysicsEntity} from "../Engine/GameEntity";


export class Doggo extends Enemy{

    isAwake = false;
    destination: Vector2;
    calculateGravity = true;
    checkCollisions  = true;

    sprite: SpriteShape;

    constructor(position: Vector2,destination: Vector2) {
        super();
        this.destination = destination;
        this.position    = position;

        this.sprite = new SpriteShape(
            this.position,
            new Vector2(50, 50),
            DOGGO_1_SLEEP,
        )

        this.colliders.push(
            new RectangleCollider(
                this.position,
                new Vector2(50,40),
            )
        )

        new DoggoAnimationManager(this);
    }

    jump(dir: Vector2) {
        this.velocity.x = dir.x * 480/FPS;
        this.velocity.y = -240.0/FPS;

        this.isGrounded = false;
    }


    onCollision(entity : PhysicsEntity, collisionData: CollisionData) {
        super.onCollision(entity, collisionData);
        if(entity.tag === "GROUND") {
            this.isGrounded = true;
            this.velocity.y = 0;
        }
    }


    onFrame() {
        super.onFrame();

        let weightedDistance = 
        Math.sqrt ( (this.position.x - this.destination.x) ** 2 +
         2 * (this.position.y - this.destination.y) ** 2 )

        if( !this.isAwake && weightedDistance <= 500 ) {
            this.isAwake = true;
        }

        if(!this.isAwake) return;
        if(this.isGrounded) {
            let dir;
            if(this.destination.x > this.position.x) {
                dir = Vector2.RIGHT()
                this.sprite.flip = true;
            }
            else {
                dir = Vector2.LEFT();
                this.sprite.flip = false;
            }

            this.jump(
                dir
            );
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.sprite.draw(ctx);
    }
}