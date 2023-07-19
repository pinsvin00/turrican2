// wrapper for "class" Camera (avoid global objects)

import {RectangleCollider, Vector2} from "./utils";
import {GameEntity} from "./GameEntity";
import {Rectangle} from "./Rectangle";
import {Engine} from "./Engine";



export class Camera {
    followed : GameEntity | null = null;
    viewportRect = new Rectangle(Vector2.NULL_VEC(), Vector2.NULL_VEC());
    deadZone = Vector2.NULL_VEC();

    follow(entity: GameEntity, deadZone : Vector2) {
        this.followed = entity;
        this.deadZone = deadZone;
    }

        constructor(public worldOffest: Vector2, public viewportSize: Vector2, public worldSize: Vector2) {
    }

    leftCameraBound() {
        if(!this.followed) return 0;

        const centre = this.followed?.position;
        return centre.x - this.viewportSize.x/2;
    }

    rightCameraBound() {
        if(!this.followed) return 0;

        const centre = this.followed?.position;
        return centre.x - this.viewportSize.x/2;
    }

    topCameraBound() {
        if(!this.followed) return 0;

        const centre = this.followed?.position;
        return centre.y - this.viewportSize.x/2;
    }

    bottomCameraBound() {
        if(!this.followed) return 0;

        const centre = this.followed?.position;
        return centre.y + this.viewportSize.y/2;
    }

    onFrame() {
        if (this.followed != null) {

            const realPosition = this.followed.position.subCopy(this.worldOffest);

            if( Math.abs(realPosition.x - this.deadZone.x) > 70) {
                this.worldOffest.x = this.followed.position.x - (this.viewportSize.x - this.deadZone.x);
                if (realPosition.x - this.deadZone.x > 0) {
                    this.worldOffest.x -= 70;
                } else {
                    this.worldOffest.x += 70;
                }

                if (this.leftCameraBound() < 0) {
                    this.worldOffest.x -= this.leftCameraBound();
                }

                if (this.rightCameraBound() > this.worldSize.x) {
                    this.worldOffest.x += this.rightCameraBound();
                }


            }

            if(Math.abs(realPosition.y - 300) > 70) {
                this.worldOffest.y = this.followed.position.y - (this.viewportSize.y - this.deadZone.y);

                if (realPosition.y - this.deadZone.y > 0) {
                    this.worldOffest.y -= 70;
                } else {
                    this.worldOffest.y += 70;
                }


                // if (this.topCameraBound() < 0) {
                //     this.worldOffest.y -= this.topCameraBound();
                // }

            }
        }

    }

}
