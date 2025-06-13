import { Debug } from "./Debug";

export class CfgMgr {
    public static CfgData: Map<string, any> = new Map();  //any为{key:{}}
    public static CfgDataList: Map<string, any> = new Map();//any为[];


    /**
     * 添加配置数据
     * @param name 
     * @param cfgs 
     */
    public static addCfgData(name: string, cfgs: any) {
        if (name == null || !this.CfgDataList.has(name)) {
            Debug.info("Error: 不存在配置表" + name);
            return;
        }
        let datas = this.CfgData.get(name);
        let dataList = this.CfgDataList.get(name);
        cfgs.forEach((item) => {
            if (item.hasOwnProperty('Id')) {
                let key = item.Id;
                datas[key] = item;
                dataList.push(item);
            }
            else {
                Debug.info('配置表Id字段错误:', name);
            }
        });
    }


    /**
     * 设置配置数据
     * @param name 
     * @param cfgs 
     */
    public static setCfgData(name: string, cfgs: any) {
        let datas = {};
        let dataList = [];
        cfgs.forEach((item) => {
            if (item.hasOwnProperty('Id')) {
                let key = item.Id;
                datas[key] = item;
                dataList.push(item);
            }
            else {
                Debug.info('配置表Id字段错误:', name);
            }
        });
        this.CfgData.set(name, datas);
        this.CfgDataList.set(name, dataList);
    }

    /**
    * 返回数据对象map
    * cfgMgr.getCfgData<class>(class);
    * @param  {any} cfgCls  数据对象
    * @returns T            数据对象
    */
    public static getCfgData<T>(cls: any): { [key: string]: T } {
        let name = cls.ClassName;
        if (!this.CfgData.has(name)) {
            Debug.info("Error: 不存在配置表" + name);
            return null;
        }

        return this.CfgData.get(name);
    };

    public static hasCfg(key: string) {
        if (this.CfgData.has(key)) {
            return true;
        }

        return false;
    }

    /**
    * 返回数据对象数组
    * cfgMgr.getCfgDataArray<class>(class);
    * @param  {any} cfgCls 数据对象
    * @returns Array       数据对象数组
    */
    public static getCfgDataArray<T>(cls: any): Array<T> {
        let name = cls.ClassName;
        if (name == null || !this.CfgDataList.has(name)) {
            Debug.info("Error: 不存在配置表" + name);
            return null;
        }

        return this.CfgDataList.get(name);
    };

    /**
 * 根据ID获得配置
 * @param  {any} cfgCls
 * @param  {string|number} Id
 * @returns T
 */
    public static getDataById<T>(cls: any, Id: string | number): T {
        let name = cls.ClassName;
        let res: T = null;
        if (!this.CfgData.has(name)) {
            Debug.info(name + "配置不存在。" + Id);
        }
        else {
            let data = this.CfgData.get(name);
            if (!data[Id]) {
                Debug.info(name + ":不存在ID " + Id);
            }
            else {
                res = data[Id];
            }
        }
        return res;
    }

    public static clearByKey(key: string) {
        this.CfgData.delete(key);
        this.CfgDataList.delete(key);
    }
}
