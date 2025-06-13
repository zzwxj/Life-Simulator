import { _decorator, CCFloat, Component, Label, Material, Node, Slider, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpriteHSL')
export class SpriteHSL extends Component {
    @property(CCFloat)
    numH: number = 0;// 色调(0, 360)
    @property(CCFloat)
    numS: number = 0;// 饱和度(-1, 1)
    @property(CCFloat)
    numL: number = 0;// 亮度(-1, 1)

    material: Material = null;

    onLoad() {
        let sp = this.node.getComponent(Sprite);
        this.material = sp.material;
        if(this.material != null && sp.spriteFrame != null){
            this.setHue();
            this.setSaturation();
            this.setLightness();
        }
    }

    setHue() {
       let dh = Math.min(this.numH,360);
       dh = Math.max(0,dh);
       this.material.setProperty('u_dH', dh);
    }

    setSaturation() {
        let ds = Math.min(this.numS,1);
        ds = Math.max(-1,ds);
        this.material.setProperty('u_dS', ds);
    }

    setLightness() {
        let dl = Math.min(this.numL,1);
        dl = Math.max(-1,dl);
        this.material.setProperty('u_dL', dl);
    }

    setHSL(h: number,s: number,l: number){
        let sp = this.node.getComponent(Sprite);
        if(this.material != null && sp.spriteFrame != null){
            this.numH = h;
            this.numS = s;
            this.numL = l;
            this.setHue();
            this.setSaturation();
            this.setLightness();
        }
    }
}

