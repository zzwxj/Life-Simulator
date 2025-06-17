import { _decorator, Component, Animation } from 'cc';
import { PauseManager } from '../PauseManager';
const { ccclass, property } = _decorator;

@ccclass('PausableAnimation')
export class PausableAnimation extends Component {
    @property({ tooltip: '暂停组ID' })
    groupId: string = "default";
    
    @property({ tooltip: '在此组内的唯一标签' })
    tag: number = 0;
    
    @property({ tooltip: '是否自动注册', displayName: "Auto Register" })
    autoRegister: boolean = true;
    
    private _animation: Animation | null = null;
    private _isPaused = false;
    private _lastState: any = null;

    onLoad() {
        this._animation = this.getComponent(Animation);
        
        if (this.autoRegister && this._animation) {
            this.register();
        }
    }

    onDestroy() {
        this.unregister();
    }

    register() {
        if (this._animation) {
            PauseManager.instance.registerAnimation(this.groupId, this.tag, this._animation);
        }
    }

    unregister() {
        PauseManager.instance.unregister(this.groupId, this.tag, 'animation');
    }

    pause() {
        if (!this._animation || this._isPaused) return;
        this._isPaused = true;
      
        // this._lastState = {
        //     isPlaying: this._animation._crossFade.isPlaying,
        //     currentClip: this._animation.currentClip,
        //     time: this._animation.getState(this._animation.currentClip?.name || '').time
        // };
        
        this._animation.pause();
    }

    resume() {
        if (!this._animation || !this._isPaused) return;
        this._isPaused = false;
        
        // if (this._lastState && this._lastState.isPlaying) {
        //     this._animation.play(this._lastState.currentClip?.name);
            
        //     this.scheduleOnce(() => {
        //         if (this._animation && this._lastState) {
        //             const state = this._animation.getState(this._lastState.currentClip?.name || '');
        //             if (state) {
        //                 state.time = this._lastState.time;
        //             }
        //         }
        //     }, 0);
        // }
        this._animation.resume();
    }

    play(clipName: string) {
        if (!this._animation) return;
        this._isPaused = false;
        this._animation.play(clipName);
    }
}