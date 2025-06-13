/*
 * @Author: dgflash
 * @Date: 2022-04-14 17:08:01
 * @LastEditors: dgflash
 * @LastEditTime: 2022-04-14 18:15:42
 */
import { EventHandler, EventTouch, _decorator } from "cc";
import ButtonEffect from "./ButtonEffect";

const { ccclass, property, menu } = _decorator;

/** 长按按钮 */
@ccclass("ButtonTouchLong")
@menu('ui/button/ButtonTouchLong')
export class ButtonTouchLong extends ButtonEffect {
    @property({
        tooltip: "长按时间（秒）"
    })
    time: number = 1;

    @property({
        type: [EventHandler],
        tooltip: "长按时间（秒）"
    })
    clickEvents: EventHandler[] = [];

    protected _passTime = 0;
    protected _isTouchLong: boolean = true;
    protected _event: EventTouch | null = null;

    onLoad() {
        this._isTouchLong = false;
        super.onLoad();
    }

    /** 触摸开始 */
    onTouchtStart(event: EventTouch) {
        this._event = event;
        this._passTime = 0;
        super.onTouchtStart(event);
    }

    /** 触摸结束 */
    onTouchEnd(event: EventTouch) {
        let longEventType = ButtonTouchLongEventType.TouchEnd;
        if (this._passTime > this.time) {
            event.propagationStopped = true;
            longEventType = ButtonTouchLongEventType.LongTouchEnd;
        }
        this._event = null;
        this._passTime = 0;
        this._isTouchLong = false;

        this.clickEvents.forEach(event => {
            event.emit([event.customEventData,longEventType]);
        });

        super.onTouchEnd(event);
    }

    removeTouchLong() {
        this._event = null;
        this._isTouchLong = false;
    }

    /** 引擎更新事件 */
    update(dt: number) {
        if (this._event && !this._isTouchLong) {
            this._passTime += dt;

            if (this._passTime >= this.time) {
                this._isTouchLong = true;
                this.clickEvents.forEach(event => {
                    event.emit([event.customEventData,ButtonTouchLongEventType.LongTouch]);
                    // 长按触摸音效
                    this.playEffect();
                });
                this.removeTouchLong();
            }
        }
    }
}

export enum ButtonTouchLongEventType{
    //触发长按
    LongTouch = 1,
    //长按结束
    LongTouchEnd = 2,
    //短按结束
    TouchEnd = 3
}
