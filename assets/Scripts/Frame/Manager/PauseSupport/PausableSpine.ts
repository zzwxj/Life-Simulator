import { _decorator, Component, sp } from 'cc';
import { PauseManager } from '../PauseManager';
const { ccclass, property } = _decorator;

@ccclass('PausableSpine')
export class PausableSpine extends Component {
    @property({ tooltip: '暂停组ID' })
    groupId: string = "default";
    
    @property({ tooltip: '在此组内的唯一标签' })
    tag: number = 0;
    
    private _spine: sp.Skeleton | null = null;
    private _lastTimeScale = 1;

    onLoad() {
        this._spine = this.getComponent(sp.Skeleton);
        PauseManager.instance.registerSpine(this.groupId, this.tag, this);
    }

    onDestroy() {
        PauseManager.instance.unregister(this.groupId, this.tag, 'spine');
    }

    pause() {
        if (!this._spine) return;
        this._lastTimeScale = this._spine.timeScale;
        this._spine.timeScale = 0;
    }

    resume() {
        if (!this._spine) return;
        this._spine.timeScale = this._lastTimeScale;
    }
}