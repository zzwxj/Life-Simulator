import { Graphics, Rect, Node, Vec2 } from "cc";
import { GameDefine } from "../GameDefine";
export class Debug {

    init(){

    }

    static log(...params: any[]) {
        if (GameDefine.DebugLevel <= 0) {
            Promise.resolve(console.log.apply(this, params))
        }
    }

    static info(...params: any[]) {
        if (GameDefine.DebugLevel <= 1) {
            Promise.resolve(console.info.apply(this, params))
        }
    }

    static warn(...params: any[]) {
        if (GameDefine.DebugLevel <= 2) {
            Promise.resolve(console.warn.apply(this, params))
        }
    }

    static error(...params: any[]) {
        if (GameDefine.DebugLevel <= 3) {
            Promise.resolve(console.error.apply(this, params))
        }
    }


    public static drawFillRect(node: Node, rect: Rect): void {
        let g = node.addComponent(Graphics);
        g.fillColor.fromHEX('#ff0000');
        g.rect(rect.x, rect.y, rect.width, rect.height);
        g.fill();
    }

    public static drawRect(node: Node, rect: Rect): void {
        let g = node.addComponent(Graphics);
        g.lineWidth = 2;
        g.strokeColor.fromHEX('#ff0000');
        g.rect(rect.x, rect.y, rect.width, rect.height);
        g.stroke();
    }

    public static drawLine(node: Node): void {
        var g = node.addComponent(Graphics);
        g.lineWidth = 2;
        g.strokeColor.fromHEX('#ffffff');
        g.clear();
        g.moveTo(100, 100);
        g.lineTo(100, 200);
        g.lineTo(200, 200);
        g.stroke();
    }

    public static drawBesize(node, startPos: Vec2, targetPos: Vec2, c1x: number, c1y: number, c2x: number, c2y: number) {
        let tempNode = new Node();
        node.addChild(tempNode);
        let g = tempNode.addComponent(Graphics);
        g.lineWidth = 10;
        g.strokeColor.fromHEX("#ffffff");
        g.moveTo(startPos.x, startPos.y);
        g.bezierCurveTo(c1x, c1y, c2x, c2y, targetPos.x, targetPos.y);
        g.stroke();
    };

    public static drawPolyGon(node: Node, points: Vec2[]): void {
        let tempNode = new Node();
        node.addChild(tempNode);
        let g = tempNode.addComponent(Graphics);
        g.lineWidth = 10;
        g.strokeColor.fromHEX("#ffffff")
        for (let i = 0; i < points.length; i++) {
            let p = points[i];
            if (i == 0) {
                g.moveTo(p.x, p.y);
            } else {
                g.lineTo(p.x, p.y);
            }
        }
        g.close();
        g.stroke();
    }
}