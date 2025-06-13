import { _decorator, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioId')
export class AudioId extends Component {
    @property(CCInteger)
    audioId:number = 0;

    start() {

    }

    update(deltaTime: number) {
        
    }
}


