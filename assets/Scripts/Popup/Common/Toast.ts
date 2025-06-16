import { _decorator, Component, Node, Label, tween, Vec3, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Toast')
export class Toast extends Component {
    @property(Label)
    Text: Label = null;


    init(txt: string) {
        this.Text.string = txt;
        if (this.node)
            this.node.setScale(0.6, 0.6);
        this.playAnimation();
    }

    playAnimation() {
        tween(this.node)
            .to(0.2, { scale: v3(1.15, 1.15, 1.15) }, { easing: 'sineIn' })
            .to(0.2, { scale: v3(1, 1, 1) }, { easing: 'sineOut' })
            .delay(0.2)
            .by(0.5, { position: v3(0, 115, 0) })
            .call(() => {
                this.node.destroy();
            }).start();
    }
}


