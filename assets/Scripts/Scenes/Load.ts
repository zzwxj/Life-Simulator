import { _decorator, Component, director, Node } from 'cc';
import { OpenPopupManager } from '../Frame/OpenPopupManager';
const { ccclass, property } = _decorator;

@ccclass('Load')
export class Load extends Component {
    @property(Node)
    PersistRoot: Node = null;

     private _isLoad: boolean = false;

    loading_finish: boolean = false;

    protected onLoad(): void {
        this.initPopupLayer();
    }

    start() {

    }

    /* 初始化弹窗提示层 */
    initPopupLayer() {
        if(OpenPopupManager.instance.TopLayer != null){
            this._isLoad = true;
            return;
        }
        director.addPersistRootNode(this.PersistRoot);
        OpenPopupManager.instance.TopLayer = this.PersistRoot.getChildByName('Top');
        OpenPopupManager.instance.MidLayer = this.PersistRoot.getChildByName('Middle');
        OpenPopupManager.instance.BottomLayer = this.PersistRoot.getChildByName('Bottom');
        OpenPopupManager.instance.ToastLayer = this.PersistRoot.getChildByName('Toast');
    }

    update(deltaTime: number) {
        
    }
}


