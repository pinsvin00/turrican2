import {IDrawable} from "./GameEntity";
import {canvasSize} from "../consts";
import {Level} from "../Level/Level";


export class Renderer {

    drawables: Array<IDrawable> = [];
    canvas : HTMLCanvasElement;
    ctx : CanvasRenderingContext2D;

    lvl: Level | null = null;

    constructor() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.drawables = [];

    }


    async clear() {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.clearRect(0, 0, canvasSize.x, canvasSize.y);
    }

    drawBackground() {
        if(this.lvl !== null) {
            this.lvl.draw(this.ctx);
        }
    }

    async generateFrame() {
        await this.clear();
        this.drawBackground();
        this.drawables.forEach(
             el => el.draw(this.ctx)
        );



        window.requestAnimationFrame( this.generateFrame.bind(this) );

    }
}