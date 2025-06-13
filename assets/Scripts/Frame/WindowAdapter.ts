import { _decorator, Component, Node, view, Size, UITransform, screen } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WindowAdapter')
export class WindowAdapter extends Component {
    onLoad() {
        // console.log(screen.windowSize);
        // console.log(view.getVisibleSize());
        //通过固定高度的缩放比 可以算出可见宽度
        let visibleSize = view.getVisibleSize();
        let designSize = view.getDesignResolutionSize();
        let width = visibleSize.width > designSize.width ? designSize.width : visibleSize.width
        this.node.getComponent(UITransform).width = width;
    }
}


