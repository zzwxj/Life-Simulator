import { CCInteger, Component, Sprite, SpriteFrame, _decorator } from "cc";
const { ccclass, property, executeInEditMode, requireComponent, menu } = _decorator;
@ccclass
@executeInEditMode
@requireComponent(Sprite)
@menu("UI/SpriteEx Index(帧图改变)")
export class SpriteEx extends Component {
    @property({
        type: [SpriteFrame],
        tooltip: 'sprite将会用到帧图片'
    })
    spriteFrames: Array<SpriteFrame | null> = [null];

    @property({
        type: CCInteger,
        tooltip: '当前显示的帧图'
    })
    get index() {
        return this._index;
    }
    set index(value: number) {
        if (value < 0) return;
        this._index = value % this.spriteFrames.length;
        let sprite = this.node.getComponent(Sprite)!;
        //设置 Sprite 组件的spriteFrame属性，变换图片               
        sprite.spriteFrame = this.spriteFrames[this._index];
    }

    @property
    private _index: number = 0;

}