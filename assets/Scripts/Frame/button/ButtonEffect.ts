/*
 * @Author: dgflash
 * @Date: 2023-01-30 14:00:41
 * @LastEditors: dgflash
 * @LastEditTime: 2023-02-09 10:54:28
 */
import { Animation, AnimationClip, EventTouch, Node, Sprite, _decorator } from "cc";
import ButtonSimple from "./ButtonSimple";

const { ccclass, property, menu } = _decorator;

/** 有特效短按按钮 */
@ccclass("ButtonEffect")
@menu('ui/button/ButtonEffect')
export default class ButtonEffect extends ButtonSimple {
    /** 按钮禁用效果 */
    get grayscale(): boolean {
        return this.node.getComponent(Sprite)!.grayscale;
    }
    set grayscale(value: boolean) {
        if (this.node.getComponent(Sprite)) {
            this.node.getComponent(Sprite)!.grayscale = value;
        }
    }

    onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchtStart, this);

        super.onLoad();
    }

    protected onTouchtStart(event: EventTouch) {
        
    }

    protected onTouchEnd(event: EventTouch) {
        super.onTouchEnd(event);
    }


    onDestroy() {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchtStart, this);
        super.onDestroy();
    }
}