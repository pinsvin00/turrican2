import {RectangleCollider, Vector2} from "../Engine/utils";

import * as data from './1.json';
import {IDrawable, PhysicsEntity} from "../Engine/GameEntity";
import {Doggo} from "../Enemies/Doggo";
import {Bee} from "../Enemies/Bee";
import {SpriteShape} from "../Engine/SpriteShape";
import {Sprite, SpriteBase} from "../Engine/Sprite";
import {Game} from "../Game";
import {PowerUp, POWERUP_TYPE} from "../misc/PowerUp";


const ENEMY_NAME_CLASS = {
    "DOGGO" : Doggo,
    "BEE": Bee,
}

export class Level extends PhysicsEntity {

    res = "res/lvl/1.jpeg";
    data: any;
    tag ="GROUND";
    calculateGravity = false;

    origin = Vector2.NULL_VEC();
    colliders: RectangleCollider[] = [];
    lvlSprite: SpriteShape;
    imageBuffer: HTMLImageElement;

    size: Vector2;
    position = Vector2.NULL_VEC();

    constructor(res: string, data: any) {
        super();

        this.res = res;

        this.data = data;

        this.imageBuffer = document.getElementById("lvl-img") as HTMLImageElement;

        this.imageBuffer.src = res;
        this.size = new Vector2(this.imageBuffer.naturalWidth, this.imageBuffer.naturalHeight);

        this.lvlSprite = new SpriteShape(
            new Vector2(0,0),
            new Vector2(this.size.x, this.size.y),
            new Sprite(
                new Vector2(0, 0 ),
                new Vector2(this.imageBuffer.naturalWidth,
                    this.imageBuffer.naturalHeight),
                new SpriteBase(this.imageBuffer, Vector2.NULL_VEC())
            )
        )
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.lvlSprite.draw(ctx);
    }



    load() {
        data.colliders.forEach(el => {
            this.colliders.push(
                new RectangleCollider(
                    new Vector2(el.x, el.y),
                    new Vector2(el.w, el.h),
                )
            )


            
        })


        data.enemies.forEach(el => {
            if(el.name === "DOGGO") {
                new Doggo(new Vector2(el.x, el.y), Game.player.position)
            }
            if(el.name === "BEE") {
                new Bee(new Vector2(el.x, el.y), new Vector2(0,0))
            }
        })

        data.powerups.forEach(el => {
            new PowerUp(new Vector2(el.x, el.y))
        })

        // data.enemies.forEach(el => {
        //     const enemyClass = ENEMY_NAME_CLASS[el.name]
        // })

    }

}