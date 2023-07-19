import {Engine} from "./Engine/Engine";
import {Player} from "./Player/player";
import {Color, Vector2} from "./Engine/utils";
import {Doggo} from "./Enemies/Doggo";
import {Bee} from "./Enemies/Bee";
import {Level} from "./Level/Level";
import {ScreenReveal} from "./misc/ScreenReveal";


class DOMInterfaceHandler {

    game: Game;

    constructor(game: Game) {
        this.game = game;

    }


    lifesDOM = document.getElementById("lifes") as HTMLElement;
    scoreDOM = document.getElementById("score") as HTMLElement;
    starsDOM = document.getElementById("stars") as HTMLElement;
    specialsDOM = document.getElementById("specials") as HTMLElement;
    timeDOM = document.getElementById("time") as HTMLElement;
    healthDOM = document.getElementById("health-bar") as HTMLElement;


    updateHealthBar() {

        const player = Game.player;

        const healthPercent  = (player.health / 100);
        const to100 = 1 - healthPercent;

        const color = new Color(255 * to100, player.health * 255, 0 );

        this.healthDOM.setAttribute("style", `
            width: ${healthPercent * 140}px;
            background-color : ${color.toString()};
        `)
    }

    getFilledText(len: number, curr: string) {
        while(len !== curr.length) {
            curr = "0" + curr;
        }

        return curr;
    }

    update(){

        if(this.game.timeLeft <= 0) {
            window.alert("Koniec gry!");
            window.location.reload();
        }

        this.lifesDOM.innerText = this.getFilledText(2, Game.player.lives.toString() );
        this.scoreDOM.innerText = this.getFilledText(6, Game.player.score.toString() );
        this.timeDOM.innerText = this.getFilledText(4, this.game.timeLeft.toString() );
        this.starsDOM.innerText = this.getFilledText(2, Game.player.stars.toString() );
        this.specialsDOM.innerText = this.getFilledText(2, Game.player.splashes.toString() );

        this.updateHealthBar();
    }
}

export class Game {
    score = 0;

    timeLeft = 356;



    static player : Player;
    interfaceHandler = new DOMInterfaceHandler(this);


    startListeners() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            Game.player.controller.keyPressed(event.key.toUpperCase());
        })

        document.addEventListener('keyup', (event: KeyboardEvent) => {
            Game.player.controller.keyReleased(event.key.toUpperCase());
        })
    }

    startIntervals() {
        setTimeout(( ) => {
            const music = new Audio("res/1.mp3");
            music.volume = 0.5;
            music.play();

        }, 2000);

        setInterval(() => {
            this.interfaceHandler.update();
        }, 300)

        setInterval(() => {
            this.timeLeft -= 1;
        }, 1000)
    }

    constructor() {
        const engine = new Engine();


        engine.initiateRenderer();
        engine.startLoop();










        this.startListeners();
        this.startIntervals();
        engine.renderer.lvl = new Level("res/level.jpg", {});

        Game.player = new Player();
        Game.player.position.y = 2500;
        Game.player.position.x = 100;

        engine.renderer.lvl.load()




        const screenReveal = new ScreenReveal();
        Engine.camera.follow(
            Game.player,
            new Vector2(400, 300 ),
        )
    }

}

const game = new Game();