import {Sprite} from "./Sprite";
import {GameEntity, IDrawable} from "./GameEntity";
import {radians, Vector2} from "./utils";
import {Engine} from "./Engine";


export class SpriteShape implements IDrawable {
    ptr : Sprite;
    origin = Vector2.NULL_VEC();
    flip = false;
    rotation = 0;



    constructor(public position: Vector2, public size: Vector2, currentSprite: Sprite) {
        this.ptr = currentSprite;

    }

    draw(ctx: CanvasRenderingContext2D) {

        ctx.save();
        const coords = this.ptr.position;
        const elemSize = this.ptr.size;

        const realPosition = this.position.subCopy(Engine.camera.worldOffest).addCopy(this.origin);

        ctx.translate(realPosition.x + this.size.x/2, realPosition.y + this.size.y/2);

        if(this.flip) {
            ctx.scale(-1, 1);
        }

        ctx.rotate(radians(this.rotation));


        ctx.drawImage(
            this.ptr.base.image,
            coords.x, coords.y,
            elemSize.x,elemSize.y,
            -this.size.x/2, -this.size.y/2,
            this.size.x,this.size.y
        )

        ctx.restore();
    }

}