import {GameEntity} from "./GameEntity";


export class FrameCounter extends GameEntity {
    counter = 0;
    jump = 1;

    staticObject = true;


    constructor(public limit : number, public shouldRun : () => boolean = () => true , public callback: () => void = () => {} ) {
        super();
    }


    reset() {
        this.counter = 0;
    }

    onFrame() {
        if(!this.shouldRun()) return;
        this.counter += this.jump;
        if(this.counter === this.limit) {
            this.callback();
        }
    }


}