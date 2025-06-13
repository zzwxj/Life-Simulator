import { _decorator, Node, find, isValid, Vec3, CameraComponent } from "cc";
import { Constants } from "../Constants";
import { ResourcesUtil } from "./ResourcesUtil";
import { OpenPopupManager } from "./OpenPopupManager";
// import { PoolManager } from "./poolManager";
// import { tips } from "../ui/common/tips";
const { ccclass, property } = _decorator;

let SHOW_STR_INTERVAL_TIME = 800;
@ccclass("PopupManager")
export class PopupManager {
    private _dictSharedPanel: any = {}//存在的弹窗界面
    private _dictLoading: any = {}//加载状态控制
    private _arrPopupDialog: any = [] //队列中的弹窗
    private _hidePopupArr: Array<string> = [];//打开下一个窗口时，需要被动关闭之前的弹窗
    private _showTipsTime: number = 0

    private static _instance: PopupManager;

    public static get instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new PopupManager();
        return this._instance;
    }

    /**
     * 检查当前界面是否正在展示
     * @param panelPath 
     */
    public isDialogVisible(panelPath: string) {
        if (!this._dictSharedPanel.hasOwnProperty(panelPath)) {
            return false;
        }

        let panel = this._dictSharedPanel[panelPath];

        return isValid(panel) && panel.active && isValid(panel.parent);
    }


    /**
     * 显示单例界面
     * @param {PopupOptions} options 
     * @param {Array} args 
     * @param {Function} cb 回调函数，创建完毕后回调
     */
    public show(options: PopupOptions, args?: any, cb?: Function) {
        let panelPath = options.path;
        if (this._dictLoading[panelPath]) {
            return;
        }
        //是否关闭添加的弹窗队列
        options.closeCur && this.hideJoinPopup(panelPath);
        let idxSplit = panelPath.lastIndexOf('/');
        let scriptName = panelPath.slice(idxSplit + 1);

        if (!args) {
            args = [];
        }

        if (this._dictSharedPanel.hasOwnProperty(panelPath)) {
            let panel = this._dictSharedPanel[panelPath];
            if (isValid(panel)) {
                panel.parent = options.parent ?? find("Canvas");
                panel.active = true;
                let script = panel.getComponent(scriptName);
                let script2 = panel.getComponent(scriptName.charAt(0).toUpperCase() + scriptName.slice(1));
                let ani = panel.getComponent('animationUI');
                if (script && script.show) {
                    script.show.apply(script, args);
                    if (ani) {
                        ani.open(() => {
                            cb && cb(script);
                        })
                    }
                    else {
                        cb && cb(script);
                    }
                } else if (script2 && script2.show) {
                    script2.show.apply(script2, args);
                    if (ani) {
                        ani.open(() => {
                            cb && cb(script2);
                        })
                    }
                    else {
                        cb && cb(script2);
                    }
                } else {
                    throw `查找不到脚本文件${scriptName}`;
                }

                return;
            }else{
                console.log("界面加载异常 " + panelPath);
                OpenPopupManager.instance.showToast(panelPath);
            }
        }

        this._dictLoading[panelPath] = true;
        ResourcesUtil.createUI(panelPath, options.parent).then((node: Node) => {
            //判断是否有可能在显示前已经被关掉了？
            let isCloseBeforeShow = false;
            if (!this._dictLoading[panelPath]) {
                //已经被关掉
                isCloseBeforeShow = true;
            }
            this._dictLoading[panelPath] = false;


            this._dictSharedPanel[panelPath] = node;
            let ani: any = node.getComponent('animationUI');
            let script: any = node.getComponent(scriptName);
            let script2: any = node.getComponent(scriptName.charAt(0).toUpperCase() + scriptName.slice(1));
            if (script && script.show) {
                script.show.apply(script, args);
                if (ani) {
                    ani.open(() => {
                        cb && cb(script);
                    })
                }
                else {
                    cb && cb(script);
                }
            } else if (script2 && script2.show) {
                script2.show.apply(script2, args);
                if (ani) {
                    ani.open(() => {
                        cb && cb(script2);
                    })
                }
                else {
                    cb && cb(script2);
                }
            } else {
                throw `查找不到脚本文件${scriptName} 或 未定义show方法`;
            }

            if (isCloseBeforeShow) {
                //如果在显示前又被关闭，则直接触发关闭掉
                this.hide(panelPath);
            }
        });
    }

    /**
     * 隐藏单例界面
     * @param {String} panelPath 
     * @param {fn} callback
     */
    public hide(panelPath: string, callback?: Function) {
        if (this._dictSharedPanel.hasOwnProperty(panelPath)) {
            let panel = this._dictSharedPanel[panelPath];
            if (panel && isValid(panel)) {
                let ani = panel.getComponent('animationUI');
                if (ani) {
                    ani.close(() => {
                        panel.parent = null;
                        if (callback && typeof callback === 'function') {
                            callback();
                        }
                    });
                } else {
                    panel.parent = null;
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                }
            } else if (callback && typeof callback === 'function') {
                callback();
            }

            if(panel && !isValid(panel)){
                console.log("界面关闭异常 " + panelPath);
                OpenPopupManager.instance.showToast(panelPath);
            }
        }

        this._dictLoading[panelPath] = false;
    }

    public hideAll() {
        for (const key in this._dictSharedPanel) {
            if (Object.prototype.hasOwnProperty.call(this._dictSharedPanel, key)) {
                const panel = this._dictSharedPanel[key];
                panel.parent = null;
            }
        }
    }

    /**
     * 添加需要被动关闭的弹窗
     * @param panelPath 
     */
    public addHidePopup(panelPath: string) {
        if (!this._hidePopupArr.includes(panelPath)) {
            this._hidePopupArr.push(panelPath);
        }
    }

    /**
     * 关闭加入的隐藏弹窗
     */
    public hideJoinPopup(panelPath: string) {
        if (this._hidePopupArr.length) {
            for (let i = 0, len = this._hidePopupArr.length; i < len; i++) {
                let hidePath = this._hidePopupArr[i];
                if (hidePath != panelPath) {
                    this.hide(hidePath);
                    this._hidePopupArr.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }
    }


    /**
     * 将弹窗加入弹出窗队列
     * @param options 
     * @param param 
     */
    public pushToPopupSeq(options: PopupOptions, param?: any, callBack?: Function) {
        let popupDialog = {
            options: options,
            callBack: callBack,
            param: param,
            isShow: false
        };
        this._arrPopupDialog.push(popupDialog);
        this._checkPopupSeq();
    }

    /**
     * 将弹窗加入弹出窗队列
     * @param {number} index 
     * @param {string} panelPath 
     * @param {*} param 
     */
    public insertToPopupSeq(index: number, options: PopupOptions, param?: any, callBack?: Function) {
        let popupDialog = {
            options: options,
            callBack: callBack,
            param: param,
            isShow: false
        };

        this._arrPopupDialog.splice(index, 0, popupDialog);
    }

    /**
     * 将弹窗从弹出窗队列中移除
     * @param {string} panelPath 
     */
    public shiftFromPopupSeq(panelPath: string, callBack?: Function) {
        //检测是否为队列弹窗
        if (this._arrPopupDialog[0] && this._arrPopupDialog[0].options.path === panelPath) {
            this.hide(panelPath, () => {
                this._arrPopupDialog.shift();
                this._checkPopupSeq();
            })
        }
        else {
            this.hide(panelPath, callBack)
        }
    }

    /**
     * 检查当前是否需要弹窗
     */
    private _checkPopupSeq() {
        if (this._arrPopupDialog.length > 0) {
            let first = this._arrPopupDialog[0];

            if (!first.isShow) {
                this.show(first.options, first.param, first.callBack);
                this._arrPopupDialog[0].isShow = true;
            }
        }
    }

    /**
     * 显示提示
     * @param {String} content 
     * @param {Function} cb 
     */
    public showTips(content: string | number, type: string = 'txt', targetPos: Vec3 = new Vec3(), scale: number = 1, callback: Function = () => { }) {
        let str = String(content);
        let next = () => {
            this._showTipsAni(str, type, targetPos, scale, callback);
        }
        var now = Date.now();
        if (now - this._showTipsTime < SHOW_STR_INTERVAL_TIME && type !== 'gold' && type !== 'heart') {
            var spareTime = SHOW_STR_INTERVAL_TIME - (now - this._showTipsTime);
            setTimeout(() => {
                next();
            }, spareTime);

            this._showTipsTime = now + spareTime;
        } else {
            next();
            this._showTipsTime = now;
        }
    }

    /**
     * 内部函数
     * @param {String} content 
     * @param {Function} cb 
     */
    private _showTipsAni(content: string, type: string, targetPos: Vec3, scale: number, callback?: Function) {
        // ResourceUtil.getUIPrefabRes('common/tips').then((prefab: any) => {
        //     let tipsNode = PoolManager.instance.getNode(prefab, find("Canvas") as Node);

        //     let tipScript = tipsNode.getComponent(tips) as tips;
        //     tipScript.show(content, type, targetPos, scale, callback);
        // });
    }
}

export class PopupOptions {
    path: string; //窗口路径
    parent: Node; //父节点
    closeCur: boolean = false;//是否关闭添加的隐藏窗口队列
}


