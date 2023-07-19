import {Sprite, SpriteBase} from "../Engine/Sprite";
import {Vector2} from "../Engine/utils";


const pickupSS = document.getElementById("pickup-ss") as HTMLImageElement;
const base = new SpriteBase(pickupSS, Vector2.NULL_VEC());


export const HEALTH = new Sprite(new Vector2(113, 44), new Vector2(16, 16), base);
export const GREEN_PICKUP = new Sprite(new Vector2(4, 4), new Vector2(16, 16), base);