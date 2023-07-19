import {Player} from "../Player/player";
import {PhysicsEntity, GameEntity} from "./GameEntity";
import {Renderer} from "./renderer";
import {FPS, LEFT_KEY, RIGHT_KEY, UP_KEY} from "../consts";
import {Block} from "./Block";
import {RectangleCollider, Vector2} from "./utils";
import {Camera} from "./camera";
import {Rectangle} from "./Rectangle";


export class Engine {

    static camera: Camera;

    static freeze = false;

    static entities : Array<GameEntity> = [];
    static physicsEntities : Array<PhysicsEntity> = [];
    renderer: Renderer = new Renderer();


    isInViewPort(position: Vector2) {
        const right = Engine.camera.rightCameraBound();
        const top = Engine.camera.topCameraBound();


        const funnyRect = new RectangleCollider(
            new Vector2(position.x, position.y),
            new Vector2(20, 20)
        )

        const cameraRect = new RectangleCollider(
            new Vector2(right, top),
            new Vector2(1200, 1000)
        )

        return cameraRect.isColliding(funnyRect)

    }


    gameLoop() {
        if(Engine.freeze) return;

        Engine.camera.onFrame();
        Engine.entities.forEach(el => {
            if(el.staticObject || this.isInViewPort(el.position)) {
                el.onFrame();
            }
        })
    }

    startLoop() {
        setInterval(this.gameLoop.bind(this), 1000/FPS);
    }

    constructor() {

        Engine.camera = new Camera(
            new Vector2(0, 0), //view
            new Vector2(800, 600), // viewport size
            new Vector2(13120, 2700)
        )

    }




    initiateRenderer() {

        console.log("Initiating renderer....");
        this.renderer = new Renderer();
        this.renderer.drawables = Engine.entities;

        window.requestAnimationFrame( this.renderer.generateFrame.bind(this.renderer) );
        console.log("Renderer initiated successfully.");
    }
}

