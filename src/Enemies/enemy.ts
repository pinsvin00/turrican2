import {CollisionData, GameEntity, PhysicsEntity} from "../Engine/GameEntity";
import {Bullet} from "../Bullets/Bullet";
import {Player} from "../Player/player";
import {Game} from "../Game";

export class Enemy extends PhysicsEntity {

    damage = 10;
    health = 20;
    tag = "ENEMY";

    onCollision(entity: PhysicsEntity, collisionData: CollisionData) {
        super.onCollision(entity, collisionData);

        if(entity.tag === "GROUND") {
        }

        if(entity.tag === "BULLET") {
            const bullet = entity as Bullet;
            this.health -= bullet.damage;

            bullet.destroy();
        }
        if(entity.tag === "PLAYER") {
            const player = entity as Player;
            player.health -= this.damage;
            player.damageGuard = true;
        }
    }

    onFrame() {
        super.onFrame();
        if(this.health <= 0) {
            this.destroy();
            Game.player.score += 100;
        }
    }


}