import { _decorator, Component } from 'cc';
import { PauseManager } from '../PauseManager';
const { ccclass, property } = _decorator;

@ccclass('PausableTween')
export class PausableTween extends Component {
    @property({ tooltip: '暂停组ID' })
    groupId: string = "default";
    
    @property({ tooltip: '在此组内的唯一标签' })
    tag: number = 0;
    
    private _action: any = null;

    registerTween(action: any) {
        this._action = action;
        PauseManager.instance.registerTween(this.groupId, this.tag, this._action);
    }

    pause() {
        if (this._action) this._action.pause();
    }

    resume() {
        if (this._action) this._action.resume();
    }

    onDestroy() {
        PauseManager.instance.unregister(this.groupId, this.tag, 'tween');
    }
}