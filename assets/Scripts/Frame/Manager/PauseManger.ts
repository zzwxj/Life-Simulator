// PauseManager.ts
import { _decorator, Component, director, tween, Scheduler, Animation, ISchedulable } from 'cc';
const { ccclass } = _decorator;

type PauseGroup = {
    tweens: Map<number, any>; 
    spines: Map<number, any>; 
    //schedulers: Map<number, {target:ISchedulable,cbk:Function}>;
    animations: Map<number, Animation>; // 修改为Animation组件
};

export class PauseManager {
    private static _instance: PauseManager;
    private _groups: Map<string, PauseGroup> = new Map();
    private _globalPaused = false;
    private _groupStates: Map<string, boolean> = new Map();

    public static get instance(): PauseManager {
        if (!PauseManager._instance) {
            PauseManager._instance = new PauseManager();
        }
        return PauseManager._instance;
    }

    // 注册暂停组
    registerGroup(groupId: string) {
        if (!this._groups.has(groupId)) {
            this._groups.set(groupId, {
                tweens: new Map(),
                spines: new Map(),
                schedulers: new Map(),
                animations: new Map() // 初始化Animation存储
            });
            this._groupStates.set(groupId, false);
        }
    }

    // 检查组是否暂停
    isGroupPaused(groupId: string): boolean {
        return this._groupStates.get(groupId) || false;
    }

    // 暂停特定组
    pauseGroup(groupId: string) {
        const group = this._groups.get(groupId);
        if (!group) return;
        
        this._groupStates.set(groupId, true);

        // 暂停Tweens
        group.tweens.forEach(action => {
            if (action && typeof action.pause === 'function') {
                action.pause();
            }
        });

        // 暂停Spines
        group.spines.forEach(spine => {
            if (spine && spine.pause) {
                spine.pause();
            }
        });

        // 暂停调度器
        group.schedulers.forEach(obj => {
            if (obj) {
                director.getScheduler().unschedule(obj.cbk,obj.target);
            }
        });

        // 暂停Animations
        group.animations.forEach(anim => {
            if (anim && anim.node.active) {
                anim.pause();
            }
        });
    }

    // 恢复特定组
    resumeGroup(groupId: string) {
        const group = this._groups.get(groupId);
        if (!group) return;
        
        this._groupStates.set(groupId, false);

        // 恢复Tweens
        group.tweens.forEach(action => {
            if (action && typeof action.resume === 'function') {
                action.resume();
            }
        });

        // 恢复Spines
        group.spines.forEach(spine => {
            if (spine && spine.resume) {
                spine.resume();
            }
        });

        // 恢复调度器
        group.schedulers.forEach(obj => {
            if (obj) {
                director.getScheduler().schedule(obj.cbk,obj.target);
            }
        });

        // 恢复Animations
        group.animations.forEach(anim => {
            if (anim && anim.node.active) {
                anim.play();
            }
        });
    }

    // 注册Tween动画
    registerTween(groupId: string, tag: number, action: any) {
        this.registerGroupIfNeeded(groupId);
        this._groups.get(groupId)!.tweens.set(tag, action);
    }

    // 注册Spine动画
    registerSpine(groupId: string, tag: number, spine: any) {
        this.registerGroupIfNeeded(groupId);
        this._groups.get(groupId)!.spines.set(tag, spine);
    }

    // 注册调度器
    registerScheduler(groupId: string, tag: number, callback: any) {
        this.registerGroupIfNeeded(groupId);
        this._groups.get(groupId)!.schedulers.set(tag, callback);
    }

    // 注册Animation组件
    registerAnimation(groupId: string, tag: number, anim: Animation) {
        this.registerGroupIfNeeded(groupId);
        this._groups.get(groupId)!.animations.set(tag, anim);
    }

    // 取消注册
    unregister(groupId: string, tag: number, type: 'tween' | 'spine' | 'scheduler' | 'animation') {
        const group = this._groups.get(groupId);
        if (!group) return;
        
        switch (type) {
            case 'tween':
                group.tweens.delete(tag);
                break;
            case 'spine':
                group.spines.delete(tag);
                break;
            case 'scheduler':
                group.schedulers.delete(tag);
                break;
            case 'animation':
                group.animations.delete(tag);
                break;
        }
    }

    // 全局暂停
    pauseAll() {
        if (this._globalPaused) return;
        this._globalPaused = true;
        
        tween.pauseAll();
        director.getScheduler().pauseAllTargets();
        
        // 暂停所有自定义组
        this._groups.forEach((_, groupId) => {
            this.pauseGroup(groupId);
        });
    }

    // 全局恢复
    resumeAll() {
        if (!this._globalPaused) return;
        this._globalPaused = false;
        
        tween.resumeAll();
        director.getScheduler().resumeAllTargets();
        
        // 恢复所有自定义组
        this._groups.forEach((_, groupId) => {
            this.resumeGroup(groupId);
        });
    }

    private registerGroupIfNeeded(groupId: string) {
        if (!this._groups.has(groupId)) {
            this.registerGroup(groupId);
        }
    }
}