// PauseManager.ts
import { _decorator, Component, director, tween, Scheduler, Animation, ISchedulable, TweenSystem } from 'cc';
import { PausableUpdate } from './PauseSupport/PausableUpdate';
const { ccclass } = _decorator;

type PauseGroup = {
    tweens: Map<number, any>; 
    spines: Map<number, any>; 
    schedulers: Map<number,ISchedulable>;
    animations: Map<number, Animation>; // 修改为Animation组件
    updateComponents: Map<number, PausableUpdate>; // 新增Update组件存储
};

export class PauseManager {
    private static _instance: PauseManager;
    private _groups: Map<string, PauseGroup> = new Map();
    private _globalPaused = false;
    private _groupStates: Map<string, boolean> = new Map();

    /**定时器对象列表 */
    scheduler_as: any[];
    /**缓动对象列表 */
    tween_target_as: any[];

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
                animations: new Map(), // 初始化Animation存储
                updateComponents: new Map() // 初始化Update存储
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
        group.tweens.forEach(action => action?.pause?.());
        
        // 暂停Spines
        group.spines.forEach(spine => spine?.pause?.());

        // 暂停调度器
        group.schedulers.forEach(target => director.getScheduler().pauseTarget(target));

        // 暂停Animations
        group.animations.forEach(anim => anim?.pause?.());
        
        // 暂停Update组件（新增）
        group.updateComponents.forEach(comp => comp?.pause?.());
    }

    // 恢复特定组
    resumeGroup(groupId: string) {
        const group = this._groups.get(groupId);
        if (!group) return;
        
        this._groupStates.set(groupId, false);

        // 恢复Tweens
        group.tweens.forEach(action => action?.resume?.());
        
        // 恢复Spines
        group.spines.forEach(spine => spine?.resume?.());
        // 恢复调度器
        group.schedulers.forEach(target => {
            if (target) {
                director.getScheduler().resumeTarget(target);
            }
        });

        // 恢复Animations
        group.animations.forEach(anim => anim?.play?.());
        
        // 恢复Update组件（新增）
        group.updateComponents.forEach(comp => comp?.resume?.());
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

    // 注册Update组件（新增）
    registerUpdateComponent(groupId: string, tag: number, comp: any) {
        this.registerGroupIfNeeded(groupId);
        this._groups.get(groupId)!.updateComponents.set(tag, comp);
    }

    // 取消注册
    unregister(groupId: string, tag: number, type: 'tween' | 'spine' | 'scheduler' | 'animation'  | 'update') {
        const group = this._groups.get(groupId);
        if (!group) return;
        
        switch (type) {
            case 'tween': group.tweens.delete(tag); break;
            case 'spine': group.spines.delete(tag); break;
            case 'scheduler': group.schedulers.delete(tag); break;
            case 'animation': group.animations.delete(tag); break;
            case 'update': group.updateComponents.delete(tag); break;
        }
    }

    // 全局暂停
    pauseAll() {
        if (this._globalPaused) return;
        this._globalPaused = true;
        
        this.tween_target_as = TweenSystem.instance.ActionManager.pauseAllRunningActions();
        this.scheduler_as = director.getScheduler().pauseAllTargets();
        
        // 暂停所有自定义组
        this._groups.forEach((_, groupId) => this.pauseGroup(groupId));
    }

    // 全局恢复
    resumeAll() {
        if (!this._globalPaused) return;
        this._globalPaused = false;
        
        TweenSystem.instance.ActionManager.resumeTargets(this.tween_target_as);
        director.getScheduler().resumeTargets(this.scheduler_as);
        
        // 恢复所有自定义组
        this._groups.forEach((_, groupId) => this.resumeGroup(groupId));
    }

    private registerGroupIfNeeded(groupId: string) {
        if (!this._groups.has(groupId)) {
            this.registerGroup(groupId);
        }
    }

    // 检查全局暂停状态
    get isGlobalPaused() {
        return this._globalPaused;
    }
}