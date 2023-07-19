import {clamp, RectangleCollider, Vector2} from "./utils";
import {Engine} from "./Engine";
import {FPS} from "../consts";

export interface IDrawable {

    position : Vector2;
    size : Vector2;
    origin : Vector2;

    draw(ctx : CanvasRenderingContext2D) : void;

}

export class GameEntity implements IDrawable {
    id : number;
    tag : string = "NONE";
    staticObject = false;
    position : Vector2 = Vector2.NULL_VEC();
    size: Vector2 = Vector2.NULL_VEC();
    origin: Vector2 = Vector2.NULL_VEC();

    constructor() {
        this.id = Engine.entities.length + 1;
        Engine.entities.push(this);
    }

    destroy() {
        const entityIndex = Engine.entities.findIndex(el => el.id === this.id);
        const physEntityIndex = Engine.physicsEntities.findIndex(el => el.id === this.id);

        if(entityIndex) Engine.entities.splice(entityIndex, 1);
        if(physEntityIndex) Engine.physicsEntities.splice(physEntityIndex, 1);

    }



    draw(ctx: CanvasRenderingContext2D) {}
    onFrame() {}


}

export class CollisionData {
    isUpperCollision = false;
    constructor(public thisCollider: RectangleCollider,
                public entityCollider: RectangleCollider) {
    }
}

export class PhysicsEntity extends GameEntity {
    colliders : Array<RectangleCollider> = [];
    velocity: Vector2 = Vector2.NULL_VEC();

    calculateGravity = true;
    checkCollisions = true;
    normalCollisions = true;
    isGrounded = false;



    onCollision(entity : PhysicsEntity, collisionData: CollisionData) {

        //zeby wystapila kolizja gorna, dolna czesc goscia musi byc wyzej

        if(!this.normalCollisions || !entity.normalCollisions) return ;
        const FUNNY_FACTOR = this.velocity.y * 3;


        //kolizja dolna
        if(collisionData.thisCollider.bottom() < collisionData.entityCollider.top() + FUNNY_FACTOR ){

            
            if(this.velocity.y >= 0) {
                this.isGrounded = true;
                this.position.y -= Math.abs(collisionData.thisCollider.bottom() - collisionData.entityCollider.top()) ;
                this.velocity.y = 0;
            }
        }
        //kolizja gorna
        else {
            this.position.sub(this.velocity);

            collisionData.isUpperCollision = true;
            if(
                collisionData.thisCollider.right() < collisionData.entityCollider.right() &&
                collisionData.thisCollider.left()  > collisionData.entityCollider.left()
            ) {
                this.velocity.y = 0;
            }
            else {
                this.position.x -= this.velocity.x;
                this.velocity.x = 0;
            }


        }

    }

    constructor() {
        super();
        Engine.physicsEntities.push(this);
    }



    onFrame() {
        super.onFrame();
        this.position.add(this.velocity);

        if(this.calculateGravity) {
            this.velocity.y += 10/FPS;
            this.velocity.y = clamp(this.velocity.y, -100, 5);
        }

        if(this.checkCollisions) {
            Engine.physicsEntities.forEach(el => {
                if(el.id !== this.id) {
                    const collisionData =  this.checkCollisionsWith(el);
                    if(collisionData) {
                        this.onCollision(el, collisionData);
                    }
                }
            })
        }

    }

    checkCollisionsWith(entity : PhysicsEntity) {
        for ( let collider1 of this.colliders) {
            for(let collider2 of entity.colliders) {
                const collision = collider1.isColliding(collider2);
                if(collision) {
                    return new CollisionData(collider1, collider2)
                }

            }
        }
        return false;
    }


}


