// PausableUpdate.ts
import { _decorator, Component } from 'cc';
import { PauseManager } from '../PauseManager';
const { ccclass, property } = _decorator;

@ccclass('PausableUpdate')
export class PausableUpdate extends Component {
    @property({ tooltip: '暂停组ID' })
    groupId: string = "default";
    
    @property({ tooltip: '在此组内的唯一标签' })
    tag: number = 0;
    
    @property({ tooltip: '是否自动注册', displayName: "Auto Register" })
    autoRegister: boolean = true;
    
    @property({ tooltip: '是否暂停lateUpdate', displayName: "Pause LateUpdate" })
    pauseLateUpdate: boolean = true;
    
    @property({ tooltip: '是否暂停fixedUpdate', displayName: "Pause FixedUpdate" })
    pauseFixedUpdate: boolean = true;
    
    private _isPaused = false;
    private _originalCallbacks: any = {};
    private _updateCallback: any = null;
    private _lateUpdateCallback: any = null;
    private _fixedUpdateCallback: any = null;

    onLoad() {
        if (this.autoRegister) {
            this.register();
        }
        
        // 保存原始回调
        this._originalCallbacks = {
            update: this.update,
            lateUpdate: this.lateUpdate
        };
        
        // 创建代理回调
        this._updateCallback = (deltaTime: number) => {
            if (!this._isPaused) this._originalCallbacks.update?.call(this, deltaTime);
        };
        
        this._lateUpdateCallback = (deltaTime: number) => {
            if (!this._isPaused || !this.pauseLateUpdate) {
                this._originalCallbacks.lateUpdate?.call(this, deltaTime);
            }
        };
        
        this._fixedUpdateCallback = (fixedDeltaTime: number) => {
            if (!this._isPaused || !this.pauseFixedUpdate) {
                this._originalCallbacks.fixedUpdate?.call(this, fixedDeltaTime);
            }
        };
        
        // 替换组件方法
        this.update = this._updateCallback;
        if (this.lateUpdate) this.lateUpdate = this._lateUpdateCallback;
    }

    onDestroy() {
        this.unregister();
        
        // 恢复原始方法
        this.update = this._originalCallbacks.update;
        this.lateUpdate = this._originalCallbacks.lateUpdate;
    }

    // 手动注册到暂停系统
    register() {
        PauseManager.instance.registerUpdateComponent(this.groupId, this.tag, this);
    }

    // 取消注册
    unregister() {
        PauseManager.instance.unregister(this.groupId, this.tag, 'update');
    }

    // 暂停Update
    pause() {
        this._isPaused = true;
    }

    // 恢复Update
    resume() {
        this._isPaused = false;
    }
    
    // 获取暂停状态
    get isPaused() {
        return this._isPaused;
    }
}