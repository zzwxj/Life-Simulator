import { CCFloat, Color, Component, log, Material, Sprite, Vec2, Vec4, _decorator, CCBoolean, color } from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class FlashLight extends Component {
    @property({type: CCFloat, tooltip: "光束宽度"})
    lightWidth = 0.2;
    @property({type: CCFloat, tooltip: "光束角度"})
    lightAngle = 36;
    @property({type: CCFloat, tooltip: "时间"})
    LoopTime = 1.0;
    @property({type: CCFloat, tooltip: "TimeInterval"})
    TimeInterval = 3.0;
    @property({type: CCBoolean, tooltip: "是否只有流光层显示"})
    EnableClear: boolean = false;
    @property({type: Color, tooltip: "流光颜色"})
    lightColor: Color = new Color(255,255,255);

    /**记录时间 */
    private time: number = 0;
    /**精灵上的材质 */
    private material: Material = null!;
    private startPos = 0;
    private moveLength = 0;
    private Speed = 0;
    private dttime = 0;
    private _isPlay: boolean = false;

    start(){
        let sp = this.node.getComponent(Sprite);
        if(sp == null || sp.spriteFrame == null){
            return;
        }
        this.setData();
    }

    setData(){
        this.time = 0;
        this.dttime = 0;
        this.material = this.node.getComponent(Sprite).getSharedMaterial(0)!;   //获取材质

        // this.material.setProperty('mainTexture', this.sprite.spriteFrame.texture);
        // this.material.setProperty('lightColor', this.lightColor);
        // this.material.setProperty('enableGradient', this.enableGradient);
        // this.material.setProperty('cropAlpha', this.cropAlpha);

        let frame = this.node.getComponent(Sprite).spriteFrame;
        // xMin
        let l = frame.uv[0];
        // xMax
        let r = frame.uv[6];
        // yMax
        let b = frame.uv[3];
        // yMin
        let t = frame.uv[5];
        // 纹理在合图中的四个边界 uv 坐标
        let u_uvOffset = new Vec4(l, t, r, b);
        // 纹理是否旋转
        let u_uvRotated = frame.rotated ? 1.0 : 0.0;
        this.material.setProperty('u_uvOffset', u_uvOffset);
        this.material.setProperty('u_uvRotated', u_uvRotated);

        this.material.setProperty('enableClear', this.EnableClear?1.0:0.0);
        this.material.setProperty('lightColor', this.lightColor);
        this.material.setProperty('lightAngle', this.lightAngle);
        this.material.setProperty('lightWidth', this.lightWidth);
        this.startPos = 0;
        this.moveLength = 1;
        this.Speed = this.moveLength / this.LoopTime;
        this.time = this.startPos;
        this._isPlay = true;
    }

    update(dt: number){
        if(this.material == null || !this._isPlay){
            return;
        }
        this.time += dt * this.Speed;
        this.dttime += dt;
        this.material.setProperty("lightCenterPoint", new Vec2(this.time, this.time));          //设置材质对应的属性

        if (this.dttime > this.LoopTime + this.TimeInterval) {
            this.time = this.startPos;
            this.dttime = 0;
        }
    }
}