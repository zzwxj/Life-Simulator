import { Node, Component, resources, Prefab, Material, error, JsonAsset, TextAsset, instantiate, find, Sprite, SpriteFrame, SpriteAtlas, sp, TiledMapAsset, Asset, AssetManager, isValid, assetManager, ImageAsset, Texture2D } from "cc";
export class ResourcesUtil extends Component {
    /**
* 加载资源
* @param url   资源路径
* @param type  资源类型
* @param cb    回调
* @method loadRes
*/
    public static loadRes(url: string, type: any, cb: Function = () => { }) {
        resources.load(url, (err: any, res: any) => {
            if (err) {
                cb(err, res);
                return;
            }

            cb && cb(null, res);
        })
    }

    /**
     * 获取特效prefab
     * @param modulePath 路径
     * @returns 
     */
    public static loadEffectRes(modulePath: string) {
        return new Promise((resolve, reject) => {
            this.loadRes(`prefab/effect/${modulePath}`, Prefab, (err: any, prefab: Prefab) => {
                if (err) {
                    console.info('effect load failed', modulePath);
                    reject && reject();
                    return;
                }

                resolve && resolve(prefab);
            })
        })
    }

    /**
     * 获取模型数据
     * @param modulePath 模型路径
     * @returns 
     */
    public static loadModelRes(modulePath: string) {
        return new Promise((resolve, reject) => {
            this.loadRes(`${modulePath}`, Prefab, (err: any, prefab: Prefab) => {
                if (err) {
                    console.info("model load failed", modulePath);
                    reject && reject();
                    return;
                }

                resolve && resolve(prefab);
            })
        })
    }

    /**
     * 获取材质
     * @param matPath 路径
     * @returns 
     */
    public static loadMatRes(matPath: string) {
        return new Promise((resolve, reject) => {
            this.loadRes(`${matPath}`, Material, (err: any, mat: Prefab) => {
                if (err) {
                    console.info('mat load failed', matPath);
                    reject && reject();
                    return;
                }

                resolve && resolve(mat);
            })
        })
    }



    /**
     * 获取多模型数据
     * @param path 资源路径
     * @param arrName 资源名称
     * @param progressCb 过程回调函数
     * @param completeCb 完成回调函数
     */
    public static loadModelResArr(path: string, arrName: Array<string>, progressCb: any, completeCb: any) {
        let arrUrls = arrName.map((item) => {
            return `${path}/${item}`;
        })

        resources.load(arrUrls, Prefab, progressCb, completeCb);
    }

    /**
     * 获取关卡数据
     * @param type 关卡类型
     * @param arrName 资源名称
     * @param progressCb 过程回调函数
     * @param completeCb 完成回调函数
     */
    public static getMapObj(type: string, arrName: Array<string>, progressCb?: any, completeCb?: any) {
        let arrUrls: string[] = [];
        for (let idx = 0; idx < arrName.length; idx++) {
            arrUrls.push(`map/${type}/${arrName[idx]}`)
        }

        resources.load(arrUrls, Prefab, progressCb, completeCb);
    }

    /**
     * 获取json数据
     * @param fileName 文件名
     * @param cb 回调函数 
     */
    public static getJsonData(fileName: string, cb: Function) {
        this.loadRes("datas/" + fileName, null, function (err: any, content: JsonAsset) {
            if (err) {
                error(err.message || err);
                return;
            }

            if (content.json) {
                cb(err, content.json);
            } else {
                cb('failed!!!');
            }
        });
    }

    /**
     * 获取文本数据
     * @param fileName 文件名
     * @param cb  回调函数
     */
    public static getTextData(fileName: string, cb: Function) {
        this.loadRes("datas/" + fileName, null, function (err: any, content: TextAsset) {
            if (err) {
                error(err.message || err);
                return;
            }

            let text: string = content.text;
            cb(err, text);
        });
    }

    /**
     * 
     * @param resName 加载单个文件
     * @param type 
     * @returns 
     */
    public static loadFile(resName: string, type: any) {
        return new Promise((resolve, reject) => {
            if (!resName) {
                resolve([]);
                return;
            }

            let res = resources.get(resName);
            if (res) {
                resolve([resName, res]);
            }
            else {
                resources.load(resName, type, (err: Error | null, data: any) => {
                    if (err != undefined) {
                        console.info("下载资源错误：" + err);
                        return;
                    }
                    resolve([resName, data]);
                });
            }

        });
    }

    /**
     * 加载整个文件夹里的文本数据
     * @param dirPath 
     * @param type 
     * @returns 
     */
    public static loadDir(dirPath: string) {
        return new Promise((resolve, reject) => {
            if (!dirPath) {
                resolve([]);
                return;
            }

            resources.loadDir(dirPath, (err: Error | null, data: any[]) => {
                if (err != undefined) {
                    console.info("下载资源错误：" + err);
                    return;
                }
                resolve(data);
            });
        });
    }

    /**
     * 加载远程资源
     * @param dirPath 
     * @param type 
     * @returns 
     */
    public static loadRemote(dirPath: string, type: any) {
        return new Promise((resolve, reject) => {
            if (!dirPath) {
                resolve([]);
                console.info("路径错误：" + dirPath);
                return;
            }
            assetManager.loadRemote(dirPath, function (err, data) {
                if (err != undefined) {
                    console.info("下载资源错误：" + err);
                    return;
                }

                resolve(data);
            });
        })
    }


    /**
    * 加载资源
    * @param url   资源路径
    * @param type  资源类型
    * @method loadRes
    */
    public static loadResNew(url: string, type: any) {
        return new Promise((resolve, reject) => {
            resources.load(url, type, (err: any, res: any) => {
                if (err) {
                    error(err.message || err);
                    reject && reject(err)
                    return;
                }

                resolve && resolve(res);
            })
        })
    }


    /**
     * 获取UI prefab
     * @param prefabPath prefab路径 
     * @param cb 回调函数
     */
    public static getUIPrefabRes(prefabPath: string) {
        return this.loadResNew(prefabPath, Prefab);
    }

    /**
      * 创建ui界面
      * @param path ui路径
      * @param cb 回调函数
      * @param parent 父节点
      */
    public static async createUI(path: string, parent?: Node) {
        let pf = await this.getUIPrefabRes(path) as Prefab;
        let node: Node = instantiate(pf);
        node.setPosition(0, 0, 0);
        if (!parent) {
            parent = find("Canvas") as Node;
        }
        parent.addChild(node);
        return node;
    }

    /**
    * 设置节点精灵
    * @param path 资源路径
    * @param node 节点
    */

    public static setSpriteFrame(path: string, sprite: Sprite, clear = true, callback: any = null) {
        if (sprite) {
            if (clear) {
                sprite.spriteFrame = null;
            }
            resources.load(path, SpriteFrame, function (err: any, SpriteFrame: SpriteFrame) {
                if (err) {
                    console.info('set sprite frame failed! err:', path, err);
                    if (callback) {
                        callback();
                    }
                    return;
                }
                if (sprite && sprite) {
                    sprite.spriteFrame = SpriteFrame;
                }

                if (callback) {
                    callback();
                }
            })
        } else {
            if (callback) {
                callback();
            }
        }
    }


    public static geSpriteFrame(path: string) {
        return new Promise((resolve, reject) => {
            resources.load(path, SpriteFrame, function (err: any, SpriteFrame: SpriteFrame) {
                if (err) {
                    console.info('set sprite frame failed! err:', path);
                    resolve(null)
                    return;
                }
                resolve(SpriteFrame);
            })
        })
    }

    /**
     * 设置图集
     * @param path 
     * @param res 
     * @param sprite 
     */
    public static setSpriteAtlasSpriteFrame(path: string, res: string, sprite: Sprite) {
        if (sprite) {
            resources.load(path, SpriteAtlas, (err, atlas) => {
                if (err) {
                    console.info('set spriteAtlas frame failed! err:', path, err);
                    return;
                }
                const frame = atlas.getSpriteFrame(res);
                sprite.spriteFrame = frame;
            });
        }
    }

    /**
     * 获取图集中的精灵
     *  ResourcesUtil.getSpriteAtlasSpriteFrame(Constants.skillImagePath, resIcon).then((spriterFrame: SpriteFrame) => {
            this.iconSprite.spriteFrame = spriterFrame;
        });
     * @param path 
     * @param res 
     * @returns 
     */
    public static getSpriteAtlasSpriteFrame(path: string, res: string) {
        return new Promise((resolve) => {
            resources.load(path, SpriteAtlas, (err, atlas) => {
                if (err) {
                    console.info('get SpriteAtlasSprite failed! err:', path);
                    resolve(null);
                    return;
                }
                const frame = atlas.getSpriteFrame(res);
                resolve(frame);
            });
        })
    }

    /**
     * 获得精灵
     * @param path 资源路径
     */
    public static getSpriteFrame(path: string) {
        return new Promise((resolve) => {
            resources.load(path, SpriteFrame, function (err: any, SpriteFrame: SpriteFrame) {
                resolve(SpriteFrame);
            })
        })
    }

    public static setSprite(sp:Sprite,resPath:string,isClear = true){
        if(isClear){
            sp.spriteFrame = null;
        }
        return new Promise((resolve, reject) => {
            let path = resPath + '/spriteFrame';
            this.geSpriteFrame(path).then((data: SpriteFrame) => {
                if(!data){
                    resolve(null);
                    return;
                }
                sp.spriteFrame = data;
                resolve(sp);
            })
        })
    }

    /**
    * 获得龙骨数据
    * @param path 资源路径
    */
    public static getSkeletonData(path: string) {
        return new Promise((resolve) => {
            resources.load(path, sp.SkeletonData, function (err: any, SkeletonData: sp.SkeletonData) {
                if (err) {
                    console.info('get SkeletonData failed! err:', path);
                    return;
                }
                resolve(SkeletonData);
            })
        })
    }

    /**
    * 获得龙骨数据
    * @param path 资源路径
    */
    public static getPrefab(path: string) {
        return new Promise((resolve, reject) => {
            resources.load(path, Prefab, function (err: any, prefab: Prefab) {
                if (err) {
                    console.info('get Prefab failed! err:', path);
                    reject(null);
                }
                resolve(prefab);
            })
        })
    }

    /**
     * 资源释放
     * @param sp 
     */
    public static releaseRes(sp: Sprite) {
        let res = sp.spriteFrame;
        sp.spriteFrame = null;
        res.decRef();
    }

    /**
   * 获得tiledMap数据
   * @param path 资源路径
   */
    public static getTiledMap(path: string) {
        return new Promise((resolve) => {
            resources.load(path, TiledMapAsset, function (err: any, data: TiledMapAsset) {
                if (err) {
                    console.info('get Prefab failed! err:', path);
                    return;
                }
                resolve(data);
            })
        })
    }


    /* 释放节点资源 */
    releaseSprite(node: Node) {
        if (!isValid(node)) {
            return;
        }
        const sp = node.getComponent(Sprite) as Sprite;
        if (sp && sp.spriteFrame) {
            sp.spriteFrame.decRef();
            sp.spriteFrame = null;
        }
    }


    /* 加载远程资源 */
    cache: { [name: string]: SpriteFrame } = {};
    loadRemoteImg(url: string) {
        assetManager.loadRemote<ImageAsset>(url, (err, imageAsset) => {
            if (!err && imageAsset) {
                let spFrame = this.cache[imageAsset._uuid];
                if (!spFrame) {
                    const texture = new Texture2D();
                    texture.image = imageAsset;
                    spFrame = new SpriteFrame();
                    spFrame.texture = texture;
                    imageAsset.addRef();
                    this.cache[imageAsset._uuid] = spFrame; // 添加映射表记录
                }
                spFrame.addRef(); // 计数加1
            }
        });
    }


    /* 释放远程资源 */
    releaseRemoteSprite(node: Node) {
        if (!isValid(node)) {
            return;
        }
        const sp = node.getComponent(Sprite) as Sprite;
        if (sp && sp.spriteFrame) {
            const spFrame = sp.spriteFrame;
            sp.spriteFrame.decRef(false); // 只把计数减1
            sp.spriteFrame = null;

            if (spFrame.refCount <= 0) {
                let texture = spFrame.texture as Texture2D;
                // 如果已加入动态合图，必须取原始的Texture2D
                if (spFrame.packable) {
                    texture = spFrame.original?._texture as Texture2D;
                }
                if (texture) {
                    delete this.cache[texture.image!._uuid]; // 删除映射表记录
                    texture.image?.decRef();
                    texture.destroy();
                }
                spFrame.destroy();
            }
        }
    }

}

