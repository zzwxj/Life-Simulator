import { _decorator, BlockInputEvents, Component, log, Node, tween, UI, UIOpacity, UITransform, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('animationUI')
export class animationUI extends Component {
    @property(Node)
    mask:Node;
    private _during = 0.3;
    private _closeDuring = 0.1;
    private _blocker: Node = null;
    protected onLoad(): void {
        let blocker = this.node.getChildByName('blocker');
        if (!blocker) {
            let blocker = new Node('blocker');
            blocker.addComponent(BlockInputEvents);
            blocker.addComponent(UITransform);
            blocker.parent = this.node;
            blocker.getComponent(UITransform).setContentSize(this.node.getComponent(UITransform).contentSize);
            this._blocker = blocker;
        }
        else {
            this._blocker = blocker;
        }
    }


    // close(com: Function) {
    //     this._blocker.active = true;
    //     let bg = this.node.getChildByName('Bg');
    //     let content = this.node.getChildByName('Content');
    //     if (bg.getComponent(UIOpacity)) {
    //         tween(bg.getComponent(UIOpacity)).to(this._during, { opacity: 0 }, { easing: 'backIn' }).start();
    //     }
    //     else {
    //         bg.addComponent(UIOpacity);
    //         tween(bg.getComponent(UIOpacity)).to(this._during, { opacity: 0 }, { easing: 'backIn' }).start();
    //     }
    //     tween(content).to(this._during, { scale: v3(0.5, 0.5, 0.5) }).call(() => {
    //         this._blocker.active = false;
    //         com && com();
    //     }).start();
    // }

    // open(com: Function) {
    //     this._blocker.active = true;
    //     let bg = this.node.getChildByName('Bg');
    //     let content = this.node.getChildByName('Content');
    //     if (bg.getComponent(UIOpacity)) {
    //         bg.getComponent(UIOpacity).opacity = 0;
    //         tween(bg.getComponent(UIOpacity)).to(this._during, { opacity: 255 }, { easing: 'backOut' }).start();
    //     }
    //     else {
    //         bg.addComponent(UIOpacity);
    //         bg.getComponent(UIOpacity).opacity = 0;
    //         tween(bg.getComponent(UIOpacity)).to(this._during, { opacity: 255 }, { easing: 'backOut' }).start();
    //     }
    //     content.setScale(0.5, 0.5, 0.5);
    //     tween(content).to(this._during, { scale: v3(1, 1, 1) }).call(() => {
    //         this._blocker.active = false;
    //         com && com();
    //     }).start();
    // }

    open(com: Function) {
        this._blocker.active = true;
        if (this.node.getComponent(UIOpacity)) {
            this.node.getComponent(UIOpacity).opacity = 0;
            tween(this.node.getComponent(UIOpacity)).to(this._during, { opacity: 255 }, { easing: 'backOut' }).start();
        }
        else {
            this.node.addComponent(UIOpacity);
            this.node.getComponent(UIOpacity).opacity = 0;
            tween(this.node.getComponent(UIOpacity)).to(this._during, { opacity: 255 }, { easing: 'backOut' }).start();
        }
        this.scheduleOnce(() => {
            if(this.mask) this.mask.setScale(2,2,1);
            this.node.setScale(0.5, 0.5, 1);
            tween(this.node).to(this._during, { scale: v3(1, 1, 1) },{easing: 'backOut'}).call(() => {
                this._blocker.active = false;
                com && com();
            }).start();
        });
    }

    close(com: Function) {
        this._blocker.active = true;
        if (this.node.getComponent(UIOpacity)) {
            tween(this.node.getComponent(UIOpacity)).to(this._closeDuring, { opacity: 0 }, { easing: 'backIn' }).start();
        }
        else {
            this.node.addComponent(UIOpacity);
            tween(this.node.getComponent(UIOpacity)).to(this._closeDuring, { opacity: 0 }, { easing: 'backIn' }).start();
        }
        tween(this.node).to(this._closeDuring, { scale: v3(0.5, 0.5, 0.5) }).call(() => {
            this._blocker.active = false;
            com && com();
        }).start();
    }

}


