import {CollisionData, GameEntity, PhysicsEntity} from "../Engine/GameEntity";
import {SpriteShape} from "../Engine/SpriteShape";
import {RectangleCollider, Vector2} from "../Engine/utils";
import {PLAYER_STANDING} from "../Sprites/PlayerSprites";
import {Player} from "../Player/player";
import {Sprite} from "../Engine/Sprite";
import {FPS} from "../consts";
import {GREEN_PICKUP, HEALTH} from "../Sprites/MiscSprites";



export enum POWERUP_TYPE {
    NORMAL_SHOT,
    BOUNCY_SHOTS,
    RAY_SHOTS,
    ROCKET_SHOTS,
    HEALTH
}

export const POWERUP_TYPE_TEXTURE = new Map<number, Sprite>();
POWERUP_TYPE_TEXTURE.set(POWERUP_TYPE.NORMAL_SHOT, GREEN_PICKUP);
POWERUP_TYPE_TEXTURE.set(POWERUP_TYPE.BOUNCY_SHOTS, GREEN_PICKUP);
POWERUP_TYPE_TEXTURE.set(POWERUP_TYPE.RAY_SHOTS, GREEN_PICKUP);
POWERUP_TYPE_TEXTURE.set(POWERUP_TYPE.ROCKET_SHOTS, GREEN_PICKUP);
POWERUP_TYPE_TEXTURE.set(POWERUP_TYPE.HEALTH, HEALTH);

export class PowerUp extends PhysicsEntity {

    shape: SpriteShape;
    basePosition: Vector2;
    sinCounter = 0;
    powerUpType: number;
    normalCollisions = false;

    tag = "POWERUP"

    constructor(public position : Vector2) {
        super();
        const powerupTypes = [POWERUP_TYPE.NORMAL_SHOT, POWERUP_TYPE.HEALTH, POWERUP_TYPE.RAY_SHOTS, POWERUP_TYPE.ROCKET_SHOTS];
        const index = Math.ceil(Math.random() * powerupTypes.length - 1);

        this.powerUpType = powerupTypes[index];

        this.basePosition = Object.assign(Vector2.NULL_VEC(), this.position);

        this.shape = new SpriteShape(
            this.position,
            new Vector2(20, 30),
            POWERUP_TYPE_TEXTURE.get(this.powerUpType) as Sprite,
        )

        this.colliders.push(
            new RectangleCollider(
                this.position,
                new Vector2(20,20)
            )
        )
    }

    onCollision(entity: PhysicsEntity, collisionData: CollisionData) {
        if(entity.tag === "PLAYER") {
            console.log(this.powerUpType);
            const player = entity as Player;
            if(this.powerUpType === POWERUP_TYPE.HEALTH) {
                player.health += 20;
            }
            else {
                player.currentPowerUp = this.powerUpType;
            }
            this.destroy();

        }
    }

    onFrame() {
        super.onFrame();

        this.position.x -= 180/FPS;
        this.position.y = this.basePosition.y + Math.cos(this.sinCounter) * 30;

        this.sinCounter += 5/FPS;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.shape.draw(ctx);
    }
}