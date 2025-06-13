import { Component } from "cc";
import { GameDefine } from "../GameDefine";
import GameController from "./GameController";

export default class BaseComponent extends Component {

    //固定帧计时
    private _time = 0;

    protected childUpdate(dt: number): void {

    }

    private getNodeItem(): void{
        
    }

    protected update(dt: number): void {
        if (GameController.pause_data.state_b) {
            return;
        }
        this._time += dt;

        while (this._time >= GameDefine.frameTime) {
            this.childUpdate(GameDefine.frameTime);
            this._time -= GameDefine.frameTime;
        }
    }
}
