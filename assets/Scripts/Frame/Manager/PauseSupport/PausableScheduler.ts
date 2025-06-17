import { _decorator, Component, Scheduler } from 'cc';
import { PauseManager } from '../PauseManager';
const { ccclass, property } = _decorator;

@ccclass('PausableScheduler')
export class PausableScheduler extends Component {
    @property({ tooltip: '暂停组ID' })
    groupId: string = "default";
    
    @property({ tooltip: '在此组内的唯一标签' })
    tag: number = 0;
    
    private _callback: any = null;

    registerScheduler(callback: any) {
        this._callback = callback;
        PauseManager.instance.registerScheduler(this.groupId, this.tag, this._callback);
    }

    onDestroy() {
        PauseManager.instance.unregister(this.groupId, this.tag, 'scheduler');
    }
}