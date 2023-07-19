


export enum TYPES {
    COLLIDER,
    DOGGO,
    BEE,
    PLAYER,
    DESTROYABLE_BLOCK,
    POWERUP,
    ROCKET,
}

const stuff = document.getElementById("stuff") as HTMLElement;

class Base {

}

export class Enemy extends Base {
    x: number;
    y: number;

    name : string;

    constructor(x: number, y: number, name: string) {
        super();
        this.name = name;
        this.x = x;
        this.y = y;
    }
}


export class RectangleCollider {
    constructor(public x: number, public y: number, public w: number, public h : number) {
    }
}

export class Position {

    constructor(public x: number, public y: number) {


    }

}

export class Level {
    enemies: Enemy[] = [];
    colliders : Array<RectangleCollider> =  []
    powerups: Position[] = []
    blocks: Array<Position> = []
}

let type = TYPES.COLLIDER;

let point: MouseEvent | null = null;


function doggo(x: number, y: number) {
    const div = document.createElement('div');

    div.setAttribute("class", "collider");
    div.setAttribute("style", `
        position: absolute;
        width: ${50}px;
        height: ${50}px;
        top: ${y}px;
        left : ${x}px;
        color: white;
        z-index: 20;
    `);

    div.innerText = "doggo";

    stuff.appendChild(div);

    level.enemies.push(
        new Enemy(x, y, "DOGGO")
    );
}

function rocket(x: number, y: number) {
    const div = document.createElement('div');

    div.setAttribute("class", "collider");
    div.setAttribute("style", `
        position: absolute;
        width: ${50}px;
        height: ${50}px;
        top: ${y}px;
        left : ${x}px;
        color: white;
        z-index: 20;
    `);

    div.innerText = "rocket";

    stuff.appendChild(div);

    level.enemies.push(
        new Enemy(x, y, "ROCKET")
    );
}

function powerup(x: number, y: number) {
    const div = document.createElement('div');

    div.setAttribute("class", "collider");
    div.setAttribute("style", `
        position: absolute;
        width: ${50}px;
        height: ${50}px;
        top: ${y}px;
        left : ${x}px;
        color: white;
        z-index: 20;
    `);

    div.innerText = "powerup";

    stuff.appendChild(div);

    level.powerups.push(
        new Position(x, y)
    );
}


function block(x: number, y: number) {
    const div = document.createElement('div');

    div.setAttribute("class", "collider");
    div.setAttribute("style", `
        position: absolute;
        width: ${50}px;
        height: ${50}px;
        top: ${y}px;
        left : ${x}px;
        color: white;
        z-index: 20;
    `);

    div.innerText = "block";

    stuff.appendChild(div);

    level.blocks.push(
        new Position(x, y)
    );
}


function bee(x: number, y: number) {
    const div = document.createElement('div');

    div.setAttribute("class", "collider");
    div.setAttribute("style", `
        position: absolute;
        width: ${50}px;
        height: ${50}px;
        top: ${y}px;
        left : ${x}px;
        color: white;
        z-index: 20;
    `);

    div.innerText = "bee";

    stuff.appendChild(div);

    level.enemies.push(
        new Enemy(x, y, "BEE")
    );
}


function rectangle(x: number, y: number, w: number, h:number) {
    const div = document.createElement('div');

    div.setAttribute("class", "collider");
    div.setAttribute("style", `
        position: absolute;
        width: ${w}px;
        height: ${h}px;
        top: ${y}px;
        left : ${x}px;
        background-color: red;
        z-index: 20;
    `);
    div.innerText=  "a";

    stuff.appendChild(div);

    const collider = new RectangleCollider(
        x, y, w, h
    );

    level.colliders.push(collider);

}

const level = new Level()
let sus: Level = new Level();

function main() {


    let rect = document.createElement("div");
    stuff.appendChild(rect);

    const img = document.getElementById("cover") as HTMLImageElement;

    img.onmouseup = ( evnt: MouseEvent ) => {
        if(type !== TYPES.COLLIDER) return;

        evnt.preventDefault();
        if(!point) return;

        let x1 = evnt.pageX;
        let y1 = evnt.pageY;

        let x2 = point.pageX;
        let y2 = point.pageY;

        if(x1 >  x2) {
            [x1, x2] = [x2,x1]
        }
        if(y1 > y2) {
            [y1, y2] = [y2, y1]
        }

        rectangle(x1, y1 - 5, x2 - x1, y2 - y1);

        point = null;

        rect.setAttribute("style", "display: none");
    };

    img.onmousedown = (evnt : MouseEvent) => {
        evnt.preventDefault();
        console.log("mouse down")

        if(type === TYPES.COLLIDER) {
            if(point === null) {
                point = evnt;
            }
            return;
        }

        if(type === TYPES.DOGGO) {
            doggo(evnt.pageX, evnt.pageY);
        }

        if(type === TYPES.BEE) {
            bee(evnt.pageX, evnt.pageY);
        }
        const x = evnt.pageX;
        const y = evnt.pageY;
        if(type === TYPES.ROCKET) {
            rocket(x,y);
        }
        if(type === TYPES.POWERUP) {
            powerup(x,y);
        }
        if(type === TYPES.DESTROYABLE_BLOCK) {
            block(x,y);
        }


        point = evnt;
    }

    async function load() {

        const json = await window.prompt() as string;

        sus  = JSON.parse(json);

        sus.colliders.forEach(el => {
            rectangle(el.x, el.y, el.w, el.h);
        })

        sus.enemies.forEach(el => {
            if(el.name === "DOGGO") {
                doggo(el.x, el.y);
            }
            else if(el.name === "BEE") {
                bee(el.x, el.y)
            }
            else if(el.name === "ROCKET") {
                rocket(el.x, el.y);
            }
        })

        sus.powerups.forEach(el => {
            powerup(el.x, el.y);
        })
    }

    document.onkeydown = (evnt: KeyboardEvent) => {
        const key = evnt.key.toUpperCase();

        if(key === "D") {
            type = TYPES.DOGGO;
        }

        if(key === "B") {
            type = TYPES.BEE;
        }

        if(key === "P") {
            type = TYPES.PLAYER;
        }

        if (key === "O") {
            type = TYPES.POWERUP
        }

        if(key === "R") {
            type = TYPES.ROCKET;
        }

        if(key === "C") {
            type = TYPES.COLLIDER;
        }

        if(key === "Z") {
            const collidersDom = document.getElementsByClassName("collider");
            console.log(collidersDom);
            stuff.removeChild(collidersDom[collidersDom.length - 1]);
            level.enemies.pop();
        }

        if(key === "L") {
            load();
        }

        if(key === "S") {
            console.log(level);
        }
    }
}

main();
