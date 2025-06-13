import { Component, NodePool, Prefab, instantiate, Node } from "cc";

export class PoolManager extends Component {

    private _dictPool: any = {}

    static _instance: PoolManager;
    static get instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new PoolManager();
        return this._instance;
    }


    /**
     * 根据预设从对象池中获取对应节点
     */
    public getNode(prefab: Prefab, parent: Node) {
        let name = prefab.name;
        //@ts-ignore
        if (!prefab.position) {
            //@ts-ignore
            name = prefab.data.name;
        }
        let node = null;
        if (this._dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            let pool = this._dictPool[name];
            if (pool.size() > 0) {
                node = pool.get();
            } else {
                node = instantiate(prefab);
            }
        } else {
            //没有对应对象池，创建他！
            let pool = new NodePool();
            this._dictPool[name] = pool;
            node = instantiate(prefab);
        }
        node.parent = parent;
        node.setPosition(10000, 100000);
        node.active = true;
        return node;
    }

    /**
    * 根据预设从对象池中获取对应节点
    */
    public getNodeItem(prefab: Prefab) {
        let name = prefab.name;
        //@ts-ignore
        if (!prefab.position) {
            //@ts-ignore
            name = prefab.data.name;
        }
        let node = null;
        if (this._dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            let pool = this._dictPool[name];
            if (pool.size() > 0) {
                node = pool.get();
            } else {
                node = instantiate(prefab);
            }
        } else {
            //没有对应对象池，创建他！
            let pool = new NodePool();
            this._dictPool[name] = pool;
            node = instantiate(prefab);
        }
        node.setPosition(10000, 100000);
        node.active = true;
        return node;
    }


    /**
     * 根据唯一键值从对象池中获取对应节点
     * @param Node 
     * @param key 
     * @returns 
     */
    public getNodeItemById(Node: Node, key: string) {
        let node = null;
        if (this._dictPool.hasOwnProperty(key)) {
            //已有对应的对象池
            let pool = this._dictPool[key];
            if (pool.size() > 0) {
                node = pool.get();
            } else {
                node = instantiate(Node);
            }
        } else {
            //没有对应对象池，创建他！
            let pool = new NodePool();
            this._dictPool[key] = pool;
            node = instantiate(Node);
        }
        node.setPosition(10000, 100000);
        node.active = true;
        return node;
    }

    /**
     * 将对应节点放回对象池中
     * @param node 
     * @param key 
     * @returns 
     */
    public putNodeByKey(node: Node, key: string) {
        let pool = new NodePool();
        if (this._dictPool.hasOwnProperty(key)) {
            //已有对应的对象池
            pool = this._dictPool[key];
        } else {
            //没有对应对象池，创建他！
            this._dictPool[key] = pool;
        }
        // this.resertStreak(node);
        node.active = false;
        pool.put(node);
    }


    /**
     * 获取对象池预制体个数
     * @param prefab 
     */
    getPoolSizeByPrefab(prefab: Prefab) {
        let num = 0;
        let name = prefab.name;
        //@ts-ignore
        if (!prefab.position) {
            //@ts-ignore
            name = prefab.data.name;
        }
        if (this._dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            let pool = this._dictPool[name];
            num = pool.size();

        }
        return num;
    }

    /**
    * 将对应节点放回对象池中
    */
    public putPool(node: Node) {
        if (!node) {
            return;
        }
        let name = node.name;
        let pool = null;
        if (this._dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            pool = this._dictPool[name];
        } else {
            //没有对应对象池，创建他！
            pool = new NodePool();
            this._dictPool[name] = pool;
        }
        // this.resertStreak(node);
        node.active = false;
        pool.put(node);
    }

    /**
     * 将对应节点放回对象池中
     */
    public putNode(node: Node) {
        if (!node) {
            return;
        }
        let name = node.name;
        let pool = new NodePool();
        if (this._dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            pool = this._dictPool[name];
        } else {
            //没有对应对象池，创建他！
            this._dictPool[name] = pool;
        }
        // this.resertStreak(node);
        node.active = false;
        pool.put(node);
    }

    /**
     * 根据名称，清除对应对象池
     */
    public clearPool(name: string) {
        if (this._dictPool.hasOwnProperty(name)) {
            let pool = this._dictPool[name];
            pool.clear();
        }
    }

    /**
     * 清理对象池
     */
    public clear() {
        for (let key in this._dictPool) {
            if (this._dictPool.hasOwnProperty(key)) {
                let pool = this._dictPool[key];
                pool.clear();
            }
        }
    }

    /**
     * 预生成对象池
     * @param prefab 
     * @param nodeNum 
     */
    public prePool(prefab: Prefab, nodeNum: number) {
        const name = prefab.data.name;

        let pool = new NodePool();
        this._dictPool[name] = pool;

        for (let i = 0; i < nodeNum; i++) {
            const node = instantiate(prefab);
            pool.put(node);
        }
    }
}
