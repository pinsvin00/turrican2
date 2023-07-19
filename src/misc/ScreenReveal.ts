import {GameEntity} from "../Engine/GameEntity";
import {SpriteShape} from "../Engine/SpriteShape";
import {Engine} from "../Engine/Engine";
import {Rectangle} from "../Engine/Rectangle";
import {sleep, Vector2} from "../Engine/utils";
import {PLAYER_STANDING} from "../Sprites/PlayerSprites";


export class ScreenReveal extends  GameEntity{

    sprites: SpriteShape[] = [];

    cols = 8;
    rows = 6;



    constructor() {
        super();
        for (let i = 0; i< this.cols; i++  ) {
            for (let j = 0; j< this.rows; j++  ) {
                const sprite = new SpriteShape(
                    new Vector2(i * 10, j * 10),
                    new Vector2(100,100),
                    PLAYER_STANDING
                )
                this.sprites.push(sprite)
            }
        }

        this.reveal();

    }

    async reveal() {
        for (let i = 0; i < 10; i++) {
            this.sprites.forEach(el => {
                el.size.div(2);
            })
            await sleep(100);
        }
    }



    draw(ctx: CanvasRenderingContext2D) {
        this.sprites.forEach(el => {
            el.draw(ctx);
        })
    }

}