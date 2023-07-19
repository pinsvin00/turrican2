import {Sprite, SpriteBase} from "../Engine/Sprite";
import {Vector2} from "../Engine/utils";


export const spritesheet = document.getElementById("shoots-ss") as HTMLImageElement;
export const base = new SpriteBase(spritesheet, Vector2.NULL_VEC());

export const NORMAL_BULLET = [new Sprite(new Vector2(0, 2), new Vector2(16, 11), base)];



export const SPLASH_LEFT = new Sprite(new Vector2(224,48), new Vector2(16, 128), base);
export const SPLASH_RIGHT = new Sprite(new Vector2(256,48), new Vector2(16, 128), base);


export const BOUNCY_BIG = new Sprite(new Vector2(0, 80), new Vector2(15,15), base);
export const BOUNCY_SMALL = new Sprite(new Vector2(36, 84), new Vector2(7,7), base);

export const ENERGY_BALLS = [
    new Sprite(new Vector2(0, 119), new Vector2(32,36), base),
    new Sprite(new Vector2(32, 119), new Vector2(32,36), base),
    new Sprite(new Vector2(64, 119), new Vector2(32,36), base),
    new Sprite(new Vector2(64 + 32, 119), new Vector2(32,36), base)
]

