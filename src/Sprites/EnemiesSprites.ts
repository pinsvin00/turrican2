import {Sprite, SpriteBase} from "../Engine/Sprite";
import {Vector2} from "../Engine/utils";


export const sheet = document.getElementById("enemies-ss") as HTMLImageElement;
export const blocksSheet = document.getElementById("blocks-ss") as HTMLImageElement;
const base = new SpriteBase(sheet, Vector2.NULL_VEC());
const blocksBase = new SpriteBase(blocksSheet, Vector2.NULL_VEC());

export const DOGGO_1 = [
    new Sprite(new Vector2(4,6), new Vector2(25, 20), base),
    new Sprite(new Vector2(33,5), new Vector2(25, 21), base),
    new Sprite(new Vector2(62,6), new Vector2(27, 20), base),
    new Sprite(new Vector2(93,5), new Vector2(25, 21), base)
]

export const DOGGO_1_SLEEP = new Sprite(new Vector2(121,14), new Vector2(26, 13), base);
export const DOGGO_1_AWAKE = new Sprite(new Vector2(151,12), new Vector2(26, 14), base);

export const BEE = [
    new Sprite(new Vector2(385, 13), new Vector2(23, 13), base),
    new Sprite(new Vector2(412, 16), new Vector2(26, 10), base)
]

export const BLOCKS = new Sprite(new Vector2(0,0), new Vector2(640, 320), blocksBase);