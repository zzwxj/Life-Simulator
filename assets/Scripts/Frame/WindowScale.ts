import { _decorator, Component, Node } from 'cc';
import { Util } from './Util';
const { ccclass, property } = _decorator;

@ccclass('WindowScale')
export class WindowScale extends Component {
    start() {
        let scale = Util.adapterScale();
        this.node.setScale(scale, scale);
    }
}


