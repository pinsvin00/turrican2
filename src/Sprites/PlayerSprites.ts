
import {Sprite, SpriteBase} from "../Engine/Sprite";
import {Vector2} from "../Engine/utils";


const playerSpriteImage = document.getElementById("turrican-ss") as HTMLImageElement;
const runningSpriteImage = document.getElementById("running-ss") as HTMLImageElement;
export const playerSpriteBase = new SpriteBase(playerSpriteImage, new Vector2(35, 45));

    export const runningSpriteBase = new SpriteBase(runningSpriteImage, new Vector2(40, 40));

export const PLAYER_STANDING = new Sprite(new Vector2(0, 4), new Vector2(32, 42), runningSpriteBase);
export const PLAYER_JUMPING = new Sprite( new Vector2(36,4), new Vector2(32, 42), runningSpriteBase);
export const PLAYER_CROUCHING = new Sprite( new Vector2(68,17), new Vector2(34, 29), runningSpriteBase);
export const PLAYER_RUNNING: Array<Sprite> = [
    new Sprite( new Vector2(4, 48) ,  new Vector2(32, 38 ) , runningSpriteBase),
    new Sprite( new Vector2(40, 49) , new Vector2(32, 38 ), runningSpriteBase),
    new Sprite( new Vector2(76, 47) , new Vector2(31, 38), runningSpriteBase),
    new Sprite( new Vector2(111, 46) ,new Vector2(30, 40), runningSpriteBase),
    new Sprite( new Vector2(145, 46) ,new Vector2(24, 40), runningSpriteBase),
    new Sprite( new Vector2(173, 46) ,new Vector2(27, 41), runningSpriteBase),
    new Sprite( new Vector2(204, 46) ,new Vector2(28, 40), runningSpriteBase),
    new Sprite( new Vector2(236, 48) ,new Vector2(27, 38), runningSpriteBase),
    new Sprite( new Vector2(266, 48) ,new Vector2(29, 38), runningSpriteBase),
    new Sprite( new Vector2(299, 48) ,new Vector2(29, 38), runningSpriteBase),
    new Sprite( new Vector2(332, 46) ,new Vector2(30, 41), runningSpriteBase),
    new Sprite( new Vector2(365, 46) ,new Vector2(26, 40), runningSpriteBase),
    new Sprite( new Vector2(394, 46) ,new Vector2(29, 40), runningSpriteBase),
    new Sprite( new Vector2(427, 46) ,new Vector2(32, 40), runningSpriteBase),
];

export const PLAYER_FOCUS_SHOOTING : Array<Sprite> =[
    new Sprite( new Vector2(4, 89) ,  new Vector2(22, 42 ) , runningSpriteBase),
    new Sprite( new Vector2(30, 90) , new Vector2(22, 42 ), runningSpriteBase),
    new Sprite( new Vector2(56, 91) , new Vector2(22, 40), runningSpriteBase),
    new Sprite( new Vector2(83, 94) ,new Vector2(21, 38), runningSpriteBase),
    new Sprite( new Vector2(107, 93) ,new Vector2(22, 36), runningSpriteBase),
    new Sprite( new Vector2(134, 93) ,new Vector2(24, 36), runningSpriteBase),
    new Sprite( new Vector2(162, 93) ,new Vector2(27, 36), runningSpriteBase),
    new Sprite( new Vector2(193, 93) ,new Vector2(28, 37), runningSpriteBase),
    new Sprite( new Vector2(225, 93) ,new Vector2(28, 36), runningSpriteBase),
    new Sprite( new Vector2(257, 93) ,new Vector2(28, 36), runningSpriteBase),
    new Sprite( new Vector2(289, 93) ,new Vector2(25, 36), runningSpriteBase),
    new Sprite( new Vector2(318, 93) ,new Vector2(23, 36), runningSpriteBase),
    new Sprite( new Vector2(346, 93) ,new Vector2(21, 37), runningSpriteBase),
    new Sprite( new Vector2(369, 93) ,new Vector2(21, 36), runningSpriteBase),
    new Sprite( new Vector2(394, 93) ,new Vector2(22, 36), runningSpriteBase),
    new Sprite( new Vector2(420, 93) ,new Vector2(22, 36), runningSpriteBase),
]

export const PLAYER_NORMAL_TUMBLE = new Sprite(new Vector2(106, 25), new Vector2(19, 19), runningSpriteBase)