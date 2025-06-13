import { _decorator, Component, director, EventTouch, Material, Node, Size, Sprite, UITransform, v2, Vec2, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GuideMaskComponent')
export class GuideMaskComponent extends Component {
    /** 黑幕遮罩移动的速度 */
    @property
    public wSpeed:number = 900;

    private shader:Material = null;
    /** 镂空的宽高 */
    private btnWh:Vec2 = v2(160,80);
    private isUpdate:boolean=false;
    /** 这里一般为屏幕尺寸 */
    private widthDiff=750;
    private heightDiff=1334;

    private viewSize: Size;
    private hSpeed: number;
    clickTarget:Node=null;

    onLoad () {
        let persistRoot = director.getScene().getChildByPath("PersistRoot");
        if(persistRoot != null){
            this.viewSize = persistRoot.getComponent(UITransform).contentSize;
        }else{
            this.viewSize = view.getVisibleSize();
        }
        this.node.getComponent(UITransform).contentSize = this.viewSize;
        this.hSpeed = this.wSpeed / this.viewSize.width * this.viewSize.height;
        this.shader = this.node.getComponent(Sprite).material;
    }

    start () {
        
    }

    setMask(targetNode: Node){
        if(targetNode == null){
            this.shader.setProperty('center',v2(0.5,0.5));
            this.shader.setProperty('width',0);
            this.shader.setProperty('height',0);
            this.isUpdate = false;
        }else{
            this.clickTarget = targetNode;
            let pos = new Vec2(this.clickTarget.getWorldPosition().x,this.clickTarget.getWorldPosition().y);
            let btnSize = new Vec2(this.clickTarget.getComponent(UITransform).contentSize.width,this.clickTarget.getComponent(UITransform).contentSize.height);
            this.setLocation(pos,btnSize);
        }
    }

    setEmptyMask(){
        this.shader.setProperty('center',v2(0.5,0.5));
        this.shader.setProperty('width',1);
        this.shader.setProperty('height',1);
    }

    public setLocation(location: Vec2,focusWH: Vec2)
    {
        /** 设置相应的shader属性 */
        this.shader.setProperty('center',v2(location.x/this.viewSize.width,1-location.y/this.viewSize.height));
        this.widthDiff = this.viewSize.width;
        this.heightDiff = this.viewSize.height;
        this.btnWh = focusWH;
        this.isUpdate = true;
    }

    onClick(){
        
    }

    update(deltaTime: number) {
        if(this.isUpdate)
        {
            let widthStop = false;
            let heightStop = false;
            if(this.widthDiff > this.btnWh.x){
                this.shader.setProperty('width',this.widthDiff/this.viewSize.width);
            }else{
                this.shader.setProperty('width',this.btnWh.x /this.viewSize.width);
                widthStop = true;
            }
            if(this.heightDiff > this.btnWh.y){
                this.shader.setProperty('height',this.heightDiff/this.viewSize.height);
            }else{
                this.shader.setProperty('height',this.btnWh.y/this.viewSize.height);
                heightStop = true;
            }
            this.widthDiff -= this.wSpeed*deltaTime;
            this.heightDiff -= this.hSpeed*deltaTime;
            if(widthStop && heightStop){
                this.isUpdate = false;
            }
        }
    }
}


