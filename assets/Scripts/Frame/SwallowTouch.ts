import { _decorator, Component, EventTouch, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SwallowTouch')
export class SwallowTouch extends Component {
    protected onLoad(): void {
        this.node.on(Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.node.on(Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
        this.node.on(Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.on(Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this);
    }

    protected onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.node.off(Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
        this.node.off(Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.off(Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this);
    }

    onTouchStart(event: EventTouch){
        event.preventSwallow = true;
    }

    onTouchMove(event: EventTouch){
        event.preventSwallow = true;
    }

    onTouchEnd(event: EventTouch){
        event.preventSwallow = true;
    }

    onTouchCancel(event: EventTouch){
        event.preventSwallow = true;
    }
}


